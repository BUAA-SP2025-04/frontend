<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\Projects.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">科研项目</h1>
          <p class="mt-2 text-gray-600">寻找合作伙伴，推动科研进展</p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="router.push('/research/my-projects')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            我的项目
          </button>
          <button
            @click="showPublishDialog = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            发布项目
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 主内容区域 -->
        <div class="lg:col-span-3">
          <!-- 筛选和搜索栏 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- 搜索框 -->
              <div class="flex-1">
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索项目..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <!-- 分类筛选 -->
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部领域</option>
                <option value="人工智能">人工智能</option>
                <option value="机器学习">机器学习</option>
                <option value="数据科学">数据科学</option>
                <option value="计算机视觉">计算机视觉</option>
                <option value="自然语言处理">自然语言处理</option>
                <option value="生物信息学">生物信息学</option>
                <option value="物理学">物理学</option>
                <option value="化学">化学</option>
              </select>

              <!-- 项目状态 -->
              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部状态</option>
                <option value="recruiting">招募中</option>
                <option value="ongoing">进行中</option>
                <option value="completed">已完成</option>
              </select>

              <!-- 排序方式 -->
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
                <option value="urgent">紧急招募</option>
              </select>
            </div>
          </div>

          <!-- 项目列表 -->
          <div class="space-y-6">
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- 项目标题和状态 -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 
                        class="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                        @click="viewProject(project.id)"
                      >
                        {{ project.title }}
                      </h3>
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(project.status as 'recruiting' | 'ongoing' | 'completed')
                        ]"
                      >
                        {{ getStatusText(project.status) }}
                      </span>
                      <span
                        v-if="project.isUrgent"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        紧急
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="field in project.fields"
                        :key="field"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ field }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 项目描述 -->
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {{ project.description }}
                </p>

                <!-- 合作需求 -->
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">合作需求：</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="requirement in project.requirements"
                      :key="requirement"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {{ requirement }}
                    </span>
                  </div>
                </div>

                <!-- 项目负责人和时间 -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <img
                      :src="project.leader.avatar"
                      :alt="project.leader.name"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ project.leader.name }}</p>
                      <p class="text-xs text-gray-500">{{ project.leader.institution }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(project.createdAt) }}
                  </div>
                </div>

                <!-- 项目统计和操作 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                      </svg>
                      {{ project.memberCount }}/{{ project.maxMembers }} 成员
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {{ project.viewCount }} 浏览
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      {{ project.applicationCount }} 申请
                    </span>
                  </div>

                  <div class="flex space-x-3">
                    <button
                      @click="favoriteProject(project.id)"
                      :class="[
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        project.isFavorited
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                      {{ project.isFavorited ? '已收藏' : '收藏' }}
                    </button>
                    
                    <button
                      v-if="project.status === 'recruiting'"
                      @click="applyToProject(project)"
                      :disabled="project.hasApplied"
                      :class="[
                        'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        project.hasApplied
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      ]"
                    >
                      {{ project.hasApplied ? '已申请' : '申请加入' }}
                    </button>
                    
                    <button
                      @click="viewProject(project.id)"
                      class="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 热门领域 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门领域</h3>
            <div class="space-y-2">
              <button
                v-for="field in popularFields"
                :key="field.name"
                @click="selectedCategory = field.name"
                class="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span class="text-sm text-gray-700">{{ field.name }}</span>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ field.count }}</span>
              </button>
            </div>
          </div>

          <!-- 项目统计 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">项目统计</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">总项目数</span>
                <span class="font-medium">{{ projectStats.total }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">招募中</span>
                <span class="font-medium text-green-600">{{ projectStats.recruiting }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">进行中</span>
                <span class="font-medium text-blue-600">{{ projectStats.ongoing }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">已完成</span>
                <span class="font-medium text-gray-600">{{ projectStats.completed }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布项目对话框 -->
    <div v-if="showPublishDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研项目</h3>
            <button
              @click="showPublishDialog = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="publishProject" class="p-6 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 左侧：基本信息 -->
            <div class="space-y-6">
              <!-- 项目标题 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">项目标题</label>
                <input
                  v-model="newProject.title"
                  type="text"
                  placeholder="输入项目标题..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- 研究领域 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">研究领域</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span
                    v-for="field in newProject.fields"
                    :key="field"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ field }}
                    <button
                      @click="removeField(field)"
                      type="button"
                      class="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <select
                    v-model="fieldInput"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">选择研究领域</option>
                    <option value="人工智能">人工智能</option>
                    <option value="机器学习">机器学习</option>
                    <option value="数据科学">数据科学</option>
                    <option value="计算机视觉">计算机视觉</option>
                    <option value="自然语言处理">自然语言处理</option>
                    <option value="生物信息学">生物信息学</option>
                    <option value="物理学">物理学</option>
                    <option value="化学">化学</option>
                  </select>
                  <button
                    @click="addField"
                    type="button"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>

              <!-- 项目时间 -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">开始时间</label>
                  <input
                    v-model="newProject.startDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">预期结束时间</label>
                  <input
                    v-model="newProject.endDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <!-- 团队规模 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">团队规模限制</label>
                <input
                  v-model.number="newProject.maxMembers"
                  type="number"
                  min="2"
                  max="50"
                  placeholder="最大成员数量"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <!-- 紧急程度 -->
              <div>
                <label class="flex items-center">
                  <input
                    v-model="newProject.isUrgent"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">紧急招募</span>
                </label>
              </div>
            </div>

            <!-- 右侧：详细信息 -->
            <div class="space-y-6">
              <!-- 项目描述 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
                <textarea
                  v-model="newProject.description"
                  rows="6"
                  placeholder="详细描述项目背景、目标、研究内容等..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <!-- 合作需求 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">合作需求</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span
                    v-for="requirement in newProject.requirements"
                    :key="requirement"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ requirement }}
                    <button
                      @click="removeRequirement(requirement)"
                      type="button"
                      class="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="requirementInput"
                    @keyup.enter="addRequirement"
                    type="text"
                    placeholder="输入合作需求后按回车添加"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    @click="addRequirement"
                    type="button"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>

              <!-- 联系方式 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
                <textarea
                  v-model="newProject.contactInfo"
                  rows="3"
                  placeholder="提供邮箱、微信、QQ等联系方式..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              @click="showPublishDialog = false"
              type="button"
              class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              发布项目
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 申请加入对话框 -->
    <div v-if="showApplicationDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">申请加入项目</h3>
            <button
              @click="showApplicationDialog = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 项目信息 -->
        <div v-if="selectedProjectForApplication" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 class="font-medium text-gray-900 mb-2">{{ selectedProjectForApplication.title }}</h4>
          <p class="text-sm text-gray-600 line-clamp-2">{{ selectedProjectForApplication.description }}</p>
        </div>
        
        <form @submit.prevent="submitApplication" class="p-6 space-y-6">
          <!-- 申请理由 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">申请理由</label>
            <textarea
              v-model="applicationData.reason"
              rows="6"
              placeholder="说明你为什么想加入这个项目，以及你能为项目带来什么价值..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- 相关经验 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">相关经验</label>
            <textarea
              v-model="applicationData.experience"
              rows="4"
              placeholder="描述你在相关领域的经验、技能或已完成的项目..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <!-- 可投入时间 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">可投入时间</label>
            <select
              v-model="applicationData.timeCommitment"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">请选择时间投入</option>
              <option value="full-time">全职参与</option>
              <option value="part-time">兼职参与（每周20+小时）</option>
              <option value="flexible">灵活参与（每周10-20小时）</option>
              <option value="limited">有限参与（每周5-10小时）</option>
            </select>
          </div>

          <!-- 联系方式 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
            <input
              v-model="applicationData.contact"
              type="text"
              placeholder="提供邮箱、微信等联系方式"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showApplicationDialog = false"
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              提交申请
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10

// 对话框控制
const showPublishDialog = ref(false)
const showApplicationDialog = ref(false)
type Project = typeof projects.value[number]
const selectedProjectForApplication = ref<Project | null>(null)

// 发布项目表单
const newProject = ref({
  title: '',
  description: '',
  fields: [] as string[],
  requirements: [] as string[],
  startDate: '',
  endDate: '',
  maxMembers: 5,
  contactInfo: '',
  isUrgent: false
})
const fieldInput = ref('')
const requirementInput = ref('')

// 申请表单
const applicationData = ref({
  reason: '',
  experience: '',
  timeCommitment: '',
  contact: ''
})

// 模拟项目数据
const projects = ref([
  {
    id: 1,
    title: '基于深度学习的医学图像分析系统',
    description: '我们正在开发一个用于医学影像诊断的深度学习系统，主要针对肺部CT扫描进行病灶检测和分类。项目已获得医院伦理委员会批准，拥有丰富的标注数据集。目前需要在模型优化、用户界面设计和临床验证方面寻求合作伙伴。',
    fields: ['人工智能', '医学影像', '深度学习'],
    requirements: ['Python/PyTorch经验', '医学背景', 'UI/UX设计', '临床试验经验'],
    status: 'recruiting',
    leader: {
      id: 1,
      name: '张医生',
      avatar: '/images/avatar/1.png',
      institution: '北京协和医院'
    },
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    maxMembers: 8,
    memberCount: 3,
    createdAt: '2025-06-20T10:00:00',
    viewCount: 245,
    applicationCount: 12,
    isUrgent: true,
    isFavorited: false,
    hasApplied: false,
    contactInfo: 'zhangdoctor@hospital.com'
  },
  {
    id: 2,
    title: '量子计算在密码学中的应用研究',
    description: '研究量子算法对现有密码系统的影响，开发抗量子密码算法。项目与国家密码实验室合作，具有重要的理论价值和实际意义。寻找在量子物理、密码学和算法设计方面有经验的研究者。',
    fields: ['量子计算', '密码学', '算法设计'],
    requirements: ['量子物理基础', '密码学理论', '数学建模', '论文写作'],
    status: 'recruiting',
    leader: {
      id: 2,
      name: '李教授',
      avatar: '/images/avatar/2.png',
      institution: '清华大学'
    },
    startDate: '2025-08-01',
    endDate: '2026-07-31',
    maxMembers: 6,
    memberCount: 2,
    createdAt: '2025-06-18T14:30:00',
    viewCount: 189,
    applicationCount: 8,
    isUrgent: false,
    isFavorited: true,
    hasApplied: false,
    contactInfo: 'li.prof@tsinghua.edu.cn'
  },
  {
    id: 3,
    title: '智能农业监测无人机系统',
    description: '开发基于无人机的农业监测系统，集成多光谱成像、AI图像分析和自动飞行控制。项目目标是提高农作物监测效率，实现精准农业。现寻求在无人机技术、图像处理和农业科学方面的合作者。',
    fields: ['无人机技术', '计算机视觉', '精准农业'],
    requirements: ['无人机开发', '图像处理', '农业知识', '嵌入式系统'],
    status: 'ongoing',
    leader: {
      id: 3,
      name: '王工程师',
      avatar: '/images/avatar/3.png',
      institution: '中国农业大学'
    },
    startDate: '2025-05-01',
    endDate: '2025-10-31',
    maxMembers: 10,
    memberCount: 7,
    createdAt: '2025-06-15T09:15:00',
    viewCount: 156,
    applicationCount: 15,
    isUrgent: false,
    isFavorited: false,
    hasApplied: true,
    contactInfo: 'wang.engineer@cau.edu.cn'
  },
  {
    id: 4,
    title: '基于区块链的学术成果认证平台',
    description: '构建一个去中心化的学术成果认证和版权保护平台，利用区块链技术确保研究成果的原创性和时间戳记录。平台将支持论文、专利、数据集等多种学术成果的认证。',
    fields: ['区块链', '学术认证', '去中心化'],
    requirements: ['区块链开发', 'Web3技术', '智能合约', '前端开发'],
    status: 'recruiting',
    leader: {
      id: 4,
      name: '陈研究员',
      avatar: '/images/avatar/4.png',
      institution: '中科院计算所'
    },
    startDate: '2025-07-15',
    endDate: '2026-01-15',
    maxMembers: 5,
    memberCount: 1,
    createdAt: '2025-06-12T16:45:00',
    viewCount: 203,
    applicationCount: 6,
    isUrgent: true,
    isFavorited: false,
    hasApplied: false,
    contactInfo: 'chen.researcher@ict.ac.cn'
  },
  {
    id: 5,
    title: '自然语言处理在法律文书分析中的应用',
    description: '开发基于NLP技术的法律文书智能分析系统，能够自动提取关键信息、分类案件类型、预测判决结果。项目已与多家律师事务所建立合作关系，具有良好的商业前景。',
    fields: ['自然语言处理', '法律科技', '机器学习'],
    requirements: ['NLP技术', '法律知识', '数据挖掘', '产品设计'],
    status: 'recruiting',
    leader: {
      id: 5,
      name: '赵律师',
      avatar: '/images/avatar/5.png',
      institution: '北京大学法学院'
    },
    startDate: '2025-06-30',
    endDate: '2025-12-30',
    maxMembers: 6,
    memberCount: 2,
    createdAt: '2025-06-10T11:20:00',
    viewCount: 178,
    applicationCount: 9,
    isUrgent: false,
    isFavorited: true,
    hasApplied: false,
    contactInfo: 'zhao.lawyer@pku.edu.cn'
  }
])

// 热门领域
const popularFields = ref([
  { name: '人工智能', count: 23 },
  { name: '机器学习', count: 18 },
  { name: '数据科学', count: 15 },
  { name: '区块链', count: 12 },
  { name: '计算机视觉', count: 10 },
  { name: '自然语言处理', count: 8 },
  { name: '量子计算', count: 5 },
  { name: '生物信息学', count: 7 }
])

// 项目统计
const projectStats = ref({
  total: 156,
  recruiting: 67,
  ongoing: 78,
  completed: 11
})

// 计算属性
const filteredProjects = computed(() => {
  let filtered = projects.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.fields.some(field => field.toLowerCase().includes(query)) ||
      p.requirements.some(req => req.toLowerCase().includes(query))
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.fields.includes(selectedCategory.value))
  }

  // 状态过滤
  if (selectedStatus.value) {
    filtered = filtered.filter(p => p.status === selectedStatus.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => (b.viewCount + b.applicationCount) - (a.viewCount + a.applicationCount))
      break
    case 'urgent':
      filtered.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1
        if (!a.isUrgent && b.isUrgent) return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      break
  }

  // 分页
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = projects.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.fields.some(field => field.toLowerCase().includes(query))
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.fields.includes(selectedCategory.value))
  }
  if (selectedStatus.value) {
    filtered = filtered.filter(p => p.status === selectedStatus.value)
  }
  return Math.ceil(filtered.length / itemsPerPage)
})

// 方法
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const getStatusColor = (status: 'recruiting' | 'ongoing' | 'completed') => {
  const colors = {
    recruiting: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return colors[status] || colors.recruiting
}

const getStatusText = (status: string) => {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成'
  }
  return texts[status as keyof typeof texts] || texts.recruiting
}

const addField = () => {
  const field = fieldInput.value.trim()
  if (field && !newProject.value.fields.includes(field)) {
    newProject.value.fields.push(field)
    fieldInput.value = ''
  }
}

const removeField = (field: string) => {
  const index = newProject.value.fields.indexOf(field)
  if (index > -1) {
    newProject.value.fields.splice(index, 1)
  }
}

const addRequirement = () => {
  const requirement = requirementInput.value.trim()
  if (requirement && !newProject.value.requirements.includes(requirement)) {
    newProject.value.requirements.push(requirement)
    requirementInput.value = ''
  }
}

const removeRequirement = (requirement: string) => {
  const index = newProject.value.requirements.indexOf(requirement)
  if (index > -1) {
    newProject.value.requirements.splice(index, 1)
  }
}

const publishProject = () => {
  // 模拟发布项目
  const project = {
    id: Date.now(),
    title: newProject.value.title,
    description: newProject.value.description,
    fields: [...newProject.value.fields],
    requirements: [...newProject.value.requirements],
    status: 'recruiting',
    leader: {
      id: 999,
      name: '当前用户',
      avatar: '/images/avatar/default.png',
      institution: '我的大学'
    },
    startDate: newProject.value.startDate,
    endDate: newProject.value.endDate,
    maxMembers: newProject.value.maxMembers,
    memberCount: 1,
    createdAt: new Date().toISOString(),
    viewCount: 0,
    applicationCount: 0,
    isUrgent: newProject.value.isUrgent,
    isFavorited: false,
    hasApplied: false,
    contactInfo: newProject.value.contactInfo
  }

  projects.value.unshift(project)
  
  // 重置表单
  newProject.value = {
    title: '',
    description: '',
    fields: [],
    requirements: [],
    startDate: '',
    endDate: '',
    maxMembers: 5,
    contactInfo: '',
    isUrgent: false
  }
  
  showPublishDialog.value = false
  ElMessage.success('项目发布成功！')
}

const applyToProject = (project: any) => {
  selectedProjectForApplication.value = project
  showApplicationDialog.value = true
}

const submitApplication = () => {
  if (selectedProjectForApplication.value) {
    selectedProjectForApplication.value.hasApplied = true
    selectedProjectForApplication.value.applicationCount++
    
    // 重置表单
    applicationData.value = {
      reason: '',
      experience: '',
      timeCommitment: '',
      contact: ''
    }
    
    showApplicationDialog.value = false
    ElMessage.success('申请提交成功！项目负责人将会尽快回复。')
  }
}

const favoriteProject = (projectId: number) => {
  const project = projects.value.find(p => p.id === projectId)
  if (project) {
    project.isFavorited = !project.isFavorited
    ElMessage.success(project.isFavorited ? '收藏成功' : '取消收藏')
  }
}

const viewProject = (projectId: number) => {
  router.push(`/research/projects/${projectId}`)
}

onMounted(() => {
  // 页面初始化
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>