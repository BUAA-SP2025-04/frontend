<template>
  <div class="space-y-6">
    <!-- 动态类型选择 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">动态类型</label>
      <el-select v-model="form.type" placeholder="选择动态类型" style="width: 100%">
        <el-option label="学术观点" value="opinion">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            学术观点 - 分享您的学术见解和思考
          </div>
        </el-option>
        <el-option label="论文发表" value="paper">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            论文发表 - 分享您的最新研究成果
          </div>
        </el-option>
        <el-option label="项目进展" value="project">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            项目进展 - 更新研究项目的最新进展
          </div>
        </el-option>
        <el-option label="会议分享" value="conference">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            会议分享 - 分享学术会议的见闻和收获
          </div>
        </el-option>
        <el-option label="合作邀请" value="collaboration">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
            合作邀请 - 寻找合作伙伴或项目机会
          </div>
        </el-option>
      </el-select>
    </div>

    <!-- 标题（可选） -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        标题
        <span class="text-gray-400 text-xs ml-1">(可选)</span>
      </label>
      <el-input
        v-model="form.title"
        placeholder="为您的动态添加一个吸引人的标题..."
        maxlength="100"
        show-word-limit
      />
    </div>

    <!-- 内容 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">内容 *</label>
      <el-input
        v-model="form.content"
        type="textarea"
        :rows="6"
        placeholder="分享您的想法、见解或最新动态..."
        maxlength="2000"
        show-word-limit
      />
    </div>

    <!-- 附件区域 -->
    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700">附件</label>

      <!-- 附件类型选择 -->
      <div class="flex flex-wrap gap-2">
        <el-button
          size="small"
          :type="attachmentType === 'none' ? 'primary' : 'default'"
          @click="attachmentType = 'none'"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          无附件
        </el-button>

        <el-button
          size="small"
          :type="attachmentType === 'paper' ? 'primary' : 'default'"
          @click="attachmentType = 'paper'"
        >
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clip-rule="evenodd"
            />
          </svg>
          论文
        </el-button>

        <el-button
          size="small"
          :type="attachmentType === 'image' ? 'primary' : 'default'"
          @click="attachmentType = 'image'"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          图片
        </el-button>

        <el-button
          size="small"
          :type="attachmentType === 'link' ? 'primary' : 'default'"
          @click="attachmentType = 'link'"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          链接
        </el-button>
      </div>

      <!-- 论文信息表单 -->
      <div v-if="attachmentType === 'paper'" class="bg-gray-50 rounded-lg p-4 space-y-3">
        <h4 class="font-medium text-gray-900">论文信息</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-700 mb-1">论文标题 *</label>
            <el-input v-model="paperInfo.title" placeholder="输入论文标题" />
          </div>
          <div>
            <label class="block text-sm text-gray-700 mb-1">期刊/会议 *</label>
            <el-input v-model="paperInfo.journal" placeholder="如: Nature, ICML 2024" />
          </div>
          <div>
            <label class="block text-sm text-gray-700 mb-1">发表年份 *</label>
            <el-input-number v-model="paperInfo.year" :min="1900" :max="2030" style="width: 100%" />
          </div>
          <div>
            <label class="block text-sm text-gray-700 mb-1">论文链接</label>
            <el-input v-model="paperInfo.url" placeholder="https://..." />
          </div>
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">摘要</label>
          <el-input
            v-model="paperInfo.abstract"
            type="textarea"
            :rows="3"
            placeholder="简要描述论文的主要内容和贡献..."
            maxlength="500"
            show-word-limit
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-700 mb-1">引用数</label>
            <el-input-number v-model="paperInfo.citations" :min="0" style="width: 100%" />
          </div>
          <div>
            <label class="block text-sm text-gray-700 mb-1">下载数</label>
            <el-input-number v-model="paperInfo.downloads" :min="0" style="width: 100%" />
          </div>
        </div>
      </div>

      <!-- 图片上传 -->
      <div v-if="attachmentType === 'image'" class="bg-gray-50 rounded-lg p-4">
        <h4 class="font-medium text-gray-900 mb-3">上传图片</h4>
        <el-upload
          ref="uploadRef"
          v-model:file-list="imageFiles"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="6"
          accept="image/*"
          @change="handleImageChange"
          @remove="handleImageRemove"
        >
          <div class="flex flex-col items-center justify-center text-gray-400">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="text-sm">添加图片</span>
          </div>
        </el-upload>
        <p class="text-xs text-gray-500 mt-2">支持 JPG、PNG、GIF 格式，最多上传 6 张图片</p>
      </div>

      <!-- 链接信息 -->
      <div v-if="attachmentType === 'link'" class="bg-gray-50 rounded-lg p-4 space-y-3">
        <h4 class="font-medium text-gray-900">链接信息</h4>
        <div>
          <label class="block text-sm text-gray-700 mb-1">链接地址 *</label>
          <el-input v-model="linkInfo.url" placeholder="https://..." />
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">链接标题</label>
          <el-input v-model="linkInfo.title" placeholder="描述性标题" />
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">链接描述</label>
          <el-input
            v-model="linkInfo.description"
            type="textarea"
            :rows="2"
            placeholder="简要说明链接内容..."
            maxlength="200"
            show-word-limit
          />
        </div>
      </div>
    </div>

    <!-- 标签 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">标签</label>
      <div class="space-y-2">
        <el-input
          v-model="tagInput"
          placeholder="输入标签后按回车添加，如：深度学习、机器学习..."
          @keydown.enter.prevent="addTag"
        >
          <template #suffix>
            <el-button size="small" text @click="addTag" :disabled="!tagInput.trim()">
              添加
            </el-button>
          </template>
        </el-input>

        <!-- 标签显示 -->
        <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
          <el-tag v-for="(tag, index) in form.tags" :key="index" closable @close="removeTag(index)">
            #{{ tag }}
          </el-tag>
        </div>

        <!-- 推荐标签 -->
        <div v-if="recommendedTags.length > 0">
          <p class="text-xs text-gray-500 mb-2">推荐标签：</p>
          <div class="flex flex-wrap gap-2">
            <el-tag
              v-for="tag in recommendedTags"
              :key="tag"
              size="small"
              type="info"
              class="cursor-pointer"
              @click="addRecommendedTag(tag)"
            >
              #{{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布设置 -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="font-medium text-gray-900 mb-3">发布设置</h4>
      <div class="space-y-3">
        <el-checkbox v-model="form.allowComments">允许评论</el-checkbox>
        <el-checkbox v-model="form.allowShare">允许分享</el-checkbox>
        <el-checkbox v-model="form.notifyFollowers">通知关注者</el-checkbox>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button @click="saveDraft" :loading="saving">保存草稿</el-button>
      <el-button type="primary" @click="publishPost" :loading="publishing" :disabled="!isFormValid">
        发布动态
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadFiles } from 'element-plus'

// 定义 emits
const emit = defineEmits<{
  published: [post: any]
  cancel: []
}>()

// 响应式数据
const attachmentType = ref<'none' | 'paper' | 'image' | 'link'>('none')
const tagInput = ref('')
const imageFiles = ref<UploadFiles>([])
const uploading = ref(false)
const saving = ref(false)
const publishing = ref(false)

// 表单数据
const form = reactive({
  type: 'opinion' as 'paper' | 'project' | 'conference' | 'opinion' | 'collaboration',
  title: '',
  content: '',
  tags: [] as string[],
  allowComments: true,
  allowShare: true,
  notifyFollowers: true,
})

// 论文信息
const paperInfo = reactive({
  title: '',
  journal: '',
  year: new Date().getFullYear(),
  abstract: '',
  url: '',
  citations: 0,
  downloads: 0,
})

// 链接信息
const linkInfo = reactive({
  url: '',
  title: '',
  description: '',
})

// 推荐标签
const recommendedTags = computed(() => {
  const tagsByType = {
    paper: ['论文发表', '研究成果', '学术论文', '期刊发表'],
    project: ['研究项目', '项目进展', '科研项目', '实验结果'],
    conference: ['学术会议', '会议分享', '学术报告', '演讲'],
    opinion: ['学术观点', '研究心得', '学术讨论', '科研感悟'],
    collaboration: ['合作邀请', '项目合作', '学术合作', '研究合作'],
  }

  const baseTags = tagsByType[form.type] || []
  const commonTags = ['深度学习', '机器学习', '人工智能', '数据科学', '算法', '编程']

  return [...baseTags, ...commonTags].filter(tag => !form.tags.includes(tag)).slice(0, 8)
})

// 表单验证
const isFormValid = computed(() => {
  if (!form.content.trim()) return false

  if (attachmentType.value === 'paper') {
    return paperInfo.title.trim() && paperInfo.journal.trim() && paperInfo.year
  }

  if (attachmentType.value === 'link') {
    return linkInfo.url.trim()
  }

  return true
})

// 监听动态类型变化，重置附件类型
watch(
  () => form.type,
  newType => {
    if (newType === 'paper' && attachmentType.value === 'none') {
      attachmentType.value = 'paper'
    }
  }
)

// 方法
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag) && form.tags.length < 10) {
    form.tags.push(tag)
    tagInput.value = ''
  } else if (form.tags.length >= 10) {
    ElMessage.warning('最多只能添加10个标签')
  } else if (form.tags.includes(tag)) {
    ElMessage.warning('标签已存在')
  }
}

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

const addRecommendedTag = (tag: string) => {
  if (!form.tags.includes(tag) && form.tags.length < 10) {
    form.tags.push(tag)
  }
}

const handleImageChange = (file: UploadFile, fileList: UploadFiles) => {
  // 验证文件类型和大小
  if (file.raw) {
    const isImage = file.raw.type.startsWith('image/')
    const isLt5M = file.raw.size / 1024 / 1024 < 5

    if (!isImage) {
      ElMessage.error('只能上传图片文件!')
      return false
    }
    if (!isLt5M) {
      ElMessage.error('图片大小不能超过 5MB!')
      return false
    }
  }
}

const handleImageRemove = (file: UploadFile, fileList: UploadFiles) => {
  // 处理图片移除
}

const buildAttachments = () => {
  const attachments: any[] = []

  if (attachmentType.value === 'paper' && paperInfo.title.trim()) {
    attachments.push({
      type: 'paper',
      title: paperInfo.title,
      journal: paperInfo.journal,
      year: paperInfo.year,
      abstract: paperInfo.abstract,
      url: paperInfo.url,
      citations: paperInfo.citations,
      downloads: paperInfo.downloads,
    })
  }

  if (attachmentType.value === 'image' && imageFiles.value.length > 0) {
    imageFiles.value.forEach(file => {
      if (file.raw) {
        attachments.push({
          type: 'image',
          name: file.name,
          url: URL.createObjectURL(file.raw), // 实际项目中应该上传到服务器
        })
      }
    })
  }

  if (attachmentType.value === 'link' && linkInfo.url.trim()) {
    attachments.push({
      type: 'link',
      title: linkInfo.title || '链接',
      description: linkInfo.description,
      url: linkInfo.url,
    })
  }

  return attachments
}

const saveDraft = async () => {
  saving.value = true

  try {
    // 模拟保存草稿
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('草稿已保存')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

const publishPost = async () => {
  if (!isFormValid.value) {
    ElMessage.warning('请完善必填信息')
    return
  }

  publishing.value = true

  try {
    // 模拟发布API调用
    await new Promise(resolve => setTimeout(resolve, 1500))

    const postData = {
      type: form.type,
      title: form.title.trim() || undefined,
      content: form.content.trim(),
      attachments: buildAttachments(),
      tags: form.tags,
      settings: {
        allowComments: form.allowComments,
        allowShare: form.allowShare,
        notifyFollowers: form.notifyFollowers,
      },
    }

    emit('published', postData)
    ElMessage.success('动态发布成功!')
  } catch (error) {
    ElMessage.error('发布失败，请重试')
  } finally {
    publishing.value = false
  }
}
</script>

<style scoped>
:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100px;
  height: 100px;
}
</style>
