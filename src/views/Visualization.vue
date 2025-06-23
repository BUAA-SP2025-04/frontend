<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">数据可视化</h1>
        <p class="text-gray-600">知识图谱、词云、趋势图等可视化展示</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">知识图谱</h3>
          <div ref="knowledgeGraphRef" class="w-full h-80"></div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold mb-4">词云图</h3>
          <div ref="wordCloudRef" class="w-full h-80"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">趋势分析</h3>
          <div ref="trendChartRef" class="w-full h-80"></div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold mb-4">数据分布</h3>
          <div ref="distributionChartRef" class="w-full h-80"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const knowledgeGraphRef = ref<HTMLElement>()
const wordCloudRef = ref<HTMLElement>()
const trendChartRef = ref<HTMLElement>()
const distributionChartRef = ref<HTMLElement>()

onMounted(() => {
  initKnowledgeGraph()
  initWordCloud()
  initTrendChart()
  initDistributionChart()
})

const initKnowledgeGraph = () => {
  if (!knowledgeGraphRef.value) return

  const chart = echarts.init(knowledgeGraphRef.value)

  const option = {
    title: {
      text: '知识图谱',
      left: 'center',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
        },
        force: {
          repulsion: 2500,
          edgeLength: [10, 50],
        },
        data: [
          { name: '人工智能', value: 20, category: 0 },
          { name: '机器学习', value: 15, category: 0 },
          { name: '深度学习', value: 12, category: 0 },
          { name: '自然语言处理', value: 18, category: 1 },
          { name: '计算机视觉', value: 16, category: 1 },
          { name: '知识图谱', value: 14, category: 2 },
          { name: '语义网络', value: 10, category: 2 },
        ],
        links: [
          { source: '人工智能', target: '机器学习' },
          { source: '机器学习', target: '深度学习' },
          { source: '人工智能', target: '自然语言处理' },
          { source: '人工智能', target: '计算机视觉' },
          { source: '自然语言处理', target: '知识图谱' },
          { source: '知识图谱', target: '语义网络' },
        ],
        categories: [{ name: '核心技术' }, { name: '应用领域' }, { name: '知识表示' }],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  }

  chart.setOption(option)
}

const initWordCloud = () => {
  if (!wordCloudRef.value) return

  const chart = echarts.init(wordCloudRef.value)

  const option = {
    title: {
      text: '关键词词云',
      left: 'center',
    },
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(',') +
              ')'
            )
          },
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: [
          { name: '人工智能', value: 100 },
          { name: '机器学习', value: 80 },
          { name: '深度学习', value: 70 },
          { name: '自然语言处理', value: 60 },
          { name: '计算机视觉', value: 50 },
          { name: '知识图谱', value: 40 },
          { name: '神经网络', value: 35 },
          { name: '算法', value: 30 },
          { name: '数据挖掘', value: 25 },
          { name: '模式识别', value: 20 },
        ],
      },
    ],
  }

  chart.setOption(option)
}

const initTrendChart = () => {
  if (!trendChartRef.value) return

  const chart = echarts.init(trendChartRef.value)

  const option = {
    title: {
      text: '研究趋势',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['论文数量', '引用次数'],
      top: 30,
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '论文数量',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230],
        smooth: true,
      },
      {
        name: '引用次数',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330],
        smooth: true,
      },
    ],
  }

  chart.setOption(option)
}

const initDistributionChart = () => {
  if (!distributionChartRef.value) return

  const chart = echarts.init(distributionChartRef.value)

  const option = {
    title: {
      text: '学科分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '学科分布',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '计算机科学' },
          { value: 735, name: '数学' },
          { value: 580, name: '统计学' },
          { value: 484, name: '物理学' },
          { value: 300, name: '其他' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  chart.setOption(option)
}
</script>
