<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">PDF阅读器</h1>
        <p class="text-gray-600">支持PDF文档阅读和文本层坐标提取</p>
      </div>

      <div class="card mb-6">
        <div class="flex items-center space-x-4 mb-4">
          <el-button type="success" :disabled="!pdfUrl" @click="downloadPdf"
            >下载当前PDF
          </el-button>
        </div>
      </div>

      <div v-if="pdfUrl" class="card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">PDF预览</h3>
          <!--          <div class="flex space-x-2">-->
          <!--            <el-button size="small" @click="zoomIn">放大</el-button>-->
          <!--            <el-button size="small" @click="zoomOut">缩小</el-button>-->
          <!--            <el-button size="small" @click="resetZoom">重置</el-button>-->
          <!--          </div>-->
        </div>

        <div class="border rounded-lg overflow-hidden">
          <VuePdfEmbed
            :source="pdfUrl"
            :page="currentPage"
            :scale="scale"
            @loaded="onPdfLoaded"
            @page-loaded="onPageLoaded"
          />
        </div>

        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center space-x-2">
            <el-button :disabled="currentPage <= 1" size="small" @click="previousPage">
              上一页
            </el-button>
            <span class="text-sm text-gray-600">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <el-button :disabled="currentPage >= totalPages" size="small" @click="nextPage">
              下一页
            </el-button>
          </div>

          <!--          <div class="flex items-center space-x-2">-->
          <!--            <span class="text-sm text-gray-600">缩放:</span>-->
          <!--            <el-slider v-model="scale" :min="0.5" :max="2" :step="0.1" style="width: 100px" />-->
          <!--            <span class="text-sm text-gray-600">{{ Math.round(scale * 100) }}%</span>-->
          <!--          </div>-->
        </div>
      </div>

      <div v-else class="card text-center py-12">
        <div
          class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">请选择PDF文件</h3>
        <p class="text-gray-600">支持PDF格式的文档阅读</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import VuePdfEmbed from 'vue-pdf-embed'
import type { UploadFile } from 'element-plus'
import { getPublicationFile } from '@/api/modules/publication'

const selectedFile = ref<File | null>(null)
const pdfUrl = ref<string>('')
const currentPage = ref(1)
const totalPages = ref(1)
const scale = ref(1)
const showDownload = ref(false)
const pdfBlob = ref<Blob | null>(null)

const route = useRoute()

const handleFileChange = (file: UploadFile) => {
  if (file.raw) {
    selectedFile.value = file.raw
    pdfUrl.value = URL.createObjectURL(file.raw)
    currentPage.value = 1
  }
}

const onPdfLoaded = (pdf: any) => {
  totalPages.value = pdf.numPages
}

const onPageLoaded = (page: any) => {
  console.log('页面加载完成:', page)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 2)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5)
}

const resetZoom = () => {
  scale.value = 1
}

// 支持通过参数传递url并请求pdf
onMounted(async () => {
  const urlParam = route.query.url as string | undefined
  if (urlParam) {
    showDownload.value = true
    try {
      const blob: Blob = await getPublicationFile(urlParam)
      pdfBlob.value = blob
      pdfUrl.value = URL.createObjectURL(blob)
      currentPage.value = 1
      selectedFile.value = null
    } catch (e) {
      pdfUrl.value = ''
      pdfBlob.value = null
    }
  }
})

const downloadPdf = () => {
  if (pdfBlob.value) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(pdfBlob.value)
    link.download = 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // 可选：释放URL对象
    setTimeout(() => URL.revokeObjectURL(link.href), 100)
  }
}
</script>

<style>
/* 添加一些基本样式 */
.upload-demo {
  cursor: pointer;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.text-center {
  text-align: center;
}
</style>
