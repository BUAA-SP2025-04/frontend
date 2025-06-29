<script setup lang="ts">
import { defineEmits, reactive, ref } from 'vue'
import type { PublicationProfile } from '@/api/types/publication'
import { ElMessage, type FormRules, type UploadFile } from 'element-plus'

const props = defineProps<{
  showAddDialog: boolean
  userName: string
  existingTitles: string[]
}>()
const saving = ref(false)
const emit = defineEmits(['update:showAddDialog'])

const publicationProfile = reactive<PublicationProfile>({
  type: 'journal',
  title: '',
  authors: '',
  venue: '',
  year: null,
  status: 'draft',
  abstracts: '',
  keywords: '',
  doi: '',
  pdfUrl: '',
  isPublic: 1,
})
const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
const urlPattern = /^(https?:\/\/)[^\s/$.?#].\S*$/i
const rules: FormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const duplicate = props.existingTitles.some(item => item.trim() === value.trim())
        if (duplicate) {
          callback(new Error('标题已存在，请勿重复'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  doi: [
    {
      validator: (rule, value, callback) => {
        if (value && !doiPattern.test(value)) {
          callback(new Error('DOI 格式不正确'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  pdfUrl: [
    {
      validator: function (rule, value, callback) {
        if (pdfInputType.value === 'url') {
          if (value && !urlPattern.test(value)) {
            callback(new Error('URL 格式不正确'))
          } else {
            callback()
          }
        } else if (pdfInputType.value === 'upload') {
          if (!oldFilePath.value && !pdfFile.value) {
            callback(new Error('请上传PDF文件'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const otherAuthors = ref('')

const pdfInputType = ref<'url' | 'upload'>('url')
const pdfFile = ref<File | null>(null)
const oldFilePath = ref<string>('')

const checkPdfSize = (file: File) => {
  const maxSize = 80 * 1024 * 1024
  if (file.size > maxSize) {
    ElMessage.error('PDF文件大小不能超过80MB')
    return false
  }
  return true
}

const handlePdfFileChange = (file: UploadFile) => {
  if (file.raw && file.raw.type !== 'application/pdf') {
    ElMessage.error('只能上传 PDF 文件')
    pdfFile.value = null
    return
  }
  // 手动调用大小校验
  if (file.raw && !checkPdfSize(file.raw)) {
    pdfFile.value = null
    return
  }
  pdfFile.value = file.raw ?? null
}

const handlePdfExceed = (files: File[]) => {
  if (files.length > 0) {
    pdfFile.value = files[files.length - 1]
  }
}

const closeDialog = () => {
  // 通过emit通知父组件关闭弹窗
  emit('update:showAddDialog', false)
}

const handleSave = () => {
  // 这里应该实现保存逻辑
  console.log('保存逻辑需要实现')
  closeDialog()
}
</script>

<template>
  <el-dialog
    :model-value="props.showAddDialog"
    width="60%"
    destroy-on-close
    @update:model-value="(val: boolean) => emit('update:showAddDialog', val)"
  >
    <el-form
      ref="formRef"
      :model="publicationProfile"
      label-width="100px"
      class="space-y-4"
      :rules="rules"
    >
      <el-form-item label="类型" required>
        <el-select v-model="publicationProfile.type" placeholder="请选择类型" style="width: 100%">
          <el-option label="期刊论文" value="journal" />
          <el-option label="会议论文" value="conference" />
          <el-option label="专利" value="patent" />
        </el-select>
      </el-form-item>

      <el-form-item label="标题" prop="title" required>
        <el-input v-model="publicationProfile.title" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item label="作者">
        <el-input
          v-model="publicationProfile.authors"
          :placeholder="`请输入作者，用英文逗号分隔（当前用户：${userName}，不可删除）`"
          :disabled="true"
        />
        <el-input
          v-model="otherAuthors"
          placeholder="可添加其他作者，用英文逗号分隔"
          style="margin-top: 8px"
        />
      </el-form-item>

      <el-form-item label="发表于">
        <el-input v-model="publicationProfile.venue" placeholder="期刊/会议名称" />
      </el-form-item>

      <el-form-item label="年份">
        <el-input
          v-model="publicationProfile.year"
          placeholder="请输入年份"
          maxlength="4"
          type="number"
          class="w-full"
        />
      </el-form-item>

      <el-form-item label="摘要">
        <el-input
          v-model="publicationProfile.abstracts"
          type="textarea"
          :rows="4"
          placeholder="请输入摘要"
        />
      </el-form-item>

      <el-form-item label="关键词">
        <el-input
          v-model="publicationProfile.keywords"
          placeholder="请输入关键词，用英文逗号分隔"
        />
      </el-form-item>

      <el-form-item label="doi" prop="doi">
        <el-input v-model="publicationProfile.doi" placeholder="数字对象标识符" />
      </el-form-item>

      <el-form-item label="pdfUrl" prop="pdfUrl">
        <div v-if="pdfInputType === 'url'" style="width: 100%">
          <el-input
            v-model="publicationProfile.pdfUrl"
            placeholder="论文链接"
            style="width: 100%; height: 40px"
          />
        </div>
        <div v-else style="width: 100%">
          <el-upload
            class="upload-demo"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handlePdfFileChange"
            :limit="1"
            :on-exceed="handlePdfExceed"
            accept="application/pdf"
            style="width: 100%; height: 40px; display: flex; align-items: center"
          >
            <el-button type="primary">选择PDF文件</el-button>
            <span v-if="pdfFile" class="ml-4 text-green-600">{{ pdfFile.name }}</span>
            <span v-else-if="oldFilePath" class="ml-2 text-green-600">已上传</span>
          </el-upload>
        </div>
        <div style="margin-top: 8px">
          <el-radio-group v-model="pdfInputType" size="small">
            <el-radio-button label="url">链接</el-radio-button>
            <el-radio-button label="upload">上传文件</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="publicationProfile.status" placeholder="请选择状态" style="width: 100%">
          <el-option label="已发表" value="published" />
          <el-option label="待发表" value="accepted" />
          <el-option label="审核中" value="under-review" />
          <el-option label="草稿" value="draft" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
