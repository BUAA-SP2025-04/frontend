<template>
  <div class="abstract-generator-new">
    <div class="header">
      <h1>{{ title }}摘要</h1>
    </div>
    <div class="center-content">
      <div class="action-bar">
        <button @click="goBack" class="action-btn back-btn">返回PDF阅读器</button>
        <!-- <button
          @click="downloadPdf"
          :disabled="!fileUrl || isProcessing"
          class="action-btn download-btn"
        >
          下载原文PDF
        </button> -->
        <button
          @click="downloadMarkdown"
          :disabled="isProcessing"
          class="action-btn download-md-btn"
        >
          下载Markdown
        </button>
        <button @click="copyMarkdown" :disabled="isProcessing" class="action-btn copy-md-btn">
          复制Markdown
        </button>
        <button
          @click="downloadPdf"
          :disabled="isProcessing || downloadingPdf"
          class="action-btn download-pdf-btn"
        >
          {{ downloadingPdf ? '下载中...' : '下载PDF' }}
        </button>
        <!-- <button
          @click="startGeneration"
          :disabled="!fileUrl || isProcessing"
          class="action-btn regen-btn"
        >
          <span v-if="isProcessing">生成中...</span>
          <span v-else>重新生成</span>
        </button> -->
      </div>
      <div class="typewriter-wrapper-large">
        <TypewriterDisplay
          ref="typewriterRef"
          :upload-file-id="uploadFileId"
          :user="String(currentUser)"
          :auto-start="true"
          :typing-speed="6"
          :use-typewriter="false"
          :title="title"
          @complete="handleComplete"
          @error="handleError"
          @downloadingPdf="handleDownloadingPdf"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { uploadFile } from '@/api/modules/abstract'
import TypewriterDisplay from '@/components/TypewriterDisplay.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const typewriterRef = ref<any>()

const fileUrl = ref<string>('')
const uploadFileId = ref('')
const isProcessing = ref(false)
const hasResult = ref(false)
const errorMessage = ref('')
const title = ref('')
const currentUser = computed(() => userStore.user?.id || '1')
const downloadingPdf = ref(false)

// 新增：检查是否有可下载的内容
const hasDownloadableContent = computed(() => {
  return !isProcessing.value && hasResult.value
})

const startGeneration = async () => {
  if (!fileUrl.value) return
  try {
    isProcessing.value = true
    errorMessage.value = ''
    const uploadResult = await uploadFile(fileUrl.value)
    uploadFileId.value = uploadResult
    await nextTick()
    if (!typewriterRef.value) {
      throw new Error('TypewriterDisplay 组件引用不存在')
    }
    await (typewriterRef.value as any).startWorkflow(uploadFileId.value)
  } catch (error: any) {
    errorMessage.value = error.message
    console.error('❌ 处理失败:', error)
  } finally {
    isProcessing.value = false
  }
}

const handleComplete = (content: string) => {
  hasResult.value = true
  console.log('摘要生成完成:', content)
  console.log('hasResult设置为:', hasResult.value)
  console.log('hasDownloadableContent计算为:', hasDownloadableContent.value)
}

const handleError = (error: string) => {
  errorMessage.value = error
}

const goBack = () => {
  router.go(-1)
}

const downloadPdf = () => {
  if (!typewriterRef.value) return
  ;(typewriterRef.value as any).downloadPdf('摘要.pdf')
}

const downloadMarkdown = () => {
  if (!typewriterRef.value) {
    ElMessage.warning('组件未初始化')
    return
  }

  try {
    // 直接调用下载方法，让组件内部处理内容检查
    const success = (typewriterRef.value as any).downloadMarkdown('摘要.md')
    if (success) {
      ElMessage.success('Markdown文档下载成功')
    } else {
      ElMessage.warning('暂无内容可下载')
    }
  } catch (error) {
    ElMessage.error('下载失败')
    console.error('下载Markdown失败:', error)
  }
}

const copyMarkdown = async () => {
  if (!typewriterRef.value) {
    ElMessage.warning('组件未初始化')
    return
  }

  try {
    // 直接调用复制方法，让组件内部处理内容检查
    const success = await (typewriterRef.value as any).copyMarkdownToClipboard()
    if (success) {
      ElMessage.success('Markdown内容已复制到剪贴板')
    } else {
      ElMessage.warning('暂无内容可复制')
    }
  } catch (error) {
    ElMessage.error('复制失败')
    console.error('复制Markdown失败:', error)
  }
}

const handleDownloadingPdf = (downloading: boolean) => {
  downloadingPdf.value = downloading
}

onMounted(() => {
  const urlParam = route.query.url as string
  const titleParam = route.query.title as string
  console.log(urlParam, titleParam)
  if (urlParam) {
    fileUrl.value = urlParam
    title.value = titleParam || ''
    startGeneration()
  }
})
</script>

<style scoped>
.abstract-generator-new {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}
.header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.header h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.action-btn {
  padding: 0.7rem 1.6rem;
  border: none;
  border-radius: 6px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}
.back-btn {
  background: #6c757d;
  color: #fff;
}
.back-btn:hover:not(:disabled) {
  background: #545b62;
}
.download-btn {
  background: #17a2b8;
  color: #fff;
}
.download-btn:hover:not(:disabled) {
  background: #138496;
}
.download-md-btn {
  background: #28a745;
  color: #fff;
}
.download-md-btn:hover:not(:disabled) {
  background: #218838;
}
.copy-md-btn {
  background: #27ae60;
  color: #fff;
  transition: background 0.2s;
}
.copy-md-btn:hover {
  background: #219150;
}
.download-pdf-btn {
  background: #2980ff;
  color: #fff;
  transition: background 0.2s;
}
.download-pdf-btn:hover {
  background: #1c60c1;
}
.regen-btn {
  background: #007bff;
  color: #fff;
}
.regen-btn:hover:not(:disabled) {
  background: #0056b3;
}
.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.typewriter-wrapper-large {
  width: 100%;
  max-width: 800px;
  /* min-height: 520px; */
  background: #f8f9fa;
  border-radius: 12px;
  border: 1.5px solid #e9ecef;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  /* padding: 2.5rem 2rem; */
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
@media (max-width: 900px) {
  /* .typewriter-wrapper-large {
    padding: 1.2rem 0.5rem;
  } */
  .abstract-generator-new {
    padding: 1rem 0.2rem;
  }
  .action-bar {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: stretch;
  }
}
.markdown-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1.5rem 0;
  color: #1a202c;
  border-bottom: 3px solid #e2e8f0;
  padding-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  /* border-left: 4px solid #4299e1;  // 已去除竖线 */
}

.markdown-content :deep(h2) {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1.8rem 0 1rem 0;
  color: #2d3748;
  /* border-left: 4px solid #4299e1;  // 已去除竖线 */
  /* padding-left: 1rem;  // 已去除缩进 */
}

.markdown-content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 0.8rem 0;
  color: #4a5568;
  position: relative;
  /* border-left: 4px solid #4299e1;  // 已去除竖线 */
}

.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  /* border-left: 4px solid #4299e1;  // 已去除竖线 */
}

/* 去除h3标题前蓝色竖线 */
/*
.markdown-content :deep(h3)::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  width: 0.25rem;
  height: 1rem;
  background: linear-gradient(135deg, #4299e1, #3182ce);
  border-radius: 2px;
}
*/
</style>