<template>
  <div class="graph-container relative flex-1 min-h-[600px]">
    <div id="follow-graph" class="w-full h-full min-h-[600px]" ref="graphContainer"></div>

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
        <p class="mt-4 text-slate-600 dark:text-slate-400 font-medium">正在构建关注网络...</p>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!loading && nodeCount === 0"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center max-w-sm">
        <div class="mb-4 text-slate-400 dark:text-slate-500">
          <i class="fas fa-users text-6xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">暂无关注网络数据</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">
          请尝试调整筛选条件或搜索关键词，也可能是当前数据尚未加载完成
        </p>
        <button
          @click="refreshGraph"
          class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
        >
          <i class="fas fa-sync-alt mr-2"></i>
          重新加载
        </button>
      </div>
    </div>

    <!-- 节点关系提示 -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="hoveredEdge"
        class="absolute z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 max-w-xs"
        :style="{
          left: hoveredEdgePosition.x + 'px',
          top: hoveredEdgePosition.y + 'px',
        }"
      >
        <div class="text-sm text-slate-700 dark:text-slate-300">
          {{ hoveredEdge.relationshipType }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { getFollow } from '@/api/modules/graph'
import { useUserStore } from '@/stores/user'

// Props
interface Props {
  layoutType?: string
  isDarkMode?: boolean
  selectedNode: any
}

const props = withDefaults(defineProps<Props>(), {
  layoutType: 'force',
  isDarkMode: false,
})

// Emits
const emit = defineEmits<{
  nodeClick: [node: any]
  nodeCountChange: [count: number]
  linkCountChange: [count: number]
}>()

// 状态
const loading = ref(false)
const nodeCount = ref(0)
const linkCount = ref(0)
const hoveredEdge = ref<any>(null)
const hoveredEdgePosition = ref({ x: 0, y: 0 })

// 数据
const graphNodes = ref<any[]>([])
const graphLinks = ref<any[]>([])

// DOM引用
const graphContainer = ref<HTMLElement | null>(null)

// 图表实例
let chart: echarts.ECharts | null = null

// Store
const userStore = useUserStore()

// 1. 先定义接口
interface GraphExpose {
  refreshGraph: () => void
  loadUserGraph: (userId: string) => void
  focusOnNode: (nodeId: string) => void
}

// 2. ref 时加类型断言
const followNetworkRef = ref<GraphExpose | null>(null)
const institutionNetworkRef = ref<GraphExpose | null>(null)
const areaNetworkRef = ref<GraphExpose | null>(null)

// 初始化图表
const initializeChart = () => {
  if (!graphContainer.value) return

  chart = echarts.init(graphContainer.value, props.isDarkMode ? 'dark' : undefined, {
    renderer: 'canvas',
    useDirtyRect: true,
  })

  // 注册图表事件
  chart.on('click', (params: any) => {
    if (params.dataType === 'node') {
      handleNodeClick(params.data)
    }
  })

  chart.on('mouseover', (params: any) => {
    if (params.dataType === 'edge') {
      hoveredEdge.value = params.data
      hoveredEdgePosition.value = {
        x: params.event.offsetX,
        y: params.event.offsetY - 20,
      }
    }
  })

  chart.on('mouseout', (params: any) => {
    if (params.dataType === 'edge') {
      hoveredEdge.value = null
    }
  })
}

// 加载图谱数据
const loadGraphData = async () => {
  if (!chart) return

  try {
    loading.value = true

    // 获取用户关注网络数据
    const user = userStore.user
    if (!user) {
      throw new Error('用户信息未获取到')
    }

    const response = await getFollow(user.id)

    // 检查响应数据结构
    if (response && response.data) {
      // 处理不同的响应格式
      let nodes = []
      let links = []

      if (Array.isArray(response.data.nodes)) {
        nodes = response.data.nodes
        links = response.data.links || []
      }
      // 处理节点数据
      const processedNodes = nodes.map((node: any) => ({
        ...node,
        type: 'user',
        category: 0,
        initials: node.name ? node.name.charAt(0) : 'U',
      }))

      // 处理连接数据
      const processedLinks = links.map((link: any) => ({
        source: link.fromId ? link.fromId.toString() : link.source,
        target: link.toId ? link.toId.toString() : link.target,
        label: {
          show: false,
          formatter: link.formatter || 'FOLLOW',
        },
        relationshipType: link.formatter || 'FOLLOW',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      // 确保图表容器有尺寸
      if (graphContainer.value) {
        const rect = graphContainer.value.getBoundingClientRect()

        if (rect.width === 0 || rect.height === 0) {
          console.warn('图表容器尺寸为0，等待重新渲染')
          await nextTick()
          if (chart) {
            chart.resize()
          }
        }
      }

      // 更新图表
      const chartData = prepareChartData(processedNodes, processedLinks)

      updateChart(chart, chartData)

      // 触发事件
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)
    } else {
      console.error('API响应格式异常:', response)
      throw new Error('API响应格式异常')
    }
  } catch (error) {
    console.error('加载关注网络数据失败:', error)
    // 设置空数据状态
    nodeCount.value = 0
    linkCount.value = 0
  } finally {
    loading.value = false
  }
}

// 加载特定用户的图谱数据
const loadUserGraph = async (userId: string) => {
  console.log('FollowNetwork: 加载用户图谱，用户ID:', userId)

  if (!chart) return
  try {
    loading.value = true

    // 获取指定用户的关注网络数据
    const response = await getFollow(userId)

    // 检查响应数据结构
    if (response && response.data) {
      // 处理不同的响应格式
      let nodes = []
      let links = []

      if (Array.isArray(response.data.nodes)) {
        nodes = response.data.nodes
        links = response.data.links || []
      }

      // 处理节点数据
      const processedNodes = nodes.map((node: any) => ({
        ...node,
        type: 'user',
        category: 0,
        initials: node.name ? node.name.charAt(0) : 'U',
      }))

      // 处理连接数据
      const processedLinks = links.map((link: any) => ({
        source: link.fromId ? link.fromId.toString() : link.source,
        target: link.toId ? link.toId.toString() : link.target,
        label: {
          show: false,
          formatter: link.formatter || 'FOLLOW',
        },
        relationshipType: link.formatter || 'FOLLOW',
      }))

      graphNodes.value = processedNodes
      graphLinks.value = processedLinks
      nodeCount.value = processedNodes.length
      linkCount.value = processedLinks.length

      // 确保图表容器有尺寸
      if (graphContainer.value) {
        const rect = graphContainer.value.getBoundingClientRect()

        if (rect.width === 0 || rect.height === 0) {
          console.warn('图表容器尺寸为0，等待重新渲染')
          await nextTick()
          if (chart) {
            chart.resize()
          }
        }
      }

      // 更新图表
      const chartData = prepareChartData(processedNodes, processedLinks)
      updateChart(chart, chartData)

      // 触发事件通知父组件
      emit('nodeCountChange', processedNodes.length)
      emit('linkCountChange', processedLinks.length)
    }
  } catch (error) {
    console.error('加载用户图谱失败:', error)
  } finally {
    loading.value = false
  }
}

// 准备图表数据
const prepareChartData = (nodes: any[], links: any[]) => {
  const chartNodes = nodes.map(node => ({
    id: node.id,
    name: node.name,
    symbolSize: Math.min(
      50,
      30 + (Number(node.publicationNum) || 0) * 1.5 + (Number(node.projectNum) || 0) * 2.5
    ),
    itemStyle: {
      color: '#8b5cf6',
    },
    symbol: 'circle',
    category: node.category,
    ...node,
  }))

  const chartLinks = links.map(link => ({
    source: link.fromId ? link.fromId.toString() : link.source,
    target: link.toId ? link.toId.toString() : link.target,
    value: 1,
    lineStyle: {
      color: '#8b5cf6',
      width: link.attr && !isNaN(Number(link.attr.count)) ? Math.max(2, Number(link.attr.count)) : 2,
      type: 'solid',
    },
    label: link.label,
    relationshipType: link.label?.formatter || 'FOLLOW',
    ...link,
  }))

  return { nodes: chartNodes, links: chartLinks }
}

// 更新图表
const updateChart = (chartInstance: echarts.ECharts, data: any) => {
  console.log(111)
  console.log(data)
  const option = {
    animationDuration: 1500,
    series: [
      {
        type: 'graph',
        layout: props.layoutType,
        data: data.nodes,
        links: data.links,
        categories: [{ name: 0, itemStyle: { color: '#8b5cf6' } }],
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
        labelLayout: {
          hideOverlap: true,
          moveOverlap: 'shiftY',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.1,
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 8],
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
        circular:
          props.layoutType === 'circular'
            ? {
                rotateLabel: true,
              }
            : undefined,
      },
    ],
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      hideDelay: 100,
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          return formatNodeTooltip(params.data)
        } else if (params.dataType === 'edge') {
          return formatEdgeTooltip(params.data)
        }
        return ''
      },
      backgroundColor: props.isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: props.isDarkMode ? '#475569' : '#e2e8f0',
      textStyle: {
        color: props.isDarkMode ? '#e2e8f0' : '#334155',
      },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border-radius: 8px;',
    },
  }

  chartInstance.setOption(option, true)
}

// 格式化节点提示信息
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

// 格式化连接提示信息
const formatEdgeTooltip = (edge: any) => {
  const sourceNode = graphNodes.value.find(node => node.id.toString() === edge.source)
  const targetNode = graphNodes.value.find(node => node.id.toString() === edge.target)
  let attrValue = edge.attr ?? '无'
  let widthValue = edge.attr && !isNaN(Number(edge.attr)) ? Math.max(2, Number(edge.attr)) : 2

  if (sourceNode && targetNode) {
    return `
      <div>
        <div style=\"font-size: 12px; color: #64748b; line-height: 1.4;\">
          <span style=\"color: #334155; font-weight: 500;\">${sourceNode.name}</span>
          <span style=\"margin: 0 4px; color: #8b5cf6; font-weight: bold;\">关注</span>
          <span style=\"color: #334155; font-weight: 500;\">${targetNode.name}</span>
        </div>
      </div>
    `
  }
  return ''
}

// 事件处理函数
const handleNodeClick = (nodeData: any) => {
  console.log('子组件点击节点:', nodeData)
  // 直接传递节点数据给父组件，不在这里获取详细信息
  emit('nodeClick', nodeData)
  console.log('子组件已发送事件给父组件')
}

// 刷新图谱
const refreshGraph = () => {
  loadGraphData()
}

// 工具函数
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const handleResize = debounce(() => {
  if (chart) {
    chart.resize()
  }
}, 100)

// 生命周期
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

// 监听器
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

// 暴露方法
defineExpose({
  refreshGraph,
  loadUserGraph,
  nodeCount,
  linkCount,
})
</script>

export default { name: 'FollowNetwork' }

<style scoped>
.graph-container {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.dark .graph-container {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}
</style>