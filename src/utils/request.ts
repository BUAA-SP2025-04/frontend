import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 响应数据接口
interface ApiResponse<T = unknown> {
  code: string
  data: T
  message: string
}

const getBaseURL = (): string => {
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'
  return useMock
    ? import.meta.env.VITE_MOCK_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL || '/api'
}

const request: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加token认证
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('token') || 'mock-token-123456'
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查响应数据是否存在
    if (!response.data) {
      console.error('响应数据为空')
      ElMessage.error('响应数据为空')
      return Promise.reject(new Error('响应数据为空'))
    }

    // 检查是否是标准的API响应格式
    if (typeof response.data === 'object' && 'code' in response.data) {
      const { code, message } = response.data as ApiResponse

      // 根据业务状态码处理
      if (code == '200' || code == 'true' || String(code) === '200') {
        return response.data
      } else {
        const errorMsg = message || '请求失败'
        console.error('业务错误:', errorMsg)
        ElMessage.error(errorMsg)

        return Promise.reject(new Error(errorMsg))
      }
    } else {
      // 如果不是标准格式，直接返回数据
      console.warn('非标准API响应格式，直接返回数据')
      return response.data
    }
  },
  error => {
    console.error('响应错误:', error)

    // 网络错误处理
    if (error.response) {
      const { status, data } = error.response
      console.error('HTTP错误:', status, data)

      switch (status) {
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          localStorage.removeItem('token')
          // window.location.href = '/login'
          break
        case 403:
          ElMessage.error('没有权限访问')
          break
        case 404:
          //ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data?.message || `网络错误 (${status})`)
      }
    } else if (error.request) {
      console.error('网络连接失败:', error.request)
      console.error('请求URL:', error.config?.url)
      console.error('请求方法:', error.config?.method)
      console.error('请求头:', error.config?.headers)
      ElMessage.error('网络连接失败，请检查网络设置')
    } else {
      console.error('请求配置错误:', error.message)
      ElMessage.error('请求配置错误')
    }

    return Promise.reject(error)
  }
)

export default request
export type { ApiResponse }
