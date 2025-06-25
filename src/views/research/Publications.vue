<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            科研成果管理
          </h1>
          <p class="text-gray-600 mt-2">管理您的研究成果、发表论文和项目经历</p>
        </div>
        <el-button type="primary" size="large" @click="showAddDialog = true">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          添加成果
        </el-button>
      </div>

      <!-- 统计数据卡片组 -->
      <PublicationStatsCardGroup :stats="stats" />

      <!-- 筛选和搜索 -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <el-input
              v-model="searchQuery"
              placeholder="搜索论文标题、作者或关键词..."
              prefix-icon="Search"
              size="large"
            />
          </div>
          <el-select v-model="filterType" placeholder="类型筛选" size="large" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="期刊论文" value="journal" />
            <el-option label="会议论文" value="conference" />
            <el-option label="专利" value="patent" />
            <el-option label="项目" value="project" />
          </el-select>
          <el-select v-model="filterYear" placeholder="年份" size="large" style="width: 120px">
            <el-option label="全部" value="" />
            <el-option label="2024" value="2024" />
            <el-option label="2023" value="2023" />
            <el-option label="2022" value="2022" />
            <el-option label="2021" value="2021" />
          </el-select>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="bg-white rounded-lg shadow">
        <el-table
          v-loading="loading"
          :data="filteredPublications"
          style="width: 100%"
          :default-sort="{ prop: 'year', order: 'descending' }"
        >
          <el-table-column type="selection" width="55" />

          <el-table-column label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="getTypeColor(row.type)" size="small">
                {{ getTypeLabel(row.type) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="title" label="标题" min-width="300">
            <template #default="{ row }">
              <div class="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
                {{ row.title }}
              </div>
              <div class="text-sm text-gray-500 mt-1">
                {{ row.authors ? row.authors : '暂无数据' }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="venue" label="发表于" width="200">
            <template #default="{ row }">
              <div class="text-gray-900">
                {{ row.venue ? row.venue : '暂无数据' }}
              </div>
              <div class="text-sm text-gray-500">
                {{ row.year ? row.year : '暂无数据' }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="readerNum" label="阅读量" width="100" sortable align="center">
            <template #default="{ row }">
              <div class="font-semibold text-green-600">{{ row.readNum || 0 }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="likeNum" label="点赞数" width="120" align="center">
            <template #default="{ row }">
              <div v-if="row.impact" class="font-semibold text-blue-600">{{ row.likeNum }}</div>
              <div v-else class="text-gray-400">-</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusColor(row.status)" size="small">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <el-button size="small" @click="editPublication(row)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加/编辑对话框 -->
      <el-dialog
        v-model="showAddDialog"
        :title="isEditing ? '编辑成果' : '添加成果'"
        width="60%"
        destroy-on-close
      >
        <el-form
          ref="formRef"
          :model="currentPublication"
          label-width="100px"
          class="space-y-4"
          :rules="rules"
        >
          <el-form-item label="类型" required>
            <el-select
              v-model="currentPublication.type"
              placeholder="请选择类型"
              style="width: 100%"
            >
              <el-option label="期刊论文" value="journal" />
              <el-option label="会议论文" value="conference" />
              <el-option label="专利" value="patent" />
            </el-select>
          </el-form-item>

          <el-form-item label="标题" prop="title" required>
            <el-input v-model="currentPublication.title" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item label="作者">
            <el-input
              v-model="currentPublication.authors"
              placeholder="请输入作者，用英文逗号分隔"
            />
          </el-form-item>

          <el-form-item label="发表于">
            <el-input v-model="currentPublication.venue" placeholder="期刊/会议名称" />
          </el-form-item>

          <el-form-item label="年份">
            <el-input
              v-model="currentPublication.year"
              placeholder="请输入年份"
              maxlength="4"
              type="number"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="摘要">
            <el-input
              v-model="currentPublication.abstract"
              type="textarea"
              :rows="4"
              placeholder="请输入摘要"
            />
          </el-form-item>

          <el-form-item label="关键词">
            <el-input
              v-model="currentPublication.keywords"
              placeholder="请输入关键词，用英文逗号分隔"
            />
          </el-form-item>

          <el-form-item label="doi" prop="doi">
            <el-input v-model="currentPublication.doi" placeholder="数字对象标识符" />
          </el-form-item>

          <el-form-item label="pdfUrl" prop="pdfUrl">
            <div v-if="pdfInputType === 'url'" style="width: 100%">
              <el-input
                v-model="currentPublication.pdfUrl"
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
                <span v-else-if="currentPublication.pdfUrl" class="ml-2 text-green-600"
                  >已上传</span
                >
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
            <el-select
              v-model="currentPublication.status"
              placeholder="请选择状态"
              style="width: 100%"
            >
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
            <el-button type="primary" :loading="saving" @click="handleSave">
              {{ isEditing ? '更新' : '保存' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type {
  Publication,
  PublicationProfile,
  PublicationStats,
  SavePublicationRequest,
} from '@/api/types/publication'
import { deletePublication, savePublication } from '@/api/modules/publication'
import type { UploadFile } from 'element-plus'
import { deleteFile, updateFile, uploadFile } from '@/api/modules/upload'
import { useUserStore } from '@/stores/user'
import { getPublicationsByUser } from '@/api/modules/publication'
import PublicationStatsCardGroup from '@/components/publication/PublicationStatsCardGroup.vue'

const loading = ref(false)
const saving = ref(false)
const showAddDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterYear = ref('')

const stats = reactive<PublicationStats>({
  totalPublicationNum: 10,
  totalReaderNum: 1000,
  totalLikeNum: 50,
  totalProjectNum: -1,
})

const publications = reactive<Publication[]>([])

const emptyPublication: PublicationProfile = {
  type: 'journal',
  title: '',
  authors: null,
  venue: null,
  year: null,
  status: 'published',
  abstract: null,
  keywords: null,
  doi: null,
  pdfUrl: null,
  isPublic: 1,
}
const currentPublication = reactive<PublicationProfile>(
  JSON.parse(JSON.stringify(emptyPublication))
)

const pdfInputType = ref<'url' | 'upload'>('url')
const pdfFile = ref<File | null>(null)
const oldFilePath = ref<string>('')

const formRef = ref<FormInstance>()

const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
const urlPattern = /^(https?:\/\/)[^\s/$.?#].\S*$/i
const rules: FormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 排除自身（编辑时）
        const duplicate = publications.some(
          item =>
            item.title.trim() === value.trim() &&
            (!isEditing.value || item.id !== currentPublication.id)
        )
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
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const filteredPublications = computed(() => {
  let result = publications as Publication[]

  if (searchQuery.value) {
    result = result.filter(
      (item: Publication) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.authors.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.keywords.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterType.value) {
    result = result.filter((item: Publication) => item.type === filterType.value)
  }

  if (filterYear.value) {
    result = result.filter((item: Publication) => item.year?.toString() === filterYear.value)
  }

  return result
})

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    journal: 'success',
    conference: 'primary',
    patent: 'warning',
    project: 'info',
  }
  return colors[type] || 'default'
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    journal: '期刊',
    conference: '会议',
    patent: '专利',
  }
  return labels[type] || type
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    published: 'success',
    accepted: 'primary',
    'under-review': 'warning',
    draft: 'info',
  }
  return colors[status] || 'default'
}

const getStatusLabel = (status: 'published' | 'accepted' | 'under-review' | 'draft') => {
  const labels: Record<'published' | 'accepted' | 'under-review' | 'draft', string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status]
}

const editPublication = (publicationProfile: PublicationProfile) => {
  isEditing.value = true
  Object.assign(currentPublication, publicationProfile)

  // 根据pdfUrl判断类型
  if (publicationProfile.pdfUrl && publicationProfile.pdfUrl.trim()) {
    if (/^https?:\/\//i.test(publicationProfile.pdfUrl.trim())) {
      pdfInputType.value = 'url'
    } else {
      pdfInputType.value = 'upload'
    }
  } else {
    pdfInputType.value = 'url'
  }
  oldFilePath.value = '' // 编辑时不保留旧路径
  showAddDialog.value = true
}

// 监听pdfInputType变化
watch(pdfInputType, (newType, oldType) => {
  if (oldType === 'upload' && newType === 'url' && currentPublication.pdfUrl) {
    oldFilePath.value = currentPublication.pdfUrl
    currentPublication.pdfUrl = ''
  }
})

const handlePdfFileChange = (file: UploadFile) => {
  if (file.raw && file.raw.type !== 'application/pdf') {
    ElMessage.error('只能上传 PDF 文件')
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

//上传PDF
const uploadPdfFile = async (): Promise<string> => {
  if (pdfInputType.value === 'url' && !oldFilePath.value) return '' // url类型且无旧文件，直接返回

  if (pdfInputType.value === 'upload' && !oldFilePath.value) {
    // upload类型且无旧文件，上传新文件
    if (!pdfFile.value) return currentPublication.pdfUrl ? currentPublication.pdfUrl : ''
    const formData = new FormData()
    formData.append('file', pdfFile.value)
    try {
      const res = await uploadFile('/application/uploadFile', formData)
      if (res.data?.url) {
        return res.data.url
      }
      return ''
    } catch (err) {
      return ''
    }
  }
  if (pdfInputType.value === 'upload' && oldFilePath.value) {
    // upload类型且有旧文件，更新文件
    if (!pdfFile.value) return ''
    const formData = new FormData()
    formData.append('oldFilePath', oldFilePath.value) // 添加旧文件路径
    formData.append('file', pdfFile.value)
    try {
      await updateFile('/application/updateFile', formData)
      return ''
    } catch (err) {
      return ''
    }
  }
  if (pdfInputType.value === 'url' && oldFilePath.value) {
    // url类型且有旧文件，删除旧文件
    try {
      await deleteFile('/application/deleteFile', oldFilePath.value)
      return ''
    } catch (err) {
      return ''
    }
  }
  return ''
}

const handleSave = () => {
  if (!formRef.value) return
  formRef.value
    .validate()
    .then(() => {
      saving.value = true
      // 统一处理默认值
      const payload: SavePublicationRequest = {
        ...currentPublication,
        year: currentPublication.year ? String(currentPublication.year) : null,
        isPublic: String(currentPublication.isPublic),
      }

      //PDF上传处理
      let pdfPromise = Promise.resolve('')
      if (pdfInputType.value === 'upload' && pdfFile.value) {
        pdfPromise = uploadPdfFile()
      }
      return pdfPromise.then(url => {
        if (pdfInputType.value === 'upload' && pdfFile.value) {
          if (!url) {
            throw new Error('PDF上传失败')
          }
          payload.pdfUrl = url
          pdfFile.value = null // 上传后清空
        }
        console.log(payload)
        let urlApi = isEditing.value ? '/publication/update' : '/publication/add'
        return savePublication(urlApi, payload)
      })
    })
    .then(() => {
      if (isEditing.value) ElMessage.success('更新成功')
      else ElMessage.success('添加成功')
      resetForm()
    })
    .catch(err => {
      if (err && err.message) {
        ElMessage.error(err.message)
      }
    })
    .finally(() => {
      saving.value = false
    })
}

const handleDelete = (id: number) => {
  console.log(id)
  ElMessageBox.confirm('确定要删除该成果吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deletePublication(id)
    })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(err => {
      ElMessage.error(err)
    })
}

const resetForm = () => {
  Object.assign(currentPublication, JSON.parse(JSON.stringify(emptyPublication)))
  pdfInputType.value = 'url'
  pdfFile.value = null
  isEditing.value = false
  oldFilePath.value = ''
}

const closeDialog = () => {
  showAddDialog.value = false
  if (isEditing.value) resetForm()
}

const userStore = useUserStore()

onMounted(async () => {
  if (userStore.user?.id) {
    loading.value = true
    try {
      const res = await getPublicationsByUser(userStore.user.id)
      if (Array.isArray(res.data)) {
        publications.splice(0, publications.length, ...res.data)
      }
    } catch (e) {
      ElMessage.error('获取论文列表失败')
    } finally {
      loading.value = false
    }
  }
})
</script>
