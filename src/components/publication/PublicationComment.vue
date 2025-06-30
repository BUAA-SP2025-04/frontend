<template>
  <div class="flex items-start gap-4">
    <div
      class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      @click="handleUserClick"
    >
      <img
        v-if="userInfo?.imgUrl"
        :src="'/api' + userInfo.imgUrl"
        class="w-full h-full object-cover"
      />
      <svg
        v-else
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
    </div>
    <div class="flex-1 border-b border-gray-100 pb-4">
      <div class="flex items-center gap-2 mb-1">
        <span
          class="font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
          @click="handleUserClick"
        >
          {{ userInfo?.name || '未知用户' }}
        </span>
        <span
          v-if="userInfo?.title"
          class="bg-blue-100 text-blue-600 text-xs rounded px-1.5 py-0.5 font-bold"
          >{{ userInfo.title }}</span
        >
      </div>
      <div
        :class="[
          'mb-2 leading-relaxed',
          comment.content === '该评论已删除'
            ? 'text-gray-600 italic text-base bg-gray-50 px-3 py-2 rounded-lg border-l-4 border-gray-300 opacity-75'
            : 'text-gray-800',
        ]"
      >
        <span v-if="comment.content === '该评论已删除'" class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          {{ comment.content }}
        </span>
        <span v-else>{{ comment.content }}</span>
      </div>
      <div class="flex items-center gap-4 text-gray-400 text-sm">
        <span>{{ formatTime(comment.createdAt) }}</span>
        <button
          v-if="comment.content !== '该评论已删除'"
          @click="handleLike" 
          :class="comment.isLiked ? 'text-red-500' : 'hover:text-red-500'"
          class="flex items-center gap-1 transition-colors"
          :disabled="likeLoading"
        >
          <svg
            :class="['w-4 h-4', comment.isLiked ? 'text-red-500' : 'text-gray-400']"
            :fill="comment.isLiked ? 'currentColor' : 'none'"
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
          <span>{{ comment.likes }}</span>
        </button>
        <button
          v-if="comment.content !== '该评论已删除'"
          @click="handleReplyClick"
          class="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          回复
        </button>
        <button
          v-if="canDelete && comment.content !== '该评论已删除'"
          @click="handleDelete"
          class="flex items-center gap-1 hover:text-red-500 transition-colors"
          :disabled="deleteLoading"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          删除
        </button>
      </div>
      <!-- 子评论渲染，非递归 -->
      <div v-if="props.replies && props.replies.length" class="mt-6 space-y-6">
        <div v-for="reply in displayedReplies" :key="reply.id">
          <ReplyComment
            :reply="reply"
            @reply="$emit('reply', $event)"
            @delete="handleReplyDelete"
            @set-active-reply="handleSetActiveReply"
            @like="handleReplyLike"
          />
        </div>
      </div>

      <!-- 展开按钮 -->
      <div v-if="totalRepliesCount > 2 && !isExpanded" class="mt-1 ml-12">
        <span class="text-gray-500 text-sm">
          共{{ totalRepliesCount }}条回复，
          <button @click="handleExpand" class="text-gray-500 hover:text-blue-500 text-sm">
            点击查看
          </button>
        </span>
      </div>

      <!-- 分页器 -->
      <div v-if="isExpanded && totalRepliesCount > pageSize" class="mt-4 ml-12">
        <div class="flex items-center gap-2 text-sm">
          <span class="text-black">共{{ totalPages }}页</span>
          <button
            v-if="currentPage > 1"
            @click="prevPage"
            class="px-2 py-1 text-black hover:text-blue-500 transition-colors"
          >
            上一页
          </button>

          <template v-for="page in totalPages" :key="page">
            <button
              v-if="
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              "
              @click="goToPage(page)"
              :class="[
                'px-2 py-1 transition-colors',
                page === currentPage
                  ? 'text-blue-500 font-medium'
                  : 'text-black hover:text-blue-500',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === currentPage - 2 || page === currentPage + 2"
              class="px-1 text-gray-400"
            >
              ...
            </span>
          </template>

          <button
            v-if="currentPage < totalPages"
            @click="nextPage"
            class="px-2 py-1 text-black hover:text-blue-500 transition-colors"
          >
            下一页
          </button>

          <button
            @click="isExpanded = false"
            class="px-2 py-1 text-black hover:text-blue-500 transition-colors"
          >
            收起
          </button>
        </div>
      </div>

      <!-- 回复表单 -->
      <div v-if="showReplyForm" ref="replyFormRef" class="mt-8">
        <CommentForm
          :publication-id="comment.publicationId"
          :parent-id="replyTarget?.id || comment.id"
          :reply-to-user-name="replyTarget?.name || userInfo?.name"
          :replied-user-id="repliedUserIdString"
          @submitted="handleReplySubmitted"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import type { Comment } from '@/api/types/comment'
import type { UserDetail } from '@/api/types/user'
import { deleteComment, disLikeComment, likeComment } from '@/api/modules/comment'
import { useUserStore } from '@/stores/user'
import { useUserCacheStore } from '@/stores/userCache'
import ReplyComment from './ReplyComment.vue'
import CommentForm from './CommentForm.vue'

// 扩展的Comment类型，包含子评论
interface ExtendedComment extends Comment {
  children?: Comment[]
  replyToUserName?: string
  replyToUserId?: number
  isParent?: boolean
  repliedUserId?: string // 格式: "id,name"
}

const props = defineProps<{
  comment: Comment
  activeReplyId?: number | null
  replies?: Comment[]
}>()

const emit = defineEmits(['reply', 'delete', 'reply-submitted', 'set-active-reply'])

const userStore = useUserStore()
const userCacheStore = useUserCacheStore()
const router = useRouter()

// 懒加载和分页相关
const isExpanded = ref(false)
const currentPage = ref(1)
const pageSize = ref(6)

// 用户信息
const userInfo = ref<UserDetail | null>(null)

// 加载状态
const likeLoading = ref(false)
const deleteLoading = ref(false)

// 回复目标信息
const replyTarget = ref<{
  id: number
  name: string
  type: 'comment' | 'reply'
} | null>(null)

// 被回复用户字符串
const repliedUserIdString = ref('')

// 回复表单的ref
const replyFormRef = ref<HTMLElement | null>(null)

// 计算属性：是否可以删除评论
const canDelete = computed(() => {
  return userStore.user?.id === props.comment.userId
})

// 计算属性：是否显示回复表单
const showReplyForm = computed(() => {
  return props.activeReplyId === props.comment.id
})

// 计算属性：总的回复数量（包括二级评论）
const totalRepliesCount = computed(() => {
  return (props.replies || []).length
})

// 分页计算属性
const totalPages = computed(() => {
  return Math.ceil(totalRepliesCount.value / pageSize.value)
})

// 显示的回复列表
const displayedReplies = computed(() => {
  // 将所有二级评论放在同一层级，保持原有顺序
  const allReplies: ExtendedComment[] = []

  // 收集所有评论 - 直接使用原始引用，不创建新对象
  ;(props.replies || []).forEach(reply => {
    // 直接使用原始回复对象，保持引用关系
    allReplies.push(reply as ExtendedComment)
  })

  // 保持原有顺序，不进行排序
  const replies = allReplies

  if (!isExpanded.value) {
    // 未展开时只显示前2条
    return replies.slice(0, 2)
  } else {
    // 展开后使用分页逻辑
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return replies.slice(start, end)
  }
})

// 分页方法
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 处理展开
function handleExpand() {
  isExpanded.value = true
  currentPage.value = 1 // 重置到第一页
}

// 获取用户信息
async function fetchUserInfo(userId: number) {
  return await userCacheStore.getCachedUserInfo(userId)
}

async function handleLike() {
  if (likeLoading.value) return

  likeLoading.value = true
  try {
    if (props.comment.isLiked) {
      // 已点赞，发送取消点赞请求
      await disLikeComment(props.comment.id)
      props.comment.isLiked = false
      props.comment.likes--
    } else {
      // 未点赞，发送点赞请求
      await likeComment(props.comment.id)
      props.comment.isLiked = true
      props.comment.likes++
    }
    // 将事件传递给父组件
    // emit('like', props.comment)
  } catch (error) {
    console.error('点赞操作失败:', error)
  } finally {
    likeLoading.value = false
  }
}

// 处理删除评论
async function handleDelete() {
  if (deleteLoading.value) return

  try {
    await ElMessageBox.confirm('确定要删除这条评论吗？', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    deleteLoading.value = true
    await deleteComment(props.comment.id)
    // 删除成功后，将评论内容修改为"该评论已删除"
    props.comment.content = '该评论已删除'
    emit('delete', props.comment)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除评论失败:', error)
    }
  } finally {
    deleteLoading.value = false
  }
}

// 处理删除回复
async function handleReplyDelete(reply: Comment) {
  // 从回复列表中移除被删除的回复
  if (props.replies) {
    const index = props.replies.findIndex(r => r.id === reply.id)
    if (index !== -1) {
      props.replies.splice(index, 1)
    }
  }
}

function formatTime(date: string) {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

// 滚动到回复框
function scrollToReplyForm() {
  nextTick(() => {
    if (replyFormRef.value) {
      replyFormRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  })
}

// 处理回复按钮点击
async function handleReplyClick() {
  const targetInfo = {
    id: props.comment.id,
    name: userInfo.value?.name || '未知用户',
    type: 'comment' as const,
  }
  // 回复一级评论时设置 repliedUserIdString 为空字符串
  repliedUserIdString.value = ''
  emit('set-active-reply', props.comment.id, targetInfo)
  // 滚动到回复框
  scrollToReplyForm()
}

// 处理设置活跃回复（用于二级评论）
async function handleSetActiveReply(replyId: number | null) {
  if (replyId) {
    // 找到对应的回复信息
    const reply = (props.replies || []).find(r => r.id === replyId)
    if (reply) {
      // 获取回复用户的详细信息
      const replyUserInfo = await userCacheStore.getCachedUserInfo(reply.userId)
      const targetInfo = {
        id: props.comment.id, // 这里应该是一级评论的ID，作为parentId
        name: replyUserInfo?.name || '未知用户',
        type: 'reply' as const,
      }
      // 设置被回复用户字符串 - 修复：确保用户名不为空
      repliedUserIdString.value = `${reply.userId},${replyUserInfo?.name || '未知用户'}`
      // 传递目标信息给父组件
      emit('set-active-reply', props.comment.id, targetInfo)
    }
  } else {
    replyTarget.value = null
    repliedUserIdString.value = ''
    emit('set-active-reply', null)
  }
  // 滚动到回复框
  scrollToReplyForm()
}

// 处理回复提交
function handleReplySubmitted() {
  // 通知父组件重新加载评论数据
  emit('reply-submitted')
}

// 组件挂载时获取数据
onMounted(async () => {
  // 获取评论作者信息
  userInfo.value = await fetchUserInfo(props.comment.userId)
})

// 处理用户点击
function handleUserClick() {
  router.push(`/user/${props.comment.userId}`)
}

// 处理二级评论点赞
function handleReplyLike(likeData: { id: number; isLiked: boolean; likes: number }) {
  // 找到对应的回复并更新状态
  if (props.replies) {
    const reply = props.replies.find(r => r.id === likeData.id)
    if (reply) {
      reply.isLiked = likeData.isLiked
      reply.likes = likeData.likes
    }
  }
  // 将事件传递给父组件
  emit('like', likeData)
}
</script>

<script lang="ts">
export default {
  name: 'PublicationCommentComp',
}
</script>