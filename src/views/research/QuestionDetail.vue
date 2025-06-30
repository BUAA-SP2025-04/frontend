<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          返回问题列表
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 主内容区域 -->
        <div class="lg:col-span-3">
          <!-- 问题详情卡片 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="p-8">
              <!-- 问题标题和操作 -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                  <h1 class="text-3xl font-bold text-gray-900 mb-4">
                    {{ question.title }}
                  </h1>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in question.tags"
                      :key="tag"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- 关注和分享按钮 -->
                <div class="flex space-x-3 ml-6">
                  <button
                    @click="toggleFollow"
                    :class="[
                      'px-6 py-3 rounded-lg font-medium transition-colors',
                      question.isFollowed
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
                    ]"
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    {{ question.isFollowed ? '已关注' : '关注问题' }}
                  </button>

                  <button
                    @click="shareQuestion"
                    class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      ></path>
                    </svg>
                    分享
                  </button>
                </div>
              </div>

              <!-- 问题描述 -->
              <Markdown
                class="prose prose-lg max-w-none mb-6 text-gray-700"
                :source="renderedDescription"
              />

              <!-- 问题元信息 -->
              <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <img
                      :src="question.author.avatar"
                      :alt="question.author.name"
                      class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                    />
                    <div>
                      <p class="font-medium text-gray-800">{{ question.author.name }}</p>
                      <p class="text-sm text-gray-500">{{ question.author.institution }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(question.createdAt) }}
                  </div>
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <svg
                      class="w-4 h-4 mr-1 text-gray-500"
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
                    {{ question.viewCount }} 浏览
                  </span>
                  <span class="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <svg
                      class="w-4 h-4 mr-1 text-gray-500"
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
                    {{ question.followCount }} 关注
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 回答区域 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">{{ answers.length }} 个回答</h2>
                <div class="flex items-center space-x-3">
                  <label class="text-sm text-gray-600">排序方式：</label>
                  <select
                    v-model="answerSortBy"
                    class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="helpful">最有帮助</option>
                    <option value="latest">最新回答</option>
                    <option value="oldest">最早回答</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 回答列表 -->
            <div>
              <template v-for="(answer, idx) in sortedAnswers" :key="answer.id">
                <div class="p-8 transition-colors">
                  <!-- 回答者信息 -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <img
                        :src="answer.author.avatar"
                        :alt="answer.author.name"
                        class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                      />
                      <div>
                        <p class="font-medium text-gray-800">{{ answer.author.name }}</p>
                        <p class="text-sm text-gray-500">
                          {{ answer.author.institution }} · {{ formatTime(answer.createdAt) }}
                        </p>
                      </div>
                    </div>

                    <!-- 最佳答案标记 -->
                    <div v-if="answer.isBest" class="flex items-center">
                      <span
                        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        最佳答案
                      </span>
                    </div>
                  </div>

                  <!-- 回答内容 -->
                  <Markdown
                    class="prose prose-lg max-w-none mb-6 text-gray-700"
                    :source="answer.content"
                  />

                  <!-- 回答操作 -->
                  <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div class="flex items-center space-x-4">
                      <!-- 点赞 -->
                      <button
                        @click="toggleLike(answer.id)"
                        :class="[
                          'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                          answer.isLiked
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                        ]"
                      >
                        <svg
                          v-if="answer.isLiked"
                          class="w-5 h-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          />
                        </svg>
                        <svg
                          v-else
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 3.75c-1.74 0-3.41.81-4.5 2.09A6.235 6.235 0 0 0 7.5 3.75C4.42 3.75 2 6.09 2 9.08c0 3.4 3.4 6.36 8.55 11.13a1.5 1.5 0 0 0 2.1 0C18.6 15.44 22 12.48 22 9.08c0-2.99-2.42-5.33-5.5-5.33z"
                          />
                        </svg>
                        <span>{{ answer.likeCount }}</span>
                      </button>

                      <!-- 评论 -->
                      <button
                        @click="toggleComments(answer.id)"
                        class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112.5 3a8.5 8.5 0 018.5 8.5z"
                          />
                        </svg>
                        <span>{{ answer.commentCount }}</span>
                      </button>

                      <!-- 分享 -->
                      <button
                        @click="shareAnswer(answer.id)"
                        class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          ></path>
                        </svg>
                        分享
                      </button>
                    </div>

                    <!-- 采纳按钮（仅问题作者可见） -->
                    <div v-if="isQuestionAuthor && !answer.isBest && !hasBestAnswer">
                      <button
                        @click="markAsBest(answer.id)"
                        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        采纳为最佳答案
                      </button>
                    </div>
                  </div>

                  <!-- 多级评论区域 -->
                  <div v-if="answer.showComments" class="mt-6 pt-6 border-t border-gray-200">
                    <!-- 评论列表 -->
                    <div
                      v-if="answer.comments && answer.comments.length > 0"
                      class="space-y-4 mb-6"
                    >
                      <div v-for="comment in answer.comments" :key="comment.id" class="group">
                        <!-- 主评论 -->
                        <div class="flex space-x-3">
                          <img
                            :src="comment.author.avatar || '/default-avatar.png'"
                            :alt="comment.author.name"
                            class="w-8 h-8 rounded-full ring-2 ring-gray-200"
                          />
                          <div class="flex-1">
                            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-800">{{
                                  comment.author.name
                                }}</span>
                                <div class="flex items-center space-x-2">
                                  <span class="text-xs text-gray-500">{{
                                    formatTime(comment.createdAt)
                                  }}</span>
                                  <button
                                    @click="replyToComment(answer.id, comment.id)"
                                    class="text-xs text-blue-600 hover:text-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    回复
                                  </button>
                                </div>
                              </div>
                              <p class="text-sm text-gray-700">{{ comment.content }}</p>

                              <!-- 评论操作 -->
                              <div class="flex items-center space-x-4 mt-2">
                                <button
                                  @click="toggleCommentLike(comment.id)"
                                  :class="[
                                    'flex items-center space-x-1 text-xs transition-colors',
                                    comment.isLiked
                                      ? 'text-blue-600'
                                      : 'text-gray-500 hover:text-blue-600',
                                  ]"
                                >
                                  <svg
                                    class="w-3 h-3"
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
                                  <span>{{ comment.likeCount || 0 }}</span>
                                </button>
                              </div>
                            </div>

                            <!-- 二级评论 -->
                            <div
                              v-if="comment.replies && comment.replies.length > 0"
                              class="ml-4 mt-3 space-y-3"
                            >
                              <div
                                v-for="reply in comment.replies"
                                :key="reply.id"
                                class="flex space-x-3 group"
                              >
                                <img
                                  :src="reply.author.avatar || '/default-avatar.png'"
                                  :alt="reply.author.name"
                                  class="w-6 h-6 rounded-full ring-1 ring-gray-200"
                                />
                                <div class="flex-1">
                                  <div class="bg-white rounded-lg p-3 border border-gray-200">
                                    <div class="flex items-center justify-between mb-1">
                                      <span class="text-xs font-medium text-gray-700">{{
                                        reply.author.name
                                      }}</span>
                                      <div class="flex items-center space-x-2">
                                        <span class="text-xs text-gray-400">{{
                                          formatTime(reply.createdAt)
                                        }}</span>
                                        <button
                                          @click="replyToComment(answer.id, comment.id, reply.id)"
                                          class="text-xs text-blue-600 hover:text-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                          回复
                                        </button>
                                      </div>
                                    </div>
                                    <p class="text-xs text-gray-600">
                                      <span v-if="reply.replyTo" class="text-blue-600 font-medium"
                                        >@{{ reply.replyTo.name }}
                                      </span>
                                      {{ reply.content }}
                                    </p>

                                    <!-- 二级评论操作 -->
                                    <div class="flex items-center space-x-3 mt-2">
                                      <button
                                        @click="toggleCommentLike(reply.id)"
                                        :class="[
                                          'flex items-center space-x-1 text-xs transition-colors',
                                          reply.isLiked
                                            ? 'text-blue-600'
                                            : 'text-gray-400 hover:text-blue-600',
                                        ]"
                                      >
                                        <svg
                                          class="w-3 h-3"
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
                                        <span>{{ reply.likeCount || 0 }}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- 回复框 -->
                            <div v-if="replyingTo[comment.id]" class="ml-4 mt-3">
                              <div class="flex space-x-3">
                                <img
                                  src="/default-avatar.png"
                                  alt="当前用户"
                                  class="w-6 h-6 rounded-full"
                                />
                                <div class="flex-1">
                                  <textarea
                                    v-model="replyContents[comment.id]"
                                    :placeholder="getReplyPlaceholder(comment.id)"
                                    rows="2"
                                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                  ></textarea>
                                  <div class="flex justify-end space-x-2 mt-2">
                                    <button
                                      @click="cancelReply(comment.id)"
                                      class="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                      取消
                                    </button>
                                    <button
                                      @click="submitReply(answer.id, comment.id)"
                                      :disabled="!replyContents[comment.id]?.trim()"
                                      class="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                                    >
                                      发布回复
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 添加评论 -->
                    <div class="flex space-x-3">
                      <img
                        src="/default-avatar.png"
                        alt="当前用户"
                        class="w-8 h-8 rounded-full ring-2 ring-gray-200"
                      />
                      <div class="flex-1">
                        <textarea
                          v-model="newComments[answer.id]"
                          placeholder="写下你的评论..."
                          rows="3"
                          class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        ></textarea>
                        <div class="flex justify-end mt-3">
                          <button
                            @click="addComment(answer.id)"
                            :disabled="!newComments[answer.id]?.trim()"
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                          >
                            发布评论
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="idx < sortedAnswers.length - 1"
                  class="mx-8 my-4 border-t border-gray-200"
                ></div>
              </template>
            </div>
          </div>

          <!-- 写回答 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Header -->
            <div class="px-8 py-6 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900">写回答</h3>
              <p class="text-sm text-gray-600 mt-1">分享你的见解，帮助解决这个问题</p>
            </div>

            <!-- Body -->
            <div class="p-8">
              <!-- 编辑 + 预览 -->
              <div class="grid gap-6 lg:grid-cols-12">
                <!-- 编辑区 -->
                <div class="flex flex-col lg:col-span-7">
                  <label class="block text-sm font-medium text-gray-700 mb-3"
                    >编写回答（支持 Markdown）</label
                  >
                  <textarea
                    v-model="newAnswerContent"
                    rows="14"
                    class="flex-1 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
                    placeholder="你可以使用 Markdown 语法来格式化你的回答..."
                  ></textarea>
                </div>

                <!-- 预览区 -->
                <div class="flex flex-col lg:col-span-5">
                  <label class="block text-sm font-medium text-gray-700 mb-3">预览</label>
                  <div class="flex-1 overflow-auto">
                    <Markdown
                      class="h-full w-full p-4 bg-gray-50 border border-gray-300 rounded-lg prose prose-sm max-w-none"
                      :source="previewContent"
                    />
                  </div>
                </div>
              </div>

              <!-- 提交 -->
              <div class="flex justify-end mt-6 pt-6 border-t border-gray-200">
                <button
                  @click="submitAnswer"
                  :disabled="!newAnswerContent.trim()"
                  class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  发布回答
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 问题统计 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">问题统计</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">回答数</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg">{{
                  answers.length
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">浏览数</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg">{{
                  question.viewCount
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">关注数</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg">{{
                  question.followCount
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">发布时间</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg text-xs">{{
                  formatDate(question.createdAt)
                }}</span>
              </div>
            </div>
          </div>

          <!-- 相关问题 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">相关问题</h3>
            <div class="space-y-4">
              <div
                v-for="relatedQ in relatedQuestions"
                :key="relatedQ.id"
                class="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                @click="goToQuestion(relatedQ.id)"
              >
                <h4
                  class="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2 transition-colors"
                >
                  {{ relatedQ.title }}
                </h4>
                <div class="flex items-center text-xs text-gray-500 space-x-3">
                  <span class="flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                      ></path>
                    </svg>
                    {{ relatedQ.answerCount }} 回答
                  </span>
                  <span class="flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    {{ relatedQ.viewCount }} 浏览
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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import Markdown from '@/components/Markdown.vue'

const route = useRoute()
const router = useRouter()

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: new marked.Renderer(),
  highlight: function (code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (__) {}
    }
    return hljs.highlightAuto(code).value
  },
} as any)

// 响应式数据
const answerSortBy = ref('helpful')
const newAnswerContent = ref('')
const newComments = ref<Record<number, string>>({})
const replyingTo = ref<Record<number, boolean>>({})
const replyContents = ref<Record<number, string>>({})
const replyTargets = ref<Record<number, any>>({}) // 存储回复的目标用户
const isQuestionAuthor = ref(false)

// 模拟问题数据（更新avatar路径）
const question = ref({
  id: 1,
  title: '如何选择合适的机器学习算法来解决多分类问题？',
  description: `我正在处理一个包含10个类别的图像分类任务，数据集大小约为50000张图片。目前考虑使用CNN，但不确定具体应该选择哪种架构。

## 数据集详情
- **总样本数**：50,000张图片
- **类别数**：10个类别
- **图片尺寸**：224x224 RGB
- **数据分布**：存在类别不平衡问题

## 遇到的问题
1. 某些类别的样本数量较少（最少的类别只有2000个样本）
2. 不确定应该使用哪种CNN架构
3. 如何处理类别不平衡问题

## 已尝试的方法
- 基础的CNN模型（准确率约75%）
- 数据增强（旋转、翻转、缩放）
- 简单的权重平衡

希望能得到一些关于**算法选择**和**数据预处理**的专业建议。有经验的同行能否分享一些实际的解决方案？

\`\`\`python
# 当前使用的简单模型
model = Sequential([
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])
\`\`\``,
  category: '机器学习',
  tags: ['CNN', '图像分类', '多分类', '类别不平衡'],
  author: {
    id: 1,
    name: '张研究员',
    avatar: '/default-avatar.png',
    institution: '清华大学',
  },
  createdAt: '2025-06-25T10:30:00',
  viewCount: 328,
  followCount: 15,
  isFollowed: false,
})

// 模拟回答数据（增加多级评论）
const answers = ref([
  {
    id: 1,
    content: `对于你的多分类图像任务，我建议从以下几个方面来优化：

## 1. 模型架构选择

根据你的数据集规模（50k样本），我推荐以下几种架构：

### ResNet系列
\`\`\`python
from tensorflow.keras.applications import ResNet50

base_model = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])
\`\`\`

### EfficientNet
EfficientNet在准确率和效率之间取得了很好的平衡：

\`\`\`python
from tensorflow.keras.applications import EfficientNetB0

base_model = EfficientNetB0(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)
\`\`\`

## 2. 类别不平衡解决方案

### 损失函数优化
使用**Focal Loss**来解决类别不平衡：

\`\`\`python
def focal_loss(gamma=2., alpha=0.25):
    def focal_loss_fixed(y_true, y_pred):
        epsilon = K.epsilon()
        y_pred = K.clip(y_pred, epsilon, 1. - epsilon)
        p_t = tf.where(K.equal(y_true, 1), y_pred, 1 - y_pred)
        alpha_factor = K.ones_like(y_true) * alpha
        alpha_t = tf.where(K.equal(y_true, 1), alpha_factor, 1 - alpha_factor)
        cross_entropy = -K.log(p_t)
        weight = alpha_t * K.pow((1 - p_t), gamma)
        loss = weight * cross_entropy
        return K.mean(K.sum(loss, axis=1))
    return focal_loss_fixed
\`\`\`

预期通过这些优化，你的模型准确率应该能提升到**85-90%**以上。`,
    author: {
      id: 2,
      name: '李教授',
      avatar: '/default-avatar.png',
      institution: '北京大学',
      title: '机器学习教授',
    },
    createdAt: '2025-06-25T11:15:00',
    likeCount: 24,
    commentCount: 5,
    isLiked: false,
    isBest: true,
    showComments: false,
    comments: [
      {
        id: 1,
        content: '非常详细的回答！Focal Loss确实很有效，我在项目中使用过。',
        author: {
          name: '王研究生',
          avatar: '/default-avatar.png',
        },
        createdAt: '2025-06-25T12:00:00',
        likeCount: 3,
        isLiked: false,
        replies: [
          {
            id: 11,
            content: '同意！Focal Loss对我的医学图像分类项目帮助很大。',
            author: {
              name: '陈博士',
              avatar: '/default-avatar.png',
            },
            replyTo: {
              name: '王研究生',
            },
            createdAt: '2025-06-25T12:30:00',
            likeCount: 1,
            isLiked: false,
          },
          {
            id: 12,
            content: '请问Focal Loss的gamma参数如何调优？',
            author: {
              name: '赵同学',
              avatar: '/default-avatar.png',
            },
            replyTo: {
              name: '王研究生',
            },
            createdAt: '2025-06-25T13:00:00',
            likeCount: 0,
            isLiked: false,
          },
        ],
      },
      {
        id: 2,
        content: '请问EfficientNet和ResNet在计算效率上有多大差别？',
        author: {
          name: '孙工程师',
          avatar: '/default-avatar.png',
        },
        createdAt: '2025-06-25T13:30:00',
        likeCount: 2,
        isLiked: true,
        replies: [
          {
            id: 21,
            content: 'EfficientNet通常比同等精度的ResNet快20-30%，参数量也更少。',
            author: {
              name: '李教授',
              avatar: '/default-avatar.png',
            },
            replyTo: {
              name: '孙工程师',
            },
            createdAt: '2025-06-25T14:00:00',
            likeCount: 5,
            isLiked: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    content: `补充一些实际经验：

## 预训练模型的选择

除了前面提到的架构，我还推荐考虑**Vision Transformer (ViT)**：

\`\`\`python
import timm

model = timm.create_model(
    'vit_base_patch16_224',
    pretrained=True,
    num_classes=10
)
\`\`\`

ViT在大规模数据集上表现很好，但需要更多的计算资源。

希望这些补充信息对你有帮助！`,
    author: {
      id: 3,
      name: '赵工程师',
      avatar: '/default-avatar.png',
      institution: '字节跳动',
      title: '高级算法工程师',
    },
    createdAt: '2025-06-25T14:20:00',
    likeCount: 18,
    commentCount: 2,
    isLiked: true,
    isBest: false,
    showComments: false,
    comments: [
      {
        id: 3,
        content: 'ViT确实强大，但训练时间比CNN长很多。',
        author: {
          name: '周研究员',
          avatar: '/default-avatar.png',
        },
        createdAt: '2025-06-25T15:00:00',
        likeCount: 1,
        isLiked: false,
        replies: [],
      },
    ],
  },
])

// 相关问题
const relatedQuestions = ref([
  {
    id: 2,
    title: '深度学习模型在小样本数据集上的过拟合问题如何解决？',
    answerCount: 8,
    viewCount: 256,
  },
  {
    id: 3,
    title: 'CNN和Vision Transformer在图像分类任务上的性能对比',
    answerCount: 5,
    viewCount: 178,
  },
  {
    id: 4,
    title: '如何处理医学图像分类中的类别不平衡问题？',
    answerCount: 12,
    viewCount: 389,
  },
  {
    id: 5,
    title: '迁移学习在小数据集上的最佳实践',
    answerCount: 7,
    viewCount: 203,
  },
])

// 计算属性
const renderedDescription = computed(() => {
  return question.value.description
})

const previewContent = computed(() => {
  return newAnswerContent.value || '<p class="text-gray-400">预览将在这里显示...</p>'
})

const sortedAnswers = computed(() => {
  const sorted = [...answers.value]

  switch (answerSortBy.value) {
    case 'helpful':
      sorted.sort((a, b) => {
        if (a.isBest && !b.isBest) return -1
        if (!a.isBest && b.isBest) return 1
        return b.likeCount - a.likeCount
      })
      break
    case 'latest':
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'oldest':
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
  }

  return sorted
})

const hasBestAnswer = computed(() => {
  return answers.value.some(answer => answer.isBest)
})

// 方法
const renderMarkdown = (content: string) => {
  return marked(content)
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
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

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

const goBack = () => {
  router.push('/research/qa')
}

const toggleFollow = () => {
  question.value.isFollowed = !question.value.isFollowed
  question.value.followCount += question.value.isFollowed ? 1 : -1
  ElMessage.success(question.value.isFollowed ? '关注成功' : '取消关注')
}

const shareQuestion = () => {
  const url = window.location.href
  navigator.clipboard
    .writeText(url)
    .then(() => {
      ElMessage.success('链接已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败，请手动复制链接')
    })
}

const toggleLike = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    answer.isLiked = !answer.isLiked
    answer.likeCount += answer.isLiked ? 1 : -1
  }
}

const toggleComments = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    answer.showComments = !answer.showComments
  }
}

const toggleCommentLike = (commentId: number) => {
  // 在所有答案的评论和回复中查找
  answers.value.forEach(answer => {
    if (answer.comments) {
      answer.comments.forEach(comment => {
        if (comment.id === commentId) {
          comment.isLiked = !comment.isLiked
          comment.likeCount = (comment.likeCount || 0) + (comment.isLiked ? 1 : -1)
        }
        if (comment.replies) {
          comment.replies.forEach(reply => {
            if (reply.id === commentId) {
              reply.isLiked = !reply.isLiked
              reply.likeCount = (reply.likeCount || 0) + (reply.isLiked ? 1 : -1)
            }
          })
        }
      })
    }
  })
}

const replyToComment = (answerId: number, commentId: number, replyId?: number) => {
  replyingTo.value[commentId] = true

  // 设置回复目标
  const answer = answers.value.find(a => a.id === answerId)
  if (answer && answer.comments) {
    const comment = answer.comments.find(c => c.id === commentId)
    if (replyId && comment && comment.replies) {
      const reply = comment.replies.find(r => r.id === replyId)
      if (reply) {
        replyTargets.value[commentId] = reply.author
      }
    } else if (comment) {
      replyTargets.value[commentId] = comment.author
    }
  }

  replyContents.value[commentId] = ''
}

const getReplyPlaceholder = (commentId: number) => {
  const target = replyTargets.value[commentId]
  return target ? `回复 @${target.name}...` : '写下你的回复...'
}

const cancelReply = (commentId: number) => {
  replyingTo.value[commentId] = false
  replyContents.value[commentId] = ''
  delete replyTargets.value[commentId]
}

const submitReply = (answerId: number, commentId: number) => {
  const content = replyContents.value[commentId]?.trim()
  if (!content) return

  const answer = answers.value.find(a => a.id === answerId)
  if (answer && answer.comments) {
    const comment = answer.comments.find(c => c.id === commentId)
    if (comment) {
      if (!comment.replies) comment.replies = []

      const newReply = {
        id: Date.now(),
        content,
        author: {
          name: '当前用户',
          avatar: '/default-avatar.png',
        },
        replyTo: replyTargets.value[commentId] || null,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        isLiked: false,
      }

      comment.replies.push(newReply)
      answer.commentCount++

      // 清理状态
      cancelReply(commentId)

      ElMessage.success('回复发布成功')
    }
  }
}

const addComment = (answerId: number) => {
  const content = newComments.value[answerId]?.trim()
  if (!content) return

  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    if (!answer.comments) answer.comments = []

    answer.comments.push({
      id: Date.now(),
      content,
      author: {
        name: '当前用户',
        avatar: '/default-avatar.png',
      },
      createdAt: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
      replies: [],
    })

    answer.commentCount++
    newComments.value[answerId] = ''
    ElMessage.success('评论发布成功')
  }
}

const markAsBest = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    answers.value.forEach(a => (a.isBest = false))
    answer.isBest = true
    ElMessage.success('已采纳为最佳答案')
  }
}

const shareAnswer = (answerId: number) => {
  const url = `${window.location.href}#answer-${answerId}`
  navigator.clipboard
    .writeText(url)
    .then(() => {
      ElMessage.success('答案链接已复制')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}

const submitAnswer = () => {
  if (!newAnswerContent.value.trim()) return

  const newAnswer = {
    id: Date.now(),
    content: newAnswerContent.value,
    author: {
      id: 999,
      name: '当前用户',
      avatar: '/default-avatar.png',
      institution: '我的大学',
      title: '研究生',
    },
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    isBest: false,
    showComments: false,
    comments: [],
  }

  answers.value.push(newAnswer)
  newAnswerContent.value = ''
  ElMessage.success('回答发布成功！')
}

const goToQuestion = (questionId: number) => {
  router.push(`/research/qa/${questionId}`)
}

onMounted(() => {
  question.value.viewCount++
  isQuestionAuthor.value = false

  answers.value.forEach(answer => {
    newComments.value[answer.id] = ''
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 增强的Markdown样式 */
.prose {
  color: #475569;
  max-width: none;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: #1e293b;
  font-weight: 600;
}

.prose h1 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #0891b2, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.prose h2 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #0e7490;
}

.prose h3 {
  font-size: 1.125rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: #0e7490;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose ul,
.prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose code {
  background: linear-gradient(to right, #f1f5f9, #e0f2fe);
  color: #0c4a6e;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  border: 1px solid #bae6fd;
}

.prose pre {
  background: linear-gradient(135deg, #1e293b, #334155);
  color: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #475569;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.prose pre code {
  background: none;
  color: inherit;
  padding: 0;
  border: none;
}

.prose blockquote {
  border-left: 4px solid #0891b2;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #64748b;
  background: linear-gradient(to right, #f0f9ff, #f8fafc);
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.prose th,
.prose td {
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background: linear-gradient(to right, #0891b2, #3b82f6);
  color: white;
  font-weight: 600;
}

.prose td {
  background: #fafafa;
}

.prose strong {
  font-weight: 600;
  color: #1e293b;
}

.prose em {
  font-style: italic;
  color: #475569;
}

.prose a {
  color: #0891b2;
  text-decoration: none;
  transition: color 0.2s;
}

.prose a:hover {
  color: #0e7490;
  text-decoration: underline;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #0891b2, #3b82f6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0e7490, #2563eb);
}
</style>