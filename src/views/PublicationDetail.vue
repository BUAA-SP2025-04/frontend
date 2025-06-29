<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 返回上一页按钮（卡片外部） -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
      <el-button
        type="text"
        class="flex items-center text-gray-600 hover:text-blue-600 p-0"
        @click="$router.go(-1)"
      >
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回上一页
      </el-button>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 成果详情 -->
      <div v-if="publication" class="space-y-8">
        <!-- 成果基本信息 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-8">
            <!-- 标题 -->
            <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ publication.title }}</h1>

            <!-- 基本信息区域和关键词 -->
            <div class="flex gap-8 mb-6">
              <!-- 左侧基本信息区域 -->
              <div class="flex-1 space-y-4">
                <!-- 作者信息 -->
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span class="text-gray-600">作者：</span>
                  <div class="flex flex-wrap gap-2">
                    <el-tag
                      v-for="(author, index) in getAuthorsList(publication.authors)"
                      :key="index"
                      type="info"
                      effect="plain"
                      size="default"
                      class="text-gray-700 bg-gray-100 border-gray-200 text-base font-medium"
                    >
                      {{ author }}
                    </el-tag>
                  </div>
                </div>

                <!-- 发表机构 -->
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span class="text-gray-600">发表机构：</span>
                  <span class="text-gray-900">{{ publication.venue }}</span>
                </div>

                <!-- 年份和状态 -->
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="text-gray-600">年份：</span>
                    <span class="text-gray-900">{{ publication.year || '未知' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="text-gray-600">状态：</span>
                    <el-tag :type="getStatusType(publication.status)" size="small">
                      {{ getStatusLabel(publication.status) }}
                    </el-tag>
                  </div>
                </div>

                <!-- DOI -->
                <div
                  v-if="publication.doi && publication.doi.trim()"
                  class="flex items-center gap-2"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
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
                  <span class="text-gray-600">DOI：</span>
                  <el-link
                    :href="`https://doi.org/${publication.doi}`"
                    target="_blank"
                    type="primary"
                    class="font-mono"
                  >
                    {{ publication.doi }}
                  </el-link>
                </div>

                <!-- 统计信息 -->
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                    <span class="text-gray-600">阅读量：</span>
                    <span class="text-blue-600 font-semibold">{{
                      formatNumber(publication.readerNum || 0)
                    }}</span>
                  </div>
                  <!-- <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span class="text-gray-600">点赞数：</span>
                    <span class="text-red-600 font-semibold">{{
                      formatNumber(publication.likeNum || 0)
                    }}</span>
                  </div> -->
                </div>
              </div>

              <!-- 右侧关键词区域 -->
              <div class="w-48 pr-2">
                <div class="flex items-center justify-end gap-2 mb-3">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span class="text-gray-600 font-medium">关键词</span>
                </div>
                <div
                  v-if="publication.keywords && publication.keywords.trim()"
                  class="flex flex-col items-end space-y-3"
                >
                  <el-tag
                    v-for="keyword in getKeywordsList(publication.keywords)"
                    :key="keyword"
                    type="info"
                    effect="plain"
                    size="default"
                    class="text-gray-700 bg-blue-50 border-blue-200 text-base font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    {{ keyword }}
                  </el-tag>
                </div>
                <div v-else class="text-right">
                  <span class="text-gray-500 italic text-sm">暂无关键词</span>
                </div>
              </div>
            </div>

            <!-- 摘要 -->
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
              <div class="p-1 pl-3 pr-3">
                <p
                  v-if="publication.abstracts && publication.abstracts.trim()"
                  :class="[
                    'text-gray-700 leading-relaxed transition-all duration-300 tracking-wide indent-8',
                    isAbstractExpanded ? '' : 'line-clamp-3',
                  ]"
                >
                  {{ publication.abstracts }}
                </p>
                <p v-else class="text-gray-500 italic">暂无摘要信息</p>
                <div
                  v-if="
                    publication.abstracts &&
                    publication.abstracts.trim() &&
                    publication.abstracts.length > 200
                  "
                  class="mt-2"
                >
                  <el-button
                    type="text"
                    size="small"
                    class="text-blue-600 hover:text-blue-800 p-0"
                    @click="toggleAbstract"
                  >
                    {{ isAbstractExpanded ? '收起' : '展开' }}
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center gap-4 mt-6">
              <el-button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                type="primary"
                class="flex items-center gap-2"
                @click="openPdf"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                查看PDF
              </el-button>
              <el-button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                type="success"
                class="flex items-center gap-2"
                @click="downloadPdf"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
                下载PDF
              </el-button>
              <el-button v-else type="warning" class="flex items-center gap-2" @click="applyPdf">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12v1m0 4h.01M12 8v4m0 4h.01M8 12v1m0 4h.01M12 4v.01M12 20v.01M4 12v.01M20 12v.01"
                  />
                </svg>
                申请PDF
              </el-button>
            </div>
          </div>
        </div>

        <!-- 评论区 -->
        <div
          id="comments"
          v-loading="commentsLoading"
          class="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
          element-loading-text="精彩评论马上到来..."
        >
          <div class="p-8">
            <div class="flex items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mr-4">
                评论区
                <span class="text-blue-600 text-lg">{{ totalCommentsCount }}</span>
              </h2>
              <!-- <div class="flex items-center space-x-2 text-gray-500 text-sm">
                <span
                  :class="sortType === 'hot' ? 'font-bold text-gray-900' : 'cursor-pointer'"
                  @click="sortType = 'hot'"
                  >最热</span
                >
                <span>|</span>
                <span
                  :class="sortType === 'new' ? 'font-bold text-gray-900' : 'cursor-pointer'"
                  @click="sortType = 'new'"
                  >最新</span
                >
              </div> -->
            </div>

            <div class="mb-8">
              <CommentForm
                :publication-id="publication.id"
                :parent-id="activeReplyId"
                :reply-to-user-name="getReplyToUserName()"
                :replied-user-id="getrepliedUserIdString()"
                @submitted="loadComments"
              />
            </div>

            <!-- 评论列表 -->
            <div v-if="sortedComments.length > 0" class="space-y-8">
              <PublicationCommentComp
                v-for="comment in sortedComments"
                :key="comment.id"
                :comment="comment"
                :replies="comment.replies"
                :active-reply-id="activeReplyId"
                @like="toggleCommentLike"
                @set-active-reply="setActiveReply"
                @reply-submitted="handleReplySubmitted"
              />
            </div>
            <div v-else class="text-center py-12 text-gray-400">
              暂无评论，快来发表第一条评论吧！
            </div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else class="text-center py-12">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
          />
        </svg>
        <p class="text-gray-500 text-lg">成果不存在或已被删除</p>
        <el-button type="primary" class="mt-4" @click="$router.go(-1)">返回上一页</el-button>
      </div>
    </div>

    <!-- 浮动回到顶部按钮 -->
    <div
      v-show="showBackToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 z-50"
      @click="scrollToTop"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPublicationInformById, readPublication } from '@/api/modules/publication'
import {
  disLikeComment,
  getPublicationComments,
  getReplyComments,
  likeComment,
} from '@/api/modules/comment'
import type { Publication } from '@/api/types/publication'
import type { Comment } from '@/api/types/comment'
import type { UserDetail } from '@/api/types/user'
import PublicationCommentComp from '@/components/publication/PublicationComment.vue'
import CommentForm from '@/components/publication/CommentForm.vue'

const route = useRoute()
const router = useRouter()

const publication = ref<Publication | null>(null)
const comments = ref<Comment[]>([])
const commentsLoading = ref(true)
const isAbstractExpanded = ref(false)
const sortType = ref('hot')
const activeReplyId = ref<number | null>(null)
const showBackToTop = ref(false)

// 回复目标信息
const replyTarget = ref<{
  id: number
  name: string
  type: 'comment' | 'reply'
} | null>(null)

// 初始加载状态
const isInitialLoad = ref(true)

onMounted(async () => {
  const publicationId = route.params.id
  if (!publicationId) {
    ElMessage.error('成果ID不能为空')
    router.push('/')
    return
  }

  try {
    // 获取成果详情
    const response = await getPublicationInformById(String(publicationId))
    if (response.data) {
      console.log(response.data)
      publication.value = processPublicationData(response.data)
    }

    // 获取评论列表（异步加载，不影响页面显示）
    loadComments()
  } catch (error) {
    console.error('加载成果详情失败:', error)
    ElMessage.error('加载成果详情失败')
  }

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 滚动处理函数
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const loadComments = async () => {
  if (!publication.value) return

  commentsLoading.value = true
  try {
    const response = await getPublicationComments(publication.value.id)
    if (response.data) {
      console.log(response.data)

      // 等待所有二级评论加载完成
      const commentsWithReplies = await Promise.all(
        response.data.map(async comment => {
          try {
            // 获取二级评论
            const repliesResponse = await getReplyComments(comment.id)
            const replies = repliesResponse.data || []

            // 过滤掉内容为"该评论已删除"的二级评论
            const filteredReplies = replies.filter(reply => reply.content !== '该评论已删除')

            // 返回包含回复的评论
            return {
              ...comment,
              replies: filteredReplies,
            }
          } catch (error) {
            console.error(`获取评论 ${comment.id} 的回复失败:`, error)
            return {
              ...comment,
              replies: [],
            }
          }
        })
      )

      // 过滤掉没有二级评论且内容为"该评论已删除"的一级评论
      const filteredComments = commentsWithReplies.filter(comment => {
        // 如果评论内容为"该评论已删除"且没有二级评论，则过滤掉
        if (
          comment.content === '该评论已删除' &&
          (!comment.replies || comment.replies.length === 0)
        ) {
          return false
        }
        return true
      })

      // 只在初始加载时对评论进行排序
      if (isInitialLoad.value) {
        comments.value = filteredComments.sort((a, b) => {
          if (b.likes !== a.likes) {
            return b.likes - a.likes
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        isInitialLoad.value = false // 标记初始加载完成
      } else {
        // 非初始加载时保持原有顺序
        comments.value = filteredComments
      }
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    ElMessage.error('加载评论失败')
  } finally {
    commentsLoading.value = false
  }
}

const toggleCommentLike = async (comment: Comment) => {
  try {
    if (comment.isLiked) {
      await disLikeComment(comment.id)
      comment.isLiked = false
      comment.likes--
    } else {
      await likeComment(comment.id)
      comment.isLiked = true
      comment.likes++
    }
  } catch (error) {
    console.error('点赞失败:', error)
    ElMessage.error('操作失败')
  }
}

// 设置活跃的回复ID
function setActiveReply(
  commentId: number | null,
  targetInfo?: { id: number; name: string; type: 'comment' | 'reply' }
) {
  activeReplyId.value = commentId
  replyTarget.value = targetInfo || null
}

// 处理回复提交
function handleReplySubmitted() {
  activeReplyId.value = null // 清除活跃回复状态
  replyTarget.value = null // 清除回复目标信息
  loadComments() // 重新加载评论列表
}

const openPdf = async () => {
  if (publication.value?.pdfUrl) {
    await readPublication(publication.value.id)

    // 检查链接是否以http或https开头
    if (
      publication.value.pdfUrl.startsWith('http://') ||
      publication.value.pdfUrl.startsWith('https://')
    ) {
      // 直接跳转到外源网址
      window.open(publication.value.pdfUrl, '_blank')
    } else {
      // 跳转到本地PDF阅读器
      router.push({ path: '/pdf-reader', query: { url: publication.value.pdfUrl } })
    }
  }
}

const downloadPdf = () => {
  if (publication.value?.pdfUrl) {
    const link = document.createElement('a')
    link.href = '/api' + publication.value.pdfUrl
    link.download = ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const applyPdf = () => {
  ElMessage.info('请联系作者或管理员申请PDF全文。')
}

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    published: 'success',
    accepted: 'primary',
    'under-review': 'warning',
    draft: 'info',
  }
  return types[status] || 'default'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status] || status
}

const formatNumber = (num: number) => {
  return num.toLocaleString()
}

const formatTime = (timeStr: string) => {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getAuthorsList = (authors: string | null) => {
  if (!authors) return []
  return authors
    .split(',')
    .map(author => author.trim())
    .filter(author => author.length > 0)
}

const getKeywordsList = (keywords: string) => {
  if (!keywords) return []
  return keywords
    .split(',')
    .map(k => k.trim())
    .filter(keyword => keyword.length > 0)
}

// 处理成果数据，为null值添加默认值
const processPublicationData = (data: Publication): Publication => {
  return {
    ...data,
    title: data.title || '无标题',
    authors: data.authors || '',
    venue: data.venue || '未知机构',
    year: data.year || null,
    status: data.status || 'unknown',
    doi: data.doi || '',
    abstracts: data.abstracts || '',
    keywords: data.keywords || '',
    pdfUrl: data.pdfUrl || '',
    readerNum: data.readerNum || 0,
    likeNum: data.likeNum || 0,
    id: data.id || 0,
    createdAt: data.createdAt || new Date().toISOString(),
  }
}

const toggleAbstract = () => {
  isAbstractExpanded.value = !isAbstractExpanded.value
}

const sortedComments = computed(() => {
  if (sortType.value === 'new') {
    return [...comments.value].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  // 默认返回当前顺序，排序已在loadComments中处理
  return comments.value
})

// 计算所有评论的总数量（包括一级评论和二级评论）
const totalCommentsCount = computed(() => {
  return comments.value.reduce((total, comment) => {
    // 一级评论算1个
    let count = 1

    // 加上二级评论数量
    if (comment.replies) {
      count += comment.replies.length
    }

    return total + count
  }, 0)
})

const getReplyToUserName = () => {
  return replyTarget.value?.name || ''
}

const getrepliedUserIdString = () => {
  if (!replyTarget.value) return ''
  // 格式: "id,name"
  return `${replyTarget.value.id},${replyTarget.value.name}`
}
</script>

<style scoped>
/* 自定义样式 */
.el-loading-text {
  color: #6366f1;
}

/* 文本折叠样式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bili-comment-input .el-textarea__inner {
  border-radius: 0.75rem;
  border: 1.5px solid #e5e7eb;
  transition: border-color 0.2s;
  font-size: 1rem;
  background: #f8fafc;
  padding: 1rem 1.2rem;
  min-height: 3.5rem;
  box-shadow: 0 1px 2px 0 rgba(60, 120, 255, 0.03);
}
.bili-comment-input .el-textarea__inner:focus {
  border-color: #409eff;
  background: #fff;
}
.bili-comment-input .el-textarea__inner::placeholder {
  color: #b6c2e1;
  opacity: 1;
}
</style>
