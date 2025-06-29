<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 返回上一页按钮（卡片外部） -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
      <el-button
        type="text"
        @click="$router.go(-1)"
        class="flex items-center text-gray-600 hover:text-blue-600 p-0"
      >
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回上一页
      </el-button>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 成果详情 -->
      <div v-if="publication" class="space-y-8">
        <!-- 成果基本信息 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-8">
            <!-- 标题 -->
            <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ publication.title }}</h1>

            <!-- 基本信息区域和关键词 -->
            <div class="flex gap-8 mb-6">
              <!-- 左侧基本信息区域 -->
              <div class="flex-1 space-y-4">
                <!-- 作者信息 -->
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-gray-400"
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
                  <span class="text-gray-600">作者：</span>
                  <div class="flex flex-wrap gap-2">
                    <el-tag
                      v-for="(author, index) in getAuthorsList(publication.authors)"
                      :key="index"
                      type="info"
                      effect="plain"
                      size="default"
                      class="text-gray-700 bg-gray-100 border-gray-200 text-base font-medium"
                    >
                      {{ author }}
                    </el-tag>
                  </div>
                </div>

                <!-- 发表机构 -->
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span class="text-gray-600">发表机构：</span>
                  <span class="text-gray-900">{{ publication.venue }}</span>
                </div>

                <!-- 年份和状态 -->
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="text-gray-600">年份：</span>
                    <span class="text-gray-900">{{ publication.year || '未知' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="text-gray-600">状态：</span>
                    <el-tag :type="getStatusType(publication.status)" size="small">
                      {{ getStatusLabel(publication.status) }}
                    </el-tag>
                  </div>
                </div>

                <!-- DOI -->
                <div
                  v-if="publication.doi && publication.doi.trim()"
                  class="flex items-center gap-2"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span class="text-gray-600">DOI：</span>
                  <el-link
                    :href="`https://doi.org/${publication.doi}`"
                    target="_blank"
                    type="primary"
                    class="font-mono"
                  >
                    {{ publication.doi }}
                  </el-link>
                </div>

                <!-- 统计信息 -->
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-blue-500"
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
                    <span class="text-gray-600">阅读量：</span>
                    <span class="text-blue-600 font-semibold">{{
                      formatNumber(publication.readerNum || 0)
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-red-500"
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
                    <span class="text-gray-600">点赞数：</span>
                    <span class="text-red-600 font-semibold">{{
                      formatNumber(publication.likeNum || 0)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- 右侧关键词区域 -->
              <div class="w-48 pr-2">
                <div class="flex items-center justify-end gap-2 mb-3">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span class="text-gray-600 font-medium">关键词</span>
                </div>
                <div
                  v-if="publication.keywords && publication.keywords.trim()"
                  class="flex flex-col items-end space-y-3"
                >
                  <el-tag
                    v-for="keyword in getKeywordsList(publication.keywords)"
                    :key="keyword"
                    type="info"
                    effect="plain"
                    size="default"
                    class="text-gray-700 bg-blue-50 border-blue-200 text-base font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    {{ keyword }}
                  </el-tag>
                </div>
                <div v-else class="text-right">
                  <span class="text-gray-500 italic text-sm">暂无关键词</span>
                </div>
              </div>
            </div>

            <!-- 摘要 -->
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">摘要</h3>
              <div class="p-1 pl-3 pr-3">
                <p
                  v-if="publication.abstracts && publication.abstracts.trim()"
                  :class="[
                    'text-gray-700 leading-relaxed transition-all duration-300 tracking-wide indent-8',
                    isAbstractExpanded ? '' : 'line-clamp-3',
                  ]"
                >
                  {{ publication.abstracts }}
                </p>
                <p v-else class="text-gray-500 italic">暂无摘要信息</p>
                <div
                  v-if="
                    publication.abstracts &&
                    publication.abstracts.trim() &&
                    publication.abstracts.length > 200
                  "
                  class="mt-2"
                >
                  <el-button
                    type="text"
                    size="small"
                    @click="toggleAbstract"
                    class="text-blue-600 hover:text-blue-800 p-0"
                  >
                    {{ isAbstractExpanded ? '收起' : '展开' }}
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center gap-4 mt-6">
              <!-- 点赞按钮 -->
              <button
                @click="handleLike"
                :disabled="isLikeLoading"
                class="group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-sm font-medium"
                :class="[
                  isLiked
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600 shadow-md hover:shadow-lg hover:bg-red-50',
                ]"
              >
                <svg
                  class="w-4 h-4 transition-all duration-300"
                  :class="isLiked ? 'animate-bounce' : 'group-hover:scale-110'"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="isLiked"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                  <path
                    v-else
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ isLiked ? '已点赞' : '点赞' }}</span>

                <!-- 加载动画 -->
                <div
                  v-if="isLikeLoading"
                  class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg"
                >
                  <div
                    class="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"
                  ></div>
                </div>
              </button>

              <!-- 查看PDF按钮 -->
              <button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                @click="openPdf"
                class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600"
              >
                <svg
                  class="w-4 h-4 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                查看PDF
              </button>

              <!-- 下载PDF按钮 -->
              <button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                @click="downloadPdf"
                class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600"
              >
                <svg
                  class="w-4 h-4 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
                下载PDF
              </button>

              <!-- 申请PDF按钮 -->
              <button
                v-if="!publication.pdfUrl || !publication.pdfUrl.trim()"
                @click="applyPdf"
                class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400 shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600"
              >
                <svg
                  class="w-4 h-4 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12v1m0 4h.01M12 8v4m0 4h.01M8 12v1m0 4h.01M12 4v.01M12 20v.01M4 12v.01M20 12v.01"
                  />
                </svg>
                申请PDF
              </button>

              <!-- 添加至文献库按钮 -->
              <button
                @click="addToLibrary"
                class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600"
              >
                <svg
                  class="w-4 h-4 transition-all duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                添加至文献库
              </button>
            </div>
          </div>
        </div>

        <!-- 评论区 -->
        <div
          id="comments"
          class="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
          v-loading="commentsLoading"
          element-loading-text="精彩评论马上到来..."
        >
          <div class="p-8">
            <div class="flex items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mr-4">
                评论区
                <span class="text-blue-600 text-lg">{{ totalCommentsCount }}</span>
              </h2>
              <!-- <div class="flex items-center space-x-2 text-gray-500 text-sm">
                <span
                  :class="sortType === 'hot' ? 'font-bold text-gray-900' : 'cursor-pointer'"
                  @click="sortType = 'hot'"
                  >最热</span
                >
                <span>|</span>
                <span
                  :class="sortType === 'new' ? 'font-bold text-gray-900' : 'cursor-pointer'"
                  @click="sortType = 'new'"
                  >最新</span
                >
              </div> -->
            </div>

            <div class="mb-8">
              <CommentForm
                :publication-id="publication.id"
                :parent-id="activeReplyId || undefined"
                :reply-to-user-name="getReplyToUserName()"
                :replied-user-id="getrepliedUserIdString()"
                @submitted="loadComments"
              />
            </div>

            <!-- 评论列表 -->
            <div v-if="sortedComments.length > 0" class="space-y-8">
              <PublicationCommentComp
                v-for="comment in sortedComments"
                :key="comment.id"
                :comment="comment"
                :replies="comment.replies"
                :active-reply-id="activeReplyId"
                @like="toggleCommentLike"
                @set-active-reply="setActiveReply"
                @reply-submitted="handleReplySubmitted"
              />
            </div>
            <div v-else class="text-center py-12 text-gray-400">
              暂无评论，快来发表第一条评论吧！
            </div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else class="text-center py-12">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
          />
        </svg>
        <p class="text-gray-500 text-lg">成果不存在或已被删除</p>
        <el-button type="primary" class="mt-4" @click="$router.go(-1)">返回上一页</el-button>
      </div>
    </div>

    <!-- 浮动回到顶部按钮 -->
    <div
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 z-50"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </div>

    <!-- 收藏夹选择对话框 -->
    <el-dialog
      v-model="showFolderDialog"
      title="选择收藏夹"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="space-y-4" v-loading="isLoadingFolders" element-loading-text="正在加载收藏夹...">
        <p class="text-gray-600 text-sm">请选择要将文献添加至的收藏夹：</p>

        <!-- 新建收藏夹按钮 -->
        <button
          @click="showCreateFolderDialog = true"
          class="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="font-medium">新建收藏夹</span>
        </button>

        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div
            v-for="folder in folders"
            :key="folder.id"
            @click="selectedFolderId = folder.id"
            class="flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50"
            :class="[
              selectedFolderId === folder.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300',
            ]"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              <span class="font-medium text-gray-900">{{ folder.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <!-- <span class="text-sm text-gray-500">{{ folder.count || 0 }} 篇</span> -->
              <div
                v-if="selectedFolderId === folder.id"
                class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            @click="cancelAddToLibrary"
            :disabled="isLoadingFolders"
            class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消
          </button>
          <button
            @click="confirmAddToLibrary"
            :disabled="!selectedFolderId || isAddingToLibrary || isLoadingFolders"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <div
              v-if="isAddingToLibrary"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>
            {{ isAddingToLibrary ? '添加中...' : '确认添加' }}
          </button>
        </div>
      </template>
    </el-dialog>

    <!-- 新建收藏夹对话框 -->
    <el-dialog
      v-model="showCreateFolderDialog"
      title="新建收藏夹"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">收藏夹名称</label>
          <input
            v-model="newFolderName"
            type="text"
            placeholder="请输入收藏夹名称"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="createFolder"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            @click="showCreateFolderDialog = false"
            :disabled="isCreatingFolder"
            class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消
          </button>
          <button
            @click="createFolder"
            :disabled="!newFolderName.trim() || isCreatingFolder"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <div
              v-if="isCreatingFolder"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>
            {{ isCreatingFolder ? '创建中...' : '创建' }}
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import {
  getPublicationInformById,
  readPublication,
  likePublication,
  unlikePublication,
  checkPublicationLike,
} from '@/api/modules/publication'
import { libraryAPI } from '@/api/modules/library'
import {
  getPublicationComments,
  likeComment,
  disLikeComment,
  getReplyComments,
} from '@/api/modules/comment'
import type { Publication } from '@/api/types/publication'
import type { Comment } from '@/api/types/comment'
import type { UserDetail } from '@/api/types/user'
import PublicationCommentComp from '@/components/publication/PublicationComment.vue'
import CommentForm from '@/components/publication/CommentForm.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const publication = ref<Publication | null>(null)
const comments = ref<Comment[]>([])
const commentsLoading = ref(true)
const isAbstractExpanded = ref(false)
const sortType = ref('hot')
const activeReplyId = ref<number | null>(null)
const showBackToTop = ref(false)
const isLiked = ref(false)
const isLikeLoading = ref(false)

// 收藏夹相关状态
const showFolderDialog = ref(false)
const folders = ref<Array<{ id: number; name: string; count?: number }>>([])
const selectedFolderId = ref<number | null>(null)
const isAddingToLibrary = ref(false)
const isLoadingFolders = ref(false)

// 新建收藏夹相关状态
const showCreateFolderDialog = ref(false)
const newFolderName = ref('')
const isCreatingFolder = ref(false)

// 回复目标信息
const replyTarget = ref<{
  id: number
  name: string
  type: 'comment' | 'reply'
} | null>(null)

// 初始加载状态
const isInitialLoad = ref(true)

// 获取用户ID
const getUserId = () => {
  if (!userStore.user || !userStore.isAuthenticated) {
    ElMessage.error('请先登录')
    return null
  }
  return userStore.user.id.toString()
}

onMounted(async () => {
  const publicationId = route.params.id
  if (!publicationId) {
    ElMessage.error('成果ID不能为空')
    router.push('/')
    return
  }

  try {
    // 获取成果详情
    const response = await getPublicationInformById(String(publicationId))
    if (response.data) {
      console.log(response.data)
      publication.value = processPublicationData(response.data)

      // 检查用户是否已点赞
      try {
        const likeResponse = await checkPublicationLike(String(publicationId))
        isLiked.value = likeResponse.isLiked
      } catch (error) {
        console.error('检查点赞状态失败:', error)
        isLiked.value = false
      }
    }

    // 获取评论列表（异步加载，不影响页面显示）
    loadComments()
  } catch (error) {
    console.error('加载成果详情失败:', error)
    ElMessage.error('加载成果详情失败')
  }

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 滚动处理函数
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const loadComments = async () => {
  if (!publication.value) return

  commentsLoading.value = true
  try {
    const response = await getPublicationComments(publication.value.id)
    if (response.data) {
      console.log(response.data)

      // 等待所有二级评论加载完成
      const commentsWithReplies = await Promise.all(
        response.data.map(async comment => {
          try {
            // 获取二级评论
            const repliesResponse = await getReplyComments(comment.id)
            const replies = repliesResponse.data || []

            // 过滤掉内容为"该评论已删除"的二级评论
            const filteredReplies = replies.filter(reply => reply.content !== '该评论已删除')

            // 返回包含回复的评论
            return {
              ...comment,
              replies: filteredReplies,
            }
          } catch (error) {
            console.error(`获取评论 ${comment.id} 的回复失败:`, error)
            return {
              ...comment,
              replies: [],
            }
          }
        })
      )
      console.log(commentsWithReplies)
      // 过滤掉没有二级评论且内容为"该评论已删除"的一级评论
      const filteredComments = commentsWithReplies.filter(comment => {
        // 如果评论内容为"该评论已删除"且没有二级评论，则过滤掉
        // 如果有二级评论，则保留该一级评论（即使已被删除）
        if (comment.content === '该评论已删除') {
          // 只有当没有二级评论时才过滤掉
          return comment.replies && comment.replies.length > 0
        }
        return true
      })

      // 只在初始加载时对评论进行排序
      if (isInitialLoad.value) {
        comments.value = filteredComments.sort((a, b) => {
          if (b.likes !== a.likes) {
            return b.likes - a.likes
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        isInitialLoad.value = false // 标记初始加载完成
      } else {
        // 非初始加载时保持原有顺序
        comments.value = filteredComments
      }
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    ElMessage.error('加载评论失败')
  } finally {
    commentsLoading.value = false
  }
}

const toggleCommentLike = async (comment: Comment) => {
  try {
    if (comment.isLiked) {
      await disLikeComment(comment.id)
      comment.isLiked = false
      comment.likes--
    } else {
      await likeComment(comment.id)
      comment.isLiked = true
      comment.likes++
    }
  } catch (error) {
    console.error('点赞失败:', error)
    ElMessage.error('操作失败')
  }
}

// 设置活跃的回复ID
function setActiveReply(
  commentId: number | null,
  targetInfo?: { id: number; name: string; type: 'comment' | 'reply' }
) {
  activeReplyId.value = commentId
  replyTarget.value = targetInfo || null
}

// 处理回复提交
function handleReplySubmitted() {
  activeReplyId.value = null // 清除活跃回复状态
  replyTarget.value = null // 清除回复目标信息
  loadComments() // 重新加载评论列表
}

const openPdf = async () => {
  if (publication.value?.pdfUrl) {
    await readPublication(publication.value.id)

    // 检查链接是否以http或https开头
    if (
      publication.value.pdfUrl.startsWith('http://') ||
      publication.value.pdfUrl.startsWith('https://')
    ) {
      // 直接跳转到外源网址
      window.open(publication.value.pdfUrl, '_blank')
    } else {
      // 跳转到本地PDF阅读器
      router.push({ path: '/pdf-reader', query: { url: publication.value.pdfUrl } })
    }
  }
}

const downloadPdf = () => {
  if (publication.value?.pdfUrl) {
    const link = document.createElement('a')
    link.href = '/api' + publication.value.pdfUrl
    link.download = ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const applyPdf = () => {
  ElMessage.info('请联系作者或管理员申请PDF全文。')
}

const handleLike = async () => {
  if (!publication.value || isLikeLoading.value) return

  isLikeLoading.value = true
  try {
    if (isLiked.value) {
      await unlikePublication(publication.value.id)
      publication.value.likeNum--
      isLiked.value = false
      ElMessage.success('取消点赞成功')
    } else {
      await likePublication(publication.value.id)
      publication.value.likeNum++
      isLiked.value = true
      ElMessage.success('点赞成功')
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  } finally {
    isLikeLoading.value = false
  }
}

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    published: 'success',
    accepted: 'primary',
    'under-review': 'warning',
    draft: 'info',
  }
  return types[status] || 'default'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status] || status
}

const formatNumber = (num: number) => {
  return num.toLocaleString()
}

const formatTime = (timeStr: string) => {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getAuthorsList = (authors: string | null) => {
  if (!authors) return []
  return authors
    .split(',')
    .map(author => author.trim())
    .filter(author => author.length > 0)
}

const getKeywordsList = (keywords: string) => {
  if (!keywords) return []
  return keywords
    .split(',')
    .map(k => k.trim())
    .filter(keyword => keyword.length > 0)
}

// 处理成果数据，为null值添加默认值
const processPublicationData = (data: Publication): Publication => {
  return {
    ...data,
    title: data.title || '无标题',
    authors: data.authors || '',
    venue: data.venue || '未知机构',
    year: data.year || null,
    status: data.status || 'unknown',
    doi: data.doi || '',
    abstracts: data.abstracts || '',
    keywords: data.keywords || '',
    pdfUrl: data.pdfUrl || '',
    readerNum: data.readerNum || 0,
    likeNum: data.likeNum || 0,
    id: data.id || 0,
    createdAt: data.createdAt || new Date().toISOString(),
  }
}

const toggleAbstract = () => {
  isAbstractExpanded.value = !isAbstractExpanded.value
}

const sortedComments = computed(() => {
  if (sortType.value === 'new') {
    return [...comments.value].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  // 默认返回当前顺序，排序已在loadComments中处理
  return comments.value
})

// 计算所有评论的总数量（包括一级评论和二级评论）
const totalCommentsCount = computed(() => {
  return comments.value.reduce((total, comment) => {
    // 一级评论算1个
    let count = 1

    // 加上二级评论数量
    if (comment.replies) {
      count += comment.replies.length
    }

    return total + count
  }, 0)
})

const getReplyToUserName = () => {
  return replyTarget.value?.name || ''
}

const getrepliedUserIdString = () => {
  if (!replyTarget.value) return ''
  // 格式: "id,name"
  return `${replyTarget.value.id},${replyTarget.value.name}`
}

const addToLibrary = async () => {
  if (!publication.value) return

  const userId = getUserId()
  if (!userId) return

  showFolderDialog.value = true

  try {
    // 获取用户的收藏夹列表
    await fetchFolders()

    if (folders.value.length === 0) {
      // 没有收藏夹时，自动创建默认收藏夹
      try {
        const createResponse = await libraryAPI.createFolder(parseInt(userId), '默认收藏夹')
        const newFolderId = createResponse.data

        // 将新创建的收藏夹添加到列表中
        folders.value = [
          {
            id: newFolderId,
            name: '默认收藏夹',
            count: 0,
          },
        ]

        ElMessage.success('已为您创建默认收藏夹')
      } catch (createError) {
        console.error('创建默认收藏夹失败:', createError)
        ElMessage.error('创建默认收藏夹失败，请稍后重试')
        showFolderDialog.value = false
        return
      }
    }

    // 默认选择第一个收藏夹
    selectedFolderId.value = folders.value[0]?.id || null
  } catch (error) {
    console.error('获取收藏夹失败:', error)
    ElMessage.error('获取收藏夹失败，请稍后重试')
    showFolderDialog.value = false
  }
}

const confirmAddToLibrary = async () => {
  if (!publication.value || !selectedFolderId.value) return

  const userId = getUserId()
  if (!userId) return

  isAddingToLibrary.value = true
  try {
    await libraryAPI.favoritePaper(parseInt(userId), publication.value.id, selectedFolderId.value)
    ElMessage.success('添加至文献库成功')
    showFolderDialog.value = false
  } catch (error) {
    console.error('添加至文献库失败:', error)
    ElMessage.error('添加至文献库失败，请稍后重试')
  } finally {
    isAddingToLibrary.value = false
  }
}

const cancelAddToLibrary = () => {
  showFolderDialog.value = false
  selectedFolderId.value = null
}

// 获取收藏夹列表
const fetchFolders = async () => {
  isLoadingFolders.value = true
  try {
    const userId = userStore.user?.id
    if (!userId) {
      ElMessage.error('用户未登录')
      return
    }
    const response = await libraryAPI.getCategoryList(userId.toString())
    folders.value = response.data || []
  } catch (error) {
    console.error('获取收藏夹失败:', error)
    ElMessage.error('获取收藏夹失败')
  } finally {
    isLoadingFolders.value = false
  }
}

// 新建收藏夹
const createFolder = async () => {
  if (!newFolderName.value.trim()) {
    ElMessage.warning('请输入收藏夹名称')
    return
  }

  const userId = userStore.user?.id
  if (!userId) {
    ElMessage.error('用户未登录')
    return
  }

  isCreatingFolder.value = true
  try {
    const response = await libraryAPI.createFolder(Number(userId), newFolderName.value.trim())
    ElMessage.success('收藏夹创建成功')
    newFolderName.value = ''
    showCreateFolderDialog.value = false
    // 重新获取收藏夹列表
    await fetchFolders()
    // 自动选择新创建的收藏夹
    if (folders.value.length > 0) {
      selectedFolderId.value = folders.value[folders.value.length - 1].id
    }
  } catch (error) {
    console.error('创建收藏夹失败:', error)
    ElMessage.error('创建收藏夹失败')
  } finally {
    isCreatingFolder.value = false
  }
}
</script>

<style scoped>
/* 自定义样式 */
.el-loading-text {
  color: #6366f1;
}

/* 文本折叠样式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bili-comment-input .el-textarea__inner {
  border-radius: 0.75rem;
  border: 1.5px solid #e5e7eb;
  transition: border-color 0.2s;
  font-size: 1rem;
  background: #f8fafc;
  padding: 1rem 1.2rem;
  min-height: 3.5rem;
  box-shadow: 0 1px 2px 0 rgba(60, 120, 255, 0.03);
}
.bili-comment-input .el-textarea__inner:focus {
  border-color: #409eff;
  background: #fff;
}
.bili-comment-input .el-textarea__inner::placeholder {
  color: #b6c2e1;
  opacity: 1;
}
</style>
