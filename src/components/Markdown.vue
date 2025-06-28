<template>
  <div class="markdown-content" v-html="rendered" />
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import katex from 'markdown-it-katex'
import taskLists from 'markdown-it-task-lists'
import container from 'markdown-it-container'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'

const props = defineProps<{ 
  source: string
  enableToc?: boolean
}>()

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang }).value
        }</code></pre>`
      } catch {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})
  .use(katex, {
    throwOnError: false,
    errorColor: '#cc0000'
  })
  .use(taskLists, { enabled: true })
  .use(container, 'info')
  .use(container, 'warning')
  .use(container, 'danger')

if (props.enableToc) {
  md.use(anchor, {
    permalink: anchor.permalink.headerLink()
  }).use(toc, {
    includeLevel: [1, 2, 3]
  })
}

const rendered = computed(() => md.render(props.source || ''))
</script>

<style>
.markdown-content {
  color: #374151;
  font-size: 1rem;
  line-height: 1.8;
  word-break: break-word;
  max-width: 100%;
}

.markdown-content pre {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-size: 0.875rem;
}

.markdown-content code {
  background: #f1f5f9;
  color: #1e40af;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.875rem;
  border: 1px solid #cbd5e1;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.markdown-content pre code {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font-size: 1em;
}

.markdown-content blockquote {
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  color: #64748b;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
}

.markdown-content h1, 
.markdown-content h2, 
.markdown-content h3, 
.markdown-content h4 {
  font-weight: 700;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-content h1 {
  font-size: 1.875rem;
  color: #111827;
}

.markdown-content h2 {
  font-size: 1.5rem;
  color: #1f2937;
}

.markdown-content h3 {
  font-size: 1.25rem;
  color: #374151;
}

.markdown-content ul, .markdown-content ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.markdown-content th, .markdown-content td {
  border: 1px solid #e5e7eb;
  padding: 0.75em 1em;
  text-align: left;
}

.markdown-content th {
  background: #f9fafb;
  color: #374151;
  font-weight: 600;
}

.markdown-content td {
  background: #ffffff;
}

.markdown-content strong {
  font-weight: 600;
  color: #111827;
}

.markdown-content em {
  font-style: italic;
  color: #4b5563;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-content a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

/* 任务列表样式 */
.markdown-content .task-list-item {
  list-style: none;
  margin-left: -1.5em;
}

.markdown-content .task-list-item input {
  margin-right: 0.5em;
}
</style>