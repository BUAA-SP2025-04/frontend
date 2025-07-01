<template>
  <div class="typewriter-container">
    <div class="typewriter-content" ref="contentRef">
      <div v-if="isLoading && !isStreaming" class="loading-indicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="loading-text">正在上传文档...</p>
      </div>

      <div v-else-if="isStreaming && !displayedContent" class="streaming-indicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="loading-text">正在分析文档，请稍候...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="retry" class="retry-button">重试</button>
      </div>

      <div v-else-if="displayedContent" class="markdown-content">
        <div v-html="renderedContent"></div>
        <span v-if="isTyping" class="typing-cursor">|</span>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📄</div>
        <p>等待摘要生成</p>
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
import { md2pdfstream, md2pdf, runWorkflow } from '@/api/modules/abstract'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

interface Props {
  uploadFileId: string
  user: string
  autoStart?: boolean
  typingSpeed?: number
  useTypewriter?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: true,
  typingSpeed: 100,
  useTypewriter: false,
  title: '',
})

const emit = defineEmits<{
  complete: [content: string]
  error: [error: string]
  downloadingPdf: [downloading: boolean]
}>()

const contentRef = ref<HTMLElement>()
const displayedContent = ref('')
const fullContent = ref('')
const isTyping = ref(false)
const isLoading = ref(false)
const error = ref('')
const currentIndex = ref(0)
const isStreaming = ref(false)
const streamStartTime = ref(0)
const downloadingPdf = ref(false)

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

    // 动态调整打字速度：开始时快一些，内容多时慢一些
    const speed = Math.max(10, Math.min(props.typingSpeed, 50))
    setTimeout(typeNextCharacter, speed)
  } else {
    isTyping.value = false
    emit('complete', fullContent.value)
  }
}

const updateDisplayedContent = () => {
  if (fullContent.value.length > displayedContent.value.length) {
    // 如果新内容比显示内容多，直接显示新内容
    displayedContent.value = fullContent.value
    currentIndex.value = fullContent.value.length

    // 滚动到底部
    nextTick(() => {
      if (contentRef.value) {
        contentRef.value.scrollTop = contentRef.value.scrollHeight
      }
    })
  }
}

const startStreamingIndicator = () => {
  if (!isStreaming.value) {
    isStreaming.value = true
    streamStartTime.value = Date.now()
    // 显示流式传输开始提示
    displayedContent.value = '正在分析文档，请稍候...\n\n'
  }
}

const handleStreamMessage = (message: string) => {
  console.log('收到流式消息:', message)

  // 如果是第一个消息，清除开始提示
  if (fullContent.value === '' && displayedContent.value.includes('正在分析文档')) {
    displayedContent.value = ''
  }

  fullContent.value += message

  if (props.useTypewriter) {
    // 使用打字机效果
    if (!isTyping.value && fullContent.value.length > 0) {
      isTyping.value = true
      // 使用较快的打字速度开始
      setTimeout(typeNextCharacter, 20)
    }
  } else {
    // 实时显示，不使用打字机效果
    displayedContent.value = fullContent.value
    currentIndex.value = fullContent.value.length

    // 滚动到底部
    nextTick(() => {
      if (contentRef.value) {
        contentRef.value.scrollTop = contentRef.value.scrollHeight
      }
    })

    // 标记为正在打字（用于显示光标）
    if (!isTyping.value && fullContent.value.length > 0) {
      isTyping.value = true
    }
  }
}

const startWorkflow = async (overrideUploadFileId?: string) => {
  if (isLoading.value || isTyping.value) return

  isLoading.value = true
  error.value = ''
  displayedContent.value = ''
  fullContent.value = ''
  currentIndex.value = 0
  isStreaming.value = false
  streamStartTime.value = 0

  // 优先使用传入的参数，否则使用 props
  const fileId = overrideUploadFileId || props.uploadFileId

  if (!fileId) {
    error.value = 'uploadFileId 为空，无法开始工作流'
    emit('error', 'uploadFileId 为空，无法开始工作流')
    isLoading.value = false
    return
  }

  try {
    // 立即显示开始提示
    startStreamingIndicator()

    await runWorkflow(fileId, props.user, {
      onMessage: handleStreamMessage,
      onError: (err: Error) => {
        error.value = err.message
        emit('error', err.message)
        isStreaming.value = false
      },
      onComplete: () => {
        isLoading.value = false
        isStreaming.value = false

        // 确保所有内容都显示出来
        if (fullContent.value.length > displayedContent.value.length) {
          displayedContent.value = fullContent.value
        }

        // 触发完成事件，传递完整内容
        emit('complete', fullContent.value)
      },
    })
  } catch (err: any) {
    isLoading.value = false
    isStreaming.value = false
    error.value = err.message
    emit('error', err.message)
  }
}

const retry = () => {
  startWorkflow()
}

// 新增：PDF导出配置
const pdfOptions = {
  filename: '文档摘要.pdf',
  margin: 15,
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
}

// 优化现有下载方法
const downloadPdf = async (filename = '摘要.pdf') => {
  if (downloadingPdf.value) return
  emit('downloadingPdf', true)
  downloadingPdf.value = true
  const content = fullContent.value || displayedContent.value || '暂无摘要内容'

  // 检查是否有有效内容
  if (!content || content === '暂无摘要内容' || content.length === 0) {
    console.warn('没有内容可下载')
    return false
  }

  try {
    const markdownContent = getMarkdownContent()
    console.log('开始生成PDF，内容长度:', markdownContent.length)

    // 创建markdown文件
    const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' })
    const markdownFile = new File([markdownBlob], 'abstract.md', { type: 'text/markdown' })

    // 创建FormData对象
    const formData = new FormData()
    formData.append('file', markdownFile)

    // 调用后端API获取PDF字节流
    const response = await md2pdf(formData)
    // 检查响应数据
    if (!response || !response.data) {
      ElMessage.error('PDF生成失败，请重试')
      return false
    }

    let fileUrl = response.data

    const pdfBlob = await request.get(fileUrl, { responseType: 'blob' }) as Blob
    // 3. 创建下载链接
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    ElMessage.success('PDF下载成功')
    return true
  } catch (error) {
    console.error('PDF下载失败:', error)
    ElMessage.error('PDF下载失败，请重试')
    return false
  } finally {
    downloadingPdf.value = false
    emit('downloadingPdf', false)
  }
}

// 新增：下载Markdown文档
const downloadMarkdown = (filename = '摘要.md') => {
  const content = fullContent.value || displayedContent.value || '暂无摘要内容'

  // 检查是否有有效内容
  if (!content || content === '暂无摘要内容' || content.length === 0) {
    console.warn('没有内容可下载')
    return false
  }

  // 生成完整的Markdown文档
  const markdownContent = generateMarkdownDocument(content)

  // 创建Blob对象
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' })

  // 创建下载链接
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename

  // 触发下载
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return true
}

// 新增：生成完整的Markdown文档
const generateMarkdownDocument = (content: string) => {
  const now = new Date()
  const dateStr = now.toLocaleDateString('zh-CN')
  const timeStr = now.toLocaleTimeString('zh-CN')

  // 计算文档统计信息
  const wordCount = content.replace(/\s+/g, '').length
  const lineCount = content.split('\n').length
  const charCount = content.length

  // 生成文档头部信息
  const header = `
# ${props.title}摘要
## KnoWeb服务:基于AI的文档摘要

## 文档信息

| 项目 | 内容 |
|------|------|
| **生成时间** | ${dateStr} ${timeStr} |
| **文档类型** | PDF |
| **生成工具** | KnoWeb摘要生成智能体 |
| **字符数** | ${charCount.toLocaleString()} |
| **字数** | ${wordCount.toLocaleString()} |
| **行数** | ${lineCount.toLocaleString()} |


## 摘要内容

`

  // 生成文档尾部信息
  const footer = `


### 文档说明

- 本文档由智能摘要生成器自动生成
- 基于上传的原始文档内容进行分析和总结
- 仅供参考，请结合原文进行理解和使用

### 生成统计

- **生成时间**: ${dateStr} ${timeStr}
- **文档大小**: ${(content.length / 1024).toFixed(2)} KB
- **内容类型**: Markdown格式


*© 智能摘要生成器 | 生成时间: ${dateStr} ${timeStr}*
`

  return header + content + footer
}

// 新增：获取完整的Markdown内容（供外部调用）
const getMarkdownContent = () => {
  const content = fullContent.value || displayedContent.value || '暂无摘要内容'
  console.log('TypewriterDisplay - fullContent:', fullContent.value)
  console.log('TypewriterDisplay - displayedContent:', displayedContent.value)
  console.log('TypewriterDisplay - 最终内容:', content)
  return generateMarkdownDocument(content)
}

// 新增：复制Markdown内容到剪贴板
const copyMarkdownToClipboard = async () => {
  const content = fullContent.value || displayedContent.value || '暂无摘要内容'

  // 检查是否有有效内容
  if (!content || content === '暂无摘要内容' || content.length === 0) {
    console.warn('没有内容可复制')
    return false
  }

  try {
    const markdownContent = getMarkdownContent()
    await navigator.clipboard.writeText(markdownContent)
    return true
  } catch (error) {
    console.error('复制到剪贴板失败:', error)
    // 降级方案：使用传统方法
    try {
      const textArea = document.createElement('textarea')
      textArea.value = getMarkdownContent()
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (fallbackError) {
      console.error('降级复制方案也失败:', fallbackError)
      return false
    }
  }
}

// 新增：获取原始内容（用于调试）
const getRawContent = () => {
  return {
    fullContent: fullContent.value,
    displayedContent: displayedContent.value,
    hasContent: fullContent.value.length > 0 || displayedContent.value.length > 0,
  }
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
  downloadMarkdown,
  getMarkdownContent,
  copyMarkdownToClipboard,
  getRawContent,
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
  padding: 2.5rem;
  background: #fefefe;
  border-radius: 8px;
  min-height: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  position: relative;

  /* 论文纸纹理背景 */
  background-image: 
    /* 纸张纤维纹理 */ repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.02) 1px,
      rgba(0, 0, 0, 0.02) 2px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.01) 1px,
      rgba(0, 0, 0, 0.01) 2px
    ),
    /* 纸张底色 */ linear-gradient(135deg, #fefefe 0%, #fafafa 50%, #f5f5f5 100%);

  /* 添加纸张质感 */
  background-size: 20px 20px, 20px 20px, 100% 100%;
  background-position: 0 0, 0 0, 0 0;
}

.typewriter-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    /* 纸张边缘阴影 */ linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.02) 2%,
      transparent 4%
    ),
    linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 2%, transparent 4%);
  border-radius: 8px;
  pointer-events: none;
  z-index: 1;
}

.typewriter-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    /* 纸张高光效果 */ linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 30%
  );
  border-radius: 8px;
  pointer-events: none;
  z-index: 1;
}

.typewriter-content > * {
  position: relative;
  z-index: 2;
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
  line-height: 1.8;
  color: #2c3e50;
  font-size: 1rem;
  letter-spacing: 0.3px;
  font-family: 'Microsoft YaHei', '微软雅黑', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1.5rem 0;
  color: #1a202c;
  border-bottom: 3px solid #e2e8f0;
  padding-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(h2) {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1.8rem 0 1rem 0;
  color: #2d3748;
  border-left: 4px solid #4299e1;
  padding-left: 1rem;
}

.markdown-content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 0.8rem 0;
  color: #4a5568;
  position: relative;
}

.markdown-content :deep(p) {
  margin: 1rem 0;
  text-align: justify;
  hyphens: auto;
  text-indent: 2em;
}

.markdown-content :deep(strong) {
  font-weight: 700;
  color: #1a202c;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #2d3748;
  font-weight: 500;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  border-left: 2px solid #4299e1;
}

.markdown-content :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.8rem;
  list-style: none;
}

.markdown-content :deep(ul li) {
  margin: 0.6rem 0;
  position: relative;
  padding-left: 0.5rem;
}

.markdown-content :deep(ul li)::before {
  content: '•';
  position: absolute;
  left: -1.2rem;
  top: 0;
  color: #4299e1;
  font-weight: bold;
  font-size: 1.2em;
  text-shadow: 0 1px 2px rgba(66, 153, 225, 0.3);
}

/* 嵌套列表样式 */
.markdown-content :deep(ul ul) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.markdown-content :deep(ul ul li)::before {
  content: '◦';
  color: #63b3ed;
  font-size: 1em;
}

.markdown-content :deep(ul ul ul) {
  padding-left: 1.2rem;
}

.markdown-content :deep(ul ul ul li)::before {
  content: '▪';
  color: #90cdf4;
  font-size: 0.9em;
}

.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.8rem;
  counter-reset: list-counter;
}

.markdown-content :deep(ol li) {
  margin: 0.6rem 0;
  position: relative;
  padding-left: 0.5rem;
  counter-increment: list-counter;
}

.markdown-content :deep(ol li)::before {
  content: counter(list-counter) '.';
  position: absolute;
  left: -1.5rem;
  top: 0;
  color: #2c3e50 !important;
  font-weight: 600;
  font-size: 0.9em;
  min-width: 1.2rem;
  text-align: right;
}

/* 嵌套有序列表样式 */
.markdown-content :deep(ol ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  counter-reset: sub-counter;
}

.markdown-content :deep(ol ol li) {
  counter-increment: sub-counter;
}

.markdown-content :deep(ol ol li)::before {
  content: counter(list-counter) '.' counter(sub-counter) '.';
  color: #2c3e50 !important;
}

.markdown-content :deep(ol ol ol) {
  padding-left: 1.2rem;
  counter-reset: sub-sub-counter;
}

.markdown-content :deep(ol ol ol li) {
  counter-increment: sub-sub-counter;
}

.markdown-content :deep(ol ol ol li)::before {
  content: counter(list-counter) '.' counter(sub-counter) '.' counter(sub-sub-counter) '.';
  color: #2c3e50 !important;
  font-size: 0.85em;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #4299e1;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 0 8px 8px 0;
  color: #4a5568;
  font-style: italic;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.markdown-content :deep(blockquote)::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-size: 3rem;
  color: #4299e1;
  opacity: 0.3;
  font-family: Georgia, serif;
}

.markdown-content :deep(code) {
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: #2d3748;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.markdown-content :deep(pre) {
  background: linear-gradient(135deg, #1a202c, #2d3748);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #4a5568;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: #e2e8f0;
  border: none;
  box-shadow: none;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(th) {
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.markdown-content :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.markdown-content :deep(tr:nth-child(even)) {
  background: #f7fafc;
}

.markdown-content :deep(tr:hover) {
  background: #ebf8ff;
}

.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4299e1, transparent);
  margin: 2rem 0;
}

.markdown-content :deep(a) {
  color: #3182ce;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.markdown-content :deep(a:hover) {
  color: #2c5282;
  border-bottom-color: #2c5282;
}

/* 额外的样式优化 */
.markdown-content :deep(li > p) {
  margin: 0.3rem 0;
  text-indent: 0;
}

.markdown-content :deep(li > ul),
.markdown-content :deep(li > ol) {
  margin: 0.3rem 0;
}

.markdown-content :deep(del) {
  text-decoration: line-through;
  color: #a0aec0;
  background: #fed7d7;
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
}

.markdown-content :deep(mark) {
  background: linear-gradient(120deg, #fefcbf 0%, #faf089 100%);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  color: #744210;
}

.markdown-content :deep(sup) {
  font-size: 0.75em;
  vertical-align: super;
  color: #4299e1;
  font-weight: 600;
}

.markdown-content :deep(sub) {
  font-size: 0.75em;
  vertical-align: sub;
  color: #e53e3e;
  font-weight: 600;
}

/* 改善段落间距 */
.markdown-content :deep(p + p) {
  margin-top: 1.2rem;
}

/* 改善列表项间距 */
.markdown-content :deep(li + li) {
  margin-top: 0.4rem;
}

.streaming-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6c757d;
}

.typing-cursor {
  color: #007bff;
  font-weight: bold;
  animation: blink 1s infinite;
  margin-left: 2px;
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