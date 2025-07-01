<template>
  <div
    class="markdown-content"
    :class="$attrs.class"
    v-html="rendered"
  />
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, defineProps } from 'vue'
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
    let langLabel = '';
    if (lang) {
      langLabel = `<div class="code-lang-label">${lang}</div>`;
    }
    let codeHtml = '';
    if (lang && hljs.getLanguage(lang)) {
      try {
        codeHtml = hljs.highlight(str, { language: lang }).value;
      } catch {}
    } else {
      codeHtml = md.utils.escapeHtml(str);
    }
    return `<div class="code-block-wrapper">${langLabel}<pre class="hljs"><code>${codeHtml}</code></pre></div>`;
  }
})
  .use(katex, {
    throwOnError: false,
    errorColor: '#cc0000',
  })
  .use(taskLists, { enabled: true })
  .use(container, 'info')
  .use(container, 'warning')
  .use(container, 'danger')

if (props.enableToc) {
  md.use(anchor, {
    permalink: anchor.permalink.headerLink(),
  }).use(toc, {
    includeLevel: [1, 2, 3],
  })
}

const rendered = computed(() => md.render(props.source || ''))
</script>

<style>
.markdown-content {
  color: #333333;
  font-size: 16px;
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  word-wrap: break-word;
  max-width: 100%;
}

/* 标题样式 - Typora 风格 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: #2c3e50;
}

.markdown-content h1 {
  font-size: 2rem;
  border-bottom: 2px solid #eaecef;
  padding-bottom: 0.3rem;
  margin-bottom: 1.5rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3rem;
}

.markdown-content h3 {
  font-size: 1.25rem;
}

.markdown-content h4 {
  font-size: 1rem;
}

.markdown-content h5 {
  font-size: 0.875rem;
}

.markdown-content h6 {
  font-size: 0.85rem;
  color: #6a737d;
}

/* 段落样式 */
.markdown-content p {
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.6;
}

/* 代码块样式 - Typora 风格 */
.code-block-wrapper {
  position: relative;
  margin: 16px 0;
  border-radius: 6px;
  overflow: hidden;
}

.code-lang-label {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 12px;
  color: #586069;
  background: #f6f8fa;
  padding: 2px 8px;
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.code-block-wrapper pre {
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.45;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}

/* 行内代码 */
.markdown-content code {
  background: #f3f4f6;
  color: #e83e8c;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}

.markdown-content pre code {
  background: transparent;
  color: inherit;
  font-size: 100%;
  padding: 0;
  margin: 0;
  border-radius: 0;
}

/* 引用块样式 */
.markdown-content blockquote {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  background: transparent;
  border-radius: 0;
  font-style: normal;
}

.markdown-content blockquote > :first-child {
  margin-top: 0;
}

.markdown-content blockquote > :last-child {
  margin-bottom: 0;
}

/* 列表样式 */
.markdown-content ul,
.markdown-content ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-content li {
  margin-bottom: 0.25em;
}

.markdown-content li > p {
  margin-top: 16px;
}

.markdown-content li + li {
  margin-top: 0.25em;
}

/* 任务列表 */
.markdown-content .task-list-item {
  list-style-type: none;
  margin-left: -1.5em;
}

.markdown-content .task-list-item input {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

/* 表格样式 */
.markdown-content table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #d1d9e0;
}

.markdown-content table th,
.markdown-content table td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}

.markdown-content table th {
  font-weight: 600;
  background-color: #f6f8fa;
}

.markdown-content table tr {
  background-color: #ffffff;
  border-top: 1px solid #c6cbd1;
}

.markdown-content table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

/* 分割线 */
.markdown-content hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
  border-radius: 2px;
}

/* 链接样式 */
.markdown-content a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

/* 强调样式 */
.markdown-content strong {
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
}

/* 图片样式 */
.markdown-content img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #ffffff;
  border-radius: 6px;
  margin: 16px 0;
}

/* KaTeX 数学公式样式调整 */
.markdown-content .katex {
  font-size: 1.1em;
}

.markdown-content .katex-display {
  margin: 16px 0;
  text-align: center;
}

/* 容器样式 */
.markdown-content .info,
.markdown-content .warning,
.markdown-content .danger {
  padding: 16px;
  margin: 16px 0;
  border-radius: 6px;
  border-left: 4px solid;
}

.markdown-content .info {
  background-color: #f0f9ff;
  border-left-color: #0ea5e9;
  color: #0c4a6e;
}

.markdown-content .warning {
  background-color: #fffbeb;
  border-left-color: #f59e0b;
  color: #92400e;
}

.markdown-content .danger {
  background-color: #fef2f2;
  border-left-color: #ef4444;
  color: #991b1b;
}
</style>