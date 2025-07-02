<template>
  <div
    v-if="user"
    class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden"
  >
    <!-- 学术元素背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 书本图标 -->
      <div class="absolute top-20 left-10 opacity-[0.05] transform rotate-12 animate-fade-pulse">
        <svg class="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"
          />
        </svg>
      </div>

      <!-- 烧杯图标 -->
      <div
        class="absolute top-40 right-20 opacity-[0.04] transform -rotate-6 animate-fade-pulse-delay"
      >
        <svg class="w-28 h-28 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9,2V7.38L4.06,16.11C3.8,16.61 4.17,17.23 4.73,17.23H19.27C19.83,17.23 20.2,16.61 19.94,16.11L15,7.38V2H9M11,4H13V7.38L14,9H10L11,7.38V4M8.5,11H15.5L16.5,13H7.5L8.5,11Z"
          />
        </svg>
      </div>

      <!-- 望远镜图标 -->
      <div
        class="absolute bottom-32 left-20 opacity-[0.1] transform rotate-45 animate-fade-pulse-slow"
      >
        <svg
          t="1751381075713"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5509"
          width="200"
          height="200"
        >
          <path
            d="M998.453213 578.067455l-72.874118-42.012837 8.298832-14.263617a51.089684 51.089684 0 0 0-18.802041-69.891725L333.509307 116.833938A51.867699 51.867699 0 0 0 337.140046 83.119933 51.867699 51.867699 0 0 0 312.762227 51.999314l-77.801549-45.124899a50.700676 50.700676 0 0 0-25.93385-6.87247A51.867699 51.867699 0 0 0 164.679946 26.065464L6.87247 299.148901a51.867699 51.867699 0 0 0-5.18677 38.900775A51.867699 51.867699 0 0 0 25.93385 369.040626l77.801549 45.124899a51.867699 51.867699 0 0 0 25.933849 6.87247 51.089684 51.089684 0 0 0 40.586475-20.74708l112.1639 64.834624a230.033247 230.033247 0 0 0 178.684224 220.437723V972.650978H281.511938a25.93385 25.93385 0 0 0 0 51.219353H691.137094a25.93385 25.93385 0 0 0 0-51.219353H511.934193V691.268708A222.901438 222.901438 0 0 0 622.412393 661.444781l128.761563 74.30048a50.960015 50.960015 0 0 0 25.93385 6.87247 50.571007 50.571007 0 0 0 44.346883-25.93385l8.298832-14.263617 72.744448 42.012836A51.219353 51.219353 0 0 0 972.519363 726.279406l44.99523-77.801549A51.089684 51.089684 0 0 0 998.453213 578.067455zM51.867699 324.304735L209.026828 51.999314l77.80155 45.124898L129.669248 369.818642z m460.066494 315.74462a178.035878 178.035878 0 0 1-173.756793-142.636173l230.033247 132.78131a171.552416 171.552416 0 0 1-56.276454 9.854863z m264.654936 51.8677L196.189573 356.33304l112.682577-195.281888 580.529225 335.195007z m151.064674 9.076847l-72.874117-42.012836 45.124898-77.801549L972.519363 622.544007z"
            fill="#5FC2DD"
            p-id="5510"
          ></path>
        </svg>
      </div>

      <!-- 原子图标 -->
      <div class="absolute top-80 right-40 opacity-[0.05] transform -rotate-12 animate-spin-gentle">
        <svg class="w-36 h-36 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z"
          />
        </svg>
      </div>

      <!-- 齿轮图标 -->
      <div
        class="absolute bottom-[10rem] right-[15rem] opacity-[0.04] transform rotate-12 animate-spin-clockwise"
      >
        <svg class="w-36 h-36 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
          />
        </svg>
      </div>

      <!-- 数学公式装饰 -->
      <div
        class="absolute top-1/2 left-10 opacity-[0.08] transform -rotate-6 -translate-y-1/2 animate-fade-pulse-medium"
      >
        <svg class="w-56 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 260 80">
          <text
            x="10"
            y="40"
            font-family="serif"
            font-size="48"
            font-style="italic"
            font-weight="bold"
          >
            ∑ƒ(x)dx
          </text>
          <text x="10" y="70" font-family="serif" font-size="32" font-weight="bold">
            ∫ π = 3.14...
          </text>
        </svg>
      </div>
    </div>
    <!-- 用户头部信息 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <img
            v-if="user.imgUrl && user.imgUrl !== ''"
            :src="'/api' + user.imgUrl"
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
                <el-button
                  type="primary"
                  size="small"
                  class="ml-4 message-btn"
                  @click="handleMessageSend(Number(route.params.id))"
                >
                  <el-icon style="margin-right: 4px">
                    <Message />
                  </el-icon>
                  发送消息
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
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 transition-colors duration-200 flex items-center"
                    @click="showFullBio = !showFullBio"
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ formatNumber(user.publishNum) }}</div>
          <div class="text-gray-600 mt-1">发表论文</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600">{{ formatNumber(user.subjectNum) }}</div>
          <div class="text-gray-600 mt-1">项目数</div>
        </div>
        <div
          class="bg-white rounded-lg shadow p-6 text-center follower-card cursor-pointer transition-all"
          @click="handleShowFollowers"
        >
          <div class="text-3xl font-bold text-purple-600">{{ formatNumber(user.followerNum) }}</div>
          <div class="text-gray-600 mt-1">关注者</div>
        </div>
      </div>

      <!-- 论文/成果 Tab栏 -->
      <div class="bg-white rounded-xl shadow p-4 mt-8">
        <!-- 顶部左对齐横向极简Tab栏 -->
        <div class="flex gap-2 sm:gap-6 border-b mb-2">
          <button
            class="tab-top-btn"
            :class="mainTab === 'paper' ? 'tab-top-active' : ''"
            @click="mainTab = 'paper'"
          >
            相关成果
            <span v-if="mainTab === 'paper'" class="tab-top-underline"></span>
          </button>
          <button
            class="tab-top-btn"
            :class="mainTab === 'achievement' ? 'tab-top-active' : ''"
            @click="mainTab = 'achievement'"
          >
            相关项目
            <span v-if="mainTab === 'achievement'" class="tab-top-underline"></span>
          </button>
        </div>
        <div v-if="mainTab === 'paper'">
          <!-- <h2 class="text-xl font-bold text-gray-900 mb-4 tracking-wide">发表论文</h2> -->
          <div v-if="papers.length > 0">
            <div class="divide-y divide-gray-100">
              <div
                v-for="paper in papers"
                :key="paper.id"
                class="py-3 px-2 hover:bg-indigo-50/40 transition cursor-pointer group flex flex-col md:flex-row md:items-center"
              >
                <div class="flex-1 min-w-0" @click="showPaperDetail(paper)">
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
                      >{{ getStatusLabel(paper.status) }}</span
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
                      :key="author.authorId || author.authorName"
                      class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                      >{{ author.authorName }}</span
                    >
                    <span
                      v-if="
                        !paper.authors ||
                        !Array.isArray(paper.authors) ||
                        paper.authors.length === 0
                      "
                      class="text-gray-400"
                    >
                      暂无作者信息
                    </span>
                  </div>
                  <!-- 关键词行 -->
                  <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>关键词：</span>
                    <span
                      v-for="kw in (paper.keywords || '')
                        .split(',')
                        .map(k => k.trim())
                        .filter(Boolean)"
                      :key="kw"
                      class="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[11px] rounded-full font-medium"
                      >{{ kw }}</span
                    >
                    <span
                      v-if="!paper.keywords || paper.keywords.trim() === ''"
                      class="text-gray-400 italic"
                      >暂无关键词</span
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
                      class="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 font-semibold"
                    >
                      <i class="el-icon-view" style="display: flex; align-items: center"></i
                      ><span style="display: flex; align-items: center"
                        >阅读量:{{ formatNumber(paper.readerNum) }}</span
                      >
                    </span>

                    <el-button
                      class="ml-auto"
                      type="primary"
                      plain
                      style="background: #fff; color: #333; border: 1px solid #dcdfe6"
                      size="small"
                      :style="{
                        background: '#fff',
                        color: hoveredPaperId === paper.id ? '#409EFF' : '#333',
                        border:
                          hoveredPaperId === paper.id ? '1px solid #409EFF' : '1px solid #dcdfe6',
                      }"
                      @click="showPaperDetail(paper)"
                      @mouseover="hoveredPaperId = paper.id"
                      @mouseleave="hoveredPaperId = null"
                    >
                      查看详情
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-400 text-center py-8 text-base">暂无论文数据</div>
        </div>
        <div v-else-if="mainTab === 'achievement'">
          <div v-if="projects.length > 0">
            <div class="divide-y divide-gray-100">
              <div
                v-for="project in projects"
                :key="project.id"
                class="py-3 px-2 hover:bg-indigo-50/40 transition cursor-pointer group flex flex-col md:flex-row md:items-center"
              >
                <div class="flex-1 min-w-0">
                  <!-- 项目标题 -->
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="font-semibold text-gray-900 group-hover:text-indigo-600 text-base truncate max-w-[320px]"
                      :title="project.title || '无标题'"
                      >{{ project.title || '无标题' }}</span
                    >
                    <span
                      v-if="project.researchArea"
                      class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                      >{{ project.researchArea }}</span
                    >
                  </div>
                  <!-- 项目描述 -->
                  <div class="text-gray-600 text-sm mb-2 line-clamp-2">
                    {{ project.description || '暂无简介' }}
                  </div>
                  <!-- 其他信息 -->
                  <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>负责人：{{ project.owner?.name || '未知' }}</span>
                    <span>招募人数：{{ project.recruitNum }}</span>
                    <span>已招募：{{ project.recruitedNum }}</span>
                    <span>起止时间：{{ project.startTime }} ~ {{ project.endTime }}</span>
                  </div>
                </div>
                <!-- 操作按钮 -->
                <div class="flex flex-col gap-2 md:items-end items-start mt-2 md:mt-0">
                  <el-button size="small" type="default" plain @click="viewProjectDetail(project)">
                    查看详情
                  </el-button>
                  <el-button :disabled="project.owner.id === userStore.user?.id" size="small" type="default" plain @click="applyToProject(project)">
                    申请加入
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-400 text-center py-8 text-base">暂无成果数据</div>
        </div>
      </div>
    </div>
    <ApplyProjectDialog
      :visible="showApplicationDialog"
      :project="selectedProjectForApplication"
      @close="showApplicationDialog = false"
      @success="handleApplicationSuccess"
    />
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      :is-my-project="selectedProjectForDetail && selectedProjectForDetail.projBelongings === 3"
      @close="showProjectDetail = false"
    />
    <FollowersDialog
      :id="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id"
      v-model:visible="showFollowersDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  follow,
  getFollowers,
  getFollowing,
  getIfFollow,
  getShowFollow,
  getUserDetail,
  getUserPapers,
  unfollow,
} from '@/api/modules/user'
import type { Paper, UserDetail } from '@/api/types/user'
import type { Author } from '@/api/types/publication'
import {
  CircleCheckFilled,
  Close,
  Female,
  Male,
  Message,
  Plus,
  UserFilled,
} from '@element-plus/icons-vue'
import { ElIcon, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { Project } from '@/api/types/project'
import { getUserProjects } from '@/api/modules/project'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'
import ApplyProjectDialog from '@/components/project/ApplyProjectDialog.vue'
import FollowersDialog from '@/components/user/FollowersDialog.vue'
import { messagesAPI } from '@/api/modules/messages'
import { wsService } from '@/utils/websocketChat'

interface DetailProject {
  id: number
  title: string
  description: string
  fields: string[]
  requirements: string[]
  status: string
  maxMembers: number
  memberCount: number
  applicationCount: number
  createdAt: string
  startDate?: string
  endDate?: string
  contactInfo?: string
  projBelongings?: number
  owner: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }
  collaborators: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }[]
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const user = ref<UserDetail | null>(null)
const papers = ref<Paper[]>([])
const isFollowing = ref(false)
const showFullBio = ref(false)
const mainTab = ref('paper')
const projects = ref<Project[]>([])
const selectedProjectForDetail = ref<DetailProject | null>(null)
const showProjectDetail = ref(false)
const showApplicationDialog = ref(false)
const selectedProjectForApplication = ref<Project | null>(null)
const showFollow = ref(false)
const showFollowersDialog = ref(false)
const followersList = ref<any[]>([])
const followingList = ref<any[]>([])
const conversations = ref<any[]>([])
const hoveredPaperId = ref<number | null>(null)

const loadProjects = async () => {
  const projectRes = await getUserProjects(user.value?.id?.toString() || '')
  if (projectRes.data && Array.isArray(projectRes.data)) {
    projects.value = projectRes.data
  } else {
    projects.value = []
  }
}

// 加载用户数据的函数
const loadUserData = async (userId: string) => {
  try {
    const response = await getUserDetail(userId)
    if (response.data) {
      user.value = response.data
      // 获取是否关注
      try {
        const followRes = await getIfFollow(response.data.id)
        if (followRes && typeof followRes.data === 'boolean') {
          isFollowing.value = followRes.data
        } else {
          isFollowing.value = false
        }
      } catch (e) {
        isFollowing.value = false
      }
      // 获取论文数据
      const paperRes = await getUserPapers(response.data.id)
      if (paperRes.data && Array.isArray(paperRes.data)) {
        // 处理新的数据结构：将authors和publication合并为Paper格式
        papers.value = paperRes.data
          .filter(
            item => item && typeof item === 'object' && item.publication && item.publication.id
          )
          .map(item => ({
            ...item.publication,
            authors: item.authors || [],
          }))
      } else {
        papers.value = []
      }
      await loadProjects()
      const showFollowRes = await getShowFollow(response.data.id)
      if (showFollowRes && typeof showFollowRes.data === 'boolean') {
        showFollow.value = showFollowRes.data
      } else {
        showFollow.value = false
      }
      if (showFollowRes.data == true) {
        const [followersRes, followingRes] = await Promise.all([
          getFollowers(response.data.id),
          getFollowing(response.data.id),
        ])
        followersList.value = followersRes.data
        followingList.value = followingRes.data
      }
    }
  } catch (error) {
    console.error('获取用户详情或论文失败:', error)
    user.value = null
    papers.value = []
  }
}

onMounted(async () => {
  const userId = route.params.id
  await loadUserData(userId as string)
  await handleChat()
})

// 监听路由参数变化，当用户ID改变时重新加载数据
watch(
  () => route.params.id,
  async (newUserId, oldUserId) => {
    if (newUserId !== oldUserId) {
      await loadUserData(newUserId as string)
    }
  }
)

const currentUserId = computed(() => {
  const userId = userStore.user?.id
  return typeof userId === 'string' ? parseInt(userId) : userId || 1
})

const handleApplicationSuccess = () => {
  showApplicationDialog.value = false
  // 重新加载项目列表以更新状态
  loadProjects()
}
const openDoi = (doi: string) => {
  window.open(`https://doi.org/${doi}`, '_blank')
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

const getProjectStatus = (project: Project): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const endTime = new Date(project.endTime)

  // 检查时间是否有效
  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return 'recruiting' // 如果时间无效，默认为招募中
  }

  // 如果已经结束
  if (now > endTime) {
    return 'completed'
  }

  // 如果正在进行中
  if (now >= startTime && now <= endTime) {
    return 'ongoing'
  }

  // 如果还没开始
  if (now < startTime) {
    // 如果招募人数已满，则为进行中
    if (project.recruitedNum >= project.recruitNum) {
      return 'pending'
    }
  }

  return 'recruiting'
}

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
      // ElMessage.error('操作失败，请稍后重试')
      console.log(e)
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
    // 跳转到成果详情页面，传递receiverId参数
    router.push({
      path: `/publication/${paper.id}`,
      query: {
        receiverId: user.value?.id?.toString() || '',
      },
    })
  }
}

const viewProjectDetail = (project: Project) => {
  // 转换API的Project类型为ProjectDetailCard组件期望的格式
  const adaptedProject: DetailProject = {
    id: project.id,
    title: project.title,
    description: project.description || '无',
    fields: (project.researchArea || '')
      .split(',')
      .filter(field => field.trim())
      .map(field => field.trim()),
    requirements: (project.collaborationCondition || '')
      .split(',')
      .filter(req => req.trim())
      .map(req => req.trim()),
    status: getProjectStatus(project),
    maxMembers: project.recruitNum,
    memberCount: project.recruitedNum,
    applicationCount: parseInt(project.applyNum),
    createdAt: project.createdAt || '',
    startDate: project.startTime || '',
    endDate: project.endTime || '',
    contactInfo: project.contact || '无',
    projBelongings: project.projBelongings,
    owner: {
      id: project.owner.id,
      name: project.owner.name,
      institution: project.owner.institution,
      title: project.owner.title || '未知职位',
      imgUrl: project.owner.imgUrl,
    },
    collaborators: (project.cooperators || []).map(cooperator => ({
      id: cooperator.id,
      name: cooperator.name,
      institution: cooperator.institution,
      title: cooperator.title || '未知职位',
      imgUrl: cooperator.imgUrl,
    })),
  }

  selectedProjectForDetail.value = adaptedProject
  showProjectDetail.value = true
}

function getAuthors(authors: Author[] | undefined): Author[] {
  if (!authors || !Array.isArray(authors)) return []
  return authors.filter(author => author && author.authorName && author.authorName.trim() !== '')
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (target && !target.src.endsWith('/default-avatar.png')) {
    target.src = '/default-avatar.png'
  }
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status] || status
}
// 申请加入项目
const applyToProject = (project: Project) => {
  selectedProjectForApplication.value = project
  showApplicationDialog.value = true
}

const handleShowFollowers = async () => {
  if (showFollow.value) {
    // 拉取关注者和关注他的人
    // const userId = user.value?.id
    // if (!userId) return
    // const [followersRes, followingRes] = await Promise.all([
    //   getFollowers(userId),
    //   getFollowing(userId),
    // ])
    // followersList.value = (followersRes.data && Array.isArray(followersRes.data)) ? followersRes.data : []
    // followingList.value = (followingRes.data && Array.isArray(followingRes.data)) ? followingRes.data : []
    followersList.value = []
    followingList.value = []
    showFollowersDialog.value = true
  } else {
    ElMessage.warning('由于该用户的隐私设置，无法查看其关注信息')
  }
}

const handleChat = async () => {
  const res = await messagesAPI.getConversations()

  // 适配新的数据结构：data.list
  const convList = Array.isArray(res.data?.list) ? res.data.list : []

  if (convList.length > 0) {
    conversations.value = convList.map(conv => ({
      id: conv.userId,
      userId: conv.userId,
      conversationId:
        conv.conversationId ||
        `conv_${Math.min(currentUserId.value, conv.userId)}_${Math.max(
          currentUserId.value,
          conv.userId
        )}`,
      name: conv.name || '未知用户',
      avatar: '/api' + conv.avatar,
      institution: conv.institution || '',
      online: conv.online ?? false,
      isRead: conv.isRead ?? conv.unreadCount === 0,
      unreadCount: conv.unreadCount || 0,
      lastMessage: {
        content: conv.lastMessage?.content || '',
        type: conv.lastMessage?.type || 'text',
        isMe: conv.lastMessage?.isMe || false,
      },
      lastMessageTime: conv.lastMessageTime || new Date().toISOString(),
    }))
  } else {
    conversations.value = []
  }
}

const handleMessageSend = async (userId: number) => {
  // 生成标准格式的 conversationId
  const myId = currentUserId.value
  const conversationId = `conv_${Math.min(myId, userId)}_${Math.max(myId, userId)}`
  wsService.connect(currentUserId.value.toString())

  // 检查是否已经存在该会话
  const existingConversation = conversations.value.find(
    conv => conv.conversationId === conversationId
  )

  if (existingConversation) {
    router.push(`/chat/${userId}`)
  } else {
    try {
      // 创建新会话
      // 跳转到聊天页面
      router.push(`/chat/${userId}`)
      // 可选：更新本地会话列表
    } catch (error) {
      console.error('创建对话失败:', error)
      ElMessage.error('无法开始聊天，请重试')
    }
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
  line-clamp: 1;
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
  transition:
    background 0.3s,
    transform 0.2s;
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
.message-btn {
  background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
  border: none;
  color: #fff;
  box-shadow: 0 2px 8px rgba(255, 154, 86, 0.15);
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 600;
  font-size: 1rem;
  height: 34px;
  min-height: 34px;
  line-height: 34px;
  transition: all 0.3s ease;
}
.message-btn:hover {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff9a56 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 154, 86, 0.3);
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
  line-clamp: 3;
}

.bio-text {
  text-align: justify;
  word-break: break-word;
}

/* 顶部左对齐横向极简Tab栏样式 */
.tab-top-btn {
  position: relative;
  background: none;
  border: none;
  outline: none;
  font-size: 1.18rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.2rem 0.7rem 0.7rem 0.2rem;
  margin-bottom: -1px;
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  transition:
    color 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  overflow: visible;
}
.tab-top-btn:hover:not(.tab-top-active) {
  color: #3730a3;
}
.tab-top-btn:hover:not(.tab-top-active)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 90%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #a5b4fc 0%, #bae6fd 100%);
  opacity: 0.7;
  z-index: 1;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.tab-top-active {
  color: #4338ca;
  font-weight: 700;
}
.tab-top-underline {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 90%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.1);
  z-index: 2;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (max-width: 640px) {
  .tab-top-btn {
    font-size: 1rem;
    padding: 0.6rem 0.8rem 0.6rem 0.2rem;
  }
  .tab-top-underline {
    width: 90%;
  }
  .tab-top-btn:hover:not(.tab-top-active)::after {
    width: 90%;
  }
}
.follower-card {
  transition:
    box-shadow 0.2s,
    background 0.2s,
    transform 0.2s;
}
.follower-card:hover {
  /* background: #ede9fe;  不改变背景色 */
  box-shadow: 0 4px 24px 0 rgba(139, 92, 246, 0.15);
  transform: translateY(-2px) scale(1.03);
}

@keyframes fadePulse {
  0%,
  100% {
    opacity: 0.02;
  }
  50% {
    opacity: 0.06;
  }
}

@keyframes fadePulseDelay {
  0%,
  100% {
    opacity: 0.015;
  }
  50% {
    opacity: 0.04;
  }
}

@keyframes fadePulseSlow {
  0%,
  100% {
    opacity: 0.025;
  }
  50% {
    opacity: 0.055;
  }
}

@keyframes fadePulseFast {
  0%,
  100% {
    opacity: 0.02;
  }
  50% {
    opacity: 0.045;
  }
}

@keyframes fadePulseMedium {
  0%,
  100% {
    opacity: 0.015;
  }
  50% {
    opacity: 0.035;
  }
}

@keyframes fadePulseUltraSlow {
  0%,
  100% {
    opacity: 0.025;
  }
  50% {
    opacity: 0.065;
  }
}

@keyframes fadePulseDna {
  0%,
  100% {
    opacity: 0.01;
  }
  50% {
    opacity: 0.035;
  }
}

/* 缓慢旋转动画 */
@keyframes spinGentle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinClockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 应用动画 */
.animate-fade-pulse {
  animation: fadePulse 8s ease-in-out infinite;
}

.animate-fade-pulse-delay {
  animation: fadePulseDelay 10s ease-in-out infinite 2s;
}

.animate-fade-pulse-slow {
  animation: fadePulseSlow 12s ease-in-out infinite 1s;
}

.animate-fade-pulse-fast {
  animation: fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-fade-pulse-medium {
  animation: fadePulseMedium 9s ease-in-out infinite 3s;
}

.animate-fade-pulse-ultra-slow {
  animation: fadePulseUltraSlow 15s ease-in-out infinite 4s;
}

.animate-fade-pulse-dna {
  animation: fadePulseDna 7s ease-in-out infinite 1.5s;
}

.animate-spin-gentle {
  animation: spinGentle 40s linear infinite;
}

.animate-spin-clockwise {
  animation: spinClockwise 35s linear infinite;
}

/* 组合动画 */
.animate-spin-gentle.animate-fade-pulse-fast {
  animation:
    spinGentle 40s linear infinite,
    fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-spin-clockwise.animate-fade-pulse-medium {
  animation:
    spinClockwise 35s linear infinite,
    fadePulseMedium 9s ease-in-out infinite 3s;
}
</style>
