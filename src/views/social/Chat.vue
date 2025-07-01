<template>
  <div class="chat-wrapper bg-gray-100 dark:bg-gray-900">
    <!-- 聊天容器 -->
    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg flex flex-col h-full">
      <!-- 聊天头部 -->
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="flex items-center space-x-3">
              <div class="relative">
                <img
                  :src="getChatUserAvatar()"
                  :alt="chatUser?.name || '用户'"
                  class="w-10 h-10 rounded-full object-cover"
                  @error="handleAvatarError"
                />
                <div
                  v-if="chatUser?.isOnline"
                  class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                ></div>
              </div>

              <div>
                <div class="flex items-center space-x-2">
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ chatUser?.name || '加载中...' }}
                  </h2>
                </div>
                <p class="text-sm flex items-center space-x-1 mt-1">
                  <template v-if="isTyping">
                    <span class="inline-flex items-center">
                      <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-1"></span>
                      <span class="text-gray-600 dark:text-gray-400">正在输入...</span>
                    </span>
                  </template>
                  <template v-else-if="chatUser?.online">
                    <span class="inline-flex items-center">
                      <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                      <span class="text-gray-600 dark:text-gray-400">在线</span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="inline-flex items-center">
                      <span class="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                      <span class="text-gray-600 dark:text-gray-400">{{ getLastSeenText() }}</span>
                    </span>
                  </template>
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- 机构信息 - 卡片式 -->
            <div
              v-if="chatUser?.institution"
              class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 border border-purple-200 dark:border-purple-700 rounded-lg px-3 py-2 shadow-sm"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                  />
                </svg>
                <span class="text-sm font-medium text-purple-700 dark:text-purple-300">{{ chatUser.institution }}</span>
              </div>
            </div>

            <!-- 连接状态 - WiFi图标风格 -->
            <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <svg
                v-if="isConnected"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="rgb(59,130,246)"
                class="size-5 animate-pulse"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>

              <svg v-else class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.366zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- 更多选项 -->
            <el-dropdown trigger="click" @command="handleMoreAction">
              <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="search">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      搜索消息
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="darkMode">
                    <div class="flex items-center">
                      <svg v-if="!isDarkMode" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {{ isDarkMode ? '浅色模式' : '深色模式' }}
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="profile" divided>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    查看资料
                  </div>
                </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <!-- 搜索栏 -->
        <div v-if="showSearch" class="mt-4 flex items-center space-x-2">
          <div class="flex-1 relative">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="搜索消息内容..."
              class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div v-if="searchResults.length > 0" class="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">
              {{ currentSearchIndex + 1 }} / {{ searchResults.length }}
            </div>
          </div>
          <div class="flex space-x-1">
            <button 
              @click="prevSearchResult" 
              :disabled="searchResults.length === 0"
              class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button 
              @click="nextSearchResult" 
              :disabled="searchResults.length === 0"
              class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button 
              @click="closeSearch" 
              class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 连接状态提示 -->
      <div
        v-if="!isConnected && !isInitializing"
        class="bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-200 dark:border-yellow-700 px-6 py-2 flex-shrink-0"
      >
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span class="text-sm text-yellow-700 dark:text-yellow-300">连接异常，部分功能可能不可用。正在尝试重连...</span>
        </div>
      </div>

      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-hidden flex bg-gray-50 dark:bg-gray-900 min-h-0">
        <div class="flex-1 flex flex-col min-h-0">
          <div
            ref="messagesContainer"
            class="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            @scroll="handleScroll"
          >
            <!-- 加载更多指示器 -->
            <div v-if="isLoading" class="text-center py-4">
              <el-spin size="small" />
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">加载更多消息...</span>
            </div>

            <!-- 没有更多消息提示 -->
            <div v-else-if="!hasMore && messages.length > 0" class="text-center py-4">
              <span class="text-sm text-gray-400 dark:text-gray-500">没有更多消息了</span>
            </div>

            <!-- 初始化加载状态 -->
            <div v-if="isInitializing" class="text-center py-12">
              <el-spin size="large" />
              <p class="mt-4 text-gray-500 dark:text-gray-400">正在初始化聊天...</p>
            </div>

            <!-- 日期分割线和消息 -->
            <div v-else-if="Object.keys(groupedFilteredMessages).length > 0">
              <div v-for="(group, date) in groupedFilteredMessages" :key="date">
                <div class="flex justify-center my-4">
                  <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                    {{ formatDateDivider(String(date)) }}
                  </span>
                </div>

                <!-- 消息列表 -->
                <div
                  v-for="message in group"
                  :key="message.id"
                  :ref="(el) => { if (el) messageRefs[message.id] = el as HTMLElement }"
                  :class="[
                    'flex mb-4 transition-all duration-300',
                    message.senderId === currentUserId ? 'justify-end' : 'justify-start',
                    highlightedMessageId === message.id ? 'bg-yellow-100 dark:bg-yellow-900 rounded-lg p-2' : ''
                  ]"
                >
                  <div
                    :class="[
                      'max-w-xs lg:max-w-md xl:max-w-lg flex',
                      message.senderId === currentUserId ? 'flex-row-reverse' : 'flex-row',
                    ]"
                  >
                    <!-- 头像 -->
                    <img
                      :src="getMessageAvatar(message)"
                      :alt="getMessageSenderName(message)"
                      class="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      :class="message.senderId === currentUserId ? 'ml-2' : 'mr-2'"
                      @error="handleAvatarError"
                    />

                    <!-- 消息气泡 -->
                    <div class="flex flex-col">
                      <!-- 文本消息 -->
                      <div
                        v-if="message.type === 'text'"
                        :class="[
                          'px-4 py-2 rounded-lg max-w-full break-all',
                          message.senderId === currentUserId
                            ? 'bg-indigo-500 dark:bg-indigo-600 text-white rounded-br-sm'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-sm',
                        ]"
                      >
                        <p
                          class="text-sm whitespace-pre-wrap"
                          v-html="highlightSearchText(linkify(message.content, message.senderId === currentUserId))"
                        ></p>
                      </div>

                      <!-- 图片消息 -->
                      <div
                        v-else-if="message.type === 'image'"
                        class="rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        @click="previewImage(getImageUrl(message))"
                      >
                        <img
                          :src="getImageUrl(message)"
                          alt="图片"
                          class="max-w-full h-auto max-h-64 object-cover"
                          loading="lazy"
                          @error="handleImageError"
                        />
                      </div>

                      <!-- 文件消息 -->
                      <div
                        v-else-if="message.type === 'file'"
                        :class="[
                          'p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm',
                          message.senderId === currentUserId
                            ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700'
                            : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        ]"
                        @click="downloadFile(message.fileInfo)"
                      >
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <svg
                              class="w-5 h-5 text-gray-600 dark:text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {{
                                message.fileInfo?.name || message.fileInfo?.fileName || '未知文件'
                              }}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              {{
                                formatFileSize(
                                  message.fileInfo?.size || message.fileInfo?.fileSize || 0
                                )
                              }}
                            </p>
                          </div>
                          <svg
                            class="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                        </div>
                      </div>

                      <!-- 系统消息 -->
                      <div
                        v-else-if="message.type === 'system'"
                        class="text-center text-xs text-gray-500 dark:text-gray-400 py-2"
                      >
                        {{ message.content }}
                      </div>

                      <!-- 消息时间和状态 -->
                      <div
                        v-if="message.type !== 'system'"
                        :class="[
                          'flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-1',
                          message.senderId === currentUserId ? 'justify-end' : 'justify-start',
                        ]"
                      >
                        <span>{{ formatMessageTime(message.createdAt) }}</span>

                        <!-- 消息状态（仅显示自己发送的消息） -->
                        <div v-if="message.senderId === currentUserId" class="flex items-center">
                          <!-- 发送中 -->
                          <svg
                            v-if="message.status === 'sending'"
                            class="w-3 h-3 text-gray-400 animate-spin ml-1"
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

                          <!-- 已发送 -->
                          <svg
                            v-else-if="message.status === 'sent'"
                            class="w-3 h-3 text-gray-400 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <!-- 已读 -->
                          <div v-else-if="message.status === 'read'" class="flex ml-1">
                            <svg
                              class="w-3 h-3 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <svg
                              class="w-3 h-3 text-blue-500 -ml-1"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <svg
                class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
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
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">开始对话</h3>
              <p class="text-gray-500 dark:text-gray-400">发送消息开始您的第一次对话</p>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            <!-- 文件拖拽区域 -->
            <div
              v-if="isDragging"
              class="absolute inset-0 bg-indigo-50 dark:bg-indigo-900 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center z-50 border-2 border-dashed border-indigo-300 dark:border-indigo-600"
              @drop="handleFileDrop"
              @dragover.prevent
              @dragleave="isDragging = false"
            >
              <div class="text-center">
                <svg
                  class="w-16 h-16 mx-auto text-indigo-400 dark:text-indigo-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p class="text-lg font-medium text-indigo-600 dark:text-indigo-400">拖拽文件到这里发送</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">支持图片、文档等文件类型</p>
              </div>
            </div>

            <!-- 工具栏和输入框 -->
            <div class="space-y-3">
              <!-- 工具栏 -->
              <div class="flex items-center space-x-2">
                <!-- 表情 -->
                <el-popover placement="top-start" :width="320" trigger="click">
                  <template #reference>
                    <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-600 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </template>

                  <div class="grid grid-cols-8 gap-2 p-2">
                    <button
                      v-for="emoji in commonEmojis"
                      :key="emoji"
                      @click="insertEmoji(emoji)"
                      class="w-8 h-8 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {{ emoji }}
                    </button>
                  </div>
                </el-popover>

                <!-- 文件上传 -->
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  style="display: none"
                  @change="handleFileSelect"
                />
                <button
                  @click="fileInput?.click()"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <!-- 图片上传 -->
                <input
                  ref="imageInput"
                  type="file"
                  multiple
                  accept="image/*"
                  style="display: none"
                  @change="handleImageSelect"
                />
                <button
                  @click="imageInput?.click()"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>

                <!-- 快捷短语 -->
                <el-popover placement="top-start" :width="200" trigger="click">
                  <template #reference>
                    <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-600 dark:text-gray-300"
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
                    </button>
                  </template>

                  <div class="space-y-1">
                    <button
                      v-for="phrase in quickPhrases"
                      :key="phrase"
                      @click="insertQuickPhrase(phrase)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-900 dark:text-gray-100"
                    >
                      {{ phrase }}
                    </button>
                  </div>
                </el-popover>
              </div>

              <!-- 输入框 -->
              <div class="flex items-end space-x-3">
                <div class="flex-1">
                  <el-input
                    v-model="messageInput"
                    type="textarea"
                    :rows="1"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    placeholder="输入消息..."
                    :disabled="!isConnected && !isOfflineMode"
                    @keydown.enter.exact.prevent="sendMessage"
                    @keydown.shift.enter.exact="handleShiftEnter"
                    @input="handleInputChange"
                    @focus="markAsRead"
                  />
                </div>

                <el-button
                  type="primary"
                  :disabled="!messageInput.trim() && selectedFiles.length === 0"
                  :loading="isSending"
                  @click="sendMessage"
                >
                  <svg
                    v-if="!isSending"
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  发送
                </el-button>
              </div>

              <!-- 文件预览 -->
              <div v-if="selectedFiles.length > 0" class="space-y-2">
                <div
                  v-for="(file, index) in selectedFiles"
                  :key="index"
                  class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                >
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ file.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(file.size) }}</p>
                    </div>
                  </div>

                  <button
                    @click="removeFile(index)"
                    class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="showImagePreview" width="80%" center>
      <img :src="previewImageUrl" class="w-full h-auto" @error="handleImageError" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { wsService } from '@/utils/websocketChat'
import { uploadFile } from '@/utils/fileUpload'
import { chatAPI } from '@/api/modules/chat'
import type { GetConversationHistoryRequest } from '@/api/types/chat'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 响应式数据
const messagesContainer = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const imageInput = ref<HTMLInputElement>()
const messageInput = ref('')
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const showImagePreview = ref(false)
const previewImageUrl = ref('')
const isSending = ref(false)
const typingTimer = ref<number>()
const isInitializing = ref(true)
const isOfflineMode = ref(false)

// 聊天数据
const messages = ref<any[]>([])
const chatUser = ref<any>(null)
const isLoading = ref(false)
const hasMore = ref(true)
const isTyping = ref(false)
const isConnected = ref(false)

// 深色模式状态
const isDarkMode = ref(false)

// 搜索相关状态
const showSearch = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const currentSearchIndex = ref(0)
const highlightedMessageId = ref<string | null>(null)
const messageRefs = ref<Record<string, HTMLElement>>({})

// 获取当前用户ID - 确保类型一致
const currentUserId = computed(() => {
  const userId = userStore.user?.id
  return typeof userId === 'string' ? parseInt(userId) : userId || 1
})
const currentUser = computed(() => userStore.user)
const chatUserId = computed(() => parseInt(route.params.userId as string))
const conversationId = computed(() => {
  if (route.params.conversationId) {
    return route.params.conversationId as string
  }
  const userIdNum = Number(currentUserId.value)
  const chatIdNum = Number(chatUserId.value)
  return `conv_${Math.min(userIdNum, chatIdNum)}_${Math.max(userIdNum, chatIdNum)}`
})

// 常用表情和快捷短语
const commonEmojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🥳',
  '👍',
  '👎',
  '👌',
  '✌️',
  '🤞',
  '🤝',
  '👏',
  '🙌',
  '💪',
]

const quickPhrases = [
  '好的，我明白了',
  '感谢您的分享',
  '这个想法很有趣',
  '让我考虑一下',
  '期待进一步交流',
  '有时间详细讨论一下',
  '我会尽快回复您',
  '非常感谢！',
]

// 深色模式切换
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

// 初始化深色模式
onMounted(() => {
  const savedTheme = localStorage.getItem('darkMode')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDarkMode.value = savedTheme ? savedTheme === 'true' : systemPrefersDark
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
})

// 搜索功能
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    closeSearch()
  }
}

const closeSearch = () => {
  showSearch.value = false
  searchQuery.value = ''
  searchResults.value = []
  highlightedMessageId.value = null
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    highlightedMessageId.value = null
    return
  }

  const query = searchQuery.value.toLowerCase()
  searchResults.value = messages.value.filter(message => 
    message.type === 'text' && 
    message.content.toLowerCase().includes(query)
  )
  
  currentSearchIndex.value = 0
  if (searchResults.value.length > 0) {
    highlightCurrentResult()
  }
}

const nextSearchResult = () => {
  if (searchResults.value.length === 0) return
  currentSearchIndex.value = (currentSearchIndex.value + 1) % searchResults.value.length
  highlightCurrentResult()
}

const prevSearchResult = () => {
  if (searchResults.value.length === 0) return
  currentSearchIndex.value = currentSearchIndex.value === 0 
    ? searchResults.value.length - 1 
    : currentSearchIndex.value - 1
  highlightCurrentResult()
}

const highlightCurrentResult = () => {
  if (searchResults.value.length === 0) return
  
  const currentMessage = searchResults.value[currentSearchIndex.value]
  highlightedMessageId.value = currentMessage.id
  
  // 滚动到当前消息 - 修改这部分
  nextTick(() => {
    const messageElement = messageRefs.value[currentMessage.id]
    const container = messagesContainer.value
    
    if (messageElement && container) {
      // 计算目标位置
      const containerRect = container.getBoundingClientRect()
      const messageRect = messageElement.getBoundingClientRect()
      
      // 计算相对于容器的位置
      const relativeTop = messageRect.top - containerRect.top + container.scrollTop
      
      // 滚动到目标位置，使消息在容器中央
      const targetScrollTop = relativeTop - container.clientHeight / 2 + messageRect.height / 2
      
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      })
    }
  })
}

const highlightSearchText = (text: string) => {
  if (!searchQuery.value.trim()) return text
  
  const query = searchQuery.value.trim()
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600">$1</mark>')
}

// 过滤后的消息（用于搜索时显示）
const filteredMessages = computed(() => {
  if (!searchQuery.value.trim()) return messages.value
  return searchResults.value
})

// 分组过滤后的消息
const groupedFilteredMessages = computed(() => {
  const grouped: Record<string, any[]> = {}
  
  filteredMessages.value.forEach(message => {
    const date = new Date(message.createdAt).toDateString()
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(message)
  })
  
  return grouped
})

// 链接识别函数
function linkify(text: string, isSelf = false) {
  if (!text) return ''
  const linkClass = isSelf
    ? 'text-blue-200 underline break-all hover:text-blue-100'
    : 'text-blue-600 dark:text-blue-400 underline break-all hover:text-blue-500 dark:hover:text-blue-300'
  return text.replace(
    /((https?:\/\/|www\.)[^\s<]+)/gi,
    url => {
      let link = url
      if (!/^https?:\/\//i.test(url)) {
        link = 'http://' + url
      }
      return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${url}</a>`
    }
  )
}

// 计算属性 - 按日期分组消息
const groupedMessages = computed(() => {
  if (!messages.value || !Array.isArray(messages.value)) {
    return {}
  }

  const groups: { [key: string]: any[] } = {}

  messages.value.forEach(message => {
    if (message && message.createdAt) {
      const dateKey = new Date(message.createdAt).toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    }
  })

  return groups
})

// 初始化聊天
const initializeChat = async () => {
  try {
    isInitializing.value = true

    console.log('初始化聊天 - 当前用户ID:', currentUserId.value, '聊天用户ID:', chatUserId.value)

    // 检查参数有效性
    if (!chatUserId.value || isNaN(chatUserId.value)) {
      ElMessage.error('无效的用户ID')
      router.push('/messages')
      return
    }

    if (chatUserId.value === currentUserId.value) {
      ElMessage.error('不能与自己聊天')
      router.push('/messages')
      return
    }

    // 加载聊天用户信息
    await loadChatUser()

    // 加载历史消息
    await loadMessages()

    // 初始化 WebSocket 连接
    initializeWebSocket()
  } catch (error) {
    console.error('初始化聊天失败:', error)
    ElMessage.error('初始化失败，请刷新页面重试')
  } finally {
    isInitializing.value = false
  }
}

// 加载聊天用户信息
const loadChatUser = async () => {
  try {
    const response = await chatAPI.getChatUser(chatUserId.value)
    chatUser.value = response.data
    console.log('加载聊天用户信息成功:', chatUser.value)
  } catch (error) {
    console.error('加载用户信息失败:', error)
    // 设置默认用户信息
    chatUser.value = {
      id: chatUserId.value,
      name: `用户${chatUserId.value}`,
      avatar: '',
      institution: '未知机构',
      isOnline: false,
      lastSeen: new Date().toISOString(),
    }
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const getChatUserAvatar = () => {
  if (!chatUser.value) return '/default-avatar.png'
  if (chatUser.value.avatar) {
    // 如果是完整URL则直接用，否则拼接
    if (/^https?:\/\//.test(chatUser.value.avatar)) {
      return chatUser.value.avatar
    }
    return API_BASE_URL + chatUser.value.avatar
  }
  return '/default-avatar.png'
}

// 初始化 WebSocket 连接
const initializeWebSocket = () => {
  console.log('初始化 WebSocket 连接...')

  // 先断开现有连接
  wsService.disconnect()

  // 清除之前的监听器
  wsService.off('connected', handleConnected)
  wsService.off('disconnected', handleDisconnected)
  wsService.off('max_reconnect_attempts', handleMaxReconnectAttempts)
  wsService.off('new_message', handleNewMessage)
  wsService.off('message_sent', handleMessageSent)
  wsService.off('typing_status', handleTypingStatus)
  wsService.off('read_status', handleReadStatus)
  wsService.off('user_status', handleUserStatus)

  // 连接 WebSocket
  wsService.connect(currentUserId.value.toString())

  // 监听连接状态
  wsService.on('connected', handleConnected)
  wsService.on('disconnected', handleDisconnected)
  wsService.on('max_reconnect_attempts', handleMaxReconnectAttempts)

  // 监听消息事件
  wsService.on('new_message', handleNewMessage)
  wsService.on('message_sent', handleMessageSent)
  wsService.on('typing_status', handleTypingStatus)
  wsService.on('read_status', handleReadStatus)
  wsService.on('user_status', handleUserStatus)
}

// WebSocket 事件处理函数
const handleConnected = () => {
  isConnected.value = true
  isOfflineMode.value = false
  console.log('WebSocket 连接成功')
}

const handleDisconnected = () => {
  isConnected.value = false
  isOfflineMode.value = true
  ElMessage.warning('连接断开')
}

const handleMaxReconnectAttempts = () => {
  ElMessage.error('连接失败，请检查网络或刷新页面重试')
}

const handleNewMessage = (data: any) => {
  console.log('收到新消息事件:', data)
  if (data.message && data.message.conversationId === conversationId.value) {
    // 检查是否已经存在相同的消息（避免重复）
    const existingMessage = messages.value.find(m => m.id === data.message.id)
    if (!existingMessage) {
      messages.value.push(data.message)
      scrollToBottom()

      // 如果消息不是自己发送的，播放提示音
      if (data.message.senderId !== currentUserId.value) {
      }
    }
  }
}

const handleMessageSent = (data: any) => {
  console.log('消息发送确认事件:', data)
  if (data.tempId) {
    const tempMessage = messages.value.find(m => m.id === data.tempId)
    if (tempMessage && data.message) {
      // 更新临时消息为正式消息
      Object.assign(tempMessage, data.message)
      tempMessage.status = 'sent'
    }
  }
}

const handleTypingStatus = (data: any) => {
  console.log('正在输入状态事件:', data)
  if (data.userId !== currentUserId.value && data.conversationId === conversationId.value) {
    isTyping.value = data.isTyping
    if (data.isTyping) {
      setTimeout(() => {
        isTyping.value = false
      }, 3000)
    }
  }
}

const handleReadStatus = (raw: any) => {
  // 兼容 data.data 和 data 结构
  const data = raw.data || raw
  console.log('已读状态事件:', data)
  // 只处理对方已读我发的消息
  if (
    data.conversationId === conversationId.value &&
    data.readBy !== currentUserId.value // 不是自己已读自己
  ) {
    messages.value.forEach(msg => {
      if (data.messageIds.includes(String(msg.id)) && msg.senderId === currentUserId.value) {
        msg.status = 'read'
      }
    })
  }
}

const handleUserStatus = (data: any) => {
  console.log('用户状态变化事件:', data)
  if (chatUser.value && chatUser.value.id === data.userId) {
    chatUser.value.isOnline = data.online
    chatUser.value.lastSeen = data.lastSeen
  }
}

// 发送消息
const sendMessage = async () => {
  if ((!messageInput.value.trim() && selectedFiles.value.length === 0) || isSending.value) {
    return
  }

  if (!isConnected.value) {
    ElMessage.error('连接断开，无法发送消息')
    return
  }

  try {
    isSending.value = true

    // 发送文本消息
    if (messageInput.value.trim()) {
      await sendTextMessage(messageInput.value.trim())
      messageInput.value = ''
    }

    // 发送文件消息
    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        await sendFileMessage(file)
      }
      selectedFiles.value = []
    }

    scrollToBottom()
  } catch (error) {
    console.error('发送消息失败:', error)
    ElMessage.error('发送失败，请重试')
  } finally {
    isSending.value = false
  }
}

// 发送文本消息
const sendTextMessage = async (content: string) => {
  const tempId = `temp_${Date.now()}_${Math.random()}`

  console.log('发送文本消息:', {
    conversationId: conversationId.value,
    content,
    senderId: currentUserId.value,
    receiverId: chatUserId.value,
    tempId,
  })

  // 立即添加到本地消息列表（乐观更新）
  const tempMessage = {
    id: tempId,
    conversationId: conversationId.value,
    senderId: currentUserId.value,
    receiverId: chatUserId.value,
    type: 'text',
    content,
    status: 'sending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  messages.value.push(tempMessage)
  nextTick(() => scrollToBottom())

  try {
    // 通过 WebSocket 发送消息
    wsService.sendTextMessage(conversationId.value, content, tempId, chatUserId.value)
  } catch (error) {
    console.error('WebSocket 发送失败:', error)
    // 更新消息状态为失败
    tempMessage.status = 'failed'
    throw error
  }
}

// 发送文件消息
const sendFileMessage = async (file: File) => {
  const tempId = `temp_file_${Date.now()}_${Math.random()}`

  try {
    console.log('开始上传文件:', file.name, file.size, file.type)

    // 上传文件 - 传入 conversationId
    const uploadResponse = await uploadFile(file, conversationId.value)
    console.log('文件上传响应:', uploadResponse)

    // 创建临时消息
    const tempMessage = {
      id: tempId,
      conversationId: conversationId.value,
      senderId: currentUserId.value,
      receiverId: chatUserId.value,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      content: file.type.startsWith('image/') ? uploadResponse.fileUrl : uploadResponse.fileName,
      fileInfo: {
        fileName: uploadResponse.fileName,
        fileSize: uploadResponse.fileSize,
        fileUrl: uploadResponse.fileUrl,
        mimeType: uploadResponse.mimeType || file.type,
      },
      status: 'sending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    messages.value.push(tempMessage)
    nextTick(() => scrollToBottom())

    // 通过 WebSocket 发送文件消息
    wsService.sendFileMessage(conversationId.value, uploadResponse, tempId, chatUserId.value)
  } catch (error) {
    console.error('文件消息发送失败:', error)
    ElMessage.error(`文件发送失败: ${error instanceof Error ? error.message : '未知错误'}`)
    throw error
  }
}

// 处理输入变化
const handleInputChange = () => {
  if (isConnected.value) {
    wsService.sendTypingStatus(conversationId.value, true)

    clearTimeout(typingTimer.value)
    typingTimer.value = setTimeout(() => {
      if (isConnected.value) {
        wsService.sendTypingStatus(conversationId.value, false)
      }
    }, 1000) as unknown as number
  }
}

// 标记消息为已读
const markAsRead = () => {
  if (isConnected.value) {
    const unreadMessages = messages.value
      .filter(m => m.senderId !== currentUserId.value && m.status !== 'read')
      .map(m => String(m.id))

    if (unreadMessages.length > 0) {
      console.log('标记消息已读:', unreadMessages)
      wsService.sendReadStatus(conversationId.value, unreadMessages)
    }
  } else {
    console.warn('无法标记已读，WebSocket未连接')
  }
}

const getImageUrl = (message: any) => {
  if (message.fileInfo?.url) {
    return message.fileInfo.url
  }
  if (message.content?.startsWith('/chat/')) {
    return API_BASE_URL + message.content
  }
  if (message.content?.startsWith('http')) {
    return message.content
  }
  return message.content
}

const nextCursor = ref<string | undefined>(undefined)

function getLocalISOString() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const ms = String(date.getMilliseconds()).padStart(3, '0')
  return `${y}-${m}-${d}T${h}:${min}:${s}.${ms}Z`
}

const loadMessages = async (loadMore = false) => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const params: GetConversationHistoryRequest = {
      conversationId: conversationId.value,
    }

    if (loadMore) {
      if (nextCursor.value) {
        const cursor = nextCursor.value.replace(/([+-]\d{2}:\d{2}|Z)$/, '') + 'Z' // 确保格式正确
        console.log('加载更多消息，before:', cursor)
        params.before = cursor
      }
    } else {
      // 首次加载，使用当前时间
      nextCursor.value = getLocalISOString()
      params.before = nextCursor.value
      console.log('加载最新消息，before:', params.before)
    }

    const response = await chatAPI.getConversationHistory(params)

    // 格式化消息数据
    const formattedMessages = (response.data.messages || []).map(msg => {
      // 1. 优先使用后端的 type 字段
      let type = msg.type
      if (!type) {
        type = determineMessageType(msg.content)
      }

      // 2. 处理 fileInfo 字段
      let fileInfo = undefined
      if (type === 'file' && typeof msg.fileInfo === 'string') {
        try {
          fileInfo = JSON.parse(msg.fileInfo)
        } catch {
          fileInfo = undefined
        }
      } else if (type === 'file' && typeof msg.fileInfo === 'object') {
        fileInfo = msg.fileInfo
      } else if (type === 'image' && msg.content?.startsWith('/chat/')) {
        // 图片消息兼容
        fileInfo = {
          name: extractFileName(msg.content),
          url: API_BASE_URL + msg.content,
          size: 0,
          mimeType: getFileType(msg.content),
        }
      }

      return {
        ...msg,
        id: msg.id || `msg_${Date.now()}_${Math.random()}`,
        conversationId: conversationId.value,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content || '',
        type,
        fileInfo,
        createdAt: formatBackendTime(msg.createdAt),
        updatedAt: formatBackendTime(msg.updatedAt || msg.createdAt),
        status: msg.status,
      }
    })

    if (loadMore) {
      messages.value = [...formattedMessages, ...messages.value]
    } else {
      messages.value = formattedMessages
    }

    hasMore.value = response.data.hasMore
    nextCursor.value = response.data.nextCursor

    if (!loadMore) {
      scrollToBottom()
      nextTick(() => {
        checkAndLoadMore()
      })
    }

    console.log('加载历史消息:', messages.value.length, '条', '还有更多:', hasMore.value)
    console.log('格式化后的消息:', messages.value)
  } catch (error) {
    console.error('加载消息失败:', error)
    if (!loadMore) {
      messages.value = []
    }
  } finally {
    isLoading.value = false
  }
}

// 添加辅助函数
const determineMessageType = (content: string) => {
  if (!content) return 'text'
  if (content.startsWith('/chat/') && /\.(jpg|jpeg|png|gif|webp)$/i.test(content)) {
    return 'image'
  }
  if (content.startsWith('/chat/')) {
    return 'file'
  }
  return 'text'
}

// 检查并自动加载更多消息（如果内容不足以撑满页面）
const checkAndLoadMore = () => {
  if (messagesContainer.value && hasMore.value && !isLoading.value) {
    const { scrollHeight, clientHeight } = messagesContainer.value
    // 如果内容高度小于容器高度，说明没有滚动条，自动加载更多
    if (scrollHeight < clientHeight) {
      console.log('内容不足以滚动，自动加载更多消息')
      loadMessages(true)
    }
  }
}

const extractFileName = (filePath: string) => {
  const parts = filePath.split('/')
  return parts[parts.length - 1] || 'unknown'
}

const getFileType = (filePath: string) => {
  const ext = filePath.split('.').pop()?.toLowerCase()
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  if (imageExts.includes(ext || '')) {
    return `image/${ext === 'jpg' ? 'jpeg' : ext}`
  }
  return 'application/octet-stream'
}

const formatBackendTime = (timeStr: string) => {
  if (!timeStr) return getLocalDateTimeString(new Date())
  try {
    // 处理带时区的格式，如 "2025-06-29T16:13:16+08:00",去掉后面的时区

    // 如果是 "2025-06-29 11:56:22" 格式，直接转 Date
    if (timeStr.includes(' ') && !timeStr.includes('T')) {
      const date = new Date(timeStr.replace(' ', 'T'))
      return getLocalDateTimeString(date)
    }
    // 如果是 ISO 字符串但带 Z，去掉 Z
    if (timeStr.endsWith('Z')) {
      const date = new Date(timeStr)
      return getLocalDateTimeString(date)
    }
    // 其它情况直接 new Date
    const date = new Date(timeStr)
    return getLocalDateTimeString(date)
  } catch (error) {
    console.warn('时间格式转换失败:', timeStr)
    return getLocalDateTimeString(new Date())
  }
}

// 输出 "2025-06-29 14:15:58" 这种本地时间字符串
function getLocalDateTimeString(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

// 生命周期钩子
onMounted(async () => {
  console.log('Chat.vue 组件挂载')
  await initializeChat()
  scrollToBottom()
  nextTick(() => {
    markAsRead()
  })
    document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'

  window.addEventListener('dragover', handleDragOver)
  window.addEventListener('dragleave', handleDragLeave)
})

onUnmounted(() => {
  console.log('Chat.vue 组件卸载')
  window.removeEventListener('dragover', handleDragOver)
  window.removeEventListener('dragleave', handleDragLeave)

  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
  // 断开 WebSocket 连接
  wsService.disconnect()
})

// 监听路由变化，重新初始化聊天
watch(
  () => route.params.userId,
  newUserId => {
    if (newUserId) {
      console.log('路由变化，重新初始化聊天:', newUserId)
      initializeChat()
    }
  }
)

const getMessageSenderName = (message: any) => {
  if (!message) return '未知用户'
  if (message.senderId === currentUserId.value) {
    return currentUser.value?.name || '我'
  } else {
    return chatUser.value?.name || `用户${message.senderId}`
  }
}

const getLastSeenText = () => {
  if (!chatUser.value || !chatUser.value.lastSeen) {
    return '未知'
  }

  try {
    const lastSeen = new Date(chatUser.value.lastSeen)
    const diff = Date.now() - lastSeen.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 5) return '刚刚在线'
    if (minutes < 60) return `${minutes}分钟前在线`
    if (hours < 24) return `${hours}小时前在线`
    return `${days}天前在线`
  } catch (error) {
    return '未知'
  }
}

const handleShiftEnter = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const value = textarea.value

  messageInput.value = value.substring(0, start) + '\n' + value.substring(end)

  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 1
  })
}

const insertEmoji = (emoji: string) => {
  messageInput.value += emoji
}

const insertQuickPhrase = (phrase: string) => {
  if (messageInput.value) {
    messageInput.value += ' ' + phrase
  } else {
    messageInput.value = phrase
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  selectedFiles.value.push(...files)
  // 清空 input 以允许重复选择同一文件
  target.value = ''
}

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  selectedFiles.value.push(...files)
  // 清空 input 以允许重复选择同一文件
  target.value = ''
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  const files = Array.from(event.dataTransfer?.files || [])
  selectedFiles.value.push(...files)
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// 更新图片预览函数
const previewImage = (imageUrl: string) => {
  previewImageUrl.value = imageUrl
  showImagePreview.value = true
}

const downloadFile = (fileInfo: any) => {
  if (!fileInfo) {
    ElMessage.error('文件信息无效')
    return
  }
  // 兼容 fileInfo.url 和 fileInfo.fileUrl
  let url = fileInfo.url || fileInfo.fileUrl
  if (url && !/^https?:\/\//.test(url)) {
    url = API_BASE_URL + url
  }
  if (url) {
    const link = document.createElement('a')
    link.href = url
    link.download = fileInfo.name || fileInfo.fileName || '文件'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    ElMessage.error('文件地址无效')
  }
}

const avatarError = ref(new Set<string>())

const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const originalSrc = img.src

  if (avatarError.value.has(originalSrc)) {
    return
  }

  avatarError.value.add(originalSrc)
  img.src = getDefaultAvatar()
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  ElMessage.error('图片加载失败')
}

const getMessageAvatar = (message: any) => {
  if (!message) return getDefaultAvatar()

  if (message.senderId === currentUserId.value) {
    return currentUser.value?.avatar || currentUser.value?.imgUrl || getDefaultAvatar()
  } else {
    return getChatUserAvatar() || getDefaultAvatar()
  }
}

const getDefaultAvatar = () => {
  return '/default-avatar.png'
}

const goBack = () => {
  router.push('/messages')
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleScroll = () => {
  if (messagesContainer.value) {
    const { scrollTop } = messagesContainer.value
    if (scrollTop === 0 && !isLoading.value && hasMore.value) {
      loadMessages(true)
    }
  }
}

const formatMessageTime = (date: Date | string) => {
  if (!date) return ''
  let messageDate: Date
  try {
    messageDate = new Date(date)
    if (isNaN(messageDate.getTime())) return ''

    const now = new Date()
    const diff = now.getTime() - messageDate.getTime()

    // 如果 messageDate 在未来，或者 diff 超过一天，都直接格式化
    if (diff < 0 || diff >= 24 * 60 * 60 * 1000) {
      return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(messageDate)
    }

    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    // hours 一定在 1..23 之间
    return `${hours}小时前`
  } catch (error) {
    return ''
  }
}

const formatDateDivider = (dateString: string) => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

    if (date.toDateString() === today.toDateString()) {
      return '今天'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天'
    } else {
      return new Intl.DateTimeFormat('zh-CN', {
        month: 'long',
        day: 'numeric',
      }).format(date)
    }
  } catch (error) {
    return dateString
  }
}

const formatFileSize = (bytes: number) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}



const handleMoreAction = (command: string) => {
  switch (command) {
    case 'search':
      toggleSearch()
      break
    case 'darkMode':
      toggleDarkMode()
      break
    case 'profile':
      if (chatUser.value?.id) {
        router.push(`/user/${chatUser.value.id}`)
      }
      break
    case 'history':
      ElMessage.info('聊天记录功能开发中...')
      break
    case 'clear':
      ElMessage.info('清空聊天功能开发中...')
      break
    case 'block':
      ElMessage.info('屏蔽用户功能开发中...')
      break
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!isDragging.value) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  if (!event.relatedTarget) {
    isDragging.value = false
  }
}

watch(
  () => messages.value.length,
  () => {}
)
</script>
<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
.chat-wrapper {
  height: 94vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  margin: 0;
  background-color: #f3f4f6;
}

/* 确保没有额外的边距和填充 */
.chat-wrapper * {
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .max-w-4xl {
    max-width: 100%;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .max-w-xs {
    max-width: 16rem;
  }
}

/* 聊天气泡动画 */
.flex.justify-end .bg-indigo-500,
.flex.justify-start .bg-white {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 搜索高亮动画 */
.transition-all {
  transition: all 0.3s ease;
}

/* 标记样式 */
mark {
  padding: 1px 2px;
  border-radius: 2px;
}
</style>
