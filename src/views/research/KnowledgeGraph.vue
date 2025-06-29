<template>
  <div class="research-graph-container min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 顶部标题和介绍 -->
      <header class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <div class="mb-4 md:mb-0">
            <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
              科研社交知识图谱
            </h1>
            <p class="mt-2 text-slate-600 dark:text-slate-400">
              探索学术人脉网络，发现合作机会，构建研究生态圈
            </p>
          </div>

          <div class="flex items-center gap-4">
            <!-- 展示模式切换 -->
            <button
              @click="toggleDarkMode"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border transition-colors',
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-500 hover:border-blue-300',
              ]"
              title="切换显示模式"
            >
              <el-icon v-if="!isDarkMode" class="text-lg">
                <Moon />
              </el-icon>
              <el-icon v-else class="text-lg">
                <Sunny />
              </el-icon>
              <span class="text-sm font-medium">
                {{ isDarkMode ? '浅色模式' : '深色模式' }}
              </span>
            </button>
          </div>
        </div>
      </header>

      <!-- 主体内容区 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 左侧控制面板 -->
        <div class="lg:col-span-3">
          <div class="space-y-6">
            <!-- 图谱控制面板 -->
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div class="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-slate-800 dark:text-white flex items-center">
                  <i class="fas fa-sliders-h text-blue-500 mr-3"></i>
                  图谱控制
                </h3>
              </div>

              <div class="p-5 space-y-5">
                <!-- 图谱类型选择 -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >图谱类型</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="type in graphTypes"
                      :key="type.value"
                      @click="graphType = type.value"
                      :class="[
                        'py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-200 flex flex-col items-center justify-center',
                        graphType === type.value
                          ? 'bg-blue-500 text-white border-blue-600 shadow-md transform scale-[1.02]'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700',
                      ]"
                    >
                      <i :class="[type.icon, 'text-lg mb-1']"></i>
                      {{ type.label }}
                    </button>
                  </div>
                </div>

                <!-- 布局类型 -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >布局类型</label
                  >
                  <select
                    v-model="layoutType"
                    @change="updateLayout"
                    class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  >
                    <option
                      v-for="layout in layoutOptions"
                      :key="layout.value"
                      :value="layout.value"
                    >
                      {{ layout.label }}
                    </option>
                  </select>
                </div>

                <!-- 控制按钮 -->
                <div class="flex flex-col gap-3 pt-2">
                  <button
                    @click="refreshGraph"
                    class="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-sm transition-all duration-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <i class="fas fa-sync-alt mr-2"></i>
                    刷新图谱
                  </button>

                  <!-- 返回用户视图按钮 -->
                  <button
                    v-if="currentQueryInfo.type === 'node'"
                    @click="returnToUserView"
                    class="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-sm transition-all duration-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                  >
                    <i class="fas fa-user mr-2"></i>
                    返回用户视图
                  </button>

                  <div class="grid grid-cols-2 gap-2">
                    <button
                      @click="resetGraph"
                      class="flex items-center justify-center py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-all"
                    >
                      <i class="fas fa-undo mr-2"></i>
                      重置视图
                    </button>

                    <button
                      @click="toggleFullscreen"
                      class="flex items-center justify-center py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-all"
                    >
                      <i class="fas fa-expand-alt mr-2"></i>
                      全屏
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图例说明 -->
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div class="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-slate-800 dark:text-white flex items-center">
                  <i class="fas fa-info-circle text-blue-500 mr-3"></i>
                  图例说明
                </h3>
              </div>

              <div class="p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">用户</span>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-blue-500 mr-3 transform rotate-45"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">机构</span>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="w-4 h-4 rounded bg-emerald-500 mr-3"></div>
                  <span class="text-sm text-slate-700 dark:text-slate-300">研究领域</span>
                </div>

                <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div class="flex items-center mb-2">
                    <div class="w-12 h-0.5 bg-purple-500 mr-3 relative">
                      <div
                        class="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-purple-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"
                      ></div>
                    </div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">关注关系</span>
                  </div>

                  <div class="flex items-center mb-2">
                    <div class="w-12 h-0.5 bg-blue-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">属于关系</span>
                  </div>

                  <div class="flex items-center mb-2">
                    <div class="w-12 h-0.5 bg-emerald-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">专业关系</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中央图谱区域 -->
        <div class="lg:col-span-6">
          <div
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col"
          >
            <!-- 图谱头部 -->
            <div
              class="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"
            >
              <div class="flex items-center space-x-4">
                <h3 class="font-bold text-slate-800 dark:text-white">{{ graphTitle }}</h3>

                <!-- 查询状态指示器 -->
                <div class="flex items-center space-x-2">
                  <div class="flex items-center text-sm">
                    <div
                      class="w-2 h-2 rounded-full mr-2"
                      :class="currentQueryInfo.type === 'user' ? 'bg-blue-500' : 'bg-emerald-500'"
                    ></div>
                    <span class="text-slate-600 dark:text-slate-400">
                      {{ currentQueryInfo.type === 'user' ? '用户视图' : '节点视图' }}
                    </span>
                  </div>
                </div>

                <div class="hidden md:flex items-center space-x-4">
                  <span class="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></div>
                    {{ nodeCount }} 节点
                  </span>
                  <span class="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <div class="w-2.5 h-2.5 rounded-full bg-slate-400 mr-2"></div>
                    {{ linkCount }} 连接
                  </span>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <!-- 缩放控制 -->
                <div class="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <button
                    @click="zoomOut"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <i class="fas fa-search-minus"></i>
                  </button>

                  <div class="px-2 text-xs text-slate-600 dark:text-slate-400">
                    {{ Math.round(zoomLevel * 100) }}%
                  </div>

                  <button
                    @click="zoomIn"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <i class="fas fa-search-plus"></i>
                  </button>
                </div>

                <!-- 更多选项 -->
                <div class="relative" ref="optionsDropdown">
                  <button
                    @click="toggleOptionsMenu"
                    class="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </button>

                  <div
                    v-if="showOptionsMenu"
                    class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10"
                  >
                    <div class="py-1">
                      <button
                        @click="exportAsImage"
                        class="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <i class="fas fa-download mr-2"></i>
                        导出为图片
                      </button>
                      <button
                        @click="exportData"
                        class="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <i class="fas fa-file-export mr-2"></i>
                        导出数据
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图谱主体 -->
            <div class="graph-container relative flex-1 min-h-[600px]">
              <!-- 关注网络组件 -->
              <FollowNetwork
                v-if="graphType === 'follow'"
                :layout-type="layoutType"
                :is-dark-mode="isDarkMode"
                @node-click="handleNodeClick"
                @node-count-change="handleNodeCountChange"
                @link-count-change="handleLinkCountChange"
                ref="followNetworkRef"
              />

              <!-- 机构网络组件 -->
              <InstitutionNetwork
                v-else-if="graphType === 'institution'"
                :layout-type="layoutType"
                :is-dark-mode="isDarkMode"
                @node-click="handleNodeClick"
                @node-count-change="handleNodeCountChange"
                @link-count-change="handleLinkCountChange"
                ref="institutionNetworkRef"
              />

              <!-- 领域网络组件 -->
              <AreaNetwork
                v-else-if="graphType === 'area'"
                :layout-type="layoutType"
                :is-dark-mode="isDarkMode"
                @node-click="handleNodeClick"
                @node-count-change="handleNodeCountChange"
                @link-count-change="handleLinkCountChange"
                ref="areaNetworkRef"
              />
            </div>
          </div>
        </div>

        <!-- 右侧详情区 -->
        <div class="lg:col-span-3">
          <div class="space-y-6">
            <!-- 节点详情卡片 -->
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div class="p-5 border-b border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-slate-800 dark:text-white flex items-center">
                  <i class="fas fa-user-circle text-blue-500 mr-3"></i>
                  节点详情
                </h3>
              </div>

              <div v-if="selectedNode" class="p-5 space-y-5 relative">
                <!-- 加载状态覆盖层 -->
                <transition
                  name="loading-overlay"
                  enter-active-class="loading-overlay-enter-active"
                  leave-active-class="loading-overlay-leave-active"
                  enter-from-class="loading-overlay-enter-from"
                  leave-to-class="loading-overlay-leave-to"
                >
                  <div
                    v-if="loadingUserDetail"
                    class="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg"
                  >
                    <div class="text-center">
                      <div class="w-16 h-16 mx-auto relative mb-4">
                        <div
                          class="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-900"
                        ></div>
                        <div
                          class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                        ></div>
                      </div>
                      <p class="text-slate-600 dark:text-slate-400 font-medium">
                        正在加载用户详细信息...
                      </p>
                      <p class="text-sm text-slate-500 dark:text-slate-500 mt-1">请稍候</p>
                    </div>
                  </div>
                </transition>

                <!-- 节点基本信息 -->
                <div class="flex items-start space-x-4">
                  <div class="relative">
                    <div
                      class="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                      :class="
                        selectedNode.type === 'user'
                          ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
                      "
                    >
                      <img
                        v-if="selectedNode.imgUrl"
                        :src="'/api' + selectedNode.imgUrl"
                        :alt="selectedNode.name"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                      <span
                        v-else
                        class="text-2xl font-bold"
                        :class="selectedNode.type === 'user' ? 'text-purple-500' : 'text-blue-500'"
                        >{{ selectedNode.initials }}</span
                      >
                    </div>

                    <div
                      v-if="selectedNode.gender"
                      class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      :class="
                        selectedNode.gender === 'male'
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                          : 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400'
                      "
                    >
                      <el-icon class="text-sm font-bold">
                        <Male v-if="selectedNode.gender === 'male'" />
                        <Female v-else />
                      </el-icon>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-800 dark:text-white text-lg">
                      {{ selectedNode.name }}
                    </h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {{ selectedNode.title || '未知职位' }}
                    </p>
                    <p
                      v-if="selectedNode.institution"
                      class="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-1"
                    >
                      <i class="fas fa-university text-blue-500"></i>
                      {{ selectedNode.institution }}
                    </p>
                    <p
                      v-if="selectedNode.createdAt"
                      class="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-1"
                    >
                      <i class="fas fa-calendar-alt text-blue-500"></i>
                      {{
                        new Date(selectedNode.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      }}
                    </p>
                  </div>

                  <!-- 研究领域标签 -->
                  <div v-if="selectedNode.researchArea" class="flex-shrink-0">
                    <div class="flex flex-col gap-2 items-end">
                      <span
                        v-for="(area, index) in selectedNode.researchArea
                          .split(',')
                          .map((area: string) => area.trim())
                          .filter((area: string) => area)"
                        :key="index"
                        class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 text-center"
                        :style="{ width: 'fit-content', minWidth: 'max-content' }"
                      >
                        <i class="fas fa-microscope text-blue-500"></i>
                        <span>{{ area }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 统计信息卡片 -->
                <div class="grid grid-cols-3 gap-3">
                  <div
                    class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl p-3 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/50"
                  >
                    <span
                      class="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
                    >
                      {{ formatNumber(selectedNode.publishNum || 0) }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">论文</span>
                  </div>

                  <div
                    class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-xl p-3 flex flex-col items-center justify-center border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <span
                      class="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                    >
                      {{ formatNumber(selectedNode.followerNum || 0) }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">关注者</span>
                  </div>

                  <div
                    class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl p-3 flex flex-col items-center justify-center border border-purple-100 dark:border-purple-800/50"
                  >
                    <span
                      class="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                      {{ formatNumber(selectedNode.subjectNum || 0) }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">项目</span>
                  </div>
                </div>

                <!-- 个人简介 -->
                <div
                  v-if="selectedNode.bio"
                  class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3"
                >
                  <h5
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center"
                  >
                    <i class="fas fa-user-edit text-blue-500"></i>
                    个人简介
                  </h5>
                  <div class="max-h-24 overflow-y-auto custom-scrollbar pr-2">
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {{ selectedNode.bio }}
                    </p>
                  </div>
                </div>

                <!-- 联系信息 -->
                <div
                  v-if="selectedNode.email"
                  class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3"
                >
                  <h5
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center"
                  >
                    <i class="fas fa-envelope text-blue-500"></i>
                    联系信息
                  </h5>
                  <p class="text-sm text-slate-600 dark:text-slate-400 break-all">
                    {{ selectedNode.email }}
                  </p>
                </div>

                <!-- 操作按钮 -->
                <div class="pt-4 grid grid-cols-2 gap-2">
                  <button
                    @click="loadUserGraph(selectedNode.id)"
                    class="flex items-center justify-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-sm transition-all duration-200 text-sm"
                  >
                    <i class="fas fa-refresh mr-1"></i>
                    查看详情
                  </button>

                  <button
                    @click="goToUserProfile(selectedNode.id)"
                    class="flex items-center justify-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-sm transition-all duration-200 text-sm"
                  >
                    <i class="fas fa-home mr-1"></i>
                    前往主页
                  </button>
                </div>

                <!-- 关联节点 -->
                <div
                  v-if="relatedNodes.length"
                  class="pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                  <h5
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center"
                  >
                    <i class="fas fa-users text-blue-500 mr-2"></i>
                    关联节点
                  </h5>
                  <div class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    <div
                      v-for="node in relatedNodes"
                      :key="node.id"
                      @click="selectNode(node.id)"
                      class="flex items-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer group"
                    >
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        :class="getNodeTypeClass(node.type).bg"
                      >
                        <i :class="[getNodeTypeClass(node.type).icon]"></i>
                      </div>

                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          {{ node.name }}
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {{ node.relationshipType === 'FOLLOW' ? '关注' : node.relationshipType }}
                          · {{ node.type === 'user' ? '用户' : node.type }}
                        </p>
                      </div>

                      <div class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <i class="fas fa-chevron-right text-slate-400 dark:text-slate-500"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="p-10 flex flex-col items-center justify-center text-center">
                <div
                  class="mb-4 w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center"
                >
                  <i class="fas fa-hand-pointer text-2xl text-slate-400 dark:text-slate-500"></i>
                </div>
                <h4 class="font-medium text-slate-700 dark:text-slate-300 mb-1">
                  选择节点查看详情
                </h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  在图谱中点击任意节点以查看其详细信息、关联关系和可用操作
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { Moon, Sunny, Male, Female } from '@element-plus/icons-vue'
import { getUserDetail } from '../../api/modules/user'
import { getResearcherByInstitution, getResearcherByArea } from '../../api/modules/graph'
import type { UserDetail } from '../../api/types/user'
import { useUserStore } from '@/stores/user'
import FollowNetwork from '@/components/graph/FollowNetwork.vue'
import InstitutionNetwork from '@/components/graph/InstitutionNetwork.vue'
import AreaNetwork from '@/components/graph/AreaNetwork.vue'

// 路由
const router = useRouter()

// DOM引用
const graphContainer = ref<HTMLElement | null>(null)
const optionsDropdown = ref<HTMLElement | null>(null)
const followNetworkRef = ref<any>(null)
const institutionNetworkRef = ref<any>(null)
const areaNetworkRef = ref<any>(null)

// 基础状态
const loading = ref(false)
const loadingMessage = ref('')
const isDarkMode = ref(false)
const showOptionsMenu = ref(false)
const zoomLevel = ref(1)
const loadingUserDetail = ref(false)

// 图谱配置
const graphType = ref('follow') // follow, institution, research
const layoutType = ref('force')

// 数据状态
const nodeCount = ref(0)
const linkCount = ref(0)
const selectedNode = ref<any>(null)
const relatedNodes = ref<any[]>([])

// 界面选项
const graphTypes = [
  { label: '知识图谱', value: 'follow', icon: 'fas fa-project-diagram' },
  { label: '机构网络', value: 'institution', icon: 'fas fa-code' },
  { label: '领域网络', value: 'area', icon: 'fas fa-book' },
]

const layoutOptions = [
  { label: '力导向布局', value: 'force' },
  { label: '圆形布局', value: 'circular' },
  // { label: '同心圆布局', value: 'concentric' },
  // { label: '网格布局', value: 'grid' },
]

const visibilityFilters = ref([
  { id: 'users', label: '研究人员', icon: 'fas fa-user', active: true },
  { id: 'institutions', label: '机构', icon: 'fas fa-university', active: true },
  { id: 'fields', label: '研究领域', icon: 'fas fa-book', active: true },
])

// 响应式数据
const userStore = useUserStore()
const currentQueryInfo = ref<{ type: 'user' | 'node'; data: any }>({ type: 'user', data: null })

// 生命周期钩子
onMounted(async () => {
  // 默认深色模式跟随系统
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDarkMode.value)

  // 点击其他区域关闭下拉菜单
  onClickOutside(optionsDropdown, () => {
    showOptionsMenu.value = false
  })
})

onBeforeUnmount(() => {
  // 清理工作
})

// 事件处理函数
const handleNodeClick = async (nodeData: any) => {
  // 立即设置选中的节点，显示基本信息
  selectedNode.value = nodeData
  // 立即显示加载状态
  loadingUserDetail.value = true

  // 更新查询信息为节点信息
  currentQueryInfo.value = { type: 'node', data: nodeData }

  // 根据节点类型处理
  if (nodeData.type === 'user') {
    // 用户节点：获取详细信息
    console.log('开始获取用户详细信息...')
    try {
      const response = await getUserDetail(nodeData.id)
      if (response.data) {
        // 合并原始节点数据和详细信息
        selectedNode.value = {
          ...nodeData,
          ...response.data,
          // 确保头像URL正确
          imgUrl: response.data.imgUrl || nodeData.imgUrl,
          // 确保初始字母正确
          initials: response.data.name ? response.data.name.charAt(0) : nodeData.initials,
        }
        console.log('用户详细信息获取成功')
      }
    } catch (error) {
      console.error('获取用户详细信息失败:', error)
      console.warn('用户详细信息获取失败，显示基础信息')
    } finally {
      loadingUserDetail.value = false
      console.log('加载状态已隐藏')
    }
  } else if (nodeData.type === 'language' || nodeData.type === 'institution') {
    // 机构节点：获取该机构的科研人员
    console.log('开始获取机构科研人员:', nodeData.name)
    try {
      const response = await getResearcherByInstitution(nodeData.name)
      if (response.data) {
        console.log('机构科研人员获取成功，更新图谱')
        // 更新图谱显示该机构的科研人员
        if (graphType.value === 'institution' && institutionNetworkRef.value) {
          institutionNetworkRef.value.loadInstitutionResearchers(nodeData.name, response.data)
        }
      }
    } catch (error) {
      console.error('获取机构科研人员失败:', error)
    } finally {
      loadingUserDetail.value = false
    }
  } else if (nodeData.type === 'field' || nodeData.type === 'area') {
    // 领域节点：获取该领域的科研人员
    console.log('开始获取领域科研人员:', nodeData.name)
    try {
      const response = await getResearcherByArea(nodeData.name)
      if (response.data) {
        console.log('领域科研人员获取成功，更新图谱')
        // 更新图谱显示该领域的科研人员
        if (graphType.value === 'area' && areaNetworkRef.value) {
          areaNetworkRef.value.loadAreaResearchers(nodeData.name, response.data)
        }
      }
    } catch (error) {
      console.error('获取领域科研人员失败:', error)
    } finally {
      loadingUserDetail.value = false
    }
  } else {
    // 其他类型节点，立即隐藏加载状态
    loadingUserDetail.value = false
    console.log('其他类型节点，立即隐藏加载状态')
  }

  // 查找关联节点 - 这个功能应该由子组件提供
  // 暂时清空，等待子组件提供相关数据
  relatedNodes.value = []
}

// 处理节点数量变化
const handleNodeCountChange = (count: number) => {
  nodeCount.value = count
}

// 处理连接数量变化
const handleLinkCountChange = (count: number) => {
  linkCount.value = count
}

// 工具函数
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const handleResize = debounce(() => {
  // 图表resize由子组件处理
}, 100)

// 控制函数
const updateLayout = () => {
  // 布局更新会通过props自动传递给子组件
}

const refreshGraph = () => {
  // 重置为使用用户信息查询
  currentQueryInfo.value = { type: 'user', data: null }

  // 根据当前图谱类型调用对应组件的刷新方法
  if (graphType.value === 'follow' && followNetworkRef.value) {
    followNetworkRef.value.refreshGraph()
  } else if (graphType.value === 'institution' && institutionNetworkRef.value) {
    institutionNetworkRef.value.refreshGraph()
  } else if (graphType.value === 'area' && areaNetworkRef.value) {
    areaNetworkRef.value.refreshGraph()
  }
}

const resetGraph = () => {
  selectedNode.value = null
  relatedNodes.value = []
  zoomLevel.value = 1

  // 重置为使用用户信息查询
  currentQueryInfo.value = { type: 'user', data: null }

  // 根据当前图谱类型调用对应组件的刷新方法
  if (graphType.value === 'follow' && followNetworkRef.value) {
    followNetworkRef.value.refreshGraph()
  } else if (graphType.value === 'institution' && institutionNetworkRef.value) {
    institutionNetworkRef.value.refreshGraph()
  } else if (graphType.value === 'area' && areaNetworkRef.value) {
    areaNetworkRef.value.refreshGraph()
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    graphContainer.value?.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const toggleOptionsMenu = () => {
  showOptionsMenu.value = !showOptionsMenu.value
}

const toggleFilter = (filterId: string) => {
  const filter = visibilityFilters.value.find(f => f.id === filterId)
  if (filter) {
    filter.active = !filter.active
    // 过滤功能由子组件处理
  }
}

const zoomIn = () => {
  // 缩放功能由子组件处理
  zoomLevel.value = Math.min(3, zoomLevel.value * 1.2)
}

const zoomOut = () => {
  // 缩放功能由子组件处理
  zoomLevel.value = Math.max(0.2, zoomLevel.value * 0.8)
}

const exportAsImage = () => {
  // 导出功能由子组件处理
  console.log('导出图片功能需要由子组件实现')
}

const exportData = () => {
  // 导出功能由子组件处理
  console.log('导出数据功能需要由子组件实现')
}

const selectNode = (nodeId: string) => {
  // 节点选择功能由子组件处理
  console.log('选择节点功能需要由子组件实现')
}

const viewProfileDetail = (nodeId: string) => {
  // 跳转到用户详情页面
  router.push(`/user/${nodeId}`)
}

const returnToUserView = () => {
  // 重置为使用用户信息查询
  currentQueryInfo.value = { type: 'user', data: null }
  // 刷新当前图谱
  refreshGraph()
}

const loadUserGraph = (userId: string) => {
  console.log('加载用户图谱，用户ID:', userId)

  // 更新查询信息为节点信息
  currentQueryInfo.value = { type: 'node', data: { id: userId } }

  // 根据当前图谱类型调用对应组件的加载方法
  if (graphType.value === 'follow' && followNetworkRef.value) {
    followNetworkRef.value.loadUserGraph(userId)
  } else if (graphType.value === 'institution' && institutionNetworkRef.value) {
    institutionNetworkRef.value.loadInstitutionResearchers(userId)
  } else if (graphType.value === 'area' && areaNetworkRef.value) {
    areaNetworkRef.value.loadAreaResearchers(userId)
  }
}

const goToUserProfile = (nodeId: string) => {
  // 跳转到用户详情页面
  router.push(`/user/${nodeId}`)
}

// 计算属性
const graphTitle = computed(() => {
  switch (graphType.value) {
    case 'follow':
      return '知识图谱'
    case 'institution':
      return '机构网络'
    case 'area':
      return '领域网络'
    default:
      return '知识网络'
  }
})

// 监听器
watch([graphType], () => {
  // 切换图谱类型时，重置为使用用户信息查询
  currentQueryInfo.value = { type: 'user', data: null }
})

watch(layoutType, () => {
  // 布局类型变化会通过props自动传递给子组件
})

// 工具函数
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const getNodeTypeClass = (type: string) => {
  const classes = {
    user: {
      bg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
      icon: 'fas fa-user',
    },
    language: {
      bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
      icon: 'fas fa-code',
    },
    field: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      icon: 'fas fa-book',
    },
  }
  return classes[type as keyof typeof classes] || classes.user
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<style scoped>
.research-graph-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.graph-container {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.dark .graph-container {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 2px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 加载动画过渡效果 */
.loading-overlay-enter-active,
.loading-overlay-leave-active {
  transition: all 0.3s ease;
}

.loading-overlay-enter-from {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.loading-overlay-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .max-w-8xl {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .grid-cols-12 {
    grid-template-columns: 1fr;
  }

  .lg\:col-span-3,
  .lg\:col-span-6,
  .lg\:col-span-3 {
    grid-column: span 1;
  }

  .graph-container {
    min-height: 400px;
  }
}
</style>

