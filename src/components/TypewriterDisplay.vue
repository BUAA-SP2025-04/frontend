<template>
  <div class="typewriter-container">
    <div class="typewriter-content" ref="contentRef">
      <div v-if="isLoading" class="loading-indicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="loading-text">正在生成摘要...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="retry" class="retry-button">重试</button>
      </div>

      <div v-else-if="displayedContent" class="markdown-content">
        <div v-html="renderedContent"></div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📄</div>
        <p>点击开始生成摘要</p>
      </div>
    </div>

    <!-- <div v-if="isTyping" class="typing-indicator">
      <span class="cursor">|</span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { marked } from 'marked'
import { runWorkflow } from '@/api/modules/abstract'
import jsPDF from 'jspdf'

interface Props {
  uploadFileId: string
  user: string
  autoStart?: boolean
  typingSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: false,
  typingSpeed: 50,
})

const emit = defineEmits<{
  complete: [content: string]
  error: [error: string]
}>()

const contentRef = ref<HTMLElement>()
const displayedContent = ref('')
const fullContent = ref('')
const isTyping = ref(false)
const isLoading = ref(false)
const error = ref('')
const currentIndex = ref(0)

const renderedContent = computed(() => {
  if (!displayedContent.value) return ''
  return marked(displayedContent.value, {
    breaks: true,
    gfm: true,
  })
})

const typeNextCharacter = () => {
  if (currentIndex.value < fullContent.value.length) {
    displayedContent.value += fullContent.value[currentIndex.value]
    currentIndex.value++

    // 滚动到底部
    nextTick(() => {
      if (contentRef.value) {
        contentRef.value.scrollTop = contentRef.value.scrollHeight
      }
    })

    setTimeout(typeNextCharacter, props.typingSpeed)
  } else {
    isTyping.value = false
    emit('complete', fullContent.value)
  }
}

const startWorkflow = async (overrideUploadFileId?: string) => {
  if (isLoading.value || isTyping.value) return

  isLoading.value = true
  error.value = ''
  displayedContent.value = ''
  fullContent.value = ''
  currentIndex.value = 0

  // 优先使用传入的参数，否则使用 props
  const fileId = overrideUploadFileId || props.uploadFileId

  if (!fileId) {
    error.value = 'uploadFileId 为空，无法开始工作流'
    emit('error', 'uploadFileId 为空，无法开始工作流')
    isLoading.value = false
    return
  }

  try {
    await runWorkflow(fileId, props.user, {
      onMessage: (message: string) => {
        console.log(message)
        fullContent.value += message
        if (!isTyping.value) {
          isTyping.value = true
          typeNextCharacter()
        }
      },
      onError: (err: Error) => {
        error.value = err.message
        emit('error', err.message)
      },
      onComplete: () => {
        isLoading.value = false
      },
    })
  } catch (err: any) {
    isLoading.value = false
    error.value = err.message
    emit('error', err.message)
  }
}

const retry = () => {
  startWorkflow()
}

const downloadPdf = async (filename = '摘要.pdf') => {
  // 1. 渲染markdown为HTML
  const html = await marked.parse(fullContent.value || displayedContent.value || '暂无摘要内容')
  // 2. 创建一个隐藏的div用于渲染
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '600px'
  document.body.appendChild(container)
  // 3. 用jsPDF的html方法导出
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  await doc.html(container, {
    x: 40,
    y: 40,
    width: 520,
    windowWidth: 600,
    callback: function (doc) {
      doc.save(filename)
      document.body.removeChild(container)
    },
    autoPaging: 'text',
  })
}

// 监听自动开始
watch(
  () => props.autoStart,
  newVal => {
    if (newVal && props.uploadFileId) {
      startWorkflow()
    }
  },
  { immediate: true }
)

// 暴露方法给父组件
defineExpose({
  startWorkflow,
  retry,
  downloadPdf,
})
</script>

<style scoped>
.typewriter-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.typewriter-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;

  min-height: 300px;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6c757d;
}

.loading-dots {
  display: flex;
  gap: 4px;
  margin-bottom: 1rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #007bff;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}
.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.loading-text {
  font-size: 1rem;
  margin: 0;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dc3545;
  text-align: center;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: #0056b3;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6c757d;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.markdown-content {
  line-height: 1.6;
  color: #333;
}

.markdown-content :deep(h1) {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem 0;
  color: #2c3e50;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.2rem 0 0.8rem 0;
  color: #34495e;
}

.markdown-content :deep(h3) {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem 0 0.6rem 0;
  color: #34495e;
}

.markdown-content :deep(p) {
  margin: 0.8rem 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.8rem 0;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin: 0.3rem 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #007bff;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6c757d;
  font-style: italic;
}

.markdown-content :deep(code) {
  background: #f1f3f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}

.typing-indicator {
  padding: 0.5rem 1rem;
  background: #e9ecef;
  border-top: 1px solid #dee2e6;
  border-radius: 0 0 8px 8px;
}

.cursor {
  color: #007bff;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style> 