<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  source: string
}

const props = defineProps<Props>()

const renderedContent = computed(() => {
  // 简单的Markdown渲染
  return props.source
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\n/g, '<br>')
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
}

.markdown-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  color: #1e293b;
}

.markdown-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.75rem 0;
  color: #0e7490;
}

.markdown-content :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #0e7490;
}

.markdown-content :deep(code) {
  background: #f1f5f9;
  color: #0c4a6e;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  border: 1px solid #bae6fd;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #1e293b;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #475569;
}
</style>