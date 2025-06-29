<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 返回上一页按钮（卡片外部） -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
      <el-button
        type="text"
        class="flex items-center text-gray-600 hover:text-blue-600 p-0"
        @click="$router.go(-1)"
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
                    <template
                      v-for="(author, index) in getAuthorsList(publication.authors)"
                      :key="index"
                    >
                      <!-- 有ID的作者 - 可点击跳转 -->
                      <el-tag
                        v-if="author.id && author.id !== 0"
                        type="info"
                        effect="plain"
                        size="default"
                        class="text-blue-600 bg-blue-50 border-blue-200 text-base font-medium hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-all duration-200"
                        @click="navigateToUser(author.id)"
                      >
                        {{ author.name || author.authorName }}
                      </el-tag>
                      <!-- 没有ID的作者 - 不可点击 -->
                      <el-tag
                        v-else
                        type="info"
                        effect="plain"
                        size="default"
                        class="text-gray-700 bg-gray-100 border-gray-200 text-base font-medium"
                      >
                        {{ author.name || author.authorName }}
                      </el-tag>
                    </template>
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
                    class="text-blue-600 hover:text-blue-800 p-0"
                    @click="toggleAbstract"
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
                @click="togglePublicationLike"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden border-2',
                  publication.isLiked
                    ? 'text-white bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 hover:shadow-md'
                    : 'text-gray-600 border-gray-200 hover:text-red-500 hover:border-red-200 hover:shadow-md',
                ]"
                :disabled="likeLoading"
              >
                <!-- 加载动画 -->
                <div
                  v-if="likeLoading"
                  class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg"
                >
                  <div
                    class="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"
                  ></div>
                </div>

                <svg
                  class="w-5 h-5 transition-all duration-300"
                  :class="[
                    publication.isLiked
                      ? 'text-white animate-pulse'
                      : 'text-gray-400 hover:text-red-500',
                  ]"
                  :fill="publication.isLiked ? 'currentColor' : 'none'"
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
                <span class="font-semibold text-lg">{{
                  publication.isLiked ? '已点赞' : '点赞'
                }}</span>
              </button>

              <!-- 查看PDF按钮 -->
              <button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                @click="openPdf"
                class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:shadow-md"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="font-semibold text-lg">查看PDF</span>
              </button>

              <!-- 下载PDF按钮 -->
              <button
                v-if="publication.pdfUrl && publication.pdfUrl.trim()"
                @click="downloadPdf"
                class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-white bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 hover:shadow-md"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
                <span class="font-semibold text-lg">下载PDF</span>
              </button>

              <!-- 添加至文献库按钮 -->
              <button
                @click="showAddToLibraryDialog"
                class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-white bg-purple-600 border-purple-600 hover:bg-purple-700 hover:border-purple-700 hover:shadow-md"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span class="font-semibold text-lg">添加至文献库</span>
              </button>

              <!-- 申请PDF按钮 -->
              <button
                v-if="!publication.pdfUrl || !publication.pdfUrl.trim()"
                @click="applyPdf"
                :disabled="applyingPdf"
                class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 text-white bg-orange-600 border-orange-600 hover:bg-orange-700 hover:border-orange-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <!-- 加载动画 -->
                <div
                  v-if="applyingPdf"
                  class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12v1m0 4h.01M12 8v4m0 4h.01M8 12v1m0 4h.01M12 4v.01M12 20v.01M4 12v.01M20 12v.01"
                  />
                </svg>
                <span class="font-semibold text-lg">{{
                  applyingPdf ? '申请中...' : '申请PDF'
                }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 评论区 -->
        <div
          id="comments"
          v-loading="commentsLoading"
          class="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
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
                @like="handleCommentLike"
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
      class="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 z-50"
      @click="scrollToTop"
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

    <!-- 添加至文献库弹窗 -->
    <el-dialog
      v-model="showLibraryDialog"
      title="选择收藏夹"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
    >
      <div class="space-y-4">
        <div v-if="categoriesLoading" class="text-center py-8">
          <div
            class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"
          ></div>
          <p class="text-gray-500 mt-2">加载收藏夹中...</p>
        </div>

        <div v-else-if="categories.length === 0" class="text-center py-8">
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p class="text-gray-500 mb-4">暂无收藏夹</p>
          <el-button type="primary" @click="createNewCategory">创建新收藏夹</el-button>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
            :class="{ 'border-blue-500 bg-blue-50': selectedCategory?.id === category.id }"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-6 h-6 text-blue-500"
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
              <div>
                <h3 class="font-semibold text-gray-900">{{ category.name }}</h3>
              </div>
            </div>
            <svg
              v-if="selectedCategory?.id === category.id"
              class="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between">
          <el-button @click="showLibraryDialog = false">取消</el-button>
          <div class="flex gap-2">
            <el-button type="primary" @click="createNewCategory">新建收藏夹</el-button>
            <el-button
              type="success"
              :disabled="!selectedCategory || addingToLibrary"
              :loading="addingToLibrary"
              @click="addToLibrary"
            >
              {{ addingToLibrary ? '添加中...' : '添加到收藏夹' }}
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 新建收藏夹弹窗 -->
    <el-dialog
      v-model="showCreateCategoryDialog"
      title="新建收藏夹"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">收藏夹名称</label>
          <el-input
            v-model="newCategoryName"
            placeholder="请输入收藏夹名称"
            maxlength="20"
            show-word-limit
            clearable
            @keyup.enter="handleCreateCategory"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="cancelCreateCategory">取消</el-button>
          <el-button
            type="primary"
            :disabled="!newCategoryName.trim() || creatingCategory"
            :loading="creatingCategory"
            @click="handleCreateCategory"
          >
            {{ creatingCategory ? '创建中...' : '创建' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getPublicationInformById,
  readPublication,
  likePublication,
  unlikePublication,
  isLikePublication,
  hasApplication,
  apply,
} from '@/api/modules/publication'
import { libraryAPI } from '@/api/modules/library'
import {
  disLikeComment,
  getPublicationComments,
  getReplyComments,
  likeComment,
} from '@/api/modules/comment'
import type { Publication, PublicationDetail } from '@/api/types/publication'
import type { Comment } from '@/api/types/comment'
import type { UserDetail } from '@/api/types/user'
import { useUserStore } from '@/stores/user'
import PublicationCommentComp from '@/components/publication/PublicationComment.vue'
import CommentForm from '@/components/publication/CommentForm.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const publication = ref<PublicationDetail | null>(null)
const comments = ref<Comment[]>([])
const commentsLoading = ref(true)
const isAbstractExpanded = ref(false)
const sortType = ref('hot')
const activeReplyId = ref<number | null>(null)
const showBackToTop = ref(false)
const likeLoading = ref(false)

// 文献库相关变量
const showLibraryDialog = ref(false)
const categories = ref<any[]>([])
const categoriesLoading = ref(false)
const selectedCategory = ref<any>(null)
const addingToLibrary = ref(false)

// 新建收藏夹相关变量
const showCreateCategoryDialog = ref(false)
const newCategoryName = ref('')
const creatingCategory = ref(false)

// 申请PDF相关变量
const receiverId = ref<number | null>(null)
const applyingPdf = ref(false)

// 回复目标信息
const replyTarget = ref<{
  id: number
  name: string
  type: 'comment' | 'reply'
} | null>(null)

// 初始加载状态
const isInitialLoad = ref(true)

onMounted(async () => {
  const publicationId = route.params.id
  if (!publicationId) {
    ElMessage.error('成果ID不能为空')
    router.push('/')
    return
  }

  // 获取接收者ID（从路由参数中获取，如果没有则使用当前用户ID）
  const routeReceiverId = route.query.receiverId || route.params.receiverId
  if (routeReceiverId) {
    receiverId.value = Number(routeReceiverId)
  } else {
    // 如果没有指定接收者，则使用当前用户ID
    receiverId.value = userStore.user?.id ? Number(userStore.user.id) : null
  }

  try {
    // 获取成果详情
    const response = await getPublicationInformById(String(publicationId))
    if (response) {
      // 处理新的数据结构：将authors和publication合并为PublicationDetail格式
      const processedData = {
        ...response.data.publication,
        authors: response.data.authors || [],
      }
      publication.value = processPublicationData(processedData)
      console.log(publication.value.authors)
      // 查询是否已经点赞了这个成果
      try {
        const likeResponse = await isLikePublication(String(publicationId))
        console.log(likeResponse)
        if (likeResponse && publication.value) {
          // 根据API响应更新点赞状态
          publication.value.isLiked = likeResponse.data
        }
      } catch (likeError) {
        // 如果查询点赞状态失败，保持默认状态（未点赞）
        console.log('查询点赞状态失败，默认为未点赞状态')
        if (publication.value) {
          publication.value.isLiked = false
        }
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

      // 过滤掉没有二级评论且内容为"该评论已删除"的一级评论
      const filteredComments = commentsWithReplies.filter(comment => {
        // 如果评论内容为"该评论已删除"且没有二级评论，则过滤掉
        if (
          comment.content === '该评论已删除' &&
          (!comment.replies || comment.replies.length === 0)
        ) {
          return false
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

// 处理二级评论点赞
const toggleReplyLike = async (reply: Comment) => {
  try {
    if (reply.isLiked) {
      await disLikeComment(reply.id)
      reply.isLiked = false
      reply.likes--
    } else {
      await likeComment(reply.id)
      reply.isLiked = true
      reply.likes++
    }
  } catch (error) {
    console.error('回复点赞失败:', error)
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

const applyPdf = async () => {
  if (!publication.value) return

  // 检查用户是否登录
  if (!userStore.user?.id) {
    ElMessage.error('请先登录')
    return
  }

  // 检查是否有接收者ID
  if (!receiverId.value) {
    ElMessage.error('无法确定申请目标，请刷新页面重试')
    return
  }

  // 用户确认是否要申请
  try {
    await ElMessageBox.confirm('确定要向该成果的作者申请PDF全文吗？', '申请确认', {
      confirmButtonText: '确定申请',
      cancelButtonText: '取消',
      type: 'info',
    })
  } catch {
    // 用户取消申请
    return
  }

  applyingPdf.value = true
  try {
    // 首先查询是否已经申请过
    const hasAppliedResponse = await hasApplication(publication.value.id)

    if (hasAppliedResponse.data) {
      ElMessage.warning('您已经申请过这个PDF了，请耐心等待作者回复')
      return
    }

    // 发送申请
    await apply(publication.value.id, receiverId.value)

    ElMessage.success('申请已发送，请等待作者回复')
  } catch (error) {
    console.error('申请PDF失败:', error)
    ElMessage.error('申请失败，请稍后重试')
  } finally {
    applyingPdf.value = false
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

const getAuthorsList = (authors: string | null | any[]) => {
  if (!authors) return []
  if (Array.isArray(authors)) {
    return authors
      .map(author => {
        if (typeof author === 'string') {
          return { name: author, id: 0 }
        }
        return {
          name: author.authorName || author.name || '',
          id: author.authorId || 0,
        }
      })
      .filter(author => author.name.length > 0)
  }
  // 如果是字符串，按逗号分割
  return authors
    .split(',')
    .map(author => author.trim())
    .filter(author => author.length > 0)
    .map(author => ({ name: author, id: 0 }))
}

const getKeywordsList = (keywords: string) => {
  if (!keywords) return []
  return keywords
    .split(',')
    .map(k => k.trim())
    .filter(keyword => keyword.length > 0)
}

// 处理成果数据，为null值添加默认值
const processPublicationData = (data: PublicationDetail): PublicationDetail => {
  return {
    ...data,
    title: data.title || '无标题',
    authors: data.authors || [],
    venue: data.venue || '未知机构',
    year: data.year || null,
    status: data.status || 'unknown',
    doi: data.doi || '',
    abstracts: data.abstracts || '',
    keywords: data.keywords || '',
    pdfUrl: data.pdfUrl || '',
    readerNum: data.readerNum || 0,
    likeNum: data.likeNum || 0,
    isLiked: data.isLiked || false,
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

const handleCommentLike = async (
  likeData: Comment | { id: number; isLiked: boolean; likes: number }
) => {
  try {
    // 判断是一级评论还是二级评论的点赞数据
    if ('content' in likeData) {
      // 一级评论
      const comment = likeData as Comment
      if (comment.isLiked) {
        await disLikeComment(comment.id)
        comment.isLiked = false
        comment.likes--
      } else {
        await likeComment(comment.id)
        comment.isLiked = true
        comment.likes++
      }
    } else {
      // 二级评论 - 数据已经在子组件中更新，这里不需要重复处理
      // 因为ReplyComment组件已经通过emit传递了更新后的数据
      console.log('二级评论点赞状态已更新:', likeData)
    }
  } catch (error) {
    console.error('点赞失败:', error)
    ElMessage.error('操作失败')
  }
}

const togglePublicationLike = async () => {
  if (likeLoading.value || !publication.value) return

  try {
    likeLoading.value = true
    if (publication.value.isLiked) {
      await unlikePublication(publication.value.id)
      publication.value.isLiked = false
      publication.value.likeNum--
    } else {
      await likePublication(publication.value.id)
      publication.value.isLiked = true
      publication.value.likeNum++
    }
  } catch (error) {
    console.error('点赞失败:', error)
    ElMessage.error('操作失败')
  } finally {
    likeLoading.value = false
  }
}

const showAddToLibraryDialog = async () => {
  showLibraryDialog.value = true
  selectedCategory.value = null
  await loadCategories()
}

const loadCategories = async () => {
  categoriesLoading.value = true
  try {
    // 获取当前用户ID
    const userId = userStore.user?.id
    if (!userId) {
      ElMessage.error('请先登录')
      showLibraryDialog.value = false
      return
    }

    const response = await libraryAPI.getCategoryList(String(userId))
    if (response.data) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('加载收藏夹失败:', error)
    ElMessage.error('加载收藏夹失败')
  } finally {
    categoriesLoading.value = false
  }
}

const selectCategory = (category: any) => {
  selectedCategory.value = category
}

const createNewCategory = () => {
  showCreateCategoryDialog.value = true
  newCategoryName.value = ''
}

const handleCreateCategory = async () => {
  if (!newCategoryName.value.trim()) return

  // 检查用户是否登录
  const userId = userStore.user?.id
  if (!userId) {
    ElMessage.error('请先登录')
    return
  }

  creatingCategory.value = true
  try {
    const response = await libraryAPI.createFolder(Number(userId), newCategoryName.value.trim())

    if (response.data) {
      ElMessage.success('收藏夹创建成功')
      showCreateCategoryDialog.value = false
      const categoryName = newCategoryName.value.trim()
      newCategoryName.value = ''

      // 重新加载收藏夹列表
      await loadCategories()

      // 自动选中新创建的收藏夹
      if (response.data) {
        selectedCategory.value = {
          id: response.data,
          name: categoryName,
          paperCount: 0,
        }
      }
    }
  } catch (error) {
    console.error('创建收藏夹失败:', error)
    ElMessage.error('创建收藏夹失败')
  } finally {
    creatingCategory.value = false
  }
}

const cancelCreateCategory = () => {
  showCreateCategoryDialog.value = false
  newCategoryName.value = ''
}

const addToLibrary = async () => {
  if (!selectedCategory.value || !publication.value) return

  // 检查用户是否登录
  const userId = userStore.user?.id
  if (!userId) {
    ElMessage.error('请先登录')
    return
  }

  addingToLibrary.value = true
  try {
    const paperId = publication.value.id
    const categoryId = selectedCategory.value.id

    await libraryAPI.favoritePaper(Number(userId), paperId, categoryId)

    ElMessage.success('成功添加到收藏夹')
    showLibraryDialog.value = false
    selectedCategory.value = null
  } catch (error) {
    console.error('添加到收藏夹失败:', error)
    ElMessage.error('添加到收藏夹失败')
  } finally {
    addingToLibrary.value = false
  }
}

const navigateToUser = (userId: number) => {
  router.push(`/user/${userId}`)
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

/* 点赞按钮动画 */
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: heartBeat 1.5s ease-in-out infinite;
}

/* 按钮点击波纹效果 */
button:active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
