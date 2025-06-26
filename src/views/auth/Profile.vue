<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 flex items-center">
          <svg
            class="w-8 h-8 mr-3 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          个人资料
        </h1>
        <p class="text-gray-600 mt-2">管理您的个人信息和账户设置</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧头像和基本信息 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="userInfo.imgUrl || `/default-avatar.png`"
                  alt="头像"
                  class="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                />
                <label
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition duration-150 shadow-lg cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    ref="avatarInput"
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    @change="handleAvatarChange"
                  />
                </label>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mt-4">{{ userInfo.name }}</h2>
              <p class="text-gray-600">{{ userInfo.title }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ userInfo.institution }}</p>

              <!-- 认证状态 -->
              <div
                class="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                已认证
              </div>

              <!-- 统计信息卡片 -->
              <div class="grid grid-cols-2 gap-4 mt-6 max-w-xs mx-auto">
                <div class="text-center">
                  <div class="text-2xl font-bold text-indigo-600">{{ userInfo.followerNum }}</div>
                  <div class="text-xs text-gray-500">关注数</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ userInfo.publishNum }}</div>
                  <div class="text-xs text-gray-500">论文数</div>
                </div>
                <!-- <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ userInfo.subjectNum }}</div>
                  <div class="text-xs text-gray-500">项目数</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧表单区域 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md">
            <!-- 标签页导航 -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  :class="[
                    'py-4 px-1 border-b-2 font-medium text-sm transition duration-150 flex items-center',
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                  @click="activeTab = tab.id"
                >
                  <component :is="tab.icon" class="w-4 h-4 mr-2" />
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <!-- 基本信息表单 -->
            <div v-if="activeTab === 'basic'" class="p-6">
              <el-form :model="userInfo" label-width="100px" class="space-y-6">
                <el-form-item label="姓名">
                  <el-input v-model="userInfo.name" placeholder="请输入姓名" disabled />
                </el-form-item>

                <el-form-item label="邮箱">
                  <el-input
                    v-model="userInfo.email"
                    type="email"
                    placeholder="请输入邮箱"
                    disabled
                  />
                </el-form-item>

                <el-form-item label="性别">
                  <el-input v-model="userInfo.gender" placeholder="请输入性别" disabled />
                </el-form-item>

                <el-form-item label="职位">
                  <el-select v-model="userInfo.title" placeholder="请选择职位" class="w-full">
                    <el-option
                      v-for="item in titleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="机构">
                  <el-input v-model="userInfo.institution" placeholder="请输入所属机构" disabled />
                </el-form-item>

                <el-form-item label="个人简介">
                  <el-input
                    v-model="userInfo.bio"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入个人简介"
                  />
                </el-form-item>

                <el-form-item label="研究领域">
                  <el-select
                    v-model="researchAreaArray"
                    placeholder="请选择研究领域"
                    class="w-full"
                    multiple
                  >
                    <el-option label="计算机科学" value="计算机科学" />
                    <el-option label="人工智能" value="人工智能" />
                    <el-option label="机器学习" value="机器学习" />
                    <el-option label="数据科学" value="数据科学" />
                    <el-option label="生物信息学" value="生物信息学" />
                    <el-option label="物理学" value="物理学" />
                    <el-option label="化学" value="化学" />
                    <el-option label="数学" value="数学" />
                    <el-option label="材料科学" value="材料科学" />
                    <el-option label="环境科学" value="环境科学" />
                    <el-option label="地球科学" value="地球科学" />
                    <el-option label="天文学" value="天文学" />
                    <el-option label="医学" value="医学" />
                    <el-option label="药学" value="药学" />
                    <el-option label="心理学" value="心理学" />
                    <el-option label="社会学" value="社会学" />
                    <el-option label="经济学" value="经济学" />
                    <el-option label="管理学" value="管理学" />
                    <el-option label="法学" value="法学" />
                    <el-option label="教育学" value="教育学" />
                    <el-option label="历史学" value="历史学" />
                    <el-option label="哲学" value="哲学" />
                    <el-option label="语言学" value="语言学" />
                    <el-option label="政治学" value="政治学" />
                    <el-option label="艺术学" value="艺术学" />
                    <el-option label="农学" value="农学" />
                    <el-option label="工程学" value="工程学" />
                    <el-option label="电子科学" value="电子科学" />
                    <el-option label="自动化" value="自动化" />
                    <el-option label="交通运输" value="交通运输" />
                    <el-option label="能源科学" value="能源科学" />
                    <el-option label="海洋科学" value="海洋科学" />
                    <el-option label="统计学" value="统计学" />
                    <el-option label="信息科学" value="信息科学" />
                    <el-option label="新闻传播学" value="新闻传播学" />
                    <el-option label="体育学" value="体育学" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>

                <div class="flex justify-end space-x-4">
                  <el-button @click="resetForm">重置</el-button>
                  <el-button type="primary" :loading="saving" @click="saveProfile">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    保存更改
                  </el-button>
                </div>
              </el-form>
            </div>

            <!-- 密码修改 -->
            <div v-if="activeTab === 'security'" class="p-6">
              <el-form :model="passwordForm" label-width="100px" class="space-y-6">
                <el-form-item label="当前密码">
                  <el-input v-model="passwordForm.currentPassword" type="password" show-password />
                </el-form-item>

                <el-form-item label="新密码">
                  <el-input v-model="passwordForm.newPassword" type="password" show-password />
                </el-form-item>

                <el-form-item label="确认密码">
                  <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
                </el-form-item>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div class="flex">
                    <svg
                      class="w-5 h-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="text-sm text-yellow-800">
                      <p>密码安全提示：</p>
                      <ul class="list-disc list-inside mt-1">
                        <li>密码长度至少8位</li>
                        <li>包含字母、数字</li>
                        <li>定期更换密码</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <el-button type="primary" @click="changePassword">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    修改密码
                  </el-button>
                </div>
              </el-form>
            </div>

            <!-- 隐私设置 -->
            <div v-if="activeTab === 'privacy'" class="p-6">
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">隐私设置</h3>

                <div class="space-y-4">
                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">公开个人资料</h4>
                      <p class="text-sm text-gray-500">允许其他用户查看您的完整个人资料</p>
                    </div>
                    <el-switch v-model="privacySettings.publicProfile" />
                  </div>

                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">显示研究成果</h4>
                      <p class="text-sm text-gray-500">在个人资料中展示您的研究成果和发表论文</p>
                    </div>
                    <el-switch v-model="privacySettings.showAchievements" />
                  </div>

                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">接收站内消息</h4>
                      <p class="text-sm text-gray-500">允许其他用户向您发送私信</p>
                    </div>
                    <el-switch v-model="privacySettings.allowMessages" />
                  </div>

                  <div class="flex items-center justify-between py-4">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                      <p class="text-sm text-gray-500">接收重要活动和消息的邮件通知</p>
                    </div>
                    <el-switch v-model="privacySettings.emailNotifications" />
                  </div>
                </div>

                <div class="flex justify-end">
                  <el-button type="primary" @click="savePrivacySettings"> 保存设置 </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  updateUserProfile,
  uploadUserImg,
  changeUserPassword,
  getUserInfo,
} from '@/api/modules/user'
import { useUserStore } from '@/stores/user'

// 图标组件
const UserIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      }),
    ]
  )

const SecurityIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      }),
    ]
  )

const PrivacyIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      }),
    ]
  )

const activeTab = ref('basic')
const saving = ref(false)

const userStore = useUserStore()

const tabs = [
  { id: 'basic', name: '基本信息', icon: UserIcon },
  { id: 'security', name: '账户安全', icon: SecurityIcon },
  { id: 'privacy', name: '隐私设置', icon: PrivacyIcon },
]

const genderMap = {
  male: '男',
  female: '女',
}

const userInfo = reactive({
  id: '',
  name: '',
  email: '',
  gender: '',
  title: '',
  institution: '',
  bio: '',
  researchArea: '',
  imgUrl: '',
  followerNum: 0,
  publishNum: 0,
  subjectNum: 0,
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const privacySettings = reactive({
  publicProfile: true,
  showAchievements: true,
  allowMessages: true,
  emailNotifications: false,
})

const avatarInput = ref<HTMLInputElement | null>(null)
const researchAreaArray = computed({
  get: () => (userInfo.researchArea ? userInfo.researchArea.split(',') : []),
  set: (val: string[]) => {
    userInfo.researchArea = val.join(',')
  },
})

const titleOptions = [
  { label: '教授', value: '教授' },
  { label: '副教授', value: '副教授' },
  { label: '讲师', value: '讲师' },
  { label: '博士后', value: '博士后' },
  { label: '博士生', value: '博士生' },
  { label: '硕士生', value: '硕士生' },
  { label: '本科生', value: '本科生' },
  { label: '其他', value: '其他' },
]

// 初始化用户信息
const initUserInfo = async () => {
  const res = await getUserInfo()
  console.log(res)
  if (res.data) {
    userInfo.id = String(res.data.id)
    userInfo.name = res.data.name || ''
    userInfo.email = res.data.email || ''
    userInfo.gender = genderMap[res.data.gender as keyof typeof genderMap] || res.data.gender || ''
    userInfo.title = res.data.title || ''
    userInfo.institution = res.data.institution || ''
    userInfo.imgUrl = res.data.imgUrl ? '/api' + res.data.imgUrl: '' || ''
    userInfo.bio = res.data.bio || ''
    userInfo.researchArea = res.data.researchArea || ''
    userInfo.followerNum = res.data.followerNum || 0
    userInfo.publishNum = res.data.publishNum || 0
    userInfo.subjectNum = res.data.subjectNum || 0
  }
}

onMounted(() => {
  initUserInfo() // 先初始化显示当前用户信息
})

const saveProfile = async () => {
  // 1. 必填项校验
  if (
    !userInfo.name ||
    !userInfo.email ||
    !userInfo.gender ||
    !userInfo.institution ||
    !userInfo.title ||
    !userInfo.researchArea
  ) {
    ElMessage.error('必要信息缺失，个人资料保存失败')
    return
  }

  saving.value = true
  try {
    await updateUserProfile({
      bio: userInfo.bio,
      researchArea: userInfo.researchArea,
      title: userInfo.title,
    })

    userStore.setUser({
      bio: userInfo.bio,
      researchArea: userInfo.researchArea,
      title: userInfo.title,
    })

    initUserInfo()
    ElMessage.success('个人资料保存成功')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

const resetForm = () => {
  // 重置表单逻辑
  ElMessage.info('表单已重置')
}

const changePassword = async () => {
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    ElMessage.error('请填写所有密码字段')
    return
  }
  if (passwordForm.newPassword.length < 8) {
    ElMessage.error('新密码长度至少8位')
    return
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(passwordForm.newPassword)) {
    ElMessage.error('新密码必须包含字母和数字')
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }

  try {
    await changeUserPassword({
      originPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })
    ElMessage.success('密码修改成功')
    Object.assign(passwordForm, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  } catch (error) {
    ElMessage.error('密码修改失败')
  }
}

const savePrivacySettings = async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    ElMessage.success('隐私设置保存成功')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  }
}

const handleAvatarChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const file = files[0]
  const formData = new FormData()
  formData.append('img', file)
  try {
    const res = await uploadUserImg(formData)
    const imgUrl = res.imgUrl
    userInfo.imgUrl = imgUrl
    userStore.setUser({ imgUrl })
    ElMessage.success('头像上传成功')
    console.log(userStore.user)
    initUserInfo()
  } catch (error) {
    ElMessage.error('头像上传失败')
  }
}
</script>
