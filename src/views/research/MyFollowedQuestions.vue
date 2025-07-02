<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 学术元素背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 书本图标 -->
      <div class="absolute top-20 left-10 opacity-[0.05] transform rotate-12 animate-fade-pulse">
        <svg class="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>
      
      <!-- 烧杯图标 -->
      <div class="absolute top-40 right-20 opacity-[0.04] transform -rotate-6 animate-fade-pulse-delay">
        <svg class="w-28 h-28 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9,2V7.38L4.06,16.11C3.8,16.61 4.17,17.23 4.73,17.23H19.27C19.83,17.23 20.2,16.61 19.94,16.11L15,7.38V2H9M11,4H13V7.38L14,9H10L11,7.38V4M8.5,11H15.5L16.5,13H7.5L8.5,11Z"/>
        </svg>
      </div>
      
      <!-- 望远镜图标 -->
      <div class="absolute bottom-32 left-20 opacity-[0.1] transform rotate-45 animate-fade-pulse-slow">
      <svg t="1751381075713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5509" width="200" height="200"><path d="M998.453213 578.067455l-72.874118-42.012837 8.298832-14.263617a51.089684 51.089684 0 0 0-18.802041-69.891725L333.509307 116.833938A51.867699 51.867699 0 0 0 337.140046 83.119933 51.867699 51.867699 0 0 0 312.762227 51.999314l-77.801549-45.124899a50.700676 50.700676 0 0 0-25.93385-6.87247A51.867699 51.867699 0 0 0 164.679946 26.065464L6.87247 299.148901a51.867699 51.867699 0 0 0-5.18677 38.900775A51.867699 51.867699 0 0 0 25.93385 369.040626l77.801549 45.124899a51.867699 51.867699 0 0 0 25.933849 6.87247 51.089684 51.089684 0 0 0 40.586475-20.74708l112.1639 64.834624a230.033247 230.033247 0 0 0 178.684224 220.437723V972.650978H281.511938a25.93385 25.93385 0 0 0 0 51.219353H691.137094a25.93385 25.93385 0 0 0 0-51.219353H511.934193V691.268708A222.901438 222.901438 0 0 0 622.412393 661.444781l128.761563 74.30048a50.960015 50.960015 0 0 0 25.93385 6.87247 50.571007 50.571007 0 0 0 44.346883-25.93385l8.298832-14.263617 72.744448 42.012836A51.219353 51.219353 0 0 0 972.519363 726.279406l44.99523-77.801549A51.089684 51.089684 0 0 0 998.453213 578.067455zM51.867699 324.304735L209.026828 51.999314l77.80155 45.124898L129.669248 369.818642z m460.066494 315.74462a178.035878 178.035878 0 0 1-173.756793-142.636173l230.033247 132.78131a171.552416 171.552416 0 0 1-56.276454 9.854863z m264.654936 51.8677L196.189573 356.33304l112.682577-195.281888 580.529225 335.195007z m151.064674 9.076847l-72.874117-42.012836 45.124898-77.801549L972.519363 622.544007z" fill="#5FC2DD" p-id="5510"></path></svg>
      </div>
      
      <!-- 原子图标 -->
      <div class="absolute top-80 right-40 opacity-[0.05] transform -rotate-12 animate-spin-gentle">
        <svg class="w-36 h-36 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z"/>
        </svg>
      </div>
      
      <!-- 齿轮图标 -->
      <div class="absolute bottom-[10rem] right-[15rem] opacity-[0.04] transform rotate-12 animate-spin-clockwise">
        <svg class="w-36 h-36 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      </div>
      
      <!-- 数学公式装饰 -->
      <div class="absolute top-1/2 left-10 opacity-[0.08] transform -rotate-6 -translate-y-1/2 animate-fade-pulse-medium">
        <svg class="w-56 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 260 80">
          <text x="10" y="40" font-family="serif" font-size="48" font-style="italic" font-weight="bold">∑ƒ(x)dx</text>
          <text x="10" y="70" font-family="serif" font-size="32" font-weight="bold">∫ π = 3.14...</text>
        </svg>
      </div>
    </div>

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
                <span class="text-gray-400">{{ formatTime(question.createdAt) }}</span>
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