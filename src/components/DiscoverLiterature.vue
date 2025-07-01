<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { DiscoverTerm } from '@/api/types/library'
import { getDiscoverTerm, updateDiscoverTerm } from '@/api/modules/library'
import { ElMessage } from 'element-plus'

const titleInput = ref('')
const authorInput = ref('')
const fieldInput = ref('')

const titleTerms = ref<string[]>([])
const authorTerms = ref<string[]>([])
const fieldTerms = ref<string[]>([])

const isEditing = ref(false)

// 新增：用于保存当前用户的检索词
const discoverTerm = ref<DiscoverTerm>()

// 页面加载时获取当前用户的检索词
onMounted(() => {
  getDiscoverTerm()
    .then(res => {
      discoverTerm.value = res.data
      titleTerms.value = discoverTerm.value.title
      authorTerms.value = discoverTerm.value.author
      fieldTerms.value = discoverTerm.value.field
    })
    .catch(err => {
      ElMessage.error('获取检索词失败', err.message)
      discoverTerm.value = { title: [], author: [], field: [] }
      titleTerms.value = []
      authorTerms.value = []
      fieldTerms.value = []
    })
})

function addTerm(type: 'title' | 'author' | 'field') {
  let inputRef, termsRef
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
  if (inputRef.value && !termsRef.value.includes(inputRef.value)) {
    termsRef.value.push(inputRef.value)
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
  const oldTerms = discoverTerm.value || { title: [], author: [], field: [] }

  const added = {
    title: titleTerms.value.filter(t => !oldTerms.title.includes(t)),
    author: authorTerms.value.filter(t => !oldTerms.author.includes(t)),
    field: fieldTerms.value.filter(t => !oldTerms.field.includes(t)),
  }
  const deleted = {
    title: oldTerms.title.filter(t => !titleTerms.value.includes(t)),
    author: oldTerms.author.filter(t => !authorTerms.value.includes(t)),
    field: oldTerms.field.filter(t => !fieldTerms.value.includes(t)),
  }

  updateDiscoverTerm({ addedTerm: added, deletedTerm: deleted })
    .then(() => {
      isEditing.value = false
      // 更新原始数据
      discoverTerm.value = {
        title: [...titleTerms.value],
        author: [...authorTerms.value],
        field: [...fieldTerms.value],
      }
    })
    .catch(err => {
      ElMessage.error(err.message)
    })
}
</script>

<template>
  <div class="bg-white p-8 rounded-xl shadow max-w-xl mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">文献发现</h2>
    <div class="mb-4 space-y-2">
      <!-- 标题 -->
      <div class="flex items-start">
        <span class="w-14 flex-shrink-0 text-gray-600 mt-1">标题</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-2 mt-0">
            <span
              v-for="(term, idx) in titleTerms"
              :key="idx"
              class="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
            >
              {{ term }}
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
              size="small"
              class="w-40"
              @keyup.enter="addTerm('title')"
            />
          </div>
        </div>
      </div>
      <!-- 作者 -->
      <div class="flex items-start">
        <span class="w-14 flex-shrink-0 text-gray-600 mt-1">作者</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-2 mt-0">
            <span
              v-for="(term, idx) in authorTerms"
              :key="idx"
              class="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
            >
              {{ term }}
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
              size="small"
              class="w-40"
              @keyup.enter="addTerm('author')"
            />
          </div>
        </div>
      </div>
      <!-- 领域 -->
      <div class="flex items-start">
        <span class="w-14 flex-shrink-0 text-gray-600 mt-1">领域</span>
        <div class="flex-1">
          <div class="flex flex-wrap gap-2 mt-0">
            <span
              v-for="(term, idx) in fieldTerms"
              :key="idx"
              class="bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
            >
              {{ term }}
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
              size="small"
              class="w-40"
              @keyup.enter="addTerm('field')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 mt-4">
      <el-button v-if="!isEditing" type="primary" @click="isEditing = true">编辑</el-button>
      <el-button v-else type="success" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
