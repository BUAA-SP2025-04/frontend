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
  color: #334155;
  font-size: 1rem;
  line-height: 1.8;
  word-break: break-word;
  max-width: 100%;
}

.markdown-content pre {
  background: linear-gradient(135deg, #f1f5f9 60%, #e0f2fe 100%);
  border: 1.5px solid #bae6fd;
  border-radius: 0.75rem;
  box-shadow: 0 4px 24px 0 rgba(56, 189, 248, 0.08), 0 1.5px 4px 0 rgba(30, 58, 138, 0.08);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-size: 0.98em;
  transition: box-shadow 0.2s;
  position: relative;
}

.markdown-content pre:hover {
  box-shadow: 0 8px 32px 0 rgba(56, 189, 248, 0.16), 0 2px 8px 0 rgba(30, 58, 138, 0.12);
}

.markdown-content code {
  background: linear-gradient(90deg, #f1f5f9 80%, #e0f2fe 100%);
  color: #0c4a6e;
  border-radius: 0.375rem;
  padding: 0.15em 0.5em;
  font-size: 0.97em;
  border: 1px solid #bae6fd;
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', monospace;
}

.markdown-content pre code {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font-size: 1em;
}

.markdown-content blockquote {
  border-left: 4px solid #38bdf8;
  background: linear-gradient(90deg, #f0f9ff 80%, #f8fafc 100%);
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
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.markdown-content ul, .markdown-content ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.08);
}

.markdown-content th, .markdown-content td {
  border: 1px solid #e0e7ef;
  padding: 0.75em 1em;
}

.markdown-content th {
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  color: #fff;
}

.markdown-content a {
  color: #06b6d4;
  text-decoration: underline;
  transition: color 0.2s;
}
.markdown-content a:hover {
  color: #0ea5e9;
}
</style>