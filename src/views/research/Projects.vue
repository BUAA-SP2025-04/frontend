<!-- eslint-disable vue/attributes-order -->
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
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            @click="router.push('/research/my-projects')"
          >
            我的项目
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            @click="showPublishDialog = true"
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
                d="M12 4v16m8-8H4"
              ></path>
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
                  <svg
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
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
            <!-- 加载状态 -->
            <div v-if="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span class="ml-3 text-gray-600">加载中...</span>
            </div>

            <!-- 空状态 -->
            <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
              <p class="mt-1 text-sm text-gray-500">没有找到符合条件的项目</p>
            </div>

            <!-- 项目列表 -->
            <div
              v-else
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
                          getStatusColor(getProjectStatus(project)),
                        ]"
                      >
                        {{ getStatusText(getProjectStatus(project)) }}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="field in project.researchArea.split(',')"
                        :key="field"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ field.trim() }}
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
                      v-for="requirement in project.collaborationCondition.split(',')"
                      :key="requirement"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {{ requirement.trim() }}
                    </span>
                  </div>
                </div>

                <!-- 项目负责人和时间 -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <img
                      :src="project.owner.imgUrl"
                      :alt="project.owner.name"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ project.owner.name }}</p>
                      <p class="text-xs text-gray-500">{{ project.owner.institution }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">发布于 {{ formatTime(project.createAt) }}</div>
                </div>

                <!-- 项目统计和操作 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        ></path>
                      </svg>
                      {{ project.recruitedNum }}/{{ project.recruitNum }} 成员
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                      </svg>
                      {{ project.applyNum }} 申请
                    </span>
                  </div>

                  <div class="flex space-x-3">
                    <button
                      class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      @click="shareProject(project)"
                    >
                      <svg
                        class="w-4 h-4 inline-block mr-1"
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

                    <button
                      v-if="getProjectStatus(project) === 'recruiting'"
                      class="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      @click="applyToProject(project)"
                    >
                      申请加入
                    </button>

                    <button
                      class="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      @click="viewProjectDetail(project)"
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
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = page"
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
                class="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                @click="selectedCategory = field.name"
              >
                <span class="text-sm text-gray-700">{{ field.name }}</span>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{
                  field.count
                }}</span>
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
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研项目</h3>
            <button class="text-gray-400 hover:text-gray-600" @click="showPublishDialog = false">
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
        </div>

        <form class="p-6 space-y-6" @submit.prevent="publishProject">
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
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.title ? 'border-red-300' : 'border-gray-300',
                  ]"
                  required
                  @input="validateTitle"
                />
                <div class="flex justify-between items-center mt-1">
                  <p v-if="formErrors.title" class="text-sm text-red-600">{{ formErrors.title }}</p>
                  <p class="text-xs text-gray-500 ml-auto">{{ newProject.title.length }}/20</p>
                </div>
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
                      type="button"
                      class="ml-1 text-blue-600 hover:text-blue-800"
                      @click="removeField(field)"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <select
                    v-model="fieldInput"
                    :class="[
                      'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      formErrors.fields ? 'border-red-300' : 'border-gray-300',
                    ]"
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
                    type="button"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    @click="addField"
                  >
                    添加
                  </button>
                </div>
                <p v-if="formErrors.fields" class="mt-1 text-sm text-red-600">
                  {{ formErrors.fields }}
                </p>
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
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.maxMembers ? 'border-red-300' : 'border-gray-300',
                  ]"
                  required
                />
                <p v-if="formErrors.maxMembers" class="mt-1 text-sm text-red-600">
                  {{ formErrors.maxMembers }}
                </p>
              </div>
              <!-- 联系方式 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
                <textarea
                  v-model="newProject.contactInfo"
                  rows="3"
                  placeholder="提供邮箱、微信、QQ等联系方式..."
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.contactInfo ? 'border-red-300' : 'border-gray-300',
                  ]"
                  required
                ></textarea>
                <div class="flex justify-between items-center mt-1">
                  <p v-if="formErrors.contactInfo" class="text-sm text-red-600">
                    {{ formErrors.contactInfo }}
                  </p>
                  <p class="text-xs text-gray-500 ml-auto">
                    {{ newProject.contactInfo.length }}/200
                  </p>
                </div>
              </div>
            </div>

            <!-- 右侧：详细信息 -->
            <div class="space-y-6">
              <!-- 项目时间 -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">开始时间</label>
                  <input
                    v-model="newProject.startDate"
                    type="date"
                    :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      formErrors.startDate ? 'border-red-300' : 'border-gray-300',
                    ]"
                    required
                  />
                  <p v-if="formErrors.startDate" class="mt-1 text-sm text-red-600">
                    {{ formErrors.startDate }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">预期结束时间</label>
                  <input
                    v-model="newProject.endDate"
                    type="date"
                    :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      formErrors.endDate ? 'border-red-300' : 'border-gray-300',
                    ]"
                    required
                  />
                  <p v-if="formErrors.endDate" class="mt-1 text-sm text-red-600">
                    {{ formErrors.endDate }}
                  </p>
                </div>
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
                      type="button"
                      class="ml-1 text-green-600 hover:text-green-800"
                      @click="removeRequirement(requirement)"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="requirementInput"
                    type="text"
                    placeholder="输入合作需求后按回车添加"
                    :class="[
                      'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                      formErrors.requirements ? 'border-red-300' : 'border-gray-300',
                    ]"
                    @keyup.enter="addRequirement"
                  />
                  <button
                    type="button"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    @click="addRequirement"
                  >
                    添加
                  </button>
                </div>
                <p v-if="formErrors.requirements" class="mt-1 text-sm text-red-600">
                  {{ formErrors.requirements }}
                </p>
              </div>
              <!-- 项目描述 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
                <textarea
                  v-model="newProject.description"
                  rows="6"
                  placeholder="详细描述项目背景、目标、研究内容等..."
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.description ? 'border-red-300' : 'border-gray-300',
                  ]"
                ></textarea>
                <div class="flex justify-between items-center mt-1">
                  <p v-if="formErrors.description" class="text-sm text-red-600">
                    {{ formErrors.description }}
                  </p>
                  <p class="text-xs text-gray-500 ml-auto">
                    {{ newProject.description.length }}/300
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              @click="showPublishDialog = false"
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
    <div
      v-if="showApplicationDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">申请加入项目</h3>
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="showApplicationDialog = false"
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
        </div>

        <!-- 项目信息 -->
        <div
          v-if="selectedProjectForApplication"
          class="px-6 py-4 bg-gray-50 border-b border-gray-200"
        >
          <h4 class="font-medium text-gray-900 mb-2">{{ selectedProjectForApplication.title }}</h4>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ selectedProjectForApplication.description }}
          </p>
        </div>

        <form class="p-6 space-y-6" @submit.prevent="submitApplication">
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
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              @click="showApplicationDialog = false"
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

    <!-- 项目详情对话框 -->
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      @close="showProjectDetail = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { addProject, getAllProjects } from '@/api/modules/project'
import type { Project } from '@/api/types/project'
import ProjectDetailCard from '@/components/ProjectDetailCard.vue'

// 为ProjectDetailCard组件定义项目类型
interface DetailProject {
  id: number
  title: string
  description: string
  fields: string[]
  requirements: string[]
  status: string
  maxMembers: number
  memberCount: number
  applicationCount: number
  viewCount: number
  isUrgent?: boolean
  createdAt: string
  updatedAt: string
  startDate?: string
  endDate?: string
  contactInfo?: string
}

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
const showProjectDetail = ref(false)
const selectedProjectForApplication = ref<Project | null>(null)
const selectedProjectForDetail = ref<DetailProject | null>(null)

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
  isUrgent: false,
})
const fieldInput = ref('')
const requirementInput = ref('')

// 申请表单
const applicationData = ref({
  reason: '',
  experience: '',
  timeCommitment: '',
  contact: '',
})

// 表单校验错误信息
const formErrors = ref({
  title: '',
  fields: '',
  maxMembers: '',
  contactInfo: '',
  startDate: '',
  endDate: '',
  description: '',
  requirements: '',
})

// 项目数据
const projects = ref<Project[]>([])
const loading = ref(false)

// 热门领域
const popularFields = ref([
  { name: '人工智能', count: 23 },
  { name: '机器学习', count: 18 },
  { name: '数据科学', count: 15 },
  { name: '区块链', count: 12 },
  { name: '计算机视觉', count: 10 },
  { name: '自然语言处理', count: 8 },
  { name: '量子计算', count: 5 },
  { name: '生物信息学', count: 7 },
])

// 项目统计
const projectStats = ref({
  total: 0,
  recruiting: 0,
  ongoing: 0,
  completed: 0,
})

// 获取所有项目
const loadProjects = async () => {
  loading.value = true
  try {
    const response = await getAllProjects()
    projects.value = response.projects
    updateProjectStats()
  } catch (error) {
    console.error('获取项目列表失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 更新项目统计
const updateProjectStats = () => {
  projectStats.value.total = projects.value.length
  projectStats.value.recruiting = projects.value.filter(
    p => getProjectStatus(p) === 'recruiting'
  ).length
  projectStats.value.ongoing = projects.value.filter(p => getProjectStatus(p) === 'ongoing').length
  projectStats.value.completed = projects.value.filter(
    p => getProjectStatus(p) === 'completed'
  ).length
}

// 计算属性
const filteredProjects = computed(() => {
  let filtered = projects.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.researchArea.toLowerCase().includes(query) ||
        p.collaborationCondition.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.researchArea.includes(selectedCategory.value))
  }

  // 状态过滤
  if (selectedStatus.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === selectedStatus.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => parseInt(b.applyNum) - parseInt(a.applyNum))
      break
    case 'urgent':
      filtered.sort((a, b) => {
        if (isProjectUrgent(a) && !isProjectUrgent(b)) return -1
        if (!isProjectUrgent(a) && isProjectUrgent(b)) return 1
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
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
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.researchArea.toLowerCase().includes(query)
    )
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.researchArea.includes(selectedCategory.value))
  }
  if (selectedStatus.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === selectedStatus.value)
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
    day: 'numeric',
  }).format(date)
}

// 根据时间和招募人数计算项目状态
const getProjectStatus = (project: Project): 'recruiting' | 'ongoing' | 'completed' => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const endTime = new Date(project.endTime)

  // 如果还没开始
  if (now < startTime) {
    return 'recruiting'
  }

  // 如果已经结束
  if (now > endTime) {
    return 'completed'
  }

  // 如果正在进行中
  if (now >= startTime && now <= endTime) {
    // 如果招募人数已满，则为进行中
    if (project.recruitedNum >= project.recruitNum) {
      return 'ongoing'
    }
    // 否则仍在招募中
    return 'recruiting'
  }

  return 'recruiting'
}

// 判断项目是否紧急（招募人数不足且接近开始时间）
const isProjectUrgent = (project: Project): boolean => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const daysUntilStart = Math.ceil((startTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  // 如果距离开始时间不到30天，且招募人数不足一半，则认为是紧急的
  return daysUntilStart <= 30 && project.recruitedNum < project.recruitNum / 2
}

const getStatusColor = (status: 'recruiting' | 'ongoing' | 'completed') => {
  const colors = {
    recruiting: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || colors.recruiting
}

const getStatusText = (status: string) => {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成',
  }
  return texts[status as keyof typeof texts] || texts.recruiting
}

const addField = () => {
  const field = fieldInput.value.trim()
  if (!field) {
    ElMessage.warning('请输入研究领域')
    return
  }

  if (newProject.value.fields.includes(field)) {
    ElMessage.warning('该研究领域已存在')
    return
  }

  if (newProject.value.fields.length >= 5) {
    ElMessage.warning('研究领域最多只能添加5个')
    return
  }

  newProject.value.fields.push(field)
  fieldInput.value = ''
  formErrors.value.fields = ''
}

const removeField = (field: string) => {
  const index = newProject.value.fields.indexOf(field)
  if (index > -1) {
    newProject.value.fields.splice(index, 1)
  }
}

const addRequirement = () => {
  const requirement = requirementInput.value.trim()
  if (!requirement) {
    ElMessage.warning('请输入合作需求')
    return
  }

  if (requirement.length > 50) {
    ElMessage.warning('单个合作需求不能超过50字')
    return
  }

  if (newProject.value.requirements.includes(requirement)) {
    ElMessage.warning('该合作需求已存在')
    return
  }

  if (newProject.value.requirements.length >= 5) {
    ElMessage.warning('合作需求最多只能添加5个')
    return
  }

  newProject.value.requirements.push(requirement)
  requirementInput.value = ''
  formErrors.value.requirements = ''
}

const removeRequirement = (requirement: string) => {
  const index = newProject.value.requirements.indexOf(requirement)
  if (index > -1) {
    newProject.value.requirements.splice(index, 1)
  }
}

const publishProject = async () => {
  // 表单验证
  if (!validateForm()) {
    ElMessage.error('请检查表单填写是否正确')
    return
  }

  try {
    // 准备API请求数据
    const projectData = {
      title: newProject.value.title.trim(),
      description: newProject.value.description.trim(),
      collaborationCondition: newProject.value.requirements.join(','), // 转换为逗号分隔的字符串
      researchArea: newProject.value.fields.join(','), // 转换为逗号分隔的字符串
      startTime: newProject.value.startDate + ' 00:00:00', // 添加时分秒
      endTime: newProject.value.endDate + ' 00:00:00', // 添加时分秒
      recruitNum: newProject.value.maxMembers,
      urgent: newProject.value.isUrgent,
      contact: newProject.value.contactInfo.trim(),
    }

    // 调用API
    await addProject(projectData)

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
      isUrgent: false,
    }

    // 清空输入框
    fieldInput.value = ''
    requirementInput.value = ''

    // 清除错误信息
    clearErrors()

    showPublishDialog.value = false
    ElMessage.success('项目发布成功！')

    // 重新加载项目列表
    // await loadProjects()
  } catch (error) {
    console.error('发布项目失败:', error)
    ElMessage.error('发布项目失败，请稍后重试')
  }
}

const applyToProject = (project: Project) => {
  selectedProjectForApplication.value = project
  showApplicationDialog.value = true
}

const submitApplication = () => {
  if (selectedProjectForApplication.value) {
    // 重置表单
    applicationData.value = {
      reason: '',
      experience: '',
      timeCommitment: '',
      contact: '',
    }

    showApplicationDialog.value = false
    ElMessage.success('申请提交成功！项目负责人将会尽快回复。')
  }
}

const shareProject = (project: Project) => {
  // 复制项目链接到剪贴板
  const projectUrl = `${window.location.origin}/research/projects/${project.id}`
  navigator.clipboard
    .writeText(projectUrl)
    .then(() => {
      ElMessage.success('项目链接已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败，请手动复制链接')
    })
}

const viewProject = (projectId: string) => {
  router.push(`/research/projects/${projectId}`)
}

const viewProjectDetail = (project: Project) => {
  // 转换API的Project类型为ProjectDetailCard组件期望的格式
  const adaptedProject: DetailProject = {
    id: parseInt(project.id),
    title: project.title,
    description: project.description,
    fields: project.researchArea.split(',').map(field => field.trim()),
    requirements: project.collaborationCondition.split(',').map(req => req.trim()),
    status: getProjectStatus(project),
    maxMembers: project.recruitNum,
    memberCount: project.recruitedNum,
    applicationCount: parseInt(project.applyNum),
    viewCount: 0, // API中没有这个字段，设为0
    createdAt: project.createAt,
    updatedAt: project.createAt, // API中没有updatedAt，使用createAt
    startDate: project.startTime,
    endDate: project.endTime,
    contactInfo: project.contact,
  }

  selectedProjectForDetail.value = adaptedProject
  showProjectDetail.value = true
}

// 清除所有错误信息
const clearErrors = () => {
  formErrors.value = {
    title: '',
    fields: '',
    maxMembers: '',
    contactInfo: '',
    startDate: '',
    endDate: '',
    description: '',
    requirements: '',
  }
}

// 验证标题
const validateTitle = () => {
  if (!newProject.value.title.trim()) {
    formErrors.value.title = '项目标题不能为空'
    return false
  }
  if (newProject.value.title.length > 20) {
    formErrors.value.title = '项目标题不能超过20字'
    return false
  }
  formErrors.value.title = ''
  return true
}

// 验证研究领域
const validateFields = () => {
  if (newProject.value.fields.length === 0) {
    formErrors.value.fields = '请至少选择一个研究领域'
    return false
  }
  if (newProject.value.fields.length > 5) {
    formErrors.value.fields = '研究领域最多只能添加5个'
    return false
  }
  formErrors.value.fields = ''
  return true
}

// 验证团队规模
const validateMaxMembers = () => {
  const value = newProject.value.maxMembers
  if (!value || value < 2) {
    newProject.value.maxMembers = 2
    ElMessage.warning('团队规模最小为2人，已自动调整')
    return false
  }
  if (value > 50) {
    newProject.value.maxMembers = 50
    ElMessage.warning('团队规模最大为50人，已自动调整')
    return false
  }
  formErrors.value.maxMembers = ''
  return true
}

// 验证联系方式
const validateContactInfo = () => {
  if (!newProject.value.contactInfo.trim()) {
    formErrors.value.contactInfo = '联系方式不能为空'
    return false
  }
  if (newProject.value.contactInfo.length > 200) {
    formErrors.value.contactInfo = '联系方式不能超过200字'
    return false
  }
  formErrors.value.contactInfo = ''
  return true
}

// 验证时间
const validateDates = () => {
  if (!newProject.value.startDate) {
    formErrors.value.startDate = '请选择开始时间'
    return false
  }
  if (!newProject.value.endDate) {
    formErrors.value.endDate = '请选择结束时间'
    return false
  }

  const startDate = new Date(newProject.value.startDate)
  const endDate = new Date(newProject.value.endDate)

  if (endDate <= startDate) {
    formErrors.value.endDate = '结束时间不能早于或等于开始时间'
    return false
  }

  formErrors.value.startDate = ''
  formErrors.value.endDate = ''
  return true
}

// 验证项目描述
const validateDescription = () => {
  if (newProject.value.description.length > 300) {
    formErrors.value.description = '项目描述不能超过300字'
    return false
  }
  formErrors.value.description = ''
  return true
}

// 验证合作需求
const validateRequirements = () => {
  if (newProject.value.requirements.length > 5) {
    formErrors.value.requirements = '合作需求最多只能添加5个'
    return false
  }

  // 检查每个需求的长度
  for (const requirement of newProject.value.requirements) {
    if (requirement.length > 50) {
      formErrors.value.requirements = '单个合作需求不能超过50字'
      return false
    }
  }

  formErrors.value.requirements = ''
  return true
}

// 完整表单验证
const validateForm = () => {
  clearErrors()

  const validations = [
    validateTitle(),
    validateFields(),
    validateMaxMembers(),
    validateContactInfo(),
    validateDates(),
    validateDescription(),
    validateRequirements(),
  ]

  return validations.every(v => v)
}

onMounted(() => {
  // 页面初始化时加载项目列表
  loadProjects()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
