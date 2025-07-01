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
      allLiterature.value = res.data || { title: [], author: [], field: [] }
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
  // 删除后重新获取信息
  getDiscoverTerm()
    .then(res => {
      discoverTermGroup.value = res.data
      titleTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.title))
      authorTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.author))
      fieldTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.field))
    })
    .catch(err => {
      ElMessage.error('获取检索词失败', err.message)
    })
}

function handleSave() {
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
      isEditing.value = false
      discoverTermGroup.value = res.data
      titleTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.title))
      authorTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.author))
      fieldTerms.value = JSON.parse(JSON.stringify(discoverTermGroup.value.field))
    })
    .catch(err => {
      ElMessage.error(err.message)
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
      pdfUrl = res.data
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
      ElMessage.success('已删除')
      // 删除当前文献
      literatureList.value.splice(currentLiteratureIndex.value, 1)
      // 调整索引
      if (currentLiteratureIndex.value >= literatureList.value.length) {
        currentLiteratureIndex.value = Math.max(0, literatureList.value.length - 1)
      }
    })
    .catch(() => {
      ElMessage.error('删除失败')
    })
}

const showPaperDetail = (discoverLiterature: DiscoverLiterature) => {
  if (discoverLiterature && discoverLiterature.id) {
    router.push({
      path: `/publication/${discoverLiterature.id}`,
      query: {
        receiverId: discoverLiterature.receiverId.toString() || '',
      },
    })
  }
}
</script>

<template>
  <div v-if="literatureList.length" class="bg-white p-4 rounded-xl shadow max-w-3xl mx-auto mt-0">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-2">文献发现</h2>
      <div class="flex gap-4">
        <el-button
          v-if="!isEditing"
          type="primary"
          size="default"
          class="text-base"
          @click="isEditing = true"
          >编辑
        </el-button>
        <el-button v-else type="success" size="default" class="text-base" @click="handleSave"
          >保存
        </el-button>
      </div>
    </div>
    <div class="mb-0 space-y-3">
      <!-- 标题 -->
      <div class="flex items-start">
        <span class="w-20 flex-shrink-0 text-gray-600 mt-1 text-base">标题</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in titleTerms"
              :key="idx"
              class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1"
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
        <span class="w-20 flex-shrink-0 text-gray-600 mt-1 text-base">作者</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in authorTerms"
              :key="idx"
              class="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1"
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
        <span class="w-20 flex-shrink-0 text-gray-600 mt-1 text-base">领域</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-3 mt-0">
            <span
              v-for="(term, idx) in fieldTerms"
              :key="idx"
              class="bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {{ term.value }}
              <span
                v-if="isEditing"
                class="cursor-pointer font-bold text-base ml-1"
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

    <div class="border-t my-4"></div>
    <div class="flex gap-2 justify-center mb-4">
      <el-button
        :type="literatureType === 'title' ? 'primary' : 'default'"
        @click="changeLiteratureType('title')"
      >
        按标题查询
      </el-button>
      <el-button
        :type="literatureType === 'author' ? 'primary' : 'default'"
        @click="changeLiteratureType('author')"
      >
        按作者查询
      </el-button>
      <el-button
        :type="literatureType === 'field' ? 'primary' : 'default'"
        @click="changeLiteratureType('field')"
        >按领域查询
      </el-button>
    </div>
    <!-- 新增文献展示区 -->
    <div v-if="literatureList.length" class="mt-8 flex flex-row items-stretch pt-6">
      <el-button
        :disabled="literatureList.length <= 1"
        class="flex items-center justify-center !rounded-none self-stretch"
        style="
          width: 48px;
          min-width: 48px;
          height: 64px;
          border-radius: 8px 0 0 8px;
          padding: 0;
          align-self: stretch;
        "
        @click="prevLiterature"
      >
        <el-icon style="font-size: 36px">
          <ArrowLeft />
        </el-icon>
      </el-button>
      <div
        ref="literatureDisplay"
        class="w-[700px] min-h-[380px] h-auto max-w-full bg-gray-50 rounded-lg p-8 shadow flex flex-col items-start justify-between"
      >
        <div class="flex items-center justify-end w-full mb-4 gap-4">
          <el-button type="primary" size="large" style="font-size: 18px" @click="openFolderDialog"
            >添加到收藏夹
          </el-button>
          <el-button type="danger" size="large" style="font-size: 18px" @click="deleteLiterature"
            >不感兴趣
          </el-button>
        </div>
        <div class="text-lg font-bold mb-2 w-full break-words whitespace-pre-line">
          {{ literatureList[currentLiteratureIndex].title }}
        </div>
        <!-- 标签tags展示区 -->
        <div class="mb-2 flex items-center">
          <template v-if="literatureList.length">
            <span class="font-bold text-base mr-2">相关标签：</span>
            <el-tag
              v-if="literatureType === 'title'"
              type="info"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-blue-500 text-white"
              :disable-transitions="true"
            >
              {{
                titleTerms.find(term => term.id == literatureList[currentLiteratureIndex].sid)
                  ?.value || '无'
              }}
            </el-tag>
            <el-tag
              v-else-if="literatureType === 'author'"
              type="success"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-green-500 text-white"
              :disable-transitions="true"
            >
              {{
                authorTerms.find(term => term.id == literatureList[currentLiteratureIndex].sid)
                  ?.value || '无'
              }}
            </el-tag>
            <el-tag
              v-else-if="literatureType === 'field'"
              type="warning"
              size="large"
              effect="plain"
              class="mr-2 text-base bg-yellow-500 text-white"
              :disable-transitions="true"
            >
              {{
                fieldTerms.find(term => term.id == literatureList[currentLiteratureIndex].sid)
                  ?.value || '无'
              }}
            </el-tag>
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
    </div>
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
    <div class="mt-2 text-xs text-gray-400">
      {{ currentLiteratureIndex + 1 }} / {{ literatureList.length }}
    </div>
  </div>
  <div v-else class="mt-8 flex flex-col items-center border-t pt-6 text-gray-400 text-base">
    暂无文献数据
  </div>
</template>
