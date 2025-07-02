<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden">
    <!-- 学术元素背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 书本图标 -->
      <div class="absolute top-20 left-10 opacity-[0.05] transform rotate-12 animate-fade-pulse">
        <svg class="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>
      
      <!-- 烧杯图标 -->
      <div class="absolute top-40 right-20 opacity-[0.04] transform -rotate-6 animate-fade-pulse-delay">
        <svg class="w-28 h-28 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9,2V7.38L4.06,16.11C3.8,16.61 4.17,17.23 4.73,17.23H19.27C19.83,17.23 20.2,16.61 19.94,16.11L15,7.38V2H9M11,4H13V7.38L14,9H10L11,7.38V4M8.5,11H15.5L16.5,13H7.5L8.5,11Z"/>
        </svg>
      </div>
      
      <!-- 望远镜图标 -->
      <div class="absolute bottom-32 left-20 opacity-[0.1] transform rotate-45 animate-fade-pulse-slow">
      <svg t="1751381075713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5509" width="200" height="200"><path d="M998.453213 578.067455l-72.874118-42.012837 8.298832-14.263617a51.089684 51.089684 0 0 0-18.802041-69.891725L333.509307 116.833938A51.867699 51.867699 0 0 0 337.140046 83.119933 51.867699 51.867699 0 0 0 312.762227 51.999314l-77.801549-45.124899a50.700676 50.700676 0 0 0-25.93385-6.87247A51.867699 51.867699 0 0 0 164.679946 26.065464L6.87247 299.148901a51.867699 51.867699 0 0 0-5.18677 38.900775A51.867699 51.867699 0 0 0 25.93385 369.040626l77.801549 45.124899a51.867699 51.867699 0 0 0 25.933849 6.87247 51.089684 51.089684 0 0 0 40.586475-20.74708l112.1639 64.834624a230.033247 230.033247 0 0 0 178.684224 220.437723V972.650978H281.511938a25.93385 25.93385 0 0 0 0 51.219353H691.137094a25.93385 25.93385 0 0 0 0-51.219353H511.934193V691.268708A222.901438 222.901438 0 0 0 622.412393 661.444781l128.761563 74.30048a50.960015 50.960015 0 0 0 25.93385 6.87247 50.571007 50.571007 0 0 0 44.346883-25.93385l8.298832-14.263617 72.744448 42.012836A51.219353 51.219353 0 0 0 972.519363 726.279406l44.99523-77.801549A51.089684 51.089684 0 0 0 998.453213 578.067455zM51.867699 324.304735L209.026828 51.999314l77.80155 45.124898L129.669248 369.818642z m460.066494 315.74462a178.035878 178.035878 0 0 1-173.756793-142.636173l230.033247 132.78131a171.552416 171.552416 0 0 1-56.276454 9.854863z m264.654936 51.8677L196.189573 356.33304l112.682577-195.281888 580.529225 335.195007z m151.064674 9.076847l-72.874117-42.012836 45.124898-77.801549L972.519363 622.544007z" fill="#5FC2DD" p-id="5510"></path></svg>
      </div>
      
      <!-- 原子图标 -->
      <div class="absolute top-80 right-40 opacity-[0.05] transform -rotate-12 animate-spin-gentle">
        <svg class="w-36 h-36 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z"/>
        </svg>
      </div>
      
      <!-- 齿轮图标 -->
      <div class="absolute bottom-[10rem] right-[15rem] opacity-[0.04] transform rotate-12 animate-spin-clockwise">
        <svg class="w-36 h-36 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      </div>
      
      <!-- 数学公式装饰 -->
      <div class="absolute top-1/2 left-10 opacity-[0.08] transform -rotate-6 -translate-y-1/2 animate-fade-pulse-medium">
        <svg class="w-56 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 260 80">
          <text x="10" y="40" font-family="serif" font-size="48" font-style="italic" font-weight="bold">∑ƒ(x)dx</text>
          <text x="10" y="70" font-family="serif" font-size="32" font-weight="bold">∫ π = 3.14...</text>
        </svg>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <div class="flex items-center space-x-3">
            <svg
              class="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            <h1 class="text-3xl font-bold text-gray-900">我的问答</h1>
          </div>
          <p class="mt-2 text-gray-600">管理你的提问、回答和关注的问题</p>
        </div>
        <div class="flex space-x-4">
          <button
            class="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-200 hover:bg-gray-50"
            @click="router.push('/research/qa')"
          >
            浏览问题
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            @click="showPublishDialog = true"
          >
            <svg
              class="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            发布新问题
          </button>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <el-tabs v-model="activeTab" class="project-tabs" @tab-click="handleTabClick">
          <el-tab-pane label="我的提问" name="questions">
            <div class="p-6">
              <!-- 我的提问内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我的提问</h3>
                  <span class="text-sm text-gray-500">共 {{ myQuestions.length }} 个问题</span>
                </div>

                <!-- 筛选工具栏 -->
                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <select
                        v-model="sortBy"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="latest">最新发布</option>
                        <option value="mostAnswered">回答最多</option>
                        <option value="mostViewed">浏览最多</option>
                      </select>
                    </div>
                    <div class="flex items-center space-x-6 text-sm text-gray-600">
                      <span
                        >总计: <strong class="text-gray-800">{{ myQuestions.length }}</strong></span
                      >
                      <span
                        >已解决: <strong class="text-green-600">{{ solvedCount }}</strong></span
                      >
                      <span
                        >待解决: <strong class="text-orange-600">{{ openCount }}</strong></span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- 问题列表 -->
              <div class="space-y-4">
                <!-- 加载状态 -->
                <div v-if="loading" class="text-center py-12">
                  <div
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed"
                  >
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    加载中...
                  </div>
                </div>

                <div
                  v-for="question in filteredQuestions"
                  :key="question.id"
                  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 mb-6 relative"
                >
                  <!-- 右上角操作按钮区（查看详情、编辑、删除） -->
                  <div class="flex space-x-2 absolute top-4 right-4 z-10">
                    <button
                      class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors"
                      title="查看详情"
                      @click="viewQuestion(question.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors"
                      title="编辑"
                      @click="editQuestion(question)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536M9 13l6-6M3 17.25V21h3.75l11.06-11.06a2.121 2.121 0 00-3-3L3 17.25z"
                        />
                      </svg>
                    </button>
                    <button
                      class="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                      title="删除"
                      @click="deleteQuestion(question.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- 标题和状态标签 -->
                  <div class="flex items-center mb-2">
                    <h2 class="text-lg font-bold text-gray-900 mr-3 line-clamp-1 hover:text-blue-600 transition-colors"
                        @click.stop="viewQuestion(question.id)">
                      {{ question.title }}
                    </h2>
                    <!-- 是否回答状态 -->
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.answerNum > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      {{ question.answerNum > 0 ? '已回答' : '未回答' }}
                    </span>
                    <!-- @ts-ignore -->
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.solved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      <template v-if="question.solved">
                        <svg class="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        已解决
                      </template>
                      <template v-else>
                        未解决
                      </template>
                    </span>
                  </div>
                  <!-- 研究领域标签（移动到标题下方） -->
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span
                      v-for="field in (question.researchArea || '').split(',')"
                      :key="field"
                      class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ field.trim() }}
                    </span>
                  </div>
                  <!-- 问题描述 -->
                  <p class="text-gray-600 mb-2 line-clamp-2">{{ question.content }}</p>
                  <!-- 统计信息+发布时间 -->
                  <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                        />
                      </svg>
                      {{ question.answerNum }} 回答
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {{ question.followNum || 0 }} 关注
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {{ question.readNum || 0 }} 浏览
                    </span>
                    <span class="ml-auto text-gray-400">发布于 {{ formatTime(question.createdAt) }}</span>
                  </div>
                  <!-- 最佳回答预览区 -->
                  <div v-if="question.bestAnswer" class="mt-4 pt-4 border-t border-green-100">
                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="flex items-center mb-2">
                        <img
                          :src="getAvatarUrl(question.bestAnswer.user?.imgUrl)"
                          :alt="question.bestAnswer.user?.name"
                          class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                        />
                        <span
                          class="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                          @click="goToUserDetail(String(question.bestAnswer.user.id))"
                        >
                          {{ question.bestAnswer.user.name }}
                        </span>
                        <span
                          class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          最佳答案
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {{ question.bestAnswer.content }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 空状态 -->
              <div
                v-if="!loading && filteredQuestions.length === 0"
                class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
              >
                <svg
                  class="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">暂无问题</h3>
                <p class="text-gray-500 mb-4">你还没有发布任何问题</p>
                <button
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  @click="showPublishDialog = true"
                >
                  发布第一个问题
                </button>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="我回答的问题" name="answers">
            <div class="p-6">
              <!-- 统计栏 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我回答的问题</h3>
                  <span class="text-sm text-gray-500">共 {{ myAnswers.length }} 个问题</span>
                </div>
                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <select
                        v-model="answerSortBy"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="latest">最近回答</option>
                        <option value="earliest">最早回答</option>
                      </select>
                    </div>
                    <div class="flex items-center space-x-6 text-sm text-gray-600">
                      <span
                        >总计: <strong class="text-gray-800">{{ myAnswers.length }}</strong></span
                      >
                      <span
                        >已解决:
                        <strong class="text-green-600">{{
                          myAnswers.filter(q => q.bestAnswer).length
                        }}</strong></span
                      >
                      <span
                        >待解决:
                        <strong class="text-orange-600">{{
                          myAnswers.filter(q => !q.bestAnswer).length
                        }}</strong></span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="loading" class="text-center py-12">加载中...</div>
              <div v-else-if="myAnswers.length === 0" class="text-center py-12 text-gray-400">
                暂无回答
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="question in filteredAnswers"
                  :key="question.id"
                  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 mb-6 relative"
                >
                  <!-- 右上角操作按钮区（仅查看详情） -->
                  <div class="flex space-x-2 absolute top-4 right-4 z-10">
                    <button
                      class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors"
                      title="查看详情"
                      @click="viewQuestion(question.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- 标题和状态标签 -->
                  <div class="flex items-center mb-2">
                    <h2 class="text-lg font-bold text-gray-900 mr-3 line-clamp-1 hover:text-blue-600 transition-colors"
                        @click.stop="viewQuestion(question.id)">
                      {{ question.title }}
                    </h2>
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.answerNum > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      {{ question.answerNum > 0 ? '已回答' : '未回答' }}
                    </span>
                    <!-- @ts-ignore -->
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.solved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      <template v-if="question.solved">
                        <svg class="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        已解决
                      </template>
                      <template v-else>
                        未解决
                      </template>
                    </span>
                  </div>
                  <!-- 研究领域标签 -->
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span
                      v-for="field in (question.researchArea || '').split(',')"
                      :key="field"
                      class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ field.trim() }}
                    </span>
                  </div>
                  <!-- 问题描述 -->
                  <p class="text-gray-600 mb-2 line-clamp-2">{{ question.content }}</p>
                  <!-- 统计信息+发布时间 -->
                  <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                        />
                      </svg>
                      {{ question.answerNum }} 回答
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {{ question.followNum || 0 }} 关注
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {{ question.readNum || 0 }} 浏览
                    </span>
                    <span class="ml-auto text-gray-400">发布于 {{ formatTime(question.createdAt) }}</span>
                  </div>
                  <!-- 最佳回答预览区 -->
                  <div v-if="question.bestAnswer" class="mt-4 pt-4 border-t border-green-100">
                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="flex items-center mb-2">
                        <img
                          :src="getAvatarUrl(question.bestAnswer.user?.imgUrl)"
                          :alt="question.bestAnswer.user?.name"
                          class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                        />
                        <span
                          class="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                          @click="goToUserDetail(String(question.bestAnswer.user.id))"
                        >
                          {{ question.bestAnswer.user.name }}
                        </span>
                        <span
                          class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          最佳答案
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {{ question.bestAnswer.content }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="我关注的问题" name="followed">
            <div class="p-6">
              <!-- 统计栏 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我关注的问题</h3>
                  <span class="text-sm text-gray-500"
                    >共 {{ followedQuestions.length }} 个问题</span
                  >
                </div>
                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <select
                        v-model="followedSortBy"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="mostFollowed">关注最多</option>
                        <option value="mostAnswered">回答最多</option>
                        <option value="mostViewed">浏览最多</option>
                      </select>
                    </div>
                    <div class="flex items-center space-x-6 text-sm text-gray-600">
                      <span
                        >总计:
                        <strong class="text-gray-800">{{ followedQuestions.length }}</strong></span
                      >
                      <span
                        >已解决:
                        <strong class="text-green-600">{{
                          followedQuestions.filter(q => q.bestAnswer).length
                        }}</strong></span
                      >
                      <span
                        >待解决:
                        <strong class="text-orange-600">{{
                          followedQuestions.filter(q => !q.bestAnswer).length
                        }}</strong></span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="loading" class="text-center py-12">加载中...</div>
              <div
                v-else-if="followedQuestions.length === 0"
                class="text-center py-12 text-gray-400"
              >
                暂无关注问题
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="question in filteredFollowedQuestions"
                  :key="question.id"
                  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 mb-6 relative"
                >
                  <!-- 右上角操作按钮区（仅查看详情） -->
                  <div class="flex space-x-2 absolute top-4 right-4 z-10">
                    <button
                      class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors"
                      title="查看详情"
                      @click="viewQuestion(question.id)"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- 标题和状态标签 -->
                  <div class="flex items-center mb-2">
                    <h2 class="text-lg font-bold text-gray-900 mr-3 line-clamp-1 hover:text-blue-600 transition-colors"
                        @click.stop="viewQuestion(question.id)">
                      {{ question.title }}
                    </h2>
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.answerNum > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      {{ question.answerNum > 0 ? '已回答' : '未回答' }}
                    </span>
                    <!-- @ts-ignore -->
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1',
                        question.solved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      <template v-if="question.solved">
                        <svg class="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        已解决
                      </template>
                      <template v-else>
                        未解决
                      </template>
                    </span>
                  </div>
                  <!-- 研究领域标签 -->
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span
                      v-for="field in (question.researchArea || '').split(',')"
                      :key="field"
                      class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ field.trim() }}
                    </span>
                  </div>
                  <!-- 问题描述 -->
                  <p class="text-gray-600 mb-2 line-clamp-2">{{ question.content }}</p>
                  <!-- 统计信息+发布时间 -->
                  <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                        />
                      </svg>
                      {{ question.answerNum }} 回答
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {{ question.followNum || 0 }} 关注
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {{ question.readNum || 0 }} 浏览
                    </span>
                    <span class="ml-auto text-gray-400">发布于 {{ formatTime(question.createdAt) }}</span>
                  </div>
                  <!-- 最佳回答预览区 -->
                  <div v-if="question.bestAnswer" class="mt-4 pt-4 border-t border-green-100">
                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="flex items-center mb-2">
                        <img
                          :src="getAvatarUrl(question.bestAnswer.user?.imgUrl)"
                          :alt="question.bestAnswer.user?.name"
                          class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                        />
                        <span
                          class="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                          @click="goToUserDetail(String(question.bestAnswer.user.id))"
                        >
                          {{ question.bestAnswer.user.name }}
                        </span>
                        <span
                          class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          最佳答案
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {{ question.bestAnswer.content }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 发布新问题对话框 -->
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布新问题</h3>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="showPublishDialog = false"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <form class="p-6 space-y-6" @submit.prevent="publishQuestion">
          <!-- 问题标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题标题</label>
            <input
              v-model="newQuestion.title"
              type="text"
              placeholder="简洁明确地描述你的问题..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea
              v-model="newQuestion.content"
              rows="6"
              placeholder="详细描述你的问题，包括背景、遇到的困难、期望的解决方案等..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <!-- 分类选择 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题分类</label>
            <select
              v-model="newQuestion.researchArea"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择研究领域</option>
              <option v-for="area in RESEARCH_AREAS" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              class="px-6 py-2 my-modal-cancel"
              @click="showPublishDialog = false"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 my-modal-confirm"
            >
              {{ loading ? '发布中...' : '发布问题' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 编辑问题对话框 -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">编辑问题</h3>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="showEditDialog = false"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <form class="p-6 space-y-6" @submit.prevent="updateQuestion">
          <!-- 问题标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题标题</label>
            <input
              v-model="editingQuestion.title"
              type="text"
              placeholder="简洁明确地描述你的问题..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <!-- 问题描述 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea
              v-model="editingQuestion.content"
              rows="6"
              placeholder="详细描述你的问题，包括背景、遇到的困难、期望的解决方案等..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <!-- 分类选择 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">问题分类</label>
            <select
              v-model="editingQuestion.researchArea"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择研究领域</option>
              <option v-for="area in RESEARCH_AREAS" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              class="px-6 py-2 my-modal-cancel"
              @click="showEditDialog = false"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 my-modal-confirm"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 分享问题对话框 -->
    <div
      v-if="showShareDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">分享问题</h3>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="showShareDialog = false"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <!-- 分享格式选择，只保留简洁和详细 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">选择分享格式</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="shareFormat" type="radio" value="simple" class="mr-3" />
                <span class="text-sm">简洁格式（仅链接）</span>
              </label>
              <label class="flex items-center">
                <input v-model="shareFormat" type="radio" value="detailed" class="mr-3" />
                <span class="text-sm">详细格式（包含问题信息）</span>
              </label>
            </div>
          </div>

          <!-- 预览 -->
          <div v-if="selectedQuestionForShare">
            <label class="block text-sm font-medium text-gray-700 mb-2">预览</label>
            <div
              class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 whitespace-pre-wrap max-h-32 overflow-y-auto"
            >
              {{ getShareText(selectedQuestionForShare, shareFormat) }}
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end gap-4 pt-6 pb-2 px-2 border-t border-gray-200">
            <button
              class="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
              style="min-width: 80px"
              @click="showShareDialog = false"
            >
              取消
            </button>
            <button
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              style="min-width: 110px"
              @click="copyShareText"
            >
              复制到剪贴板
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  createQuestion,
  deleteQuestion as deleteQuestionApi,
  getMyAnsweredQuestions,
  getMyAskedQuestions,
  getMyFollowedQuestions,
  updateQuestion as updateQuestionApi,
} from '@/api/modules/question'
import type { Question } from '@/api/types/question'

const router = useRouter()

const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') {
    return '/default-avatar.png'
  }
  if (imgUrl.startsWith('http')) {
    return imgUrl
  }
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

// 响应式数据
const sortBy = ref('latest')
const showPublishDialog = ref(false)
const showEditDialog = ref(false)
const showShareDialog = ref(false)
const selectedQuestionForShare = ref<Question | null>(null)
const shareFormat = ref('simple')
const loading = ref(false)
const activeTab = ref('questions')

// 我的回答相关数据
const myAnswers = ref<any[]>([])
const answerSortBy = ref('latest')

// 关注问题相关数据
const followedQuestions = ref<any[]>([])
const followedSortBy = ref('mostFollowed')

// 发布问题表单
const newQuestion = ref<{
  title: string
  researchArea: string
  content: string
  tags: string[]
}>({
  title: '',
  researchArea: '',
  content: '',
  tags: [],
})

// 编辑问题表单
const editingQuestion = ref<{
  id: number | null
  title: string
  researchArea: string
  content: string
  bestAnswerId?: number
}>({
  id: null,
  title: '',
  researchArea: '',
  content: '',
  bestAnswerId: undefined,
})

// 我的问题数据
const myQuestions = ref<Question[]>([])

// 新增：科研领域常量数组，保持与Profile.vue一致
const RESEARCH_AREAS = [
  '计算机科学',
  '人工智能',
  '机器学习',
  '数据科学',
  '生物信息学',
  '物理学',
  '化学',
  '数学',
  '材料科学',
  '环境科学',
  '地球科学',
  '天文学',
  '医学',
  '药学',
  '心理学',
  '社会学',
  '经济学',
  '管理学',
  '法学',
  '教育学',
  '历史学',
  '哲学',
  '语言学',
  '政治学',
  '艺术学',
  '农学',
  '工程学',
  '电子科学',
  '自动化',
  '交通运输',
  '能源科学',
  '海洋科学',
  '统计学',
  '信息科学',
  '新闻传播学',
  '体育学',
  '其他',
]

// 计算属性
const filteredQuestions = computed(() => {
  let filtered = [...myQuestions.value] // 创建副本，避免修改原数组

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'mostAnswered':
      filtered.sort((a, b) => b.answerNum - a.answerNum)
      break
    case 'mostViewed':
      filtered.sort((a, b) => b.answerNum - a.answerNum) // 使用answerNum代替viewCount
      break
  }

  return filtered
})

// @ts-ignore
const solvedCount = computed(() => myQuestions.value.filter(q => q.solved).length)
// @ts-ignore
const openCount = computed(() => myQuestions.value.filter(q => !q.solved).length)

// 关注问题相关的计算属性
const filteredFollowedQuestions = computed(() => {
  let filtered = [...followedQuestions.value]
  switch (followedSortBy.value) {
    case 'mostFollowed':
      filtered.sort((a, b) => (b.followNum || 0) - (a.followNum || 0))
      break
    case 'mostAnswered':
      filtered.sort((a, b) => (b.answerNum || 0) - (a.answerNum || 0))
      break
    case 'mostViewed':
      // 使用readNum字段进行浏览量排序
      filtered.sort((a, b) => (b.readNum || 0) - (a.readNum || 0))
      break
    default:
      break
  }
  return filtered
})

// 方法
const formatTime = (dateString: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '-'
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const viewQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

const getShareText = (question: Question, format: string) => {
  const url = `${window.location.origin}/research/qa/${question.id}`
  switch (format) {
    case 'simple':
      return url
    case 'detailed':
    default:
      return `📝 问题：${question.title}
📋 分类：${question.researchArea || '未分类'}
💬 回答数：${question.answerNum} 个
👤 提问者：${question.user?.name || '未知用户'}
🏫 机构：${question.user?.institution || '未知机构'}
🔗 查看详情：${url}
#科研问答 #${question.researchArea || '科研'} #KnoWeb`
  }
}

const copyShareText = () => {
  if (!selectedQuestionForShare.value) return
  const text = getShareText(selectedQuestionForShare.value, shareFormat.value)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        ElMessage.success('分享文本已复制到剪贴板')
        showShareDialog.value = false
      })
      .catch(() => fallbackCopyTextToClipboard(text))
  } else {
    fallbackCopyTextToClipboard(text)
  }
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = '0'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage.success('分享文本已复制到剪贴板')
      showShareDialog.value = false
    } else {
      ElMessage.error('复制失败，请手动复制文本')
    }
  } catch (err) {
    ElMessage.error('复制失败，请手动复制文本')
  }
  document.body.removeChild(textArea)
}

const editQuestion = (question: Question) => {
  editingQuestion.value = {
    id: Number(question.id),
    title: question.title,
    content: question.content,
    researchArea: question.researchArea,
    bestAnswerId: question.bestAnswer ? Number(question.bestAnswer.id) : undefined,
  }
  showEditDialog.value = true
}

const deleteQuestion = async (questionId: string) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该问题吗？此操作不可撤销！',
      '删除确认',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        customClass: 'my-question-modal',
        center: true,
        showClose: true,
        confirmButtonClass: 'my-modal-confirm',
        cancelButtonClass: 'my-modal-cancel',
      }
    )
  } catch {
    // 用户取消
    return
  }
  loading.value = true
  try {
    await deleteQuestionApi({ questionId })
    ElMessage.success('删除成功')
    loadQuestions()
  } catch (e) {
    ElMessage.error('删除失败')
  }
  loading.value = false
}

const publishQuestion = async () => {
  try {
    loading.value = true
    const requestData = {
      title: newQuestion.value.title,
      content: newQuestion.value.content,
      researchArea: newQuestion.value.researchArea,
    }
    const response = await createQuestion(requestData)
    if (response && response.code === '200') {
      // 重置表单
      newQuestion.value = {
        title: '',
        content: '',
        researchArea: '',
        tags: [],
      }
      showPublishDialog.value = false
      ElMessage.success('问题发布成功！')
      // 重新加载问题列表
      await loadQuestions()
    } else {
      ElMessage.error(response?.message || '发布问题失败')
    }
  } catch (error) {
    ElMessage.error('发布问题失败')
  } finally {
    loading.value = false
  }
}

const updateQuestion = async () => {
  if (editingQuestion.value.id == null) return
  loading.value = true
  try {
    const payload = {
      id: editingQuestion.value.id,
      title: editingQuestion.value.title,
      content: editingQuestion.value.content,
      researchArea: editingQuestion.value.researchArea,
      ...(editingQuestion.value.bestAnswerId !== undefined
        ? { bestAnswerId: editingQuestion.value.bestAnswerId }
        : {}),
    }
    await updateQuestionApi(payload)
    ElMessage.success('修改成功')
    showEditDialog.value = false
    loadQuestions()
  } catch (e) {
    ElMessage.error('修改失败')
  }
  loading.value = false
}

const goToUserDetail = (userId: string) => {
  router.push(`/user/${userId}`)
}

const questionsLoaded = ref(false)
const answersLoaded = ref(false)
const followedLoaded = ref(false)

const handleTabClick = (tab: any) => {
  if (tab.paneName === 'questions') {
    if (!questionsLoaded.value) {
      loadQuestions()
      questionsLoaded.value = true
    }
  } else if (tab.paneName === 'answers') {
    if (!answersLoaded.value) {
      loadAnswers()
      answersLoaded.value = true
    }
  } else if (tab.paneName === 'followed') {
    if (!followedLoaded.value) {
      loadFollowedQuestions()
      followedLoaded.value = true
    }
  }
}

const loadQuestions = async () => {
  loading.value = true
  try {
    const res = await getMyAskedQuestions()
    if (res.code === '200' && res.data) {
      if (Array.isArray(res.data)) {
        myQuestions.value = res.data.map(q => ({ ...q, solved: typeof q.solved !== 'undefined' ? q.solved : null })) as any
      } else if (res.data.questions) {
        myQuestions.value = res.data.questions.map(q => ({ ...q, solved: typeof q.solved !== 'undefined' ? q.solved : null })) as any
      } else {
        myQuestions.value = []
      }
    } else {
      myQuestions.value = []
    }
  } catch (e) {
    myQuestions.value = []
  }
  loading.value = false
  questionsLoaded.value = true
}

const loadAnswers = async () => {
  loading.value = true
  try {
    const res = await getMyAnsweredQuestions()
    if (res.code === '200' && Array.isArray(res.data)) {
      myAnswers.value = res.data
    } else {
      myAnswers.value = []
    }
  } catch (e) {
    myAnswers.value = []
  }
  loading.value = false
  answersLoaded.value = true
}

const loadFollowedQuestions = async () => {
  loading.value = true
  try {
    const res = await getMyFollowedQuestions()
    if (res.code === '200' && Array.isArray(res.data)) {
      followedQuestions.value = res.data.map(q => ({ ...q, solved: typeof q.solved !== 'undefined' ? q.solved : null })) as any
    } else {
      followedQuestions.value = []
    }
  } catch (e) {
    followedQuestions.value = []
  }
  loading.value = false
  followedLoaded.value = true
}

const filteredAnswers = computed(() => {
  let filtered = [...myAnswers.value]
  switch (answerSortBy.value) {
    case 'latest':
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt || b.createdAt || 0).getTime() -
          new Date(a.createdAt || a.createdAt || 0).getTime()
      )
      break
    case 'earliest':
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt || a.createdAt || 0).getTime() -
          new Date(b.createdAt || b.createdAt || 0).getTime()
      )
      break
  }
  return filtered
})

onMounted(() => {
  if (activeTab.value === 'questions') {
    loadQuestions()
    questionsLoaded.value = true
  } else if (activeTab.value === 'answers') {
    loadAnswers()
    answersLoaded.value = true
  } else if (activeTab.value === 'followed') {
    loadFollowedQuestions()
    followedLoaded.value = true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* 对齐项目管理tab风格 */
:deep(.project-tabs .el-tabs__header) {
  margin-bottom: 0;
  border-bottom: 1px solid #e5e7eb;
}
:deep(.project-tabs .el-tabs__nav-wrap) {
  padding: 0 24px;
}
:deep(.project-tabs .el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  padding: 16px 24px;
}
:deep(.project-tabs .el-tabs__item.is-active) {
  color: #3b82f6;
  font-weight: 600;
}
:deep(.project-tabs .el-tabs__active-bar) {
  background-color: #3b82f6;
  height: 3px;
}

:deep(.my-question-modal) {
  border-radius: 16px;
  min-width: 380px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  padding: 0;
}
:deep(.my-question-modal .el-message-box__header) {
  font-weight: bold;
  color: #2563eb;
  text-align: center;
  font-size: 20px;
  background: linear-gradient(to right, #e0f2fe, #f0f9ff);
  border-radius: 16px 16px 0 0;
  padding: 24px 0 8px 0;
}
:deep(.my-question-modal .el-message-box__content) {
  text-align: center;
  font-size: 16px;
  color: #334155;
  padding: 24px 0 12px 0;
}
:deep(.my-modal-confirm) {
  background: linear-gradient(to right, #2563eb, #38bdf8) !important;
  color: #fff !important;
  border-radius: 8px !important;
  font-weight: 600;
  border: none;
  min-width: 90px;
}
:deep(.my-modal-cancel) {
  background: #f1f5f9 !important;
  color: #64748b !important;
  border-radius: 8px !important;
  font-weight: 600;
  border: none;
  min-width: 90px;
}
:deep(.my-question-modal .el-message-box__btns) {
  justify-content: center;
  padding-bottom: 24px;
  gap: 16px;
}
</style>
