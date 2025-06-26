
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">科研问答</h1>
          <p class="mt-2 text-gray-600">分享知识，解决科研难题</p>
        </div>
        <button
          @click="showPublishDialog = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          发布问题
        </button>
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
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
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
              </select>
            </div>
          </div>

          <!-- 问题列表 -->
          <div class="space-y-6">
            <div
              v-for="question in filteredQuestions"
              :key="question.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- 问题标题和标签 -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {{ question.title }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="tag in question.tags"
                        :key="tag"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- 关注按钮 -->
                  <button
                    @click="toggleFollow(question.id)"
                    :class="[
                      'ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      question.isFollowed
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {{ question.isFollowed ? '已关注' : '关注' }}
                  </button>
                </div>

                <!-- 问题描述 -->
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {{ question.description }}
                </p>

                <!-- 问题元信息 -->
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                      <img
                        :src="question.author.avatar"
                        :alt="question.author.name"
                        class="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{{ question.author.name }}</span>
                    </div>
                    <span>{{ formatTime(question.createdAt) }}</span>
                  </div>
                  
                  <div class="flex items-center space-x-4">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"></path>
                      </svg>
                      {{ question.answerCount }} 回答
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {{ question.viewCount }} 浏览
                    </span>
                  </div>
                </div>

                <!-- 回答预览 -->
                <div v-if="question.topAnswer" class="mt-4 pt-4 border-t border-gray-200">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                      <img
                        :src="question.topAnswer.author.avatar"
                        :alt="question.topAnswer.author.name"
                        class="w-5 h-5 rounded-full mr-2"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ question.topAnswer.author.name }}</span>
                      <span class="text-sm text-gray-500 ml-2">回答</span>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2">
                      {{ question.topAnswer.content }}
                    </p>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="mt-4 flex items-center justify-between">
                  <div class="flex space-x-3">
                    <button
                      @click="showAnswerDialog(question)"
                      class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      回答问题
                    </button>
                    <button
                      @click="viewQuestion(question.id)"
                      class="text-gray-600 hover:text-gray-700 text-sm font-medium"
                    >
                      查看详情
                    </button>
                  </div>
                  
                  <div class="flex items-center space-x-1 text-sm text-gray-500">
                    <span>{{ question.followCount }} 人关注</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags"
                :key="tag.name"
                @click="searchByTag(tag.name)"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {{ tag.name }}
                <span class="ml-1 text-xs text-gray-500">({{ tag.count }})</span>
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
                class="flex items-center space-x-3"
              >
                <img
                  :src="user.avatar"
                  :alt="user.name"
                  class="w-8 h-8 rounded-full"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.answerCount }} 回答</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布问题对话框 -->
    <div v-if="showPublishDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研问题</h3>
            <button
              @click="showPublishDialog = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
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
              v-model="newQuestion.description"
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
              v-model="newQuestion.category"
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

          <!-- 标签 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="tag in newQuestion.tags"
                :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ tag }}
                <button
                  @click="removeTag(tag)"
                  type="button"
                  class="ml-1 text-blue-600 hover:text-blue-800"
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
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="addTag"
                type="button"
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                添加
              </button>
            </div>
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
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              发布问题
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 回答问题对话框 -->
    <div v-if="showAnswerForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">回答问题</h3>
            <button
              @click="showAnswerForm = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 问题信息 -->
        <div v-if="selectedQuestion" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 class="font-medium text-gray-900 mb-2">{{ selectedQuestion.title }}</h4>
          <p class="text-sm text-gray-600 line-clamp-2">{{ selectedQuestion.description }}</p>
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
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              提交回答
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10

// 对话框控制
const showPublishDialog = ref(false)
const showAnswerForm = ref(false)
interface Question {
  id: number
  title: string
  description: string
  category: string
  tags: string[]
  author: {
    id: number
    name: string
    avatar: string
    institution: string
  }
  createdAt: string
  answerCount: number
  viewCount: number
  followCount: number
  isFollowed: boolean
  topAnswer: null | {
    author: {
      name: string
      avatar: string
    }
    content: string
  }
}

const selectedQuestion = ref<Question | null>(null)

// 发布问题表单
const newQuestion = ref<{
  title: string
  description: string
  category: string
  tags: string[]
}>({
  title: '',
  description: '',
  category: '',
  tags: []
})
const tagInput = ref('')

// 回答表单
const newAnswer = ref({
  content: ''
})

// 模拟数据
const questions = ref([
  {
    id: 1,
    title: '如何选择合适的机器学习算法来解决多分类问题？',
    description: '我正在处理一个包含10个类别的图像分类任务，数据集大小约为50000张图片。目前考虑使用CNN，但不确定具体应该选择哪种架构。数据集存在一定的类别不平衡问题，有些类别的样本数量较少。希望能得到一些关于算法选择和数据预处理的建议。',
    category: '机器学习',
    tags: ['CNN', '图像分类', '多分类', '类别不平衡'],
    author: {
      id: 1,
      name: '张研究员',
      avatar: '/default-avatar.png',
      institution: '清华大学'
    },
    createdAt: '2025-06-25T10:30:00',
    answerCount: 5,
    viewCount: 128,
    followCount: 12,
    isFollowed: false,
    topAnswer: {
      author: {
        name: '李教授',
        avatar: '/default-avatar.png'
      },
      content: '对于多分类图像任务，我建议从ResNet或EfficientNet开始尝试。针对类别不平衡，可以考虑使用焦点损失(Focal Loss)或加权交叉熵损失...'
    }
  },
  {
    id: 2,
    title: '深度学习模型在小样本数据集上的过拟合问题如何解决？',
    description: '我的数据集只有2000个样本，但特征维度很高（约1000维）。使用传统的深度网络容易出现过拟合，验证集准确率远低于训练集。已经尝试了dropout和L2正则化，但效果有限。',
    category: '机器学习',
    tags: ['深度学习', '小样本', '过拟合', '正则化'],
    author: {
      id: 2,
      name: '王博士',
      avatar: '/default-avatar.png',
      institution: '北京大学'
    },
    createdAt: '2025-06-25T09:15:00',
    answerCount: 8,
    viewCount: 256,
    followCount: 18,
    isFollowed: true,
    topAnswer: {
      author: {
        name: '陈研究员',
        avatar: '/default-avatar.png'
      },
      content: '小样本问题建议考虑迁移学习，使用预训练模型进行微调。另外可以尝试数据增强、早停法和集成学习等方法...'
    }
  },
  {
    id: 3,
    title: '如何评估时间序列预测模型的性能？',
    description: '我在做股价预测的研究，使用LSTM模型。除了常见的RMSE和MAE，还有哪些指标可以更好地评估时间序列预测的效果？特别是在金融领域的应用。',
    category: '数据分析',
    tags: ['时间序列', 'LSTM', '股价预测', '模型评估'],
    author: {
      id: 3,
      name: '刘分析师',
      avatar: '/default-avatar.png',
      institution: '复旦大学'
    },
    createdAt: '2025-06-25T08:45:00',
    answerCount: 3,
    viewCount: 89,
    followCount: 7,
    isFollowed: false,
    topAnswer: null
  },
  {
    id: 4,
    title: '研究论文中的实验部分应该如何设计才能更有说服力？',
    description: '即将投稿一篇关于自然语言处理的论文，但担心实验部分不够充分。应该包含哪些对比实验？如何选择基线模型？消融实验的设计有什么要点？',
    category: '论文写作',
    tags: ['论文写作', '实验设计', '对比实验', '消融实验'],
    author: {
      id: 4,
      name: '赵硕士',
      avatar: '/default-avatar.png',
      institution: '上海交通大学'
    },
    createdAt: '2025-06-24T16:20:00',
    answerCount: 12,
    viewCount: 445,
    followCount: 25,
    isFollowed: true,
    topAnswer: {
      author: {
        name: '孙教授',
        avatar: '/default-avatar.png'
      },
      content: '实验设计需要考虑完整性和公平性。建议包含与最新SOTA方法的对比、不同数据集上的验证、详细的消融实验分析...'
    }
  },
  {
    id: 5,
    title: 'Transformer架构在视觉任务上的应用前景如何？',
    description: 'Vision Transformer (ViT) 最近很热门，想了解它相比传统CNN的优势在哪里？在什么场景下使用ViT会更好？计算资源需求如何？',
    category: '理论研究',
    tags: ['Transformer', 'ViT', '计算机视觉', 'CNN'],
    author: {
      id: 5,
      name: '钱研究生',
      avatar: '/default-avatar.png',
      institution: '中科院'
    },
    createdAt: '2025-06-24T14:10:00',
    answerCount: 6,
    viewCount: 178,
    followCount: 14,
    isFollowed: false,
    topAnswer: {
      author: {
        name: '周专家',
        avatar: '/default-avatar.png'
      },
      content: 'ViT在大规模数据集上表现优异，特别是在需要捕捉长距离依赖的任务中。但计算成本较高，小数据集上可能不如CNN...'
    }
  }
])

const popularTags = ref([
  { name: '机器学习', count: 45 },
  { name: '深度学习', count: 38 },
  { name: 'CNN', count: 23 },
  { name: '数据分析', count: 31 },
  { name: '论文写作', count: 18 },
  { name: 'Transformer', count: 15 },
  { name: '时间序列', count: 12 },
  { name: '算法优化', count: 20 }
])

const activeUsers = ref([
  {
    id: 1,
    name: '李教授',
    avatar: '/default-avatar.png',
    answerCount: 127
  },
  {
    id: 2,
    name: '陈研究员',
    avatar: '/default-avatar.png',
    answerCount: 89
  },
  {
    id: 3,
    name: '孙教授',
    avatar: '/default-avatar.png',
    answerCount: 76
  },
  {
    id: 4,
    name: '周专家',
    avatar: '/default-avatar.png',
    answerCount: 54
  }
])

// 计算属性
const filteredQuestions = computed(() => {
  let filtered = questions.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.category === selectedCategory.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'hot':
      filtered.sort((a, b) => (b.answerCount + b.viewCount) - (a.answerCount + a.viewCount))
      break
    case 'unanswered':
      filtered.sort((a, b) => a.answerCount - b.answerCount)
      break
  }

  // 分页
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = questions.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.category === selectedCategory.value)
  }
  return Math.ceil(filtered.length / itemsPerPage)
})

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
    minute: '2-digit'
  }).format(date)
}

const toggleFollow = (questionId: number) => {
  const question = questions.value.find(q => q.id === questionId)
  if (question) {
    question.isFollowed = !question.isFollowed
    question.followCount += question.isFollowed ? 1 : -1
    ElMessage.success(question.isFollowed ? '关注成功' : '取消关注')
  }
}

const searchByTag = (tagName: string) => {
  searchQuery.value = tagName
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

const publishQuestion = () => {
  // 模拟发布问题
  const question = {
    id: Date.now(),
    title: newQuestion.value.title,
    description: newQuestion.value.description,
    category: newQuestion.value.category,
    tags: [...newQuestion.value.tags],
    author: {
      id: 999,
      name: '当前用户',
      avatar: '/images/avatar/default.png',
      institution: '我的大学'
    },
    createdAt: new Date().toISOString(),
    answerCount: 0,
    viewCount: 0,
    followCount: 0,
    isFollowed: false,
    topAnswer: null
  }

  questions.value.unshift(question)
  
  // 重置表单
  newQuestion.value = {
    title: '',
    description: '',
    category: '',
    tags: []
  }
  
  showPublishDialog.value = false
  ElMessage.success('问题发布成功！')
}

const showAnswerDialog = (question: any) => {
  selectedQuestion.value = question
  showAnswerForm.value = true
}

const submitAnswer = () => {
  if (selectedQuestion.value) {
    selectedQuestion.value.answerCount++
    newAnswer.value.content = ''
    showAnswerForm.value = false
    ElMessage.success('回答提交成功！')
  }
}

const viewQuestion = (questionId: number) => {
  router.push(`/research/qa/${questionId}`)
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>