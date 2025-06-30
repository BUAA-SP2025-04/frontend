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
          <!-- 加载状态 -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              加载中...
            </div>
          </div>

          <!-- 问题详情卡片 -->
          <div v-if="!loading" class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="p-8">
              <!-- 问题标题和操作 -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                  <h1 class="text-3xl font-bold text-gray-900 mb-4">
                    {{ question.title }}
                  </h1>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in questionTags"
                      :key="tag"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ tag }}
                    </span>
                    <!-- 问题状态标签 -->
                    <span
                      :class="[
                        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                        hasBestAnswer
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      {{ hasBestAnswer ? '已解决' : '待解决' }}
                    </span>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex space-x-3 ml-6">
                  <!-- 回复问题按钮 -->
                  <button
                    @click="replyToQuestion"
                    class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
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
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      ></path>
                    </svg>
                    回复
                  </button>

                  <!-- 根据是否为问题作者显示不同按钮 -->
                  <button
                    v-if="!isQuestionAuthor"
                    @click="toggleFollow"
                    :class="[
                      'px-6 py-3 rounded-lg font-medium transition-colors',
                      isFollowing
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
                    {{ isFollowing ? '已关注' : '关注问题' }}
                  </button>

                  <!-- 问题作者显示设置最佳回答按钮 -->
                  <button
                    v-if="isQuestionAuthor && !hasBestAnswer"
                    @click="showBestAnswerDialog = true"
                    class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    设置最佳回答
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
                      :src="getAvatarUrl(question.user.imgUrl)"
                      :alt="question.user.name"
                      class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                    />
                    <div>
                      <p 
                        class="font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                        @click="goToUserDetail(question.user.id)"
                      >
                        {{ question.user.name }}
                      </p>
                      <p class="text-sm text-gray-500">{{ question.user.institution }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(question.createAt) }}
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
                    {{ question.answerNum }} 浏览
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
                    {{ question.followNum }} 关注
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 回答区域 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">{{ question.answers?.length || 0 }} 个回答</h2>
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
              <!-- 空状态 -->
              <div v-if="sortedAnswers.length === 0" class="p-12 text-center">
                <div class="max-w-md mx-auto">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">暂无回答</h3>
                  <p class="mt-1 text-sm text-gray-500">成为第一个回答这个问题的人吧！</p>
                </div>
              </div>
              
              <!-- 回答列表 -->
              <div v-else>
                <div v-for="(answer, idx) in sortedAnswers" :key="answer.id">
                  <div class="p-8 hover:bg-gray-50 transition-colors">
                    <!-- 回答者信息 -->
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center">
                        <img
                          :src="getAvatarUrl(answer.user.imgUrl)"
                          :alt="answer.user.name"
                          class="w-12 h-12 rounded-full mr-3 ring-2 ring-gray-200"
                        />
                        <div>
                          <p 
                            class="font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                            @click="goToUserDetail(answer.user.id)"
                          >
                            {{ answer.user.name }}
                          </p>
                          <p class="text-sm text-gray-500">
                            {{ answer.user.institution }} · {{ formatTime(answer.createdAt) }}
                          </p>
                        </div>
                      </div>

                      <!-- 最佳答案标记 -->
                      <div v-if="answer.id === question.bestAnswer?.id" class="flex items-center">
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
                            answer.liked
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          ]"
                        >
                          <svg
                            class="w-5 h-5"
                            :fill="answer.liked ? 'currentColor' : 'none'"
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
                          <span>{{ answer.likeNum }}</span>
                        </button>

                        <!-- 回复 -->
                        <button
                          @click="startReply(parseInt(answer.id))"
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
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                          回复
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
                          <span>{{ answer.childAnswers?.length || 0 }}</span>
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
                      <!-- 暂时隐藏，因为现在使用专门的设置最佳回答对话框 -->
                      <!-- <div v-if="isQuestionAuthor && answer.id !== question.bestAnswer?.id && !hasBestAnswer">
                        <button
                          @click="selectBestAnswer(answer.id)"
                          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          采纳为最佳答案
                        </button>
                      </div> -->
                    </div>
                  </div>
                  <div
                    v-if="idx < sortedAnswers.length - 1"
                    class="mx-8 my-4 border-t border-gray-200"
                  ></div>
                  
                  <!-- 二级回答区域 -->
                  <div v-if="answer.childAnswers && answer.childAnswers.length > 0" class="ml-8 border-l-2 border-gray-200">
                    <div v-for="childAnswer in answer.childAnswers" :key="childAnswer.id" class="p-6 bg-gray-50">
                      <!-- 二级回答者信息 -->
                      <div class="flex items-center mb-3">
                        <img
                          :src="getAvatarUrl(childAnswer.user.imgUrl)"
                          :alt="childAnswer.user.name"
                          class="w-8 h-8 rounded-full mr-2 ring-1 ring-gray-200"
                        />
                        <div class="flex-1">
                          <p 
                            class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                            @click="goToUserDetail(childAnswer.user.id)"
                          >
                            {{ childAnswer.user.name }}
                          </p>
                          <p class="text-xs text-gray-500">
                            回复 {{ childAnswer.parentUserName }} · {{ formatTime(childAnswer.createdAt) }}
                          </p>
                        </div>
                      </div>

                      <!-- 二级回答内容 -->
                      <div class="ml-10">
                        <Markdown
                          class="prose prose-sm max-w-none mb-3 text-gray-700"
                          :source="childAnswer.content"
                        />

                        <!-- 二级回答操作 -->
                        <div class="flex items-center space-x-3 text-xs">
                          <button
                            @click="toggleLike(childAnswer.id)"
                            :class="[
                              'flex items-center space-x-1 transition-colors',
                              childAnswer.liked
                                ? 'text-red-500 hover:text-red-700'
                                : 'text-gray-500 hover:text-gray-700'
                            ]"
                          >
                            <svg 
                              class="w-4 h-4" 
                              :fill="childAnswer.liked ? 'currentColor' : 'none'" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{{ childAnswer.likeNum }}</span>
                          </button>
                          <button
                            @click="startReply(parseInt(childAnswer.id))"
                            class="text-gray-500 hover:text-gray-700"
                          >
                            回复
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 写回答 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Header -->
            <div class="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ replyingToAnswerId ? '回复回答' : '写回答' }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                {{ replyingToAnswerId ? '回复这个回答，分享你的见解' : '分享你的见解，帮助解决这个问题' }}
              </p>
              <!-- 显示正在回复的回答信息 -->
              <div v-if="replyingToAnswerId" class="mt-2 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-700">
                  正在回复 {{ formatPreviewContent(getReplyPreview()) }}
                  <button
                    @click="cancelAnswerReply"
                    class="ml-2 text-blue-500 hover:text-blue-700 underline"
                  >
                    取消回复
                  </button>
                </p>
              </div>
              <!-- 显示正在回复问题的信息 -->
              <div v-else-if="isReplyingToQuestion" class="mt-2 p-3 bg-green-50 rounded-lg">
                <p class="text-sm text-green-700">
                  正在回复问题 {{ formatPreviewContent(getReplyPreview()) }}
                  <button
                    @click="cancelAnswerReply"
                    class="ml-2 text-green-500 hover:text-green-700 underline"
                  >
                    取消回复
                  </button>
                </p>
              </div>
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
                  v-if="replyingToAnswerId"
                  @click="cancelAnswerReply"
                  class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium mr-3"
                >
                  取消回复
                </button>
                <button
                  @click="submitAnswer"
                  :disabled="!newAnswerContent.trim()"
                  class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {{ replyingToAnswerId ? '发布回复' : '发布回答' }}
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
                  question.answers?.length
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">浏览数</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg">{{
                  question.answerNum
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">关注数</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg">{{
                  question.followNum
                }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">发布时间</span>
                <span class="font-semibold text-gray-800 px-2 py-1 bg-white rounded-lg text-xs">{{
                  formatDate(question.createAt)
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

    <!-- 最佳回答选择对话框 -->
    <div v-if="showBestAnswerDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">选择最佳回答</h3>
            <button
              @click="showBestAnswerDialog = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
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
          <p class="text-sm text-gray-600 mt-2">请选择一个回答作为最佳答案，这将标记问题为已解决</p>
        </div>

        <div class="p-6">
          <!-- 回答列表 -->
          <div v-if="sortedAnswers.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">暂无回答</h3>
            <p class="mt-1 text-sm text-gray-500">还没有人回答这个问题</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="answer in sortedAnswers"
              :key="answer.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
              @click="selectBestAnswer(answer.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <img
                      :src="getAvatarUrl(answer.user.imgUrl)"
                      :alt="answer.user.name"
                      class="w-8 h-8 rounded-full mr-2"
                    />
                    <span class="font-medium text-gray-800">{{ answer.user.name }}</span>
                    <span class="text-sm text-gray-500 ml-2">{{ formatTime(answer.createdAt) }}</span>
                  </div>
                  <div class="text-gray-700 line-clamp-3">{{ answer.content }}</div>
                  <div class="flex items-center mt-2 text-sm text-gray-500">
                    <span class="flex items-center mr-4">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {{ answer.likeNum }} 点赞
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                      </svg>
                      {{ answer.childAnswers?.length || 0 }} 回复
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <button
                    @click.stop="selectBestAnswer(answer.id)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    选择为最佳
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            @click="showBestAnswerDialog = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import Markdown from '@/components/Markdown.vue'
import { useUserStore } from '@/stores/user'
import {
  getQuestionDetail,
  followQuestion,
  unfollowQuestion,
  likeAnswer,
  unlikeAnswer,
  updateQuestion,
  answerQuestion,
} from '@/api/modules/question'
import type { QuestionDetailResponse, QuestionAnswer, QuestionDetailApiResponse, AnswerQuestionRequest } from '@/api/types/question'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const answerSortBy = ref('helpful')
const newAnswerContent = ref('')
const newComments = ref<Record<string, string>>({})
const replyingTo = ref<Record<string, boolean>>({})
const replyContents = ref<Record<string, string>>({})
const replyTargets = ref<Record<string, any>>({})
const isQuestionAuthor = ref(false)
const loading = ref(true)
const replyingToAnswerId = ref<number | null>(null)
const isReplyingToQuestion = ref(false)
const isFollowing = ref(false)
const originalScrollPosition = ref(0) // 记录原始滚动位置
const showBestAnswerDialog = ref(false) // 控制最佳回答选择对话框

// 问题数据
const question = ref<QuestionDetailResponse>({
  id: '',
  user: {
    id: 0,
    name: '',
    email: '',
    gender: '',
    bio: '',
    researchArea: '',
    title: '',
    imgUrl: '',
    institution: '',
    createdAt: '',
    followerNum: 0,
    subjectNum: 0,
    publishNum: 0,
    likeNum: 0,
    readerNum: 0,
  },
  title: '',
  content: '',
  createAt: '',
  researchArea: '',
  answerNum: 0,
  likeNum: '0',
  followNum: 0,
  answers: [],
})

// 添加tags属性用于模板
const questionTags = ref<string[]>([])

// 计算属性
const renderedDescription = computed(() => {
  return question.value.content
})

const previewContent = computed(() => {
  return newAnswerContent.value || '<p class="text-gray-400">预览将在这里显示...</p>'
})

const sortedAnswers = computed(() => {
  const sorted = [...(question.value.answers || [])]

  switch (answerSortBy.value) {
    case 'helpful':
      sorted.sort((a, b) => {
        if (a.id === question.value.bestAnswer?.id && b.id !== question.value.bestAnswer?.id) return -1
        if (a.id !== question.value.bestAnswer?.id && b.id === question.value.bestAnswer?.id) return 1
        return parseInt(b.likeNum) - parseInt(a.likeNum)
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
  return !!question.value.bestAnswer
})

// 方法
const loadQuestionDetail = async () => {
  const questionId = route.params.id as string
  if (!questionId) {
    ElMessage.error('问题ID不存在')
    return
  }

  try {
    loading.value = true
    console.log('开始加载问题详情，问题ID:', questionId)
    
    const response = await getQuestionDetail(questionId)
    console.log('问题详情API响应:', response)
    
    if (response && response.code === '200' && response.data) {
      // 处理响应数据，确保所有必需字段都存在
      const apiData = response.data
      const questionData = apiData.question // API返回的是嵌套的question对象
      const answersData = apiData.answerWithReplies || [] // API返回的是answerWithReplies数组
      
      // 设置关注状态
      isFollowing.value = apiData.followed || false
      
      // 判断当前用户是否为问题作者
      // 使用用户store获取当前用户ID
      const currentUserId = userStore.user?.id
      isQuestionAuthor.value = !!(currentUserId && questionData.userId === parseInt(currentUserId.toString()))
      
      // 直接将answerWithReplies映射为answer + childAnswers
      const mappedAnswers = answersData.map((item: any) => {
        const answer = item.answer;
        return {
          id: answer.id?.toString() || '',
          user: answer.user || {
            id: answer.userId || 0,
            name: '未知用户',
            email: '',
            gender: '',
            bio: '',
            researchArea: '',
            title: '',
            imgUrl: '',
            institution: '',
            createdAt: '',
            followerNum: 0,
            subjectNum: 0,
            publishNum: 0,
            likeNum: 0,
            readerNum: 0,
          },
          content: answer.content || '',
          createdAt: answer.createdAt || new Date().toISOString(),
          likeNum: answer.likeNum?.toString() || '0',
          liked: item.liked || false, // 添加点赞状态
          childAnswers: (item.replies || []).map((reply: any) => ({
            id: reply.id?.toString() || '',
            user: reply.user || {
              id: reply.userId || 0,
              name: '未知用户',
              email: '',
              gender: '',
              bio: '',
              researchArea: '',
              title: '',
              imgUrl: '',
              institution: '',
              createdAt: '',
              followerNum: 0,
              subjectNum: 0,
              publishNum: 0,
              likeNum: 0,
              readerNum: 0,
            },
            content: reply.content || '',
            parentUserId: answer.user.id?.toString() || '',
            parentUserName: answer.user.name || '',
            createdAt: reply.createdAt || new Date().toISOString(),
            likeNum: reply.likeNum?.toString() || '0',
            liked: false, // 2级回答暂时使用默认状态，因为API没有提供单独的liked字段
          })),
        }
      })
      
      question.value = {
        id: questionData.id?.toString() || questionId,
        user: questionData.user || {
          id: 0,
          name: '未知用户',
          email: '',
          gender: '',
          bio: '',
          researchArea: '',
          title: '',
          imgUrl: '',
          institution: '',
          createdAt: '',
          followerNum: 0,
          subjectNum: 0,
          publishNum: 0,
          likeNum: 0,
          readerNum: 0,
        },
        title: questionData.title || '',
        content: questionData.content || '',
        createAt: questionData.createdAt || new Date().toISOString(), // API返回的是createdAt
        researchArea: questionData.researchArea || '未分类',
        answerNum: questionData.answerNum || 0,
        likeNum: questionData.likeNum?.toString() || '0',
        followNum: questionData.followNum || 0,
        followed: apiData.followed || false, // 添加关注状态
        bestAnswer: questionData.bestAnswer ? {
          ...questionData.bestAnswer,
          id: questionData.bestAnswer.id?.toString() || '',
          user: questionData.bestAnswer.user || {
            id: (questionData.bestAnswer as any).userId || 0,
            name: '未知用户',
            email: '',
            gender: '',
            bio: '',
            researchArea: '',
            title: '',
            imgUrl: '',
            institution: '',
            createdAt: '',
            followerNum: 0,
            subjectNum: 0,
            publishNum: 0,
            likeNum: 0,
            readerNum: 0,
          },
          content: questionData.bestAnswer.content || '',
          createdAt: questionData.bestAnswer.createdAt || new Date().toISOString(),
          likeNum: questionData.bestAnswer.likeNum?.toString() || '0',
        } : undefined,
        answers: mappedAnswers, // 直接使用映射后的答案数组
      }
      
      // 从研究领域生成标签
      questionTags.value = question.value.researchArea ? [question.value.researchArea] : ['未分类']
      
      console.log('解析后的问题详情:', question.value)
      console.log('回答数量:', question.value.answers.length)
      console.log('回答列表:', question.value.answers)
      console.log('最佳回答:', question.value.bestAnswer)
      console.log('问题标签:', questionTags.value)
      console.log('关注状态:', isFollowing.value)
      console.log('是否为问题作者:', isQuestionAuthor.value)
      
    } else {
      console.warn('API响应格式异常:', response)
      if (response && response.message) {
        ElMessage.warning(response.message)
      } else {
        ElMessage.error('加载问题详情失败')
      }
    }
  } catch (error) {
    console.error('加载问题详情失败:', error)
    ElMessage.error('加载问题详情失败')
  } finally {
    loading.value = false
  }
}

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

const formatDate = (dateString: string) => {
  if (!dateString) return '未知日期'
  
  const date = new Date(dateString)
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '未知日期'
  }
  
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') {
    return '/default-avatar.png'
  }
  if (imgUrl.startsWith('http')) {
    return imgUrl
  }
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

const goBack = () => {
  router.push('/research/qa')
}

const toggleFollow = async () => {
  try {
    if (isFollowing.value) {
      // 取消关注
      const response = await unfollowQuestion({ questionId: question.value.id })
      if (response && response.code === '200') {
        isFollowing.value = false
        question.value.followNum = Math.max(0, question.value.followNum - 1)
        ElMessage.success('取消关注成功')
      } else {
        ElMessage.error(response?.message || '取消关注失败')
      }
    } else {
      // 关注
      const response = await followQuestion({ questionId: question.value.id })
      if (response && response.code === '200') {
        isFollowing.value = true
        question.value.followNum++
        ElMessage.success('关注成功')
      } else {
        ElMessage.error(response?.message || '关注失败')
      }
    }
  } catch (error) {
    console.error('关注操作失败:', error)
    ElMessage.error('操作失败')
  }
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

const toggleLike = async (answerId: string) => {
  try {
    console.log('开始点赞回答:', answerId)
    
    // 先查找1级回答
    let answer = question.value.answers?.find(a => a.id === answerId)
    let isChildAnswer = false
    
    // 如果没找到1级回答，查找2级回答
    if (!answer) {
      for (const parentAnswer of question.value.answers || []) {
        const childAnswer = parentAnswer.childAnswers?.find(ca => ca.id === answerId)
        if (childAnswer) {
          answer = childAnswer
          isChildAnswer = true
          break
        }
      }
    }
    
    if (!answer) {
      ElMessage.error('找不到对应的回答')
      return
    }
    
    // 根据当前状态决定是点赞还是取消点赞
    if (answer.liked) {
      // 取消点赞
      const response = await unlikeAnswer({ answerId })
      if (response && response.code === '200') {
        answer.liked = false
        answer.likeNum = (parseInt(answer.likeNum) - 1).toString()
        ElMessage.success('取消点赞成功')
      } else {
        ElMessage.error(response?.message || '取消点赞失败')
      }
    } else {
      // 点赞
      const response = await likeAnswer({ answerId })
      if (response && response.code === '200') {
        answer.liked = true
        answer.likeNum = (parseInt(answer.likeNum) + 1).toString()
        ElMessage.success('点赞成功')
      } else {
        ElMessage.error(response?.message || '点赞失败')
      }
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    ElMessage.error('操作失败')
  }
}

const toggleComments = (answerId: string) => {
  // 这里可以添加显示/隐藏评论的逻辑
}

const toggleCommentLike = (commentId: string) => {
  // 这里可以添加评论点赞的逻辑
}

const replyToComment = (answerId: string, commentId: string, replyId?: string) => {
  replyingTo.value[commentId] = true
  replyContents.value[commentId] = ''
}

const getReplyPlaceholder = (commentId: string) => {
  return '写下你的回复...'
}

const cancelReply = (commentId: string) => {
  replyingTo.value[commentId] = false
  replyContents.value[commentId] = ''
  delete replyTargets.value[commentId]
}

const submitReply = async (answerId: string, commentId: string) => {
  const content = replyContents.value[commentId]?.trim()
  if (!content) return

  try {
    // 这里可以添加提交回复的逻辑
    cancelReply(commentId)
    ElMessage.success('回复发布成功')
  } catch (error) {
    console.error('提交回复失败:', error)
    ElMessage.error('发布失败')
  }
}

const addComment = async (answerId: string) => {
  const content = newComments.value[answerId]?.trim()
  if (!content) return

  try {
    // 这里可以添加添加评论的逻辑
    newComments.value[answerId] = ''
    ElMessage.success('评论发布成功')
  } catch (error) {
    console.error('发布评论失败:', error)
    ElMessage.error('发布失败')
  }
}

const selectBestAnswer = async (answerId: string) => {
  try {
    console.log('开始设置最佳答案:', answerId)
    const requestData = {
      id: parseInt(question.value.id),
      title: question.value.title,
      content: question.value.content,
      researchArea: question.value.researchArea,
      bestAnswerId: parseInt(answerId),
    }
    console.log('设置最佳答案请求数据:', requestData)
    
    const response = await updateQuestion(requestData)
    console.log('设置最佳答案响应:', response)
    
    if (response && response.code === '200') {
      question.value.bestAnswer = question.value.answers?.find(a => a.id === answerId)
      showBestAnswerDialog.value = false
      ElMessage.success('已设置最佳答案，问题标记为已解决')
    } else {
      ElMessage.error(response?.message || '设置最佳答案失败')
    }
  } catch (error) {
    console.error('设置最佳答案失败:', error)
    ElMessage.error('操作失败')
  }
}

const shareAnswer = (answerId: string) => {
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

const submitAnswer = async () => {
  if (!newAnswerContent.value.trim()) return

  try {
    console.log('开始提交回答...')
    const requestData: AnswerQuestionRequest = {
      questionId: parseInt(question.value.id),
      content: newAnswerContent.value.trim(),
      answerId: replyingToAnswerId.value || -1, // 如果是回复某个回答，使用该回答的ID，否则为-1
    }
    console.log('提交回答请求数据:', requestData)
    
    const response = await answerQuestion(requestData)
    console.log('提交回答响应:', response)
    
    if (response && response.code === '200') {
      newAnswerContent.value = ''
      replyingToAnswerId.value = null // 重置回复状态
      isReplyingToQuestion.value = false
      ElMessage.success(replyingToAnswerId.value ? '回复发布成功！' : '回答发布成功！')
      
      // 重新加载问题详情
      console.log('重新加载问题详情...')
      await loadQuestionDetail()
    } else {
      ElMessage.error(response?.message || '发布回答失败')
    }
  } catch (error) {
    console.error('发布回答失败:', error)
    ElMessage.error('发布失败')
  }
}

// 跳转到页面底部
const scrollToBottom = () => {
  // 使用 nextTick 确保DOM更新后再滚动
  nextTick(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  })
}

// 滚动回原位置
const scrollToOriginalPosition = () => {
  nextTick(() => {
    window.scrollTo({
      top: originalScrollPosition.value,
      behavior: 'smooth'
    })
  })
}

// 开始回复某个回答
const startReply = (answerId: number) => {
  // 记录当前滚动位置
  originalScrollPosition.value = window.pageYOffset || document.documentElement.scrollTop
  replyingToAnswerId.value = answerId
  newAnswerContent.value = ''
  // 跳转到页面底部
  scrollToBottom()
}

// 回复问题（不是回复其他回答）
const replyToQuestion = () => {
  // 记录当前滚动位置
  originalScrollPosition.value = window.pageYOffset || document.documentElement.scrollTop
  replyingToAnswerId.value = null // 设置为null表示回复问题本身
  isReplyingToQuestion.value = true
  newAnswerContent.value = ''
  // 跳转到页面底部
  scrollToBottom()
}

// 取消回复
const cancelAnswerReply = () => {
  replyingToAnswerId.value = null
  isReplyingToQuestion.value = false
  newAnswerContent.value = ''
  // 滚动回原位置
  scrollToOriginalPosition()
}

const getReplyPreview = () => {
  if (replyingToAnswerId.value === null && isReplyingToQuestion.value) {
    // 回复问题本身
    return question.value.title
  } else if (replyingToAnswerId.value !== undefined && replyingToAnswerId.value !== null) {
    // 回复某个回答（可能是1级或2级回答）
    // 先查找1级回答
    const answer = question.value.answers?.find(a => a.id === replyingToAnswerId.value?.toString())
    if (answer) {
      return `${answer.user.name}：${answer.content}`
    }
    
    // 如果没找到1级回答，查找2级回答
    for (const parentAnswer of question.value.answers || []) {
      const childAnswer = parentAnswer.childAnswers?.find(ca => ca.id === replyingToAnswerId.value?.toString())
      if (childAnswer) {
        return `${childAnswer.user.name}：${childAnswer.content}`
      }
    }
  }
  return ''
}

// 格式化预览内容（限制长度并添加省略号）
const formatPreviewContent = (content: string) => {
  if (!content) return ''
  // 移除Markdown标记，只保留纯文本
  const plainText = content.replace(/[#*`\[\]()]/g, '').replace(/\n/g, ' ').trim()
  if (plainText.length <= 50) {
    return plainText
  }
  return plainText.substring(0, 50) + '...'
}

// 判断是回复1级还是2级回答
const getReplyType = () => {
  if (replyingToAnswerId.value === null && isReplyingToQuestion.value) {
    return 'question'
  } else if (replyingToAnswerId.value !== undefined && replyingToAnswerId.value !== null) {
    // 先查找1级回答
    const answer = question.value.answers?.find(a => a.id === replyingToAnswerId.value?.toString())
    if (answer) {
      return 'answer'
    }
    
    // 如果没找到1级回答，查找2级回答
    for (const parentAnswer of question.value.answers || []) {
      const childAnswer = parentAnswer.childAnswers?.find(ca => ca.id === replyingToAnswerId.value?.toString())
      if (childAnswer) {
        return 'reply'
      }
    }
  }
  return 'unknown'
}

const goToQuestion = (questionId: string) => {
  router.push(`/research/qa/${questionId}`)
}

const goToUserDetail = (userId: number) => {
  router.push(`/user/${userId}`)
}

// 相关问题
const relatedQuestions = ref([
  {
    id: '2',
    title: '深度学习模型在小样本数据集上的过拟合问题如何解决？',
    answerCount: 8,
    viewCount: 256,
  },
  {
    id: '3',
    title: 'CNN和Vision Transformer在图像分类任务上的性能对比',
    answerCount: 5,
    viewCount: 178,
  },
  {
    id: '4',
    title: '如何处理医学图像分类中的类别不平衡问题？',
    answerCount: 12,
    viewCount: 389,
  },
  {
    id: '5',
    title: '迁移学习在小数据集上的最佳实践',
    answerCount: 7,
    viewCount: 203,
  },
])

onMounted(() => {
  // 滚动到页面顶部
  window.scrollTo(0, 0)
  loadQuestionDetail()
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