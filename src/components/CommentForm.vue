<template>
  <div class="flex items-start gap-4">
    <div
      class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
    >
      <img
        v-if="userStore.user?.imgUrl"
        :src="userStore.user.imgUrl"
        :alt="userStore.user.name"
        class="w-full h-full object-cover"
      />
      <svg
        v-else
        class="w-6 h-6 text-gray-400"
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
    <div class="flex-1">
      <el-input
        v-model="commentContent"
        type="textarea"
        :rows="2"
        :autosize="{ minRows: 2, maxRows: 6 }"
        :placeholder="placeholder"
        maxlength="500"
        show-word-limit
        resize="none"
        @keydown.ctrl.enter="submitComment"
        class="comment-input"
      />
      <div class="flex justify-end mt-2">
        <el-button
          v-show="commentContent.trim()"
          type="primary"
          :loading="submitting"
          @click="submitComment"
          class="px-6 py-1.5 rounded font-semibold"
        >
          发表评论
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { createComment } from '@/api/modules/comment'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  publicationId: number
  parentId?: number
  replyToUserName?: string
  repliedUserId?: string
}>()

const emit = defineEmits<{
  submitted: []
}>()

const userStore = useUserStore()
const commentContent = ref('')
const submitting = ref(false)

const placeholder = computed(() => {
  if (props.parentId && props.replyToUserName) {
    return `回复@${props.replyToUserName}`
  }
  return props.parentId ? '写下你的回复...' : '进来来和UP唠会嗑~'
})

const submitComment = async () => {
  if (!commentContent.value.trim()) return

  try {
    submitting.value = true
    await createComment({
      publicationId: props.publicationId,
      content: commentContent.value.trim(),
      parentId: props.parentId || -1,
      repliedUser: props.repliedUserId || '',
    })

    commentContent.value = ''
    emit('submitted')
    ElMessage.success('评论发表成功')
  } catch (error) {
    console.error('发表评论失败:', error)
    ElMessage.error('发表评论失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.comment-input .el-textarea__inner {
  border-radius: 0.75rem;
  border: 1.5px solid #e5e7eb;
  transition: border-color 0.2s;
  font-size: 1rem;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  min-height: 3rem;
  line-height: 1.5;
  box-shadow: 0 1px 2px 0 rgba(60, 120, 255, 0.03);
  resize: none;
}
.comment-input .el-textarea__inner:focus {
  border-color: #409eff;
  background: #fff;
}
.comment-input .el-textarea__inner::placeholder {
  color: #b6c2e1;
  opacity: 1;
}
</style>

<script lang="ts">
export default {
  name: 'CommentForm',
}
</script>
