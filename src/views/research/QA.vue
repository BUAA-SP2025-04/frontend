<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\QA.vue -->
<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\QA.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">科研问答</h1>
          <p class="mt-2 text-gray-600">分享知识，解决科研难题</p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="showPublishDialog = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg
              class="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            发布问题
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
                    placeholder="搜索问题..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <!-- 分类筛选 -->
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部分类</option>
                <option value="算法">算法</option>
                <option value="机器学习">机器学习</option>
                <option value="数据分析">数据分析</option>
                <option value="理论研究">理论研究</option>
                <option value="实验方法">实验方法</option>
                <option value="论文写作">论文写作</option>
              </select>

              <!-- 排序方式 -->
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新发布</option>
                <option value="hot">热门回答</option>
                <option value="unanswered">未回答</option>
                <option value="my-followed">我的关注</option>
              </select>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">加载中...</span>
          </div>

          <!-- 问题列表 -->
          <div v-else class="space-y-6">
            <div
              v-for="question in filteredQuestions"
              :key="question.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- 问题标题和标签 -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3
                      class="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors mb-3"
                      @click="viewQuestion(question.id)"
                    >
                      {{ question.title }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ question.researchArea }}
                      </span>
                    </div>
                  </div>

                  <!-- 关注按钮 -->
                  <button
                    @click="toggleFollow(question.id)"
                    :class="[
                      'ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      question.followNum > 0
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    {{ question.followNum > 0 ? '已关注' : '关注' }}
                  </button>
                </div>

                <!-- 问题描述 -->
                <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {{ question.content }}
                </p>

                <!-- 问题元信息 -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                      <img
                        :src="getAvatarUrl(question.user?.imgUrl)"
                        :alt="question.user?.name || '未知用户'"
                        class="w-8 h-8 rounded-full mr-2"
                      />
                      <span class="font-medium">{{ question.user?.name || '未知用户' }}</span>
                    </div>
                    <span class="text-gray-400">{{ formatTime(question.createAt) }}</span>
                  </div>

                  <div class="flex items-center space-x-4">
                    <span class="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                      <svg
                        class="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                        ></path>
                      </svg>
                      {{ question.answerNum }} 回答
                    </span>
                    <span class="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                      <svg
                        class="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      {{ question.answerNum }} 浏览
                    </span>
                  </div>
                </div>

                <!-- 回答预览 -->
                <div v-if="question.bestAnswer" class="mt-4 pt-4 border-t border-gray-200">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                      <img
                        :src="getAvatarUrl(question.bestAnswer.user?.imgUrl)"
                        :alt="question.bestAnswer.user?.name || '未知用户'"
                        class="w-6 h-6 rounded-full mr-2"
                      />
                      <span class="text-sm font-medium text-gray-700">{{
                        question.bestAnswer.user?.name || '未知用户'
                      }}</span>
                      <span class="text-sm text-gray-500 ml-2">的回答</span>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {{ question.bestAnswer.content }}
                    </p>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="mt-4 flex items-center justify-between">
                  <div class="flex space-x-3">
                    <button
                      @click="showAnswerDialog(question)"
                      class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:bg-blue-50 px-3 py-1 rounded-lg"
                    >
                      回答问题
                    </button>
                    <button
                      @click="viewQuestion(question.id)"
                      class="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 px-3 py-1 rounded-lg"
                    >
                      查看详情
                    </button>
                  </div>

                  <div class="flex items-center space-x-1 text-sm text-gray-500">
                    <span>{{ question.followNum }} 人关注</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div
            v-if="!loading && filteredQuestions.length === 0"
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无问题</h3>
            <p class="text-gray-500 mb-4">还没有人发布问题</p>
            <button
              @click="showPublishDialog = true"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              发布第一个问题
            </button>
          </div>

          <!-- 分页 -->
          <div v-if="!loading && filteredQuestions.length > 0" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 热门标签 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门标签</h3>
            <div class="space-y-2">
              <button
                v-for="tag in popularTags"
                :key="tag.name"
                @click="searchByTag(tag.name)"
                class="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span class="text-sm text-gray-700">{{ tag.name }}</span>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{
                  tag.count
                }}</span>
              </button>
            </div>
          </div>

          <!-- 活跃用户 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">活跃用户</h3>
            <div class="space-y-3">
              <div
                v-for="user in activeUsers"
                :key="user.id"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img :src="getAvatarUrl(user.avatar)" :alt="user.name" class="w-10 h-10 rounded-full" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">{{ user.name }}</p>
                  <p class="text-xs text-blue-600">{{ user.answerCount }} 回答</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布问题对话框 -->
    <div v-if="showPublishDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研问题</h3>
            <button
              @click="showPublishDialog = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="publishQuestion" class="p-6 space-y-6">
          <!-- 问题标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题标题</label>
            <input
              v-model="newQuestion.title"
              type="text"
              placeholder="简洁明确地描述你的问题..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea
              v-model="newQuestion.content"
              rows="6"
              placeholder="详细描述你的问题，包括背景、遇到的困难、期望的解决方案等..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- 分类选择 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题分类</label>
            <select
              v-model="newQuestion.researchArea"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择分类</option>
              <option value="算法">算法</option>
              <option value="机器学习">机器学习</option>
              <option value="数据分析">数据分析</option>
              <option value="理论研究">理论研究</option>
              <option value="实验方法">实验方法</option>
              <option value="论文写作">论文写作</option>
            </select>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showPublishDialog = false"
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="publishing"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ publishing ? '发布中...' : '发布问题' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 回答问题对话框 -->
    <div
      v-if="showAnswerForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">回答问题</h3>
            <button
              @click="showAnswerForm = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 问题信息 -->
        <div v-if="selectedQuestion" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">{{ selectedQuestion.title }}</h4>
          <p class="text-sm text-gray-600 line-clamp-2">{{ selectedQuestion.content }}</p>
        </div>

        <form @submit.prevent="submitAnswer" class="p-6 space-y-6">
          <!-- 回答内容 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">你的回答</label>
            <textarea
              v-model="newAnswer.content"
              rows="8"
              placeholder="分享你的见解和建议..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showAnswerForm = false"
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="answering"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ answering ? '提交中...' : '提交回答' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  createQuestion,
  answerQuestion,
  followQuestion,
  unfollowQuestion,
  getQuestionList,
  getMyFollowedQuestions,
} from '@/api/modules/question'
import type { Question, CreateQuestionRequest, AnswerQuestionRequest } from '@/api/types/question'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10
const loading = ref(false)
const publishing = ref(false)
const answering = ref(false)

// 对话框控制
const showPublishDialog = ref(false)
const showAnswerForm = ref(false)
const selectedQuestion = ref<Question | null>(null)

// 发布问题表单
const newQuestion = ref<{
  title: string
  content: string
  researchArea: string
}>({
  title: '',
  content: '',
  researchArea: '',
})

// 回答表单
const newAnswer = ref({
  content: '',
})

// 问题数据
const questions = ref<Question[]>([])

// 我的关注问题数据
const myFollowedQuestions = ref<Question[]>([])
const loadingFollowed = ref(false)

const popularTags = ref([
  { name: '机器学习', count: 45 },
  { name: '深度学习', count: 38 },
  { name: 'CNN', count: 23 },
  { name: '数据分析', count: 31 },
  { name: '论文写作', count: 18 },
  { name: 'Transformer', count: 15 },
  { name: '时间序列', count: 12 },
  { name: '算法优化', count: 20 },
])

const activeUsers = ref([
  {
    id: 1,
    name: '李教授',
    avatar: '/default-avatar.png',
    answerCount: 127,
  },
  {
    id: 2,
    name: '陈研究员',
    avatar: '/default-avatar.png',
    answerCount: 89,
  },
  {
    id: 3,
    name: '孙教授',
    avatar: '/default-avatar.png',
    answerCount: 76,
  },
  {
    id: 4,
    name: '周专家',
    avatar: '/default-avatar.png',
    answerCount: 54,
  },
])

// 计算属性
const filteredQuestions = computed(() => {
  let filtered = questions.value

  // 如果是我的关注模式，使用关注的问题数据
  if (sortBy.value === 'my-followed') {
    filtered = myFollowedQuestions.value
  }

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      q =>
        q.title.toLowerCase().includes(query) ||
        q.content.toLowerCase().includes(query) ||
        q.researchArea.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.researchArea === selectedCategory.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
    case 'hot':
      filtered.sort((a, b) => b.answerNum + parseInt(b.likeNum) - (a.answerNum + parseInt(a.likeNum)))
      break
    case 'unanswered':
      filtered.sort((a, b) => a.answerNum - b.answerNum)
      break
    case 'my-followed':
      // 我的关注按最新时间排序
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
  }

  // 分页
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = questions.value
  
  // 如果是我的关注模式，使用关注的问题数据
  if (sortBy.value === 'my-followed') {
    filtered = myFollowedQuestions.value
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      q =>
        q.title.toLowerCase().includes(query) ||
        q.content.toLowerCase().includes(query) ||
        q.researchArea.toLowerCase().includes(query)
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.researchArea === selectedCategory.value)
  }
  return Math.ceil(filtered.length / itemsPerPage)
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
  if (!dateString) return '未知时间'
  
  const date = new Date(dateString)
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '未知时间'
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

const loadQuestions = async () => {
  try {
    loading.value = true
    const response = await getQuestionList()
    if (response && response.code === '200') {
      // 确保数据是数组格式
      if (Array.isArray(response.data)) {
        questions.value = response.data
      } else if (response.data && Array.isArray(response.data.questions)) {
        questions.value = response.data.questions
      } else {
        questions.value = []
      }
    } else {
      questions.value = []
      if (response && response.message) {
        ElMessage.warning(response.message)
      }
    }
  } catch (error) {
    console.error('加载问题列表失败:', error)
    ElMessage.error('加载问题列表失败')
    questions.value = []
  } finally {
    loading.value = false
  }
}

// 加载我的关注问题
const loadMyFollowedQuestions = async () => {
  try {
    loadingFollowed.value = true
    const response = await getMyFollowedQuestions()
    
    if (response && response.code === '200') {
      // 确保数据是数组格式
      if (Array.isArray(response.data)) {
        myFollowedQuestions.value = response.data
      } else if (response.data && Array.isArray(response.data.questions)) {
        myFollowedQuestions.value = response.data.questions
      } else {
        myFollowedQuestions.value = []
      }
    } else {
      myFollowedQuestions.value = []
      if (response && response.message) {
        ElMessage.warning(response.message)
      }
    }
  } catch (error) {
    console.error('加载我的关注问题失败:', error)
    ElMessage.error('加载关注问题失败')
    myFollowedQuestions.value = []
  } finally {
    loadingFollowed.value = false
  }
}

const toggleFollow = async (questionId: string) => {
  try {
    const question = questions.value.find(q => q.id === questionId)
    if (!question) return

    if (question.followNum > 0) {
      // 取消关注
      await unfollowQuestion({ projectId: questionId })
      question.followNum--
      
      // 如果在我的关注模式下，从关注列表中移除
      if (sortBy.value === 'my-followed') {
        myFollowedQuestions.value = myFollowedQuestions.value.filter(q => q.id !== questionId)
      }
    } else {
      // 关注
      await followQuestion({ questionId })
      question.followNum++
    }
    
    ElMessage.success(question.followNum > 0 ? '关注成功' : '取消关注')
  } catch (error) {
    console.error('关注操作失败:', error)
    ElMessage.error('操作失败')
  }
}

const searchByTag = (tagName: string) => {
  searchQuery.value = tagName
}

const publishQuestion = async () => {
  try {
    publishing.value = true
    console.log('开始发布问题...')
    
    const requestData: CreateQuestionRequest = {
      title: newQuestion.value.title,
      content: newQuestion.value.content,
      researchArea: newQuestion.value.researchArea,
    }
    
    console.log('发布问题请求数据:', requestData)
    const response = await createQuestion(requestData)
    console.log('发布问题响应:', response)

    if (response && response.code === '200') {
      // 重置表单
      newQuestion.value = {
        title: '',
        content: '',
        researchArea: '',
      }

      showPublishDialog.value = false
      ElMessage.success('问题发布成功！')
      
      // 重新加载问题列表
      console.log('重新加载问题列表...')
      await loadQuestions()
    } else {
      ElMessage.error(response?.message || '发布问题失败')
    }
  } catch (error) {
    console.error('发布问题失败:', error)
    ElMessage.error('发布问题失败')
  } finally {
    publishing.value = false
  }
}

const showAnswerDialog = (question: Question) => {
  selectedQuestion.value = question
  showAnswerForm.value = true
}

const submitAnswer = async () => {
  if (!selectedQuestion.value) {
    ElMessage.error('请选择要回答的问题')
    return
  }

  if (!newAnswer.value.content.trim()) {
    ElMessage.error('请输入回答内容')
    return
  }

  try {
    answering.value = true
    console.log('开始提交回答...')
    
    const requestData: AnswerQuestionRequest = {
      questionId: parseInt(selectedQuestion.value.id),
      content: newAnswer.value.content.trim(),
      answerId: -1, // 默认为-1，表示对问题的回答
    }

    console.log('提交回答请求数据:', requestData)
    const response = await answerQuestion(requestData)
    console.log('提交回答响应:', response)

    if (response && response.code === '200') {
      // 更新本地问题数据
      selectedQuestion.value.answerNum++
      
      // 重置表单
      newAnswer.value.content = ''
      showAnswerForm.value = false
      
      ElMessage.success('回答提交成功！')
      
      // 重新加载问题列表以获取最新数据
      await loadQuestions()
    } else {
      ElMessage.error(response?.message || '提交回答失败')
    }
  } catch (error: any) {
    console.error('提交回答失败:', error)
    
    // 详细的错误信息
    if (error.response) {
      console.error('错误响应:', error.response.data)
      console.error('错误状态:', error.response.status)
      ElMessage.error(`提交回答失败: ${error.response.data?.message || error.response.statusText}`)
    } else if (error.request) {
      console.error('请求错误:', error.request)
      ElMessage.error('网络错误，请检查网络连接')
    } else {
      console.error('其他错误:', error.message)
      ElMessage.error('提交回答失败，请重试')
    }
  } finally {
    answering.value = false
  }
}

const viewQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

onMounted(() => {
  loadQuestions()
})

// 监听排序方式变化
watch(sortBy, (newValue) => {
  currentPage.value = 1 // 重置页码
  if (newValue === 'my-followed') {
    loadMyFollowedQuestions()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义渐变色 */
.from-cyan-25\/50 {
  --tw-gradient-from: rgba(236, 254, 255, 0.5);
}

.to-blue-25\/50 {
  --tw-gradient-to: rgba(239, 246, 255, 0.5);
}

.from-cyan-25\/30 {
  --tw-gradient-from: rgba(236, 254, 255, 0.3);
}

.to-blue-25\/30 {
  --tw-gradient-to: rgba(239, 246, 255, 0.3);
}
</style>