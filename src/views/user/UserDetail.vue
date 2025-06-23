<template>
  <div class="min-h-screen bg-gray-50" v-if="user">
    <!-- 用户头部信息 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ user.name }}</h1>
            <p class="text-xl text-gray-600 mt-1">{{ user.title }}</p>
            <p class="text-lg text-gray-500 mt-1">{{ user.institution }}</p>

            <div class="mt-4">
              <p class="text-gray-700">{{ user.bio }}</p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="field in user.researchFields"
                :key="field"
                class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
              >
                {{ field }}
              </span>
            </div>

            <div class="mt-6 flex gap-6">
              <button
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
              >
                关注
              </button>
              <button
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-150"
              >
                发消息
              </button>
            </div>
          </div>

          <div class="text-right">
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <div class="text-2xl font-bold text-indigo-600">{{ user.hIndex }}</div>
              <div class="text-sm text-gray-600">H指数</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ user.publications }}</div>
          <div class="text-gray-600 mt-1">发表论文</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600">{{ user.citations }}</div>
          <div class="text-gray-600 mt-1">总引用数</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-purple-600">{{ user.followers }}</div>
          <div class="text-gray-600 mt-1">关注者</div>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition duration-150',
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- 论文列表 -->
          <div v-if="activeTab === 'publications'" class="space-y-4">
            <div
              v-for="paper in user.papers"
              :key="paper.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-150"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ paper.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ paper.authors.join(', ') }}</p>
              <p class="text-sm text-gray-500 mb-3">{{ paper.journal }} • {{ paper.year }}</p>
              <div class="flex items-center justify-between">
                <div class="flex gap-4 text-sm text-gray-600">
                  <span>引用: {{ paper.citations }}</span>
                  <span>下载: {{ paper.downloads }}</span>
                </div>
                <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  查看详情
                </button>
              </div>
            </div>
          </div>

          <!-- 合作者 -->
          <div
            v-if="activeTab === 'collaborators'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="collaborator in user.collaborators"
              :key="collaborator.id"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-150 cursor-pointer"
              @click="goToUserDetail(collaborator.id)"
            >
              <img
                :src="collaborator.avatar"
                :alt="collaborator.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900">{{ collaborator.name }}</h4>
                <p class="text-sm text-gray-500">{{ collaborator.institution }}</p>
                <p class="text-xs text-gray-400">合作论文: {{ collaborator.paperCount }}</p>
              </div>
            </div>
          </div>

          <!-- 研究兴趣 -->
          <div v-if="activeTab === 'interests'">
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">主要研究方向</h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="interest in user.interests.primary"
                    :key="interest"
                    class="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg"
                  >
                    {{ interest }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">相关领域</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="interest in user.interests.secondary"
                    :key="interest"
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {{ interest }}
                  </span>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface User {
  id: string | string[]
  name: string
  title: string
  institution: string
  avatar: string
  bio: string
  researchFields: string[]
  hIndex: number
  publications: number
  citations: number
  followers: number
  papers: {
    id: number
    title: string
    authors: string[]
    journal: string
    year: number
    citations: number
    downloads: number
  }[]
  collaborators: {
    id: number
    name: string
    institution: string
    avatar: string
    paperCount: number
  }[]
  interests: {
    primary: string[]
    secondary: string[]
  }
}

const user = ref<User | null>(null)
const activeTab = ref('publications')

const tabs = [
  { id: 'publications', name: '发表论文' },
  { id: 'collaborators', name: '合作者' },
  { id: 'interests', name: '研究兴趣' },
]

onMounted(() => {
  // 模拟获取用户数据
  const userId = route.params.id
  user.value = {
    id: userId,
    name: '李明',
    title: '教授',
    institution: '清华大学计算机科学与技术系',
    avatar: 'https://via.placeholder.com/200',
    bio: '专注于机器学习和人工智能研究，在深度学习、自然语言处理和计算机视觉领域有重要贡献。致力于将理论研究与实际应用相结合，推动AI技术的产业化发展。',
    researchFields: ['机器学习', '人工智能', '深度学习', '自然语言处理', '计算机视觉'],
    hIndex: 45,
    publications: 120,
    citations: 3500,
    followers: 1250,
    papers: [
      {
        id: 1,
        title: 'Deep Learning for Natural Language Processing: A Comprehensive Survey',
        authors: ['李明', '王芳', '张伟'],
        journal: 'Nature Machine Intelligence',
        year: 2024,
        citations: 245,
        downloads: 1200,
      },
      {
        id: 2,
        title: 'Attention Mechanisms in Computer Vision: Recent Advances and Applications',
        authors: ['李明', '陈华'],
        journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
        year: 2023,
        citations: 189,
        downloads: 980,
      },
    ],
    collaborators: [
      {
        id: 2,
        name: '王芳',
        institution: '北京大学',
        avatar: 'https://via.placeholder.com/100',
        paperCount: 15,
      },
      {
        id: 3,
        name: '张伟',
        institution: '中科院',
        avatar: 'https://via.placeholder.com/100',
        paperCount: 8,
      },
    ],
    interests: {
      primary: ['深度学习理论', '自然语言处理', '计算机视觉', '强化学习'],
      secondary: ['神经网络优化', '迁移学习', '多模态学习', '可解释AI', '联邦学习'],
    },
  }
})

const goToUserDetail = (userId: number) => {
  router.push(`/user/${userId}`)
}
</script>
