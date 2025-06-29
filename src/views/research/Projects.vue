<!-- eslint-disable vue/attributes-order -->
<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\Projects.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">科研项目</h1>
          <p class="mt-2 text-gray-600">寻找合作伙伴，推动科研进展</p>
        </div>
        <div class="flex space-x-4">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            @click="router.push('/research/my-projects')"
          >
            我的项目
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 主内容区域 -->
        <div class="lg:col-span-3">
          <!-- 筛选和搜索栏 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- 搜索框 -->
              <div class="flex-1">
                <div class="relative">
                  <svg
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索项目..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <!-- 分类筛选 -->
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部领域</option>
                <option value="计算机科学">计算机科学</option>
                <option value="人工智能">人工智能</option>
                <option value="机器学习">机器学习</option>
                <option value="数据科学">数据科学</option>
                <option value="生物信息学">生物信息学</option>
                <option value="物理学">物理学</option>
                <option value="化学">化学</option>
                <option value="数学">数学</option>
                <option value="材料科学">材料科学</option>
                <option value="环境科学">环境科学</option>
                <option value="地球科学">地球科学</option>
                <option value="天文学">天文学</option>
                <option value="医学">医学</option>
                <option value="药学">药学</option>
                <option value="心理学">心理学</option>
                <option value="社会学">社会学</option>
                <option value="经济学">经济学</option>
                <option value="管理学">管理学</option>
                <option value="法学">法学</option>
                <option value="教育学">教育学</option>
                <option value="历史学">历史学</option>
                <option value="哲学">哲学</option>
                <option value="语言学">语言学</option>
                <option value="政治学">政治学</option>
                <option value="艺术学">艺术学</option>
                <option value="农学">农学</option>
                <option value="工程学">工程学</option>
                <option value="电子科学">电子科学</option>
                <option value="自动化">自动化</option>
                <option value="交通运输">交通运输</option>
                <option value="能源科学">能源科学</option>
                <option value="海洋科学">海洋科学</option>
                <option value="统计学">统计学</option>
                <option value="信息科学">信息科学</option>
                <option value="新闻传播学">新闻传播学</option>
                <option value="体育学">体育学</option>
                <option value="其他">其他</option>
              </select>

              <!-- 项目状态 -->
              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部状态</option>
                <option value="recruiting">招募中</option>
                <option value="ongoing">进行中</option>
                <option value="completed">已完成</option>
                <option value="pending">待开始</option>
              </select>

              <!-- 项目归属 -->
              <select
                v-model="selectedBelonging"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部项目</option>
                <option value="0">未加入</option>
                <option value="1">申请中</option>
                <option value="2">已加入</option>
                <option value="3">我创建的</option>
              </select>

              <!-- 排序方式 -->
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
              </select>
            </div>
          </div>

          <!-- 项目列表 -->
          <div class="space-y-6">
            <!-- 加载状态 -->
            <div v-if="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span class="ml-3 text-gray-600">加载中...</span>
            </div>

            <!-- 空状态 -->
            <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
              <p class="mt-1 text-sm text-gray-500">没有找到符合条件的项目</p>
            </div>

            <!-- 项目列表 -->
            <div
              v-else
              v-for="project in paginatedProjects"
              :key="project.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- 项目标题和状态 -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3
                        class="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                        @click="viewProject(project.id)"
                      >
                        {{ project.title }}
                      </h3>
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
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
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ field.trim() }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 项目描述 -->
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {{ project.description }}
                </p>

                <!-- 合作需求 -->
                <div v-if="project.collaborationCondition" class="mb-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">合作需求：</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="requirement in project.collaborationCondition.split(',')"
                      :key="requirement"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {{ requirement.trim() }}
                    </span>
                  </div>
                </div>

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
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(project.createdAt) }}
                  </div>
                </div>

                <!-- 项目统计和操作 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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

                    <!-- 根据projBelongings显示不同按钮 -->
                    <button
                      v-if="project.projBelongings === 3"
                      class="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      @click="manageProject"
                    >
                      管理项目
                    </button>

                    <button
                      v-else-if="project.projBelongings === 1"
                      class="px-4 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                      @click="cancelProjectApplication(project)"
                    >
                      取消申请
                    </button>

                    <button
                      v-else-if="project.projBelongings === 2"
                      class="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      @click="quitProject(project)"
                    >
                      退出项目
                    </button>

                    <button
                      v-else-if="
                        project.projBelongings === 0 && getProjectStatus(project) === 'recruiting'
                      "
                      class="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      @click="applyToProject(project)"
                    >
                      申请加入
                    </button>

                    <button
                      class="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      @click="viewProjectDetail(project)"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <!-- 上一页 -->
              <button
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = Math.max(1, currentPage - 1)"
              >
                上一页
              </button>

              <!-- 页码 -->
              <button
                v-for="page in getVisiblePages()"
                :key="page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = page"
              >
                {{ page }}
              </button>

              <!-- 下一页 -->
              <button
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 热门领域 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门领域</h3>
            <div class="space-y-2">
              <button
                v-for="field in popularFields"
                :key="field.name"
                class="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                @click="selectedCategory = field.name"
              >
                <span class="text-sm text-gray-700">{{ field.name }}</span>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{
                  field.count
                }}</span>
              </button>
            </div>
          </div>

          <!-- 项目统计 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">项目统计</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">总项目数</span>
                <span class="font-medium">{{ projectStats.total }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">招募中</span>
                <span class="font-medium text-green-600">{{ projectStats.recruiting }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">进行中</span>
                <span class="font-medium text-blue-600">{{ projectStats.ongoing }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">已完成</span>
                <span class="font-medium text-gray-600">{{ projectStats.completed }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">待开始</span>
                <span class="font-medium text-yellow-600">{{ projectStats.pending }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 申请加入对话框 -->
    <ApplyProjectDialog
      :visible="showApplicationDialog"
      :project="selectedProjectForApplication"
      @close="showApplicationDialog = false"
      @success="handleApplicationSuccess"
    />

    <!-- 项目详情对话框 -->
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      :is-my-project="selectedProjectForDetail && selectedProjectForDetail.projBelongings === 3"
      @close="showProjectDetail = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cancelApplication, getAllProjects } from '@/api/modules/project'
import type { Project } from '@/api/types/project'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'
import ApplyProjectDialog from '@/components/project/ApplyProjectDialog.vue'

// 为ProjectDetailCard组件定义项目类型
interface DetailProject {
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
  projBelongings?: number
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
}

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedBelonging = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10

// 对话框控制
const showApplicationDialog = ref(false)
const showProjectDetail = ref(false)
const selectedProjectForApplication = ref<Project | null>(null)
const selectedProjectForDetail = ref<DetailProject | null>(null)

// 申请表单

// 表单校验错误信息

// 项目数据
const projects = ref<Project[]>([])
const loading = ref(false)

// 热门领域
const popularFields = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) {
    return []
  }

  const fieldCounts: { [key: string]: number } = {}

  // 统计每个领域的项目数量
  projects.value.forEach(project => {
    const fields = (project.researchArea || '').split(',').map(field => field.trim())
    fields.forEach(field => {
      if (field) {
        fieldCounts[field] = (fieldCounts[field] || 0) + 1
      }
    })
  })

  // 转换为数组并排序，取前5个
  return Object.entries(fieldCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// 项目统计
const projectStats = ref({
  total: 0,
  recruiting: 0,
  ongoing: 0,
  completed: 0,
  pending: 0,
})

// 获取所有项目
const loadProjects = async () => {
  loading.value = true
  try {
    const res = await getAllProjects()
    // 检查API返回的数据结构
    if (res) {
      projects.value = res.data
      //console.log(projects)
      updateProjectStats()
    } else {
      console.error('API返回数据格式不正确:', res)
      projects.value = []
      updateProjectStats()
      ElMessage.warning('获取项目列表成功，但数据格式异常')
    }
  } catch (error) {
    console.error('获取项目列表失败:', error)
    projects.value = []
    updateProjectStats()
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 更新项目统计
const updateProjectStats = () => {
  if (!projects.value || !Array.isArray(projects.value)) {
    projectStats.value = {
      total: 0,
      recruiting: 0,
      ongoing: 0,
      completed: 0,
      pending: 0,
    }
    return
  }

  projectStats.value.total = projects.value.length
  projectStats.value.recruiting = projects.value.filter(
    p => getProjectStatus(p) === 'recruiting'
  ).length
  projectStats.value.ongoing = projects.value.filter(p => getProjectStatus(p) === 'ongoing').length
  projectStats.value.completed = projects.value.filter(
    p => getProjectStatus(p) === 'completed'
  ).length
  projectStats.value.pending = projects.value.filter(p => getProjectStatus(p) === 'pending').length
}

// 计算属性
const filteredProjects = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) {
    return []
  }

  let filtered = projects.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.researchArea || '').toLowerCase().includes(query) ||
        (p.collaborationCondition || '').toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(p => (p.researchArea || '').includes(selectedCategory.value))
  }

  // 状态过滤
  if (selectedStatus.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === selectedStatus.value)
  }

  // 项目归属过滤
  if (selectedBelonging.value) {
    const belongingValue = parseInt(selectedBelonging.value)
    filtered = filtered.filter(p => p.projBelongings === belongingValue)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        // 如果时间无效，将其排在最后
        if (isNaN(dateA.getTime())) return 1
        if (isNaN(dateB.getTime())) return -1

        return dateB.getTime() - dateA.getTime()
      })
      break
    case 'popular':
      filtered.sort((a, b) => parseInt(b.applyNum) - parseInt(a.applyNum))
      break
  }

  return filtered
})

// 分页后的项目列表
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

// 获取头像URL
const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') {
    return '/default-avatar.png'
  }
  if (imgUrl.startsWith('http')) {
    return imgUrl
  }
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

// 方法
const formatTime = (dateString: string) => {
  if (!dateString) {
    return '未知时间'
  }

  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '无效时间'
  }

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

// 根据时间和招募人数计算项目状态
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

// 获取可见的页码
const getVisiblePages = () => {
  const pages = []
  const maxVisible = 5
  const halfVisible = Math.floor(maxVisible / 2)

  let start = Math.max(1, currentPage.value - halfVisible)
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  // 调整起始位置
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const applyToProject = (project: Project) => {
  selectedProjectForApplication.value = project
  showApplicationDialog.value = true
}

const cancelProjectApplication = (project: Project) => {
  ElMessageBox.confirm('确定要取消申请吗？', '确认取消', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        // TODO: 这里需要获取正确的申请ID，暂时使用项目ID
        // 实际应该从项目数据中获取对应的申请ID
        await cancelApplication({ applicationId: project.id })
        ElMessage.success('申请已取消')
        // 重新加载项目列表
        loadProjects()
      } catch (error) {
        console.error('取消申请失败:', error)
        ElMessage.error('取消申请失败，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消操作')
    })
}

const quitProject = (project: Project) => {
  ElMessageBox.confirm('确定要退出项目吗？此操作不可撤销。', '确认退出', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        // 这里需要调用退出项目的API
        // await quitProjectAPI(project.id)
        ElMessage.success('已退出项目')
        // 重新加载项目列表
        loadProjects()
      } catch (error) {
        console.error('退出项目失败:', error)
        ElMessage.error('退出项目失败，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消操作')
    })
}

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

const viewProject = (projectId: string) => {
  router.push(`/research/projects/${projectId}`)
}

const viewProjectDetail = (project: Project) => {
  // 转换API的Project类型为ProjectDetailCard组件期望的格式
  const adaptedProject: DetailProject = {
    id: parseInt(project.id),
    title: project.title,
    description: project.description || '无',
    fields: (project.researchArea || '')
      .split(',')
      .filter(field => field.trim())
      .map(field => field.trim()),
    requirements: (project.collaborationCondition || '')
      .split(',')
      .filter(req => req.trim())
      .map(req => req.trim()),
    status: getProjectStatus(project),
    maxMembers: project.recruitNum,
    memberCount: project.recruitedNum,
    applicationCount: parseInt(project.applyNum),
    createdAt: project.createdAt || '',
    startDate: project.startTime || '',
    endDate: project.endTime || '',
    contactInfo: project.contact || '无',
    projBelongings: project.projBelongings,
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

// 监听筛选条件变化，重置分页
watch([searchQuery, selectedCategory, selectedStatus, selectedBelonging, sortBy], () => {
  currentPage.value = 1
})

const handleApplicationSuccess = () => {
  showApplicationDialog.value = false
}

const manageProject = () => {
  router.push('/research/my-projects')
}

onMounted(() => {
  // 页面初始化时加载项目列表
  loadProjects()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
