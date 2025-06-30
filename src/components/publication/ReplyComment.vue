<template>
  <div class="flex items-start gap-4">
    <div
      class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      @click="handleUserClick"
    >
      <img
        v-if="userInfo?.imgUrl"
        :src="'/api' + userInfo.imgUrl"
        class="w-full h-full object-cover"
      />
      <svg
        v-else
        class="w-4 h-4 text-gray-400"
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
    <div class="flex-1 pb-2">
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
          reply.content === '该评论已删除'
            ? 'text-gray-600 italic text-base bg-gray-50 px-3 py-2 rounded-lg border-l-4 border-gray-300 opacity-75'
            : 'text-gray-800',
        ]"
      >
        <!-- 如果有repliedUserId字段，在内容前面显示回复链接 -->
        <span
          v-if="reply.repliedUserId && reply.content !== '该评论已删除'"
          class="text-gray-500 text-base font-medium"
        >
          回复
          <span
            class="text-blue-400 hover:text-blue-600 cursor-pointer font-medium"
            @click="handleReplyToUserClick"
          >
            @{{ getrepliedUserIdName() }}
          </span>
          ：
        </span>
        <span v-if="reply.content === '该评论已删除'" class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          {{ reply.content }}
        </span>
        <span v-else>{{ reply.content }}</span>
      </div>
      <div class="flex items-center gap-4 text-gray-400 text-sm">
        <span>{{ formatTime(reply.createdAt) }}</span>
        <button
          v-if="reply.content !== '该评论已删除'"
          @click="handleLike"
          :class="reply.isLiked ? 'text-red-500' : 'hover:text-red-500'"
          class="flex items-center gap-1 transition-colors"
          :disabled="likeLoading"
        >
          <svg
            :class="['w-4 h-4', reply.isLiked ? 'text-red-500' : 'text-gray-400']"
            :fill="reply.isLiked ? 'currentColor' : 'none'"
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
          <span>{{ reply.likes }}</span>
        </button>
        <button
          v-if="reply.content !== '该评论已删除'"
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
          v-if="canDelete && reply.content !== '该评论已删除'"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { Comment } from '@/api/types/comment'
import type { UserDetail } from '@/api/types/user'
import { deleteComment, disLikeComment, likeComment } from '@/api/modules/comment'
import { useUserStore } from '@/stores/user'
import { useUserCacheStore } from '@/stores/userCache'
import { useRouter } from 'vue-router'

// 扩展的Comment类型，包含子评论
interface ExtendedComment extends Comment {
  children?: Comment[]
  replyToUserName?: string
  replyToUserId?: number
  isParent?: boolean
  repliedUserIdId?: string // 格式: "id,name"
}

const props = defineProps<{
  reply: ExtendedComment
}>()

const emit = defineEmits(['reply', 'delete', 'set-active-reply', 'like'])

const userStore = useUserStore()
const userCacheStore = useUserCacheStore()
const router = useRouter()

// 用户信息
const userInfo = ref<UserDetail | null>(null)

// 加载状态
const likeLoading = ref(false)
const deleteLoading = ref(false)

// 计算属性：是否可以删除回复
const canDelete = computed(() => {
  return userStore.user?.id === props.reply.userId
})

// 获取用户信息
async function fetchUserInfo(userId: number) {
  return await userCacheStore.getCachedUserInfo(userId)
}

// 处理点赞
async function handleLike() {
  if (likeLoading.value) return

  likeLoading.value = true
  try {
    if (props.reply.isLiked) {
      // 已点赞，发送取消点赞请求
      await disLikeComment(props.reply.id)
      // 通过emit通知父组件更新状态
      emit('like', { id: props.reply.id, isLiked: false, likes: props.reply.likes - 1 })
    } else {
      // 未点赞，发送点赞请求
      await likeComment(props.reply.id)
      // 通过emit通知父组件更新状态
      emit('like', { id: props.reply.id, isLiked: true, likes: props.reply.likes + 1 })
    }
  } catch (error) {
    console.error('回复点赞操作失败:', error)
  } finally {
    likeLoading.value = false
  }
}

// 处理回复按钮点击
function handleReplyClick() {
  emit('set-active-reply', props.reply.id)
}

// 处理点击回复@用户链接
function handleReplyToUserClick() {
  // 从repliedUserId字段解析用户ID并跳转
  const repliedUserIdId = getrepliedUserIdId()
  if (repliedUserIdId) {
    router.push(`/user/${repliedUserIdId}`)
  }
}

// 从repliedUserId字段解析用户名
function getrepliedUserIdName() {
  if (!props.reply.repliedUserId) return '未知用户'
  const parts = props.reply.repliedUserId.split(',')
  return parts.length > 1 ? parts[1] : '未知用户'
}

// 从repliedUserId字段解析用户ID
function getrepliedUserIdId() {
  if (!props.reply.repliedUserId) return null
  const parts = props.reply.repliedUserId.split(',')
  return parts.length > 0 ? parseInt(parts[0]) : null
}

// 处理删除回复
async function handleDelete() {
  if (deleteLoading.value) return

  try {
    await ElMessageBox.confirm('确定要删除这条回复吗？', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    deleteLoading.value = true
    await deleteComment(props.reply.id)
    // 删除成功后，直接移除回复
    emit('delete', props.reply)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除回复失败:', error)
    }
  } finally {
    deleteLoading.value = false
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

// 组件挂载时获取数据
onMounted(async () => {
  // 获取回复作者信息
  userInfo.value = await fetchUserInfo(props.reply.userId)
})

function handleUserClick() {
  router.push(`/user/${props.reply.userId}`)
}
</script>

<script lang="ts">
export default {
  name: 'ReplyCommentComp',
}
</script>