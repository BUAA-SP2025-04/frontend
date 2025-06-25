<template>
  <div>
    <!-- <el-button type="primary" @click="dialogVisible = true">查看详情</el-button> -->
    <el-dialog
      v-model="dialogVisible"
      :title="achievement.title || '成果详情'"
      width="600px"
      append-to-body
      class="pub-detail-dialog"
    >
      <div v-if="achievement" class="pub-detail-content">
        <div class="pub-detail-section pub-title">
          <span class="pub-label">标题：</span>
          <span class="pub-value pub-title-text">{{ achievement.title }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">作者：</span>
          <span class="pub-value">
            {{ achievement.authors ? achievement.authors : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">单位/会议：</span>
          <span class="pub-value">
            {{ achievement.venue ? achievement.venue : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">年份：</span>
          <span class="pub-value">
            {{ achievement.year ? achievement.year : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">状态：</span>
          <span class="pub-value pub-status">{{ achievement.status }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">关键词：</span>
          <template
            v-if="
              achievement.keywords &&
              (Array.isArray(achievement.keywords)
                ? achievement.keywords.length
                : achievement.keywords.split(',').filter(k => k.trim()).length)
            "
          >
            <el-tag
              v-for="kw in achievement.keywords
                ? Array.isArray(achievement.keywords)
                  ? achievement.keywords
                  : achievement.keywords.split(',').filter(k => k.trim())
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
            {{ achievement.doi ? achievement.doi : '暂无数据' }}
          </span>
        </div>
        <div class="pub-detail-section pub-abstract">
          <span class="pub-label">摘要：</span>
          <div class="pub-value pub-abstract-text">
            {{ achievement.abstracts ? achievement.abstracts : '暂无数据' }}
          </div>
        </div>
        <div class="pub-detail-section pub-metrics">
          <span class="pub-label pub-metric pub-reader-label">
            <el-icon class="pub-icon"><View /></el-icon>
            阅读量：
          </span>
          <span class="pub-value pub-readerNum">
            {{
              achievement.readerNum !== undefined && achievement.readerNum !== null
                ? achievement.readerNum
                : '-'
            }}
          </span>
          <span class="pub-label pub-metric pub-like-label">
            <el-icon class="pub-icon"><Star /></el-icon>
            点赞数：
          </span>
          <span class="pub-value pub-likeNum">
            {{
              achievement.likeNum !== undefined && achievement.likeNum !== null
                ? achievement.likeNum
                : '-'
            }}
          </span>
        </div>
        <div v-if="achievement.pdfUrl" class="pub-detail-section pub-pdf">
          <el-link :href="achievement.pdfUrl" target="_blank" type="primary">PDF下载/预览</el-link>
        </div>
        <div v-else class="pub-detail-section pub-pdf">
          <span class="pub-label">PDF：</span>
          <span class="pub-value">暂无数据</span>
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
import type { Publication } from '@/api/types/publication'

const props = defineProps<{
  visible: boolean
  achievement: Publication
}>()

const emit = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

watch(
  () => props.visible,
  val => {
    dialogVisible.value = val
  }
)

watch(dialogVisible, val => {
  emit('update:visible', val)
})

defineOptions({ name: 'PublicationDetail' })
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
}

.pub-label {
  font-weight: 500;
  color: #666;
  min-width: 60px;
}

.pub-value {
  color: #222;
}

.pub-keyword {
  margin-right: 4px;
  margin-bottom: 2px;
  background: #f5f5f5 !important;
  color: #888 !important;
  border: none;
  font-size: 0.95em;
}

.pub-status {
  color: #888;
  font-weight: 400;
}

.pub-doi {
  color: #888;
  text-decoration: none;
  cursor: pointer;
}

.pub-metrics {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 0.97em;
  color: #888;
  padding-left: 0;
}

.pub-metric {
  margin-left: 0;
  color: #aaa;
  display: flex;
  align-items: center;
}

.pub-readerNum {
  color: #409eff;
  font-weight: 500;
}

.pub-likeNum {
  color: #f56c6c;
  font-weight: 500;
}

.pub-reader-label {
  color: #409eff !important;
}

.pub-like-label {
  color: #f56c6c !important;
}

.pub-icon {
  font-size: 16px;
  margin-right: 4px;
}

.pub-abstract {
  flex-direction: column;
  align-items: flex-start;
}

.pub-abstract-text {
  background: none;
  border-radius: 0;
  padding: 0;
  margin-top: 2px;
  color: #444;
  font-size: 0.97em;
  line-height: 1.7;
  width: 100%;
  word-break: break-all;
}

.pub-pdf {
  margin-top: 6px;
}
</style>
