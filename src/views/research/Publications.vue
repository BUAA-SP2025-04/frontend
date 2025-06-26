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
          <!--          <p class="text-gray-600 mt-2">管理您的研究成果、发表论文和项目经历</p>-->
          <p class="text-gray-600 mt-2">管理您的研究成果</p>
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
          </el-select>
          <el-input
            v-model="filterYear"
            placeholder="年份"
            maxlength="4"
            type="number"
            style="width: 120px"
          />
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
              <div
                class="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                @click="onShowInfo(row)"
              >
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
              <div v-if="row.readerNum" class="font-semibold text-green-600">
                {{ row.readerNum }}
              </div>
              <div v-else class="text-green-600">-</div>
            </template>
          </el-table-column>

          <!--          <el-table-column prop="likeNum" label="点赞数" width="120" align="center">-->
          <!--            <template #default="{ row }">-->
          <!--              <div v-if="row.likeNum" class="font-semibold text-blue-600">{{ row.likeNum }}</div>-->
          <!--              <div v-else class="text-gray-400">-</div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

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
              :placeholder="`请输入作者，用英文逗号分隔（当前用户：${userName}，不可删除）`"
              :disabled="true"
            />
            <el-input
              v-if="allowAddAuthors"
              v-model="otherAuthors"
              placeholder="可添加其他作者，用英文逗号分隔"
              style="margin-top: 8px"
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
              v-model="currentPublication.abstracts"
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
                :before-upload="beforePdfUpload"
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
      <PublicationInfo
        v-if="shownPublication"
        v-model:visible="showInfo"
        :publication="shownPublication"
      ></PublicationInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { UploadFile } from 'element-plus'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type {
  Publication,
  PublicationProfile,
  PublicationStats,
  SavePublicationRequest,
} from '@/api/types/publication'
import {
  deletePublication,
  deletePublicationFile,
  getPublicationsByUser,
  getPublicationStatsByUser,
  savePublication,
  updatePublicationFile,
  uploadPublicationFile,
} from '@/api/modules/publication'
import { useUserStore } from '@/stores/user'
import PublicationStatsCardGroup from '@/components/publication/PublicationStatsCardGroup.vue'
import PublicationInfo from '@/components/publication/PublicationInfo.vue'
import type { UploadResponse } from '@/api/types/utils'

const loading = ref(false)
const saving = ref(false)
const showAddDialog = ref(false)
const showInfo = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterYear = ref('')

const stats = reactive<PublicationStats>({
  totalPublicationNum: 0,
  totalReaderNum: 0,
  totalLikeNum: 0,
  totalProjectNum: 0,
})

const publications = reactive<Publication[]>([])

const emptyPublication: PublicationProfile = {
  type: 'journal',
  title: '',
  authors: null,
  venue: null,
  year: null,
  status: 'published',
  abstracts: null,
  keywords: null,
  doi: null,
  pdfUrl: null,
  isPublic: 1,
}
const currentPublication = reactive<PublicationProfile>(
  JSON.parse(JSON.stringify(emptyPublication))
)
const shownPublication = ref<Publication | null>(null)

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

const filteredPublications = computed(() => {
  let result = publications as Publication[]

  if (searchQuery.value) {
    result = result.filter(
      (item: Publication) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.authors?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.keywords?.toLowerCase().includes(searchQuery.value.toLowerCase())
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
  oldFilePath.value = '' // 编辑时不保留旧路径
  Object.assign(currentPublication, publicationProfile)

  // 根据pdfUrl判断类型
  if (publicationProfile.pdfUrl && publicationProfile.pdfUrl.trim()) {
    if (/^https?:\/\//i.test(publicationProfile.pdfUrl.trim())) {
      pdfInputType.value = 'url'
    } else {
      pdfInputType.value = 'upload'
      oldFilePath.value = currentPublication.pdfUrl || ''
      currentPublication.pdfUrl = ''
    }
  } else {
    pdfInputType.value = 'url'
  }
  showAddDialog.value = true
}

const handlePdfFileChange = (file: UploadFile) => {
  if (file.raw && file.raw.type !== 'application/pdf') {
    ElMessage.error('只能上传 PDF 文件')
    pdfFile.value = null
    return
  }
  // 手动调用大小校验
  if (file.raw && !beforePdfUpload(file.raw)) {
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

//处理URL
const handlePdfUrl = async (): Promise<string> => {
  if (pdfInputType.value === 'url') {
    if (oldFilePath.value) {
      // url类型且有旧文件，删除旧文件
      await deletePublicationFile(oldFilePath.value)
    }
    return currentPublication.pdfUrl ? currentPublication.pdfUrl : ''
  } else if (pdfInputType.value === 'upload') {
    if (!pdfFile.value) {
      if (oldFilePath.value) return oldFilePath.value
      // 如果没有新文件但有旧文件，返回旧文件路径
      return ''
    }
    let res: UploadResponse
    if (oldFilePath.value) {
      // upload类型且有旧文件，更新文件
      const formData = new FormData()
      formData.append('oldFilePath', oldFilePath.value) // 添加旧文件路径
      formData.append('file', pdfFile.value)
      res = await updatePublicationFile(formData)
    } else {
      // upload类型且无旧文件，上传文件
      const formData = new FormData()
      formData.append('file', pdfFile.value)
      res = await uploadPublicationFile(formData)
    }
    if (res.data) {
      return res.data
    } else {
      ElMessage.error('更新文件失败')
      return ''
    }
  }
  return ''
}

const submitSuccess = () => {
  if (!isEditing.value && userStore.user?.id) {
    loading.value = true
    getPublicationsByUser(userStore.user.id)
      .then(res => {
        if (Array.isArray(res.data)) {
          publications.splice(0, publications.length, ...res.data)
        }
      })
      .finally(() => {
        loading.value = false
      })
    stats.totalPublicationNum = (stats.totalPublicationNum || 0) + 1
  } else if (isEditing.value) {
    // 编辑成功后更新当前列表
    const idx = publications.findIndex(item => item.id === currentPublication.id)
    if (idx !== -1) {
      Object.assign(publications[idx], currentPublication)
    }
  }
  resetForm()
  closeDialog()
}

const handleDelete = (id: number) => {
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
      // 删除后从publications中移除
      const idx = publications.findIndex(item => item.id === id)
      if (idx !== -1) publications.splice(idx, 1)
      // 删除后刷新统计数据
      if (userStore.user?.id) {
        getPublicationStatsByUser(userStore.user.id).then(res => {
          if (res.data) Object.assign(stats, res.data)
        })
      }
    })
    .catch(err => {
      ElMessage.error(err)
    })
}

const resetForm = () => {
  Object.assign(currentPublication, JSON.parse(JSON.stringify(emptyPublication)))
  pdfInputType.value = 'url'
  pdfFile.value = null
  oldFilePath.value = ''
}

const closeDialog = () => {
  showAddDialog.value = false
}

const userStore = useUserStore()
const userName = computed(() => userStore.user?.name || '')
const otherAuthors = ref('')

// 控制是否允许添加其他作者（可根据需求调整）
const allowAddAuthors = true

// 在打开添加对话框时，默认 authors 为当前用户 name，且不可删除
watch(
  () => showAddDialog.value,
  val => {
    if (val && !isEditing.value) {
      currentPublication.authors = userName.value
      otherAuthors.value = ''
    }
    if (val && isEditing.value) {
      // 编辑时分离当前用户和其他作者
      const authorsArr = (currentPublication.authors || '')
        .split(',')
        .map(a => a.trim())
        .filter(Boolean)
      if (authorsArr[0] === userName.value) {
        otherAuthors.value = authorsArr.slice(1).join(', ')
      } else {
        otherAuthors.value = authorsArr.join(', ')
      }
      currentPublication.authors = userName.value
    }
  }
)

const handleSave = () => {
  if (!formRef.value) return
  currentPublication.authors =
    userName.value + (otherAuthors.value ? `, ${otherAuthors.value}` : '')
  formRef.value
    .validate()
    .then(() => {
      saving.value = true
      // 先处理PDF相关操作
      return handlePdfUrl().then(url => {
        currentPublication.pdfUrl = url // 更新当前对象的pdfUrl
        if (pdfInputType.value === 'upload' && !currentPublication.pdfUrl) {
          ElMessage.error('文件上传失败')
          saving.value = false
          return Promise.reject()
        }
        const payload: SavePublicationRequest = {
          ...currentPublication,
          year: currentPublication.year ? String(currentPublication.year) : null,
          isPublic: String(currentPublication.isPublic),
        }

        // PDF无异常再保存
        let urlApi = isEditing.value ? '/publication/update' : '/publication/add'
        return savePublication(urlApi, payload)
      })
    })
    .then(() => {
      if (isEditing.value) ElMessage.success('更新成功')
      else ElMessage.success('添加成功')
      submitSuccess()
    })
    .catch(() => {
      ElMessage.error('保存失败')
    })
    .finally(() => {
      saving.value = false
    })
}

onMounted(async () => {
  if (userStore.user?.id) {
    loading.value = true
    try {
      const [pubRes, statsRes] = await Promise.all([
        getPublicationsByUser(userStore.user.id),
        getPublicationStatsByUser(userStore.user.id),
      ])
      if (Array.isArray(pubRes.data)) {
        publications.splice(0, publications.length, ...pubRes.data)
      }
      if (statsRes.data) {
        Object.assign(stats, statsRes.data)
      }
    } catch (e) {
      ElMessage.error('获取论文列表或统计数据失败')
    } finally {
      loading.value = false
    }
  }
})

function onShowInfo(row: Publication) {
  shownPublication.value = row
  showInfo.value = true
}

// PDF大小限制：80MB
const beforePdfUpload = (file: File) => {
  const maxSize = 80 * 1024 * 1024
  if (file.size > maxSize) {
    ElMessage.error('PDF文件大小不能超过80MB')
    return false
  }
  return true
}
</script>
