<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type {
  DiscoverLiterature,
  DiscoverTerm,
  DiscoverTermGroup,
} from '@/api/types/discoverLiterature'
import {
  getDiscoverLiterature,
  getDiscoverTerm,
  updateDiscoverTerm,
} from '@/api/modules/discoverLiterature'
import { ElMessage } from 'element-plus'
import Markdown from './Markdown.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

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

  // 获取文献数据
  getDiscoverLiterature()
    .then(res => {
      literatureList.value = res.data[literatureType.value] || []
      console.log(literatureList.value[0])
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
  getDiscoverLiterature().then(res => {
    literatureList.value = res.data[literatureType.value] || []
    currentLiteratureIndex.value = 0
  })
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
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow max-w-3xl mx-auto mt-0">
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
    <div v-if="literatureList.length" class="mt-8 flex flex-col items-center pt-6">
      <div class="flex items-center gap-4">
        <el-button :disabled="literatureList.length <= 1" circle @click="prevLiterature">
          <el-icon>
            <ArrowLeft />
          </el-icon>
        </el-button>
        <div
          class="w-[700px] min-h-[380px] h-auto max-w-full bg-gray-50 rounded-lg p-8 shadow flex flex-col items-start justify-between"
        >
          <div class="text-lg font-bold mb-2 truncate w-full">
            {{ literatureList[currentLiteratureIndex].title }}
          </div>
          <div class="text-sm text-gray-600 mb-1">
            作者：{{ literatureList[currentLiteratureIndex].authors }}
          </div>
          <div class="text-xs text-gray-500 mb-1">
            分类：{{ literatureList[currentLiteratureIndex].categories }}
          </div>
          <div class="text-xs text-gray-400 mb-2">
            发布时间：{{ literatureList[currentLiteratureIndex].published }}
          </div>

          <div
            v-if="
              literatureList[currentLiteratureIndex].publicationId &&
              literatureList[currentLiteratureIndex].publicationId !== '0'
            "
            class="mb-2 text-green-600 text-xs font-bold"
          >
            已上传本站
          </div>
          <div class="text-sm text-gray-700 mb-2 w-full">
            <Markdown :source="literatureList[currentLiteratureIndex].summary" />
          </div>
          <div class="flex gap-2 mt-2">
            原文链接：
            <a
              :href="literatureList[currentLiteratureIndex].link"
              target="_blank"
              class="text-blue-500 underline"
              >{{ literatureList[currentLiteratureIndex].link }}</a
            >
          </div>
        </div>
        <el-button :disabled="literatureList.length <= 1" circle @click="nextLiterature">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
      <div class="mt-2 text-xs text-gray-400">
        {{ currentLiteratureIndex + 1 }} / {{ literatureList.length }}
      </div>
    </div>
    <div v-else class="mt-8 flex flex-col items-center border-t pt-6 text-gray-400 text-base">
      暂无文献数据
    </div>
  </div>
</template>
