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
        <!-- <div class="pub-detail-section pub-title">
          <span class="pub-label">标题：</span>
          <span class="pub-value pub-title-text">{{ achievement.title }}</span>
        </div> -->
        <div class="pub-detail-section">
          <span class="pub-label">作者：</span>
          <span v-for="author in achievement.authors" :key="author.id || author" class="pub-author">
            {{ author.name || author }}
          </span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">单位/会议：</span>
          <span class="pub-value">{{ achievement.venue }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">年份：</span>
          <span class="pub-value">{{ achievement.year }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">状态：</span>
          <span class="pub-value pub-status">{{ achievement.status }}</span>
        </div>
        <div class="pub-detail-section">
          <span class="pub-label">关键词：</span>
          <el-tag
            v-for="kw in achievement.keywords
              ? Array.isArray(achievement.keywords)
                ? achievement.keywords
                : achievement.keywords.split(',')
              : []"
            :key="kw"
            class="pub-keyword"
            effect="dark"
            type="info"
            >{{ kw }}</el-tag
          >
        </div>
        <div class="pub-detail-section pub-doi">
          <span class="pub-label">DOI：</span>
          <span class="pub-value pub-doi">{{ achievement.doi }}</span>
        </div>
        <div class="pub-detail-section pub-abstract">
          <span class="pub-label">摘要：</span>
          <div class="pub-value pub-abstract-text">{{ achievement.abstract }}</div>
        </div>
        <div class="pub-detail-section pub-metrics">
          <span class="pub-label pub-metric pub-reader-label">
            <el-icon class="pub-icon"><View /></el-icon>
            阅读量：
          </span>
          <span class="pub-value pub-readerNum">{{ achievement.readerNum }}</span>
          <span class="pub-label pub-metric pub-like-label">
            <el-icon class="pub-icon"><Star /></el-icon>
            点赞数：
          </span>
          <span class="pub-value pub-likeNum">{{ achievement.likeNum }}</span>
        </div>
        <div v-if="achievement.pdfUrl" class="pub-detail-section pub-pdf">
          <el-link :href="achievement.pdfUrl" target="_blank" type="primary">PDF下载/预览</el-link>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElButton, ElDialog, ElIcon, ElLink, ElTag } from 'element-plus'
import { Star, View } from '@element-plus/icons-vue'

const props = defineProps({
  achievement: {
    type: Object,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
})

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

defineOptions({ name: 'publicationDetail' })
</script>

<style scoped>
.pub-detail-dialog >>> .el-dialog__body {
  background: #fff;
  padding: 24px 32px 12px 32px;
}
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
.pub-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
}
.pub-title-text {
  font-size: 1em;
  font-weight: 500;
}
.pub-author {
  background: none;
  color: #444;
  border-radius: 0;
  padding: 0 6px 0 0;
  margin-right: 0;
  font-size: 0.98em;
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
