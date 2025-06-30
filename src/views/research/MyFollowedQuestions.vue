<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和返回按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我的关注</h1>
          <p class="mt-2 text-gray-600">查看您关注的所有问题</p>
        </div>
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          返回问答
        </button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">加载中...</span>
      </div>

      <!-- 空状态 -->
      <div v-else-if="myFollowedQuestions.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无关注的问题</h3>
        <p class="mt-1 text-sm text-gray-500">关注一些感兴趣的问题，及时获取最新动态</p>
        <div class="mt-6">
          <button
            @click="goToQA"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            去发现更多问题
          </button>
        </div>
      </div>

      <!-- 关注问题列表 -->
      <div v-else class="space-y-6">
        <div
          v-for="question in myFollowedQuestions"
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
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ question.researchArea }}
                  </span>
                </div>
              </div>

              <!-- 取消关注按钮 -->
              <button
                @click="unfollowQuestionAction(question.id)"
                class="ml-4 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                取消关注
              </button>
            </div>

            <!-- 问题描述 -->
            <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {{ question.content }}
            </p>

            <!-- 问题元信息 -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center space-x-4">
                <span class="text-gray-400">{{ formatTime(question.createAt) }}</span>
              </div>

              <div class="flex items-center space-x-4">
                <span class="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                  <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                  </svg>
                  {{ question.answerNum }} 回答
                </span>
                <span class="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                  <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ question.followNum }} 关注
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { unfollowQuestion, getMyFollowedQuestions } from '@/api/modules/question'
import type { Question } from '@/api/types/question'

const router = useRouter()

// 响应式数据
const loading = ref(false)
const myFollowedQuestions = ref<Question[]>([])

// 加载我的关注问题
const loadMyFollowedQuestions = async () => {
  try {
    loading.value = true
    const response = await getMyFollowedQuestions()
    
    if (response && response.code === '200') {
      // 确保数据是数组格式
      if (Array.isArray(response.data)) {
        myFollowedQuestions.value = response.data
      } else {
        myFollowedQuestions.value = []
      }
    } else {
      ElMessage.error(response?.message || '加载关注问题失败')
      myFollowedQuestions.value = []
    }
  } catch (error) {
    console.error('加载我的关注问题失败:', error)
    ElMessage.error('加载关注问题失败')
    myFollowedQuestions.value = []
  } finally {
    loading.value = false
  }
}

// 取消关注问题
const unfollowQuestionAction = async (questionId: string) => {
  try {
    await unfollowQuestion({ questionId: questionId })
    ElMessage.success('取消关注成功')
    await loadMyFollowedQuestions()
  } catch (error) {
    console.error('取消关注失败:', error)
    ElMessage.error('取消关注失败')
  }
}

// 格式化时间
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

// 查看问题详情
const viewQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

// 返回问答页面
const goBack = () => {
  router.push('/research/qa')
}

// 跳转到问答页面
const goToQA = () => {
  router.push('/research/qa')
}

onMounted(() => {
  loadMyFollowedQuestions()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 