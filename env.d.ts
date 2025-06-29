/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-markdown-it' {
  import { Plugin } from 'vue'
  const MarkdownPlugin: Plugin & { install: Plugin['install'] }
  export default MarkdownPlugin
}

declare module 'markdown-it-task-lists';

declare module 'markdown-it-katex';

declare module 'markdown-it-table-of-contents' {
  import { PluginSimple } from 'markdown-it'
  const toc: PluginSimple
  export default toc
}
declare module 'markdown-it-container' {
  const plugin: any;
  export default plugin;
}