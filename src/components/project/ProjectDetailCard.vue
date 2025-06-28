<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
      <!-- 头部 -->
      <div class="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <h3 class="text-xl font-bold text-slate-900">{{ project.title }}</h3>
            <span
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                getStatusColor(project.status),
              ]"
            >
              {{ getStatusText(project.status) }}
            </span>
            <span
              v-if="project.isUrgent"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              紧急
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
      </div>

      <!-- 内容 -->
      <div class="p-6">
        <!-- 项目基本信息 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- 左侧：项目详情 -->
          <div class="lg:col-span-2 space-y-6">
            <!-- 项目描述 -->
            <div class="bg-slate-50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                项目描述
              </h4>
              <p class="text-slate-700 leading-relaxed">{{ project.description }}</p>
            </div>

            <!-- 研究领域 -->
            <div class="bg-blue-50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
                研究领域
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="field in project.fields"
                  :key="field"
                  class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {{ field }}
                </span>
              </div>
            </div>

            <!-- 合作需求 -->
            <div class="bg-emerald-50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-emerald-600"
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
                合作需求
              </h4>
              <div class="space-y-2">
                <span
                  v-for="requirement in project.requirements"
                  :key="requirement"
                  class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mr-2 mb-2"
                >
                  <svg class="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ requirement }}
                </span>
              </div>
            </div>

            <!-- 联系方式 -->
            <div class="bg-amber-50 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                联系方式
              </h4>
              <div class="bg-white rounded-lg p-4 border border-amber-200">
                <pre class="text-slate-700 whitespace-pre-wrap font-mono text-sm">{{
                  project.contactInfo
                }}</pre>
              </div>
            </div>
          </div>

          <!-- 右侧：项目统计 -->
          <div class="space-y-6">
            <!-- 团队信息 -->
            <div class="bg-white rounded-xl border border-slate-200 p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-purple-600"
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
                团队信息
              </h4>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">当前成员</span>
                  <span class="font-semibold text-slate-900">{{ project.memberCount }} 人</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">最大规模</span>
                  <span class="font-semibold text-slate-900">{{ project.maxMembers }} 人</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${(project.memberCount / project.maxMembers) * 100}%` }"
                  ></div>
                </div>
                <div class="text-center text-sm text-slate-500">
                  还需 {{ project.maxMembers - project.memberCount }} 人
                </div>
              </div>
            </div>

            <!-- 项目统计 -->
            <div class="bg-white rounded-xl border border-slate-200 p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                项目统计
              </h4>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">申请人数</span>
                  <span class="font-semibold text-slate-900">{{ project.applicationCount }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">浏览次数</span>
                  <span class="font-semibold text-slate-900">{{ project.viewCount }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">发布时间</span>
                  <span class="font-semibold text-slate-900">{{
                    formatDate(project.createdAt)
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">更新时间</span>
                  <span class="font-semibold text-slate-900">{{
                    formatTime(project.updatedAt)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- 项目时间线 -->
            <div v-if="project.startDate" class="bg-white rounded-xl border border-slate-200 p-6">
              <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                项目时间
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-600">开始时间</span>
                  <span class="font-semibold text-slate-900">{{
                    formatDate(project.startDate)
                  }}</span>
                </div>
                <div v-if="project.endDate" class="flex justify-between items-center">
                  <span class="text-slate-600">预期结束</span>
                  <span class="font-semibold text-slate-900">{{
                    formatDate(project.endDate)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-slate-200">
          <button
            class="px-6 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            @click="$emit('close')"
          >
            关闭
          </button>
          <button
            v-if="!isMyProject"
            :disabled="project.status !== 'recruiting'"
            class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            @click="$emit('apply', project.id)"
          >
            申请加入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number
  title: string
  description: string
  fields: string[]
  requirements: string[]
  status: string
  maxMembers: number
  memberCount: number
  applicationCount: number
  viewCount: number
  isUrgent?: boolean
  createdAt: string
  updatedAt: string
  startDate?: string
  endDate?: string
  contactInfo?: string
}

defineProps<{
  project: Project
  isMyProject?: boolean
}>()

defineEmits<{
  close: []
  apply: [projectId: number]
}>()

const getStatusColor = (status: string) => {
  const colors = {
    recruiting: 'bg-green-100 text-green-800 border border-green-200',
    ongoing: 'bg-blue-100 text-blue-800 border border-blue-200',
    completed: 'bg-slate-100 text-slate-800 border border-slate-200',
  }
  return colors[status as keyof typeof colors] || colors.recruiting
}

const getStatusText = (status: string) => {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成',
  }
  return texts[status as keyof typeof texts] || texts.recruiting
}

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
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const formatDate = (dateString: string) => {
  if (!dateString) {
    return '未知日期'
  }

  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '无效日期'
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>
