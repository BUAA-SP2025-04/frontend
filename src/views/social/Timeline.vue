<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布动态 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 flex items-center">
              <svg
                class="w-8 h-8 mr-3 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              学术动态
            </h1>
            <p class="text-gray-600 mt-2">关注科研人员的最新学术动态和分享</p>
          </div>

          <el-button type="primary" @click="showPublishDialog = true">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            发布动态
          </el-button>
        </div>

        <!-- 筛选和排序 -->
        <div class="bg-white rounded-lg shadow p-4 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <el-input
                v-model="searchQuery"
                placeholder="搜索动态内容..."
                prefix-icon="Search"
                clearable
              />
            </div>

            <el-select v-model="selectedCategory" placeholder="动态类型" style="width: 150px">
              <el-option label="全部" value="all" />
              <el-option label="论文发表" value="paper" />
              <el-option label="项目进展" value="project" />
              <el-option label="会议分享" value="conference" />
              <el-option label="学术观点" value="opinion" />
              <el-option label="合作邀请" value="collaboration" />
            </el-select>

            <el-select v-model="sortBy" style="width: 120px">
              <el-option label="最新" value="latest" />
              <el-option label="最热" value="hot" />
              <el-option label="最多评论" value="comments" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 动态列表 -->
      <div class="space-y-6">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <!-- 动态头部 -->
          <div class="p-6 pb-4">
            <div class="flex items-start space-x-4">
              <router-link :to="`/user/${post.author.id}`">
                <img
                  :src="post.author.avatar"
                  :alt="post.author.name"
                  class="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
                />
              </router-link>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <div>
                    <router-link
                      :to="`/user/${post.author.id}`"
                      class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {{ post.author.name }}
                    </router-link>
                    <p class="text-sm text-gray-500">{{ post.author.institution }}</p>
                  </div>

                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">{{ formatTime(post.createdAt) }}</span>
                    <el-dropdown trigger="click" @command="handlePostAction">
                      <button class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="`save-${post.id}`">保存动态</el-dropdown-item>
                          <el-dropdown-item :command="`share-${post.id}`">分享</el-dropdown-item>
                          <el-dropdown-item :command="`report-${post.id}`" divided
                            >举报</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>

                <!-- 动态类型标签 -->
                <div class="mt-2">
                  <span :class="getTypeTagClass(post.type)" class="px-2 py-1 text-xs rounded-full">
                    {{ getTypeLabel(post.type) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 动态内容 -->
          <div class="px-6">
            <!-- 文本内容 -->
            <div class="mb-4">
              <h3 v-if="post.title" class="text-xl font-semibold text-gray-900 mb-2">
                {{ post.title }}
              </h3>
              <div class="text-gray-700 leading-relaxed">
                <p v-if="!post.showFullContent && post.content.length > 200">
                  {{ post.content.substring(0, 200) }}...
                  <button
                    @click="post.showFullContent = true"
                    class="text-indigo-600 hover:text-indigo-700 font-medium ml-1"
                  >
                    展开
                  </button>
                </p>
                <p v-else class="whitespace-pre-wrap">{{ post.content }}</p>

                <button
                  v-if="post.showFullContent && post.content.length > 200"
                  @click="post.showFullContent = false"
                  class="text-indigo-600 hover:text-indigo-700 font-medium mt-2"
                >
                  收起
                </button>
              </div>
            </div>

            <!-- 附件内容 -->
            <div v-if="post.attachments && post.attachments.length > 0" class="mb-4">
              <!-- 论文附件 -->
              <div
                v-if="
                  post.type === 'paper' &&
                  post.attachments &&
                  post.attachments.length > 0 &&
                  isPaperAttachment(post.attachments[0])
                "
                class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                @click="openPaper(post.attachments[0])"
              >
                <div class="flex items-start space-x-4">
                  <div
                    class="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-lg font-semibold text-gray-900 mb-1">
                      {{ post.attachments[0].title }}
                    </h4>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ post.attachments[0].journal }} • {{ post.attachments[0].year }}
                    </p>
                    <p class="text-sm text-gray-500 line-clamp-2">
                      {{ post.attachments[0].abstract }}
                    </p>
                    <div class="flex items-center mt-3 space-x-4 text-xs text-gray-500">
                      <span>引用: {{ post.attachments[0].citations }}</span>
                      <span>下载: {{ post.attachments[0].downloads }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 图片附件 -->
              <div
                v-else-if="post.attachments.some(att => att.type === 'image')"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <img
                  v-for="(image, index) in post.attachments.filter(att => att.type === 'image')"
                  :key="index"
                  :src="image.url"
                  :alt="image.name"
                  class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  @click="previewImage(image.url)"
                />
              </div>

              <!-- 链接附件 -->
              <div
                v-else-if="post.attachments[0]?.type === 'link'"
                class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                @click="openLink(post.attachments[0].url)"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 truncate">
                      {{ post.attachments[0].title }}
                    </h4>
                    <p class="text-xs text-gray-500 truncate">
                      {{ post.attachments[0].description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 标签 -->
            <div v-if="post.tags && post.tags.length > 0" class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                  @click="searchByTag(tag)"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- 动态交互区域 -->
          <div class="px-6 py-4 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-6">
                <!-- 点赞 -->
                <button
                  @click="toggleLike(post)"
                  :class="[
                    'flex items-center space-x-2 transition-colors',
                    post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500',
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ post.likesCount }}</span>
                </button>

                <!-- 评论 -->
                <button
                  @click="toggleComments(post)"
                  class="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ post.commentsCount }}</span>
                </button>

                <!-- 转发 -->
                <button
                  @click="sharePost(post)"
                  class="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ post.sharesCount }}</span>
                </button>
              </div>

              <!-- 浏览量 -->
              <div class="flex items-center text-gray-400 text-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {{ post.viewsCount }}
              </div>
            </div>
          </div>

          <!-- 评论区域 -->
          <div v-if="post.showComments" class="border-t border-gray-100">
            <!-- 发表评论 -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex space-x-3">
                <img
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div class="flex-1">
                  <el-input
                    v-model="post.newComment"
                    type="textarea"
                    :rows="2"
                    placeholder="写下你的评论..."
                    @keydown.ctrl.enter="submitComment(post)"
                  />
                  <div class="flex justify-end mt-2">
                    <el-button
                      size="small"
                      type="primary"
                      :disabled="!post.newComment?.trim()"
                      @click="submitComment(post)"
                    >
                      发表评论
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 评论列表 -->
            <div v-if="post.comments && post.comments.length > 0" class="p-6 space-y-4">
              <div v-for="comment in post.comments" :key="comment.id" class="flex space-x-3">
                <router-link :to="`/user/${comment.author.id}`">
                  <img
                    :src="comment.author.avatar"
                    :alt="comment.author.name"
                    class="w-8 h-8 rounded-full object-cover hover:opacity-80 transition-opacity"
                  />
                </router-link>

                <div class="flex-1 min-w-0">
                  <div class="bg-gray-50 rounded-lg p-3">
                    <div class="flex items-center justify-between mb-1">
                      <router-link
                        :to="`/user/${comment.author.id}`"
                        class="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        {{ comment.author.name }}
                      </router-link>
                      <span class="text-xs text-gray-500">{{ formatTime(comment.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ comment.content }}</p>
                  </div>

                  <!-- 评论操作 -->
                  <div class="flex items-center mt-2 space-x-3 text-xs text-gray-500">
                    <button
                      @click="toggleCommentLike(comment)"
                      :class="comment.isLiked ? 'text-red-500' : 'hover:text-red-500'"
                      class="transition-colors"
                    >
                      赞 ({{ comment.likesCount }})
                    </button>
                    <button
                      @click="replyToComment(comment)"
                      class="hover:text-indigo-500 transition-colors"
                    >
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div v-if="hasMore" class="text-center py-8">
        <el-button @click="loadMore" :loading="loading">
          {{ loading ? '加载中...' : '加载更多' }}
        </el-button>
      </div>

      <!-- 发布动态对话框 -->
      <el-dialog v-model="showPublishDialog" title="发布动态" width="60%" destroy-on-close>
        <PublishPostForm @published="handlePostPublished" @cancel="showPublishDialog = false" />
      </el-dialog>

      <!-- 图片预览 -->
      <el-dialog v-model="showImagePreview" width="80%" center>
        <img :src="previewImageUrl" class="w-full h-auto" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PublishPostForm from '@/components/PublishPostForm.vue'

const router = useRouter()

// 定义类型接口
interface User {
  id: number
  name: string
  avatar: string
  institution?: string
}

interface PaperAttachment {
  type: 'paper'
  title: string
  journal: string
  year: number
  abstract: string
  citations: number
  downloads: number
  url: string
}

interface ImageAttachment {
  type: 'image'
  name: string
  url: string
}

interface LinkAttachment {
  type: 'link'
  title: string
  description: string
  url: string
}

type Attachment = PaperAttachment | ImageAttachment | LinkAttachment

interface Comment {
  id: number
  author: User
  content: string
  createdAt: Date
  likesCount: number
  isLiked: boolean
}

interface Post {
  id: number
  type: 'paper' | 'project' | 'conference' | 'opinion' | 'collaboration'
  title?: string
  content: string
  author: User
  attachments?: Attachment[]
  tags?: string[]
  createdAt: Date
  likesCount: number
  commentsCount: number
  sharesCount: number
  viewsCount: number
  isLiked: boolean
  showComments: boolean
  showFullContent: boolean
  newComment: string
  comments: Comment[]
}

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('latest')
const showPublishDialog = ref(false)
const showImagePreview = ref(false)
const previewImageUrl = ref('')
const loading = ref(false)
const hasMore = ref(true)

// 当前用户
const currentUser = reactive<User>({
  id: 1,
  name: '李明',
  avatar: 'https://via.placeholder.com/100',
})

// 动态数据
const posts = ref<Post[]>([
  {
    id: 1,
    type: 'paper',
    title: '深度学习在蛋白质结构预测中的突破性应用',
    content:
      '我们团队最新发表的论文在《Nature》上刊登，展示了深度学习技术在蛋白质结构预测领域的重大突破。这项研究将为药物设计和生物医学研究带来革命性的变化。\n\n主要贡献包括：\n1. 开发了新的深度学习架构\n2. 在CASP14竞赛中取得最佳成绩\n3. 预测精度提升了40%\n\n感谢所有合作者的努力！',
    author: {
      id: 2,
      name: '王芳',
      avatar: 'https://via.placeholder.com/100',
      institution: '北京大学',
    },
    attachments: [
      {
        type: 'paper',
        title: 'Improved protein structure prediction using deep learning',
        journal: 'Nature',
        year: 2024,
        abstract: '本文提出了一种基于深度学习的蛋白质结构预测方法，显著提高了预测精度...',
        citations: 156,
        downloads: 2341,
        url: 'https://example.com/paper1.pdf',
      } as PaperAttachment,
    ],
    tags: ['深度学习', '蛋白质结构', '生物信息学', 'Nature'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likesCount: 89,
    commentsCount: 23,
    sharesCount: 15,
    viewsCount: 1234,
    isLiked: false,
    showComments: false,
    showFullContent: false,
    newComment: '',
    comments: [
      {
        id: 1,
        author: {
          id: 3,
          name: '张伟',
          avatar: 'https://via.placeholder.com/100',
        },
        content: '恭喜！这是一项非常重要的研究成果，对整个领域都有重大意义。',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        likesCount: 12,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    type: 'project',
    title: '启动量子计算优化算法研究项目',
    content:
      '很高兴宣布我们实验室获得了国家自然科学基金的支持，将在未来三年内专注于量子计算在复杂优化问题中的应用研究。\n\n项目目标：\n• 开发新的量子优化算法\n• 解决经典计算机难以处理的大规模优化问题\n• 在物流、金融、生物信息学等领域进行应用验证\n\n期待与更多同行合作交流！',
    author: {
      id: 4,
      name: '李华',
      avatar: 'https://via.placeholder.com/100',
      institution: '清华大学',
    },
    attachments: [
      {
        type: 'link',
        title: '项目详情页面',
        description: '查看项目的详细信息和进展',
        url: 'https://example.com/project',
      } as LinkAttachment,
    ],
    tags: ['量子计算', '优化算法', '国家自然科学基金'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likesCount: 45,
    commentsCount: 8,
    sharesCount: 12,
    viewsCount: 567,
    isLiked: true,
    showComments: false,
    showFullContent: false,
    newComment: '',
    comments: [],
  },
  {
    id: 3,
    type: 'conference',
    title: 'ICML 2024 演讲分享',
    content:
      '刚刚结束了在维也纳举办的ICML 2024大会的主题演讲，分享了我们在联邦学习隐私保护方面的最新研究成果。会议期间收到了很多宝贵的建议和合作意向。',
    author: {
      id: 5,
      name: '陈明',
      avatar: 'https://via.placeholder.com/100',
      institution: '中科院',
    },
    attachments: [
      {
        type: 'image',
        name: '演讲现场',
        url: 'https://via.placeholder.com/400x300',
      } as ImageAttachment,
      {
        type: 'image',
        name: '会议合影',
        url: 'https://via.placeholder.com/400x300',
      } as ImageAttachment,
    ],
    tags: ['ICML2024', '联邦学习', '隐私保护'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    likesCount: 67,
    commentsCount: 15,
    sharesCount: 8,
    viewsCount: 892,
    isLiked: false,
    showComments: false,
    showFullContent: false,
    newComment: '',
    comments: [],
  },
])

// 计算属性
const filteredPosts = computed(() => {
  let result = posts.value

  // 按类型筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(post => post.type === selectedCategory.value)
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      post =>
        post.title?.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'hot':
        return (
          b.likesCount +
          b.commentsCount +
          b.sharesCount -
          (a.likesCount + a.commentsCount + a.sharesCount)
        )
      case 'comments':
        return b.commentsCount - a.commentsCount
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return result
})

// 类型守卫函数
const isPaperAttachment = (attachment: Attachment): attachment is PaperAttachment => {
  return attachment.type === 'paper'
}

const isImageAttachment = (attachment: Attachment): attachment is ImageAttachment => {
  return attachment.type === 'image'
}

const isLinkAttachment = (attachment: Attachment): attachment is LinkAttachment => {
  return attachment.type === 'link'
}

// 方法
const getTypeLabel = (type: Post['type']) => {
  const labels = {
    paper: '论文发表',
    project: '项目进展',
    conference: '会议分享',
    opinion: '学术观点',
    collaboration: '合作邀请',
  }
  return labels[type] || '动态'
}

const getTypeTagClass = (type: Post['type']) => {
  const classes = {
    paper: 'bg-red-100 text-red-800',
    project: 'bg-blue-100 text-blue-800',
    conference: 'bg-green-100 text-green-800',
    opinion: 'bg-yellow-100 text-yellow-800',
    collaboration: 'bg-purple-100 text-purple-800',
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const formatTime = (date: Date) => {
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

const toggleLike = (post: Post) => {
  post.isLiked = !post.isLiked
  post.likesCount += post.isLiked ? 1 : -1

  ElMessage.success(post.isLiked ? '点赞成功' : '取消点赞')
}

const toggleComments = (post: Post) => {
  post.showComments = !post.showComments
}

const sharePost = (post: Post) => {
  // 分享功能
  navigator.clipboard.writeText(`${window.location.origin}/timeline#post-${post.id}`)
  ElMessage.success('链接已复制到剪贴板')
}

const submitComment = (post: Post) => {
  if (!post.newComment?.trim()) return

  const comment: Comment = {
    id: Date.now(),
    author: currentUser,
    content: post.newComment.trim(),
    createdAt: new Date(),
    likesCount: 0,
    isLiked: false,
  }

  if (!post.comments) {
    post.comments = []
  }

  post.comments.unshift(comment)
  post.commentsCount++
  post.newComment = ''

  ElMessage.success('评论发表成功')
}

const toggleCommentLike = (comment: Comment) => {
  comment.isLiked = !comment.isLiked
  comment.likesCount += comment.isLiked ? 1 : -1
}

const replyToComment = (comment: Comment) => {
  ElMessage.info('回复功能开发中...')
}

const searchByTag = (tag: string) => {
  searchQuery.value = tag
}

const previewImage = (url: string) => {
  previewImageUrl.value = url
  showImagePreview.value = true
}

const openPaper = (paper: PaperAttachment) => {
  window.open(paper.url, '_blank')
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const handlePostAction = (command: string) => {
  const [action, id] = command.split('-')

  switch (action) {
    case 'save':
      ElMessage.success('动态已保存')
      break
    case 'share':
      ElMessage.success('分享链接已复制')
      break
    case 'report':
      ElMessage.info('举报功能开发中...')
      break
  }
}

const loadMore = async () => {
  loading.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 这里应该从API加载更多数据
    ElMessage.success('加载完成')

    // 模拟没有更多数据
    hasMore.value = false
  } catch (error) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handlePostPublished = (newPost: Partial<Post>) => {
  const post: Post = {
    id: Date.now(),
    type: newPost.type || 'opinion',
    title: newPost.title,
    content: newPost.content || '',
    author: currentUser,
    attachments: newPost.attachments,
    tags: newPost.tags,
    createdAt: new Date(),
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    viewsCount: 0,
    isLiked: false,
    showComments: false,
    showFullContent: false,
    newComment: '',
    comments: [],
  }

  posts.value.unshift(post)
  showPublishDialog.value = false
  ElMessage.success('动态发布成功')
}

onMounted(() => {
  // 初始化数据
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
