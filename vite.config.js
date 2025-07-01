import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    historyApiFallback: true, // 处理前端路由刷新时的404问题
    proxy: {
      '/api': {
        target: 'http://10.251.254.129:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/cat': {
        target: 'http://10.251.254.129:8081/chat/upload',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cat/, ''),
      },
    },
  },
})
