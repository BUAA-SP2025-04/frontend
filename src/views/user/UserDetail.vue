<template>
  <div class="min-h-screen bg-gray-50" v-if="user">
    <!-- 用户头部信息 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <img
            v-if="user.imgUrl && user.imgUrl !== ''"
            :src="user.imgUrl"
            :alt="user.name || '用户头像'"
            class="w-32 h-32 rounded-full object-cover shadow-lg relative"
            @error="handleImageError"
          />
          <div
            v-else
            class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-lg relative"
          >
            <el-icon class="text-5xl text-gray-400"><UserFilled /></el-icon>
          </div>
          <div v-if="user.email && user.email.trim() !== ''" class="absolute top-2 right-2">
            <el-icon class="text-green-500 bg-white rounded-full p-1 shadow"
              ><CircleCheckFilled
            /></el-icon>
          </div>
          <div class="flex-1 flex flex-col md:flex-row gap-8 w-full">
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 flex items-center">
                {{ user.name || '未知用户' }}
                <el-icon
                  v-if="user.gender === '男' || user.gender === 'male'"
                  class="ml-2 text-blue-500"
                  style="font-size: 1.5em"
                  ><Male
                /></el-icon>
                <el-icon
                  v-else-if="user.gender === '女' || user.gender === 'female'"
                  class="ml-2 text-pink-500"
                  style="font-size: 1.5em"
                  ><Female
                /></el-icon>
                <el-button
                  :type="isFollowing ? 'danger' : 'primary'"
                  size="small"
                  class="ml-4 follow-btn"
                  @click="handleFollowAction"
                >
                  <el-icon style="margin-right: 4px">
                    <Plus v-if="!isFollowing" />
                    <Close v-else />
                  </el-icon>
                  {{ isFollowing ? '不再关注' : '关注' }}
                </el-button>
              </h1>
              <p class="text-xl text-gray-600 mt-1">{{ user.title || '暂无职称' }}</p>
              <p class="text-lg text-gray-500 mt-1">{{ user.institution || '未知机构' }}</p>
              <div class="mt-4">
                <div v-if="user.bio && user.bio.trim() !== ''" class="relative">
                  <p
                    class="text-gray-700 leading-relaxed bio-text"
                    :class="{ 'line-clamp-3': !showFullBio && user.bio.length > 120 }"
                    style="line-height: 1.8; font-size: 15px"
                  >
                    {{ user.bio }}
                  </p>
                  <button
                    v-if="user.bio.length > 120"
                    @click="showFullBio = !showFullBio"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 transition-colors duration-200 flex items-center"
                  >
                    <span>{{ showFullBio ? '收起' : '展开' }}</span>
                    <svg
                      class="w-4 h-4 ml-1 transition-transform duration-200"
                      :class="{ 'rotate-180': showFullBio }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
                <p v-else class="text-gray-500 italic" style="line-height: 1.8; font-size: 15px">
                  {{ user.bio || '暂无个人简介' }}
                </p>
              </div>
            </div>
            <div class="md:w-64 w-full flex flex-col gap-4 md:items-end items-start mt-6 md:mt-0">
              <div class="text-base font-bold text-gray-700">
                注册日期：{{ formatDate(user.createdAt) }}
              </div>
              <div
                v-if="user.researchArea && user.researchArea.trim() !== ''"
                class="flex flex-col gap-2 max-h-48 overflow-hidden relative"
              >
                <span
                  v-for="field in (user.researchArea || '')
                    .split(',')
                    .map(f => f.trim())
                    .filter(Boolean)
                    .slice(0, 6)"
                  :key="field"
                  class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full w-fit"
                >
                  {{ field }}
                </span>
                <span
                  v-if="(user.researchArea || '').split(',').filter(f => f.trim()).length > 6"
                  class="text-xs text-gray-400 mt-1"
                  >更多...</span
                >
              </div>
              <!-- 如果没有研究领域，显示默认标签 -->
              <div v-else class="flex flex-col gap-2">
                <span class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full w-fit">
                  暂无研究领域
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ formatNumber(user.publishNum) }}</div>
          <div class="text-gray-600 mt-1">发表论文</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600">{{ formatNumber(user.subjectNum) }}</div>
          <div class="text-gray-600 mt-1">进行项目数</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-purple-600">{{ formatNumber(user.followerNum) }}</div>
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
                    :title="paper.title || '无标题'"
                    >{{ paper.title || '无标题' }}</span
                  >
                  <span
                    v-if="paper.status && paper.status.trim() !== ''"
                    class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                    >{{ paper.status }}</span
                  >
                  <span
                    v-if="paper.year && paper.year.toString().trim() !== ''"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >{{ paper.year }}</span
                  >
                </div>
                <!-- 作者行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>作者：</span>
                  <span
                    v-for="author in getAuthors(paper.authors)"
                    :key="author"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >{{ author }}</span
                  >
                  <span
                    v-if="
                      !paper.authors ||
                      paper.authors.trim() === '' ||
                      (paper.authors || '').split(',').filter(author => author.trim() !== '')
                        .length === 0
                    "
                    class="text-gray-400"
                  >
                    暂无作者信息
                  </span>
                </div>
                <!-- 关键词行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                  <span v-if="paper.keywords && paper.keywords.trim() !== ''">关键词：</span>
                  <span
                    v-for="kw in (paper.keywords || '')
                      .split(',')
                      .map(k => k.trim())
                      .filter(Boolean)"
                    :key="kw"
                    class="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[11px] rounded-full font-medium"
                    >{{ kw }}</span
                  >
                </div>
                <!-- DOI行 -->
                <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 w-full">
                  <span
                    v-if="paper.doi && paper.doi.trim() !== ''"
                    class="text-blue-600 flex items-center gap-1"
                  >
                    <i class="el-icon-link"></i>DOI:
                    <span class="underline cursor-pointer" @click.stop="openDoi(paper.doi)">{{
                      paper.doi
                    }}</span>
                  </span>
                  <span
                    class="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 font-semibold ml-2"
                  >
                    <i class="el-icon-view"></i>阅读量:{{ formatNumber(paper.readerNum) }}
                  </span>
                  <span
                    class="flex items-center gap-1 text-xs bg-pink-50 text-pink-700 rounded-full px-2 py-0.5 font-semibold"
                  >
                    <i class="el-icon-star-on"></i>点赞数:{{ formatNumber(paper.likeNum) }}
                  </span>
                  <span
                    class="ml-auto text-indigo-600 hover:underline cursor-pointer font-medium"
                    @click="showPaperDetail(paper)"
                  >
                    查看详情
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-400 text-center py-8 text-base">暂无论文数据</div>
        <publicationDetail
          v-if="currentPaper"
          :achievement="currentPaper"
          v-model:visible="detailDialogVisible"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserDetail, getUserPapers, follow, getIfFollow, unfollow } from '@/api/modules/user'
import type { UserDetail, Paper } from '@/api/types/user'
import { Male, Female, UserFilled, CircleCheckFilled, Plus, Close } from '@element-plus/icons-vue'
import { ElIcon, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import publicationDetail from '@/components/publicationDetail.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const user = ref<UserDetail | null>(null)
const papers = ref<Paper[]>([])
const detailDialogVisible = ref(false)
const currentPaper = ref<Paper | null>(null)
const isFollowing = ref(false)
const showFullBio = ref(false)

onMounted(async () => {
  const userId = route.params.id
  try {
    const response = await getUserDetail(userId as string)
    if (response.data) {
      user.value = response.data
      // // 检查是否已关注该用户
      // try {
      //   const followResponse = await getIfFollow(response.data.id)
      //   if (followResponse.data) {
      //     isFollowing.value = followResponse.data
      //   }
      // } catch (followError) {
      //   console.error('检查关注状态失败:', followError)
      //   isFollowing.value = false
      // }
      // 获取论文数据
      const paperRes = await getUserPapers(response.data.id)
      console.log(paperRes)
      if (paperRes.data && Array.isArray(paperRes.data)) {
        // 直接使用返回的论文数据
        papers.value = paperRes.data
          .filter(paper => paper && typeof paper === 'object' && paper.id) // 确保paper是有效对象
          .map(paper => {
            // 确保authors字段是字符串格式
            if (!paper.authors || typeof paper.authors !== 'string') {
              paper.authors = ''
            }
            return paper
          })
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

const handleFollowAction = async () => {
  if (user.value) {
    let toBeFollowedId = user.value.id
    if (Array.isArray(toBeFollowedId)) toBeFollowedId = toBeFollowedId[0]
    try {
      if (isFollowing.value) {
        await unfollow(toBeFollowedId)
        ElMessage.success(`已取消关注 ${user.value.name}`)
        isFollowing.value = false
      } else {
        await follow(toBeFollowedId)
        ElMessage.success(`已关注 ${user.value.name}`)
        isFollowing.value = true
      }
      // 重新获取用户信息以更新粉丝数
      const userResponse = await getUserDetail(toBeFollowedId.toString())
      if (userResponse.data) {
        user.value = userResponse.data
      }
    } catch (e) {
      ElMessage.error('操作失败，请稍后重试')
    }
  }
}

// 日期格式化（只显示日期部分）
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

// 格式化数字
function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }
  return num.toLocaleString()
}

const showPaperDetail = (paper: Paper) => {
  if (paper && paper.id) {
    // 为publicationDetail组件准备数据格式
    const formattedPaper = {
      ...paper,
      // authors 保持为字符串类型
      authors: paper.authors || '',
    }
    currentPaper.value = formattedPaper
    detailDialogVisible.value = true
  }
}

function getAuthors(authors: string | undefined): string[] {
  if (!authors || authors.trim() === '') return []
  return authors
    .split(',')
    .map(a => a.trim())
    .filter(Boolean)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '/default-avatar.png'
  }
}
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
.follow-btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
  color: #fff;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 600;
  font-size: 1rem;
  height: 34px;
  min-height: 34px;
  line-height: 34px;
  transition: background 0.3s, transform 0.2s;
}
.follow-btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
}
.follow-btn.el-button--danger {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
}
.follow-btn.el-button--danger:hover {
  background: linear-gradient(90deg, #f87171 0%, #ef4444 100%);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.25);
}
/* 右侧信息区关键词纵向排列和隐藏样式 */
.md\:w-64 .flex-col {
  max-height: 12rem;
  overflow: hidden;
}

/* Bio文本截断样式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bio-text {
  text-align: justify;
  word-break: break-word;
}
</style>
