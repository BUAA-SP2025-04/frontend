<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我的项目</h1>
          <p class="mt-2 text-gray-600">管理你发布的项目和收到的申请</p>
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          @click="showPublishDialog = true"
        >
          发布新项目
        </button>
      </div>

      <!-- 筛选工具栏 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="px-6 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <select
              v-model="projectStatusFilter"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全部状态</option>
              <option value="recruiting">招募中</option>
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>
          <span class="text-sm text-gray-500"> 共 {{ myProjects.length }} 个项目 </span>
        </div>
      </div>

      <!-- 项目列表 -->
      <div class="space-y-6">
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">正在加载我的项目...</span>
        </div>

        <!-- 空状态 -->
        <div
          v-else-if="filteredMyProjects.length === 0"
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
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
          <p class="text-gray-500 mb-4">你还没有发布任何项目</p>
          <button
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            @click="showPublishDialog = true"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            发布第一个项目
          </button>
        </div>

        <!-- 项目列表 -->
        <div
          v-for="project in filteredMyProjects"
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
                      getStatusColor(project.status),
                    ]"
                  >
                    {{ getStatusText(project.status) }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="field in project.fields"
                    :key="field"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                    >{{ field }}</span
                  >
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  @click="editProject"
                >
                  编辑
                </button>
                <button
                  class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  @click="deleteProject(project.id)"
                >
                  删除
                </button>
              </div>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>
            <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
              <span class="flex items-center"
                ><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path></svg
                >{{ project.memberCount }}/{{ project.maxMembers }} 成员</span
              >
              <span class="flex items-center"
                ><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  ></path></svg
                >{{ project.applicationCount }} 申请
                <span
                  v-if="project.pendingApplications > 0"
                  class="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full"
                  >{{ project.pendingApplications }}</span
                ></span
              >
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div class="flex space-x-3">
                <button
                  class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  @click="openApplicationsDialog(project)"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    ></path>
                  </svg>
                  管理申请 ({{ project.applicationCount }})
                </button>
              </div>
              <div class="text-sm text-gray-500">发布于 {{ formatTime(project.createdAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 申请管理弹窗 -->
    <div
      v-if="showApplicationsDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ selectedProjectForApplications?.title }} - 申请管理
            </h3>
            <p class="text-sm text-gray-500 mt-1">共 {{ filteredApplications.length }} 个申请</p>
          </div>
          <div class="flex items-center space-x-4">
            <select
              v-model="applicationStatusFilter"
              class="px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="showApplicationsDialog = false"
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
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="application in filteredApplications"
              :key="application.id"
              class="bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-4">
                    <img
                      :src="getAvatarUrl(application.applicant.avatar)"
                      :alt="application.applicant.name"
                      class="w-12 h-12 rounded-full ring-2 ring-gray-200"
                    />
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        {{ application.applicant.name }}
                      </h3>
                      <p class="text-gray-600">{{ application.applicant.institution }}</p>
                      <p class="text-sm text-gray-500 flex items-center mt-1">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {{ formatTime(application.createdAt) }}
                      </p>
                    </div>
                  </div>
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      getApplicationStatusColor(application.status),
                    ]"
                  >
                    {{ getApplicationStatusText(application.status) }}
                  </span>
                </div>
                <div class="mb-6">
                  <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table class="min-w-full bg-white">
                      <tbody>
                        <tr class="hover:bg-gray-50 transition">
                          <td
                            class="w-40 px-6 py-4 bg-gray-50 font-bold text-gray-800 border-b border-gray-100 text-base align-middle"
                          >
                            <div class="flex items-center justify-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 text-blue-500 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                /></svg
                              ><span>申请理由</span>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-gray-700 border-b border-gray-100 leading-relaxed align-middle"
                          >
                            {{ application.reason }}
                          </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition">
                          <td
                            class="px-6 py-4 bg-gray-50 font-bold text-gray-800 border-b border-gray-100 text-base align-middle"
                          >
                            <div class="flex items-center justify-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 text-green-500 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                                /></svg
                              ><span>相关经验</span>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-gray-700 border-b border-gray-100 leading-relaxed align-middle"
                          >
                            {{ application.experience }}
                          </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition">
                          <td
                            class="px-6 py-4 bg-gray-50 font-bold text-gray-800 border-b border-gray-100 text-base align-middle"
                          >
                            <div class="flex items-center justify-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 text-yellow-500 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                /></svg
                              ><span>时间投入</span>
                            </div>
                          </td>
                          <td class="px-6 py-4 text-gray-700 border-b border-gray-100 align-middle">
                            {{ getTimeCommitmentText(application.timeCommitment) }}
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="px-6 py-4 bg-gray-50 font-bold text-gray-800 text-base align-middle rounded-bl-xl"
                          >
                            <div class="flex items-center justify-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 text-purple-500 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                /></svg
                              ><span>联系方式</span>
                            </div>
                          </td>
                          <td class="px-6 py-4 text-gray-700 font-mono align-middle rounded-br-xl">
                            {{ application.contact }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  v-if="application.status === 'pending'"
                  class="flex space-x-3 pt-4 border-t border-gray-200"
                >
                  <button
                    class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    @click="approveApplication(application.id)"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path></svg
                    >通过申请
                  </button>
                  <button
                    class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    @click="rejectApplication(application.id)"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path></svg
                    >拒绝申请
                  </button>
                  <button
                    class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    @click="contactApplicant(application)"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                      ></path></svg
                    >联系申请人
                  </button>
                </div>
                <div v-else class="pt-4 border-t border-gray-200">
                  <div class="bg-gray-50 rounded-lg p-3">
                    <p class="text-sm text-gray-600">
                      处理时间：{{ formatTime(application.processedAt || '')
                      }}<span v-if="application.processedBy" class="ml-4"
                        >处理人：{{ application.processedBy }}</span
                      >
                    </p>
                    <p v-if="application.processNote" class="text-sm text-gray-700 mt-1">
                      备注：{{ application.processNote }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="filteredApplications.length === 0"
            class="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center"
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
            <p class="text-gray-500">该项目还没有收到任何申请</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布项目对话框 -->
    <PublishProjectDialog
      :visible="showPublishDialog"
      @close="showPublishDialog = false"
      @success="handlePublishSuccess"
    />

    <!-- 删除确认弹窗 -->
    <div
      v-if="showDeleteDialog"
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
              <h3 class="text-lg font-semibold text-gray-900">确认删除</h3>
              <p class="text-sm text-gray-500 mt-1">此操作不可撤销</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-gray-700">
            确定要删除项目
            <span class="font-semibold text-gray-900">{{ projectToDelete?.title }}</span> 吗？
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            @click="showDeleteDialog = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            @click="confirmDelete"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getMyProjectsWithApplications,
  deleteProject as deleteProjectApi,
} from '@/api/modules/project'
import type { ProjectWithApplications } from '@/api/types/project'
import PublishProjectDialog from '@/components/project/PublishProjectDialog.vue'

// 项目和申请的类型定义
interface MyProject {
  id: number
  title: string
  description: string
  fields: string[]
  requirements: string[]
  status: string
  maxMembers: number
  memberCount: number
  applicationCount: number
  pendingApplications: number
  createdAt: string
}
interface Application {
  id: number
  project: { id: number; title: string; fields: string[] }
  applicant: { id: number; name: string; avatar: string; institution: string }
  reason: string
  experience: string
  timeCommitment: string
  contact: string
  status: string
  createdAt: string
  processedAt?: string
  processedBy?: string
  processNote?: string
}

const projectStatusFilter = ref('')
const applicationStatusFilter = ref('')
const showPublishDialog = ref(false)
const showApplicationsDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedProjectForApplications = ref<MyProject | null>(null)
const projectToDelete = ref<MyProject | null>(null)
const loading = ref(false)

// 项目数据
const myProjects = ref<MyProject[]>([])
const applications = ref<Application[]>([])

// 加载我的项目数据
const loadMyProjects = async () => {
  loading.value = true
  try {
    // 获取我创建的项目及其申请
    const res = await getMyProjectsWithApplications()
    if (res && res.data) {
      myProjects.value = res.data.map((project: ProjectWithApplications) => ({
        id: project.id,
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
        pendingApplications: project.applications?.length || 0, // 从申请列表获取待处理申请数
        createdAt: project.createdAt || '',
      }))
    }
  } catch (error) {
    console.error('获取我的项目失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 根据时间和招募人数计算项目状态
const getProjectStatus = (
  project: ProjectWithApplications
): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
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

const filteredMyProjects = computed(() => {
  let filtered = myProjects.value
  if (projectStatusFilter.value) {
    filtered = filtered.filter(p => p.status === projectStatusFilter.value)
  }
  return filtered
})
const filteredApplications = computed(() => {
  let filtered = applications.value
  if (applicationStatusFilter.value) {
    filtered = filtered.filter(app => app.status === applicationStatusFilter.value)
  }
  if (selectedProjectForApplications.value) {
    filtered = filtered.filter(app => app.project.id === selectedProjectForApplications.value!.id)
  }
  return filtered
})

function openApplicationsDialog(project: MyProject) {
  selectedProjectForApplications.value = project
  showApplicationsDialog.value = true
  applicationStatusFilter.value = ''
}
function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    recruiting: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || colors.recruiting
}
function getStatusText(status: string) {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成',
  }
  return texts[status as keyof typeof texts] || texts.recruiting
}
function getApplicationStatusColor(status: string) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.pending
}
function getApplicationStatusText(status: string) {
  const texts = {
    pending: '待处理',
    approved: '已通过',
    rejected: '已拒绝',
  }
  return texts[status as keyof typeof texts] || texts.pending
}
function getTimeCommitmentText(timeCommitment: string) {
  const texts = {
    'full-time': '全职参与',
    'part-time': '兼职参与（每周20+小时）',
    flexible: '灵活参与（每周10-20小时）',
    limited: '有限参与（每周5-10小时）',
  }
  return texts[timeCommitment as keyof typeof texts] || timeCommitment
}
function formatTime(dateString: string) {
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
function getAvatarUrl(imgUrl: string) {
  if (!imgUrl || imgUrl === '') return '/default-avatar.png'
  if (imgUrl.startsWith('http')) return imgUrl
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}
function approveApplication(applicationId: number) {
  const application = applications.value.find(app => app.id === applicationId)
  if (application) {
    application.status = 'approved'
    application.processedAt = new Date().toISOString()
    application.processedBy = '当前用户'
    const project = myProjects.value.find(p => p.id === application.project.id)
    if (project) {
      project.pendingApplications = Math.max(0, project.pendingApplications - 1)
      project.memberCount++
    }
    ElMessage.success('申请已通过')
  }
}
function rejectApplication(applicationId: number) {
  const application = applications.value.find(app => app.id === applicationId)
  if (application) {
    application.status = 'rejected'
    application.processedAt = new Date().toISOString()
    application.processedBy = '当前用户'
    const project = myProjects.value.find(p => p.id === application.project.id)
    if (project) {
      project.pendingApplications = Math.max(0, project.pendingApplications - 1)
    }
    ElMessage.success('申请已拒绝')
  }
}
function contactApplicant(application: Application) {
  ElMessage.info(`正在打开与 ${application.applicant.name} 的私信对话...`)
}
function editProject() {
  ElMessage.info('编辑功能开发中...')
}
function deleteProject(projectId: number) {
  const project = myProjects.value.find(p => p.id === projectId)
  if (project) {
    showDeleteDialog.value = true
    projectToDelete.value = project
  }
}
function handlePublishSuccess() {
  showPublishDialog.value = false
  ElMessage.success('项目发布成功！')
  // 重新加载项目列表
  loadMyProjects()
}
function confirmDelete() {
  if (projectToDelete.value) {
    deleteProjectApi({ projectId: projectToDelete.value.id })
      .then(() => {
        const index = myProjects.value.findIndex(p => p.id === projectToDelete.value!.id)
        if (index > -1) {
          myProjects.value.splice(index, 1)
        }
        ElMessage.success('项目删除成功')
        showDeleteDialog.value = false
        projectToDelete.value = null
      })
      .catch(error => {
        console.error('删除项目失败:', error)
        ElMessage.error('删除项目失败，请稍后重试')
      })
  }
}

// 页面初始化时加载数据
onMounted(() => {
  loadMyProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
