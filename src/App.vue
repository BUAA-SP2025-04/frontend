<template>
  <div id="app">
    <AppNavbar />
    <main class="bg-gray-50 min-h-screen">
      <router-view />
    </main>
    <el-dialog
      v-model="globalStore.showAuthDialog"
      title=""
      width="360px"
      :close-on-click-modal="false"
      class="auth-dialog"
      :show-close="false"
    >
      <div class="text-center p-8">
        <div class="mb-6">
          <div
            class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4"
          >
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">需要登录</h3>
          <p class="text-gray-500">登录后即可访问完整功能</p>
        </div>
        <button
          class="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          @click="goLogin"
        >
          立即登录
        </button>
        <button
          class="w-full mt-3 text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          @click="globalStore.showAuthDialog = false"
        >
          稍后再说
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import { useGlobalStore } from '@/stores/global'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const router = useRouter()

const goLogin = () => {
  globalStore.showAuthDialog = false
  router.push('/login')
}
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

/* 登录弹窗自定义样式 */
.auth-dialog .el-dialog {
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border: none !important;
}

.auth-dialog .el-dialog__header {
  display: none;
}

.auth-dialog .el-dialog__body {
  padding: 0;
  background: white;
  border-radius: 24px;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .max-w-7xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
