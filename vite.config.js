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
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('代理错误:', err.message)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理请求:', req.method, req.url)
          })
        },
      },
      '/cat': {
        target: 'http://10.251.254.129:8081/chat/upload',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cat/, ''),
      },
    },
  },
})
