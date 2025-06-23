<template>
  <div class="h-screen bg-gray-100 flex flex-col">
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
                :src="chatUser.avatar"
                :alt="chatUser.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                v-if="chatUser.isOnline"
                class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
              ></div>
            </div>

            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ chatUser.name }}</h2>
              <p class="text-sm text-gray-500">
                {{
                  chatUser.isOnline
                    ? chatUser.isTyping
                      ? '正在输入...'
                      : '在线'
                    : getLastSeenText()
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2">
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

    <!-- 聊天消息区域 -->
    <div class="flex-1 overflow-hidden flex">
      <!-- 消息列表 -->
      <div class="flex-1 flex flex-col">
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          @scroll="handleScroll"
        >
          <!-- 加载更多指示器 -->
          <div v-if="loadingMore" class="text-center py-4">
            <el-spin size="small" />
            <span class="ml-2 text-sm text-gray-500">加载更多消息...</span>
          </div>

          <!-- 日期分割线 -->
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
                'flex',
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
                  :src="message.senderId === currentUserId ? currentUser.avatar : chatUser.avatar"
                  :alt="message.senderId === currentUserId ? currentUser.name : chatUser.name"
                  class="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  :class="message.senderId === currentUserId ? 'ml-2' : 'mr-2'"
                />

                <!-- 消息气泡 -->
                <div class="flex flex-col">
                  <!-- 文本消息 -->
                  <div
                    v-if="message.type === 'text'"
                    :class="[
                      'px-4 py-2 rounded-lg max-w-full break-words',
                      message.senderId === currentUserId
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200',
                    ]"
                  >
                    <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
                  </div>

                  <!-- 图片消息 -->
                  <div
                    v-else-if="message.type === 'image'"
                    class="rounded-lg overflow-hidden cursor-pointer"
                    @click="previewImage(message.content)"
                  >
                    <img
                      :src="message.content"
                      alt="图片"
                      class="max-w-full h-auto max-h-64 object-cover"
                      loading="lazy"
                    />
                  </div>

                  <!-- 文件消息 -->
                  <div
                    v-else-if="message.type === 'file'"
                    :class="[
                      'p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors',
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
                        <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">
                          {{ message.fileInfo.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ formatFileSize(message.fileInfo.size) }}
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
                        class="w-3 h-3 text-gray-400 animate-spin"
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
                        class="w-3 h-3 text-gray-400"
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
                      <div v-else-if="message.status === 'read'" class="flex">
                        <svg class="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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

          <!-- 工具栏 -->
          <div class="flex items-center space-x-2 mb-3">
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
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.shift.enter.exact="handleShiftEnter"
                @input="handleInputChange"
                @focus="markAsRead"
              />
            </div>

            <el-button
              type="primary"
              :disabled="!messageInput.trim() && !selectedFiles.length"
              @click="sendMessage"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div v-if="selectedFiles.length > 0" class="mt-3 space-y-2">
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

    <!-- 图片预览对话框 -->
    <el-dialog v-model="showImagePreview" width="80%" center>
      <img :src="previewImageUrl" class="w-full h-auto" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 响应式数据
const messagesContainer = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const imageInput = ref<HTMLInputElement>()
const messageInput = ref('')
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const loadingMore = ref(false)
const showImagePreview = ref(false)
const previewImageUrl = ref('')
const isTyping = ref(false)
const typingTimer = ref<number>()

const currentUserId = ref(1) // 当前用户ID
const chatUserId = computed(() => parseInt(route.params.userId as string))

// 当前用户信息
const currentUser = reactive({
  id: 1,
  name: '李明',
  avatar: 'https://via.placeholder.com/100',
})

// 聊天对象信息
const chatUser = reactive({
  id: 2,
  name: '王芳',
  avatar: 'https://via.placeholder.com/100',
  institution: '北京大学',
  isOnline: true,
  isTyping: false,
  lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
})

// 消息列表
const messages = ref([
  {
    id: 1,
    senderId: 2,
    type: 'text',
    content: '您好，我对您最近发表的论文很感兴趣',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'read',
  },
  {
    id: 2,
    senderId: 1,
    type: 'text',
    content: '谢谢您的关注！有什么具体想了解的吗？',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    status: 'read',
  },
  {
    id: 3,
    senderId: 2,
    type: 'text',
    content: '主要想了解一下关于深度学习在生物信息学应用方面的细节，以及是否有合作的可能性。',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    status: 'read',
  },
  {
    id: 4,
    senderId: 1,
    type: 'file',
    content: 'research-proposal.pdf',
    fileInfo: {
      name: 'research-proposal.pdf',
      size: 2048576,
      url: 'https://example.com/files/research-proposal.pdf',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    status: 'sent',
  },
])

// 常用表情
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

// 快捷短语
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

// 计算属性
const groupedMessages = computed(() => {
  const groups: { [key: string]: any[] } = {}

  messages.value.forEach(message => {
    const dateKey = new Date(message.createdAt).toDateString()
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(message)
  })

  return groups
})

// 方法
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
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
    // 检查是否滚动到顶部，加载更多历史消息
    if (scrollTop === 0 && !loadingMore.value) {
      loadMoreMessages()
    }
  }
}

const loadMoreMessages = async () => {
  loadingMore.value = true
  try {
    // 模拟加载更多消息
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 这里应该从API加载更多历史消息
    ElMessage.info('已加载全部历史消息')
  } catch (error) {
    ElMessage.error('加载消息失败')
  } finally {
    loadingMore.value = false
  }
}

const sendMessage = async () => {
  if (!messageInput.value.trim() && selectedFiles.value.length === 0) return

  try {
    // 发送文本消息
    if (messageInput.value.trim()) {
      const textMessage = {
        id: Date.now(),
        senderId: currentUserId.value,
        type: 'text',
        content: messageInput.value.trim(),
        createdAt: new Date(),
        status: 'sending',
      }

      messages.value.push(textMessage)
      messageInput.value = ''
      scrollToBottom()

      // 模拟发送API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      textMessage.status = 'sent'

      // 模拟对方已读
      setTimeout(() => {
        textMessage.status = 'read'
      }, 2000)
    }

    // 发送文件消息
    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        const fileMessage = {
          id: Date.now() + Math.random(),
          senderId: currentUserId.value,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          content: file.type.startsWith('image/') ? URL.createObjectURL(file) : file.name,
          fileInfo: {
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
          },
          createdAt: new Date(),
          status: 'sending',
        }

        messages.value.push(fileMessage)

        // 模拟上传和发送
        await new Promise(resolve => setTimeout(resolve, 1000))
        fileMessage.status = 'sent'
      }

      selectedFiles.value = []
      scrollToBottom()
    }
  } catch (error) {
    ElMessage.error('发送失败，请重试')
  }
}

const handleShiftEnter = (event: KeyboardEvent) => {
  // Shift+Enter 换行
  const textarea = event.target as HTMLTextAreaElement
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const value = textarea.value

  messageInput.value = value.substring(0, start) + '\n' + value.substring(end)

  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 1
  })
}

const handleInputChange = () => {
  // 处理输入变化，发送正在输入状态
  if (!isTyping.value) {
    isTyping.value = true
    // 发送正在输入状态到服务器
  }

  clearTimeout(typingTimer.value)
  typingTimer.value = setTimeout(() => {
    isTyping.value = false
    // 发送停止输入状态到服务器
  }, 1000) as unknown as number
}

const markAsRead = () => {
  // 标记消息为已读
  messages.value.forEach(message => {
    if (message.senderId !== currentUserId.value && message.status !== 'read') {
      message.status = 'read'
    }
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
}

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  selectedFiles.value.push(...files)
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
  // 下载文件
  const link = document.createElement('a')
  link.href = fileInfo.url
  link.download = fileInfo.name
  link.click()
}

const formatMessageTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`

  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const formatDateDivider = (dateString: string) => {
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
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const getLastSeenText = () => {
  const diff = Date.now() - chatUser.lastSeen.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 5) return '刚刚在线'
  if (minutes < 60) return `${minutes}分钟前在线`
  if (hours < 24) return `${hours}小时前在线`
  return `${days}天前在线`
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
      router.push(`/user/${chatUser.id}`)
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

// 拖拽事件监听
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!isDragging.value) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  // 只有当拖拽完全离开窗口时才隐藏拖拽区域
  if (!event.relatedTarget) {
    isDragging.value = false
  }
}

onMounted(() => {
  // 滚动到底部显示最新消息
  scrollToBottom()

  // 添加拖拽事件监听
  window.addEventListener('dragover', handleDragOver)
  window.addEventListener('dragleave', handleDragLeave)

  // 模拟实时消息接收
  // 这里可以建立WebSocket连接

  // 获取聊天用户信息
  // 这里应该根据路由参数获取用户信息
})

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('dragover', handleDragOver)
  window.removeEventListener('dragleave', handleDragLeave)

  // 清理定时器
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
})

// 监听消息变化，自动滚动到底部
watch(
  () => messages.value.length,
  () => {
    scrollToBottom()
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
</style>
