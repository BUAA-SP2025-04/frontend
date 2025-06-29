<template>
  <el-dialog v-model="dialogVisible" title="成果详情" width="70%" destroy-on-close>
    <div v-if="publication" class="space-y-6">
      <!-- 基本信息 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">基本信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">标题</label>
            <p class="text-gray-900 mt-1">{{ publication.title }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">类型</label>
            <p class="mt-1">
              <el-tag :type="getTypeColor(publication.type)" size="small">
                {{ getTypeLabel(publication.type) }}
              </el-tag>
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">作者</label>
            <p class="text-gray-900 mt-1">{{ displayAuthors }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">发表年份</label>
            <p class="text-gray-900 mt-1">{{ publication.year || '暂无数据' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">发表机构</label>
            <p class="text-gray-900 mt-1">{{ publication.venue || '暂无数据' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">状态</label>
            <p class="mt-1">
              <el-tag :type="getStatusColor(publication.status)" size="small">
                {{ getStatusLabel(publication.status) }}
              </el-tag>
            </p>
          </div>
        </div>
      </div>

      <!-- 关键词和DOI信息 -->
      <div v-if="publication.keywords || publication.doi" class="space-y-4 ml-4">
        <div v-if="publication.keywords">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">关键词</h3>
          <div class="flex flex-wrap gap-2">
            <el-tag
              v-for="keyword in publication.keywords.split(',')"
              :key="keyword.trim()"
              size="small"
              type="info"
            >
              {{ keyword.trim() }}
            </el-tag>
          </div>
        </div>

        <div v-if="publication.doi">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">DOI</h3>
          <p class="text-blue-600 font-mono">{{ publication.doi }}</p>
        </div>
      </div>
      <!-- 摘要信息 -->
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
        <p class="text-gray-700 leading-relaxed">{{ publication.abstracts || "暂无摘要信息" }}</p>
      </div>
      <!-- 统计信息 -->
      <div class="bg-blue-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">统计信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ publication.readerNum || 0 }}</div>
            <div class="text-sm text-gray-600">阅读量</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ publication.likeNum || 0 }}</div>
            <div class="text-sm text-gray-600">点赞数</div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-3 pt-4 border-t">
        <el-button @click="closeDialog">关闭</el-button>
        <el-button v-if="showClaimButton" type="primary" @click="handleClaim">
          认领此成果
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PublicationDetail, PublicationStatus } from '@/api/types/publication'

interface Props {
  visible: boolean
  publication: PublicationDetail | null
  showClaimButton?: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'claim', publication: PublicationDetail): void
}

const props = withDefaults(defineProps<Props>(), {
  showClaimButton: false,
})

const emit = defineEmits<Emits>()

const dialogVisible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const closeDialog = () => {
  emit('update:visible', false)
}

const handleClaim = () => {
  if (props.publication) {
    emit('claim', props.publication)
  }
}

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

const displayAuthors = computed(() => {
  if (!props.publication || !props.publication.authors) {
    return '暂无数据'
  }

  // 如果authors是字符串，直接返回
  if (typeof props.publication.authors === 'string') {
    return props.publication.authors
  }

  // 如果authors是数组，提取authorName字段
  if (Array.isArray(props.publication.authors)) {
    return props.publication.authors
      .map(author => author.authorName)
      .filter(Boolean)
      .join(', ')
  }

  return '暂无数据'
})
</script> 