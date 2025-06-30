<template>
  <div class="graph-container relative flex-1 min-h-[600px]">
    <div id="area-graph" class="w-full h-full min-h-[600px]" ref="graphContainer"></div>

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
            : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
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
            : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
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
            class="absolute inset-0 rounded-full border-4 border-emerald-100 dark:border-emerald-900"
          ></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"
          ></div>
        </div>
        <p class="mt-4 text-slate-600 dark:text-slate-400 font-medium">正在构建领域网络...</p>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!loading && nodeCount === 0"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center max-w-sm">
        <div class="mb-4 text-slate-400 dark:text-slate-500">
          <i class="fas fa-book text-6xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">暂无领域网络数据</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">请尝试调整筛选条件或搜索关键词</p>
        <button
          @click="refreshGraph"
          class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
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
import { getArea, getResearcherByArea } from '@/api/modules/graph'
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
const currentArea = ref<string>('') // 当前显示的领域名称

const graphContainer = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
const userStore = useUserStore()

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

    const response = await getArea(user.id)
    if (response.data) {
      const processedNodes = response.data.nodes.map((node: any) => {
        if (typeof node.id === 'string') {
          // 研究领域节点（字符串ID）
          return {
            ...node,
            type: 'field',
            category: 1,
            imgUrl: null,
            initials: node.id ? node.id.charAt(0) : 'A',
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

      const processedLinks = response.data.links.map((link: any) => ({
        source: link.fromId.toString(),
        target: link.toId.toString(),
        label: { show: false, formatter: link.formatter || 'MAJORS_IN' },
        relationshipType: link.formatter || 'MAJORS_IN',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      const chartData = prepareChartData(processedNodes, processedLinks)
      updateChart(chart, chartData)
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)
    }
  } catch (error) {
    console.error('加载领域网络数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载特定用户的领域网络数据
const loadUserGraph = async (userId: string) => {
  if (!chart) return
  try {
    loading.value = true

    const response = await getArea(userId)
    if (response.data) {
      const processedNodes = response.data.nodes.map((node: any) => {
        if (typeof node.id === 'string') {
          // 研究领域节点（字符串ID）
          return {
            ...node,
            type: 'field',
            category: 1,
            imgUrl: null,
            initials: node.id ? node.id.charAt(0) : 'A',
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

      const processedLinks = response.data.links.map((link: any) => ({
        source: link.fromId.toString(),
        target: link.toId.toString(),
        label: { show: false, formatter: link.formatter || 'MAJORS_IN' },
        relationshipType: link.formatter || 'MAJORS_IN',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      const chartData = prepareChartData(processedNodes, processedLinks)
      updateChart(chart, chartData)
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)

      console.log('用户领域网络加载完成')
    }
  } catch (error) {
    console.error('加载用户领域网络数据失败:', error)
  } finally {
    loading.value = false
  }
}

const prepareChartData = (nodes: any[], links: any[]) => {
  const chartNodes = nodes.map(node => ({
    id: node.id,
    name: node.name,
    symbolSize: node.type == 'user' ? Math.min(
      50,
      30 + (Number(node.publicationNum) || 0) * 1.5 + (Number(node.projectNum) || 0) * 2.5
    ) : Math.min(50, 30 + (Number(node.publicationNum) || 0) * 1.5 + (Number(node.projectNum) || 0) * 1.5 + (Number(node.subscribeNum) || 0) * 1),
    itemStyle: {
      color: node.type === 'user' ? '#8b5cf6' : '#10b981',
    },
    symbol: node.type === 'user' ? 'circle' : 'rect',
    category: node.category,
    ...node,
  }))

  const chartLinks = links.map(link => ({
    source: link.source,
    target: link.target,
    value: 1,
    lineStyle: {
      color: '#10b981',
      width: link.attr && !isNaN(Number(link.attr)) ? Math.max(2, Number(link.attr)) : 2,
      type: 'solid',
    },
    label: link.label,
    relationshipType: link.label?.formatter || 'MAJORS_IN',
    ...link,
  }))

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
          { name: 1, itemStyle: { color: '#10b981' } },
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
            color: '#10b981',
            shadowBlur: 10,
            shadowColor: 'rgba(16, 185, 129, 0.5)',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: 2,
            borderColor: '#10b981',
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
            `
          }
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

// 加载领域对应的科研人员
const loadAreaResearchers = async (areaName: string, researchersData: any) => {
  if (!chart) return
  try {
    loading.value = true
    const response = await getResearcherByArea(areaName)

    // 处理API返回的数据结构
    const { nodes, links } = response.data

    // 处理节点数据
    const processedNodes = nodes.map((node: any) => {
      if (typeof node.id === 'string') {
        // 领域节点（字符串ID）
        return {
          ...node,
          type: 'field',
          category: 1,
          imgUrl: null,
          initials: node.id ? node.id.charAt(0) : 'A',
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

    // 处理连接数据
    const processedLinks = links.map((link: any) => ({
      source: link.fromId.toString(),
      target: link.toId.toString(),
      label: { show: false, formatter: link.formatter || 'MAJORS_IN' },
      relationshipType: link.formatter || 'MAJORS_IN',
    }))

    // 存储所有数据
    allNodes.value = processedNodes
    allLinks.value = processedLinks
    currentArea.value = areaName

    // 计算分页
    const userNodes = processedNodes.filter((node: any) => node.type === 'user')
    const fieldNodes = processedNodes.filter((node: any) => node.type === 'field')

    totalPages.value = Math.ceil(userNodes.length / pageSize.value)
    currentPage.value = 1
    showPagination.value = userNodes.length > pageSize.value

    // 应用分页
    applyPagination()

    console.log('领域科研人员图谱更新完成')
  } catch (error) {
    console.error('加载领域科研人员失败:', error)
  } finally {
    loading.value = false
  }
}

// 应用分页
const applyPagination = () => {
  if (!allNodes.value.length || !chart) return

  const userNodes = allNodes.value.filter((node: any) => node.type === 'user')
  const fieldNodes = allNodes.value.filter((node: any) => node.type === 'field')

  // 计算当前页的用户节点
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  const currentPageUserNodes = userNodes.slice(startIndex, endIndex)

  // 合并领域节点和当前页的用户节点
  const currentPageNodes = [...fieldNodes, ...currentPageUserNodes]

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

  const chartData = prepareChartData(currentPageNodes, currentPageLinks)
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
      const chartData = prepareChartData(graphNodes.value, graphLinks.value)
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
      const chartData = prepareChartData(graphNodes.value, graphLinks.value)
      updateChart(chart, chartData)
    }
  }
)

defineExpose({
  refreshGraph,
  loadUserGraph,
  loadAreaResearchers,
  nodeCount,
  linkCount,
})
</script>

<script lang="ts">
export default {
  name: 'AreaNetwork',
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