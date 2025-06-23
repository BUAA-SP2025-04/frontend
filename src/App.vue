<template>
  <div id="app">
    <AppNavbar />
    <main class="bg-gray-50 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<style>
#app {
  font-family: 'Inter', system-ui, sans-serif;
}

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

/* 自定义滚动条全局样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Element Plus 自定义样式 */
.el-menu--horizontal .el-menu-item {
  border-bottom: 2px solid transparent !important;
}

.el-menu--horizontal .el-menu-item.is-active {
  border-bottom-color: var(--el-color-primary) !important;
  color: var(--el-color-primary) !important;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .max-w-7xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
