<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-200 relative overflow-hidden">
    <!-- 学术元素背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 书本图标 -->
      <div class="absolute top-20 left-10 opacity-[0.05] transform rotate-12 animate-fade-pulse">
        <svg class="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>
      
      <!-- 烧杯图标 -->
      <div class="absolute top-40 right-20 opacity-[0.04] transform -rotate-6 animate-fade-pulse-delay">
        <svg class="w-28 h-28 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9,2V7.38L4.06,16.11C3.8,16.61 4.17,17.23 4.73,17.23H19.27C19.83,17.23 20.2,16.61 19.94,16.11L15,7.38V2H9M11,4H13V7.38L14,9H10L11,7.38V4M8.5,11H15.5L16.5,13H7.5L8.5,11Z"/>
        </svg>
      </div>
      
      <!-- 望远镜图标 -->
      <div class="absolute bottom-32 left-20 opacity-[0.1] transform rotate-45 animate-fade-pulse-slow">
      <svg t="1751381075713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5509" width="200" height="200"><path d="M998.453213 578.067455l-72.874118-42.012837 8.298832-14.263617a51.089684 51.089684 0 0 0-18.802041-69.891725L333.509307 116.833938A51.867699 51.867699 0 0 0 337.140046 83.119933 51.867699 51.867699 0 0 0 312.762227 51.999314l-77.801549-45.124899a50.700676 50.700676 0 0 0-25.93385-6.87247A51.867699 51.867699 0 0 0 164.679946 26.065464L6.87247 299.148901a51.867699 51.867699 0 0 0-5.18677 38.900775A51.867699 51.867699 0 0 0 25.93385 369.040626l77.801549 45.124899a51.867699 51.867699 0 0 0 25.933849 6.87247 51.089684 51.089684 0 0 0 40.586475-20.74708l112.1639 64.834624a230.033247 230.033247 0 0 0 178.684224 220.437723V972.650978H281.511938a25.93385 25.93385 0 0 0 0 51.219353H691.137094a25.93385 25.93385 0 0 0 0-51.219353H511.934193V691.268708A222.901438 222.901438 0 0 0 622.412393 661.444781l128.761563 74.30048a50.960015 50.960015 0 0 0 25.93385 6.87247 50.571007 50.571007 0 0 0 44.346883-25.93385l8.298832-14.263617 72.744448 42.012836A51.219353 51.219353 0 0 0 972.519363 726.279406l44.99523-77.801549A51.089684 51.089684 0 0 0 998.453213 578.067455zM51.867699 324.304735L209.026828 51.999314l77.80155 45.124898L129.669248 369.818642z m460.066494 315.74462a178.035878 178.035878 0 0 1-173.756793-142.636173l230.033247 132.78131a171.552416 171.552416 0 0 1-56.276454 9.854863z m264.654936 51.8677L196.189573 356.33304l112.682577-195.281888 580.529225 335.195007z m151.064674 9.076847l-72.874117-42.012836 45.124898-77.801549L972.519363 622.544007z" fill="#5FC2DD" p-id="5510"></path></svg>
      </div>
      
      <!-- 原子图标 -->
      <div class="absolute top-80 right-40 opacity-[0.05] transform -rotate-12 animate-spin-gentle">
        <svg class="w-36 h-36 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z"/>
        </svg>
      </div>
      
      <!-- 齿轮图标 -->
      <div class="absolute bottom-[10rem] right-[15rem] opacity-[0.04] transform rotate-12 animate-spin-clockwise">
        <svg class="w-36 h-36 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      </div>
      
      <!-- 数学公式装饰 -->
      <div class="absolute top-1/2 left-10 opacity-[0.08] transform -rotate-6 -translate-y-1/2 animate-fade-pulse-medium">
        <svg class="w-56 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 260 80">
          <text x="10" y="40" font-family="serif" font-size="48" font-style="italic" font-weight="bold">∑ƒ(x)dx</text>
          <text x="10" y="70" font-family="serif" font-size="32" font-weight="bold">∫ π = 3.14...</text>
        </svg>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和发布按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <div class="flex items-center space-x-3">
            <svg
              class="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />
              <circle cx="8.5" cy="17.5" r="1.5" fill="#3b82f6" />
              <circle cx="15.5" cy="17.5" r="1.5" fill="#3b82f6" />
            </svg>
            <h1 class="text-3xl font-bold text-gray-900">科研项目</h1>
          </div>
          <p class="mt-2 text-gray-600">寻找合作伙伴，推动科研进展</p>
        </div>
        <div class="flex space-x-4">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            @click="router.push('/research/my-workspace')"
          >
            项目管理
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
                <option value="计算机科学">计算机科学</option>
                <option value="人工智能">人工智能</option>
                <option value="机器学习">机器学习</option>
                <option value="数据科学">数据科学</option>
                <option value="生物信息学">生物信息学</option>
                <option value="物理学">物理学</option>
                <option value="化学">化学</option>
                <option value="数学">数学</option>
                <option value="材料科学">材料科学</option>
                <option value="环境科学">环境科学</option>
                <option value="地球科学">地球科学</option>
                <option value="天文学">天文学</option>
                <option value="医学">医学</option>
                <option value="药学">药学</option>
                <option value="心理学">心理学</option>
                <option value="社会学">社会学</option>
                <option value="经济学">经济学</option>
                <option value="管理学">管理学</option>
                <option value="法学">法学</option>
                <option value="教育学">教育学</option>
                <option value="历史学">历史学</option>
                <option value="哲学">哲学</option>
                <option value="语言学">语言学</option>
                <option value="政治学">政治学</option>
                <option value="艺术学">艺术学</option>
                <option value="农学">农学</option>
                <option value="工程学">工程学</option>
                <option value="电子科学">电子科学</option>
                <option value="自动化">自动化</option>
                <option value="交通运输">交通运输</option>
                <option value="能源科学">能源科学</option>
                <option value="海洋科学">海洋科学</option>
                <option value="统计学">统计学</option>
                <option value="信息科学">信息科学</option>
                <option value="新闻传播学">新闻传播学</option>
                <option value="体育学">体育学</option>
                <option value="其他">其他</option>
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
                <option value="pending">待开始</option>
              </select>

              <!-- 项目归属 -->
              <select
                v-model="selectedBelonging"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部项目</option>
                <option value="0">未加入</option>
                <option value="1">申请中</option>
                <option value="2">已加入</option>
                <option value="3">我创建的</option>
              </select>

              <!-- 排序方式 -->
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
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
              v-for="project in paginatedProjects"
              v-else
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
                        @click="viewProjectDetail(project)"
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
                        v-for="field in (project.researchArea || '').split(',')"
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
                <div v-if="project.collaborationCondition" class="mb-4">
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
                      :src="getAvatarUrl(project.owner.imgUrl)"
                      :alt="project.owner.name"
                      class="w-8 h-8 rounded-full mr-3 cursor-pointer"
                      @click="goToUser(project.owner.id)"
                    />
                    <div>
                      <span
                        class="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                        @click="goToUser(project.owner.id)"
                      >
                        {{ project.owner.name }}
                      </span>
                      <p class="text-xs text-gray-500">{{ project.owner.institution }}</p>
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
                    <!-- 根据projBelongings显示不同按钮 -->
                    <button
                      v-if="project.projBelongings === 3"
                      class="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      @click="manageProject"
                    >
                      管理项目
                    </button>

                    <button
                      v-else-if="project.projBelongings === 1"
                      class="px-4 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                      @click="cancelProjectApplication()"
                    >
                      取消申请
                    </button>

                    <button
                      v-else-if="project.projBelongings === 2"
                      class="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      @click="quitProject()"
                    >
                      退出项目
                    </button>

                    <button
                      v-else-if="
                        project.projBelongings === 0 && getProjectStatus(project) === 'recruiting'
                      "
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
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <!-- 上一页 -->
              <button
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = Math.max(1, currentPage - 1)"
              >
                上一页
              </button>

              <!-- 页码 -->
              <button
                v-for="page in getVisiblePages()"
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

              <!-- 下一页 -->
              <button
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                ]"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
              >
                下一页
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
              <div class="flex justify-between">
                <span class="text-gray-600">待开始</span>
                <span class="font-medium text-yellow-600">{{ projectStats.pending }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 申请加入对话框 -->
    <ApplyProjectDialog
      :visible="showApplicationDialog"
      :project="selectedProjectForApplication"
      @close="showApplicationDialog = false"
      @success="handleApplicationSuccess"
    />

    <!-- 项目详情对话框 -->
    <ProjectDetailCard
      v-if="showProjectDetail && selectedProjectForDetail"
      :project="selectedProjectForDetail"
      :is-invite="isInviteMode"
      :is-my-project="selectedProjectForDetail && selectedProjectForDetail.projBelongings === 3"
      @close="showProjectDetail = false"
      @accept="handleAcceptInvite"
      @reject="handleRejectInvite"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getAllProjects, acceptInvite } from '@/api/modules/project'
import type { Project } from '@/api/types/project'
import ProjectDetailCard from '@/components/project/ProjectDetailCard.vue'
import ApplyProjectDialog from '@/components/project/ApplyProjectDialog.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

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
  projBelongings?: number
  owner: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }
  collaborators: {
    id: number
    name: string
    institution: string
    title: string
    imgUrl: string
  }[]
}

const router = useRouter()
const route = useRoute()

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedBelonging = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10

// 对话框控制
const showApplicationDialog = ref(false)
const showProjectDetail = ref(false)
const selectedProjectForApplication = ref<Project | null>(null)
const selectedProjectForDetail = ref<DetailProject | null>(null)
const isInviteMode = ref(false)

// 申请表单

// 表单校验错误信息

// 项目数据
const projects = ref<Project[]>([])
const loading = ref(false)

// 热门领域
const popularFields = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) {
    return []
  }

  const fieldCounts: { [key: string]: number } = {}

  // 统计每个领域的项目数量
  projects.value.forEach(project => {
    const fields = (project.researchArea || '').split(',').map(field => field.trim())
    fields.forEach(field => {
      if (field) {
        fieldCounts[field] = (fieldCounts[field] || 0) + 1
      }
    })
  })

  // 转换为数组并排序，取前5个
  return Object.entries(fieldCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// 项目统计
const projectStats = ref({
  total: 0,
  recruiting: 0,
  ongoing: 0,
  completed: 0,
  pending: 0,
})

// 获取所有项目
const loadProjects = async () => {
  loading.value = true
  try {
    const res = await getAllProjects()
    // 检查API返回的数据结构
    if (res) {
      projects.value = res.data
      //console.log(projects)
      updateProjectStats()
    } else {
      console.error('API返回数据格式不正确:', res)
      projects.value = []
      updateProjectStats()
      ElMessage.warning('获取项目列表成功，但数据格式异常')
    }
  } catch (error) {
    console.error('获取项目列表失败:', error)
    projects.value = []
    updateProjectStats()
    ElMessage.error('获取项目列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 更新项目统计
const updateProjectStats = () => {
  if (!projects.value || !Array.isArray(projects.value)) {
    projectStats.value = {
      total: 0,
      recruiting: 0,
      ongoing: 0,
      completed: 0,
      pending: 0,
    }
    return
  }

  projectStats.value.total = projects.value.length
  projectStats.value.recruiting = projects.value.filter(
    p => getProjectStatus(p) === 'recruiting'
  ).length
  projectStats.value.ongoing = projects.value.filter(p => getProjectStatus(p) === 'ongoing').length
  projectStats.value.completed = projects.value.filter(
    p => getProjectStatus(p) === 'completed'
  ).length
  projectStats.value.pending = projects.value.filter(p => getProjectStatus(p) === 'pending').length
}

// 计算属性
const filteredProjects = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) {
    return []
  }

  let filtered = projects.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.researchArea || '').toLowerCase().includes(query) ||
        (p.collaborationCondition || '').toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(p => (p.researchArea || '').includes(selectedCategory.value))
  }

  // 状态过滤
  if (selectedStatus.value) {
    filtered = filtered.filter(p => getProjectStatus(p) === selectedStatus.value)
  }

  // 项目归属过滤
  if (selectedBelonging.value) {
    const belongingValue = parseInt(selectedBelonging.value)
    filtered = filtered.filter(p => p.projBelongings === belongingValue)
  }

  // 排序
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        // 如果时间无效，将其排在最后
        if (isNaN(dateA.getTime())) return 1
        if (isNaN(dateB.getTime())) return -1

        return dateB.getTime() - dateA.getTime()
      })
      break
    case 'popular':
      filtered.sort((a, b) => parseInt(b.applyNum) - parseInt(a.applyNum))
      break
  }

  return filtered
})

// 分页后的项目列表
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

// 获取头像URL
const getAvatarUrl = (imgUrl: string) => {
  if (!imgUrl || imgUrl === '') {
    return '/default-avatar.png'
  }
  if (imgUrl.startsWith('http')) {
    return imgUrl
  }
  return import.meta.env.VITE_API_BASE_URL + imgUrl
}

// 方法
const formatTime = (dateString: string) => {
  if (!dateString) {
    return '未知时间'
  }

  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '无效时间'
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
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// 根据时间和招募人数计算项目状态
const getProjectStatus = (project: Project): 'recruiting' | 'ongoing' | 'completed' | 'pending' => {
  const now = new Date()
  const startTime = new Date(project.startTime)
  const endTime = new Date(project.endTime)

  // 检查时间是否有效
  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    return 'recruiting' // 如果时间无效，默认为招募中
  }

  // 如果已经结束
  if (now > endTime) {
    return 'completed'
  }

  // 如果正在进行中
  if (now >= startTime && now <= endTime) {
    return 'ongoing'
  }

  // 如果还没开始
  if (now < startTime) {
    // 如果招募人数已满，则为进行中
    if (project.recruitedNum >= project.recruitNum) {
      return 'pending'
    }
  }

  return 'recruiting'
}

const getStatusColor = (status: 'recruiting' | 'ongoing' | 'completed' | 'pending') => {
  const colors = {
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

// 获取可见的页码
const getVisiblePages = () => {
  const pages = []
  const maxVisible = 5
  const halfVisible = Math.floor(maxVisible / 2)

  let start = Math.max(1, currentPage.value - halfVisible)
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  // 调整起始位置
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const applyToProject = (project: Project) => {
  selectedProjectForApplication.value = project
  showApplicationDialog.value = true
}

const cancelProjectApplication = () => {
  // 跳转到我的申请标签页
  router.push({
    path: '/research/my-workspace',
    query: { tab: 'applied' },
  })
}

const quitProject = async () => {
  // 跳转到我加入的项目标签页
  router.push({
    path: '/research/my-workspace',
    query: { tab: 'joined' },
  })
}

const viewProjectDetail = (project: Project, invite = false) => {
  if (invite && !checkInviteProject(project)) {
    return
  }
  // 转换API的Project类型为ProjectDetailCard组件期望的格式
  const adaptedProject: DetailProject = {
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
    createdAt: project.createdAt || '',
    startDate: project.startTime || '',
    endDate: project.endTime || '',
    contactInfo: project.contact || '无',
    projBelongings: project.projBelongings,
    owner: {
      id: project.owner.id,
      name: project.owner.name,
      institution: project.owner.institution,
      title: project.owner.title || '未知职位',
      imgUrl: project.owner.imgUrl,
    },
    collaborators: (project.cooperators || []).map(cooperator => ({
      id: cooperator.id,
      name: cooperator.name,
      institution: cooperator.institution,
      title: cooperator.title || '未知职位',
      imgUrl: cooperator.imgUrl,
    })),
  }

  selectedProjectForDetail.value = adaptedProject
  showProjectDetail.value = true
  isInviteMode.value = invite
}

// 监听筛选条件变化，重置分页
watch([searchQuery, selectedCategory, selectedStatus, selectedBelonging, sortBy], () => {
  currentPage.value = 1
})

const handleApplicationSuccess = () => {
  showApplicationDialog.value = false
  // 重新加载项目列表以更新状态
  loadProjects()
}

const manageProject = () => {
  router.push('/research/my-workspace')
}

const handleAcceptInvite = async () => {
  try {
    // 假设token和InvId从url query获取
    const token = route.query.token as string
    const invId = Number(route.query.invId)
    if (!token || !invId) {
      ElMessage.error('邀请参数缺失')
      return
    }
    await acceptInvite({ token, invId })
    ElMessage.success('已加入项目')
    showProjectDetail.value = false
    // 可选：清空url参数
    router.replace({
      query: { ...route.query, projectId: undefined, token: undefined, InvId: undefined },
    })
    // 可选：刷新项目列表
    loadProjects()
  } catch (e) {
    ElMessage.error('加入失败')
  }
}

const handleRejectInvite = () => {
  // 复制当前 query
  const newQuery = { ...route.query }
  // 删除不需要的参数
  delete newQuery.projectId
  delete newQuery.token
  delete newQuery.invId
  // 替换路由
  router.replace({ query: newQuery })
  showProjectDetail.value = false
  ElMessage.info('已拒绝邀请')
}

const checkInviteProject = (project: Project) => {
  if (!project) {
    ElMessage.error('项目不存在')
    return false
  }
  if (project.owner.id === userStore.user?.id) {
    ElMessage.error('不能邀请自己加入自己的项目')
    return false
  }
  if (project.recruitedNum >= project.recruitNum) {
    ElMessage.error('项目已招满')
    return false
  }
  if (getProjectStatus(project) === 'completed') {
    ElMessage.error('项目已完成')
    return false
  }
  return true
}

const goToUser = (userId: number) => {
  router.push(`/user/${userId}`)
}

onMounted(() => {
  // 页面初始化时加载项目列表
  loadProjects().then(() => {
    // 检查是否有 projectId 参数
    const projectId = route.query.projectId
    if (projectId) {
      // 查找对应项目
      const project = projects.value.find(p => p.id === Number(projectId))
      if (project) {
        viewProjectDetail(project, true) // 传递一个 isInvite = true
      }
    }
  })
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

@keyframes fadePulse {
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.06; }
}

@keyframes fadePulseDelay {
  0%, 100% { opacity: 0.015; }
  50% { opacity: 0.04; }
}

@keyframes fadePulseSlow {
  0%, 100% { opacity: 0.025; }
  50% { opacity: 0.055; }
}

@keyframes fadePulseFast {
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.045; }
}

@keyframes fadePulseMedium {
  0%, 100% { opacity: 0.015; }
  50% { opacity: 0.035; }
}

@keyframes fadePulseUltraSlow {
  0%, 100% { opacity: 0.025; }
  50% { opacity: 0.065; }
}

@keyframes fadePulseDna {
  0%, 100% { opacity: 0.01; }
  50% { opacity: 0.035; }
}

/* 缓慢旋转动画 */
@keyframes spinGentle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
