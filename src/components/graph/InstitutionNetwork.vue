<template>
  <div class="graph-container relative flex-1 min-h-[600px]">
    <div id="institution-graph" class="w-full h-full min-h-[600px]" ref="graphContainer"></div>

    <!-- 分页控制 -->
    <div
      v-if="showPagination"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center space-x-4"
    >
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="
          currentPage === 1
            ? 'text-slate-400 dark:text-slate-500'
            : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
        "
      >
        <i class="fas fa-chevron-left mr-1"></i>
        上一页
      </button>

      <div class="flex items-center space-x-2">
        <span class="text-sm text-slate-600 dark:text-slate-400">第</span>
        <span class="text-sm font-medium text-slate-800 dark:text-slate-200">{{
          currentPage
        }}</span>
        <span class="text-sm text-slate-600 dark:text-slate-400">页，共</span>
        <span class="text-sm font-medium text-slate-800 dark:text-slate-200">{{ totalPages }}</span>
        <span class="text-sm text-slate-600 dark:text-slate-400">页</span>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="
          currentPage === totalPages
            ? 'text-slate-400 dark:text-slate-500'
            : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
        "
      >
        下一页
        <i class="fas fa-chevron-right ml-1"></i>
      </button>
    </div>

    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="text-center">
        <div class="w-16 h-16 mx-auto relative">
          <div
            class="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-900"
          ></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
          ></div>
        </div>
        <p class="mt-4 text-slate-600 dark:text-slate-400 font-medium">正在构建机构网络...</p>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!loading && nodeCount === 0"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center max-w-sm">
        <div class="mb-4 text-slate-400 dark:text-slate-500">
          <i class="fas fa-university text-6xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">暂无机构网络数据</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">请尝试调整筛选条件或搜索关键词</p>
        <button
          @click="refreshGraph"
          class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
        >
          <i class="fas fa-sync-alt mr-2"></i>重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { getInstitution, getResearcherByInstitution } from '@/api/modules/graph'
import { useUserStore } from '@/stores/user'

const props = withDefaults(
  defineProps<{
    layoutType?: string
    isDarkMode?: boolean
    selectedNode: any
  }>(),
  {
    layoutType: 'force',
    isDarkMode: false,
  }
)

const emit = defineEmits<{
  nodeClick: [node: any]
  nodeCountChange: [count: number]
  linkCountChange: [count: number]
}>()

const loading = ref(false)
const nodeCount = ref(0)
const linkCount = ref(0)
const graphNodes = ref<any[]>([])
const graphLinks = ref<any[]>([])

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(10) // 每页最多显示10个科研人员
const totalPages = ref(1)
const showPagination = ref(false)
const allNodes = ref<any[]>([]) // 存储所有节点数据
const allLinks = ref<any[]>([]) // 存储所有连接数据
const currentInstitution = ref<string>('') // 当前显示的机构名称

const graphContainer = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
const userStore = useUserStore()

const linkTypeColorMap: Record<string, string> = {
  BELONGS_TO: '#f59e42', // 蓝色
  WORKS_IN: '#3b82f6', // 橙色
  COOPERATE: '#64748b', // 紫色
  DEFAULT: '#a855f7', // 灰色
}

const initializeChart = () => {
  if (!graphContainer.value) return
  chart = echarts.init(graphContainer.value, props.isDarkMode ? 'dark' : undefined)
  chart.on('click', (params: any) => {
    if (params.dataType === 'node') {
      handleNodeClick(params.data)
    }
  })
}

const loadGraphData = async () => {
  if (!chart) return
  try {
    loading.value = true
    const user = userStore.user
    if (!user) throw new Error('用户信息未获取到')

    const response = await getInstitution(user.id)

    if (response.data) {
      // 处理API返回的节点数据
      const apiNodes = response.data.nodes.map((node: any) => {
        if (typeof node.id === 'string') {
          // 机构节点（字符串ID）
          return {
            ...node,
            type: 'language',
            category: 1,
            imgUrl: null,
            initials: node.id ? node.id.charAt(0) : 'I',
            name: node.id,
          }
        } else {
          // 用户节点（数字ID）
          return {
            ...node,
            type: 'user',
            category: 0,
            imgUrl: node.imgUrl || null,
            initials: node.name ? node.name.charAt(0) : 'U',
          }
        }
      })

      // 只保留与当前用户有关联的机构节点
      const userIdStr = String(user.id)
      const relatedInstitutionIds = new Set(
        response.data.links
          .filter(
            (link: any) =>
              link.fromId.toString() === userIdStr || link.toId.toString() === userIdStr
          )
          .map((link: any) => {
            // 机构节点id为字符串
            return link.fromId.toString() === userIdStr
              ? link.toId.toString()
              : link.fromId.toString()
          })
      )
      // 只保留与自己有关的连接，优先保留 WORKS_IN 类型的连接
      const filteredLinks = response.data.links.filter((link: any) => {
        return (
          (link.fromId.toString() === userIdStr &&
            relatedInstitutionIds.has(link.toId.toString())) ||
          (link.toId.toString() === userIdStr && relatedInstitutionIds.has(link.fromId.toString()))
        )
      })

      // 分离 WORKS_IN 和其他类型的连接
      const worksInLinks = filteredLinks.filter(
        (link: any) => (link.formatter || 'BELONGS_TO') === 'WORKS_IN'
      )
      const otherLinks = filteredLinks.filter(
        (link: any) => (link.formatter || 'BELONGS_TO') !== 'WORKS_IN'
      )

      // 对非 WORKS_IN 连接按 attr.count 排序，只保留最大的4个
      const sortedOtherLinks = otherLinks
        .sort((a: any, b: any) => {
          const countA = Number(a.attr?.count) || 0
          const countB = Number(b.attr?.count) || 0
          return countB - countA
        })
        .slice(0, 4)

      // 获取需要保留的机构ID（WORKS_IN连接 + 前4个其他连接）
      const keptInstitutionIds = new Set()

      // 添加 WORKS_IN 连接的机构ID
      worksInLinks.forEach((link: any) => {
        if (link.fromId.toString() === userIdStr) {
          keptInstitutionIds.add(link.toId.toString())
        } else {
          keptInstitutionIds.add(link.fromId.toString())
        }
      })

      // 添加前4个其他连接的机构ID
      sortedOtherLinks.forEach((link: any) => {
        if (link.fromId.toString() === userIdStr) {
          keptInstitutionIds.add(link.toId.toString())
        } else {
          keptInstitutionIds.add(link.fromId.toString())
        }
      })

      // 更新 relatedInstitutionIds，只保留需要显示的机构
      const finalInstitutionIds = new Set(
        Array.from(relatedInstitutionIds).filter(id => keptInstitutionIds.has(id))
      )

      // 重新过滤节点，只保留最终需要的机构节点
      const processedNodes = apiNodes.filter((node: any) => {
        if (node.type === 'user') return true
        if (node.type === 'language') return finalInstitutionIds.has(node.id)
        return false
      })

      // 合并 WORKS_IN 连接和筛选后的其他连接
      const allKeptLinks = [...worksInLinks, ...sortedOtherLinks]

      // 去重处理：如果两个节点间有多个连接，优先保留 WORKS_IN 类型
      const linkMap = new Map()
      allKeptLinks.forEach((link: any) => {
        const key = `${link.fromId.toString()}-${link.toId.toString()}`
        const reverseKey = `${link.toId.toString()}-${link.fromId.toString()}`

        // 检查是否已存在连接
        const existingLink = linkMap.get(key) || linkMap.get(reverseKey)

        if (!existingLink) {
          // 如果不存在连接，直接添加
          linkMap.set(key, link)
        } else {
          // 如果存在连接，检查当前连接是否为 WORKS_IN 类型
          const currentFormatter = link.formatter || 'BELONGS_TO'
          const existingFormatter = existingLink.formatter || 'BELONGS_TO'

          if (currentFormatter === 'WORKS_IN' && existingFormatter !== 'WORKS_IN') {
            // 当前连接是 WORKS_IN，替换现有连接
            linkMap.delete(key)
            linkMap.delete(reverseKey)
            linkMap.set(key, link)
          }
          // 如果当前连接不是 WORKS_IN 或现有连接已经是 WORKS_IN，则保持现有连接
        }
      })

      const processedLinks = Array.from(linkMap.values()).map((link: any) => ({
        source: link.fromId.toString(),
        target: link.toId.toString(),
        label: { show: false, formatter: link.formatter || 'BELONGS_TO' },
        relationshipType: link.formatter || 'BELONGS_TO',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      const chartData = prepareChartData(processedNodes, processedLinks, false)
      updateChart(chart, chartData)
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)
    }
  } catch (error) {
    console.error('加载机构网络数据失败:', error)
  } finally {
    loading.value = false
  }
}

const formatNodeTooltip = (node: any) => {
  return `
    <div class="font-bold text-lg">${node.name}</div>
    <div class="text-sm opacity-75 mt-1">${
      node.title == 'null' || node.title == null ? '未知职位' : node.title
    } ${node.gender === 'male' ? '男' : '女'}</div>
    ${node.institution ? `<div class=\"text-sm opacity-75\">${node.institution}</div>` : ''}
    <div class=\"text-sm opacity-75 mt-1\">论文: ${node.publicationNum ?? 0} 篇，项目: ${
    node.projectNum ?? 0
  } 个</div>
    ${
      node.followerNum
        ? `<div class=\"text-sm opacity-75\">关注者: ${node.followerNum}人</div>`
        : ''
    }
  `
}

// 加载特定用户的机构网络数据
const loadUserGraph = async (userId: string) => {
  if (!chart) return
  try {
    loading.value = true

    const response = await getInstitution(userId)
    if (response.data) {
      // 处理API返回的节点数据
      const apiNodes = response.data.nodes.map((node: any) => {
        if (typeof node.id === 'string') {
          // 机构节点（字符串ID）
          return {
            ...node,
            type: 'language',
            category: 1,
            imgUrl: null,
            initials: node.id ? node.id.charAt(0) : 'I',
            name: node.id,
          }
        } else {
          // 用户节点（数字ID）
          return {
            ...node,
            type: 'user',
            category: 0,
            imgUrl: node.imgUrl || null,
            initials: node.name ? node.name.charAt(0) : 'U',
          }
        }
      })

      // 只保留与当前用户有关联的机构节点
      const userIdStr = String(userId)
      const relatedInstitutionIds = new Set(
        response.data.links
          .filter(
            (link: any) =>
              link.fromId.toString() === userIdStr || link.toId.toString() === userIdStr
          )
          .map((link: any) => {
            // 机构节点id为字符串
            return link.fromId.toString() === userIdStr
              ? link.toId.toString()
              : link.fromId.toString()
          })
      )

      // 分离 WORKS_IN 和其他类型的连接
      const worksInLinks = response.data.links.filter(
        (link: any) => (link.formatter || 'BELONGS_TO') === 'WORKS_IN'
      )
      const otherLinks = response.data.links.filter(
        (link: any) => (link.formatter || 'BELONGS_TO') !== 'WORKS_IN'
      )

      // 对非 WORKS_IN 连接按 attr.count 排序，只保留最大的4个
      const sortedOtherLinks = otherLinks
        .sort((a: any, b: any) => {
          const countA = Number(a.attr?.count) || 0
          const countB = Number(b.attr?.count) || 0
          return countB - countA
        })
        .slice(0, 4)

      // 获取需要保留的机构ID（WORKS_IN连接 + 前4个其他连接）
      const keptInstitutionIds = new Set()

      // 添加 WORKS_IN 连接的机构ID
      worksInLinks.forEach((link: any) => {
        if (link.fromId.toString() === userIdStr) {
          keptInstitutionIds.add(link.toId.toString())
        } else {
          keptInstitutionIds.add(link.fromId.toString())
        }
      })

      // 添加前4个其他连接的机构ID
      sortedOtherLinks.forEach((link: any) => {
        if (link.fromId.toString() === userIdStr) {
          keptInstitutionIds.add(link.toId.toString())
        } else {
          keptInstitutionIds.add(link.fromId.toString())
        }
      })

      // 更新 relatedInstitutionIds，只保留需要显示的机构
      const finalInstitutionIds = new Set(
        Array.from(relatedInstitutionIds).filter(id => keptInstitutionIds.has(id))
      )

      // 重新过滤节点，只保留最终需要的机构节点
      const processedNodes = apiNodes.filter((node: any) => {
        if (node.type === 'user') return true
        if (node.type === 'language') return finalInstitutionIds.has(node.id)
        return false
      })

      // 合并 WORKS_IN 连接和筛选后的其他连接
      const allKeptLinks = [...worksInLinks, ...sortedOtherLinks]

      // 去重处理：如果两个节点间有多个连接，优先保留 WORKS_IN 类型
      const linkMap = new Map()
      allKeptLinks.forEach((link: any) => {
        const key = `${link.fromId.toString()}-${link.toId.toString()}`
        const reverseKey = `${link.toId.toString()}-${link.fromId.toString()}`

        // 检查是否已存在连接
        const existingLink = linkMap.get(key) || linkMap.get(reverseKey)

        if (!existingLink) {
          // 如果不存在连接，直接添加
          linkMap.set(key, link)
        } else {
          // 如果存在连接，检查当前连接是否为 WORKS_IN 类型
          const currentFormatter = link.formatter || 'BELONGS_TO'
          const existingFormatter = existingLink.formatter || 'BELONGS_TO'

          if (currentFormatter === 'WORKS_IN' && existingFormatter !== 'WORKS_IN') {
            // 当前连接是 WORKS_IN，替换现有连接
            linkMap.delete(key)
            linkMap.delete(reverseKey)
            linkMap.set(key, link)
          }
          // 如果当前连接不是 WORKS_IN 或现有连接已经是 WORKS_IN，则保持现有连接
        }
      })

      const processedLinks = Array.from(linkMap.values()).map((link: any) => ({
        source: link.fromId.toString(),
        target: link.toId.toString(),
        label: { show: false, formatter: link.formatter || 'BELONGS_TO' },
        relationshipType: link.formatter || 'BELONGS_TO',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      const chartData = prepareChartData(processedNodes, processedLinks, false)
      updateChart(chart, chartData)
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)

      console.log('用户机构网络加载完成')
      console.log(props.selectedNode)
    }
  } catch (error) {
    console.error('加载用户机构网络数据失败:', error)
  } finally {
    loading.value = false
  }
}

const prepareChartData = (nodes: any[], links: any[], centerUser: boolean = false) => {
  // 统计每个to节点的link类型（只取第一个指向它的link类型）
  const toNodeTypeMap: Record<string, string> = {}
  links.forEach(link => {
    if (!toNodeTypeMap[link.target]) {
      toNodeTypeMap[link.target] = link.relationshipType
    }
  })

  const chartNodes = nodes.map(node => {
    // 如果该节点是to节点，优先用linkTypeColorMap，否则用原有逻辑
    const toType = toNodeTypeMap[node.id]
    const color = toType
      ? linkTypeColorMap[toType] || linkTypeColorMap.DEFAULT
      : node.type === 'user'
      ? '#8b5cf6'
      : '#3b82f6'
    const baseNode = {
      id: node.id,
      name: node.name,
      symbolSize:
        node.type == 'user'
          ? Math.min(
              50,
              30 + (Number(node.publicationNum) || 0) * 1.5 + (Number(node.projectNum) || 0) * 2.5
            )
          : Math.min(
              70,
              50 +
                (Number(node.publicationNum) || 0) * 1.5 +
                (Number(node.projectNum) || 0) * 1.5 +
                (Number(node.subscribeNum) || 0) * 1
            ),
      itemStyle: {
        color,
      },
      symbol: node.type === 'user' ? 'circle' : 'diamond',
      category: node.category,
      ...node,
    }
    if (centerUser && node.type === 'user' && node.id === userStore.user?.id) {
      return {
        ...baseNode,
        x: 0,
        y: 0,
        fixed: true,
      }
    }
    return baseNode
  })

  const chartLinks = links.map(link => {
    // 根据关系类型选择颜色
    const color = linkTypeColorMap[link.relationshipType] || linkTypeColorMap.DEFAULT

    // 计算连线粗细，基于 attr.count
    let lineWidth = 2 // 默认宽度
    if (link.attr && link.attr.count !== undefined && link.attr.count !== null) {
      const count = Number(link.attr.count)
      if (!isNaN(count) && count > 0) {
        // 根据 count 值计算宽度，可以调整这个公式来获得更好的视觉效果
        lineWidth = Math.max(1, Math.min(8, 2 + count * 0.5))
      }
    }

    return {
      source: link.source,
      target: link.target,
      value: 1,
      lineStyle: {
        color,
        width: lineWidth,
        type: 'solid',
      },
      label: link.label,
      relationshipType: link.label?.formatter || 'BELONGS_TO',
      ...link,
    }
  })

  return { nodes: chartNodes, links: chartLinks }
}

const updateChart = (chartInstance: echarts.ECharts, data: any) => {
  const option = {
    animationDuration: 1500,
    series: [
      {
        type: 'graph',
        layout: props.layoutType,
        data: data.nodes,
        links: data.links,
        categories: [
          { name: 0, itemStyle: { color: '#8b5cf6' } },
          { name: 1, itemStyle: { color: '#3b82f6' } },
        ],
        roam: true,
        label: {
          show: true,
          position: 'bottom',
          formatter: '{b}',
          fontSize: 11,
          color: props.isDarkMode ? '#e2e8f0' : '#334155',
          backgroundColor: props.isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderRadius: 4,
          padding: [4, 6],
        },
        labelLayout: { hideOverlap: true, moveOverlap: 'shiftY' },
        lineStyle: { color: 'source', curveness: 0.1 },
        edgeSymbol: ['none', 'none'],
        edgeSymbolSize: [0, 0],
        emphasis: {
          focus: 'adjacency',
          scale: true,
          lineStyle: {
            width: 4,
            color: '#3b82f6',
            shadowBlur: 10,
            shadowColor: 'rgba(59, 130, 246, 0.5)',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: 2,
            borderColor: '#3b82f6',
          },
        },
        force:
          props.layoutType === 'force'
            ? {
                repulsion: [200, 400],
                gravity: 0.05,
                edgeLength: [120, 200],
                layoutAnimation: true,
              }
            : undefined,
        circular: props.layoutType === 'circular' ? { rotateLabel: true } : undefined,
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          if (params.data.type === 'user') {
            return `<div class="font-bold text-lg">${params.data.name}</div>
            <div class="text-sm opacity-75">论文: ${params.data.publicationNum || 0} 篇，项目: ${
              params.data.projectNum || 0
            } 个</div>
            `
          } else {
            return `<div class="font-bold text-lg">${params.data.name}</div>
            <div class="text-sm opacity-75">论文: ${params.data.publicationNum || 0} 篇，项目: ${
              params.data.projectNum || 0
            } 个</div>
            <div class="text-sm opacity-75">关注者: ${params.data.subscribeNum || 0} 人</div>
            `
          }
        } else if (params.dataType === 'edge') {
          return formatEdgeTooltip(params.data)
        }
        return ''
      },
      backgroundColor: props.isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: props.isDarkMode ? '#475569' : '#e2e8f0',
      textStyle: { color: props.isDarkMode ? '#e2e8f0' : '#334155' },
    },
  }
  chartInstance.setOption(option, true)
}

const handleNodeClick = (nodeData: any) => {
  emit('nodeClick', nodeData)
}

const refreshGraph = () => {
  loadGraphData()
}

const formatEdgeTooltip = (edge: any) => {
  const sourceNode = graphNodes.value.find(node => node.id.toString() === edge.source)
  const targetNode = graphNodes.value.find(node => node.id.toString() === edge.target)

  // 获取连接强度信息
  let strengthText = ''
  if (edge.attr && edge.attr.count !== undefined && edge.attr.count !== null) {
    const count = Number(edge.attr.count)
    if (!isNaN(count) && count > 0) {
      strengthText = ` (强度: ${count})`
    }
  }

  console.log(edge)
  if (sourceNode && targetNode) {
    // 根据关系类型显示不同的文本
    let relationshipText = '关注'
    if (edge.relationshipType == 'WORKS_IN') {
      relationshipText = '隶属于'
    }

    return `
      <div>
        <div style=\"font-size: 12px; color: #64748b; line-height: 1.4;\">
          <span style=\"color: #334155; font-weight: 500;\">${sourceNode.name}</span>
          <span style=\"margin: 0 4px; color: #8b5cf6; font-weight: bold;\">${relationshipText}${strengthText}</span>  
          <span style=\"color: #334155; font-weight: 500;\">${targetNode.name}</span>
        </div>
      </div>
    `
  }
  return ''
}

// 加载机构对应的科研人员
const loadInstitutionResearchers = async (institutionName: string, researchersData: any) => {
  if (!chart) return
  try {
    loading.value = true
    const response = await getResearcherByInstitution(institutionName)

    // 直接使用接口返回的数据结构
    const nodes = response.data?.nodes || []
    const links = response.data?.links || []

    // 处理节点数据
    const processedNodes = nodes.map((node: any) => {
      if (typeof node.id === 'string') {
        // 机构节点（字符串ID）
        return {
          ...node,
          type: 'language',
          category: 1,
          imgUrl: null,
          initials: node.id ? node.id.charAt(0) : 'I',
          name: node.id,
        }
      } else {
        // 用户节点（数字ID）
        return {
          ...node,
          type: 'user',
          category: 0,
          imgUrl: node.imgUrl || null,
          initials: node.name ? node.name.charAt(0) : 'U',
        }
      }
    })

    // 处理连接数据，去重处理：如果两个节点间有多个连接，优先保留 WORKS_IN 类型
    const linkMap = new Map()
    links.forEach((link: any) => {
      const key = `${link.fromId.toString()}-${link.toId.toString()}`
      const reverseKey = `${link.toId.toString()}-${link.fromId.toString()}`

      // 检查是否已存在连接
      const existingLink = linkMap.get(key) || linkMap.get(reverseKey)

      if (!existingLink) {
        // 如果不存在连接，直接添加
        linkMap.set(key, link)
      } else {
        // 如果存在连接，检查当前连接是否为 WORKS_IN 类型
        const currentFormatter = link.formatter || 'WORKS_IN'
        const existingFormatter = existingLink.formatter || 'WORKS_IN'

        if (currentFormatter === 'WORKS_IN' && existingFormatter !== 'WORKS_IN') {
          // 当前连接是 WORKS_IN，替换现有连接
          linkMap.delete(key)
          linkMap.delete(reverseKey)
          linkMap.set(key, link)
        }
        // 如果当前连接不是 WORKS_IN 或现有连接已经是 WORKS_IN，则保持现有连接
      }
    })

    const processedLinks = Array.from(linkMap.values()).map((link: any) => ({
      source: link.fromId.toString(),
      target: link.toId.toString(),
      label: { show: false, formatter: link.formatter || 'WORKS_IN' },
      relationshipType: link.formatter || 'WORKS_IN',
    }))

    // 存储所有数据
    allNodes.value = processedNodes
    allLinks.value = processedLinks
    currentInstitution.value = institutionName

    // 计算分页
    const userNodes = processedNodes.filter((node: any) => node.type === 'user')
    const institutionNodes = processedNodes.filter((node: any) => node.type === 'language')

    totalPages.value = Math.ceil(userNodes.length / pageSize.value)
    currentPage.value = 1
    showPagination.value = userNodes.length > pageSize.value

    // 应用分页
    applyPagination()

    console.log('机构科研人员图谱更新完成')
  } catch (error) {
    console.error('加载机构科研人员失败:', error)
  } finally {
    loading.value = false
  }
}

// 应用分页
const applyPagination = () => {
  if (!allNodes.value.length || !chart) return

  const userNodes = allNodes.value.filter((node: any) => node.type === 'user')
  const institutionNodes = allNodes.value.filter((node: any) => node.type === 'language')

  // 计算当前页的用户节点
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  const currentPageUserNodes = userNodes.slice(startIndex, endIndex)

  // 合并机构节点和当前页的用户节点
  const currentPageNodes = [...institutionNodes, ...currentPageUserNodes]

  // 过滤连接，只保留当前页节点之间的连接
  const currentPageNodeIds = currentPageNodes.map(node => node.id.toString())
  const currentPageLinks = allLinks.value.filter(
    link => currentPageNodeIds.includes(link.source) && currentPageNodeIds.includes(link.target)
  )

  // 更新图表数据
  graphNodes.value = currentPageNodes
  graphLinks.value = currentPageLinks
  nodeCount.value = currentPageNodes.length
  linkCount.value = currentPageLinks.length

  const chartData = prepareChartData(currentPageNodes, currentPageLinks, false)
  updateChart(chart, chartData)
  emit('nodeCountChange', currentPageNodes.length)
  emit('linkCountChange', currentPageLinks.length)
}

// 分页控制函数
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    applyPagination()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    applyPagination()
  }
}

const handleResize = () => {
  if (chart) chart.resize()
}

onMounted(async () => {
  initializeChart()
  window.addEventListener('resize', handleResize)
  await nextTick()
  if (props.selectedNode && props.selectedNode.type === 'user') {
    // 不执行初始化
    return
  }
  await loadGraphData()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chart) {
    chart.dispose()
    chart = null
  }
})

watch(
  () => props.layoutType,
  () => {
    if (chart) {
      const chartData = prepareChartData(graphNodes.value, graphLinks.value, false)
      updateChart(chart, chartData)
    }
  }
)

watch(
  () => props.isDarkMode,
  () => {
    if (chart) {
      chart.dispose()
      initializeChart()
      const chartData = prepareChartData(graphNodes.value, graphLinks.value, false)
      updateChart(chart, chartData)
    }
  }
)

defineExpose({
  refreshGraph,
  loadUserGraph,
  loadInstitutionResearchers,
  nodeCount,
  linkCount,
})
</script>

<script lang="ts">
export default {
  name: 'InstitutionNetwork',
}
</script>

<style scoped>
.graph-container {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}
.dark .graph-container {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}
</style>