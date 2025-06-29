<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">PDF阅读器</h1>
        <p class="text-gray-600">支持PDF文档阅读和文本层坐标提取</p>
      </div> -->

      <div class="flex items-center space-x-4 mb-4">
        <el-button type="success" :disabled="!pdfUrl" @click="downloadPdf"> 下载当前PDF </el-button>
      </div>

      <div v-if="pdfUrl" class="card" ref="pdfContainer">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">PDF预览</h3>
            <!-- <div class="flex space-x-2">
              <el-button size="small" @click="zoomIn">放大</el-button>
              <el-button size="small" @click="zoomOut">缩小</el-button>
              <el-button size="small" @click="resetZoom">重置</el-button>
            </div> -->
          <div class="tools" v-if="allowEdit">
            <button 
              class="tool-btn" 
              :class="{ active: activeTool === 'highlight' }"
              @click="toggleHighlightMode"
            >
              <i class="fas fa-highlighter"></i> 
              {{ activeTool === 'highlight' ? '批注模式中...' : '高亮批注' }}
            </button>
            <button class="tool-btn" @click="clearAnnotations">
              <i class="fas fa-trash-alt"></i> 清除批注
            </button>
            <button class="tool-btn" @click="downloadAnnotations">
              <i class="fas fa-download"></i> 导出批注
            </button>
          </div>
        </div>

        <div class="border rounded-lg overflow-hidden relative">
          <VuePdfEmbed
            :source="pdfUrl"
            :page="currentPage"
            :scale="5"
            @loaded="onPdfLoaded"
            @page-loaded="onPageLoaded"
          />
          <div 
            ref="annotationLayer" 
            class="annotation-layer"
            :style="{ cursor: activeTool === 'highlight' ? 'crosshair' : 'default',
              pointerEvents: activeTool === 'highlight' ? 'auto' : 'none',
              zIndex: 100 }"
          ></div>
        </div>
        
        <div 
          v-if="highlightPreview.visible"
          class="highlight-preview"
          :style="{
            left: highlightPreview.x + 'px',
            top: highlightPreview.y + 'px',
            width: highlightPreview.width + 'px',
            height: highlightPreview.height + 'px'
          }"
        ></div>
        
        <div 
          v-for="(annotation) in visibleAnnotations"
          :key="annotation.id"
          class="annotation-marker"
          :style="{
            left: annotation.markerX + 'px',
            top: annotation.markerY + 'px'
          }"
          @mouseenter="showAnnotationPopup(annotation, $event)"
          @mouseleave="activePopup = null"
        >
          <i class="fas fa-comment"></i>
        </div>
        
        <div 
          v-if="activePopup"
          class="annotation-popup"
          :style="{
            left: popupPosition.x + 'px',
            top: popupPosition.y + 'px'
          }"
        >
          <button class="close-btn" @click="activePopup = null">
            <i class="fas fa-times"></i>
          </button>
          <h4>批注内容</h4>
          <p>{{ activePopup.comment || '（无批注内容）' }}</p>
          <p class="annotation-page">页码: {{ activePopup.page }}</p>
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

          <!-- <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">缩放:</span>
            <el-slider v-model="scale" :min="0.5" :max="2" :step="0.1" style="width: 100px" />
            <span class="text-sm text-gray-600">{{ Math.round(scale * 100) }}%</span>
          </div>-->
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
import { ref, onMounted, nextTick, watch, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import VuePdfEmbed from 'vue-pdf-embed'
import type { UploadFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPublicationFile } from '@/api/modules/publication'
import { annotationAPI } from '@/api/modules/annotation'
import type { 
  Annotation,
  HighlightPreview,
  PopupPosition,
} from '@/api/types/annotation'
import { useUserStore } from '@/stores/user'


// 定义批注类型
interface Annotation {
  id: string
  type: string
  page: number
  x: number
  y: number
  width: number
  height: number
  comment: string
  markerX: number
  markerY: number
}

const selectedFile = ref<File | null>(null)
const pdfUrl = ref<string>('')
const currentPage = ref(1)
const totalPages = ref(1)
const scale = ref(1)
const showDownload = ref(false)
const pdfBlob = ref<Blob | null>(null)
const pdfContainer = ref<HTMLElement | null>(null)
const pdfLoaded = ref(false)
const isPdfRendered = ref(false)
const resizeObserver = ref<ResizeObserver | null>(null)

// 批注相关变量
const annotationLayer = ref<HTMLElement | null>(null)
const canvasContext = ref<CanvasRenderingContext2D | null>(null)
const activeTool = ref<string | null>(null)
const isDrawing = ref(false)
const startPos = ref({ x: 0, y: 0 })
const annotations = ref<Annotation[]>([])
const activePopup = ref<Annotation | null>(null)
const popupPosition = ref({ x: 0, y: 0 })
const highlightPreview = ref({
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})

const route = useRoute()

// 批注相关状态
const annotationLayer = ref<HTMLElement | null>(null);
const activeTool = ref<string | null>(null);
const annotations = ref<Annotation[]>([]);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);
const isDrawing = ref<boolean>(false);
const startPos = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const highlightPreview = ref<HighlightPreview>({
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
const activePopup = ref<Annotation | null>(null);
const popupPosition = ref<PopupPosition>({ x: 0, y: 0 });

const userStore = useUserStore()
let userId = ''
const initUserInfo = () => {
  if (userStore.user) {
    userId = String(userStore.user.id)
  }
}

const handleFileChange = (file: UploadFile) => {
  if (file.raw) {
    selectedFile.value = file.raw
    pdfUrl.value = URL.createObjectURL(file.raw)
    currentPage.value = 1
  }
}

const onPdfLoaded = (pdf: any) => {
  totalPages.value = pdf.numPages
  isPdfRendered.value = true
}

const onPageLoaded = (page: any) => {
  console.log('页面加载完成:', page)
  requestAnimationFrame(() => {
    // 确保 PDF 容器已渲染
    if (!pdfContainer.value) {
      console.warn('PDF 容器未找到')
      pdfContainer.value = document.querySelector('.pdf-container') as HTMLElement
    }
    
    // 初始化批注层
    initAnnotationCanvas()
    attachEventListeners()
  })
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
  initUserInfo()
  if(route.query.paperId) paperId.value = parseInt(route.query.paperId as string)
  if(route.query.allowEdit) allowEdit.value = parseInt(route.query.allowEdit as string)
  const urlParam = route.query.url as string | undefined
  if (urlParam) {
    showDownload.value = true
    try {
      console.log(urlParam)
      const blob: Blob = await getPublicationFile(urlParam)
      pdfBlob.value = blob
      pdfUrl.value = URL.createObjectURL(blob)
      currentPage.value = 1
      selectedFile.value = null
      if (pdfContainer.value && allowEdit.value == 1) {
        const res = await annotationAPI.getAnnotationList(userId, paperId.value.toString())
        annotations.value = res.data
        resizeObserver.value = new ResizeObserver(() => {
          initAnnotationCanvas()
          redrawAnnotations()
        })
        resizeObserver.value.observe(pdfContainer.value)
      }
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

// 确保批注层元素存在
const ensureAnnotationLayer = () => {
  // 确保PDF容器存在
  if (!pdfContainer.value) {
    console.error('PDF容器未初始化')
    return false
  }
  
  // 不再动态创建，直接使用模板中的ref
  if (annotationLayer.value) {
    // 设置必要的样式
    annotationLayer.value.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      pointer-events: ${activeTool.value === 'highlight' ? 'auto' : 'none'};
    `
    console.log("创建了批注层")
    return true
  }
  return false
}

// 初始化批注画布
const initAnnotationCanvas = () => {
  ensureAnnotationLayer()
  if (!annotationLayer.value) {
    console.error('批注层元素创建失败')
    return
  }
  
  console.log('开始初始化画布了！')
  annotationLayer.value.innerHTML = ''
  const canvas = document.createElement('canvas');
  canvas.className = 'annotation-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  
  // 设置画布尺寸匹配元素
  const rect = annotationLayer.value.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  // 清除旧画布
  while (annotationLayer.value.firstChild) {
    annotationLayer.value.removeChild(annotationLayer.value.firstChild);
  }
  
  annotationLayer.value.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    canvasContext.value = ctx;
    redrawAnnotations();
  } else {
    console.error('无法获取Canvas上下文');
  }
};

const retryAnnotationInit = () => {
  console.log('重试批注层设置')
  initAnnotationCanvas()
  attachEventListeners()
};

watch(currentPage, () => {
  nextTick(() => {
    setTimeout(retryAnnotationInit, 300);
  });
});

// 重绘所有批注
const redrawAnnotations = () => {
  const ctx = canvasContext.value;
  if (!ctx) return;
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  annotations.value
    .filter(anno => anno.page === currentPage.value)
    .forEach(anno => {
      // 绘制高亮区域
      ctx.fillStyle = 'rgba(255, 235, 59, 0.3)';
      ctx.fillRect(anno.x, anno.y, anno.width, anno.height);
      
      // // 绘制高亮边框
      // ctx.strokeStyle = 'rgba(255, 193, 7, 0.8)';
      // ctx.lineWidth = 1;
      // ctx.strokeRect(anno.x, anno.y, anno.width, anno.height);
    });
  console.log('初始化画布完成了！')
};

// 显示批注弹窗
const showAnnotationPopup = (annotation: Annotation|{ id: string; page: number; x: number; y: number; 
    width: number; height: number; comment: string; markerX: number; markerY: number }|null, 
    event: { clientX: number; clientY: number }) => {
  activePopup.value = annotation;
  popupPosition.value = {
    x: event.clientX + 10,
    y: event.clientY + 10
  };
};

// 切换高亮模式
const toggleHighlightMode = () => {
  activeTool.value = activeTool.value === 'highlight' ? null : 'highlight';
  
  if (activeTool.value === 'highlight') {
    initAnnotationCanvas()
    attachEventListeners()
    ElMessage.success('已进入高亮批注模式，请拖动鼠标选择区域');
  } else {
    ElMessage.info('已退出高亮批注模式');
  }
};

// 鼠标事件处理
const getRelativeCoordinates = (e: MouseEvent) => {
  if (!annotationLayer.value) return { x: 0, y: 0 }
  // 获取PDF容器的边界矩形
  const container = pdfContainer.value?.querySelector('.border') as HTMLElement
  if (!container) return { x: 0, y: 0 }

  const rect = container.getBoundingClientRect()
  // 计算相对于PDF容器的坐标
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // 确保坐标在PDF容器范围内
  return {
    x: Math.max(0, Math.min(x, rect.width)),
    y: Math.max(0, Math.min(y, rect.height))
  }
}

const handleMouseDown = (e: MouseEvent) => {
  if (activeTool.value !== 'highlight') return
  
  isDrawing.value = true
  const { x, y } = getRelativeCoordinates(e)
  startPos.value = { x, y }
  
  highlightPreview.value = {
    visible: true,
    x,
    y,
    width: 0,
    height: 0
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDrawing.value) return
  
  const { x, y } = getRelativeCoordinates(e)
  highlightPreview.value = {
    visible: true,
    x: Math.min(startPos.value.x, x),
    y: Math.min(startPos.value.y, y),
    width: Math.abs(x - startPos.value.x),
    height: Math.abs(y - startPos.value.y)
  }
}

const handleMouseUp = async () => {
  if (!isDrawing.value) return;
  
  isDrawing.value = false;
  console.log('绘制结束了！')
  
  // 添加有效区域判断
  if (highlightPreview.value.width > 5 && highlightPreview.value.height > 5) {
    const commentText = prompt('请输入批注内容（可选）：', '');
    
    const newAnnotationUpload = {
      // id: Date.now().toString(),
      // type: 'highlight',
      page: currentPage.value,
      x: highlightPreview.value.x,
      y: highlightPreview.value.y,
      width: highlightPreview.value.width,
      height: highlightPreview.value.height,
      comment: commentText || '',
      markerX: highlightPreview.value.x + highlightPreview.value.width,
      markerY: highlightPreview.value.y,
      // paperId: paperId
    };
    const newAnnotation = {
      id: '0',
      // type: 'highlight',
      page: currentPage.value,
      x: highlightPreview.value.x,
      y: highlightPreview.value.y,
      width: highlightPreview.value.width,
      height: highlightPreview.value.height,
      comment: commentText || '',
      markerX: highlightPreview.value.x + highlightPreview.value.width,
      markerY: highlightPreview.value.y,
      paperId: paperId.value
    };

    try {
      const res = await annotationAPI.uploadAnnotation(userId, paperId.value.toString(), newAnnotationUpload)
      newAnnotation.id = res.data.toString()
    } catch (error) {
      console.log("云端批注添加失败")
    }
    
    annotations.value.push(newAnnotation);
    redrawAnnotations();
    ElMessage.success('批注添加成功');
  }
  
  highlightPreview.value.visible = false;
};

// 清除当前页批注
const clearAnnotations = async () => {
  if (annotations.value.length === 0) {
    ElMessage.warning('当前没有可清除的批注');
    return;
  }
  try {
    await ElMessageBox.confirm('确定清除当页所有批注吗？', '确认删除', {
      type: 'warning',
    })
    annotations.value = annotations.value.filter(
      anno => anno.page !== currentPage.value
    );
    redrawAnnotations();
    ElMessage.success('已清除当前页所有批注');
  } catch (error) {
    // 用户取消
  }
};

// 删除单个批注
const deleteAnnotation = (id: string) => {
  annotations.value = annotations.value.filter(anno => anno.id !== id);
  redrawAnnotations();
  ElMessage.success('批注已删除');
};

// 导出批注
const downloadAnnotations = () => {
  if (annotations.value.length === 0) {
    ElMessage.warning('没有批注可导出');
    return;
  }
  
  const dataStr = JSON.stringify(annotations.value, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportFileDefaultName = `pdf-annotations-${new Date().toISOString().slice(0, 10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  ElMessage.success('批注导出成功');
};

// 跳转到指定页
const goToPage = (page: number) => {
  currentPage.value = page;
};

// 添加事件监听
const attachEventListeners = () => {
  // 先移除旧的事件监听器
  detachEventListeners();

  if (!annotationLayer.value) {
    console.error('无法附加事件监听器：批注层不存在')
    return;
  }
  
  annotationLayer.value.addEventListener('mousedown', handleMouseDown);
  annotationLayer.value.addEventListener('mousemove', handleMouseMove);
  annotationLayer.value.addEventListener('mouseup', handleMouseUp);
};

// 添加移除事件监听的方法
const detachEventListeners = () => {
  if (!annotationLayer.value) return;
  
  annotationLayer.value.removeEventListener('mousedown', handleMouseDown);
  annotationLayer.value.removeEventListener('mousemove', handleMouseMove);
  annotationLayer.value.removeEventListener('mouseup', handleMouseUp);
};

onUnmounted(() => {
  detachEventListeners();
  resizeObserver.value?.disconnect()
});

// 计算当前页可见批注
const visibleAnnotations = computed<Annotation[]>(() => {
  return annotations.value.filter(anno => anno.page === currentPage.value);
});

// 监听当前页变化
watch(currentPage, () => {
  if (!isPdfRendered.value) return
  nextTick(() => {
    initAnnotationCanvas()
    attachEventListeners()
  })
})

// 初始化
onMounted(() => {
  // 初始加载完成后设置批注层
  setTimeout(() => {
    initAnnotationCanvas();
    attachEventListeners();
  }, 2000);
});

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

.card {
background: white;
border-radius: 12px;
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
padding: 25px;
margin-bottom: 30px;
transition: transform 0.3s ease;
}

.toolbar {
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 0;
border-bottom: 1px solid #eee;
margin-bottom: 20px;
}

.toolbar h3 {
font-size: 1.4rem;
color: #3498db;
}

.tools {
display: flex;
gap: 12px;
}

.tool-btn {
padding: 10px 18px;
border: none;
border-radius: 8px;
background: #3498db;
color: white;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: 8px;
transition: all 0.3s ease;
}

.tool-btn:hover {
background: #2980b9;
transform: scale(1.05);
}

.tool-btn i {
font-size: 16px;
}

.tool-btn.active {
background: green;
box-shadow: 0 4px 12px rgba(green, 0.3);
}

.annotation-layer {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: auto;
z-index: 10;
}

.pagination {
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 0;
border-top: 1px solid #eee;
margin-top: 20px;
}

.page-info {
font-size: 1rem;
color: #7f8c8d;
}

.annotation-list {
margin-top: 20px;
padding: 20px;
background: #f8f9fa;
border-radius: 8px;
}

.annotation-list h4 {
margin-bottom: 15px;
color: #2c3e50;
font-size: 1.2rem;
}

.annotation-item {
padding: 15px;
background: white;
border-radius: 8px;
margin-bottom: 15px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
border-left: 4px solid #3498db;
}

.annotation-content {
display: flex;
justify-content: space-between;
}

.annotation-text {
flex: 1;
}

.annotation-page {
color: #7f8c8d;
font-size: 0.9rem;
}

.annotation-actions {
display: flex;
gap: 10px;
}

.annotation-actions button {
background: none;
border: none;
color: #7f8c8d;
cursor: pointer;
transition: color 0.3s;
}

.annotation-actions button:hover {
color: yellow;
}

.highlight-preview {
position: absolute;
border: 2px dashed yellow;
background: rgba(yellow, 0.2);
z-index: 100;
}

.annotation-marker {
position: absolute;
width: 24px;
height: 24px;
background: blue;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
z-index: 20;
transform: translate(-50%, -50%);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.annotation-marker i {
color: white;
font-size: 12px;
}

.annotation-popup {
position: absolute;
background: white;
border-radius: 8px;
padding: 15px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
z-index: 100;
width: 280px;
max-width: 90vw;
}

.annotation-popup h4 {
margin-bottom: 10px;
color: #2c3e50;
}

.annotation-popup p {
color: #555;
line-height: 1.5;
}

.annotation-popup .close-btn {
position: absolute;
top: 10px;
right: 10px;
background: none;
border: none;
color: #7f8c8d;
cursor: pointer;
font-size: 16px;
}

footer {
text-align: center;
margin-top: 40px;
padding: 20px;
color: #7f8c8d;
border-top: 1px solid #eee;
}

.instructions {
background: #e3f2fd;
padding: 20px;
border-radius: 8px;
margin-bottom: 25px;
border-left: 4px solid #3498db;
}

.instructions h3 {
color: #2c3e50;
margin-bottom: 15px;
}

.instructions ol {
padding-left: 20px;
}

.instructions li {
margin-bottom: 10px;
line-height: 1.6;
}

@media (max-width: 768px) {
.tools {
  flex-wrap: wrap;
}

.tool-btn {
  padding: 8px 12px;
  font-size: 0.9rem;
}

.pdf-container {
  min-height: 400px;
}
}

/* 确保 PDF 容器有相对定位 */
.border.rounded-lg.overflow-hidden {
  position: relative;
  min-height: 500px;
}

/* 确保批注层在 PDF 上方 */
.annotation-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20; /* 提高层级 */
}
.annotation-layer[style] {
  position: absolute !important;
}

/* 层级调整 */
.vue-pdf-embed {
  position: relative;
  z-index: 10; /* PDF渲染层 */
}

.annotation-layer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100; /* 批注层高于PDF层 */
  pointer-events: none; /* 默认不拦截事件 */
}

.annotation-layer.active {
  pointer-events: auto; /* 批注模式时捕获事件 */
}

/* 高亮预览层级 */
.highlight-preview {
  z-index: 30;
}

/* 批注标记层级 */
.annotation-marker {
  z-index: 40;
}

/* 批注弹窗层级 */
.annotation-popup {
  z-index: 50;
}

</style>
