<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">注册 KnoWeb 账号</h2>
        <p class="mt-2 text-center text-sm text-gray-600">加入科研社交平台，开启学术之旅</p>
      </div>
      <form
        class="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
        @submit.prevent="handleRegister"
      >
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">邮箱地址</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入邮箱地址"
            />
          </div>
          <div>
            <label for="institution" class="block text-sm font-medium text-gray-700"
              >所属机构</label
            >
            <input
              id="institution"
              v-model="form.institution"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入所属机构"
            />
          </div>
          <div>
            <label for="research-field" class="block text-sm font-medium text-gray-700"
              >研究领域</label
            >
            <select
              id="research-field"
              v-model="form.researchField"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">请选择研究领域</option>
              <option value="computer-science">计算机科学</option>
              <option value="mathematics">数学</option>
              <option value="physics">物理学</option>
              <option value="chemistry">化学</option>
              <option value="biology">生物学</option>
              <option value="engineering">工程学</option>
              <option value="medicine">医学</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入密码"
            />
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700"
              >确认密码</label
            >
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请确认密码"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="form.agreeTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
            我同意
            <a href="#" class="text-indigo-600 hover:text-indigo-500">服务条款</a>
            和
            <a href="#" class="text-indigo-600 hover:text-indigo-500">隐私政策</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            注册
          </button>
        </div>

        <div class="text-center">
          <span class="text-sm text-gray-600">
            已有账号？
            <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即登录
            </router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  institution: '',
  researchField: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  try {
    // 模拟注册API调用
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    ElMessage.error('注册失败，请重试')
  }
}
</script>
