<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-bold mb-4">邀请链接</h3>
      <div class="flex items-center space-x-2 mb-4">
        <input
          ref="inputRef"
          v-model="link"
          readonly
          class="flex-1 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="copyLink"
        >
          复制
        </button>
      </div>
      <div class="text-xs text-gray-500 mb-2">请将此链接发送给你想邀请的人</div>
      <div class="flex justify-end">
        <button class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200" @click="emit('close')">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{ link: string }>()
const emit = defineEmits(['close'])
const inputRef = ref<HTMLInputElement | null>(null)
const link = ref(props.link)

// 保证父组件link变化时弹窗内容也更新
watch(
  () => props.link,
  val => {
    link.value = val
  }
)

const copyLink = () => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(link.value)
      .then(() => ElMessage.success('已复制到剪贴板'))
      .catch(() => fallbackCopy())
  } else {
    fallbackCopy()
  }
}

function fallbackCopy() {
  if (inputRef.value) {
    inputRef.value.select()
    document.execCommand('copy')
    ElMessage.success('已复制到剪贴板')
  } else {
    window.prompt('请手动复制邀请链接', link.value)
  }
}
</script>

<style scoped>
.bg-black\/40 {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
