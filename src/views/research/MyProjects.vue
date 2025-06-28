<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
          >
            我的项目
          </h1>
          <p class="mt-2 text-slate-600">管理你发布的项目和收到的申请</p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="router.push('/research/projects')"
            class="bg-white/80 hover:bg-white text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-slate-200/50"
          >
            浏览项目
          </button>
          <button
            @click="showPublishDialog = true"
            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm"
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
            发布新项目
          </button>
        </div>
      </div>

      <!-- 标签页切换 -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm mb-6 border border-slate-200/50"
      >
        <div class="border-b border-slate-200/50">
          <nav class="-mb-px flex">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-all duration-300',
                activeTab === tab.key
                  ? 'border-cyan-500 text-cyan-600 bg-cyan-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
              ]"
            >
              <svg
                v-if="tab.key === 'my-projects'"
                class="w-4 h-4 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 inline-block mr-2"
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
              {{ tab.label }}
              <span
                v-if="tab.count > 0"
                :class="[
                  'ml-2 inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-full',
                  activeTab === tab.key
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'bg-slate-100 text-slate-600',
                ]"
              >
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- 我发布的项目 -->
      <div v-if="activeTab === 'my-projects'" class="space-y-6">
        <!-- 项目筛选 -->
        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-200/50"
        >
          <div class="flex items-center space-x-4">
            <select
              v-model="projectStatusFilter"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="">全部状态</option>
              <option value="recruiting">招募中</option>
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
            </select>
            <div class="flex-1"></div>
            <span class="text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              共 {{ myProjects.length }} 个项目
            </span>
          </div>
        </div>

        <!-- 项目列表 -->
        <div class="space-y-4">
          <div
            v-for="project in filteredMyProjects"
            :key="project.id"
            class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300"
          >
            <div class="p-6">
              <!-- 项目头部 -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-xl font-semibold text-slate-900">{{ project.title }}</h3>
                    <span
                      :class="[
                        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                        getStatusColor(project.status),
                      ]"
                    >
                      {{ getStatusText(project.status) }}
                    </span>
                    <span
                      v-if="project.isUrgent"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200"
                    >
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      紧急
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="field in project.fields"
                      :key="field"
                      class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {{ field }}
                    </span>
                  </div>
                </div>

                <!-- 项目操作 -->
                <div class="flex space-x-2">
                  <button
                    @click="editProject(project)"
                    class="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    编辑
                  </button>
                  <button
                    @click="toggleProjectStatus(project)"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      project.status === 'recruiting'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200',
                    ]"
                  >
                    {{ project.status === 'recruiting' ? '暂停招募' : '重新招募' }}
                  </button>
                  <button
                    @click="deleteProject(project.id)"
                    class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    删除
                  </button>
                </div>
              </div>

              <!-- 项目描述 -->
              <p class="text-slate-600 mb-4 line-clamp-2">{{ project.description }}</p>

              <!-- 项目统计 -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div class="text-sm text-slate-500">团队成员</div>
                  <div class="text-lg font-semibold text-slate-900">
                    {{ project.memberCount }}/{{ project.maxMembers }}
                  </div>
                </div>
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div class="text-sm text-slate-500">申请人数</div>
                  <div class="text-lg font-semibold text-slate-900">
                    {{ project.applicationCount }}
                    <span
                      v-if="project.pendingApplications > 0"
                      class="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full"
                    >
                      {{ project.pendingApplications }}
                    </span>
                  </div>
                </div>
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div class="text-sm text-slate-500">浏览次数</div>
                  <div class="text-lg font-semibold text-slate-900">{{ project.viewCount }}</div>
                </div>
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div class="text-sm text-slate-500">发布时间</div>
                  <div class="text-lg font-semibold text-slate-900">
                    {{ formatDate(project.createdAt) }}
                  </div>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                <div class="flex space-x-3">
                  <button
                    @click="viewProjectApplications(project)"
                    class="flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium shadow-sm"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      ></path>
                    </svg>
                    管理申请 ({{ project.applicationCount }})
                  </button>
                  <button
                    @click="showProjectDetail(project)"
                    class="flex items-center px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium border border-slate-300"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    查看详情
                  </button>
                </div>
                <div class="text-sm text-slate-500">更新于 {{ formatTime(project.updatedAt) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div
          v-if="filteredMyProjects.length === 0"
          class="bg-white/80 rounded-xl shadow-sm border border-slate-200/50 p-12 text-center"
        >
          <svg
            class="w-16 h-16 text-slate-300 mx-auto mb-4"
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
          <h3 class="text-lg font-medium text-slate-900 mb-2">暂无项目</h3>
          <p class="text-slate-500 mb-4">你还没有发布任何项目</p>
          <button
            @click="showPublishDialog = true"
            class="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors shadow-sm"
          >
            发布第一个项目
          </button>
        </div>
      </div>

      <!-- 申请管理 -->
      <div v-if="activeTab === 'applications'" class="space-y-6">
        <!-- 申请筛选 -->
        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-200/50"
        >
          <div class="flex items-center space-x-4">
            <select
              v-model="applicationStatusFilter"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
            <select
              v-model="selectedProjectFilter"
              class="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
            >
              <option value="">全部项目</option>
              <option v-for="project in myProjects" :key="project.id" :value="project.id">
                {{ project.title }}
              </option>
            </select>
            <div class="flex-1"></div>
            <span class="text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              共 {{ filteredApplications.length }} 个申请
            </span>
          </div>
        </div>

        <!-- 申请列表 - 优化视觉层次 -->
        <div class="space-y-6">
          <div
            v-for="application in filteredApplications"
            :key="application.id"
            class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300"
          >
            <div class="p-8">
              <!-- 申请头部 -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center space-x-4">
                  <img
                    :src="application.applicant.avatar"
                    :alt="application.applicant.name"
                    class="w-16 h-16 rounded-full ring-4 ring-slate-100"
                  />
                  <div>
                    <h3 class="text-xl font-bold text-slate-900">
                      {{ application.applicant.name }}
                    </h3>
                    <p class="text-slate-600 font-medium">
                      {{ application.applicant.institution }}
                    </p>
                    <p class="text-sm text-slate-500 flex items-center mt-1">
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
                      申请时间：{{ formatTime(application.createdAt) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <span
                    :class="[
                      'inline-flex items-center px-4 py-2 rounded-full text-sm font-bold',
                      getApplicationStatusColor(application.status),
                    ]"
                  >
                    {{ getApplicationStatusText(application.status) }}
                  </span>
                </div>
              </div>

              <!-- 申请的项目 -->
              <div class="mb-6 p-4 rounded-xl">
                <h4 class="font-bold text-slate-900 mb-2 flex items-center">
                  <svg
                    class="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                  申请项目：{{ application.project.title }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="field in application.project.fields"
                    :key="field"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {{ field }}
                  </span>
                </div>
              </div>

              <!-- 申请内容 - 增强视觉层次 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- 申请理由 -->
                <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h4 class="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                      ></path>
                    </svg>
                    申请理由
                  </h4>
                  <p class="text-slate-700 leading-relaxed">{{ application.reason }}</p>
                </div>

                <!-- 相关经验 -->
                <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h4 class="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                    相关经验
                  </h4>
                  <p class="text-slate-700 leading-relaxed">{{ application.experience }}</p>
                </div>
              </div>

              <!-- 其他信息 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- 时间投入 -->
                <div class="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 class="text-base font-bold text-slate-900 mb-2 flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-purple-600"
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
                    时间投入
                  </h4>
                  <p class="text-slate-700 font-medium">
                    {{ getTimeCommitmentText(application.timeCommitment) }}
                  </p>
                </div>

                <!-- 联系方式 -->
                <div class="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 class="text-base font-bold text-slate-900 mb-2 flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    联系方式
                  </h4>
                  <p class="text-slate-700 font-mono">{{ application.contact }}</p>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div
                v-if="application.status === 'pending'"
                class="flex flex-wrap gap-3 pt-6 border-t border-slate-200"
              >
                <button
                  @click="approveApplication(application.id)"
                  class="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 text-sm font-bold shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  通过申请
                </button>
                <button
                  @click="rejectApplication(application.id)"
                  class="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-sm font-bold shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  拒绝申请
                </button>
                <button
                  @click="contactApplicant(application)"
                  class="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm font-bold shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                    ></path>
                  </svg>
                  联系申请人
                </button>
              </div>

              <!-- 已处理状态 -->
              <div v-else class="pt-6 border-t border-slate-200">
                <div class="bg-slate-100 rounded-xl p-4">
                  <p class="text-sm text-slate-600 font-medium">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    处理时间：{{ formatTime(application.processedAt || '') }}
                    <span v-if="application.processedBy" class="ml-4">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      处理人：{{ application.processedBy }}
                    </span>
                  </p>
                  <p v-if="application.processNote" class="text-sm text-slate-700 mt-2 font-medium">
                    💭 备注：{{ application.processNote }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div
          v-if="filteredApplications.length === 0"
          class="bg-white/80 rounded-xl shadow-sm border border-slate-200/50 p-12 text-center"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-slate-400"
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
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">暂无申请</h3>
            <p class="text-slate-500">你的项目还没有收到任何申请</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目详情卡片 -->
    <ProjectDetailCard
      v-if="showProjectDetailCard"
      :project="selectedProject!"
      :is-my-project="true"
      @close="showProjectDetailCard = false"
    />

    <!-- 发布项目对话框 -->
    <div
      v-if="showPublishDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">发布科研项目</h3>
            <button @click="showPublishDialog = false" class="text-gray-400 hover:text-gray-600">
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

        <form @submit.prevent="publishProject" class="p-6 space-y-6">
          <!-- 项目基本信息表单（与Projects.vue相同） -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProjectDetailCard from '@/components/ProjectDetailCard.vue'

const router = useRouter()

// 响应式数据
const activeTab = ref('my-projects')
const projectStatusFilter = ref('')
const applicationStatusFilter = ref('')
const selectedProjectFilter = ref('')
const showPublishDialog = ref(false)
const showProjectDetailCard = ref(false)
const selectedProject = ref(null)

const showProjectDetail = (project: any) => {
  selectedProject.value = project
  showProjectDetailCard.value = true
}
// 发布项目表单
const newProject = ref<{
  title: string
  description: string
  fields: string[]
  requirements: string[]
  startDate: string
  endDate: string
  maxMembers: number
  contactInfo: string
  isUrgent: boolean
}>({
  title: '',
  description: '',
  fields: [],
  requirements: [],
  startDate: '',
  endDate: '',
  maxMembers: 5,
  contactInfo: '',
  isUrgent: false,
})
const fieldInput = ref('')
const requirementInput = ref('')

// 标签页配置
const tabs = computed(() => [
  {
    key: 'my-projects',
    label: '我的项目',
    count: myProjects.value.length,
  },
  {
    key: 'applications',
    label: '申请管理',
    count: applications.value.filter(app => app.status === 'pending').length,
  },
])

// 模拟我的项目数据
const myProjects = ref<
  Array<{
    id: number
    title: string
    description: string
    fields: string[]
    requirements: string[]
    status: 'recruiting' | 'ongoing' | 'completed'
    maxMembers: number
    memberCount: number
    applicationCount: number
    pendingApplications: number
    viewCount: number
    isUrgent: boolean
    createdAt: string
    updatedAt: string
  }>
>([
  {
    id: 1,
    title: '基于深度学习的医学图像分析系统',
    description:
      '开发用于医学影像诊断的深度学习系统，主要针对肺部CT扫描进行病灶检测和分类。项目已获得医院伦理委员会批准，拥有丰富的标注数据集。',
    fields: ['人工智能', '医学影像', '深度学习'],
    requirements: ['Python/PyTorch经验', '医学背景', 'UI/UX设计'],
    status: 'recruiting',
    maxMembers: 8,
    memberCount: 3,
    applicationCount: 12,
    pendingApplications: 5,
    viewCount: 245,
    isUrgent: true,
    createdAt: '2025-06-20T10:00:00',
    updatedAt: '2025-06-25T14:30:00',
  },
  {
    id: 2,
    title: '智能农业监测无人机系统',
    description: '开发基于无人机的农业监测系统，集成多光谱成像、AI图像分析和自动飞行控制。',
    fields: ['无人机技术', '计算机视觉', '精准农业'],
    requirements: ['无人机开发', '图像处理', '农业知识'],
    status: 'ongoing',
    maxMembers: 10,
    memberCount: 7,
    applicationCount: 8,
    pendingApplications: 2,
    viewCount: 156,
    isUrgent: false,
    createdAt: '2025-06-15T09:15:00',
    updatedAt: '2025-06-24T16:20:00',
  },
  {
    id: 3,
    title: '区块链学术认证平台',
    description: '构建去中心化的学术成果认证和版权保护平台，利用区块链技术确保研究成果的原创性。',
    fields: ['区块链', '学术认证', '去中心化'],
    requirements: ['区块链开发', 'Web3技术', '智能合约'],
    status: 'completed',
    maxMembers: 5,
    memberCount: 5,
    applicationCount: 15,
    pendingApplications: 0,
    viewCount: 203,
    isUrgent: false,
    createdAt: '2025-05-01T08:00:00',
    updatedAt: '2025-05-30T18:00:00',
  },
])

// 模拟申请数据
const applications = ref([
  {
    id: 1,
    project: {
      id: 1,
      title: '基于深度学习的医学图像分析系统',
      fields: ['人工智能', '医学影像', '深度学习'],
    },
    applicant: {
      id: 101,
      name: '王研究员',
      avatar: '/images/avatar/1.png',
      institution: '北京大学医学部',
    },
    reason:
      '我在医学图像处理方面有3年的研究经验，熟悉深度学习在医学影像中的应用。我的硕士论文就是关于肺部CT图像的病灶检测，使用了ResNet和UNet等网络架构。我认为我的经验能够为这个项目带来价值，特别是在模型优化和临床验证方面。',
    experience:
      '曾参与多个医学图像处理项目，发表SCI论文2篇，熟练掌握PyTorch、TensorFlow等深度学习框架，有丰富的医学数据处理经验。',
    timeCommitment: 'full-time',
    contact: 'wang.researcher@pku.edu.cn',
    status: 'pending',
    createdAt: '2025-06-24T10:30:00',
  },
  {
    id: 2,
    project: {
      id: 1,
      title: '基于深度学习的医学图像分析系统',
      fields: ['人工智能', '医学影像', '深度学习'],
    },
    applicant: {
      id: 102,
      name: '李工程师',
      avatar: '/images/avatar/2.png',
      institution: '清华大学',
    },
    reason:
      '作为一名有UI/UX设计背景的工程师，我希望能够参与到这个有意义的医学项目中。我专注于医疗软件的用户体验设计，理解医生的工作流程和需求。',
    experience: '5年医疗软件UI/UX设计经验，设计过多款医院信息系统界面，熟悉医生的使用习惯和需求。',
    timeCommitment: 'part-time',
    contact: 'li.engineer@tsinghua.edu.cn',
    status: 'approved',
    createdAt: '2025-06-23T14:15:00',
    processedAt: '2025-06-24T09:30:00',
    processedBy: '张医生',
    processNote: '设计经验丰富，正是我们需要的人才',
  },
  {
    id: 3,
    project: {
      id: 2,
      title: '智能农业监测无人机系统',
      fields: ['无人机技术', '计算机视觉', '精准农业'],
    },
    applicant: {
      id: 103,
      name: '陈博士',
      avatar: '/images/avatar/3.png',
      institution: '中科院自动化所',
    },
    reason:
      '我在无人机自主导航和图像处理方面有深入研究，希望将技术应用到农业领域，为智慧农业发展贡献力量。',
    experience:
      '博士期间专注于无人机视觉SLAM和目标检测，发表顶级会议论文5篇，有实际无人机项目开发经验。',
    timeCommitment: 'flexible',
    contact: 'chen.phd@ia.ac.cn',
    status: 'pending',
    createdAt: '2025-06-22T16:45:00',
  },
  {
    id: 4,
    project: {
      id: 1,
      title: '基于深度学习的医学图像分析系统',
      fields: ['人工智能', '医学影像', '深度学习'],
    },
    applicant: {
      id: 104,
      name: '赵学生',
      avatar: '/images/avatar/4.png',
      institution: '复旦大学',
    },
    reason:
      '我是计算机专业的研究生，对医学图像处理很感兴趣，虽然经验不多，但学习能力强，希望能够参与学习。',
    experience: '在校学习过机器学习和图像处理相关课程，完成过简单的图像分类项目，熟悉Python编程。',
    timeCommitment: 'limited',
    contact: 'zhao.student@fudan.edu.cn',
    status: 'rejected',
    createdAt: '2025-06-21T11:20:00',
    processedAt: '2025-06-22T10:15:00',
    processedBy: '张医生',
    processNote: '经验不足，建议先积累更多相关经验',
  },
])

// 计算属性
const filteredMyProjects = computed(() => {
  let filtered = myProjects.value

  if (projectStatusFilter.value) {
    filtered = filtered.filter(p => p.status === projectStatusFilter.value)
  }

  return filtered
})

const filteredApplications = computed(() => {
  let filtered = applications.value

  if (applicationStatusFilter.value) {
    filtered = filtered.filter(app => app.status === applicationStatusFilter.value)
  }

  if (selectedProjectFilter.value) {
    filtered = filtered.filter(app => app.project.id === parseInt(selectedProjectFilter.value))
  }

  return filtered
})

// 方法
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
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

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
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

const getTimeCommitmentText = (timeCommitment: string) => {
  const texts = {
    'full-time': '全职参与',
    'part-time': '兼职参与（每周20+小时）',
    flexible: '灵活参与（每周10-20小时）',
    limited: '有限参与（每周5-10小时）',
  }
  return texts[timeCommitment as keyof typeof texts] || timeCommitment
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
    status: 'recruiting' as 'recruiting',
    maxMembers: newProject.value.maxMembers,
    memberCount: 1,
    applicationCount: 0,
    pendingApplications: 0,
    viewCount: 0,
    isUrgent: newProject.value.isUrgent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  myProjects.value.unshift(project)

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

  showPublishDialog.value = false
  ElMessage.success('项目发布成功！')
}

const editProject = (project: any) => {
  // 实现项目编辑功能
  ElMessage.info('编辑功能开发中...')
}

const toggleProjectStatus = (project: any) => {
  if (project.status === 'recruiting') {
    project.status = 'ongoing'
    ElMessage.success('已暂停招募')
  } else {
    project.status = 'recruiting'
    ElMessage.success('已重新开始招募')
  }
  project.updatedAt = new Date().toISOString()
}

const deleteProject = async (projectId: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这个项目吗？此操作不可撤销。', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const index = myProjects.value.findIndex(p => p.id === projectId)
    if (index > -1) {
      myProjects.value.splice(index, 1)
      ElMessage.success('项目删除成功')
    }
  } catch {
    ElMessage.info('已取消删除')
  }
}

const viewProjectApplications = (project: any) => {
  selectedProjectFilter.value = project.id.toString()
  activeTab.value = 'applications'
}

const viewProject = (projectId: number) => {
  router.push(`/research/projects/${projectId}`)
}

const approveApplication = (applicationId: number) => {
  const application = applications.value.find(app => app.id === applicationId)
  if (application) {
    application.status = 'approved'
    application.processedAt = new Date().toISOString()
    application.processedBy = '当前用户'

    // 更新项目的待处理申请数
    const project = myProjects.value.find(p => p.id === application.project.id)
    if (project) {
      project.pendingApplications = Math.max(0, project.pendingApplications - 1)
      project.memberCount++
    }

    ElMessage.success('申请已通过')
  }
}

const rejectApplication = (applicationId: number) => {
  const application = applications.value.find(app => app.id === applicationId)
  if (application) {
    application.status = 'rejected'
    application.processedAt = new Date().toISOString()
    application.processedBy = '当前用户'

    // 更新项目的待处理申请数
    const project = myProjects.value.find(p => p.id === application.project.id)
    if (project) {
      project.pendingApplications = Math.max(0, project.pendingApplications - 1)
    }

    ElMessage.success('申请已拒绝')
  }
}

const contactApplicant = (application: any) => {
  // 实现联系申请人功能
  ElMessage.info(`正在打开与 ${application.applicant.name} 的私信对话...`)
  // router.push(`/messages/chat/${application.applicant.id}`)
}

onMounted(() => {
  // 页面初始化
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
