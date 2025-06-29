<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我的申请</h1>
          <p class="mt-2 text-gray-600">查看和管理你提交的项目申请</p>
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          @click="router.push('/research/projects')"
        >
          浏览项目
        </button>
      </div>

      <!-- 筛选工具栏 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="px-6 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <select
              v-model="statusFilter"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <span class="text-sm text-gray-500"> 共 {{ filteredApplications.length }} 个申请 </span>
        </div>
      </div>

      <!-- 申请列表 -->
      <div class="space-y-6">
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">正在加载申请列表...</span>
        </div>

        <!-- 空状态 -->
        <div
          v-else-if="filteredApplications.length === 0"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
        >
          <svg
            class="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            ></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无申请</h3>
          <p class="text-gray-500 mb-4">你还没有提交任何项目申请</p>
          <button
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            @click="router.push('/research/projects')"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            浏览项目
          </button>
        </div>

        <!-- 申请列表 -->
        <div
          v-for="application in filteredApplications"
          v-else
          :key="application.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ application.project.title }}
                  </h3>
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      getStatusColor(application.status),
                    ]"
                  >
                    {{ getStatusText(application.status) }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="field in (application.project.researchArea || '').split(',')"
                    :key="field"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ field.trim() }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  v-if="application.status === 'pending'"
                  class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  @click="cancelApplication(application)"
                >
                  取消申请
                </button>
                <button
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  @click="viewProjectDetail(application.project)"
                >
                  查看项目
                </button>
              </div>
            </div>

            <!-- 申请详情 -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-700 mb-2">申请理由</h4>
                  <p class="text-gray-600 text-sm">{{ application.reason }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-700 mb-2">相关经验</h4>
                  <p class="text-gray-600 text-sm">{{ application.experience }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-700 mb-2">时间投入</h4>
                  <p class="text-gray-600 text-sm">{{ getTimeCommitmentText(application.time) }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-700 mb-2">联系方式</h4>
                  <p class="text-gray-600 text-sm font-mono">{{ application.contact }}</p>
                </div>
              </div>
            </div>

            <!-- 项目负责人和时间 -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <img
                  :src="getAvatarUrl(application.project.owner.imgUrl)"
                  :alt="application.project.owner.name"
                  class="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ application.project.owner.name }}
                  </p>
                  <p class="text-xs text-gray-500">{{ application.project.owner.institution }}</p>
                </div>
              </div>
              <div class="text-sm text-gray-500">
                申请于 {{ formatTime(application.createdAt) }}
              </div>
            </div>

            <!-- 处理结果 -->
            <div
              v-if="application.status !== 'pending'"
              class="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ application.status === 'approved' ? '申请已通过' : '申请被拒绝' }}
                  </p>
                  <p class="text-xs text-gray-500">
                    处理时间：{{ formatTime(application.createdAt) }}
                  </p>
                </div>
                <div
                  :class="[
                    'text-sm font-medium',
                    application.status === 'approved' ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  {{ application.status === 'approved' ? '✓ 已通过' : '✗ 已拒绝' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 取消申请确认弹窗 -->
    <div
      v-if="showCancelDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-gray-900">确认取消</h3>
              <p class="text-sm text-gray-500 mt-1">此操作不可撤销</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-gray-700">
            确定要取消对项目
            <span class="font-semibold text-gray-900">{{
              applicationToCancel?.project.title
            }}</span>
            的申请吗？
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            @click="showCancelDialog = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
            @click="confirmCancelApplication"
          >
            确认取消
          </button>
        </div>
      </div>
    </div>

    <!-- 项目详情对话框 -->
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      :is-my-project="false"
      @close="showProjectDetail = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getMyApplications, cancelApplication as cancelApplicationApi } from '@/api/modules/project'
import type { ApplicationDetail } from '@/api/types/project'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'

const router = useRouter()

// 响应式数据
const applications = ref<ApplicationDetail[]>([])
const loading = ref(false)
const statusFilter = ref('')
const showCancelDialog = ref(false)
const applicationToCancel = ref<ApplicationDetail | null>(null)
const showProjectDetail = ref(false)
const selectedProjectForDetail = ref<{
  id: number
  title: string
  description: string
  fields: string[]
  requirements: string[]
  status: string
  maxMembers: number
  memberCount: number
  applicationCount: number
  createdAt: string
  startDate?: string
  endDate?: string
  contactInfo?: string
  owner: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }
  collaborators: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }[]
} | null>(null)

// 计算属性
const filteredApplications = computed(() => {
  let filtered = applications.value
  if (statusFilter.value) {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }
  return filtered
})

// 加载申请列表
const loadApplications = async () => {
  loading.value = true
  try {
    const res = await getMyApplications()
    if (res && res.data) {
      applications.value = res.data
    }
  } catch (error) {
    console.error('获取申请列表失败:', error)
    ElMessage.error('获取申请列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 取消申请
const cancelApplication = (application: ApplicationDetail) => {
  applicationToCancel.value = application
  showCancelDialog.value = true
}

const confirmCancelApplication = async () => {
  if (!applicationToCancel.value) return

  showCancelDialog.value = false
  try {
    await cancelApplicationApi({ applicationId: applicationToCancel.value.id })
    ElMessage.success('申请已取消')
    // 重新加载申请列表
    loadApplications()
    applicationToCancel.value = null
  } catch (error) {
    console.error('取消申请失败:', error)
    ElMessage.error('取消申请失败，请稍后重试')
  }
}

// 查看项目详情
const viewProjectDetail = (project: {
  id: number
  title: string
  description: string
  researchArea: string
  collaborationCondition: string
  recruitNum: number
  recruitedNum: number
  applyNum: string
  createAt: string
  startTime: string
  endTime: string
  contact: string
  owner: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }
}) => {
  // 转换项目数据格式
  const adaptedProject = {
    id: project.id,
    title: project.title,
    description: project.description || '无',
    fields: (project.researchArea || '')
      .split(',')
      .filter((field: string) => field.trim())
      .map((field: string) => field.trim()),
    requirements: (project.collaborationCondition || '')
      .split(',')
      .filter((req: string) => req.trim())
      .map((req: string) => req.trim()),
    status: 'recruiting', // 默认状态
    maxMembers: project.recruitNum,
    memberCount: project.recruitedNum,
    applicationCount: parseInt(project.applyNum),
    createdAt: project.createAt || '',
    startDate: project.startTime || '',
    endDate: project.endTime || '',
    contactInfo: project.contact || '无',
    owner: {
      id: project.owner.id,
      name: project.owner.name,
      institution: project.owner.institution,
      title: project.owner.title || '未知职位',
      imgUrl: project.owner.imgUrl,
    },
    collaborators: [],
  }

  selectedProjectForDetail.value = adaptedProject
  showProjectDetail.value = true
}

// 工具函数
const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.pending
}

const getStatusText = (status: string) => {
  const texts = {
    pending: '待处理',
    approved: '已通过',
    rejected: '已拒绝',
  }
  return texts[status as keyof typeof texts] || texts.pending
}

const getTimeCommitmentText = (timeCommitment: string) => {
  const texts = {
    'full-time': '全职参与',
    'part-time': '兼职参与（每周20+小时）',
    flexible: '灵活参与（每周10-20小时）',
    limited: '有限参与（每周5-10小时）',
  }
  return texts[timeCommitment as keyof typeof texts] || timeCommitment
}

const formatTime = (dateString: string) => {
  if (!dateString) return '未知时间'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '无效时间'
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') return '/default-avatar.png'
  if (imgUrl.startsWith('http')) return imgUrl
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

// 页面初始化
onMounted(() => {
  loadApplications()
})
</script>
