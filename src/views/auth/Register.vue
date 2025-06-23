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
            <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
            <div class="flex space-x-6">
              <label class="inline-flex items-center">
                <input
                  v-model="form.gender"
                  type="radio"
                  class="form-radio text-indigo-600"
                  name="gender"
                  value="male"
                  required
                />
                <span class="ml-2 text-gray-700">男</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  v-model="form.gender"
                  type="radio"
                  class="form-radio text-indigo-600"
                  name="gender"
                  value="female"
                  required
                />
                <span class="ml-2 text-gray-700">女</span>
              </label>
            </div>
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
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
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
              readonly
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入所属机构"
            />
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
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { registerUser } from '@/api/modules/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  name: '',
  gender: '',
  email: '',
  institution: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const emailError = ref('')
const emailDomains = [
  { domain: /@pku\.edu\.cn$/, institution: '北京大学' },
  { domain: /@tsinghua\.edu\.cn$/, institution: '清华大学' },
  { domain: /@mit\.edu$/, institution: '麻省理工学院' },
  { domain: /@buaa\.edu\.cn$/, institution: '北京航空航天大学' },
  { domain: /@ustc\.edu\.cn$/, institution: '中国科学技术大学' },
]

watch(
  () => form.email,
  newEmail => {
    const match = emailDomains.find(item => item.domain.test(newEmail))
    if (match) {
      form.institution = match.institution
      emailError.value = ''
    } else {
      form.institution = ''
      if (newEmail) {
        emailError.value = '请输入正确的学术邮箱'
      } else {
        emailError.value = ''
      }
    }
  }
)

const handleRegister = async () => {
  if (
    !form.name ||
    !form.gender ||
    !form.email ||
    !form.institution ||
    !form.password ||
    !form.confirmPassword
  ) {
    ElMessage.error('请填写所有必填项')
    return
  }
  if (!form.institution) {
    ElMessage.error('请输入有效的学术邮箱')
    return
  }
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  try {
    const res = await registerUser({
      email: form.email,
      name: form.name,
      password: form.password,
      gender: form.gender,
      institution: form.institution,
    })
    const user = res.data[0]
    localStorage.setItem('token', user.token)
    userStore.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.imageUrl,
    })

    ElMessage.success('注册成功，即将自动登录')
    // 这里可以设置已认证状态
    // userStore.isAuthenticated = true; // 如果需要
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    console.log(error)
    const errMsg =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
      '注册失败，请重试'
    ElMessage.error(errMsg)
  }
}
</script>
