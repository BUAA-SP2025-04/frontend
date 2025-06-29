<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">我的工作台</h1>
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
          <el-tab-pane label="我创建的" name="created">
            <div class="p-6">
              <!-- 我创建的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我创建的项目</h3>
                  <span class="text-sm text-gray-500">共 {{ myProjects.length }} 个项目</span>
                </div>

                <!-- 筛选工具栏 -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center space-x-4">
                    <select
                      v-model="projectStatusFilter"
                      class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">全部状态</option>
                      <option value="recruiting">招募中</option>
                      <option value="ongoing">进行中</option>
                      <option value="completed">已完成</option>
                    </select>
                  </div>
                </div>

                <!-- 项目列表 -->
                <div class="space-y-6">
                  <!-- 加载状态 -->
                  <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">正在加载我的项目...</span>
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
                                getStatusColor(project.status),
                              ]"
                            >
                              {{ getStatusText(project.status) }}
                            </span>
                          </div>
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span
                              v-for="field in project.fields"
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
                          {{ project.memberCount }}/{{ project.maxMembers }} 成员
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
                          {{ project.applicationCount }} 申请
                          <span
                            v-if="project.pendingApplications > 0"
                            class="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full"
                          >
                            {{ project.pendingApplications }}
                          </span>
                        </span>
                      </div>
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="flex space-x-3">
                          <button
                            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            @click="openApplicationsDialog()"
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
                            管理申请 ({{ project.applicationCount }})
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

          <el-tab-pane label="我申请的" name="applied">
            <div class="p-6">
              <!-- 我申请的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我的申请</h3>
                  <span class="text-sm text-gray-500">共 {{ myApplications.length }} 个申请</span>
                </div>

                <!-- 筛选工具栏 -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center space-x-4">
                    <select
                      v-model="applicationStatusFilter"
                      class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">全部状态</option>
                      <option value="pending">待处理</option>
                      <option value="approved">已通过</option>
                      <option value="rejected">已拒绝</option>
                    </select>
                  </div>
                </div>

                <!-- 申请列表 -->
                <div class="space-y-6">
                  <!-- 加载状态 -->
                  <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="ml-3 text-gray-600">正在加载我的申请...</span>
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
                            v-if="application.status === 'pending'"
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
                            @click="viewProjectDetail()"
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

          <el-tab-pane label="我加入的" name="joined">
            <div class="p-6">
              <!-- 我加入的项目内容 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">我加入的项目</h3>
                  <span class="text-sm text-gray-500">共 {{ myJoinedProjects.length }} 个项目</span>
                </div>

                <!-- 筛选工具栏 -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center space-x-4">
                    <select
                      v-model="joinedProjectStatusFilter"
                      class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">全部状态</option>
                      <option value="recruiting">招募中</option>
                      <option value="ongoing">进行中</option>
                      <option value="completed">已完成</option>
                    </select>
                  </div>
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
                              v-for="field in (project.researchArea || '').split(',')"
                              :key="field"
                              class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {{ field.trim() }}
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
                            @click="viewProjectDetail()"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getMyProjectsWithApplications,
  getMyApplications,
  getMyJoinedProjects,
  deleteProject as deleteProjectApi,
  cancelApplication as cancelApplicationApi,
  cancelJoinProject,
} from '@/api/modules/project'
import type { ProjectWithApplications, ApplicationDetail, Project } from '@/api/types/project'
import PublishProjectDialog from '@/components/project/PublishProjectDialog.vue'

const router = useRouter()
const route = useRoute()

// 标签页控制
const activeTab = ref('created')

// 响应式数据
const loading = ref(false)
const showPublishDialog = ref(false)
const showDeleteDialog = ref(false)
const projectToDelete = ref<unknown>(null)

// 筛选器
const projectStatusFilter = ref('')
const applicationStatusFilter = ref('')
const joinedProjectStatusFilter = ref('')

// 数据
const myProjects = ref<any[]>([])
const myApplications = ref<ApplicationDetail[]>([])
const myJoinedProjects = ref<Project[]>([])

// 计算属性
const filteredMyProjects = computed(() => {
  let filtered = myProjects.value
  if (projectStatusFilter.value) {
    filtered = filtered.filter(p => p.status === projectStatusFilter.value)
  }
  return filtered
})

const filteredMyApplications = computed(() => {
  let filtered = myApplications.value
  if (applicationStatusFilter.value) {
    filtered = filtered.filter(app => app.status === applicationStatusFilter.value)
  }
  return filtered
})

const filteredMyJoinedProjects = computed(() => {
  let filtered = myJoinedProjects.value
  if (joinedProjectStatusFilter.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === joinedProjectStatusFilter.value)
  }
  return filtered
})

// 方法
const handleTabClick = (tab: any) => {
  // 更新URL query参数
  router.push({
    path: route.path,
    query: { tab: tab.name },
  })
}

const loadMyProjects = async () => {
  loading.value = true
  try {
    const res = await getMyProjectsWithApplications()
    if (res && res.data) {
      myProjects.value = res.data.map((project: ProjectWithApplications) => ({
        id: project.id,
        title: project.title,
        description: project.description || '无',
        fields: (project.researchArea || '')
          .split(',')
          .filter(field => field.trim())
          .map(field => field.trim()),
        requirements: (project.collaborationCondition || '')
          .split(',')
          .filter(req => req.trim())
          .map(req => req.trim()),
        status: getProjectStatus(project),
        maxMembers: project.recruitNum,
        memberCount: project.recruitedNum,
        applicationCount: parseInt(project.applyNum),
        pendingApplications: project.applications?.length || 0,
        createdAt: project.createdAt || '',
      }))
    }
  } catch (error) {
    console.error('获取我的项目失败:', error)
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
    }
  } catch (error) {
    console.error('获取我加入的项目失败:', error)
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const getProjectStatus = (project: any): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
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
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.pending
}

const getApplicationStatusText = (status: string) => {
  const texts = {
    pending: '待处理',
    approved: '已通过',
    rejected: '已拒绝',
  }
  return texts[status as keyof typeof texts] || texts.pending
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

const openApplicationsDialog = () => {
  ElMessage.info('申请管理功能开发中...')
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

const cancelApplication = async (applicationId: number) => {
  try {
    await cancelApplicationApi({ applicationId })
    const index = myApplications.value.findIndex(app => app.id === applicationId)
    if (index > -1) {
      myApplications.value.splice(index, 1)
    }
    ElMessage.success('申请已取消')
  } catch (error) {
    console.error('取消申请失败:', error)
    ElMessage.error('取消申请失败，请稍后重试')
  }
}

const quitProject = async (projectId: number) => {
  try {
    await cancelJoinProject({ projectId })
    const index = myJoinedProjects.value.findIndex(p => p.id === projectId)
    if (index > -1) {
      myJoinedProjects.value.splice(index, 1)
    }
    ElMessage.success('已退出项目')
  } catch (error) {
    console.error('退出项目失败:', error)
    ElMessage.error('退出项目失败，请稍后重试')
  }
}

const viewProjectDetail = () => {
  ElMessage.info('项目详情功能开发中...')
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
  } else {
    // 默认加载我创建的项目
    loadMyProjects()
  }
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
