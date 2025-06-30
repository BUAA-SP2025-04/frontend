<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\MyQuestions.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我的问题</h1>
          <p class="mt-2 text-gray-600">管理你发布的问题和收到的回答</p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="testApiCall"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            测试API
          </button>
          <button
            @click="loadQuestions"
            :disabled="loading"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ loading ? '刷新中...' : '刷新' }}
          </button>
          <button
            @click="router.push('/research/qa')"
            class="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-200 hover:bg-gray-50"
          >
            浏览问题
          </button>
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
            发布新问题
          </button>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <select
              v-model="sortBy"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">最新发布</option>
              <option value="mostAnswered">回答最多</option>
              <option value="mostViewed">浏览最多</option>
            </select>
          </div>

          <!-- 统计信息 -->
          <div class="flex items-center space-x-6 text-sm text-gray-600">
            <span>总计: <strong class="text-gray-800">{{ myQuestions.length }}</strong></span>
            <span>已解决: <strong class="text-green-600">{{ solvedCount }}</strong></span>
            <span>待解决: <strong class="text-orange-600">{{ openCount }}</strong></span>
          </div>
        </div>
      </div>

      <!-- 问题列表 -->
      <div class="space-y-4">
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            加载中...
          </div>
        </div>

        <!-- 调试信息 -->
        <div v-if="!loading" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-sm text-blue-800">
            调试信息: 问题总数: {{ myQuestions.length }}, 过滤后: {{ filteredQuestions.length }}
          </p>
          <p class="text-sm text-blue-600 mt-1">
            排序方式: {{ sortBy }}, 已解决: {{ solvedCount }}, 待解决: {{ openCount }}
          </p>
          <div v-if="filteredQuestions.length > 0" class="mt-2 p-2 bg-white rounded border">
            <p class="text-xs text-gray-600 mb-1">第一个问题数据:</p>
            <pre class="text-xs text-gray-800 overflow-auto">{{ JSON.stringify(filteredQuestions[0], null, 2) }}</pre>
          </div>
        </div>

        <!-- 简单测试显示 -->
        <div v-if="!loading && filteredQuestions.length > 0" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h4 class="text-sm font-medium text-green-800 mb-2">测试显示 - 第一个问题:</h4>
          <p class="text-sm text-green-700">标题: {{ filteredQuestions[0].title }}</p>
          <p class="text-sm text-green-700">内容: {{ filteredQuestions[0].content }}</p>
          <p class="text-sm text-green-700">分类: {{ filteredQuestions[0].researchArea }}</p>
          <p class="text-sm text-green-700">回答数: {{ filteredQuestions[0].answerNum }}</p>
        </div>

        <div
          v-for="question in filteredQuestions"
          :key="question.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <!-- 问题头部 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3
                    class="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                    @click="viewQuestion(question.id)"
                  >
                    {{ question.title }}
                  </h3>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusStyle(!!question.bestAnswer),
                    ]"
                  >
                    {{ getStatusText(!!question.bestAnswer) }}
                  </span>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      question.answerNum > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]"
                  >
                    {{ question.answerNum > 0 ? '已回答' : '待回答' }}
                  </span>
                </div>

                <!-- 问题状态和分类 -->
                <div class="flex items-center space-x-2 mb-3">
                  <span class="text-sm text-gray-500">{{ question.researchArea }}</span>
                </div>

                <!-- 问题描述 -->
                <p class="text-gray-600 mb-4 line-clamp-2">{{ question.content }}</p>

                <!-- 问题元信息 -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div class="flex items-center space-x-4">
                    <span>{{ formatTime(question.createAt) }}</span>
                    <span>{{ question.answerNum }} 回答</span>
                    <span>{{ question.followNum }} 浏览</span>
                  </div>
                <div class="flex items-center space-x-2">
                    <span>{{ question.followNum }} 关注</span>
                    <span>{{ question.likeNum }} 点赞</span>
                </div>
              </div>

                <!-- 最新回答预览 -->
                <div
                  v-if="question.bestAnswer"
                  class="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500"
                >
                  <div class="flex items-center mb-2">
                    <img
                      :src="question.bestAnswer.user.imgUrl || '/default-avatar.png'"
                      :alt="question.bestAnswer.user.name"
                      class="w-6 h-6 rounded-full mr-2"
                />
                <span class="text-sm font-medium text-gray-700">{{
                      question.bestAnswer.user.name
                }}</span>
                    <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      最佳答案
                    </span>
              </div>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ question.bestAnswer.content }}</p>
            </div>

                <!-- 操作按钮 -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div class="flex space-x-3">
                <button
                  @click="viewQuestion(question.id)"
                      class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:bg-blue-50 px-3 py-1 rounded-lg"
                    >
                  查看详情
                </button>
                    <button
                      @click="editQuestion(question)"
                      class="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 px-3 py-1 rounded-lg"
                    >
                      编辑
                    </button>
                  </div>

                  <div class="flex space-x-2">
                    <button
                      @click="deleteQuestion(question.id)"
                      class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors hover:bg-red-50 px-3 py-1 rounded-lg"
                    >
                      删除
                    </button>
                  </div>
                </div>
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
        <p class="text-gray-500 mb-4">你还没有发布任何问题</p>
        <button
          @click="showPublishDialog = true"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          发布第一个问题
        </button>
      </div>
    </div>

    <!-- 发布问题对话框 -->
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布新问题</h3>
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
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- 问题分类 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题分类</label>
            <select
              v-model="newQuestion.researchArea"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">选择分类</option>
              <option value="机器学习">机器学习</option>
              <option value="深度学习">深度学习</option>
              <option value="数据科学">数据科学</option>
              <option value="算法">算法</option>
              <option value="编程">编程</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题描述（支持Markdown）</label>
            <textarea
              v-model="newQuestion.content"
              rows="8"
              placeholder="详细描述你的问题，包括背景、具体遇到的困难、已尝试的方法等..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showPublishDialog = false"
              type="button"
              class="px-6 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              发布问题
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 编辑问题对话框 -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">编辑问题</h3>
            <button
              @click="showEditDialog = false"
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

        <form @submit.prevent="updateQuestion" class="p-6 space-y-6">
          <!-- 问题标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题标题</label>
            <input
              v-model="editingQuestion.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- 问题分类 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题分类</label>
            <select
              v-model="editingQuestion.researchArea"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="机器学习">机器学习</option>
              <option value="深度学习">深度学习</option>
              <option value="数据科学">数据科学</option>
              <option value="算法">算法</option>
              <option value="编程">编程</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题描述（支持Markdown）</label>
            <textarea
              v-model="editingQuestion.content"
              rows="8"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showEditDialog = false"
              type="button"
              class="px-6 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  deleteQuestion as deleteQuestionApi,
  unfollowQuestion as unfollowQuestionApi,
  getMyAskedQuestions,
  createQuestion,
  updateQuestion as updateQuestionApi,
} from '@/api/modules/question'
import type { Question, CreateQuestionRequest, UpdateQuestionRequest } from '@/api/types/question'

const router = useRouter()

// 响应式数据
const sortBy = ref('latest')
const showPublishDialog = ref(false)
const showEditDialog = ref(false)
const loading = ref(false)

// 发布问题表单
const newQuestion = ref<{
  title: string
  researchArea: string
  content: string
  tags: string[]
}>({
  title: '',
  researchArea: '',
  content: '',
  tags: [],
})

// 编辑问题表单
const editingQuestion = ref<{
  id: string | null
  title: string
  researchArea: string
  content: string
  tags: string[]
}>({
  id: null,
  title: '',
  researchArea: '',
  content: '',
  tags: [],
})

// 我的问题数据
const myQuestions = ref<Question[]>([])

// 计算属性
const filteredQuestions = computed(() => {
  let filtered = [...myQuestions.value] // 创建副本，避免修改原数组

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
    case 'mostAnswered':
      filtered.sort((a, b) => b.answerNum - a.answerNum)
      break
    case 'mostViewed':
      filtered.sort((a, b) => b.answerNum - a.answerNum) // 使用answerNum代替viewCount
      break
  }

  return filtered
})

const solvedCount = computed(() => myQuestions.value.filter(q => q.bestAnswer).length)
const openCount = computed(() => myQuestions.value.filter(q => !q.bestAnswer).length)

// 方法
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
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

const getStatusStyle = (hasBestAnswer: boolean) => {
  return hasBestAnswer ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
}

const getStatusText = (hasBestAnswer: boolean) => {
  return hasBestAnswer ? '已解决' : '待解决'
}

const viewQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

const editQuestion = (question: Question) => {
  editingQuestion.value = {
    id: question.id,
    title: question.title,
    researchArea: question.researchArea,
    content: question.content,
    tags: [question.researchArea], // 使用研究领域作为标签
  }
  showEditDialog.value = true
}

const updateQuestion = async () => {
  if (!editingQuestion.value.id) {
    ElMessage.error('问题ID不存在')
    return
  }

  // 表单验证
  if (!editingQuestion.value.title.trim()) {
    ElMessage.error('请输入问题标题')
    return
  }
  
  if (!editingQuestion.value.content.trim()) {
    ElMessage.error('请输入问题描述')
    return
  }
  
  if (!editingQuestion.value.researchArea) {
    ElMessage.error('请选择问题分类')
    return
  }

  try {
    const requestData: UpdateQuestionRequest = {
      id: parseInt(editingQuestion.value.id),
      title: editingQuestion.value.title.trim(),
      content: editingQuestion.value.content.trim(),
      researchArea: editingQuestion.value.researchArea,
      bestAnswerId: -1, // 设为-1，表示没有最佳答案
    }

    console.log('更新问题请求数据:', requestData)
    console.log('请求数据类型:', typeof requestData.id)
    console.log('editingQuestion.value.id:', editingQuestion.value.id)
    console.log('parseInt结果:', parseInt(editingQuestion.value.id))

    await updateQuestionApi(requestData)
    
    showEditDialog.value = false
    ElMessage.success('问题更新成功')
    
    // 重新加载问题列表
    await loadQuestions()
  } catch (error) {
    console.error('更新问题失败:', error)
    ElMessage.error('更新问题失败，请重试')
  }
}

const deleteQuestion = async (questionId: string) => {
  try {
    await deleteQuestionApi({ questionId })
    ElMessage.success('删除成功')
    await loadQuestions()
  } catch (error) {
    console.error('删除问题失败:', error)
    ElMessage.error('删除失败')
  }
}

const loadQuestions = async () => {
  try {
    loading.value = true
    console.log('开始加载我的问题列表...')
    
    const response = await getMyAskedQuestions()
    console.log('API响应:', response)
    
    // 处理响应数据
    if (response && response.code === '200' && response.data) {
      // 如果data直接是问题数组
      if (Array.isArray(response.data)) {
        // 处理数据，确保所有必需字段都存在
        myQuestions.value = response.data.map((item: any) => ({
          id: item.id || '',
          user: item.user || {
            id: item.userId || 0,
            name: '未知用户',
            researchArea: '',
            title: '',
            imgUrl: '',
            institution: '',
            createdAt: '',
          },
          title: item.title || '',
          content: item.content || '',
          createAt: item.createAt || item.createdAt || new Date().toISOString(),
          researchArea: item.reaesrchArea || item.researchArea || '未分类',
          answerNum: item.answerNum || 0,
          likeNum: item.likeNum || '0',
          followNum: item.followNum || 0,
          bestAnswer: item.bestAnswer || undefined,
          answers: item.answers || [],
        })) as Question[]
      }
      // 如果data包含questions字段
      else if (response.data.questions && Array.isArray(response.data.questions)) {
        myQuestions.value = response.data.questions.map((item: any) => ({
          id: item.id || '',
          user: item.user || {
            id: item.userId || 0,
            name: '未知用户',
            researchArea: '',
            title: '',
            imgUrl: '',
            institution: '',
            createdAt: '',
          },
          title: item.title || '',
          content: item.content || '',
          createAt: item.createAt || item.createdAt || new Date().toISOString(),
          researchArea: item.reaesrchArea || item.researchArea || '未分类',
          answerNum: item.answerNum || 0,
          likeNum: item.likeNum || '0',
          followNum: item.followNum || 0,
          bestAnswer: item.bestAnswer || undefined,
          answers: item.answers || [],
        })) as Question[]
      }
      else {
        myQuestions.value = []
      }
      
      console.log('解析后的问题数量:', myQuestions.value.length)
      console.log('处理后的问题列表:', myQuestions.value)
      
      if (myQuestions.value.length === 0) {
        console.log('没有找到问题数据，用户可能还没有发布过问题')
      }
    } else {
      console.warn('API响应格式异常:', response)
      myQuestions.value = []
      if (response && response.message) {
        ElMessage.warning(response.message)
      }
    }
  } catch (error) {
    console.error('加载问题列表失败:', error)
    ElMessage.error('加载问题列表失败')
    myQuestions.value = []
  } finally {
    loading.value = false
  }
}

const publishQuestion = async () => {
  // 表单验证
  if (!newQuestion.value.title.trim()) {
    ElMessage.error('请输入问题标题')
    return
  }
  
  if (!newQuestion.value.content.trim()) {
    ElMessage.error('请输入问题描述')
    return
  }
  
  if (!newQuestion.value.researchArea) {
    ElMessage.error('请选择问题分类')
    return
  }

  try {
    console.log('开始发布问题...')
    const requestData: CreateQuestionRequest = {
      title: newQuestion.value.title.trim(),
      content: newQuestion.value.content.trim(),
      researchArea: newQuestion.value.researchArea,
    }
    
    console.log('发布问题请求数据:', requestData)
    const response = await createQuestion(requestData)
    console.log('发布问题响应:', response)
    
    if (response && response.code === '200') {
  // 重置表单
  newQuestion.value = {
    title: '',
        researchArea: '',
        content: '',
    tags: [],
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
    ElMessage.error('发布问题失败，请重试')
  }
}

const testApiCall = async () => {
  try {
    console.log('开始测试API调用...')
    const response = await getMyAskedQuestions()
    console.log('测试API响应:', response)
    
    // 显示响应信息
    ElMessage.success('API调用成功，请查看控制台获取详细信息')
    
    // 分析响应数据结构
    if (response) {
      console.log('响应状态码:', response.code)
      console.log('响应消息:', response.message)
      console.log('响应数据类型:', typeof response.data)
      
      if (response.data) {
        console.log('响应数据是否为数组:', Array.isArray(response.data))
        console.log('响应数据键:', Object.keys(response.data))
        
        if (response.data.questions) {
          console.log('questions字段存在，类型:', typeof response.data.questions)
          console.log('questions是否为数组:', Array.isArray(response.data.questions))
          if (Array.isArray(response.data.questions)) {
            console.log('questions数组长度:', response.data.questions.length)
            console.log('第一个问题:', response.data.questions[0])
          }
        }
      }
    }
  } catch (error) {
    console.error('测试API调用失败:', error)
    ElMessage.error('API调用失败，请检查控制台')
  }
}

onMounted(() => {
  loadQuestions()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>