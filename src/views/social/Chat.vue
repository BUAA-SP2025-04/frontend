<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\social\Chat.vue -->
<template>
  <div class="h-screen bg-gray-100 flex justify-center">
    <!-- 聊天容器 - 限制最大宽度，居中显示 -->
    <div class="w-full max-w-4xl bg-white shadow-lg flex flex-col">
      <!-- 聊天头部 -->
      <div class="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div class="flex items-center space-x-3">
              <div class="relative">
                <img
                  :src="chatUser?.avatar || getDefaultAvatar()"
                  :alt="chatUser?.name || '用户'"
                  class="w-10 h-10 rounded-full object-cover"
                  @error="handleAvatarError"
                />
                <div
                  v-if="chatUser?.isOnline"
                  class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                ></div>
              </div>

              <div>
                <h2 class="text-lg font-semibold text-gray-900">
                  {{ chatUser?.name || '加载中...' }}
                </h2>
                <p class="text-sm text-gray-500">
                  {{ chatUser?.isOnline ? (isTyping ? '正在输入...' : '在线') : getLastSeenText() }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <!-- 连接状态指示器 -->
            <div class="flex items-center space-x-2">
              <div
                :class="['w-2 h-2 rounded-full', isConnected ? 'bg-green-500' : 'bg-red-500']"
                :title="isConnected ? '已连接' : '连接断开'"
              ></div>
            </div>

            <!-- 语音通话 -->
            <button
              @click="startVoiceCall"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="语音通话"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>

            <!-- 视频通话 -->
            <button
              @click="startVideoCall"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="视频通话"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>

            <!-- 更多选项 -->
            <el-dropdown trigger="click" @command="handleMoreAction">
              <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600"
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
                  <el-dropdown-item command="profile">查看资料</el-dropdown-item>
                  <el-dropdown-item command="history">聊天记录</el-dropdown-item>
                  <el-dropdown-item command="clear">清空聊天</el-dropdown-item>
                  <el-dropdown-item command="block" divided>屏蔽用户</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>

      <!-- 连接状态提示 -->
      <div
        v-if="!isConnected && !isInitializing"
        class="bg-yellow-50 border-b border-yellow-200 px-6 py-2"
      >
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 text-yellow-600"
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
          <span class="text-sm text-yellow-700">连接异常，部分功能可能不可用。正在尝试重连...</span>
        </div>
      </div>

      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-hidden flex bg-gray-50">
        <!-- 消息列表 -->
        <div class="flex-1 flex flex-col">
          <div
            ref="messagesContainer"
            class="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            @scroll="handleScroll"
          >
            <!-- 加载更多指示器 -->
            <div v-if="isLoading" class="text-center py-4">
              <el-spin size="small" />
              <span class="ml-2 text-sm text-gray-500">加载更多消息...</span>
            </div>

            <!-- 初始化加载状态 -->
            <div v-if="isInitializing" class="text-center py-12">
              <el-spin size="large" />
              <p class="mt-4 text-gray-500">正在初始化聊天...</p>
            </div>

            <!-- 日期分割线和消息 -->
            <div v-else-if="Object.keys(groupedMessages).length > 0">
              <div v-for="(group, date) in groupedMessages" :key="date">
                <div class="flex justify-center my-4">
                  <span class="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {{ formatDateDivider(String(date)) }}
                  </span>
                </div>

                <!-- 消息列表 -->
                <div
                  v-for="message in group"
                  :key="message.id"
                  :class="[
                    'flex mb-4',
                    message.senderId === currentUserId ? 'justify-end' : 'justify-start',
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
                          'px-4 py-2 rounded-lg max-w-full break-words',
                          message.senderId === currentUserId
                            ? 'bg-indigo-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm',
                        ]"
                      >
                        <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
                      </div>

                      <!-- 图片消息 -->
                      <div
                        v-else-if="message.type === 'image'"
                        class="rounded-lg overflow-hidden cursor-pointer shadow-sm"
                        @click="previewImage(message.content)"
                      >
                        <img
                          :src="message.content"
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
                          'p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors shadow-sm',
                          message.senderId === currentUserId
                            ? 'bg-indigo-50 border-indigo-200'
                            : 'bg-white border-gray-200',
                        ]"
                        @click="downloadFile(message.fileInfo)"
                      >
                        <div class="flex items-center space-x-3">
                          <div
                            class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
                          >
                            <svg
                              class="w-5 h-5 text-gray-600"
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
                            <p class="text-sm font-medium text-gray-900 truncate">
                              {{ message.fileInfo?.name || '未知文件' }}
                            </p>
                            <p class="text-xs text-gray-500">
                              {{ formatFileSize(message.fileInfo?.size || 0) }}
                            </p>
                          </div>
                          <svg
                            class="w-4 h-4 text-gray-400"
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
                        class="text-center text-xs text-gray-500 py-2"
                      >
                        {{ message.content }}
                      </div>

                      <!-- 消息时间和状态 -->
                      <div
                        v-if="message.type !== 'system'"
                        :class="[
                          'flex items-center text-xs text-gray-500 mt-1 space-x-1',
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
                class="w-16 h-16 mx-auto text-gray-400 mb-4"
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
              <h3 class="text-lg font-medium text-gray-900 mb-2">开始对话</h3>
              <p class="text-gray-500">发送消息开始您的第一次对话</p>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <!-- 文件拖拽区域 -->
            <div
              v-if="isDragging"
              class="absolute inset-0 bg-indigo-50 bg-opacity-90 flex items-center justify-center z-50 border-2 border-dashed border-indigo-300"
              @drop="handleFileDrop"
              @dragover.prevent
              @dragleave="isDragging = false"
            >
              <div class="text-center">
                <svg
                  class="w-16 h-16 mx-auto text-indigo-400 mb-4"
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
                <p class="text-lg font-medium text-indigo-600">拖拽文件到这里发送</p>
                <p class="text-sm text-gray-500">支持图片、文档等文件类型</p>
              </div>
            </div>

            <!-- 工具栏和输入框 -->
            <div class="space-y-3">
              <!-- 工具栏 -->
              <div class="flex items-center space-x-2">
                <!-- 表情 -->
                <el-popover placement="top-start" :width="320" trigger="click">
                  <template #reference>
                    <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-600"
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
                      class="w-8 h-8 text-lg hover:bg-gray-100 rounded transition-colors"
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
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
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
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
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
                    <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-600"
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
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
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
                  class="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                >
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                      <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                    </div>
                  </div>

                  <button
                    @click="removeFile(index)"
                    class="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-600"
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { wsService } from '@/utils/websocketChat'
import { uploadFile } from '@/utils/fileUpload'
import { chatAPI } from '@/api/modules/chat'

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
    chatUser.value = response.user
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
  ElMessage.success('连接成功')
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

const handleReadStatus = (data: any) => {
  console.log('已读状态事件:', data)
  if (data.conversationId === conversationId.value) {
    const convMessages = messages.value.filter(m => m.conversationId === data.conversationId)
    convMessages.forEach(msg => {
      if (data.messageIds.includes(msg.id) && msg.senderId === currentUserId.value) {
        msg.status = 'read'
      }
    })
  }
}

const handleUserStatus = (data: any) => {
  console.log('用户状态变化事件:', data)
  if (chatUser.value && chatUser.value.id === data.userId) {
    chatUser.value.isOnline = data.isOnline
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

    // 上传文件
    const uploadResponse = await uploadFile(file)
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
        name: uploadResponse.fileName,
        size: uploadResponse.fileSize,
        url: uploadResponse.fileUrl,
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
      .map(m => m.id)

    if (unreadMessages.length > 0) {
      wsService.sendReadStatus(conversationId.value, unreadMessages)
    }
  }
}

// 加载历史消息
const loadMessages = async (loadMore = false) => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const response = await chatAPI.getConversationHistory({
      conversationId: conversationId.value,
      page: loadMore ? Math.floor(messages.value.length / 20) + 1 : 1,
      size: 20,
    })

    if (loadMore) {
      messages.value = [...response.messages, ...messages.value]
    } else {
      messages.value = response.messages || []
    }

    hasMore.value = response.hasMore
    console.log('加载历史消息:', messages.value.length, '条')
  } catch (error) {
    console.error('加载消息失败:', error)
    // ElMessage.error('加载消息失败')
    // 静默处理，因为可能是首次聊天没有历史消息
    messages.value = []
  } finally {
    isLoading.value = false
  }
}

// 播放提示音
const playNotificationSound = () => {
  try {
    const audio = new Audio()
    audio.src =
      'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjeN1O/MeiMGI3vD8OGOQQIUXrTp66hVFApGn+DyvmwhBjeN1O/MeiMGI3vD8OGOQQIUXrTp66hVFApGn+DyvmwhBjaLy/DJciMFImY='
    audio.play().catch(() => {
      // 静默处理，某些浏览器不允许自动播放
    })
  } catch (error) {
    // 静默处理
  }
}

// 生命周期钩子
onMounted(async () => {
  console.log('Chat.vue 组件挂载')
  await initializeChat()
  scrollToBottom()

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

// 其他方法保持不变...
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

const previewImage = (imageUrl: string) => {
  previewImageUrl.value = imageUrl
  showImagePreview.value = true
}

const downloadFile = (fileInfo: any) => {
  if (fileInfo?.url) {
    const link = document.createElement('a')
    link.href = fileInfo.url
    link.download = fileInfo.name || '文件'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    return chatUser.value?.avatar || getDefaultAvatar()
  }
}

const getDefaultAvatar = () => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzIgMzJDMzIgMjYuNDc3MiAyNy41MjI4IDIyIDIySDE4QzEyLjQ3NzIgMjIgOCAyNi40NzcyIDggMzJWMzJIMzJWMzJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='
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

  try {
    const messageDate = new Date(date)
    const now = new Date()
    const diff = now.getTime() - messageDate.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`

    return new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(messageDate)
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

const startVoiceCall = () => {
  ElMessage.info('语音通话功能开发中...')
}

const startVideoCall = () => {
  ElMessage.info('视频通话功能开发中...')
}

const handleMoreAction = (command: string) => {
  switch (command) {
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
  () => {
    nextTick(() => scrollToBottom())
  }
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
</style>
