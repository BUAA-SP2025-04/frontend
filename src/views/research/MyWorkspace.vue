<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">项目管理</h1>
          <p class="mt-2 text-gray-600">管理你的项目、申请和参与情况</p>
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          @click="showPublishDialog = true"
        >
          发布新项目
        </button>
      </div>

      <!-- 标签页 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <el-tabs v-model="activeTab" class="project-tabs" @tab-click="handleTabClick">
          <el-tab-pane label="我创建的项目" name="created">
            <div class="p-6">
              <!-- 搜索与筛选合并一栏 -->
              <div
                class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6"
              >
                <input
                  v-model="createdSearch"
                  type="text"
                  placeholder="搜索项目标题、描述、领域..."
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  v-model="projectStatusFilter"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部状态</option>
                  <option value="recruiting">招募中</option>
                  <option value="ongoing">进行中</option>
                  <option value="completed">已完成</option>
                  <option value="pending">待开始</option>
                </select>
              </div>
              <!-- 我创建的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我创建的项目</h3>
                  <span class="text-sm text-gray-500">共 {{ myProjects.length }} 个项目</span>
                </div>

                <!-- 项目列表 -->
                <div class="space-y-6">
                  <!-- 加载状态 -->
                  <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">正在加载项目数据...</span>
                  </div>

                  <!-- 空状态 -->
                  <div
                    v-else-if="filteredMyProjects.length === 0"
                    class="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center"
                  >
                    <svg
                      class="w-16 h-16 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      ></path>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
                    <p class="text-gray-500 mb-4">你还没有发布任何项目</p>
                    <button
                      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      @click="showPublishDialog = true"
                    >
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      发布第一个项目
                    </button>
                  </div>

                  <!-- 项目列表 -->
                  <div
                    v-for="project in filteredMyProjects"
                    :key="project.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div class="p-6">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
                            <span
                              :class="[
                                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                getStatusColor(getProjectStatus(project)),
                              ]"
                            >
                              {{ getStatusText(getProjectStatus(project)) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span
                              v-for="field in (project.researchArea || '')
                                .split(',')
                                .map(f => f.trim())
                                .filter(f => f)"
                              :key="field"
                              class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {{ field }}
                            </span>
                          </div>
                        </div>
                        <div class="flex space-x-2">
                          <button
                            class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            @click="editProject"
                          >
                            编辑
                          </button>
                          <button
                            class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                            @click="deleteProject(project.id)"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                      <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>
                      <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            ></path>
                          </svg>
                          {{ project.applyNum }} 申请
                          <span
                            v-if="
                              !loading &&
                              project.applications &&
                              Array.isArray(project.applications) &&
                              project.applications.filter(
                                app => app && app.applicant && app.status === 'unhandled'
                              ).length > 0
                            "
                            class="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full"
                          >
                            {{
                              project.applications.filter(
                                app => app && app.applicant && app.status === 'unhandled'
                              ).length
                            }}
                          </span>
                        </span>
                      </div>
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="flex space-x-3">
                          <button
                            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            @click="openApplicationsDialog(project)"
                          >
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              ></path>
                            </svg>
                            管理申请 ({{ project.applyNum }})
                          </button>
                        </div>
                        <div class="text-sm text-gray-500">
                          发布于 {{ formatTime(project.createdAt) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="我的申请" name="applied">
            <div class="p-6">
              <!-- 搜索与筛选合并一栏 -->
              <div
                class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6"
              >
                <input
                  v-model="appliedSearch"
                  type="text"
                  placeholder="搜索项目标题、描述、领域..."
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  v-model="applicationStatusFilter"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部状态</option>
                  <option value="unhandled">待处理</option>
                  <option value="accepted">已通过</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
              <!-- 我申请的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我的申请</h3>
                  <span class="text-sm text-gray-500">共 {{ myApplications.length }} 个申请</span>
                </div>

                <!-- 申请列表 -->
                <div class="space-y-6">
                  <!-- 加载状态 -->
                  <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">正在加载申请数据...</span>
                  </div>

                  <!-- 空状态 -->
                  <div
                    v-else-if="filteredMyApplications.length === 0"
                    class="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center"
                  >
                    <svg
                      class="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                    <h3 class="text-lg font-medium text-gray-900 mb-2">暂无申请</h3>
                    <p class="text-gray-500 mb-4">你还没有申请任何项目</p>
                    <button
                      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      @click="router.push('/research/projects')"
                    >
                      <svg
                        class="w-5 h-5 mr-2"
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
                      浏览项目
                    </button>
                  </div>

                  <!-- 申请列表 -->
                  <div
                    v-for="application in filteredMyApplications"
                    :key="application.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div class="p-6">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-xl font-semibold text-gray-900">
                              {{ application.project.title }}
                            </h3>
                            <span
                              :class="[
                                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                getApplicationStatusColor(application.status),
                              ]"
                            >
                              {{ getApplicationStatusText(application.status) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span
                              v-for="field in (application.project.researchArea || '').split(',')"
                              :key="field"
                              class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {{ field.trim() }}
                            </span>
                          </div>
                        </div>
                        <div class="flex space-x-2">
                          <button
                            v-if="application.status === 'unhandled'"
                            class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                            @click="cancelApplication(application.id)"
                          >
                            取消申请
                          </button>
                        </div>
                      </div>
                      <p class="text-gray-600 mb-4 line-clamp-2">
                        {{ application.project.description }}
                      </p>
                      <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                          {{ application.project.owner.name }}
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          申请于 {{ formatTime(application.createdAt) }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="text-sm text-gray-600">
                          <p><strong>申请理由：</strong>{{ application.reason }}</p>
                          <p class="mt-1">
                            <strong>相关经验：</strong>{{ application.experience }}
                          </p>
                        </div>
                        <div class="flex space-x-3">
                          <button
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            @click="viewProjectDetail(application.project.id)"
                          >
                            查看项目详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="我加入的项目" name="joined">
            <div class="p-6">
              <!-- 搜索与筛选合并一栏 -->
              <div
                class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6"
              >
                <input
                  v-model="joinedSearch"
                  type="text"
                  placeholder="搜索项目标题、描述、领域..."
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  v-model="joinedProjectStatusFilter"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">全部状态</option>
                  <option value="recruiting">招募中</option>
                  <option value="ongoing">进行中</option>
                  <option value="completed">已完成</option>
                  <option value="pending">待开始</option>
                </select>
              </div>
              <!-- 我加入的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我加入的项目</h3>
                  <span class="text-sm text-gray-500">共 {{ myJoinedProjects.length }} 个项目</span>
                </div>

                <!-- 项目列表 -->
                <div class="space-y-6">
                  <!-- 加载状态 -->
                  <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">正在加载我加入的项目...</span>
                  </div>

                  <!-- 空状态 -->
                  <div
                    v-else-if="filteredMyJoinedProjects.length === 0"
                    class="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center"
                  >
                    <svg
                      class="w-16 h-16 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">暂无加入的项目</h3>
                    <p class="text-gray-500 mb-4">你还没有加入任何项目</p>
                    <button
                      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      @click="router.push('/research/projects')"
                    >
                      <svg
                        class="w-5 h-5 mr-2"
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
                      浏览项目
                    </button>
                  </div>

                  <!-- 项目列表 -->
                  <div
                    v-for="project in filteredMyJoinedProjects"
                    :key="project.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div class="p-6">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
                            <span
                              :class="[
                                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                getStatusColor(getProjectStatus(project)),
                              ]"
                            >
                              {{ getStatusText(getProjectStatus(project)) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span
                              v-for="field in (project.researchArea || '')
                                .split(',')
                                .map(f => f.trim())
                                .filter(f => f)"
                              :key="field"
                              class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {{ field }}
                            </span>
                          </div>
                        </div>
                        <div class="flex space-x-2">
                          <button
                            class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                            @click="quitProject(project.id)"
                          >
                            退出项目
                          </button>
                        </div>
                      </div>
                      <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>
                      <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                          {{ project.owner.name }}
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                          {{ project.recruitedNum }}/{{ project.recruitNum }} 成员
                        </span>
                      </div>
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="text-sm text-gray-500">
                          加入于 {{ formatTime(project.createdAt) }}
                        </div>
                        <div class="flex space-x-3">
                          <button
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            @click="viewProjectDetail(project.id)"
                          >
                            查看项目详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 发布项目对话框 -->
    <PublishProjectDialog
      :visible="showPublishDialog"
      @close="showPublishDialog = false"
      @success="handlePublishSuccess"
    />

    <!-- 删除确认弹窗 -->
    <div
      v-if="showDeleteDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-gray-900">确认删除</h3>
              <p class="text-sm text-gray-500 mt-1">此操作不可撤销</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-gray-700">
            确定要删除项目
            <span class="font-semibold text-gray-900">{{ projectToDelete?.title }}</span> 吗？
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            @click="showDeleteDialog = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            @click="confirmDelete"
          >
            删除
          </button>
        </div>
      </div>
    </div>

    <!-- 项目详情弹窗 -->
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      :is-my-project="false"
      @close="showProjectDetail = false"
    />

    <!-- 申请管理弹窗 -->
    <ApplicationsDialog
      v-if="showApplicationsDialog && selectedProjectForApplications"
      :project="selectedProjectForApplications"
      @close="showApplicationsDialog = false"
      @refresh="handleApplicationsRefresh"
    />

    <!-- 通用确认弹窗 -->
    <div
      v-if="confirmDialog.visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ confirmDialog.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ confirmDialog.message }}</p>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            @click="confirmDialog.visible = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            @click="
              () => {
                confirmDialog.onConfirm()
                confirmDialog.visible = false
              }
            "
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  cancelApplication as cancelApplicationApi,
  cancelJoinProject,
  deleteProject as deleteProjectApi,
  getMyApplications,
  getMyJoinedProjects,
  getMyProjects,
} from '@/api/modules/project'
import type { ApplicationDetail, Project, ProjectWithApplications } from '@/api/types/project'
import PublishProjectDialog from '@/components/project/PublishProjectDialog.vue'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'
import ApplicationsDialog from '@/components/project/ApplicationsDialog.vue'

const router = useRouter()
const route = useRoute()

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
  createdAt: string
  startDate?: string
  endDate?: string
  contactInfo?: string
  owner?: {
    name: string
    institution: string
    title: string
    imgUrl: string
  }
  collaborators?: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }[]
}

// 标签页控制
const activeTab = ref('created')

// 响应式数据
const loading = ref(false)
const showPublishDialog = ref(false)
const showDeleteDialog = ref(false)
const projectToDelete = ref<ProjectWithApplications | null>(null)
const showProjectDetail = ref(false)
const selectedProjectForDetail = ref<DetailProject | null>(null)
const showApplicationsDialog = ref(false)
const selectedProjectForApplications = ref<ProjectWithApplications | null>(null)

// 筛选器
const projectStatusFilter = ref('')
const applicationStatusFilter = ref('')
const joinedProjectStatusFilter = ref('')

// 新增响应式变量
const createdSearch = ref('')
const appliedSearch = ref('')
const joinedSearch = ref('')

// 数据
const myProjects = ref<ProjectWithApplications[]>([])
const myApplications = ref<ApplicationDetail[]>([])
const myJoinedProjects = ref<Project[]>([])

// 计算属性
const filteredMyProjects = computed(() => {
  let filtered = myProjects.value
  if (projectStatusFilter.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === projectStatusFilter.value)
  }
  if (createdSearch.value.trim()) {
    const keyword = createdSearch.value.trim().toLowerCase()
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        (p.researchArea || '').toLowerCase().includes(keyword)
    )
  }
  return filtered
})

const filteredMyApplications = computed(() => {
  let filtered = myApplications.value
  if (applicationStatusFilter.value) {
    filtered = filtered.filter(app => app.status === applicationStatusFilter.value)
  }
  if (appliedSearch.value.trim()) {
    const keyword = appliedSearch.value.trim().toLowerCase()
    filtered = filtered.filter(
      app =>
        app.project.title.toLowerCase().includes(keyword) ||
        app.project.description.toLowerCase().includes(keyword) ||
        (app.project.researchArea || '').toLowerCase().includes(keyword)
    )
  }
  return filtered
})

const filteredMyJoinedProjects = computed(() => {
  let filtered = myJoinedProjects.value
  if (joinedProjectStatusFilter.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === joinedProjectStatusFilter.value)
  }
  if (joinedSearch.value.trim()) {
    const keyword = joinedSearch.value.trim().toLowerCase()
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        (p.researchArea || '').toLowerCase().includes(keyword)
    )
  }
  return filtered
})

// 方法
const handleTabClick = (tab: { name: string }) => {
  // 更新URL query参数
  router.push({
    path: route.path,
    query: { tab: tab.name },
  })
}

const loadMyProjects = async () => {
  loading.value = true
  try {
    const res = await getMyProjects()
    if (res && res.data) {
      myProjects.value = res.data
    } else {
      console.warn('API响应中没有data字段:', res)
    }
  } catch (error) {
    console.error('获取项目数据失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const loadMyApplications = async () => {
  loading.value = true
  try {
    const res = await getMyApplications()
    if (res && res.data) {
      myApplications.value = res.data
    } else {
      console.warn('API响应中没有data字段:', res)
    }
  } catch (error) {
    console.error('获取我的申请失败:', error)
    ElMessage.error('获取申请列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const loadMyJoinedProjects = async () => {
  loading.value = true
  try {
    const res = await getMyJoinedProjects()
    if (res && res.data) {
      myJoinedProjects.value = res.data
    } else {
      console.warn('API响应中没有data字段:', res)
    }
  } catch (error) {
    console.error('获取我加入的项目失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const getProjectStatus = (
  project: ProjectWithApplications | Project
): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const endTime = new Date(project.endTime)

  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return 'recruiting'
  }

  if (now > endTime) {
    return 'completed'
  }

  if (now >= startTime && now <= endTime) {
    return 'ongoing'
  }

  if (now < startTime) {
    if (project.recruitedNum >= project.recruitNum) {
      return 'pending'
    }
  }

  return 'recruiting'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    recruiting: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return colors[status] || colors.recruiting
}

const getStatusText = (status: string) => {
  const texts = {
    recruiting: '招募中',
    ongoing: '进行中',
    completed: '已完成',
    pending: '待开始',
  }
  return texts[status as keyof typeof texts] || texts.recruiting
}

const getApplicationStatusColor = (status: string) => {
  const colors = {
    unhandled: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.unhandled
}

const getApplicationStatusText = (status: string) => {
  const texts = {
    unhandled: '待处理',
    accepted: '已通过',
    rejected: '已拒绝',
  }
  return texts[status as keyof typeof texts] || texts.unhandled
}

const formatTime = (dateString: string) => {
  if (!dateString) return '未知时间'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '无效时间'
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

const openApplicationsDialog = (project: ProjectWithApplications) => {
  selectedProjectForApplications.value = project
  showApplicationsDialog.value = true
}

const handleApplicationsRefresh = () => {
  loadMyProjects()
}

const editProject = () => {
  ElMessage.info('编辑功能开发中...')
}

const deleteProject = (projectId: number) => {
  const project = myProjects.value.find(p => p.id === projectId)
  if (project) {
    showDeleteDialog.value = true
    projectToDelete.value = project
  }
}

const confirmDelete = () => {
  if (projectToDelete.value) {
    deleteProjectApi({ projectId: projectToDelete.value.id })
      .then(() => {
        const index = myProjects.value.findIndex(p => p.id === projectToDelete.value!.id)
        if (index > -1) {
          myProjects.value.splice(index, 1)
        }
        ElMessage.success('项目删除成功')
        showDeleteDialog.value = false
        projectToDelete.value = null
      })
      .catch(error => {
        console.error('删除项目失败:', error)
        ElMessage.error('删除项目失败，请稍后重试')
      })
  }
}

const cancelApplication = (applicationId: number) => {
  confirmDialog.value = {
    visible: true,
    title: '确认取消申请',
    message: '确定要取消该申请吗？',
    onConfirm: async () => {
      try {
        await cancelApplicationApi({ applicationId })
        const index = myApplications.value.findIndex(app => app.id === applicationId)
        if (index > -1) {
          myApplications.value.splice(index, 1)
        }
        ElMessage.success('申请已取消')
      } catch (error) {
        ElMessage.error('取消申请失败，请稍后重试')
      }
    },
  }
}

const quitProject = (projectId: number) => {
  confirmDialog.value = {
    visible: true,
    title: '确认退出项目',
    message: '确定要退出该项目吗？',
    onConfirm: async () => {
      try {
        await cancelJoinProject({ projectId })
        const index = myJoinedProjects.value.findIndex(p => p.id === projectId)
        if (index > -1) {
          myJoinedProjects.value.splice(index, 1)
        }
        ElMessage.success('已退出项目')
      } catch (error) {
        ElMessage.error('退出项目失败，请稍后重试')
      }
    },
  }
}

const viewProjectDetail = (projectId: number) => {
  // 根据当前标签页找到对应的项目

  if (activeTab.value === 'created') {
    // 从我创建的项目中查找
    const myProject = myProjects.value.find(p => p.id === projectId)
    if (myProject) {
      // 需要从原始数据中获取完整的项目信息
      // 这里暂时使用简化版本
      const adaptedProject: DetailProject = {
        id: myProject.id,
        title: myProject.title,
        description: myProject.description,
        fields: (myProject.researchArea || '')
          .split(',')
          .map(f => f.trim())
          .filter(f => f),
        requirements: (myProject.collaborationCondition || '')
          .split(',')
          .map(r => r.trim())
          .filter(r => r),
        status: getProjectStatus(myProject),
        maxMembers: myProject.recruitNum,
        memberCount: myProject.recruitedNum,
        applicationCount: parseInt(myProject.applyNum),
        createdAt: myProject.createdAt,
        owner: {
          name: '我',
          imgUrl: '',
          institution: '',
          title: '',
        },
        collaborators: [],
      }
      selectedProjectForDetail.value = adaptedProject
      showProjectDetail.value = true
    }
  } else if (activeTab.value === 'applied') {
    // 从我的申请中查找
    const application = myApplications.value.find(app => app.project.id === projectId)
    if (application) {
      const adaptedProject: DetailProject = {
        id: application.project.id,
        title: application.project.title,
        description: application.project.description,
        fields: (application.project.researchArea || '')
          .split(',')
          .map(f => f.trim())
          .filter(f => f),
        requirements: (application.project.collaborationCondition || '')
          .split(',')
          .map(r => r.trim())
          .filter(r => r),
        status: 'recruiting', // 申请详情中没有status字段，使用默认值
        maxMembers: application.project.recruitNum,
        memberCount: application.project.recruitedNum,
        applicationCount: parseInt(application.project.applyNum),
        createdAt: application.project.createAt, // 使用正确的字段名
        owner: {
          name: application.project.owner.name,
          imgUrl: application.project.owner.imgUrl,
          institution: application.project.owner.institution,
          title: application.project.owner.title,
        },
        collaborators: [],
      }
      selectedProjectForDetail.value = adaptedProject
      showProjectDetail.value = true
    }
  } else if (activeTab.value === 'joined') {
    // 从我加入的项目中查找
    const joinedProject = myJoinedProjects.value.find(p => p.id === projectId)
    if (joinedProject) {
      const adaptedProject: DetailProject = {
        id: joinedProject.id,
        title: joinedProject.title,
        description: joinedProject.description,
        fields: (joinedProject.researchArea || '')
          .split(',')
          .map(f => f.trim())
          .filter(f => f),
        requirements: (joinedProject.collaborationCondition || '')
          .split(',')
          .map(r => r.trim())
          .filter(r => r),
        status: 'recruiting', // 使用默认状态
        maxMembers: joinedProject.recruitNum,
        memberCount: joinedProject.recruitedNum,
        applicationCount: parseInt(joinedProject.applyNum),
        createdAt: joinedProject.createdAt,
        owner: {
          name: joinedProject.owner.name,
          imgUrl: joinedProject.owner.imgUrl,
          institution: joinedProject.owner.institution,
          title: joinedProject.owner.title,
        },
        collaborators:
          joinedProject.cooperators?.map(c => ({
            id: c.id,
            name: c.name,
            imgUrl: c.imgUrl,
            institution: c.institution,
            title: c.title,
          })) || [],
      }
      selectedProjectForDetail.value = adaptedProject
      showProjectDetail.value = true
    }
  }
}

const handlePublishSuccess = () => {
  showPublishDialog.value = false
  ElMessage.success('项目发布成功！')
  loadMyProjects()
}

// 监听路由变化，设置默认标签页
watch(
  () => route.query.tab,
  newTab => {
    if (newTab && ['created', 'applied', 'joined'].includes(newTab as string)) {
      activeTab.value = newTab as string
      // 立即加载对应标签页的数据
      switch (newTab) {
        case 'created':
          loadMyProjects()
          break
        case 'applied':
          loadMyApplications()
          break
        case 'joined':
          loadMyJoinedProjects()
          break
      }
    }
  },
  { immediate: true }
)

// 监听标签页变化，加载对应数据
watch(activeTab, newTab => {
  switch (newTab) {
    case 'created':
      loadMyProjects()
      break
    case 'applied':
      loadMyApplications()
      break
    case 'joined':
      loadMyJoinedProjects()
      break
  }
})

onMounted(() => {
  // 根据URL参数设置默认标签页
  const tab = route.query.tab as string
  if (tab && ['created', 'applied', 'joined'].includes(tab)) {
    activeTab.value = tab
    // 立即加载对应标签页的数据
    switch (tab) {
      case 'created':
        loadMyProjects()
        break
      case 'applied':
        loadMyApplications()
        break
      case 'joined':
        loadMyJoinedProjects()
        break
    }
  } else {
    // 默认加载我创建的项目
    loadMyProjects()
  }
})

// 新增通用确认弹窗
const confirmDialog = ref({
  visible: false,
  title: '',
  message: '',
  onConfirm: () => {},
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* 自定义标签页样式 */
:deep(.project-tabs .el-tabs__header) {
  margin-bottom: 0;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.project-tabs .el-tabs__nav-wrap) {
  padding: 0 24px;
}

:deep(.project-tabs .el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  padding: 16px 24px;
}

:deep(.project-tabs .el-tabs__item.is-active) {
  color: #3b82f6;
  font-weight: 600;
}

:deep(.project-tabs .el-tabs__active-bar) {
  background-color: #3b82f6;
  height: 3px;
}
</style>
