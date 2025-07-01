<template>
  <div class="abstract-generator-new">
    <div class="header">
      <h1>文章摘要</h1>
    </div>
    <div class="center-content">
      <div class="action-bar">
        <button @click="goBack" :disabled="isProcessing" class="action-btn back-btn">
          返回PDF阅读器
        </button>
        <!-- <button
          @click="downloadPdf"
          :disabled="!fileUrl || isProcessing"
          class="action-btn download-btn"
        >
          下载原文PDF
        </button> -->
        <button
          @click="startGeneration"
          :disabled="!fileUrl || isProcessing"
          class="action-btn regen-btn"
        >
          <span v-if="isProcessing">生成中...</span>
          <span v-else>重新生成</span>
        </button>
      </div>
      <div class="typewriter-wrapper-large">
        <TypewriterDisplay
          ref="typewriterRef"
          :upload-file-id="uploadFileId"
          :user="String(currentUser)"
          :auto-start="false"
          :typing-speed="6"
          @complete="handleComplete"
          @error="handleError"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { uploadFile } from '@/api/modules/abstract'
import TypewriterDisplay from '@/components/TypewriterDisplay.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const typewriterRef = ref<any>()

const fileUrl = ref<string>('')
const uploadFileId = ref('')
const isProcessing = ref(false)
const hasResult = ref(false)
const errorMessage = ref('')

const currentUser = computed(() => userStore.user?.id || '1')

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

onMounted(() => {
  const urlParam = route.query.url as string
  if (urlParam) {
    fileUrl.value = urlParam
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
</style> 