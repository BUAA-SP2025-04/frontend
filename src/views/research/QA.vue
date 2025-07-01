<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\QA.vue -->
<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\QA.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
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
            <h1 class="text-3xl font-bold text-gray-900">科研问答</h1>
          </div>
          <p class="mt-2 text-gray-600">分享知识，解决科研难题</p>
        </div>
        <div class="flex space-x-4">
          <button
            class="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-200 hover:bg-gray-50"
            @click="router.push('/research/my-questions')"
          >
            我的问答
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

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 主内容区域 -->
        <div class="lg:col-span-3">
          <!-- 筛选和搜索栏 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- 搜索框 -->
              <div class="flex-1">
                <div class="relative">
                  <svg
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索问题..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <!-- 分类筛选 -->
              <div class="relative">
                <select
                  v-model="selectedCategory"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部领域</option>
                  <option v-for="area in RESEARCH_AREAS" :key="area" :value="area">{{ area }}</option>
                </select>
              </div>

              <!-- 排序方式 -->
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新发布</option>
                <option value="hot">热门回答</option>
              </select>
            </div>

            <!-- 搜索状态显示 -->
            <div
              v-if="selectedCategory"
              class="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
            >
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span class="text-sm text-blue-800">
                  当前分类：<span class="font-medium">{{ selectedCategory }}</span>
                  <span class="text-blue-600">({{ filteredQuestions.length }} 个结果)</span>
                </span>
              </div>
              <button
                class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                @click="clearSearch"
              >
                清除筛选
              </button>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">加载中...</span>
          </div>

          <!-- 问题列表 -->
          <div v-else class="space-y-6">
            <div
              v-for="question in filteredQuestions"
              :key="question.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- 问题标题和状态 -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3
                        class="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                        @click="viewQuestion(question.id)"
                      >
                        {{ question.title }}
                      </h3>
                      <!-- 是否回答状态 -->
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
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
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          question.solved
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700',
                        ]"
                      >
                        <template v-if="question.solved">
                          <svg
                            class="w-4 h-4 mr-1 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          已解决
                        </template>
                        <template v-else>
                          未解决
                        </template>
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ question.researchArea }}
                      </span>
                    </div>
                  </div>

                  <!-- 关注按钮或我的提问标签 -->
                  <div
                    v-if="question.user?.id === userStore.user?.id"
                    class="ml-4 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700"
                  >
                    <svg
                      class="w-4 h-4 inline-block mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    我的提问
                  </div>
                  <button
                    v-else
                    :class="[
                      'ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      question.followed
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                    @click="toggleFollow(question.id)"
                  >
                    <svg
                      class="w-4 h-4 inline-block mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    {{ question.followed ? '已关注' : '关注' }}
                  </button>
                </div>

                <!-- 问题描述 -->
                <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {{ question.content }}
                </p>

                <!-- 问题元信息 -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div class="flex items-center">
                    <img
                      :src="getAvatarUrl(question.user?.imgUrl)"
                      :alt="question.user?.name || '未知用户'"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p
                        class="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                        @click="goToUserDetail(question.user?.id || 0)"
                      >
                        {{ question.user?.name || '未知用户' }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ question.user?.institution || '未知机构' }}
                      </p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(question.createAt) }}
                  </div>
                </div>

                <!-- 回答预览 -->
                <div v-if="question.bestAnswer" class="mt-4 pt-4 border-t border-gray-200">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                      <img
                        :src="getAvatarUrl(question.bestAnswer.user?.imgUrl)"
                        :alt="question.bestAnswer.user?.name || '未知用户'"
                        class="w-6 h-6 rounded-full mr-2"
                      />
                      <span
                        class="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                        @click="goToUserDetail(question.bestAnswer.user?.id || 0)"
                      >
                        {{ question.bestAnswer.user?.name || '未知用户' }}
                      </span>
                      <span class="text-sm text-gray-500 ml-2">的回答</span>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {{ question.bestAnswer.content }}
                    </p>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-500">
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
                        ></path>
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      {{ question.readNum || 0 }} 浏览
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
                        ></path>
                      </svg>
                      {{ question.followNum }} 关注
                    </span>
                  </div>

                  <div class="flex space-x-3">
                    <button
                      class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      @click="shareQuestion(question)"
                    >
                      <svg
                        class="w-4 h-4 inline-block mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        ></path>
                      </svg>
                      分享问题
                    </button>

                    <button
                      class="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      @click="showAnswerDialog(question)"
                    >
                      回答问题
                    </button>

                    <button
                      class="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      @click="viewQuestion(question.id)"
                    >
                      查看详情
                    </button>
                  </div>
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无问题</h3>
            <p class="text-gray-500 mb-4">还没有人发布问题</p>
            <button
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              @click="showPublishDialog = true"
            >
              发布第一个问题
            </button>
          </div>

          <!-- 分页 -->
          <div v-if="!loading && filteredQuestions.length > 0" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 热门标签 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门领域</h3>
            <div class="space-y-2">
              <button
                v-for="tag in popularTags.slice(0, 5)"
                :key="tag.name"
                :class="[
                  'flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors',
                  selectedCategory === tag.name
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700',
                ]"
                @click="searchByTag(tag.name)"
              >
                <span class="text-sm font-medium">{{ tag.name }}</span>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    selectedCategory === tag.name
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-100 text-gray-500',
                  ]"
                >
                  {{ tag.count }}
                </span>
              </button>
            </div>
          </div>

          <!-- 活跃用户 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">活跃用户</h3>
            <div class="space-y-3">
              <!-- 加载状态 -->
              <div v-if="loadingActiveUsers" class="text-center py-6">
                <div class="inline-flex items-center px-3 py-2 text-sm text-gray-500">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
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
                v-for="user in activeUsers.slice(0, 5)"
                v-show="!loadingActiveUsers"
                :key="user.id"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                @click="goToUserDetail(user.id)"
              >
                <img
                  :src="getAvatarUrl(user.imgUrl)"
                  :alt="user.name"
                  class="w-10 h-10 rounded-full"
                />
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors"
                    @click.stop="goToUserDetail(user.id)"
                  >
                    {{ user.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ user.answerCount }} 回答 · {{ user.institution }}
                  </p>
                </div>
                <svg
                  class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>

              <!-- 空状态 -->
              <div
                v-if="!loadingActiveUsers && activeUsers.length === 0"
                class="text-center py-6 text-gray-500"
              >
                <svg
                  class="w-12 h-12 text-gray-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  ></path>
                </svg>
                <p class="text-sm">暂无活跃用户</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布问题对话框 -->
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研问题</h3>
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
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              @click="showPublishDialog = false"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="publishing"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ publishing ? '发布中...' : '发布问题' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 回答问题对话框 -->
    <div
      v-if="showAnswerForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">回答问题</h3>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="showAnswerForm = false"
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

        <!-- 问题信息 -->
        <div v-if="selectedQuestion" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">{{ selectedQuestion.title }}</h4>
          <p class="text-sm text-gray-600 line-clamp-2">{{ selectedQuestion.content }}</p>
        </div>

        <form class="p-6 space-y-6" @submit.prevent="submitAnswer">
          <!-- 回答内容 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">你的回答</label>
            <textarea
              v-model="newAnswer.content"
              rows="8"
              placeholder="分享你的见解和建议..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              @click="showAnswerForm = false"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="answering"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ answering ? '提交中...' : '提交回答' }}
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
        </div>

        <!-- 分享问题对话框底部美化按钮区域 -->
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import {
  createQuestion,
  answerQuestion,
  followQuestion,
  unfollowQuestion,
  getQuestionList,
  getMyFollowedQuestions,
  getTopAnswerUsers,
  getResearchAreaStats,
} from '@/api/modules/question'
import type {
  Question,
  CreateQuestionRequest,
  AnswerQuestionRequest,
  QuestionListItem,
} from '@/api/types/question'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10
const loading = ref(false)
const publishing = ref(false)
const answering = ref(false)

// 对话框控制
const showPublishDialog = ref(false)
const showAnswerForm = ref(false)
const selectedQuestion = ref<Question | null>(null)
const showShareDialog = ref(false)
const selectedQuestionForShare = ref<Question | null>(null)
const shareFormat = ref('simple')

// 发布问题表单
const newQuestion = ref<{
  title: string
  content: string
  researchArea: string
}>({
  title: '',
  content: '',
  researchArea: '',
})

// 回答表单
const newAnswer = ref({
  content: '',
})

// 问题数据
const questions = ref<Question[]>([])

// 我的关注问题数据
const myFollowedQuestions = ref<Question[]>([])
const loadingFollowed = ref(false)

const popularTags = ref<{ name: string; count: number }[]>([])

const activeUsers = ref<any[]>([])
const loadingActiveUsers = ref(false)

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
  let filtered = questions.value

  // 如果是我的关注模式，使用关注的问题数据
  if (sortBy.value === 'my-followed') {
    filtered = myFollowedQuestions.value
  }

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      q =>
        q.title.toLowerCase().includes(query) ||
        q.content.toLowerCase().includes(query) ||
        q.researchArea.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.researchArea === selectedCategory.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
    case 'hot':
      filtered.sort((a, b) => b.answerNum - a.answerNum)
      break
    case 'my-followed':
      // 我的关注按最新时间排序
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
  }

  // 分页
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = questions.value

  // 如果是我的关注模式，使用关注的问题数据
  if (sortBy.value === 'my-followed') {
    filtered = myFollowedQuestions.value
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      q =>
        q.title.toLowerCase().includes(query) ||
        q.content.toLowerCase().includes(query) ||
        q.researchArea.toLowerCase().includes(query)
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.researchArea === selectedCategory.value)
  }
  return Math.ceil(filtered.length / itemsPerPage)
})

// 获取头像URL

const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') {
    return '/default-avatar.png'
  }
  if (imgUrl.startsWith('http')) {
    return imgUrl
  }
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

// 方法
const formatTime = (dateString: string) => {
  if (!dateString) return '未知时间'

  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '未知时间'
  }

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

const loadQuestions = async () => {
  try {
    loading.value = true
    const response = await getQuestionList()
    if (response && response.code === '200') {
      // 处理新的API响应格式
      if (Array.isArray(response.data)) {
        // 新的格式：response.data是QuestionListItem数组
        questions.value = response.data.map((item: QuestionListItem) => ({
          id: item.question.id.toString(),
          user: item.question.user,
          title: item.question.title,
          content: item.question.content,
          createAt: item.question.createdAt,
          researchArea: item.question.researchArea || '未分类',
          answerNum: item.question.answerNum,
          likeNum: item.question.likeNum,
          followNum: item.question.followNum,
          readNum: item.question.readNum,
          followed: item.followed, // 添加关注状态
          solved: typeof item.question.solved !== 'undefined' ? !!item.question.solved : false,
          answers: item.answerWithReplies
            ? item.answerWithReplies.map(reply => ({
                id: (reply.answer.id || 0).toString(),
                user: reply.answer.user,
                content: reply.answer.content || '',
                createdAt: reply.answer.createdAt || '',
                likeNum: reply.answer.likeNum || 0,
                liked: reply.liked || false,
                childAnswers: reply.replies.map(childReply => ({
                  id: (childReply.id || 0).toString(),
                  user: childReply.user,
                  content: childReply.content || '',
                  parentUserId: (reply.answer.userId || 0).toString(),
                  parentUserName: reply.answer.user?.name || '未知用户',
                  createdAt: childReply.createdAt || '',
                  likeNum: childReply.likeNum || 0,
                  liked: false, // 2级回答暂时使用默认状态
                })),
              }))
            : [],
        }))
      } else if (response.data && Array.isArray(response.data.questions)) {
        // 兼容旧格式
        questions.value = response.data.questions
      } else {
        questions.value = []
      }
    } else {
      questions.value = []
      if (response && response.message) {
        ElMessage.warning(response.message)
      }
    }
  } catch (error) {
    console.error('加载问题列表失败:', error)
    ElMessage.error('加载问题列表失败')
    questions.value = []
  } finally {
    loading.value = false
  }
}

// 加载我的关注问题
const loadMyFollowedQuestions = async () => {
  try {
    loadingFollowed.value = true
    const response = await getMyFollowedQuestions()

    if (response && response.code === '200') {
      // 处理新的API响应格式
      if (Array.isArray(response.data)) {
        // 新的格式：response.data是QuestionListItem数组
        myFollowedQuestions.value = response.data.map((item: QuestionListItem) => ({
          id: (item.question.id || 0).toString(),
          user: item.question.user,
          title: item.question.title || '',
          content: item.question.content || '',
          createAt: item.question.createdAt || '',
          researchArea: item.question.researchArea || '未分类',
          answerNum: item.question.answerNum || 0,
          likeNum: Number(item.question.likeNum) || 0,
          followNum: item.question.followNum || 0,
          readNum: item.question.readNum || 0,
          followed: item.followed || false, // 添加关注状态
          solved: typeof item.question.solved !== 'undefined' ? !!item.question.solved : false,
          answers: item.answerWithReplies
            ? item.answerWithReplies.map(reply => ({
                id: (reply.answer.id || 0).toString(),
                user: reply.answer.user,
                content: reply.answer.content || '',
                createdAt: reply.answer.createdAt || '',
                likeNum: Number(reply.answer.likeNum) || 0,
                liked: reply.liked || false,
                childAnswers: reply.replies.map(childReply => ({
                  id: (childReply.id || 0).toString(),
                  user: childReply.user,
                  content: childReply.content || '',
                  parentUserId: (reply.answer.userId || 0).toString(),
                  parentUserName: reply.answer.user?.name || '未知用户',
                  createdAt: childReply.createdAt || '',
                  likeNum: Number(childReply.likeNum) || 0,
                  liked: false, // 2级回答暂时使用默认状态
                })),
              }))
            : [],
        }))
      } else if (response.data && Array.isArray(response.data.questions)) {
        // 兼容旧格式
        myFollowedQuestions.value = response.data.questions
      } else {
        myFollowedQuestions.value = []
      }
    } else {
      myFollowedQuestions.value = []
      if (response && response.message) {
        ElMessage.warning(response.message)
      }
    }
  } catch (error) {
    console.error('加载我的关注问题失败:', error)
    ElMessage.error('加载关注问题失败')
    myFollowedQuestions.value = []
  } finally {
    loadingFollowed.value = false
  }
}

const toggleFollow = async (questionId: string) => {
  try {
    const question = questions.value.find(q => q.id === questionId)
    if (!question) {
      console.error('找不到问题:', questionId)
      ElMessage.error('找不到问题')
      return
    }

    console.log('开始关注操作:', {
      questionId,
      currentFollowed: question.followed,
      currentFollowNum: question.followNum,
    })

    if (question.followed) {
      // 取消关注
      console.log('执行取消关注操作')
      const response = await unfollowQuestion({ questionId: questionId })
      console.log('取消关注响应:', response)

      if (response && response.code === '200') {
        question.followed = false
        question.followNum = Math.max(0, question.followNum - 1)

        // 如果在我的关注模式下，从关注列表中移除
        if (sortBy.value === 'my-followed') {
          myFollowedQuestions.value = myFollowedQuestions.value.filter(q => q.id !== questionId)
        }

        ElMessage.success('取消关注成功')
      } else {
        console.error('取消关注失败:', response)
        ElMessage.error(response?.message || '取消关注失败')
        // 重新加载问题列表以确保状态同步
        await loadQuestions()
        return
      }
    } else {
      // 关注
      console.log('执行关注操作')
      const response = await followQuestion({ questionId })
      console.log('关注响应:', response)

      if (response && response.code === '200') {
        question.followed = true
        question.followNum++
        ElMessage.success('关注成功')
      } else {
        console.error('关注失败:', response)
        ElMessage.error(response?.message || '关注失败')
        // 重新加载问题列表以确保状态同步
        await loadQuestions()
        return
      }
    }
  } catch (error) {
    console.error('关注操作失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  }
}

const searchByTag = (tagName: string) => {
  // 设置分类筛选
  selectedCategory.value = tagName

  // 清除搜索查询
  searchQuery.value = ''

  // 重置页码
  currentPage.value = 1

  // 滚动到顶部
  scrollToTop()
}

const publishQuestion = async () => {
  try {
    publishing.value = true
    console.log('开始发布问题...')

    const requestData: CreateQuestionRequest = {
      title: newQuestion.value.title,
      content: newQuestion.value.content,
      researchArea: newQuestion.value.researchArea,
    }

    console.log('发布问题请求数据:', requestData)
    const response = await createQuestion(requestData)
    console.log('发布问题响应:', response)

    if (response && response.code === '200') {
      // 重置表单
      newQuestion.value = {
        title: '',
        content: '',
        researchArea: '',
      }

      showPublishDialog.value = false
      ElMessage.success('问题发布成功！')

      // 重新加载问题列表
      console.log('重新加载问题列表...')
      await loadQuestions()
    } else {
      ElMessage.error(response?.message || '发布问题失败')
    }
  } catch (error) {
    console.error('发布问题失败:', error)
    ElMessage.error('发布问题失败')
  } finally {
    publishing.value = false
  }
}

const showAnswerDialog = (question: Question) => {
  selectedQuestion.value = question
  showAnswerForm.value = true
}

const submitAnswer = async () => {
  if (!selectedQuestion.value) {
    ElMessage.error('请选择要回答的问题')
    return
  }

  if (!newAnswer.value.content.trim()) {
    ElMessage.error('请输入回答内容')
    return
  }

  try {
    answering.value = true
    console.log('开始提交回答...')

    const requestData: AnswerQuestionRequest = {
      questionId: parseInt(selectedQuestion.value.id),
      content: newAnswer.value.content.trim(),
      answerId: -1, // 默认为-1，表示对问题的回答
    }

    console.log('提交回答请求数据:', requestData)
    const response = await answerQuestion(requestData)
    console.log('提交回答响应:', response)

    if (response && response.code === '200') {
      // 更新本地问题数据
      selectedQuestion.value.answerNum++

      // 重置表单
      newAnswer.value.content = ''
      showAnswerForm.value = false

      ElMessage.success('回答提交成功！')

      // 重新加载问题列表以获取最新数据
      await loadQuestions()
    } else {
      ElMessage.error(response?.message || '提交回答失败')
    }
  } catch (error: any) {
    console.error('提交回答失败:', error)

    // 详细的错误信息
    if (error.response) {
      console.error('错误响应:', error.response.data)
      console.error('错误状态:', error.response.status)
      ElMessage.error(`提交回答失败: ${error.response.data?.message || error.response.statusText}`)
    } else if (error.request) {
      console.error('请求错误:', error.request)
      ElMessage.error('网络错误，请检查网络连接')
    } else {
      console.error('其他错误:', error.message)
      ElMessage.error('提交回答失败，请重试')
    }
  } finally {
    answering.value = false
  }
}

const viewQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

const shareQuestion = (question: Question) => {
  selectedQuestionForShare.value = question
  showShareDialog.value = true
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
  const text = getShareText(selectedQuestionForShare.value!, shareFormat.value)
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

const goToUserDetail = (userId: number) => {
  router.push(`/user/${userId}`)
}

// 加载活跃用户数据
const loadActiveUsers = async () => {
  try {
    loadingActiveUsers.value = true
    const response = await getTopAnswerUsers()
    if (response && response.code === '200' && response.data) {
      // 处理新的数据格式：每个元素包含 answerCount 和 user 对象
      activeUsers.value = response.data
        .filter((item: any) => item !== null && item.user !== null)
        .map((item: any) => ({
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
          gender: item.user.gender,
          bio: item.user.bio,
          researchArea: item.user.researchArea,
          institution: item.user.institution,
          title: item.user.title,
          imgUrl: item.user.imgUrl,
          createdAt: item.user.createdAt,
          followerNum: item.user.followerNum,
          subjectNum: item.user.subjectNum,
          publishNum: item.user.publishNum,
          likeNum: item.user.likeNum || 0,
          readerNum: item.user.readerNum,
          answerCount: item.answerCount, // 添加回答数
        }))
    } else {
      activeUsers.value = []
    }
  } catch (error) {
    console.error('加载活跃用户失败:', error)
    activeUsers.value = []
  } finally {
    loadingActiveUsers.value = false
  }
}

// 加载热门标签
const loadPopularTags = async () => {
  try {
    const response = await getResearchAreaStats()
    if (response && response.code === '200' && Array.isArray(response.data)) {
      // 后端返回格式为 [{ "软件工程": 1 }, ...]
      popularTags.value = response.data.map((item: any) => {
        const key = Object.keys(item)[0]
        return { name: key, count: item[key] }
      })
    } else {
      popularTags.value = []
    }
  } catch (error) {
    console.error('加载热门标签失败:', error)
    popularTags.value = []
  }
}

onMounted(() => {
  loadQuestions()
  loadActiveUsers()
  loadPopularTags()
  // 确保页面加载时滚动到顶部
  scrollToTop()
})

// 监听排序方式变化
watch(sortBy, newValue => {
  currentPage.value = 1 // 重置页码
  scrollToTop() // 滚动到顶部
  if (newValue === 'my-followed') {
    loadMyFollowedQuestions()
  }
})

// 监听搜索查询变化
watch(searchQuery, () => {
  currentPage.value = 1 // 重置页码
  scrollToTop() // 滚动到顶部
})

// 监听分类筛选变化
watch(selectedCategory, () => {
  currentPage.value = 1 // 重置页码
  scrollToTop() // 滚动到顶部
})

// 滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const changePage = (page: number) => {
  currentPage.value = page
  // 滚动到页面顶部
  scrollToTop()
}

const clearSearch = () => {
  // 清除分类筛选
  selectedCategory.value = ''
  // 重置页码
  currentPage.value = 1
  // 滚动到顶部
  scrollToTop()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

/* 自定义渐变色 */
.from-cyan-25\/50 {
  --tw-gradient-from: rgba(236, 254, 255, 0.5);
}

.to-blue-25\/50 {
  --tw-gradient-to: rgba(239, 246, 255, 0.5);
}

.from-cyan-25\/30 {
  --tw-gradient-from: rgba(236, 254, 255, 0.3);
}

.to-blue-25\/30 {
  --tw-gradient-to: rgba(239, 246, 255, 0.3);
}
</style>
