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
            <!-- 视图切换 -->
            <div
              class="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <button
                v-for="view in viewOptions"
                :key="view.value"
                @click="currentView = view.value"
                :class="[
                  'px-4 py-2 text-sm font-medium transition-colors',
                  currentView === view.value
                    ? 'bg-blue-500 text-white rounded-lg shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400',
                ]"
              >
                <i :class="view.icon" class="mr-2"></i>
                {{ view.label }}
              </button>
            </div>

            <!-- 展示模式切换 -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              title="切换显示模式"
            >
              <i class="fas fa-moon dark:hidden"></i>
              <i class="fas fa-sun hidden dark:inline"></i>
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

                <!-- 筛选器 -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >按编程语言筛选</label
                  >
                  <select
                    v-model="selectedInstitution"
                    class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  >
                    <option value="">全部语言</option>
                    <option
                      v-for="institution in institutionOptions"
                      :key="institution.id"
                      :value="institution.id"
                    >
                      {{ institution.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >按研究领域筛选</label
                  >
                  <div class="relative">
                    <select
                      v-model="selectedResearchField"
                      class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    >
                      <option value="">全部研究领域</option>
                      <option
                        v-for="field in researchFieldOptions"
                        :key="field.id"
                        :value="field.id"
                      >
                        {{ field.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- 搜索 -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >搜索节点</label
                  >
                  <div class="relative">
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="输入名称或关键词..."
                      class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 pl-10 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                      @input="handleSearch"
                    />
                    <i
                      class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    ></i>
                  </div>
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
                    <div class="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">编程语言</span>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="w-4 h-4 rounded-lg bg-emerald-500 mr-3"></div>
                  <span class="text-sm text-slate-700 dark:text-slate-300">研究领域</span>
                </div>

                <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div class="flex items-center mb-2">
                    <div class="w-12 h-0.5 bg-blue-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">属于关系</span>
                  </div>

                  <div class="flex items-center mb-2">
                    <div class="w-12 h-0.5 bg-emerald-500 mr-3"></div>
                    <span class="text-sm text-slate-700 dark:text-slate-300">应用于关系</span>
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
                      <button
                        @click="toggleLabels"
                        class="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <i class="fas fa-tag mr-2"></i>
                        {{ showLabels ? '隐藏标签' : '显示标签' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图谱主体 -->
            <div class="graph-container relative flex-1 min-h-[600px]">
              <div id="knowledge-graph" class="w-full h-full" ref="graphContainer"></div>

              <!-- 加载状态 -->
              <div
                v-if="loading"
                class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="w-16 h-16 mx-auto relative">
                    <div
                      class="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-900"
                    ></div>
                    <div
                      class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                    ></div>
                  </div>
                  <p class="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                    正在构建知识网络...
                  </p>
                </div>
              </div>

              <!-- 空状态 -->
              <div
                v-if="!loading && nodeCount === 0"
                class="absolute inset-0 flex items-center justify-center"
              >
                <div class="text-center max-w-sm">
                  <div class="mb-4 text-slate-400 dark:text-slate-500">
                    <i class="fas fa-project-diagram text-6xl"></i>
                  </div>
                  <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                    暂无图谱数据
                  </h3>
                  <p class="text-slate-500 dark:text-slate-400 mb-6">
                    请尝试调整筛选条件或搜索关键词，也可能是当前数据尚未加载完成
                  </p>
                  <button
                    @click="refreshGraph"
                    class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                  >
                    <i class="fas fa-sync-alt mr-2"></i>
                    重新加载
                  </button>
                </div>
              </div>

              <!-- 节点关系提示 -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-if="hoveredEdge && showLabels"
                  class="absolute bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 text-xs text-slate-600 dark:text-slate-400 transform -translate-x-1/2 pointer-events-none"
                  :style="{ left: hoveredEdgePosition.x + 'px', top: hoveredEdgePosition.y + 'px' }"
                >
                  {{ hoveredEdge.relationshipType }}
                </div>
              </transition>
            </div>

            <!-- 图谱工具栏 -->
            <div
              class="p-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between"
            >
              <!-- 过滤控制 -->
              <div class="flex items-center gap-2">
                <button
                  v-for="filter in visibilityFilters"
                  :key="filter.id"
                  @click="toggleFilter(filter.id)"
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1',
                    filter.active
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
                  ]"
                >
                  <i :class="[filter.icon, filter.active ? 'text-blue-500' : 'text-slate-400']"></i>
                  {{ filter.label }}
                </button>
              </div>

              <!-- 状态信息 -->
              <div class="text-xs text-slate-500 dark:text-slate-400">
                <span v-if="selectedNode"> 已选中: {{ selectedNode.name }} </span>
                <span v-else-if="loadingMessage">
                  {{ loadingMessage }}
                </span>
                <span v-else> 点击节点或拖动查看更多 </span>
              </div>
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

              <div v-if="selectedNode" class="p-5 space-y-5">
                <!-- 节点基本信息 -->
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div
                      class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center overflow-hidden"
                    >
                      <img
                        v-if="selectedNode.avatar"
                        :src="selectedNode.avatar"
                        :alt="selectedNode.name"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                      <span v-else class="text-2xl font-bold text-blue-500">{{
                        selectedNode.initials
                      }}</span>
                    </div>

                    <div
                      v-if="selectedNode.type"
                      class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      :class="getNodeTypeClass(selectedNode.type).bg"
                    >
                      <i :class="[getNodeTypeClass(selectedNode.type).icon, 'text-xs']"></i>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-800 dark:text-white text-lg">
                      {{ selectedNode.name }}
                    </h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                      {{ selectedNode.title || selectedNode.type }}
                    </p>
                    <p
                      v-if="selectedNode.institution"
                      class="text-sm text-slate-500 dark:text-slate-400"
                    >
                      {{ selectedNode.institution }}
                    </p>
                  </div>
                </div>

                <!-- 影响力指标 -->
                <div class="grid grid-cols-2 gap-3">
                  <div
                    class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl p-4 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/50"
                  >
                    <span
                      class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
                    >
                      {{ formatNumber(selectedNode.metrics?.publications || 0) }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">发表论文</span>
                  </div>

                  <div
                    class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-xl p-4 flex flex-col items-center justify-center border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <span
                      class="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                    >
                      {{ formatNumber(selectedNode.metrics?.followers || 0) }}
                    </span>
                    <span class="text-xs text-slate-600 dark:text-slate-400">关注者</span>
                  </div>
                </div>

                <!-- 研究领域 -->
                <div v-if="selectedNode.researchFields && selectedNode.researchFields.length">
                  <h5 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    研究领域
                  </h5>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="field in selectedNode.researchFields"
                      :key="field"
                      class="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80"
                    >
                      {{ field }}
                    </span>
                  </div>
                </div>

                <!-- 简介 -->
                <div v-if="selectedNode.bio">
                  <h5 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    简介
                  </h5>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    {{ selectedNode.bio }}
                  </p>
                </div>

                <!-- 操作按钮 -->
                <div class="pt-4 grid grid-cols-2 gap-3">
                  <button
                    @click="viewProfileDetail(selectedNode.id)"
                    class="flex items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-sm transition-all duration-200"
                  >
                    <i class="fas fa-user mr-2"></i>
                    查看详情
                  </button>

                  <button
                    @click="focusOnNode(selectedNode.id)"
                    class="flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-all"
                  >
                    <i class="fas fa-search mr-2"></i>
                    聚焦节点
                  </button>
                </div>

                <!-- 关联节点 -->
                <div
                  v-if="relatedNodes.length"
                  class="pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                  <h5 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
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
                          {{ node.relationshipType }} · {{ node.type }}
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
import * as echarts from 'echarts'
import { onClickOutside } from '@vueuse/core'

// 路由
const router = useRouter()

// DOM引用
const graphContainer = ref<HTMLElement | null>(null)
const optionsDropdown = ref<HTMLElement | null>(null)

// 图表实例
let chart: echarts.ECharts | null = null

// 基础状态
const loading = ref(false)
const loadingMessage = ref('')
const isDarkMode = ref(false)
const currentView = ref('graph')
const showOptionsMenu = ref(false)
const showLabels = ref(true)
const zoomLevel = ref(1)

// 图谱配置
const graphType = ref('follow') // follow, institution, research
const layoutType = ref('force')
const selectedInstitution = ref('')
const selectedResearchField = ref('')
const searchQuery = ref('')

// 数据状态
const nodeCount = ref(0)
const linkCount = ref(0)
const selectedNode = ref<any>(null)
const hoveredEdge = ref<any>(null)
const hoveredEdgePosition = ref({ x: 0, y: 0 })
const relatedNodes = ref<any[]>([])

// 界面选项
const viewOptions = [
  { label: '图谱视图', value: 'graph', icon: 'fas fa-project-diagram' },
  { label: '详情视图', value: 'detail', icon: 'fas fa-info-circle' },
  { label: '统计视图', value: 'stats', icon: 'fas fa-chart-bar' },
]

const graphTypes = [
  { label: '知识图谱', value: 'follow', icon: 'fas fa-project-diagram' },
  { label: '语言网络', value: 'institution', icon: 'fas fa-code' },
  { label: '领域网络', value: 'research', icon: 'fas fa-book' },
]

const layoutOptions = [
  { label: '力导向布局', value: 'force' },
  { label: '圆形布局', value: 'circular' },
  { label: '同心圆布局', value: 'concentric' },
  { label: '网格布局', value: 'grid' },
]

const visibilityFilters = ref([
  { id: 'users', label: '研究人员', icon: 'fas fa-user', active: true },
  { id: 'institutions', label: '机构', icon: 'fas fa-university', active: true },
  { id: 'fields', label: '研究领域', icon: 'fas fa-book', active: true },
])

// 示例数据 - 实际应用中应该从API获取
const mockNodes = [
  // 编程语言节点
  { id: 'Java', name: 'Java', category: 0, type: 'language' },
  { id: 'Python', name: 'Python', category: 0, type: 'language' },
  { id: 'C++', name: 'C++', category: 0, type: 'language' },

  // 研究领域节点
  { id: '编程', name: '编程', category: 1, type: 'field' },
  { id: '机器学习', name: '机器学习', category: 1, type: 'field' },
  { id: '深度学习', name: '深度学习', category: 1, type: 'field' },
]

const mockLinks = [
  { source: 'Java', target: '编程', label: { show: true, formatter: '属于' } },
  { source: 'Python', target: '编程', label: { show: true, formatter: '属于' } },
  { source: 'C++', target: '编程', label: { show: true, formatter: '属于' } },
  { source: 'Python', target: '机器学习', label: { show: true, formatter: '应用于' } },
  { source: 'Python', target: '深度学习', label: { show: true, formatter: '应用于' } },
]

// 机构选项
const institutionOptions = computed(() => {
  const languages = mockNodes
    .filter(node => node.type === 'language')
    .map(lang => ({
      id: lang.id,
      name: lang.name,
      count: 1,
    }))

  return languages
})

// 研究领域选项
const researchFieldOptions = computed(() => {
  const fields = mockNodes
    .filter(node => node.type === 'field')
    .map(field => ({
      id: field.id,
      name: field.name,
      count: 1,
    }))

  return fields
})

// 图谱标题
const graphTitle = computed(() => {
  switch (graphType.value) {
    case 'follow':
      return '知识图谱'
    case 'institution':
      return '编程语言网络'
    case 'research':
      return '研究领域网络'
    default:
      return '知识网络'
  }
})

// 生命周期钩子
onMounted(async () => {
  // 默认深色模式跟随系统
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDarkMode.value)

  // 初始化图表
  await nextTick()
  initializeChart()

  // 窗口大小改变时调整图表大小
  window.addEventListener('resize', handleResize)

  // 加载图谱数据
  loadGraphData()

  // 点击其他区域关闭下拉菜单
  onClickOutside(optionsDropdown, () => {
    showOptionsMenu.value = false
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)

  // 销毁图表实例
  if (chart) {
    chart.dispose()
    chart = null
  }
})

// 初始化图表
const initializeChart = () => {
  if (!graphContainer.value) return

  // 使用高性能渲染器
  const rendererType = 'canvas'

  // 创建图表实例
  chart = echarts.init(graphContainer.value, isDarkMode.value ? 'dark' : undefined, {
    renderer: rendererType,
    useDirtyRect: true,
  })

  // 注册图表事件
  chart.on('click', (params: any) => {
    if (params.dataType === 'node') {
      handleNodeClick(params.data)
    }
  })

  chart.on('mouseover', (params: any) => {
    if (params.dataType === 'edge') {
      hoveredEdge.value = params.data
      hoveredEdgePosition.value = {
        x: params.event.offsetX,
        y: params.event.offsetY - 20,
      }
    }
  })

  chart.on('mouseout', (params: any) => {
    if (params.dataType === 'edge') {
      hoveredEdge.value = null
    }
  })
}

// 加载图谱数据
const loadGraphData = async () => {
  if (!chart) return

  loading.value = true
  loadingMessage.value = '正在加载知识图谱数据...'

  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 根据图谱类型和筛选条件过滤数据
    let filteredNodes = [...mockNodes]
    let filteredLinks = [...mockLinks]

    // 应用机构筛选
    if (selectedInstitution.value) {
      const relatedNodeIds = new Set<string>()

      // 找出与所选机构相关的节点
      filteredLinks
        .filter(
          link =>
            link.source === selectedInstitution.value || link.target === selectedInstitution.value
        )
        .forEach(link => {
          relatedNodeIds.add(link.source)
          relatedNodeIds.add(link.target)
        })

      filteredNodes = filteredNodes.filter(node => relatedNodeIds.has(node.id))
      filteredLinks = filteredLinks.filter(
        link => relatedNodeIds.has(link.source) && relatedNodeIds.has(link.target)
      )
    }

    // 应用研究领域筛选
    if (selectedResearchField.value) {
      const relatedNodeIds = new Set<string>()

      // 找出与所选研究领域相关的节点
      filteredLinks
        .filter(
          link =>
            link.source === selectedResearchField.value ||
            link.target === selectedResearchField.value
        )
        .forEach(link => {
          relatedNodeIds.add(link.source)
          relatedNodeIds.add(link.target)
        })

      filteredNodes = filteredNodes.filter(node => relatedNodeIds.has(node.id))
      filteredLinks = filteredLinks.filter(
        link => relatedNodeIds.has(link.source) && relatedNodeIds.has(link.target)
      )
    }

    // 根据图谱类型过滤
    if (graphType.value === 'follow') {
      // 对于关注网络，显示所有连接
      // 这里可以根据实际需求调整筛选逻辑
    } else if (graphType.value === 'institution') {
      // 对于机构网络，可以筛选特定类型的节点
      filteredNodes = filteredNodes.filter(
        node => node.type === 'language' || node.type === 'field'
      )
    } else if (graphType.value === 'research') {
      // 对于研究领域网络，显示所有连接
      // 这里可以根据实际需求调整筛选逻辑
    }

    // 应用搜索筛选
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filteredNodes = filteredNodes.filter(
        node =>
          node.name.toLowerCase().includes(query) ||
          (node.type === 'person' && (node as any).title?.toLowerCase().includes(query)) ||
          (node.type === 'person' && (node as any).institution?.toLowerCase().includes(query)) ||
          (node.type === 'person' &&
            (node as any).researchFields?.some((field: string) =>
              field.toLowerCase().includes(query)
            ))
      )

      // 重新过滤连接
      const nodeIds = new Set(filteredNodes.map(node => node.id))
      filteredLinks = filteredLinks.filter(
        link => nodeIds.has(link.source) && nodeIds.has(link.target)
      )
    }

    // 应用可见性过滤器
    const activeFilters = visibilityFilters.value.filter(f => f.active).map(f => f.id)
    if (activeFilters.length < visibilityFilters.value.length) {
      const typeMap: Record<string, string> = {
        users: 'person',
        institutions: 'institution',
        fields: 'field',
      }

      const allowedTypes = activeFilters.map(filterId => typeMap[filterId]).filter(Boolean)
      filteredNodes = filteredNodes.filter(node => allowedTypes.includes(node.type))

      const nodeIds = new Set(filteredNodes.map(node => node.id))
      filteredLinks = filteredLinks.filter(
        link => nodeIds.has(link.source) && nodeIds.has(link.target)
      )
    }

    // 更新统计数据
    nodeCount.value = filteredNodes.length
    linkCount.value = filteredLinks.length

    // 准备图表数据
    const chartData = prepareChartData(filteredNodes, filteredLinks)

    // 更新图表
    loadingMessage.value = '正在渲染图谱...'
    updateChart(chart, chartData)
  } catch (error) {
    console.error('加载图谱数据失败:', error)
  } finally {
    loading.value = false
    loadingMessage.value = ''
  }
}

// 准备图表数据
const prepareChartData = (nodes: any[], links: any[]) => {
  // 处理节点数据
  const chartNodes = nodes.map(node => {
    const size = getNodeSize(node)
    const color = getNodeColor(node)
    const symbol = getNodeSymbol(node)

    return {
      id: node.id,
      name: node.name,
      symbolSize: size,
      itemStyle: {
        color: color,
      },
      symbol: symbol,
      category: node.category,
      // 保留原始数据
      ...node,
    }
  })

  // 处理连接数据
  const chartLinks = links.map(link => ({
    source: link.source,
    target: link.target,
    value: 1, // 默认关系强度
    lineStyle: {
      color: getLinkColor(link),
      width: getLinkWidth(link),
      type: getLinkType(link),
    },
    label: link.label,
    relationshipType: link.label?.formatter || '关联',
    ...link,
  }))

  return { nodes: chartNodes, links: chartLinks }
}

// 获取节点大小
const getNodeSize = (node: any) => {
  if (node.type === 'language') {
    return 30
  } else if (node.type === 'field') {
    return 40
  }
  return 30
}

// 获取节点颜色
const getNodeColor = (node: any) => {
  const colors = {
    language: '#3b82f6', // 蓝色
    field: '#10b981', // 绿色
  }
  return colors[node.type as keyof typeof colors] || '#6b7280'
}

// 获取节点形状
const getNodeSymbol = (node: any) => {
  const symbols = {
    language: 'circle',
    field: 'rect',
  }
  return symbols[node.type as keyof typeof symbols] || 'circle'
}

// 获取连接颜色
const getLinkColor = (link: any) => {
  const relationshipType = link.label?.formatter || link.relationshipType || '关联'
  const colors = {
    属于: '#3b82f6',
    应用于: '#10b981',
    关联: '#8b5cf6',
  }
  return colors[relationshipType as keyof typeof colors] || '#94a3b8'
}

// 获取连接宽度
const getLinkWidth = (link: any) => {
  return Math.max(1, Math.min(3, 2))
}

// 获取连接类型
const getLinkType = (link: any) => {
  const relationshipType = link.label?.formatter || link.relationshipType || '关联'
  const types = {
    属于: 'solid',
    应用于: 'solid',
    关联: 'solid',
  }
  return types[relationshipType as keyof typeof types] || 'solid'
}

// 更新图表
const updateChart = (chartInstance: echarts.ECharts, data: any) => {
  const option = {
    animationDuration: 1500,
    series: [
      {
        type: 'graph',
        layout: layoutType.value,
        data: data.nodes,
        links: data.links,
        categories: [
          { name: 0, itemStyle: { color: '#3b82f6' } },
          { name: 1, itemStyle: { color: '#10b981' } },
        ],
        roam: true,
        label: {
          show: showLabels.value,
          position: 'bottom',
          formatter: '{b}',
          fontSize: 11,
          color: isDarkMode.value ? '#e2e8f0' : '#334155',
        },
        labelLayout: {
          hideOverlap: true,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.1,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 3,
          },
        },
        force:
          layoutType.value === 'force'
            ? {
                repulsion: [100, 200],
                gravity: 0.1,
                edgeLength: [80, 150],
                layoutAnimation: true,
              }
            : undefined,
        circular:
          layoutType.value === 'circular'
            ? {
                rotateLabel: true,
              }
            : undefined,
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          return formatNodeTooltip(params.data)
        } else if (params.dataType === 'edge') {
          return formatEdgeTooltip(params.data)
        }
        return ''
      },
      backgroundColor: isDarkMode.value ? '#1e293b' : '#ffffff',
      borderColor: isDarkMode.value ? '#475569' : '#e2e8f0',
      textStyle: {
        color: isDarkMode.value ? '#e2e8f0' : '#334155',
      },
    },
  }

  chartInstance.setOption(option, true)
}

// 格式化节点提示信息
const formatNodeTooltip = (node: any) => {
  if (node.type === 'language') {
    return `
      <div class="font-bold text-lg">${node.name}</div>
      <div class="text-sm opacity-75">编程语言</div>
    `
  } else if (node.type === 'field') {
    return `
      <div class="font-bold text-lg">${node.name}</div>
      <div class="text-sm opacity-75">研究领域</div>
    `
  }
  return node.name
}

// 格式化连接提示信息
const formatEdgeTooltip = (edge: any) => {
  const relationshipType = edge.label?.formatter || edge.relationshipType || '关联'
  return `
    <div class="font-bold">${relationshipType}</div>
  `
}

// 事件处理函数
const handleNodeClick = (nodeData: any) => {
  selectedNode.value = nodeData

  // 查找关联节点
  const related = mockLinks
    .filter(link => link.source === nodeData.id || link.target === nodeData.id)
    .map(link => {
      const targetId = link.source === nodeData.id ? link.target : link.source
      const targetNode = mockNodes.find(node => node.id === targetId)

      return targetNode
        ? {
            ...targetNode,
            relationshipType: link.label?.formatter || '关联',
          }
        : null
    })
    .filter(Boolean)
    .slice(0, 10) // 限制显示数量

  relatedNodes.value = related
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

const handleSearch = debounce(() => {
  loadGraphData()
}, 300)

const handleResize = debounce(() => {
  if (chart) {
    chart.resize()
  }
}, 100)

// 控制函数
const updateLayout = () => {
  loadGraphData()
}

const refreshGraph = () => {
  loadGraphData()
}

const resetGraph = () => {
  if (chart) {
    chart.dispatchAction({
      type: 'restore',
    })
  }
  selectedNode.value = null
  relatedNodes.value = []
  zoomLevel.value = 1
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

  if (chart) {
    chart.dispose()
    initializeChart()
    loadGraphData()
  }
}

const toggleOptionsMenu = () => {
  showOptionsMenu.value = !showOptionsMenu.value
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
  if (chart) {
    chart.setOption({
      series: [
        {
          label: {
            show: showLabels.value,
          },
        },
      ],
    })
  }
}

const toggleFilter = (filterId: string) => {
  const filter = visibilityFilters.value.find(f => f.id === filterId)
  if (filter) {
    filter.active = !filter.active
    loadGraphData()
  }
}

const zoomIn = () => {
  if (chart) {
    chart.dispatchAction({
      type: 'graphRoam',
      zoom: 1.2,
    })
    zoomLevel.value = Math.min(3, zoomLevel.value * 1.2)
  }
}

const zoomOut = () => {
  if (chart) {
    chart.dispatchAction({
      type: 'graphRoam',
      zoom: 0.8,
    })
    zoomLevel.value = Math.max(0.2, zoomLevel.value * 0.8)
  }
}

const exportAsImage = () => {
  if (chart) {
    const url = chart.getDataURL({
      type: 'png',
      backgroundColor: isDarkMode.value ? '#0f172a' : '#ffffff',
      pixelRatio: 2,
    })

    const link = document.createElement('a')
    link.href = url
    link.download = `knowledge-graph-${Date.now()}.png`
    link.click()
  }
}

const exportData = () => {
  const data = {
    nodes: mockNodes,
    links: mockLinks,
    timestamp: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `knowledge-graph-data-${Date.now()}.json`
  link.click()

  URL.revokeObjectURL(url)
}

const selectNode = (nodeId: string) => {
  const node = mockNodes.find(n => n.id === nodeId)
  if (node) {
    handleNodeClick(node)

    // 在图表中高亮节点
    if (chart) {
      chart.dispatchAction({
        type: 'highlight',
        dataType: 'node',
        name: node.name,
      })
    }
  }
}

const focusOnNode = (nodeId: string) => {
  if (chart) {
    chart.dispatchAction({
      type: 'focusNodeAdjacency',
      dataType: 'node',
      seriesIndex: 0,
      dataIndex: mockNodes.findIndex(n => n.id === nodeId),
    })
  }
}

const viewProfileDetail = (nodeId: string) => {
  // 跳转到详情页
  router.push(`/research/profile/${nodeId}`)
}

// 监听器
watch([graphType, selectedInstitution, selectedResearchField], () => {
  loadGraphData()
})

watch(layoutType, () => {
  if (chart) {
    updateLayout()
  }
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
    language: {
      bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
      icon: 'fas fa-code',
    },
    field: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      icon: 'fas fa-book',
    },
  }
  return classes[type as keyof typeof classes] || classes.language
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
