<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我加入的项目</h1>
          <p class="mt-2 text-gray-600">查看和管理你参与的项目</p>
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
              <option value="recruiting">招募中</option>
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
              <option value="pending">待开始</option>
            </select>
          </div>
          <span class="text-sm text-gray-500"> 共 {{ filteredProjects.length }} 个项目 </span>
        </div>
      </div>

      <!-- 项目列表 -->
      <div class="space-y-6">
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">正在加载项目列表...</span>
        </div>

        <!-- 空状态 -->
        <div
          v-else-if="filteredProjects.length === 0"
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
          <p class="text-gray-500 mb-4">你还没有加入任何项目</p>
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

        <!-- 项目列表 -->
        <div
          v-for="project in filteredProjects"
          v-else
          :key="project.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      getStatusColor(getProjectStatus(project)),
                    ]"
                  >
                    {{ getStatusText(getProjectStatus(project)) }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="field in (project.researchArea || '').split(',')"
                    :key="field"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ field.trim() }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  @click="quitProject(project)"
                >
                  退出项目
                </button>
                <button
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  @click="viewProjectDetail(project)"
                >
                  查看详情
                </button>
              </div>
            </div>

            <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>

            <!-- 项目负责人和时间 -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <img
                  :src="getAvatarUrl(project.owner.imgUrl)"
                  :alt="project.owner.name"
                  class="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ project.owner.name }}</p>
                  <p class="text-xs text-gray-500">{{ project.owner.institution }}</p>
                </div>
              </div>
              <div class="text-sm text-gray-500">加入于 {{ formatTime(project.createdAt) }}</div>
            </div>

            <!-- 项目统计和操作 -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div class="flex items-center space-x-6 text-sm text-gray-500">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    ></path>
                  </svg>
                  {{ project.recruitedNum }}/{{ project.recruitNum }} 成员
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  {{ project.applyNum }} 申请
                </span>
              </div>

              <div class="flex space-x-3">
                <button
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  @click="shareProject(project)"
                >
                  <svg
                    class="w-4 h-4 inline-block mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    ></path>
                  </svg>
                  分享
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 退出项目确认弹窗 -->
    <div
      v-if="showQuitDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-red-600"
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
              <h3 class="text-lg font-semibold text-gray-900">确认退出</h3>
              <p class="text-sm text-gray-500 mt-1">此操作不可撤销</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-gray-700">
            确定要退出项目
            <span class="font-semibold text-gray-900">{{ projectToQuit?.title }}</span> 吗？
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            @click="showQuitDialog = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            @click="confirmQuitProject"
          >
            确认退出
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
import { getMyJoinedProjects, cancelJoinProject } from '@/api/modules/project'
import type { Project } from '@/api/types/project'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'

const router = useRouter()

// 响应式数据
const projects = ref<Project[]>([])
const loading = ref(false)
const statusFilter = ref('')
const showQuitDialog = ref(false)
const projectToQuit = ref<Project | null>(null)
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
const filteredProjects = computed(() => {
  let filtered = projects.value
  if (statusFilter.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === statusFilter.value)
  }
  return filtered
})

// 加载项目列表
const loadProjects = async () => {
  loading.value = true
  try {
    const res = await getMyJoinedProjects()
    if (res && res.data) {
      projects.value = res.data
    }
  } catch (error) {
    console.error('获取项目列表失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 退出项目
const quitProject = (project: Project) => {
  projectToQuit.value = project
  showQuitDialog.value = true
}

const confirmQuitProject = async () => {
  if (!projectToQuit.value) return

  showQuitDialog.value = false
  try {
    await cancelJoinProject({ projectId: projectToQuit.value.id })
    ElMessage.success('已退出项目')
    // 重新加载项目列表
    loadProjects()
    projectToQuit.value = null
  } catch (error) {
    console.error('退出项目失败:', error)
    ElMessage.error('退出项目失败，请稍后重试')
  }
}

// 查看项目详情
const viewProjectDetail = (project: Project) => {
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
    status: getProjectStatus(project),
    maxMembers: project.recruitNum,
    memberCount: project.recruitedNum,
    applicationCount: parseInt(project.applyNum),
    createdAt: project.createdAt || '',
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
    collaborators: (project.cooperators || []).map(cooperator => ({
      id: cooperator.id,
      name: cooperator.name,
      institution: cooperator.institution,
      title: cooperator.title || '未知职位',
      imgUrl: cooperator.imgUrl,
    })),
  }

  selectedProjectForDetail.value = adaptedProject
  showProjectDetail.value = true
}

// 分享项目
const shareProject = (project: Project) => {
  // 复制项目链接到剪贴板
  const projectUrl = `${window.location.origin}/research/projects/${project.id}`
  navigator.clipboard
    .writeText(projectUrl)
    .then(() => {
      ElMessage.success('项目链接已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败，请手动复制链接')
    })
}

// 工具函数
const getProjectStatus = (project: Project): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const endTime = new Date(project.endTime)

  // 检查时间是否有效
  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return 'recruiting' // 如果时间无效，默认为招募中
  }

  // 如果已经结束
  if (now > endTime) {
    return 'completed'
  }

  // 如果正在进行中
  if (now >= startTime && now <= endTime) {
    return 'ongoing'
  }

  // 如果还没开始
  if (now < startTime) {
    // 如果招募人数已满，则为进行中
    if (project.recruitedNum >= project.recruitNum) {
      return 'pending'
    }
  }

  return 'recruiting'
}

const getStatusColor = (status: 'recruiting' | 'ongoing' | 'completed' | 'pending') => {
  const colors = {
    recruiting: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return colors[status] || colors.recruiting
}

const getStatusText = (status: string) => {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成',
    pending: '待开始',
  }
  return texts[status as keyof typeof texts] || texts.recruiting
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
  loadProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
