<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type {
  DiscoverLiterature,
  DiscoverTerm,
  DiscoverTermGroup,
} from '@/api/types/discoverLiterature'
import {
  addToLibrary,
  deleteOldPaper,
  getDiscoverLiterature,
  getDiscoverTerm,
  updateDiscoverTerm,
} from '@/api/modules/discoverLiterature'
import { ElMessage } from 'element-plus'
import Markdown from './Markdown.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { libraryAPI } from '@/api/modules/library'
import { useUserStore } from '@/stores/user'
import type { Folder } from '@/api/types/library'
import router from '@/router'

const titleInput = ref('')
const authorInput = ref('')
const fieldInput = ref('')

const titleTerms = ref<DiscoverTerm[]>([])
const authorTerms = ref<DiscoverTerm[]>([])
const fieldTerms = ref<DiscoverTerm[]>([])

const isEditing = ref(false)

const discoverTermGroup = ref<DiscoverTermGroup>()

const literatureList = ref<DiscoverLiterature[]>([])
const currentLiteratureIndex = ref(0)
const literatureType = ref<'title' | 'author' | 'field'>('title')

const allLiterature = ref<{ [key in 'title' | 'author' | 'field']: DiscoverLiterature[] }>({
  title: [],
  author: [],
  field: [],
})

const userStore = useUserStore()
const props = defineProps<{ folders: Folder[] }>()

const termLoading = ref(false)

onMounted(() => {
  getDiscoverTerm()
    .then(res => {
      discoverTermGroup.value = res.data
      titleTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.title))
      authorTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.author))
      fieldTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.field))
    })
    .catch(err => {
      ElMessage.error('获取检索词失败', err.message)
      discoverTermGroup.value = { title: [], author: [], field: [] }
      titleTerms.value = []
      authorTerms.value = []
      fieldTerms.value = []
    })

  // 一次性获取所有文献数据并缓存
  getDiscoverLiterature()
    .then(res => {
      // 对每条文献的 published 字段按空格截断，保留空格前
      const data = res.data || { title: [], author: [], field: [] }
      for (const key of ['title', 'author', 'field'] as const) {
        data[key] = (data[key] || []).map(item => ({
          ...item,
          published: item.published.split(' ')[0],
        }))
      }
      allLiterature.value = data
      literatureList.value = allLiterature.value[literatureType.value] || []
      currentLiteratureIndex.value = 0
    })
    .catch(err => {
      ElMessage.error('获取文献失败', err.message)
    })
})

function addTerm(type: 'title' | 'author' | 'field') {
  let inputRef: typeof titleInput
  let termsRef: typeof titleTerms
  if (type === 'title') {
    inputRef = titleInput
    termsRef = titleTerms
  } else if (type === 'author') {
    inputRef = authorInput
    termsRef = authorTerms
  } else {
    inputRef = fieldInput
    termsRef = fieldTerms
  }
  if (termsRef.value.length >= 3) {
    ElMessage.warning('最多只能添加3个标签')
    return
  }
  if (inputRef.value && !termsRef.value.some(term => term.value === inputRef.value)) {
    termsRef.value.push({ id: '0', value: inputRef.value })
    inputRef.value = ''
  }
}

function deleteTerm(type: 'title' | 'author' | 'field', idx: number) {
  let termsRef
  if (type === 'title') {
    termsRef = titleTerms
  } else if (type === 'author') {
    termsRef = authorTerms
  } else {
    termsRef = fieldTerms
  }
  termsRef.value.splice(idx, 1)
}

function handleSave() {
  termLoading.value = true
  const oldTerms = discoverTermGroup.value || { title: [], author: [], field: [] }
  const added = {
    title: titleTerms.value.filter(t => !oldTerms.title.some(ot => ot.value === t.value)),
    author: authorTerms.value.filter(t => !oldTerms.author.some(ot => ot.value === t.value)),
    field: fieldTerms.value.filter(t => !oldTerms.field.some(ot => ot.value === t.value)),
  }
  const deleted = {
    title: oldTerms.title.filter(ot => !titleTerms.value.some(t => t.value === ot.value)),
    author: oldTerms.author.filter(ot => !authorTerms.value.some(t => t.value === ot.value)),
    field: oldTerms.field.filter(ot => !fieldTerms.value.some(t => t.value === ot.value)),
  }

  updateDiscoverTerm({ addedTerm: added, deletedTerm: deleted })
    .then(res => {
      discoverTermGroup.value = res.data
      titleTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.title))
      authorTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.author))
      fieldTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.field))
      // Term修改成功后，重新获取文献
      return getDiscoverLiterature()
    })
    .then(res => {
      const data = res.data || { title: [], author: [], field: [] }
      for (const key of ['title', 'author', 'field'] as const) {
        data[key] = (data[key] || []).map(item => ({
          ...item,
          published: item.published.split(' ')[0],
        }))
      }
      allLiterature.value = data
      literatureList.value = allLiterature.value[literatureType.value] || []
      currentLiteratureIndex.value = 0
    })
    .catch(err => {
      ElMessage.error(err.message)
    })
    .finally(() => {
      termLoading.value = false
      isEditing.value = false
    })
}

function changeLiteratureType(type: 'title' | 'author' | 'field') {
  literatureType.value = type
  literatureList.value = allLiterature.value[type] || []
  currentLiteratureIndex.value = 0
}

function prevLiterature() {
  if (literatureList.value.length === 0) return
  currentLiteratureIndex.value =
    (currentLiteratureIndex.value - 1 + literatureList.value.length) % literatureList.value.length
}

function nextLiterature() {
  if (literatureList.value.length === 0) return
  currentLiteratureIndex.value = (currentLiteratureIndex.value + 1) % literatureList.value.length
}

const showFolderDialog = ref(false)
const selectedFolderId = ref<number>(props.folders[0]?.id)

function handleAddToCategory() {
  const userId = userStore.user?.id
  const literature = literatureList.value[currentLiteratureIndex.value]
  let pdfUrl = literature.link
  addToLibrary(literature.id)
    .then(res => {
      pdfUrl = res.data.data
      const paper = {
        type: 'arXiv',
        title: literature.title,
        authors: literature.authors.join(','),
        year: literature.published,
        abstract: literature.summary,
        keywords: literature.fields.join(','),
        pdfUrl: pdfUrl,
        status: '0',
        isPublic: '0',
      }
      return libraryAPI.createPaper(String(userId), selectedFolderId.value, paper)
    })
    .then(() => {
      ElMessage.success('已添加到收藏夹')
      showFolderDialog.value = false
      return deleteLiterature()
    })
    .catch(e => {
      ElMessage.error(e?.message || '添加失败')
    })
}

function openFolderDialog() {
  // 自动选中“默认收藏夹”
  const defaultFolder = props.folders.find(f => f.name === '默认收藏夹')
  selectedFolderId.value = defaultFolder ? defaultFolder.id : (props.folders[0]?.id ?? null)
  showFolderDialog.value = true
}

function deleteLiterature() {
  const id = literatureList.value[currentLiteratureIndex.value].id
  deleteOldPaper(id)
    .then(() => {
      ElMessage.success('已移除')
      // 删除当前文献
      literatureList.value.splice(currentLiteratureIndex.value, 1)
      // 调整索引
      if (currentLiteratureIndex.value >= literatureList.value.length) {
        currentLiteratureIndex.value = Math.max(0, literatureList.value.length - 1)
      }
    })
    .catch(() => {
      ElMessage.error('移除失败')
    })
}

const showPaperDetail = (discoverLiterature: DiscoverLiterature) => {
  if (discoverLiterature && discoverLiterature.publicationId) {
    router.push({
      path: `/publication/${discoverLiterature.publicationId}`,
      query: {
        receiverId: discoverLiterature.receiverId.toString() || '',
      },
    })
  }
}
</script>

<template>
  <div
    class="bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto mt-4 border border-gray-100"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-extrabold text-blue-700 tracking-tight">文献发现</h2>
      <div class="flex gap-3">
        <el-button
          v-if="!isEditing"
          type="primary"
          size="large"
          class="text-base rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          @click="isEditing = true"
          >编辑
        </el-button>
        <el-button
          v-else
          type="success"
          size="large"
          class="text-base rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          :loading="termLoading"
          @click="handleSave"
          >保存
        </el-button>
      </div>
    </div>
    <div class="mb-2 space-y-4">
      <!-- 标题 -->
      <div class="flex items-start">
        <span class="w-20 flex-shrink-0 text-blue-600 mt-1 text-base font-semibold">标题</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in titleTerms"
              :key="idx"
              class="bg-blue-400/90 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow hover:scale-105 transition-transform duration-150"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1 hover:text-red-200"
                @click="deleteTerm('title', idx)"
                >×</span
              >
            </span>
            <el-input
              v-if="isEditing"
              v-model="titleInput"
              placeholder="输入后按下回车添加"
              clearable
              size="default"
              class="w-56 text-sm"
              :disabled="titleTerms.length >= 3"
              @keyup.enter="addTerm('title')"
            />
          </div>
        </div>
      </div>
      <!-- 作者 -->
      <div class="flex items-start">
        <span class="w-20 flex-shrink-0 text-green-600 mt-1 text-base font-semibold">作者</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in authorTerms"
              :key="idx"
              class="bg-green-400/90 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow hover:scale-105 transition-transform duration-150"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1 hover:text-red-200"
                @click="deleteTerm('author', idx)"
                >×</span
              >
            </span>
            <el-input
              v-if="isEditing"
              v-model="authorInput"
              placeholder="输入后按下回车添加"
              clearable
              size="default"
              class="w-56 text-sm"
              :disabled="authorTerms.length >= 3"
              @keyup.enter="addTerm('author')"
            />
          </div>
        </div>
      </div>
      <!-- 领域 -->
      <div class="flex items-start">
        <span class="w-20 flex-shrink-0 text-purple-600 mt-1 text-base font-semibold">领域</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in fieldTerms"
              :key="idx"
              class="bg-purple-400/90 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow hover:scale-105 transition-transform duration-150"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1 hover:text-red-200"
                @click="deleteTerm('field', idx)"
                >×</span
              >
            </span>
            <el-input
              v-if="isEditing"
              v-model="fieldInput"
              placeholder="输入后按下回车添加"
              clearable
              size="default"
              class="w-56 text-sm"
              :disabled="fieldTerms.length >= 3"
              @keyup.enter="addTerm('field')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 my-6"></div>
    <!-- 查询类型选择始终显示 -->
    <div class="flex gap-2 justify-center mb-6">
      <el-button
        :type="literatureType === 'title' ? 'primary' : 'default'"
        class="rounded-full px-6 py-2 shadow-sm hover:shadow-md transition-all duration-150"
        @click="changeLiteratureType('title')"
      >
        按标题查询
      </el-button>
      <el-button
        :type="literatureType === 'author' ? 'primary' : 'default'"
        class="rounded-full px-6 py-2 shadow-sm hover:shadow-md transition-all duration-150"
        @click="changeLiteratureType('author')"
      >
        按作者查询
      </el-button>
      <el-button
        :type="literatureType === 'field' ? 'primary' : 'default'"
        class="rounded-full px-6 py-2 shadow-sm hover:shadow-md transition-all duration-150"
        @click="changeLiteratureType('field')"
        >按领域查询
      </el-button>
    </div>
    <!-- 文献信息区，仅有文献时显示 -->
    <div
      v-if="isEditing"
      class="mt-2 flex flex-col items-center pt-2 text-gray-400 text-lg font-semibold"
    >
      关键词编辑中
    </div>
    <div v-else-if="literatureList.length" class="mt-10 flex flex-row items-stretch pt-6">
      <el-button
        :disabled="literatureList.length <= 1"
        class="flex items-center justify-center !rounded-l-2xl !rounded-r-none self-stretch bg-white/80 hover:bg-blue-50 border border-gray-200 shadow-md"
        style="width: 52px; min-width: 52px; height: 72px; padding: 0; align-self: stretch"
        @click="prevLiterature"
      >
        <el-icon style="font-size: 38px; color: #60a5fa">
          <ArrowLeft />
        </el-icon>
      </el-button>
      <div
        ref="literatureDisplay"
        class="w-[700px] min-h-[380px] h-auto max-w-full bg-white rounded-2xl p-10 shadow-xl flex flex-col items-start justify-between border border-blue-100 mx-2"
      >
        <div class="flex items-center justify-end w-full mb-6 gap-4">
          <el-button
            type="primary"
            size="large"
            class="rounded-full px-6 shadow hover:shadow-lg transition-all duration-150"
            style="font-size: 18px"
            @click="openFolderDialog"
            >添加到收藏夹
          </el-button>
          <el-button
            type="danger"
            size="large"
            class="rounded-full px-6 shadow hover:shadow-lg transition-all duration-150"
            style="font-size: 18px"
            @click="deleteLiterature"
            >不感兴趣
          </el-button>
        </div>
        <div class="text-2xl font-bold mb-3 w-full break-words whitespace-pre-line text-blue-900">
          {{ literatureList[currentLiteratureIndex].title }}
        </div>
        <!-- 相关标签显示部分，移到标题下方 -->
        <div class="mt-2 flex items-center">
          <span class="font-bold text-base mr-2 text-gray-700">相关标签：</span>
          <template v-if="literatureType === 'title'">
            <el-tag
              v-for="term in titleTerms.filter(
                t => t.id === literatureList[currentLiteratureIndex].sid
              )"
              :key="term.id"
              type="info"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-blue-500 text-white"
              :disable-transitions="true"
            >
              {{ term.value }}
            </el-tag>
            <span
              v-if="
                titleTerms.filter(t => t.id === literatureList[currentLiteratureIndex].sid)
                  .length === 0
              "
              >无</span
            >
          </template>
          <template v-else-if="literatureType === 'author'">
            <el-tag
              v-for="term in authorTerms.filter(
                t => t.id === literatureList[currentLiteratureIndex].sid
              )"
              :key="term.id"
              type="success"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-green-500 text-white"
              :disable-transitions="true"
            >
              {{ term.value }}
            </el-tag>
            <span
              v-if="
                authorTerms.filter(t => t.id === literatureList[currentLiteratureIndex].sid)
                  .length === 0
              "
              >无</span
            >
          </template>
          <template v-else-if="literatureType === 'field'">
            <el-tag
              v-for="term in fieldTerms.filter(
                t => t.id === literatureList[currentLiteratureIndex].sid
              )"
              :key="term.id"
              type="warning"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-purple-500 text-white"
              :disable-transitions="true"
            >
              {{ term.value }}
            </el-tag>
            <span
              v-if="
                fieldTerms.filter(t => t.id === literatureList[currentLiteratureIndex].sid)
                  .length === 0
              "
              >无</span
            >
          </template>
        </div>
        <div class="font-bold text-base mb-1">
          作者：{{ literatureList[currentLiteratureIndex].authors.join(', ') }}
        </div>
        <div class="font-bold text-base mb-1">
          分类：{{ literatureList[currentLiteratureIndex].fields.join(', ') }}
        </div>
        <div class="font-bold text-base mb-2">
          发布时间：{{ literatureList[currentLiteratureIndex].published }}
        </div>
        <div class="font-bold text-base mb-2 flex items-center">
          <span class="mr-2">原文链接：</span>
          <a
            :href="literatureList[currentLiteratureIndex].link"
            target="_blank"
            class="text-blue-500 underline break-all text-base font-normal"
            >{{ literatureList[currentLiteratureIndex].link }}</a
          >
        </div>
        <div
          v-if="
            literatureList[currentLiteratureIndex].publicationId &&
            literatureList[currentLiteratureIndex].publicationId !== '0'
          "
          class="mb-2 text-green-600 text-base font-bold flex items-center"
        >
          已上传本站
          <span
            class="ml-2 text-blue-500 underline text-base font-normal"
            @click="showPaperDetail(literatureList[currentLiteratureIndex])"
            >查看详情</span
          >
        </div>
        <div class="font-bold text-base mb-2">文献简介:</div>
        <div class="text-sm text-gray-700 mb-2 w-full">
          <Markdown :source="literatureList[currentLiteratureIndex].summary" />
        </div>
        <div class="w-full flex justify-center">
          <div class="mt-2 text-xs text-gray-400">
            {{ currentLiteratureIndex + 1 }} / {{ literatureList.length }}
          </div>
        </div>
      </div>
      <el-button
        :disabled="literatureList.length <= 1"
        class="flex items-center justify-center !rounded-none self-stretch"
        style="
          width: 48px;
          min-width: 48px;
          height: 64px;
          border-radius: 0 8px 8px 0;
          padding: 0;
          align-self: stretch;
        "
        @click="nextLiterature"
      >
        <el-icon style="font-size: 36px">
          <ArrowRight />
        </el-icon>
      </el-button>

      <el-dialog
        v-model="showFolderDialog"
        title="选择收藏夹"
        width="400px"
        :style="{ top: '120px' }"
        @close="selectedFolderId = props.folders[0]?.id"
      >
        <div class="text-center">
          <span class="text-gray-500 text-sm">将文献添加到以下收藏夹之一：</span>
        </div>
        <div class="mt-8">
          <el-select v-model="selectedFolderId" placeholder="请选择收藏夹" class="w-full">
            <el-option
              v-for="folder in folders"
              :key="folder.id"
              :label="folder.name"
              :value="folder.id"
            />
          </el-select>
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <el-button @click="showFolderDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddToCategory">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 无文献时提示 -->
    <div v-else class="mt-2 flex flex-col items-center pt-2 text-gray-400 text-base">
      暂无文献数据
    </div>
  </div>
</template>
