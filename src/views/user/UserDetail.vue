<template>
  <div class="min-h-screen bg-gray-50" v-if="user">
    <!-- 用户头部信息 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <img
            v-if="user.imgUrl && user.imgUrl !== ''"
            :src="user.imgUrl"
            :alt="user.name"
            class="w-32 h-32 rounded-full object-cover shadow-lg relative"
          />
          <div
            v-else
            class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-lg relative"
          >
            <el-icon class="text-5xl text-gray-400"><UserFilled /></el-icon>
          </div>
          <div v-if="user.email" class="absolute top-2 right-2">
            <el-icon class="text-green-500 bg-white rounded-full p-1 shadow"
              ><CircleCheckFilled
            /></el-icon>
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 flex items-center">
              {{ user.name }}
              <el-icon
                v-if="user.gender === '男'"
                class="ml-2 text-blue-500"
                style="font-size: 1.5em"
                ><Male
              /></el-icon>
              <el-icon
                v-else-if="user.gender === '女'"
                class="ml-2 text-pink-500"
                style="font-size: 1.5em"
                ><Female
              /></el-icon>
            </h1>
            <p class="text-xl text-gray-600 mt-1">{{ user.title }}</p>
            <p class="text-lg text-gray-500 mt-1">{{ user.institution }}</p>
            <p class="text-sm text-gray-400 mt-1">注册时间：{{ user.createdAt }}</p>

            <div class="mt-4">
              <p class="text-gray-700">{{ user.description }}</p>
            </div>

            <div v-if="!user.email" class="mt-4 text-sm text-gray-400">
              该用户暂未注册平台账户，无具体信息
            </div>

            <div class="mt-6 flex flex-wrap gap-2" v-if="user.researchArea">
              <span
                v-for="field in user.researchArea.split(',')"
                :key="field"
                class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
              >
                {{ field.trim() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ user.publishNum }}</div>
          <div class="text-gray-600 mt-1">发表论文</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600">{{ user.subjectNum }}</div>
          <div class="text-gray-600 mt-1">进行项目数</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-purple-600">{{ user.followerNum }}</div>
          <div class="text-gray-600 mt-1">关注者</div>
        </div>
      </div>

      <!-- 论文列表 -->
      <div class="bg-white rounded-xl shadow p-4 mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4 tracking-wide">发表论文</h2>
        <div v-if="papers.length > 0">
          <div class="divide-y divide-gray-100">
            <div
              v-for="paper in papers"
              :key="paper.id"
              class="py-3 px-2 hover:bg-indigo-50/40 transition cursor-pointer group flex flex-col md:flex-row md:items-center"
            >
              <div class="flex-1 min-w-0">
                <!-- 标题行 -->
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    class="font-semibold text-gray-900 group-hover:text-indigo-600 text-base truncate max-w-[320px]"
                    :title="paper.title"
                    >{{ paper.title }}</span
                  >
                  <span
                    v-if="paper.status"
                    class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                    >{{ paper.status }}</span
                  >
                  <span
                    v-if="paper.year"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >{{ paper.year }}</span
                  >
                </div>
                <!-- 作者行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>作者：</span>
                  <span
                    v-for="author in paper.authors"
                    :key="author.id"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >{{ author.name }}</span
                  >
                </div>
                <!-- 关键词行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                  <span v-if="paper.keywords && paper.keywords.length">关键词：</span>
                  <span
                    v-for="kw in paper.keywords && paper.keywords.length
                      ? paper.keywords
                          .split(',')
                          .map(k => k.trim())
                          .filter(Boolean)
                      : []"
                    :key="kw"
                    class="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[11px] rounded-full font-medium"
                    >{{ kw }}</span
                  >
                </div>
                <!-- DOI行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 w-full">
                  <span v-if="paper.doi" class="text-blue-600 flex items-center gap-1">
                    <i class="el-icon-link"></i>DOI:
                    <span class="underline cursor-pointer" @click.stop="openDoi(paper.doi)">{{
                      paper.doi
                    }}</span>
                  </span>
                  <span
                    class="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 font-semibold ml-2"
                  >
                    <i class="el-icon-view"></i>阅读量:{{ paper.readerNum }}
                  </span>
                  <span
                    class="flex items-center gap-1 text-xs bg-pink-50 text-pink-700 rounded-full px-2 py-0.5 font-semibold"
                  >
                    <i class="el-icon-star-on"></i>点赞数:{{ paper.likeNum }}
                  </span>
                  <span
                    class="ml-auto text-indigo-600 hover:underline cursor-pointer font-medium"
                    @click.stop="goToPdfReader(paper.pdfUrl)"
                  >
                    查看详情
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-400 text-center py-8 text-base">暂无论文数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/utils/request'
import { Male, Female, UserFilled, CircleCheckFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

const route = useRoute()
const router = useRouter()

interface User {
  id: string | string[]
  name: string
  title: string
  institution: string
  imgUrl: string
  description: string
  researchArea: string
  publishNum: number
  subjectNum: number
  followerNum: number
  gender: string
  createdAt: string
  email?: string
}

interface Paper {
  id: number
  title: string
  authors: object[]
  conference: string
  venue: string
  year: number
  status: string
  keywords: string
  doi: string
  pdfUrl: string
  abstract: string
  readerNum: number
  likeNum: number
  _showFullAbstract?: boolean
}

const user = ref<User | null>(null)
const papers = ref<Paper[]>([])

onMounted(async () => {
  const userId = route.params.id
  try {
    const response = await request.get(
      'http://127.0.0.1:4523/m2/6625065-6332383-default/312231924',
      {
        params: { id: userId },
      }
    )
    if (response.data) {
      user.value = response.data
      console.log(response.data)
      // 获取论文ID列表
      const paperRes = await request.get(
        'http://127.0.0.1:4523/m2/6625065-6332383-default/312369194',
        {
          params: { id: response.data.id },
        }
      )
      if (paperRes.data && paperRes.data.publicationIds) {
        console.log(paperRes)
        const ids = Array.isArray(paperRes.data.publicationIds) ? paperRes.data.publicationIds : []
        // 并发获取所有成果详情
        const detailPromises = ids.map((pubId: number) =>
          request.get('http://127.0.0.1:4523/m2/6625065-6332383-default/312411438', {
            params: { id: pubId },
          })
        )
        const details = await Promise.all(detailPromises)
        console.log(details)
        papers.value = details.map(res => res.data)
      } else {
        papers.value = []
      }
    }
  } catch (error) {
    console.error('获取用户详情或论文失败:', error)
    user.value = null
    papers.value = []
  }
})

const goToUserDetail = (userId: number) => {
  router.push(`/user/${userId}`)
}
const openDoi = (doi: string) => {
  window.open(`https://doi.org/${doi}`, '_blank')
}
const openPdf = (url: string) => {
  window.open(url, '_blank')
}
const goToPdfReader = (pdfUrl: string) => {
  router.push({ path: '/pdf-reader', query: { url: pdfUrl } })
}

// 摘要展开/收起辅助
watch(
  papers,
  val => {
    val.forEach((p: Paper) => {
      if (typeof p._showFullAbstract === 'undefined') p._showFullAbstract = false
    })
  },
  { immediate: true }
)
</script>

<style scoped>
.el-icon-document-copy::before {
  content: '\e6e0';
  font-family: 'element-icons' !important;
}
.el-icon-download::before {
  content: '\e6e2';
  font-family: 'element-icons' !important;
}
.el-icon-view::before {
  content: '\e6ce';
  font-family: 'element-icons' !important;
}
.el-icon-star-on::before {
  content: '\e6a1';
  font-family: 'element-icons' !important;
}
.el-icon-link::before {
  content: '\e6e5';
  font-family: 'element-icons' !important;
}
.el-icon-document::before {
  content: '\e6e3';
  font-family: 'element-icons' !important;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
