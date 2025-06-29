<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
      <!-- 头部 -->
      <div class="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <h3 class="text-xl font-bold text-slate-900">项目申请管理</h3>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ project?.title }}
            </span>
          </div>
          <button
            class="text-slate-400 hover:text-slate-600 transition-colors"
            @click="$emit('close')"
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
        <div class="mt-2 text-sm text-slate-600">
          共 {{ applications.length }} 个申请，{{ pendingApplications.length }} 个待处理
        </div>
      </div>

      <!-- 内容 -->
      <div class="p-6">
        <!-- 申请列表 -->
        <div class="space-y-4">
          <div
            v-for="applicationElement in applications"
            :key="
              applicationElement.application?.applicant?.id ||
              applicationElement.application?.id ||
              Math.random()
            "
            class="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div class="p-6">
              <!-- 申请者信息 -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <img
                    :src="getAvatarUrl(applicationElement.application?.applicant?.imgUrl || '')"
                    :alt="applicationElement.application?.applicant?.name || '未知用户'"
                    class="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <h4 class="text-lg font-semibold text-slate-900">
                      {{ applicationElement.application?.applicant?.name || '未知用户' }}
                    </h4>
                    <p class="text-sm text-slate-600">
                      {{ applicationElement.application?.applicant?.institution || '未知机构' }}
                    </p>
                    <p class="text-xs text-slate-500">
                      {{ applicationElement.application?.applicant?.title || '未知职位' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      getApplicationStatusColor(
                        applicationElement.application?.status || 'pending'
                      ),
                    ]"
                  >
                    {{
                      getApplicationStatusText(applicationElement.application?.status || 'pending')
                    }}
                  </span>
                  <div
                    v-if="applicationElement.application?.status === 'unhandled'"
                    class="flex space-x-2"
                  >
                    <button
                      class="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      @click="handleApplication(applicationElement.application?.id || 0, true)"
                    >
                      通过
                    </button>
                    <button
                      class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      @click="handleApplication(applicationElement.application?.id || 0, false)"
                    >
                      拒绝
                    </button>
                  </div>
                </div>
              </div>

              <!-- 申请详情 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <!-- 申请理由 -->
                <div class="bg-slate-50 rounded-lg p-4">
                  <h5 class="text-sm font-medium text-slate-700 mb-2">申请理由</h5>
                  <p class="text-slate-600 text-sm leading-relaxed">
                    {{ applicationElement.application?.reason || '暂无申请理由' }}
                  </p>
                </div>

                <!-- 相关经验 -->
                <div class="bg-slate-50 rounded-lg p-4">
                  <h5 class="text-sm font-medium text-slate-700 mb-2">相关经验</h5>
                  <p class="text-slate-600 text-sm leading-relaxed">
                    {{ applicationElement.application?.experience || '暂无相关经验' }}
                  </p>
                </div>
              </div>

              <!-- 联系方式和时间投入 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h5 class="text-sm font-medium text-slate-700 mb-2">联系方式</h5>
                  <p class="text-slate-600 text-sm">
                    {{ applicationElement.application?.contact || '暂无联系方式' }}
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h5 class="text-sm font-medium text-slate-700 mb-2">时间投入</h5>
                  <p class="text-slate-600 text-sm">
                    {{ getTimeCommitmentText(applicationElement.application?.workTime || '') }}
                  </p>
                </div>
              </div>

              <!-- 申请时间 -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                <div class="text-sm text-slate-500">
                  申请于 {{ formatTime(applicationElement.application?.createdAt || '') }}
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div
            v-if="applications.length === 0"
            class="bg-slate-50 rounded-lg border border-slate-200 p-12 text-center"
          >
            <svg
              class="w-16 h-16 text-slate-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-slate-900 mb-2">暂无申请</h3>
            <p class="text-slate-500">该项目还没有收到申请</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { handleApplication as handleApplicationApi } from '@/api/modules/project'
import type { ProjectWithApplications } from '@/api/types/project'

const props = defineProps<{
  project: ProjectWithApplications | null
}>()

const emit = defineEmits<{
  close: []
  refresh: []
}>()

// 计算属性
const applications = computed(() => {
  const apps = props.project?.applications || []
  console.log('ApplicationsDialog - 原始applications数据:', apps)
  if (apps.length > 0) {
    console.log('第一个application元素:', apps[0])
    console.log('第一个application的application字段:', apps[0].application)
    if (apps[0].application) {
      console.log('第一个application的applicant字段:', apps[0].application.applicant)
      console.log('第一个application的status字段:', apps[0].application.status)
    }
  }
  return apps
})
const pendingApplications = computed(() =>
  applications.value.filter(app => app && app.application && app.application.status === 'unhandled')
)

// 方法
const getApplicationStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.pending
}

const getApplicationStatusText = (status: string) => {
  const texts = {
    pending: '待处理',
    approved: '已通过',
    rejected: '已拒绝',
  }
  return texts[status as keyof typeof texts] || texts.pending
}

const getTimeCommitmentText = (workTime: string) => {
  const timeMap: Record<string, string> = {
    '1-2': '1-2小时/周',
    '3-5': '3-5小时/周',
    '6-10': '6-10小时/周',
    '10+': '10小时以上/周',
  }
  return timeMap[workTime] || workTime
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

const handleApplication = async (applicationId: number, accept: boolean) => {
  try {
    await handleApplicationApi({ applicationId: applicationId, accept })
    ElMessage.success(accept ? '申请已通过' : '申请已拒绝')
    emit('refresh')
  } catch (error) {
    console.error('处理申请失败:', error)
    ElMessage.error('处理申请失败，请稍后重试')
  }
}
</script>
