<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg class="w-8 h-8 mr-3 text-indigo-600" stroke="currentColor" viewBox="0 0 24 24">
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
        <div class="relative group">
          <!-- 悬停时展开的按钮组 -->
          <div
            class="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 flex -gap-0.5"
          >
            <el-button type="success" size="large" @click="showExcelImporter = true">
              <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v16h16V4H4zm4 4h8v8H8V8z"
                />
              </svg>
              批量导入
            </el-button>
            <el-button type="warning" size="large" @click="showClaimDialog = true">
              <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              成果认领
            </el-button>
          </div>
          <!-- 主按钮 -->
          <el-button type="primary" size="large" @click="showAddDialog = true">
            <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
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

          <el-table-column prop="likeNum" label="点赞数" width="120" align="center">
            <template #default="{ row }">
              <div v-if="row.likeNum" class="font-semibold text-blue-600">{{ row.likeNum }}</div>
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
                <svg class="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                <svg class="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24">
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
      <PublicationDetailDialog
        v-model:visible="showInfo"
        :publication="shownPublication"
        :show-claim-button="false"
      />
      <ExcelImporter
        v-model:show-excel-importer="showExcelImporter"
        :existing-titles="publications.map(p => p.title)"
        :current-username="userStore.user?.name"
        @close="showExcelImporter = false"
      />

      <!-- 成果认领对话框 -->
      <el-dialog
        v-model="showClaimDialog"
        title="成果认领"
        width="60%"
        destroy-on-close
        v-loading="claimLoading"
      >
        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-blue-800 font-medium mb-2">认领说明</h4>
            <p class="text-blue-700 text-sm">
              以下是系统中存在您可能参与但未关联到您账户的科研成果，说明如下：
            </p>
            <ul class="text-blue-700 text-sm mt-2 space-y-1">
              <li>• 推荐成果列表通过您的姓名进行匹配，请仔细核对</li>
              <li>
                • 如果成果中不存在属于您的成果，但您在其他科研人员详情页中发现了，请联系相应科研人员
              </li>
              <!-- <li>• 等待管理员审核确认</li> -->
            </ul>
          </div>

          <div v-if="claimResults.length > 0" class="mt-6">
            <h4 class="font-medium mb-3">推荐成果列表</h4>
            <div class="space-y-3">
              <div
                v-for="result in claimResults"
                :key="result.id"
                class="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h5 class="font-medium text-gray-900">{{ result.title }}</h5>
                    <p class="text-sm text-gray-600 mt-1">{{ formatAuthors(result.authors) }}</p>
                    <p class="text-sm text-gray-500">{{ result.venue }} ({{ result.year }})</p>
                    <div class="flex items-center mt-2 space-x-4 text-xs text-gray-400">
                      <span>阅读量: {{ result.readerNum || 0 }}</span>
                      <span>点赞数: {{ result.likeNum || 0 }}</span>
                      <el-tag :type="getTypeColor(result.type)" size="small">
                        {{ getTypeLabel(result.type) }}
                      </el-tag>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <el-button size="small" @click="viewClaimDetail(result)"> 查看详情 </el-button>
                    <el-button size="small" type="primary" @click="claimPublication(result)">
                      认领此成果
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <svg
              class="w-16 h-16 mx-auto text-gray-300 mb-4"
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
            <p>暂未找到推荐给您的成果</p>
            <p class="text-sm mt-1">如果您认为有遗漏，请联系管理员</p>
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showClaimDialog = false">关闭</el-button>
            <el-button type="primary" @click="refreshClaimResults" :loading="claimLoading">
              刷新列表
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 成果详情弹窗 -->
      <PublicationDetailDialog
        v-model:visible="showClaimDetailDialog"
        :publication="selectedClaimPublication"
        :show-claim-button="true"
        @claim="claimPublication"
      />
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
  PublicationStatus,
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
  getProbablePublicationsByName,
  claimPublication as claimPublicationApi,
} from '@/api/modules/publication'
import { useUserStore } from '@/stores/user'
import PublicationStatsCardGroup from '@/components/publication/PublicationStatsCardGroup.vue'
import ExcelImporter from '@/components/publication/ExcelImporter.vue'
import PublicationDetailDialog from '@/components/publication/PublicationDetailDialog.vue'
import type { UploadResponse } from '@/api/types/utils'
import { doiPattern, urlPattern } from '@/utils/publications'

const loading = ref(false)
const saving = ref(false)
const showAddDialog = ref(false)
const showInfo = ref(false)
const showExcelImporter = ref(false)
const showClaimDialog = ref(false)
const showClaimDetailDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterYear = ref('')

// 成果认领相关变量
const claimLoading = ref(false)
const claimResults = ref<Publication[]>([])
const selectedClaimPublication = ref<Publication | null>(null)

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
    } catch (err) {
      if (err instanceof Error) {
        ElMessage.error(`获取论文列表或统计数据失败：${err.message}`)
      } else {
        ElMessage.error('获取论文列表或统计数据失败：未知错误')
      }
    } finally {
      loading.value = false
    }
  }
})

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

const getStatusLabel = (status: PublicationStatus) => {
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
      return deletePublication(id)
    })
    .then(() => {
      ElMessage.success('删除成功')
      const idx = publications.findIndex(item => item.id === id)
      if (idx !== -1) publications.splice(idx, 1)
      // 删除后刷新统计数据
      if (userStore.user?.id) {
        return getPublicationStatsByUser(userStore.user.id).then(res => {
          if (res.data) Object.assign(stats, res.data)
        })
      }
    })
    .catch(err => {
      ElMessage.error(`删除失败：${err.message}`)
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

const handleSave = async () => {
  if (!formRef.value) return
  currentPublication.authors =
    userName.value + (otherAuthors.value ? `, ${otherAuthors.value}` : '')
  formRef.value
    .validate()
    .then(async () => {
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
    .catch(err => {
      ElMessage.error(`保存失败：${err.message}`)
    })
    .finally(() => {
      saving.value = false
    })
}

function onShowInfo(row: Publication) {
  shownPublication.value = row
  showInfo.value = true
}

// 成果认领相关方法
const loadClaimResults = async () => {
  if (!userStore.user?.name) {
    ElMessage.warning('用户信息获取失败')
    return
  }

  claimLoading.value = true
  try {
    const response = await getProbablePublicationsByName(userStore.user.name)
    if (response.data && Array.isArray(response.data)) {
      console.log(response.data)
      claimResults.value = response.data.filter(pub => pub.uploaderId !== userStore.user?.id)
    } else {
      claimResults.value = []
    }
  } catch (error) {
    ElMessage.error('获取推荐成果失败')
    claimResults.value = []
  } finally {
    claimLoading.value = false
  }
}

const refreshClaimResults = () => {
  loadClaimResults()
}

const claimPublication = (publication: Publication) => {
  ElMessageBox.confirm(
    `确定要认领成果"${publication.title}"吗？认领后需要等待管理员审核。`,
    '确认认领',
    {
      confirmButtonText: '确定认领',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        await claimPublicationApi(publication.id)
        ElMessage.success('认领申请已提交，请等待管理员审核')
        showClaimDialog.value = false
        // 从列表中移除已认领的成果
        claimResults.value = claimResults.value.filter(pub => pub.id !== publication.id)
      } catch (error) {
        ElMessage.error('认领失败，请稍后重试')
      }
    })
    .catch(() => {
      // 用户取消
    })
}

// 监听认领对话框打开，自动加载数据
watch(showClaimDialog, newVal => {
  if (newVal) {
    loadClaimResults()
  }
})

const viewClaimDetail = (publication: Publication) => {
  selectedClaimPublication.value = publication
  showClaimDetailDialog.value = true
}

const formatAuthors = (authors: any): string => {
  if (!authors) {
    return '暂无数据'
  }

  // 如果authors是字符串，直接返回
  if (typeof authors === 'string') {
    return authors
  }

  // 如果authors是数组，提取name字段
  if (Array.isArray(authors)) {
    return authors
      .map((author: any) => author.name)
      .filter(Boolean)
      .join(', ')
  }

  return '暂无数据'
}
</script>

<style scoped>
svg path {
  fill: none;
}

/* 悬停按钮组样式 */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:translate-x-0 {
  transform: translateX(0);
}

/* 确保按钮组在悬停时有正确的层级 */
.relative.group {
  z-index: 10;
}

.absolute.right-full {
  z-index: 20;
}
</style>
