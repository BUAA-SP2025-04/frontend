<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\MyQuestions.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
          >
            我的问题
          </h1>
          <p class="mt-2 text-slate-600">管理你发布的问题和收到的回答</p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="router.push('/research/qa')"
            class="bg-white/80 hover:bg-white text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-slate-200/50"
          >
            浏览问题
          </button>
          <button
            @click="showPublishDialog = true"
            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm"
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

      <!-- 简化的筛选栏 -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 mb-6"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <select
              v-model="statusFilter"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="">全部状态</option>
              <option value="open">待解决</option>
              <option value="answered">已有回答</option>
              <option value="solved">已解决</option>
            </select>
            <select
              v-model="categoryFilter"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="">全部分类</option>
              <option value="机器学习">机器学习</option>
              <option value="深度学习">深度学习</option>
              <option value="数据科学">数据科学</option>
              <option value="算法">算法</option>
            </select>
            <select
              v-model="sortBy"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="latest">最新发布</option>
              <option value="mostAnswered">回答最多</option>
              <option value="mostViewed">浏览最多</option>
            </select>
          </div>

          <!-- 简化的统计信息 -->
          <div class="flex items-center space-x-6 text-sm text-slate-600">
            <span
              >总计: <strong class="text-slate-800">{{ myQuestions.length }}</strong></span
            >
            <span
              >已解决: <strong class="text-emerald-600">{{ solvedCount }}</strong></span
            >
            <span
              >待解决: <strong class="text-orange-600">{{ openCount }}</strong></span
            >
          </div>
        </div>
      </div>

      <!-- 问题列表 -->
      <div class="space-y-4">
        <div
          v-for="question in filteredQuestions"
          :key="question.id"
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300"
        >
          <div class="p-6">
            <!-- 问题头部 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3
                    class="text-lg font-semibold text-slate-800 hover:text-cyan-600 cursor-pointer transition-colors"
                    @click="viewQuestion(question.id)"
                  >
                    {{ question.title }}
                  </h3>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusStyle(question.status),
                    ]"
                  >
                    {{ getStatusText(question.status) }}
                  </span>
                  <span
                    v-if="question.hasNewAnswers"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 animate-pulse"
                  >
                    有新回答
                  </span>
                </div>

                <!-- 标签 -->
                <div class="flex flex-wrap gap-1.5 mb-3">
                  <span
                    v-for="tag in question.tags"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- 统计信息 -->
                <div class="flex items-center space-x-4 text-sm text-slate-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                      ></path>
                    </svg>
                    {{ question.answerCount }} 回答
                    <span
                      v-if="question.newAnswersCount > 0"
                      class="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full"
                    >
                      +{{ question.newAnswersCount }}
                    </span>
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    {{ question.viewCount }} 浏览
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ formatTime(question.createdAt) }}
                  </span>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex space-x-2 ml-6">
                <button
                  @click="editQuestion(question)"
                  class="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                >
                  编辑
                </button>
                <button
                  v-if="question.status !== 'solved'"
                  @click="markAsSolved(question.id)"
                  class="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                >
                  标记已解决
                </button>
                <button
                  @click="deleteQuestion(question.id)"
                  class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  删除
                </button>
              </div>
            </div>

            <!-- 问题描述 -->
            <p class="text-slate-600 mb-4 line-clamp-2">{{ question.description }}</p>

            <!-- 最新回答预览 -->
            <div v-if="question.latestAnswer" class="bg-slate-50 rounded-lg p-4 mb-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-medium text-slate-700">最新回答</h4>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-slate-500">{{
                    formatTime(question.latestAnswer.createdAt)
                  }}</span>
                  <button
                    v-if="!question.latestAnswer.isBest && question.status !== 'solved'"
                    @click="markAsBestAnswer(question.id, question.latestAnswer.id)"
                    class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition-colors"
                  >
                    设为最佳
                  </button>
                  <span
                    v-if="question.latestAnswer.isBest"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700"
                  >
                    最佳答案
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-3 mb-2">
                <img
                  :src="question.latestAnswer.author.avatar"
                  :alt="question.latestAnswer.author.name"
                  class="w-6 h-6 rounded-full"
                />
                <span class="text-sm font-medium text-slate-700">{{
                  question.latestAnswer.author.name
                }}</span>
              </div>
              <p class="text-sm text-slate-600 line-clamp-2">{{ question.latestAnswer.excerpt }}</p>
            </div>

            <!-- 底部操作 -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-200">
              <div class="flex space-x-3">
                <button
                  @click="viewQuestion(question.id)"
                  class="flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  查看详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredQuestions.length === 0"
        class="bg-white/80 rounded-xl shadow-sm border border-slate-200/50 p-12 text-center"
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-slate-900 mb-2">暂无问题</h3>
        <p class="text-slate-500 mb-4">你还没有发布任何问题</p>
        <button
          @click="showPublishDialog = true"
          class="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors shadow-sm"
        >
          发布第一个问题
        </button>
      </div>
    </div>

    <!-- 发布问题对话框 -->
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-slate-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">发布新问题</h3>
            <button
              @click="showPublishDialog = false"
              class="text-slate-400 hover:text-slate-600 transition-colors"
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
            <label class="block text-sm font-medium text-slate-700 mb-2">问题标题</label>
            <input
              v-model="newQuestion.title"
              type="text"
              placeholder="简洁明确地描述你的问题..."
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <!-- 问题分类 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">问题分类</label>
            <select
              v-model="newQuestion.category"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
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

          <!-- 标签 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">标签</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="tag in newQuestion.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700"
              >
                {{ tag }}
                <button
                  @click="removeTag(tag)"
                  type="button"
                  class="ml-1 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="tagInput"
                @keyup.enter="addTag"
                type="text"
                placeholder="输入标签后按回车添加"
                class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              />
              <button
                @click="addTag"
                type="button"
                class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                添加
              </button>
            </div>
          </div>

          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2"
              >问题描述（支持Markdown）</label
            >
            <textarea
              v-model="newQuestion.description"
              rows="8"
              placeholder="详细描述你的问题，包括背景、具体遇到的困难、已尝试的方法等..."
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 font-mono text-sm transition-colors"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              @click="showPublishDialog = false"
              type="button"
              class="px-6 py-2 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
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
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-slate-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">编辑问题</h3>
            <button
              @click="showEditDialog = false"
              class="text-slate-400 hover:text-slate-600 transition-colors"
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
            <label class="block text-sm font-medium text-slate-700 mb-2">问题标题</label>
            <input
              v-model="editingQuestion.title"
              type="text"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <!-- 问题分类 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">问题分类</label>
            <select
              v-model="editingQuestion.category"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
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

          <!-- 标签 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">标签</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="tag in editingQuestion.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700"
              >
                {{ tag }}
                <button
                  @click="removeEditTag(tag)"
                  type="button"
                  class="ml-1 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="editTagInput"
                @keyup.enter="addEditTag"
                type="text"
                placeholder="输入标签后按回车添加"
                class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              />
              <button
                @click="addEditTag"
                type="button"
                class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                添加
              </button>
            </div>
          </div>

          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2"
              >问题描述（支持Markdown）</label
            >
            <textarea
              v-model="editingQuestion.description"
              rows="8"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 font-mono text-sm transition-colors"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              @click="showEditDialog = false"
              type="button"
              class="px-6 py-2 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
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

const router = useRouter()

// 响应式数据
const statusFilter = ref('')
const categoryFilter = ref('')
const sortBy = ref('latest')
const showPublishDialog = ref(false)
const showEditDialog = ref(false)
const tagInput = ref('')
const editTagInput = ref('')

// 发布问题表单
const newQuestion = ref<{
  title: string
  category: string
  description: string
  tags: string[]
}>({
  title: '',
  category: '',
  description: '',
  tags: [],
})

// 编辑问题表单
const editingQuestion = ref<{
  id: number | null
  title: string
  category: string
  description: string
  tags: string[]
}>({
  id: null,
  title: '',
  category: '',
  description: '',
  tags: [],
})

// 模拟我的问题数据
const myQuestions = ref([
  {
    id: 1,
    title: '如何选择合适的机器学习算法来解决多分类问题？',
    category: '机器学习',
    description:
      '我正在处理一个包含10个类别的图像分类任务，数据集大小约为50000张图片。目前考虑使用CNN，但不确定具体应该选择哪种架构...',
    tags: ['CNN', '图像分类', '多分类', '类别不平衡'],
    status: 'answered',
    answerCount: 8,
    newAnswersCount: 2,
    viewCount: 328,
    followCount: 15,
    likeCount: 12,
    hasNewAnswers: true,
    createdAt: '2025-06-25T10:30:00',
    updatedAt: '2025-06-26T14:20:00',
    latestAnswer: {
      id: 101,
      author: {
        name: '李教授',
        avatar: '/default-avatar.png',
      },
      excerpt:
        '对于你的多分类图像任务，我建议从以下几个方面来优化：首先是模型架构选择，根据你的数据集规模...',
      createdAt: '2025-06-26T14:20:00',
      isBest: true,
    },
  },
  {
    id: 2,
    title: '深度学习模型如何处理序列数据的长期依赖问题？',
    category: '深度学习',
    description: '我在做时间序列预测时遇到了长期依赖的问题，LSTM效果不好，想了解其他解决方案...',
    tags: ['LSTM', '时间序列', '长期依赖', 'Transformer'],
    status: 'open',
    answerCount: 3,
    newAnswersCount: 0,
    viewCount: 156,
    followCount: 8,
    likeCount: 5,
    hasNewAnswers: false,
    createdAt: '2025-06-24T09:15:00',
    updatedAt: '2025-06-25T16:30:00',
    latestAnswer: {
      id: 102,
      author: {
        name: '张研究员',
        avatar: '/default-avatar.png',
      },
      excerpt:
        '可以尝试使用Transformer架构，它在处理长序列方面表现更好。另外，注意力机制能够直接建模长距离依赖...',
      createdAt: '2025-06-25T16:30:00',
      isBest: false,
    },
  },
  {
    id: 3,
    title: '如何评估推荐系统的效果？有哪些关键指标？',
    category: '数据科学',
    description:
      '我在开发一个电商推荐系统，想了解如何科学地评估推荐效果，除了准确率还有什么重要指标...',
    tags: ['推荐系统', '评估指标', '协同过滤', 'A/B测试'],
    status: 'solved',
    answerCount: 12,
    newAnswersCount: 0,
    viewCount: 445,
    followCount: 22,
    likeCount: 18,
    hasNewAnswers: false,
    createdAt: '2025-06-20T14:45:00',
    updatedAt: '2025-06-23T11:20:00',
    latestAnswer: {
      id: 103,
      author: {
        name: '王工程师',
        avatar: '/default-avatar.png',
      },
      excerpt:
        '推荐系统评估需要考虑多个维度：准确性指标（精确率、召回率、F1）、排序指标（NDCG、MAP）、多样性指标...',
      createdAt: '2025-06-23T11:20:00',
      isBest: true,
    },
  },
])

// 计算属性
const filteredQuestions = computed(() => {
  let filtered = myQuestions.value

  if (statusFilter.value) {
    filtered = filtered.filter(q => q.status === statusFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(q => q.category === categoryFilter.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      break
    case 'mostAnswered':
      filtered.sort((a, b) => b.answerCount - a.answerCount)
      break
    case 'mostViewed':
      filtered.sort((a, b) => b.viewCount - a.viewCount)
      break
  }

  return filtered
})

const solvedCount = computed(() => myQuestions.value.filter(q => q.status === 'solved').length)
const openCount = computed(() => myQuestions.value.filter(q => q.status === 'open').length)

// 方法
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
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

const getStatusStyle = (status: string) => {
  const styles = {
    open: 'bg-orange-100 text-orange-700',
    answered: 'bg-blue-100 text-blue-700',
    solved: 'bg-emerald-100 text-emerald-700',
  }
  return styles[status as keyof typeof styles] || styles.open
}

const getStatusText = (status: 'open' | 'answered' | 'solved' | string) => {
  const texts: Record<'open' | 'answered' | 'solved', string> = {
    open: '待解决',
    answered: '已有回答',
    solved: '已解决',
  }
  return texts[status as 'open' | 'answered' | 'solved'] || texts.open
}

const viewQuestion = (questionId: number) => {
  router.push(`/research/qa/${questionId}`)
}

const editQuestion = (question: any) => {
  editingQuestion.value = {
    id: question.id,
    title: question.title,
    category: question.category,
    description: question.description,
    tags: [...question.tags],
  }
  showEditDialog.value = true
}

const updateQuestion = () => {
  const question = myQuestions.value.find(q => q.id === editingQuestion.value.id)
  if (question) {
    question.title = editingQuestion.value.title
    question.category = editingQuestion.value.category
    question.description = editingQuestion.value.description
    question.tags = [...editingQuestion.value.tags]
    question.updatedAt = new Date().toISOString()

    showEditDialog.value = false
    ElMessage.success('问题更新成功')
  }
}

const markAsSolved = async (questionId: number) => {
  try {
    await ElMessageBox.confirm('确定要标记这个问题为已解决吗？', '确认操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success',
    })

    const question = myQuestions.value.find(q => q.id === questionId)
    if (question) {
      question.status = 'solved'
      question.updatedAt = new Date().toISOString()
      ElMessage.success('问题已标记为已解决')
    }
  } catch {
    ElMessage.info('已取消操作')
  }
}

const markAsBestAnswer = async (questionId: number, answerId: number) => {
  try {
    await ElMessageBox.confirm('确定要将此回答设为最佳答案吗？', '确认操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success',
    })

    const question = myQuestions.value.find(q => q.id === questionId)
    if (question && question.latestAnswer) {
      question.latestAnswer.isBest = true
      question.status = 'solved'
      question.updatedAt = new Date().toISOString()
      ElMessage.success('已设为最佳答案')
    }
  } catch {
    ElMessage.info('已取消操作')
  }
}

const deleteQuestion = async (questionId: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这个问题吗？此操作不可撤销。', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const index = myQuestions.value.findIndex(q => q.id === questionId)
    if (index > -1) {
      myQuestions.value.splice(index, 1)
      ElMessage.success('问题删除成功')
    }
  } catch {
    ElMessage.info('已取消删除')
  }
}

const manageAnswers = (questionId: number) => {
  router.push(`/research/qa/${questionId}?tab=answers`)
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !newQuestion.value.tags.includes(tag)) {
    newQuestion.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = newQuestion.value.tags.indexOf(tag)
  if (index > -1) {
    newQuestion.value.tags.splice(index, 1)
  }
}

const addEditTag = () => {
  const tag = editTagInput.value.trim()
  if (tag && !editingQuestion.value.tags.includes(tag)) {
    editingQuestion.value.tags.push(tag)
    editTagInput.value = ''
  }
}

const removeEditTag = (tag: string) => {
  const index = editingQuestion.value.tags.indexOf(tag)
  if (index > -1) {
    editingQuestion.value.tags.splice(index, 1)
  }
}

const publishQuestion = () => {
  const question = {
    id: Date.now(),
    title: newQuestion.value.title,
    category: newQuestion.value.category,
    description: newQuestion.value.description,
    tags: [...newQuestion.value.tags],
    status: 'open',
    answerCount: 0,
    newAnswersCount: 0,
    viewCount: 0,
    followCount: 0,
    likeCount: 0,
    hasNewAnswers: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    latestAnswer: {
      id: 0,
      author: {
        name: '',
        avatar: '',
      },
      excerpt: '',
      createdAt: '',
      isBest: false,
    },
  }

  myQuestions.value.unshift(question)

  // 重置表单
  newQuestion.value = {
    title: '',
    category: '',
    description: '',
    tags: [],
  }

  showPublishDialog.value = false
  ElMessage.success('问题发布成功！')
}

onMounted(() => {
  // 页面初始化
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