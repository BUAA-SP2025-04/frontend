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
            <!-- 展示模式切换按钮已移动到图谱头部右侧 -->
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
              <div class="p-3 pl-1 border-b border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-slate-800 dark:text-white flex items-center">
                  <i class="fas fa-sliders-h text-blue-500 mr-3"></i>
                  图谱控制
                </h3>
              </div>

              <div class="p-5 space-y-5">
                <!-- 图谱类型选择 -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"
                    >图谱类型</label
                  >
                  <div class="grid grid-cols-3 gap-3">
                    <button
                      v-for="type in graphTypes"
                      :key="type.value"
                      @click="graphType = type.value"
                      :class="[
                        'relative h-12 px-2 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group',
                        graphType === type.value
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transform scale-105 border-0'
                          : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:shadow-md hover:scale-102 hover:border-blue-300 dark:hover:border-blue-600',
                      ]"
                    >
                      <!-- 选中状态的背景光效 -->
                      <div
                        v-if="graphType === type.value"
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                      ></div>

                      <!-- <i
                        :class="[
                          type.icon,
                          'text-lg mb-1.5 transition-all duration-300',
                          graphType === type.value
                            ? 'text-white drop-shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400',
                        ]"
                      ></i> -->
                      <span
                        class="font-semibold tracking-wider relative z-10 text-sm leading-tight"
                        >{{ type.label }}</span
                      >

                      <!-- 悬停时的边框光效 -->
                      <div
                        v-if="graphType !== type.value"
                        class="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      ></div>
                    </button>
                  </div>
                </div>

                <!-- 布局类型 -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >布局类型</label
                    >
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      v-for="layout in layoutOptions"
                      :key="layout.value"
                      @click="
                        () => {
                          layoutType = layout.value
                          updateLayout()
                        }
                      "
                      :class="[
                        'relative h-12 px-2 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group',
                        layoutType === layout.value
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 transform scale-105 border-0'
                          : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:shadow-md hover:scale-102 hover:border-emerald-300 dark:hover:border-emerald-600',
                      ]"
                    >
                      <!-- 选中状态的背景光效 -->
                      <div
                        v-if="layoutType === layout.value"
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                      ></div>

                      <!-- <i
                        :class="[
                          layout.icon,
                          'text-lg mb-1.5 transition-all duration-300',
                          layoutType === layout.value
                            ? 'text-white drop-shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400',
                        ]"
                      ></i> -->
                      <span
                        class="font-semibold tracking-wider relative z-10 text-sm leading-tight"
                        >{{ layout.label }}</span
                      >

                      <!-- 悬停时的边框光效 -->
                      <div
                        v-if="layoutType !== layout.value"
                        class="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      ></div>
                    </button>
                  </div>
                </div>

                <!-- 控制按钮 -->
                <div class="flex flex-col gap-3 pt-2">
                  <button
                    @click="resetGraph"
                    class="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-all"
                  >
                    <i class="fas fa-undo mr-2"></i>
                    重置视图
                  </button>
                </div>
              </div>
            </div>

            <!-- 图例说明 -->
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div class="p-3 pl-1 border-b border-slate-200 dark:border-slate-700">
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
              class="p-3 pl-5 pr-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"
            >
              <div class="flex items-center space-x-4">
                <h3 class="font-bold text-slate-800 dark:text-white">{{ graphTitle }}</h3>

                <!-- 查询状态指示器 -->
                <!-- <div class="flex items-center space-x-2">
                  <div class="flex items-center text-sm">
                    <div class="w-2 h-2 rounded-full mr-2 bg-blue-500"></div>
                    <span class="text-slate-600 dark:text-slate-400">知识图谱</span>
                  </div>
                </div> -->

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

              <!-- 深色模式切换按钮 -->
              <div class="flex items-center">
                <button
                  @click="toggleDarkMode"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm border transition-colors',
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-blue-500 hover:border-blue-300',
                  ]"
                  title="切换显示模式"
                >
                  <el-icon v-if="!isDarkMode" class="text-base">
                    <Moon />
                  </el-icon>
                  <el-icon v-else class="text-base">
                    <Sunny />
                  </el-icon>
                  <!-- <span class="text-sm font-medium">
                  </span> -->
                </button>
              </div>
            </div>

            <!-- 图谱主体 -->
            <div class="graph-container relative flex-1 min-h-[600px]">
              <!-- 关注网络组件 -->
              <FollowNetwork
                v-if="graphType === 'follow'"
                :layout-type="layoutType"
                :is-dark-mode="isDarkMode"
                :selected-node="selectedNode"
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
                :selected-node="selectedNode"
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
                :selected-node="selectedNode"
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
              <div class="p-3 pl-1 border-b border-slate-200 dark:border-slate-700">
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
                        v-for="(area, index) in processedResearchAreas"
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
                      {{
                        selectedNode.type === 'user'
                          ? formatNumber(selectedNode.publishNum || 0)
                          : formatNumber(selectedNode.publicationNum || 0)
                      }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">论文</span>
                  </div>

                  <div
                    class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-xl p-3 flex flex-col items-center justify-center border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <span
                      class="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                    >
                      {{
                        selectedNode.type === 'user'
                          ? formatNumber(selectedNode.followerNum || 0)
                          : formatNumber(selectedNode.subscribeNum || 0)
                      }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">关注者</span>
                  </div>

                  <div
                    class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl p-3 flex flex-col items-center justify-center border border-purple-100 dark:border-purple-800/50"
                  >
                    <span
                      class="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                      {{
                        selectedNode.type === 'user'
                          ? formatNumber(selectedNode.subjectNum || 0)
                          : formatNumber(selectedNode.projectNum || 0)
                      }}
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
                <div
                  class="pt-4 grid grid-cols-2 gap-2"
                  :class="{ 'justify-center': graphType !== 'follow' }"
                >
                  <button
                    v-if="!(graphType === 'institution' && selectedNode?.type === 'user')"
                    @click="loadUserGraph(selectedNode.id)"
                    :class="{ 'col-span-2': selectedNode?.type !== 'user' }"
                    class="flex items-center justify-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-sm transition-all duration-200 text-sm"
                  >
                    <i class="fas fa-refresh mr-1"></i>
                    查看详情
                  </button>

                  <button
                    v-if="selectedNode?.type === 'user'"
                    :class="{
                      'col-span-2': graphType === 'institution' && selectedNode?.type === 'user',
                    }"
                    @click="goToUserProfile(selectedNode.id)"
                    class="flex items-center justify-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-sm transition-all duration-200 text-sm"
                  >
                    <i class="fas fa-home mr-1"></i>
                    前往主页
                  </button>
                </div>

                <!-- 关联节点 -->
                <!-- <div
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
                </div> -->
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
import { Female, Male, Moon, Sunny } from '@element-plus/icons-vue'
import { getUserDetail } from '../../api/modules/user'
import { getResearcherByArea, getResearcherByInstitution } from '../../api/modules/graph'
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
  { label: '力导向布局', value: 'force', icon: 'fas fa-sliders-h' },
  { label: '圆形布局', value: 'circular', icon: 'fas fa-circle' },
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

  // 根据节点类型处理
  if (nodeData.type === 'user') {
    loadingUserDetail.value = true

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
    // 机构节点：只更新右侧详情界面，不更新图谱
    console.log('机构节点点击，更新右侧详情界面')
  } else if (nodeData.type === 'field' || nodeData.type === 'area') {
    // 领域节点：只更新右侧详情界面，不更新图谱
    console.log('领域节点点击，更新右侧详情界面')
  } else {
    // 其他类型节点，不进行任何搜索，保持默认样式
    console.log('其他类型节点，保持默认样式')
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
  // 重置选中节点
  selectedNode.value = null

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

  // 重置选中节点
  selectedNode.value = null

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

const viewProfileDetail = (nodeId: string) => {
  // 跳转到用户详情页面
  router.push(`/user/${nodeId}`)
}

const loadUserGraph = async (nodeId: string) => {
  // 根据选中节点的类型处理
  if (selectedNode.value?.type === 'user') {
    // 用户节点：加载用户图谱
    if (graphType.value === 'follow' && followNetworkRef.value) {
      followNetworkRef.value.loadUserGraph(nodeId)
    } else if (graphType.value === 'area' && areaNetworkRef.value) {
      areaNetworkRef.value.loadUserGraph(nodeId)
    }
  } else if (
    selectedNode.value?.type === 'language' ||
    selectedNode.value?.type === 'institution'
  ) {
    // 机构节点：获取该机构的科研人员并更新图谱
    console.log('开始获取机构科研人员:', selectedNode.value.name)
    try {
      const response = await getResearcherByInstitution(selectedNode.value.name)
      if (response.data) {
        console.log('机构科研人员获取成功，更新图谱')
        // 更新图谱显示该机构的科研人员
        if (graphType.value === 'institution' && institutionNetworkRef.value) {
          institutionNetworkRef.value.loadInstitutionResearchers(
            selectedNode.value.name,
            response.data
          )
        }
      }
    } catch (error) {
      console.error('获取机构科研人员失败:', error)
    }
  } else if (selectedNode.value?.type === 'field' || selectedNode.value?.type === 'area') {
    // 领域节点：获取该领域的科研人员并更新图谱
    try {
      const response = await getResearcherByArea(selectedNode.value.name)
      if (response.data) {
        console.log('领域科研人员获取成功，更新图谱')
        // 更新图谱显示该领域的科研人员
        if (graphType.value === 'area' && areaNetworkRef.value) {
          areaNetworkRef.value.loadAreaResearchers(selectedNode.value.name, response.data)
        }
      }
    } catch (error) {
      console.error('获取领域科研人员失败:', error)
    }
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
      return '知识图谱'
  }
})

const processedResearchAreas = computed(() => {
  if (!selectedNode.value?.researchArea) return []
  return selectedNode.value.researchArea
    .split(',')
    .map((area: string) => area.trim())
    .filter((area: string) => area)
})

const currentLayoutLabel = computed(() => {
  const layout = layoutOptions.find(option => option.value === layoutType.value)
  return layout ? layout.label : '力导向布局'
})

// 监听器
watch([graphType], async () => {
  // 切换图谱类型时，如果当前选中的是用户节点，则以该用户为中心构建新类型网络
  await nextTick()
  if (selectedNode.value && selectedNode.value.type === 'user') {
    if (graphType.value === 'follow' && followNetworkRef.value) {
      followNetworkRef.value.loadUserGraph(selectedNode.value.id) 
    } else if (graphType.value === 'institution' && institutionNetworkRef.value) {
      institutionNetworkRef.value.loadUserGraph(selectedNode.value.id)
    } else if (graphType.value === 'area' && areaNetworkRef.value) {
      areaNetworkRef.value.loadUserGraph(selectedNode.value.id)
    }
  } else if (userStore.user) {
    // 未选中用户节点时，使用当前登录用户
    selectedNode.value = null
    if (graphType.value === 'follow' && followNetworkRef.value) {
      followNetworkRef.value.loadUserGraph(userStore.user.id)
    } else if (graphType.value === 'institution' && institutionNetworkRef.value) {
      institutionNetworkRef.value.loadUserGraph(userStore.user.id)
    } else if (graphType.value === 'area' && areaNetworkRef.value) {
      areaNetworkRef.value.loadUserGraph(userStore.user.id)
    }
  }
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

/* 自定义按钮样式 */
.scale-102 {
  transform: scale(1.02);
}

.scale-105 {
  transform: scale(1.05);
}

/* 按钮悬停效果 */
.group:hover .group-hover\:scale-102 {
  transform: scale(1.02);
}

/* 渐变背景动画 */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* 按钮点击效果 */
button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* 选中状态的脉冲动画 */
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-pulse {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
