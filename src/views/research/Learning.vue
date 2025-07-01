<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 
                0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 
                2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            学习档案
          </h1>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类树 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <div
              :class="[
                'text-lg font-medium mb-4 flex items-center justify-between pt-3 pl-0 pr-3 pb-3 left-0 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                selectedPaper === 0 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900',
              ]"
              @click="selectPaper(0)"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 
                    1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 
                    1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 
                    9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 
                    12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 
                    1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 
                    20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 
                    0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                全部笔记
              </div>
            </div>

            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg
                class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 
                  1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 
                  2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 
                  18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 
                  2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                />
              </svg>
              文献笔记
            </h3>

            <div class="space-y-2">
              <div
                v-for="paper in papers"
                :key="paper.id"
                :class="[
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                  selectedPaper === paper.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700',
                ]"
                @click="selectPaper(paper.id)"
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ paper.title.length<15 ? paper.title : paper.title.slice(0,14)+'...' }}</span>
                </div>
                <div class="flex items-center space-x-1" v-if="selectedPaper === paper.id">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="-5 0 20 20" stroke="currentColor" stroke-width="1"
                    @click="toPdfReader(paper.id)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 15l5-5-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧笔记列表 -->
        <div class="lg:w-3/4">
          <!-- 搜索和筛选 -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索笔记内容..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <div class="flex-shrink-0 flex items-center">
                <el-checkbox 
                v-model="noAnnoWithoutComment" 
                size="large"
                label="隐藏无批注笔记"
                />
              </div>
              <el-select v-model="sortBy" placeholder="排序方式" size="large" style="width: 150px">
                <el-option label="时间" value="id" />
                <el-option label="页码" value="page"/>
              </el-select>
            </div>
          </div>

          <!-- 笔记列表 -->
          <div v-if="viewMode === 'list'" class="bg-white rounded-lg shadow">
            <div
              v-for="anno in filteredAnnos"
              :key="anno.id"
              :class="[
                'p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer',
                selectedAnnos.includes(anno.id) ? 'bg-blue-50' : '',
              ]"
              @click="toggleAnnoSelection(anno.id)"
              v-show="anno.comment !== '' || (!noAnnoWithoutComment)"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-16 bg-yellow-100 rounded flex items-center justify-center">
                    <svg 
                      class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="1 1 20 20"
                      style="overflow: visible" >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 
                        1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3
                    @click="handleAnnoAction(`read-${anno.id}`)"
                    class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {{ anno.comment.length>0 ? anno.comment : "（无内容笔记）"}}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ paperId2Title(anno.paperId) }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    PAGE {{ anno.page }}
                  </p>
                </div>

                <div class="flex-shrink-0">
                  <el-dropdown trigger="click" @command="handleAnnoAction">
                    <button class="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 
                          1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`edit-${anno.id}`">
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 
                              1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 
                              0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                          编辑
                        </el-dropdown-item>
                        <el-dropdown-item
                          :command="`delete-${anno.id}`"
                          divided
                        >
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                              4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredAnnos.length"
              layout="prev, pager, next"
              background
            />
          </div>
        </div>
      </div>

      <!-- 编辑批注对话框 -->
      <el-dialog v-model="showCommentEditDialog" title="编辑批注" width="30%">
        <el-form :model="newAnno" label-width="80px">
          <el-form-item label="批注内容">
            <el-input v-model="newAnno.comment" placeholder="请输入批注内容（选填）" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showCommentEditDialog = false, newAnno.comment = ''">取消</el-button>
            <el-button type="primary" @click="editAnnotationComment()">确定</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { libraryAPI } from '@/api/modules/library'
import { annotationAPI } from '@/api/modules/annotation'
import type { FavoritePaper } from '@/api/types/library'
import type { Annotation } from '@/api/types/annotation'

const searchQuery = ref('')
const selectedPaper = ref(0)
const selectedAnnos = ref<string[]>([])
const viewMode = ref('list')
const currentPage = ref(1)
const pageSize = 20
const sortBy = ref('id')

const papers = ref<FavoritePaper[]>([])
const annotations = ref<Annotation[]>([])

const showCommentEditDialog = ref(false)
const newAnno = reactive({
  comment: ''
})
const editingAnnoId = ref('')

const noAnnoWithoutComment = ref(false)

const userStore = useUserStore()
let userId = ''
const initUserInfo = () => {
  if (userStore.user) {
    userId = String(userStore.user.id)
  }
}

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  initUserInfo()
  // console.log(userId)
  if(route.query.paperId) selectedPaper.value = parseInt(route.query.paperId as string)
  try {
    const res = await libraryAPI.getList(userId)
    // console.log(res.data.data)
    let responsePapers = res.data.data
    responsePapers.forEach(async resp => {
      try {
        const respaper = await libraryAPI.getByID(resp.paperId)
        const re = respaper.data.publication
        let paper = {
          type: re.type,
          id: resp.paperId,
          title: re.title,
          authors: '',
          venue: '',
          readCount: 0,
          keywords: '',
          folderId: resp.categoryId,
          pdfUrl: re.pdfUrl,
          status: '',
          isPublic: re.isPublic,
          year: '',
        }
        if (re.authors) {
          paper.authors = re.authors
        }
        if (re.year) {
          paper.year = re.year.toString()
        }
        if (re.keywords) {
          paper.keywords = re.keywords
        }
        if (re.venue) {
          paper.venue = re.venue
        }
        if (re.status) {
          paper.status = re.status
        }
        papers.value.push(paper)
        try {
          console.log("开始读取云端批注了")
          const resanno = await annotationAPI.getAnnotationList(userId, resp.paperId.toString())
          // console.log(resanno)
          resanno.data.forEach(a => annotations.value.push(a))
        } catch (error) {
          ElMessage.error("有一篇文献读取云端笔记失败")
        }
      } catch (error) {
        ElMessage.error('有一篇文献出现了读取问题')
      }
      // console.log(annotations.value)
    })
  } catch (error) {
    ElMessage.error('读取文献列表失败')
  }
})

const filteredAnnos = computed(() => {
  let fAnnos = annotations.value
  if (selectedPaper.value !== 0) {
    fAnnos = fAnnos.filter(anno => anno.paperId === selectedPaper.value)
  }
  if (searchQuery.value) {
    fAnnos = fAnnos.filter(
      anno =>
        anno.comment.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  fAnnos.sort((a, b) => {
    switch (sortBy.value) {
      case 'id':
        return parseInt(b.id) - parseInt(a.id)
      case 'page':
        if (a.paperId != b.paperId) return a.paperId - b.paperId
        return a.page - b.page
      default:
        return parseInt(b.id) - parseInt(a.id)
    }
  })
  return fAnnos
})

const selectPaper = (paperId: number) => {
  selectedPaper.value = paperId
  currentPage.value = 1
}

const toggleAnnoSelection = (annoId: string) => {
  const index = selectedAnnos.value.indexOf(annoId)
  if (index > -1) {
    selectedAnnos.value.splice(index, 1)
  } else {
    selectedAnnos.value.push(annoId)
  }
}

const handleAnnoAction = async (command: string) => {
  // console.log(command)
  const [action, annoId] = command.split('-')

  switch (action) {
    case 'read':
      const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
      if (anno) {
        const paper = papers.value.find(p => p.id === anno.paperId)
        if (paper) {
          router.push({
            path: '/pdf-reader',
            query: {
              url: paper.pdfUrl,
              paperId: paper.id,
              allowEdit: 1,
              page: anno.page,
            },
          })
        } else {
          ElMessage.error("阅读出错了！所属文献不存在")
        }
      } else {
        ElMessage.error("阅读出错了！笔记不存在")
      }
      break
    case 'edit':
      editAnno(annoId)
      break
    case 'delete':
      deleteAnno(annoId)
      break
  }
}

const editAnno = (annoId: string) => {
  editingAnnoId.value = annoId
  newAnno.comment = ''
  const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
  if(anno){
    newAnno.comment = anno.comment
    console.log(anno.comment)
  } 
  showCommentEditDialog.value = true
}

const deleteAnno = async (annoId: string) => {
  try {
    await ElMessageBox.confirm('确定要删除这个笔记吗？', '确认删除', {
      type: 'warning',
    })
    try {
      const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
      if (anno) await annotationAPI.deleteAnnotation(anno.id)
      annotations.value = annotations.value.filter(a => parseInt(a.id) !== parseInt(annoId))
      ElMessage.success('删除成功')
    } catch (error) {
      ElMessage.error('删除失败，请稍后重试')
    }
  } catch {
    // 用户取消
  }
}

// 编辑批注内容
const editAnnotationComment = async () => {
  try {
    await annotationAPI.editAnnotation(editingAnnoId.value, newAnno.comment)
    let anno = annotations.value.find(a => parseInt(a.id) === parseInt(editingAnnoId.value))
    if (anno) anno.comment = newAnno.comment
    showCommentEditDialog.value = false
    newAnno.comment = ''
    editingAnnoId.value = ''
  } catch (error) {
    ElMessage.error("编辑失败")
  }
};

const toPdfReader = (paperId: number) => {
  let paper = papers.value.find(p => p.id === paperId)
  if (paper) {
    router.push({
      path: '/pdf-reader',
      query: {
        url: paper.pdfUrl,
        paperId: paperId,
        allowEdit: 1,
      },
    })
  }
}

const paperId2Title = (paperId: number) => {
  const paper = papers.value.find(p => p.id === paperId)
  if(paper) return paper.title
  else return "[提取文献标题失败]"
}

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tag {
  background: #4299e1;
  color: white;
  padding: 2px 8px;
  border-radius: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.tag:hover {
  background: #3182ce;
  transform: translateY(-1px);
}
.tag-remove {
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.file-info {
  margin-bottom: 15px;
  padding: 15px;
  background: #ebf8ff;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.file-info-content {
  flex-grow: 1;
}
.action-btn.delete {
  position: central;
  top: 8px;
  right: 8px;
  cursor: pointer;
  color: #e53e3e;
  font-size: 18px;
  transition: transform 0.2s;
}
.file-delete-btn:hover {
  transform: scale(1.2);
}

.upload-demo {
  padding: 0;
  margin: 20px 0;
}
.upload-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ebf8ff;
  border-radius: 50%;
  color: #4299e1;
}
.upload-area {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  background: #f7fafc;
}
.upload-text {
  margin: 15px 0;
  color: #4a5568;
  font-size: 16px;
}
.upload-text em {
  color: #4299e1;
  font-style: normal;
  font-weight: 600;
}
.upload-tip {
  color: #718096;
  font-size: 14px;
  margin-top: 8px;
}
</style>
