<template>
  <div
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-indigo-600"
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
            消息中心
          </h1>
          <p class="text-gray-600 mt-2">管理您的私信、系统通知和动态提醒</p>
        </div>
        <el-button @click="openSettingsDialog">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          消息设置
        </el-button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 左侧消息分类 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">消息分类</h3>
            <nav class="space-y-2">
              <button
                v-for="category in messageCategories"
                :key="category.id"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors',
                  activeCategory === category.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="setActiveCategory(category.id)"
              >
                <div class="flex items-center">
                  <component :is="category.icon" class="w-5 h-5 mr-3" />
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <span
                  v-if="
                    category.unreadCount > 0 &&
                    ((category.id === 'chat' && messageSettings.newMessage) ||
                      (category.id === 'system' && messageSettings.systemNotice) ||
                      (category.id === 'activity' && messageSettings.followActivity))
                  "
                  class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                >
                  {{ category.unreadCount > 99 ? '99+' : category.unreadCount }}
                </span>
              </button>
            </nav>
            <!-- 全部好友 -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">好友列表</h4>
              <div class="space-y-2">
                <div
                  v-for="friend in allFriends"
                  :key="friend.id"
                  class="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="startChat(friend.id)"
                >
                  <div class="relative">
                    <img
                      :src="friend.avatar"
                      :alt="friend.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div
                      v-if="friend.status === '在线'"
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                    <div
                      v-else
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ friend.name }}</p>
                    <p
                      :class="[
                        'text-xs truncate',
                        friend.status === '在线' ? 'text-green-600' : 'text-gray-500',
                      ]"
                    >
                      {{ friend.status }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="allFriends.length === 0" class="text-center py-4 text-gray-500 text-sm">
                暂无好友
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧消息列表 -->
        <div class="lg:col-span-3">
          <!-- 搜索栏 -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索消息内容、发送者..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <el-select
                v-model="messageFilter"
                placeholder="消息类型"
                size="large"
                style="width: 150px"
              >
                <el-option label="全部" value="all" />
                <el-option label="未读" value="unread" />
                <el-option label="已读" value="read" />
              </el-select>
              <el-button @click="markAllAsRead" :disabled="!hasUnreadMessages"
                >全部标记为已读</el-button
              >
            </div>
          </div>

          <!-- 消息列表 -->
          <div class="bg-white rounded-lg shadow">
            <!-- 私信列表 -->
            <div v-if="activeCategory === 'chat'" class="divide-y divide-gray-200">
              <div
                v-for="conversation in filteredConversations"
                :key="conversation.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors relative',
                  !conversation.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]"
                @click="openChat(conversation.userId)"
              >
                <!-- 未读标记小图标 -->
                <button
                  v-if="!conversation.isRead"
                  @click.stop="markAsReadLocal('conversation', conversation.conversationId)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>

                <div class="flex items-start space-x-4 pr-8">
                  <div class="relative flex-shrink-0">
                    <img
                      :src="conversation.avatar"
                      :alt="conversation.name"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      v-if="conversation.online"
                      class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-medium text-gray-900">{{ conversation.name }}</h3>
                      <div class="flex items-center space-x-2">
                        <!-- 未读数量徽章 -->
                        <span
                          v-if="conversation.unreadCount > 0"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white"
                        >
                          {{ conversation.unreadCount > 99 ? '99+' : conversation.unreadCount }}
                        </span>
                        <span class="text-xs text-gray-500">{{
                          formatTime(conversation.lastMessageTime)
                        }}</span>
                      </div>
                    </div>

                    <!-- 消息内容预览 - 更紧凑的布局 -->
                    <div class="flex items-start space-x-2">
                      <!-- 消息类型图标 -->
                      <div class="flex-shrink-0 mt-0.5">
                        <!-- 文件类型图标 -->
                        <div
                          v-if="conversation.lastMessage.type === 'file'"
                          class="flex items-center justify-center w-5 h-5 bg-orange-100 rounded"
                        >
                          <svg
                            class="w-3 h-3 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>

                        <!-- 图片类型图标 -->
                        <div
                          v-else-if="conversation.lastMessage.type === 'image'"
                          class="flex items-center justify-center w-5 h-5 bg-green-100 rounded"
                        >
                          <svg
                            class="w-3 h-3 text-green-600"
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
                        </div>

                        <!-- 文本消息图标 -->
                        <div
                          v-else
                          class="flex items-center justify-center w-5 h-5 bg-blue-100 rounded"
                        >
                          <svg
                            class="w-3 h-3 text-blue-600"
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
                        </div>
                      </div>

                      <!-- 消息内容文本 -->
                      <p class="text-sm text-gray-600 line-clamp-2 flex-1 min-w-0 mt-1">
                        {{ getLastMessagePreview(conversation.lastMessage) }}
                      </p>
                    </div>

                    <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span>{{ conversation.institution }}</span>
                      <!-- 在线状态 -->
                      <span
                        v-if="conversation.online"
                        class="flex items-center space-x-1 text-green-600"
                      >
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>在线</span>
                      </span>
                      <span v-else class="text-gray-400">离线</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 系统通知列表 -->
            <div v-else-if="activeCategory === 'system'" class="divide-y divide-gray-200">
              <div
                v-for="notification in filteredSystemNotifications"
                :key="notification.id"
                :class="[
                  'p-6 hover:bg-gray-50 transition-colors relative',
                  !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]"
              >
                <!-- 未读标记小图标 -->
                <button
                  v-if="!notification.isRead"
                  @click.stop="markAsReadLocal('system', notification.id)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>

                <div class="flex items-start space-x-4 pr-8">
                  <div
                    :class="[
                      'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm',
                      getNotificationIconColor(notification.type),
                    ]"
                  >
                    <component :is="getNotificationIcon(notification.type)" class="w-6 h-6" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1 mr-4">
                        <h3 class="text-base font-semibold text-gray-900 mb-1">
                          {{ notification.title }}
                        </h3>
                        <span
                          :class="[
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                            getNotificationTypeColor(notification.type),
                          ]"
                        >
                          {{ getNotificationTypeLabel(notification.type) }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500 whitespace-nowrap">{{
                        formatTime(notification.createdAt)
                      }}</span>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed mb-3">
                      {{ notification.content }}
                    </p>
                    <div v-if="notification.action" class="flex items-center space-x-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 动态提醒列表 -->
            <div v-else-if="activeCategory === 'activity'" class="divide-y divide-gray-200">
              <div
                v-for="activity in filteredActivityNotifications"
                :key="activity.id"
                :class="[
                  'p-6 hover:bg-gray-50 cursor-pointer transition-colors relative',
                  !activity.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : '',
                ]"
                @click="handleActivityClick(activity)"
              >
                <!-- 未读标记小图标 -->
                <button
                  v-if="!activity.isRead"
                  @click.stop="markAsReadLocal('activity', activity.id)"
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="标记为已读"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>

                <div class="flex items-start space-x-4 pr-8">
                  <img
                    :src="activity.user.avatar"
                    :alt="activity.user.name"
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <!-- 🔥 优化后的标题区域 -->
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <span class="font-medium text-gray-900">{{ activity.user.name }}</span>
                        <span
                          :class="[
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                            getActivityTagColor(activity.type),
                          ]"
                        >
                          {{ getActivityLabel(activity.type) }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500 whitespace-nowrap">{{
                        formatTime(activity.createdAt)
                      }}</span>
                    </div>

                    <!-- 🔥 简化后的内容区域 - 保持原有显示 -->
                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                      {{
                        typeof activity.content === 'object' && activity.content !== null
                          ? activity.content.description
                          : activity.content
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="filteredMessages.length === 0" class="p-12 text-center">
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">暂无消息</h3>
              <p class="text-gray-500">{{ getEmptyStateText() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 消息设置对话框 -->
      <el-dialog v-model="showSettingsDialog" title="消息设置" width="50%">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">通知设置</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">新私信通知</h4>
                  <p class="text-sm text-gray-500">收到新私信时显示通知</p>
                </div>
                <el-switch v-model="messageSettings.newMessage" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">关注动态提醒</h4>
                  <p class="text-sm text-gray-500">关注的人发布新动态时通知</p>
                </div>
                <el-switch v-model="messageSettings.followActivity" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">系统通知</h4>
                  <p class="text-sm text-gray-500">接收系统重要通知</p>
                </div>
                <el-switch v-model="messageSettings.systemNotice" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                  <p class="text-sm text-gray-500">通过邮件接收重要消息</p>
                </div>
                <el-switch v-model="messageSettings.emailNotification" />
              </div>
            </div>
          </div>
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">隐私设置</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">允许陌生人发送私信</h4>
                  <p class="text-sm text-gray-500">未关注的用户也可以向您发送私信</p>
                </div>
                <el-switch v-model="messageSettings.allowStrangerMessage" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">显示在线状态</h4>
                  <p class="text-sm text-gray-500">让其他用户看到您的在线状态</p>
                </div>
                <el-switch v-model="messageSettings.showOnlineStatus" />
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showSettingsDialog = false">取消</el-button>
            <el-button type="primary" @click="saveSettings">保存设置</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { messagesAPI } from '@/api/modules/messages'
import { useNotificationStore } from '@/stores/notification'
import { chatAPI } from '@/api/modules/chat'
import { useUserStore } from '@/stores/user'
import type {
  ActivityNotification,
  Conversation,
  Friend,
  MessageSettings,
  SystemNotification,
} from '@/api/types/messages'

const router = useRouter()

const notificationStore = useNotificationStore()

const userStore = useUserStore()

// 在其他计算属性附近添加
const currentUserId = computed(() => {
  const userId = userStore.user?.id
  return typeof userId === 'string' ? parseInt(userId) : userId || 1
})

// 图标组件
const ChatIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    }),
  ])
const BellIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M15 17h5l-5 5v-5z',
    }),
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M4 5h12a2 2 0 012 2v8.586l-3-3H4a2 2 0 01-2-2V7a2 2 0 012-2z',
    }),
  ])
const ActivityIcon = () =>
  h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M13 10V3L4 14h7v7l9-11h-7z',
    }),
  ])

// 响应式数据
const activeCategory = ref('chat')
const searchQuery = ref('')
const messageFilter = ref('all')
const showSettingsDialog = ref(false)

// 数据
const conversations = ref<Conversation[]>([])
const systemNotifications = ref<SystemNotification[]>([])
const activityNotifications = ref<ActivityNotification[]>([])
const allFriends = ref<Friend[]>([])

// 消息分类
const messageCategories = ref([
  { id: 'chat', name: '私信', icon: ChatIcon, unreadCount: 0 },
  { id: 'system', name: '系统通知', icon: BellIcon, unreadCount: 0 },
  { id: 'activity', name: '动态提醒', icon: ActivityIcon, unreadCount: 0 },
])

// 设置
const messageSettings = reactive<MessageSettings>({
  newMessage: true,
  followActivity: true,
  systemNotice: true,
  emailNotification: false,
  allowStrangerMessage: true,
  showOnlineStatus: true,
})

// 计算属性
const filteredConversations = computed(() => {
  let filtered = conversations.value

  // 根据设置决定是否显示私信
  if (!messageSettings.newMessage) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(
      conv =>
        conv.name.includes(searchQuery.value) ||
        conv.lastMessage.content.includes(searchQuery.value)
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(conv => !conv.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(conv => conv.isRead)
  }

  return filtered
})

const filteredSystemNotifications = computed(() => {
  let filtered = systemNotifications.value

  // 根据设置决定是否显示系统通知
  if (!messageSettings.systemNotice) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(
      notif => notif.title.includes(searchQuery.value) || notif.content.includes(searchQuery.value)
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(notif => !notif.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(notif => notif.isRead)
  }

  return filtered
})

const filteredActivityNotifications = computed(() => {
  let filtered = activityNotifications.value

  // 根据设置决定是否显示动态提醒
  if (!messageSettings.followActivity) {
    filtered = []
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(
      activity =>
        activity.user.name.includes(searchQuery.value) ||
        (typeof activity.content === 'object' &&
          activity.content !== null &&
          activity.content.title.includes(searchQuery.value)) ||
        (typeof activity.content === 'object' &&
          activity.content !== null &&
          activity.content.description.includes(searchQuery.value))
    )
  }

  // 状态过滤
  if (messageFilter.value === 'unread') {
    filtered = filtered.filter(activity => !activity.isRead)
  } else if (messageFilter.value === 'read') {
    filtered = filtered.filter(activity => activity.isRead)
  }

  return filtered
})

const filteredMessages = computed(() => {
  switch (activeCategory.value) {
    case 'chat':
      return filteredConversations.value
    case 'system':
      return filteredSystemNotifications.value
    case 'activity':
      return filteredActivityNotifications.value
    default:
      return []
  }
})

const hasUnreadMessages = computed(() => {
  return messageCategories.value.some(cat => cat.unreadCount > 0)
})

// 方法
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  // 切换分类时立即加载对应数据
  loadCurrentCategory()
}

const startChat = async (userId: number) => {
  // 生成标准格式的 conversationId
  const myId = currentUserId.value
  const conversationId = `conv_${Math.min(myId, userId)}_${Math.max(myId, userId)}`

  // 检查是否已经存在该会话
  const existingConversation = conversations.value.find(
    conv => conv.conversationId === conversationId
  )

  if (existingConversation) {
    // 已有会话，直接跳转
    router.push(`/chat/${userId}`)
  } else {
    try {
      // 创建新会话
      const response = await chatAPI.createConversation({ participantId: userId })
      // 跳转到聊天页面
      router.push(`/chat/${userId}`)
      // 可选：更新本地会话列表
    } catch (error) {
      console.error('创建对话失败:', error)
      ElMessage.error('无法开始聊天，请重试')
    }
  }
}

const openChat = (userId: number) => {
  router.push(`/chat/${userId}`)
}

// 前端直接标记全部已读，减少后端请求
const markAllAsRead = async () => {
  try {
    // 统一传参格式
    let apiCategory = activeCategory.value
    if (activeCategory.value === 'chat' || activeCategory.value === 'conversation') {
      apiCategory = 'conversation'
    }

    await messagesAPI.markAllAsRead(apiCategory)
    ElMessage.success('已全部标记为已读')
    await notificationStore.clearNotifications()

    // 前端直接更新状态，避免重新请求
    updateAllAsRead()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 前端直接标记单条已读，减少后端请求
const markAsReadLocal = async (category: string, id: string | number) => {
  try {
    // 统一传参格式
    if (category === 'system' || category === 'activity') {
      // 🔥 只调用状态管理，不再调用messagesAPI.markAsRead
      // 确保传递给 store 的是正确的类型
      const numericId = typeof id === 'string' ? parseInt(id) : id
      await notificationStore.markNotificationAsRead(category, numericId)
    } else if (category === 'chat' || category === 'conversation') {
      // 私信仍然调用原有逻辑
      // conversationId 可能是字符串，保持原样传递
      await messagesAPI.markAsRead('conversation', id)
    }
    ElMessage.success('已标记为已读')

    // 前端直接更新状态，避免重新请求
    updateSingleAsRead(category, id)
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 前端更新全部已读状态
const updateAllAsRead = () => {
  if (activeCategory.value === 'chat') {
    conversations.value = conversations.value.map(conv => ({
      ...conv,
      isRead: true,
      unreadCount: 0,
    }))
    messageCategories.value[0].unreadCount = 0
  } else if (activeCategory.value === 'system') {
    systemNotifications.value = systemNotifications.value.map(notif => ({ ...notif, isRead: true }))
    messageCategories.value[1].unreadCount = 0
  } else if (activeCategory.value === 'activity') {
    activityNotifications.value = activityNotifications.value.map(activity => ({
      ...activity,
      isRead: true,
    }))
    messageCategories.value[2].unreadCount = 0
  }
}

// 前端更新单条已读状态
const updateSingleAsRead = (category: string, id: number | string) => {
  if (category === 'chat' || category === 'conversation') {
    // 对于会话，id 可能是数字或字符串，需要灵活匹配
    const convIndex = conversations.value.findIndex(
      conv => conv.id == id || conv.conversationId == id
    )
    if (convIndex !== -1) {
      // 记录当前未读数
      const unread = conversations.value[convIndex].unreadCount || 0
      conversations.value[convIndex].isRead = true
      conversations.value[convIndex].unreadCount = 0
      // 总未读数减去本会话未读数
      messageCategories.value[0].unreadCount = Math.max(
        0,
        messageCategories.value[0].unreadCount - unread
      )
    }
  } else if (category === 'system') {
    const notifIndex = systemNotifications.value.findIndex(notif => notif.id === id)
    if (notifIndex !== -1) {
      systemNotifications.value[notifIndex].isRead = true
      messageCategories.value[1].unreadCount = Math.max(
        0,
        messageCategories.value[1].unreadCount - 1
      )
    }
  } else if (category === 'activity') {
    const activityIndex = activityNotifications.value.findIndex(activity => activity.id === id)
    if (activityIndex !== -1) {
      activityNotifications.value[activityIndex].isRead = true
      messageCategories.value[2].unreadCount = Math.max(
        0,
        messageCategories.value[2].unreadCount - 1
      )
    }
  }
}

const getLastMessagePreview = (lastMessage: any) => {
  // 如果没有lastMessage对象，显示暂无消息
  if (!lastMessage) {
    return '暂无消息'
  }

  const { type, content, isMe } = lastMessage

  switch (type) {
    case 'image':
      // 图片消息：根据发送者显示不同提示
      if (isMe) {
        return '你发送了一张图片'
      } else {
        return '收到了新图片'
      }
    case 'file':
      // 文件消息：根据发送者和文件名显示不同提示
      if (content && content.trim() && content.includes('.')) {
        // 有文件名的情况
        if (isMe) {
          return `你发送了文件: ${content}`
        } else {
          return `收到了新文件: ${content}`
        }
      } else {
        // 没有文件名的情况
        if (isMe) {
          return '你发送了一个文件'
        } else {
          return '收到了新文件'
        }
      }
    case 'text':
    default:
      // 文本消息：如果content为空，显示特殊提示
      if (!content || !content.trim()) {
        if (isMe) {
          return ' '
        } else {
          return ' '
        }
      }
      // 有文本内容时正常显示，添加发送者前缀
      const prefix = isMe ? '你: ' : ''
      return `${prefix}${content}`
  }
}

const handleActivityClick = (activity: ActivityNotification) => {
  if (!activity.isRead) {
    markAsReadLocal('activity', activity.id)
  }
  console.log(activity)
  switch (activity.type) {
    case 'follow':
      router.push(`/user/${activity.user.id}`)
      break
    case 'publish_paper':
      router.push(`/publication/${activity.publicationId}`)
      break
    case 'start_project':
      router.push(`/research/my-workspace`)
      break
    case 'question_answer':
      router.push(`/research/my-questions`)
      break
    case 'like':
      router.push(`/research/my-questions`)
      break
  }
}

const getFullImageUrl = (imageUrl: string | null) => {
  if (!imageUrl) return '/default-avatar.png'

  // 如果已经是完整URL，直接返回
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // 拼接基础URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
  return `${baseUrl}${imageUrl}`
}

const getActivityTagColor = (type: string) => {
  const colors: Record<string, string> = {
    follow: 'bg-blue-100 text-blue-700 border border-blue-200',
    publish_paper: 'bg-green-100 text-green-700 border border-green-200',
    start_project: 'bg-purple-100 text-purple-700 border border-purple-200',
    join_project: 'bg-purple-100 text-purple-700 border border-purple-200',
    join_conference: 'bg-orange-100 text-orange-700 border border-orange-200',
    like: 'bg-pink-100 text-pink-700 border border-pink-200',
    comment: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    answer: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
    accept_application: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    activity: 'bg-gray-100 text-gray-700 border border-gray-200',
  }
  return colors[type] || 'bg-gray-100 text-gray-700 border border-gray-200'
}

const getNotificationIcon = (type: string) => {
  const icons: Record<string, () => ReturnType<typeof h>> = {
    security: () =>
      h('svg', { class: 'w-6 h-6', fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', {
          'fill-rule': 'evenodd',
          d: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z',
          'clip-rule': 'evenodd',
        }),
      ]),
    update: () =>
      h('svg', { class: 'w-6 h-6', fill: 'currentColor', viewBox: '0 0 20 20' }, [
        h('path', {
          'fill-rule': 'evenodd',
          d: 'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z',
          'clip-rule': 'evenodd',
        }),
      ]),
  }
  return icons[type] || icons.update
}

const getNotificationIconColor = (type: string) => {
  const colors: Record<string, string> = {
    security: 'bg-red-100 text-red-600 border border-red-200',
    update: 'bg-blue-100 text-blue-600 border border-blue-200',
  }
  return colors[type] || 'bg-gray-100 text-gray-600 border border-gray-200'
}

const getNotificationTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    security: 'bg-red-100 text-red-700',
    update: 'bg-blue-100 text-blue-700',
  }
  return colors[type] || 'bg-gray-100 text-gray-700'
}

const getNotificationTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    security: '安全提醒',
    update: '系统更新',
  }
  return labels[type] || '系统通知'
}

const getEmptyStateText = () => {
  const texts = {
    chat: '还没有私信对话，去发现页面找找感兴趣的研究者吧！',
    system: '暂无系统通知',
    activity: '还没有收到动态，去关注一些研究者来接收他们的动态吧！',
  }
  return texts[activeCategory.value as 'chat' | 'system' | 'activity'] || '暂无消息'
}

const formatTime = (dateString: string | Date | undefined | null) => {
  if (!dateString) return '未知时间'

  let date: Date

  if (typeof dateString === 'string') {
    // 兼容无T的日期字符串
    let normalized = dateString.replace(' ', 'T')
    // 如果只有日期没有时间，补全为 00:00:00
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      normalized += 'T00:00:00'
    }
    date = new Date(normalized)
    if (isNaN(date.getTime())) {
      // 尝试直接用原始字符串
      date = new Date(dateString)
      if (isNaN(date.getTime())) return '未知时间'
    }
  } else if (dateString instanceof Date) {
    date = dateString
    if (isNaN(date.getTime())) return '未知时间'
  } else {
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
  }).format(date)
}
// 打开设置对话框
const openSettingsDialog = async () => {
  try {
    const response = await messagesAPI.getMessageSettings()
    const s = response?.data || {}
    // 字段映射
    Object.assign(messageSettings, {
      newMessage: !!s.conversation,
      followActivity: !!s.activity,
      systemNotice: !!s.system,
      emailNotification: !!s.email,
      allowStrangerMessage: !!s.stranger,
      showOnlineStatus: !!s.online,
    })
    showSettingsDialog.value = true
  } catch (error) {
    console.error('加载设置失败:', error)
    ElMessage.error('加载设置失败')
  }
}

// 保存设置
const saveSettings = async () => {
  try {
    const res = await messagesAPI.saveMessageSettings(messageSettings)
    console.log('保存设置响应:', res) // 调试日志

    ElMessage.success('设置保存成功')
    showSettingsDialog.value = false
    loadCurrentCategory() // 重新加载消息，应用新的设置
  } catch (error) {
    console.error('保存设置失败:', error)
    ElMessage.error('保存设置失败')
  }
}

const loadCurrentCategory = async () => {
  try {
    if (activeCategory.value === 'chat') {
      const res = await messagesAPI.getConversations()
      console.log('会话数据:', res)

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
          avatar: getFullImageUrl(conv.avatar),
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

        conversations.value.sort(
          (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        )

        // 计算未读消息总数
        messageCategories.value[0].unreadCount = convList.reduce(
          (sum, conv) => sum + (conv.unreadCount || 0),
          0
        )
      } else {
        conversations.value = []
        messageCategories.value[0].unreadCount = 0
      }
    } else if (activeCategory.value === 'system') {
      const res = await messagesAPI.getSystemNotifications()
      console.log('系统通知数据:', res) // 调试日志

      if (res && res.data) {
        if (Array.isArray(res.data)) {
          // 🔥 补充系统通知缺失的字段
          systemNotifications.value = res.data.map(notif => ({
            id: notif.id,
            type: notif.type || 'system',
            title: getNotificationTitle(notif.content, notif.type), // 🔥 根据内容生成标题
            content: notif.content || '',
            isRead: notif.isRead || false,
            createdAt: notif.createdAt || new Date().toISOString(),
            action: null, // 🔥 后端没有action字段，设为null
          }))
          messageCategories.value[1].unreadCount = res.data.filter(notif => !notif.isRead).length
        } else if (res.data.list) {
          systemNotifications.value = Array.isArray(res.data.list)
            ? res.data.list.map(notif => ({
                id: notif.id,
                type: notif.type || 'system',
                title: getNotificationTitle(notif.content, notif.type),
                content: notif.content || '',
                isRead: notif.isRead || false,
                createdAt: notif.createdAt || new Date().toISOString(),
                action: null,
              }))
            : []
          messageCategories.value[1].unreadCount = res.data.unreadCount || 0
        } else {
          systemNotifications.value = []
          messageCategories.value[1].unreadCount = 0
        }
      } else {
        systemNotifications.value = []
        messageCategories.value[1].unreadCount = 0
      }
    } else if (activeCategory.value === 'activity') {
      const res = await messagesAPI.getActivityNotifications()
      console.log('动态通知数据:', res)

      if (res && res.data) {
        if (Array.isArray(res.data)) {
          activityNotifications.value = res.data.map(item => {
            const notification = item.notification || item
            return {
              id: notification.id,
              type: parseActivityType(
                typeof notification.content === 'string'
                  ? notification.content
                  : notification.content?.description ?? ''
              ),
              user: {
                id: notification.senderId ?? notification.userId ?? -1,
                name: item.name || '未知用户', // 直接用后端返回的name
                avatar: getFullImageUrl(item.avatarUrl ?? null), // 直接用后端返回的avatarUrl
                institution: '未知机构',
              },
              content: parseContentFromActivity(
                typeof notification.content === 'string'
                  ? notification.content
                  : notification.content?.description ?? ''
              ),
              isRead: notification.isRead || false,
              createdAt: notification.createdAt || new Date().toISOString(),
              publicationId: item.publicationId,
            }
          })
          messageCategories.value[2].unreadCount = res.data.filter(
            item => !(item.notification?.isRead || item.isRead)
          ).length
        } else {
          activityNotifications.value = []
          messageCategories.value[2].unreadCount = 0
        }
      } else {
        activityNotifications.value = []
        messageCategories.value[2].unreadCount = 0
      }
    }
  } catch (error) {
    console.error('加载消息失败:', error)
    ElMessage.error('加载消息失败')

    // 出错时设置空数组，避免undefined错误
    if (activeCategory.value === 'chat') {
      conversations.value = []
    } else if (activeCategory.value === 'system') {
      systemNotifications.value = []
    } else if (activeCategory.value === 'activity') {
      activityNotifications.value = []
    }
  }
}

// 🔥 新增辅助函数：根据内容生成系统通知标题
const getNotificationTitle = (content: string, type: string) => {
  if (content.includes('欢迎')) return '欢迎使用'
  if (content.includes('安全')) return '安全提醒'
  if (content.includes('更新')) return '系统更新'
  if (content.includes('维护')) return '系统维护'

  // 根据类型生成默认标题
  const titleMap: Record<string, string> = {
    system: '系统通知',
    security: '安全提醒',
    update: '系统更新',
  }
  return titleMap[type] || '系统通知'
}

// 🔥 优化：解析活动类型
const parseActivityType = (content: string) => {
  if (/上传了新成果|上传/.test(content)) return 'publish_paper'
  if (/申请加入|申请请求|提交申请/.test(content)) return 'start_project'
  if (/同意了.*申请/.test(content)) return 'start_project'
  if (/论文/.test(content)) return 'publish_paper'
  if (/回答被点赞|被点赞/.test(content)) return 'like'
  if (/有了新回答/.test(content)) return 'question_answer'
  if (/评论/.test(content)) return 'comment'
  if (/关注了你|你关注的用户|关注/.test(content)) return 'follow'
  return 'activity'
}

// 🔥 优化：解析内容信息
const parseContentFromActivity = (content: string) => {
  if (/你的问题有了新回答/.test(content)) {
    return { title: '新回答提醒', description: content }
  }
  if (/你关注的问题有了新回答/.test(content)) {
    return { title: '关注问题新回答', description: content }
  }
  if (/关注了你/.test(content)) {
    return { title: '新增关注', description: content }
  }
  if (/申请加入|申请请求|提交申请/.test(content)) {
    return { title: '项目申请', description: content }
  }
  if (/同意了.*申请/.test(content)) {
    return { title: '申请通过', description: content }
  }
  if (/被点赞/.test(content)) {
    return { title: '获得点赞', description: content }
  }
  if (/上传了新成果/.test(content)) {
    return { title: '新成果上传', description: content }
  }
  if (/论文/.test(content)) {
    return { title: '发表论文', description: content }
  }
  if (/评论/.test(content)) {
    return { title: '新增评论', description: content }
  }
  return { title: '动态提醒', description: content }
}

// 加载全部好友
const loadAllFriends = async () => {
  try {
    const res = await messagesAPI.getFriends()
    console.log('好友数据:', res) // 调试日志

    if (res && res.data) {
      if (Array.isArray(res.data)) {
        // 🔥 补充好友列表缺失的字段
        allFriends.value = res.data.map(friend => ({
          id: friend.id,
          name: friend.name || '未知用户',
          avatar: getFullImageUrl(friend.avatar), // 🔥 处理null头像
          isOnline: friend.isOnline || false,
          status: friend.isOnline ? '在线' : '离线', // 🔥 根据isOnline生成status
          institution: friend.institution || '未知机构', // 🔥 补充institution字段
        }))
      } else if (
        typeof res.data === 'object' &&
        'list' in res.data &&
        Array.isArray((res.data as any).list)
      ) {
        // 处理 { list: Friend[] } 格式
        allFriends.value = (res.data as any).list.map((friend: Friend) => ({
          id: friend.id,
          name: friend.name || '未知用户',
          avatar: getFullImageUrl(friend.avatar),
          isOnline: friend.isOnline || false,
          status: friend.isOnline ? '在线' : '离线',
          institution: friend.institution || '未知机构',
        }))
      } else if (typeof res.data === 'object' && 'id' in res.data) {
        // 单个好友对象，补充字段后包装成数组
        allFriends.value = [
          {
            id: res.data.id,
            name: res.data.name || '未知用户',
            avatar: res.data.avatar || '/default-avatar.png',
            isOnline: res.data.isOnline || false,
            status: res.data.isOnline ? '在线' : '离线',
            institution: res.data.institution || '未知机构',
          },
        ]
      } else {
        allFriends.value = []
      }
    } else {
      allFriends.value = []
    }
  } catch (error) {
    console.error('加载好友失败:', error)
    ElMessage.error('加载好友失败')
    allFriends.value = []
  }
}

// 🔥 更新getActivityLabel函数，兼容新的活动类型
const getActivityLabel = (type: string) => {
  const labels: Record<string, string> = {
    follow: '新增关注',
    publish_paper: '成果发表',
    start_project: '项目申请',
    join_conference: '会议参与',
    like: '点赞互动',
    comment: '评论互动',
    answer: '回答更新',
    accept_application: '申请通过',
    join_project: '项目申请',
  }
  return labels[type] || '动态更新'
}
// 新增：加载所有消息
const loadAllMessages = async () => {
  // 加载私信
  activeCategory.value = 'chat'
  await loadCurrentCategory()
  // 加载系统通知
  activeCategory.value = 'system'
  await loadCurrentCategory()
  // 加载动态提醒
  activeCategory.value = 'activity'
  await loadCurrentCategory()
  // 恢复默认激活分类
  activeCategory.value = 'chat'
}

// 页面初始化
onMounted(async () => {
  try {
    const response = await messagesAPI.getMessageSettings()
    const s = response?.data || {}
    Object.assign(messageSettings, {
      newMessage: !!s.conversation,
      followActivity: !!s.activity,
      systemNotice: !!s.system,
      emailNotification: !!s.email,
      allowStrangerMessage: !!s.stranger,
      showOnlineStatus: !!s.online,
    })
  } catch (error) {
    console.warn('加载设置失败，使用默认设置:', error)
  }
  await Promise.all([loadAllMessages(), loadAllFriends()])
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 忽明忽暗动画 - 不同速度 */
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
  animation: spinGentle 40s linear infinite, fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-spin-clockwise.animate-fade-pulse-medium {
  animation: spinClockwise 35s linear infinite, fadePulseMedium 9s ease-in-out infinite 3s;
}
</style>
