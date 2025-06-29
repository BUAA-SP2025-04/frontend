<template>
  <div>
    <!-- <el-button type="primary" @click="dialogVisible = true">查看详情</el-button> -->
    <el-dialog
      v-model="dialogVisible"
      :title="publication.title || '成果详情'"
      width="600px"
      append-to-body
      class="pub-detail-dialog"
    >
      <div v-if="publication" class="pub-detail-content">
        <div class="pub-detail-section pub-title">
          <span class="pub-label">标题：</span>
          <span class="pub-value pub-title-text">{{ publication.title }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">类型：</span>
          <el-tag :type="getTypeColor(publication.type)" size="small">
            {{ getTypeLabel(publication.type) }}
          </el-tag>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">作者：</span>
          <span class="pub-value">
            <template
              v-if="
                publication.authors && Array.isArray(publication.authors)
                  ? publication.authors
                      .map(a => a.authorName)
                      .join(',')
                      .split(',')
                      .filter(a => a.trim()).length
                  : 0
              "
            >
              <el-tag
                v-for="author in Array.isArray(publication.authors)
                  ? publication.authors.map(a => a.authorName)
                  : []"
                :key="author"
                class="pub-keyword"
                effect="plain"
                type="success"
                >{{ author }}</el-tag
              >
            </template>
            <template v-else> 暂无数据 </template>
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">单位/会议：</span>
          <span class="pub-value">
            {{ publication.venue ? publication.venue : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">年份：</span>
          <span class="pub-value">
            {{ publication.year ? publication.year : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">状态：</span>
          <el-tag :type="getStatusColor(publication.status)" size="small">
            {{ getStatusLabel(publication.status) }}
          </el-tag>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">关键词：</span>
          <template
            v-if="
              publication.keywords &&
              (Array.isArray(publication.keywords)
                ? publication.keywords.length
                : publication.keywords.split(',').filter(k => k.trim()).length)
            "
          >
            <el-tag
              v-for="kw in publication.keywords
                ? Array.isArray(publication.keywords)
                  ? publication.keywords
                  : publication.keywords.split(',').filter(k => k.trim())
                : []"
              :key="kw"
              class="pub-keyword"
              effect="dark"
              type="info"
              >{{ kw }}
            </el-tag>
          </template>
          <template v-else>
            <span class="pub-value">暂无数据</span>
          </template>
        </div>
        <div class="pub-detail-section pub-doi">
          <span class="pub-label">DOI：</span>
          <span class="pub-value pub-doi">
            {{ publication.doi ? publication.doi : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section pub-abstract">
          <span class="pub-label">摘要：</span>
          <div class="pub-value pub-abstract-text">
            {{ publication.abstracts ? publication.abstracts : '暂无数据' }}
          </div>
        </div>
        <div class="pub-detail-section pub-metrics">
          <span class="pub-label pub-metric pub-reader-label">
            <el-icon class="pub-icon"><View /></el-icon>
            阅读量：
          </span>
          <span class="pub-value pub-readerNum">
            {{ publication.readerNum }}
          </span>
          <span class="pub-label pub-metric pub-like-label">
            <el-icon class="pub-icon"><Star /></el-icon>
            点赞数：
          </span>
          <span class="pub-value pub-likeNum">
            {{ publication.likeNum }}
          </span>
        </div>
        <div v-if="publication.pdfUrl" class="pub-detail-section pub-pdf">
          <template v-if="isExternalPdf(publication.pdfUrl)">
            <span class="pub-label">原文链接：</span>
            <el-link :href="publication.pdfUrl" target="_blank" type="primary"
              >{{ publication.pdfUrl }}
            </el-link>
          </template>
          <template v-else>
            <el-link
              type="primary"
              style="cursor: pointer"
              @click="goToPdfReader(publication.pdfUrl)"
              >PDF已上传，点击阅读
            </el-link>
          </template>
        </div>
        <div v-else class="pub-detail-section pub-pdf">
          <span class="pub-value">暂无原文数据</span>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { ElButton, ElDialog, ElIcon, ElLink, ElTag } from 'element-plus'
import { Star, View } from '@element-plus/icons-vue'
import type { PublicationDetail, PublicationStatus, PublicationType } from '@/api/types/publication'
import { useRouter } from 'vue-router'

const props = defineProps<{
  visible: boolean
  publication: PublicationDetail
}>()

const emit = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)
const router = useRouter()

watch(
  () => props.visible,
  val => {
    dialogVisible.value = val
  }
)

watch(dialogVisible, val => {
  emit('update:visible', val)
})

// 类型与状态颜色和标签
const getTypeColor = (type: PublicationType): 'success' | 'primary' | 'warning' | 'danger' => {
  const colors: Record<PublicationType, 'success' | 'primary' | 'warning' | 'danger'> = {
    journal: 'success',
    conference: 'primary',
    patent: 'warning',
  }
  return colors[type] || 'error'
}

const getTypeLabel = (type: PublicationType) => {
  const labels: Record<PublicationType, string> = {
    journal: '期刊',
    conference: '会议',
    patent: '专利',
  }
  return labels[type] || type
}

const getStatusColor = (
  status: PublicationStatus
): 'success' | 'primary' | 'warning' | 'info' | 'danger' => {
  const colors: Record<PublicationStatus, 'success' | 'primary' | 'warning' | 'info' | 'danger'> = {
    published: 'success',
    accepted: 'primary',
    'under-review': 'warning',
    draft: 'info',
  }
  return colors[status] || 'danger'
}

const getStatusLabel = (status: PublicationStatus) => {
  const labels: Record<PublicationStatus, string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status] || status
}

const isExternalPdf = (url: string) => /^https?:\/\//i.test(url)

const goToPdfReader = (url: string) => {
  router.push({
    path: '/pdf-reader',
    query: { url },
  })
}
</script>

<style scoped>
.pub-detail-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 15px;
  color: #222;
}

.pub-detail-section {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px 8px;
  padding-bottom: 0;
  font-size: 15px; /* 保证每个字段字体大小一致 */
}

.pub-label {
  font-weight: 500;
  color: #666;
  min-width: 60px;
  font-size: 15px;
}

.pub-value {
  color: #222;
  font-size: 15px;
}

.pub-keyword {
  margin-right: 4px;
  margin-bottom: 2px;
  background: #f5f5f5 !important;
  color: #888 !important;
  border: none;
  font-size: 15px;
}

.pub-doi {
  color: #888;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

.pub-metrics {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 15px;
  color: #888;
  padding-left: 0;
}

.pub-metric {
  margin-left: 0;
  color: #aaa;
  display: flex;
  align-items: center;
  font-size: 15px;
}

.pub-readerNum {
  color: #409eff;
  font-weight: 500;
  font-size: 15px;
}

.pub-likeNum {
  color: #f56c6c;
  font-weight: 500;
  font-size: 15px;
}

.pub-reader-label {
  color: #409eff !important;
  font-size: 15px;
}

.pub-like-label {
  color: #f56c6c !important;
  font-size: 15px;
}

.pub-icon {
  font-size: 16px;
  margin-right: 4px;
}

.pub-abstract {
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
}

.pub-abstract-text {
  background: none;
  border-radius: 0;
  padding: 0;
  margin-top: 2px;
  color: #444;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
  word-break: break-all;
}

.pub-pdf {
  margin-top: 6px;
  font-size: 15px;
}
</style>
