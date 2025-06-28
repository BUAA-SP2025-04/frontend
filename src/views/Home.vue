<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 英雄区域 -->
    <section
      class="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 text-white"
    >
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            连接全球
            <span
              class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            >
              科研智慧
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            KnoWeb 是专为科研人员打造的学术社交平台，汇聚全球研究者，分享前沿成果，促进学术合作
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/discover"
              class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              开始探索
            </router-link>
            <router-link
              v-if="!isLoggedIn"
              to="/login"
              class="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              加入我们
            </router-link>
          </div>
        </div>
      </div>

      <!-- 浮动元素 -->
      <div
        class="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"
      ></div>
      <div
        class="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"
      ></div>
      <div
        class="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse delay-2000"
      ></div>
    </section>

    <!-- 平台统计 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">
              {{ formatNumber(animatedResearcherCount) }}
            </div>
            <div class="text-base md:text-xl font-semibold text-gray-700">注册研究者</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">
              {{ formatNumber(animatedPaperCount) }}
            </div>
            <div class="text-base md:text-xl font-semibold text-gray-700">发表论文</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-extrabold text-purple-600 mb-2">
              {{ formatNumber(animatedMessageCount) }}
            </div>
            <div class="text-base md:text-xl font-semibold text-gray-700">学术动态</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-extrabold text-orange-600 mb-2">
              {{ formatNumber(animatedProjectCount) }}
            </div>
            <div class="text-base md:text-xl font-semibold text-gray-700">合作项目</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">强大的科研工具集</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            从文献管理到学术发现，从成果展示到知识分享，全方位支持您的科研之路
          </p>
        </div>

        <div class="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- 科研发现 -->
          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">科研发现</h3>
              <p class="text-gray-600 mb-6">智能推荐相关论文，发现最新研究趋势，跟踪前沿科技动态</p>
              <div class="flex items-center justify-between">
                <router-link
                  to="/discover"
                  class="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center"
                >
                  立即探索
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 文献管理 -->
          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">文献库</h3>
              <p class="text-gray-600 mb-6">专业的文献管理工具，支持PDF阅读、标注和知识提取</p>
              <router-link
                to="/library"
                class="text-purple-600 hover:text-purple-700 font-semibold flex items-center"
              >
                管理文献
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 成果展示 -->
          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">科研成果</h3>
              <p class="text-gray-600 mb-6">展示和管理您的研究成果，提升学术影响力</p>
              <router-link
                to="/achievements"
                class="text-yellow-600 hover:text-yellow-700 font-semibold flex items-center"
              >
                查看成果
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 学术交流 -->
          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">学术交流</h3>
              <p class="text-gray-600 mb-6">与同行学者交流讨论，分享研究心得，促进学术合作</p>
              <router-link
                to="/messages"
                class="text-green-600 hover:text-green-700 font-semibold flex items-center"
              >
                开始交流
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 暂时隐藏的模块 - 学术社交 -->

          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">学术社交</h3>
              <p class="text-gray-600 mb-6">连接志同道合的研究者，分享学术动态，建立合作关系</p>
              <router-link
                to="/timeline"
                class="text-green-600 hover:text-green-700 font-semibold flex items-center"
              >
                查看动态
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 暂时隐藏的模块 - PDF阅读器 -->
          <div
            class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">PDF阅读器</h3>
              <p class="text-gray-600 mb-6">智能PDF阅读工具，支持文本提取、标注和坐标定位</p>
              <router-link
                to="/pdf-reader"
                class="text-teal-600 hover:text-teal-700 font-semibold flex items-center"
              >
                开始阅读
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门动态 -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">学术动态</h2>
          <p class="text-xl text-gray-600">探索最新的科研进展和学术讨论</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg
                class="w-6 h-6 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              热门论文
            </h3>
            <div class="space-y-4">
              <div
                v-for="paper in hotPapers"
                :key="paper.id"
                class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                @click="$router.push('/discover')"
              >
                <h4 class="font-semibold text-gray-900 mb-2">{{ paper.title }}</h4>
                <p class="text-gray-600 text-sm mb-3">{{ paper.authors }} • {{ paper.journal }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>引用: {{ paper.citations }}</span>
                  <span>{{ paper.publishedAt }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg
                class="w-6 h-6 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              最新动态
            </h3>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
                @click="$router.push('/timeline')"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="activity.avatar"
                    :alt="activity.author"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ activity.author }}</h4>
                    <p class="text-gray-600 text-sm mb-2">{{ activity.content }}</p>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{{ formatTime(activity.createdAt) }}</span>
                      <span>{{ activity.likes }} 赞</span>
                      <span>{{ activity.comments }} 评论</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link
            to="/timeline"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            查看更多动态
          </router-link>
        </div>
      </div>
    </section>

    <!-- 研究领域 -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">热门研究领域</h2>
          <p class="text-xl text-gray-600">发现和探索最活跃的科研方向</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div
            v-for="field in researchFields"
            :key="field.name"
            class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            @click="searchField(field.name)"
          >
            <div
              :class="field.color"
              class="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ field.name }}</h3>
            <p class="text-sm text-gray-600">{{ field.count }} 相关用户</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold mb-6">欢迎加入我们</h2>
        <p class="text-xl mb-8 text-indigo-100">
          与全球数十万研究者建立联系，分享您的研究成果，推动科学进步
        </p>
        <div v-if="!isLoggedIn" class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/login"
            class="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg"
          >
            免费注册
          </router-link>
          <router-link
            to="/discover"
            class="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            先看看
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  getHotFields,
  getMessageCount,
  getPaperCount,
  getResearcherCount,
} from '@/api/modules/statistics'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const hotPapers = ref([
  {
    id: 1,
    title: 'Attention Is All You Need: Transformer在自然语言处理中的突破性应用',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar',
    journal: 'Nature Machine Intelligence',
    citations: 45678,
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    title: '量子计算在药物发现中的应用前景与挑战',
    authors: '李明, 王芳, 张伟',
    journal: 'Science',
    citations: 23456,
    publishedAt: '2024-02-20',
  },
  {
    id: 3,
    title: 'CRISPR-Cas9基因编辑技术的最新进展',
    authors: 'Jennifer Doudna, Emmanuelle Charpentier',
    journal: 'Cell',
    citations: 67890,
    publishedAt: '2024-03-10',
  },
])

const recentActivities = ref([
  {
    id: 1,
    author: '王芳',
    avatar: 'https://via.placeholder.com/100',
    content: '刚刚发表了关于深度学习在蛋白质结构预测中应用的最新研究成果',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    likes: 89,
    comments: 23,
  },
  {
    id: 2,
    author: '李华',
    avatar: 'https://via.placeholder.com/100',
    content: '参加了ICML 2024大会，分享了我们在联邦学习方面的工作',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 156,
    comments: 45,
  },
  {
    id: 3,
    author: '陈明',
    avatar: 'https://via.placeholder.com/100',
    content: '启动了新的量子计算研究项目，欢迎感兴趣的同行联系合作',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 234,
    comments: 67,
  },
])

// 颜色列表，前六个依次使用
const top6Colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-pink-500',
]

const researchFields = ref<any[]>([])

// 方法
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

const searchField = (fieldName: string) => {
  router.push(`/discover?field=${encodeURIComponent(fieldName)}`)
}

// 统计数据
const researcherCount = ref(0)
const paperCount = ref(0)
const messageCount = ref(0)

// 动画显示用的数字
const animatedResearcherCount = ref(0)
const animatedPaperCount = ref(0)
const animatedMessageCount = ref(0)
const animatedProjectCount = ref(0)

function animateNumber(target: number, animatedRef: any) {
  const duration = 800 // ms
  const frameRate = 30 // fps
  const totalFrames = Math.round(duration / (1000 / frameRate))
  const start = animatedRef.value
  const increment = (target - start) / totalFrames
  let frame = 0
  function update() {
    frame++
    animatedRef.value = Math.round(start + increment * frame)
    if (frame < totalFrames) {
      requestAnimationFrame(update)
    } else {
      animatedRef.value = target
    }
  }
  update()
}

watch(researcherCount, val => animateNumber(val, animatedResearcherCount))
watch(paperCount, val => animateNumber(val, animatedPaperCount))
watch(messageCount, val => animateNumber(val, animatedMessageCount))

// 合作项目静态数值
const projectCount = ref(12834)
watch(projectCount, val => animateNumber(val, animatedProjectCount))

// 判断是否已登录
const isLoggedIn = computed(() => userStore.isAuthenticated)

onMounted(async () => {
  try {
    const [res1, res2, res3, res4] = await Promise.all([
      getResearcherCount(),
      getPaperCount(),
      getMessageCount(),
      getHotFields(),
    ])
    if (res1 && typeof res1.data === 'number') {
      researcherCount.value = (res1.data as any) || 0
    }
    if (res2 && typeof res2.data === 'number') {
      paperCount.value = (res2.data as any) || 0
    }
    if (res3 && typeof res3.data === 'number') {
      messageCount.value = (res3.data as any) || 0
    }
    if (res4 && typeof res4.data === 'object') {
      // 转为数组，按count降序取前六，手动分配颜色
      researchFields.value = Object.entries(res4.data)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => Number(b.count) - Number(a.count))
        .slice(0, 6)
        .map((item, idx) => ({ ...item, color: top6Colors[idx] || 'bg-gray-400' }))
    }
    // 启动合作项目动画
    projectCount.value = 12834
  } catch (e) {
    console.log(e)
  }
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 添加一些自定义动画 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 渐变文字效果 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
