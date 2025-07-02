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
      <!-- 新增：logo+主标题+副标题 -->
      <div class="flex items-center mb-8">
        <svg
          class="w-8 h-8 text-blue-500 mr-3"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"
          />
        </svg>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">科研发现</h1>
          <p class="mt-2 text-gray-600">发现科研人才，拓展学术合作</p>
        </div>
      </div>
      <!-- 搜索栏 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">发现科研人员</h2>
          <div v-if="!isAdvancedSearch" class="flex flex-col sm:flex-row gap-4">
            <!-- 搜索范围选择器 -->
            <div class="relative">
              <select
                v-model="searchType"
                class="appearance-none bg-gradient-to-r from-white to-gray-50 border border-gray-300 hover:border-indigo-400 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[120px]"
              >
                <option value="name" class="py-2">👤 作者名</option>
                <option value="field" class="py-2">🔬 研究领域</option>
                <option value="institution" class="py-2">🏢 机构</option>
                <option value="title" class="py-2">🎓 职称</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <!-- 装饰性边框 -->
              <div
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-200 pointer-events-none"
              ></div>
            </div>

            <div class="flex-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="getSearchPlaceholder()"
                class="block w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-300 hover:border-indigo-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                @keyup.enter="performSearch"
              />
              <!-- 装饰性边框 -->
              <div
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-200 pointer-events-none"
              ></div>
            </div>
            <button
              class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center min-w-[100px]"
              @click="performSearch"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              搜索
            </button>
            <button
              class="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline transition-all duration-200"
              type="button"
              @click="isAdvancedSearch = true"
            >
              组合搜索
            </button>
          </div>

          <!-- 高级搜索表单 -->
          <div v-else class="space-y-4 animate-fade-in-down">
            <div class="flex flex-col sm:flex-row gap-4 items-center">
              <label class="w-32 text-right text-gray-700 font-medium">作者名：</label>
              <input
                v-model="advancedSearch.name"
                type="text"
                placeholder="请输入作者名"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-4 items-center">
              <label class="w-32 text-right text-gray-700 font-medium">研究领域：</label>
              <input
                v-model="advancedSearch.field"
                type="text"
                placeholder="请输入研究领域"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-4 items-center">
              <label class="w-32 text-right text-gray-700 font-medium">机构：</label>
              <input
                v-model="advancedSearch.institution"
                type="text"
                placeholder="请输入机构名称"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-4 items-center">
              <label class="w-32 text-right text-gray-700 font-medium">职称：</label>
              <input
                v-model="advancedSearch.title"
                type="text"
                placeholder="请输入职称"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <div class="flex gap-4 justify-center mt-4">
              <button
                class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2"
                @click="performAdvancedSearch"
              >
                <el-icon><Search /></el-icon>
                搜索
              </button>
              <button
                class="flex items-center gap-2 px-8 py-3 bg-white border-2 border-indigo-300 text-indigo-700 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-indigo-50 hover:border-indigo-500 shadow"
                @click="isAdvancedSearch = false"
              >
                <el-icon><Back /></el-icon>
                返回普通搜索
              </button>
            </div>
          </div>

          <!-- 搜索建议标签 -->
          <div v-if="!isAdvancedSearch" class="mt-4 flex flex-wrap gap-2 justify-center">
            <button
              v-for="suggestion in searchSuggestions"
              :key="suggestion"
              class="px-4 py-2 text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 text-gray-700 hover:text-indigo-700 rounded-full transition-all duration-200 cursor-pointer border border-gray-200 hover:border-indigo-300 hover:shadow-md transform hover:scale-105 font-medium"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>

      <!-- 已应用筛选 -->
      <div
        v-if="hasActiveFilters"
        class="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100 animate-fade-in-down"
      >
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span class="font-medium text-gray-700 text-sm whitespace-nowrap">已应用筛选:</span>
          <div class="flex flex-wrap items-center gap-2">
            <!-- 研究领域筛选标签 -->
            <el-tag
              v-for="fieldValue in filters.selectedFields"
              :key="`field-${fieldValue}`"
              type="primary"
              size="large"
              effect="light"
              closable
              class="custom-filter-tag"
              @close="removeField(fieldValue)"
            >
              {{ fieldValue }}
            </el-tag>
            <!-- 机构筛选标签 -->
            <el-tag
              v-for="instValue in filters.selectedInstitutions"
              :key="`inst-${instValue}`"
              type="success"
              size="large"
              effect="light"
              closable
              class="custom-filter-tag"
              @close="removeInstitution(instValue)"
            >
              {{ instValue }}
            </el-tag>
            <!-- 发表数量筛选标签 -->
            <el-tag
              v-if="publicationsFilterText"
              type="warning"
              size="large"
              effect="light"
              closable
              class="custom-filter-tag"
              @close="removePublicationsRange"
            >
              发表数: {{ publicationsFilterText }}
            </el-tag>
            <!-- 粉丝数筛选标签 -->
            <el-tag
              v-if="followersFilterText && followersFilterText.trim() !== ''"
              type="danger"
              size="large"
              effect="light"
              closable
              class="custom-filter-tag"
              @close="removeFollowersRange"
            >
              粉丝数: {{ followersFilterText }}
            </el-tag>
          </div>
          <el-button type="primary" link class="ml-auto whitespace-nowrap" @click="clearFilters">
            全部清除
          </el-button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 侧边栏筛选 -->
        <div class="lg:w-80 space-y-6">
          <!-- 筛选标题 -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-2">筛选条件</h2>
            <p class="text-sm text-gray-600">发现符合您需求的科研人员</p>
          </div>

          <el-collapse v-model="activeCollapse" accordion class="filter-collapse">
            <!-- 研究领域 -->
            <el-collapse-item name="1">
              <template #title>
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <div
                    class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.586V5L8 4z"
                      />
                    </svg>
                  </div>
                  研究领域
                </h3>
              </template>
              <div
                class="space-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar"
              >
                <label
                  v-for="field in sidebarResearchFields"
                  :key="field.value"
                  class="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center">
                    <input
                      v-model="filters.selectedFields"
                      :value="field.value"
                      type="checkbox"
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {{ field.label }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{
                    field.count
                  }}</span>
                </label>
              </div>
            </el-collapse-item>

            <!-- 所属机构 -->
            <el-collapse-item name="2">
              <template #title>
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <div
                    class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  所属机构
                </h3>
              </template>
              <div
                class="space-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar"
              >
                <label
                  v-for="institution in sidebarInstitutions"
                  :key="institution.value"
                  class="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center">
                    <input
                      v-model="filters.selectedInstitutions"
                      :value="institution.value"
                      type="checkbox"
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {{ institution.label }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{
                    institution.count
                  }}</span>
                </label>
              </div>
            </el-collapse-item>

            <!-- 学术指标 -->
            <el-collapse-item name="3">
              <template #title>
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      class="w-4 h-4 text-pink-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  粉丝数
                </h3>
              </template>
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">粉丝数范围</label>
                <input
                  v-model.number="filters.followersRange.min"
                  type="number"
                  placeholder="最小值"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  @blur="validateFollowersRange"
                />
                <div class="flex items-center justify-center text-gray-400">
                  <div class="w-6 h-px bg-gray-300"></div>
                  <span class="mx-2 text-xs">至</span>
                  <div class="w-6 h-px bg-gray-300"></div>
                </div>
                <input
                  v-model.number="filters.followersRange.max"
                  type="number"
                  placeholder="最大值"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  @blur="validateFollowersRange"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 主内容区 -->
        <div class="flex-1">
          <!-- 结果头部 -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-gray-600">
                  共找到
                  <span class="font-semibold text-indigo-600">{{ filteredUsers.length }}</span>
                  位科研人员
                  <span
                    v-if="searchString && searchString.trim()"
                    class="text-sm text-gray-500 ml-2"
                  >
                    (搜索: "{{ searchString }}")
                  </span>
                </p>
              </div>

              <!-- 排序选项 -->
              <div class="mt-4 sm:mt-0 w-1/5">
                <el-select v-model="filters.sortBy" class="custom-select" placeholder="排序方式">
                  <template #prefix>
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 4h13M3 8h9M3 12h9m-9 4h9m5-4v.01M14 7h6m-6 4h6m-6 4h6M3 16h.01M4 16h.01M5 16h.01"
                      ></path>
                    </svg>
                  </template>
                  <el-option value="relevance" label="按相关性排序"></el-option>
                  <el-option value="followers" label="按粉丝数排序"></el-option>
                  <el-option value="publications" label="按发表数量排序"></el-option>
                  <el-option value="projects" label="按项目数排序"></el-option>
                  <el-option value="name" label="按姓名排序"></el-option>
                </el-select>
              </div>
            </div>
          </div>

          <!-- 研究者卡片网格 -->
          <div
            v-if="paginatedUsers.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <div
              v-for="user in paginatedUsers"
              :key="user.id"
              class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-indigo-200"
              @click="goToUserDetail(user.id)"
            >
              <!-- 用户头部 -->
              <div class="p-6 pb-4">
                <div class="flex items-start space-x-4">
                  <div class="relative flex-shrink-0">
                    <img
                      :src="user.imgUrl ? '/api' + user.imgUrl : '/default-avatar.png'"
                      :alt="user.name || '未知用户'"
                      class="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-indigo-200 transition-colors"
                      @error="handleImageError"
                    />
                    <el-icon
                      v-if="user.gender === '男' || user.gender === 'male'"
                      class="absolute top-0 right-0 bg-white rounded-full p-1 text-blue-500 shadow"
                      style="transform: translate(40%, -40%); font-size: 2em; font-weight: bold"
                      title="男"
                    >
                      <Male />
                    </el-icon>
                    <el-icon
                      v-else-if="user.gender === '女' || user.gender === 'female'"
                      class="absolute top-0 right-0 bg-white rounded-full p-1 text-pink-500 shadow"
                      style="transform: translate(40%, -40%); font-size: 2em; font-weight: bold"
                      title="女"
                    >
                      <Female />
                    </el-icon>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div>
                      <h3
                        class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate"
                        :title="user.name || '未知用户'"
                      >
                        {{ user.name || '未知用户' }}
                      </h3>
                      <p class="text-sm text-gray-600 truncate" :title="user.title || '暂无职称'">
                        {{ user.title || '暂无职称' }}
                      </p>
                      <p
                        class="text-sm text-gray-500 flex items-center mt-1 truncate"
                        :title="user.institution || '未知机构'"
                      >
                        <svg
                          class="w-4 h-4 mr-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span class="truncate">{{ user.institution || '未知机构' }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 研究领域标签 -->
              <div class="px-6 pb-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(field, index) in (user.researchArea || '')
                      .split(',')
                      .slice(0, 2)
                      .filter(field => field.trim())"
                    :key="index"
                    class="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium whitespace-nowrap"
                  >
                    {{ field.trim() }}
                  </span>
                  <el-tooltip
                    v-if="
                      (user.researchArea || '').split(',').filter(field => field.trim()).length > 2
                    "
                    :content="
                      (user.researchArea || '')
                        .split(',')
                        .slice(2)
                        .filter(field => field.trim())
                        .join(', ')
                    "
                    placement="top"
                    effect="dark"
                  >
                    <span
                      class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap cursor-pointer"
                    >
                      +{{
                        (user.researchArea || '').split(',').filter(field => field.trim()).length -
                        2
                      }}
                    </span>
                  </el-tooltip>
                  <!-- 如果没有研究领域，显示默认标签 -->
                  <span
                    v-if="
                      !user.researchArea ||
                      user.researchArea.trim() === '' ||
                      (user.researchArea || '').split(',').filter(field => field.trim()).length ===
                        0
                    "
                    class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium"
                  >
                    暂无研究领域
                  </span>
                </div>
              </div>

              <!-- 学术指标 -->
              <div
                class="px-6 py-4 bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-100"
              >
                <div class="flex items-center justify-center">
                  <div class="group metric-block">
                    <div
                      class="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors"
                    >
                      {{ formatNumber(user.followerNum) }}
                    </div>
                    <div class="text-xs text-gray-500">粉丝数</div>
                  </div>
                  <div class="divider-vertical"></div>
                  <div class="group metric-block">
                    <div
                      class="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors"
                    >
                      {{ formatNumber(user.publishNum) }}
                    </div>
                    <div class="text-xs text-gray-500">发表数</div>
                  </div>
                  <div class="divider-vertical"></div>
                  <div class="group metric-block">
                    <div
                      class="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors"
                    >
                      {{ formatNumber(user.subjectNum) }}
                    </div>
                    <div class="text-xs text-gray-500">项目数</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">未找到匹配的研究者</h3>
            <p class="text-gray-600 mb-6">请尝试调整筛选条件或搜索关键词</p>
            <button
              class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              @click="clearFilters"
            >
              清除筛选条件
            </button>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredUsers.length"
              layout="total, prev, pager, next, jumper"
              background
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  searchCasually,
  searchResearchersByArea,
  searchResearchersByInstitution,
  searchResearchersByName,
  searchResearchersByTitle,
} from '@/api/modules/discover'
import {
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElIcon,
  ElOption,
  ElPagination,
  ElSelect,
  ElTag,
  ElTooltip,
} from 'element-plus'
import { Back, Female, Male, Search } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const activeCollapse = ref('')

const searchSuggestions = ref([
  '人工智能',
  '机器学习',
  '深度学习',
  '计算机视觉',
  '自然语言处理',
  '清华大学',
  '北京大学',
  'MIT',
])

// 用户类型定义
interface User {
  id: number
  name: string
  title: string
  institution: string
  imgUrl: string
  researchArea: string
  followerNum: number
  publishNum: number
  subjectNum: number
  gender: string
}

// 筛选条件
const filters = reactive({
  selectedFields: [] as string[],
  selectedInstitutions: [] as string[],
  followersRange: { min: null as number | null, max: null as number | null },
  publicationsRange: { min: null as number | null, max: null as number | null },
  sortBy: '',
})

// 搜索相关
const searchQuery = ref('')
const searchType = ref('name')
const searchString = ref('')

// 分页
const currentPage = ref(1)
const pageSize = 9

// 模拟用户数据（扩展数据）
const users = ref<User[]>([])

// 高级搜索相关
const isAdvancedSearch = ref(false)
const advancedSearch = reactive({
  name: '',
  field: '',
  institution: '',
  title: '',
})

// 计算过滤后的用户
const filteredUsers = computed(() => {
  let result = users.value.slice()

  // 研究领域筛选
  if (filters.selectedFields.length > 0) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (!user.researchArea) return false
      return user.researchArea
        .split(',')
        .some((field: string) => filters.selectedFields.includes(field.trim()))
    })
  }

  // 机构筛选
  if (filters.selectedInstitutions.length > 0) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (!user.institution) return false
      return filters.selectedInstitutions.includes(user.institution)
    })
  }

  // 发表数量范围筛选
  if (filters.publicationsRange.min !== null) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (user.publishNum === null || user.publishNum === undefined) return false
      return user.publishNum >= filters.publicationsRange.min!
    })
  }
  if (filters.publicationsRange.max !== null) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (user.publishNum === null || user.publishNum === undefined) return false
      return user.publishNum <= filters.publicationsRange.max!
    })
  }

  // 粉丝数范围筛选
  if (filters.followersRange.min !== null) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (user.followerNum === null || user.followerNum === undefined) return false
      return user.followerNum >= filters.followersRange.min!
    })
  }
  if (filters.followersRange.max !== null) {
    result = result.filter((user: User) => {
      // 添加null检查
      if (user.followerNum === null || user.followerNum === undefined) return false
      return user.followerNum <= filters.followersRange.max!
    })
  }

  // 排序
  switch (filters.sortBy) {
    case 'followers':
      result.sort((a: User, b: User) => {
        // 添加null检查
        const aFollowers = a.followerNum ?? 0
        const bFollowers = b.followerNum ?? 0
        return bFollowers - aFollowers
      })
      break
    case 'publications':
      result.sort((a: User, b: User) => {
        // 添加null检查
        const aPublish = a.publishNum ?? 0
        const bPublish = b.publishNum ?? 0
        return bPublish - aPublish
      })
      break
    case 'projects':
      result.sort((a: User, b: User) => {
        // 添加null检查
        const aSubject = a.subjectNum ?? 0
        const bSubject = b.subjectNum ?? 0
        return bSubject - aSubject
      })
      break
    case 'name':
      result.sort((a: User, b: User) => {
        // 添加null检查
        const aName = a.name ?? ''
        const bName = b.name ?? ''
        return aName.localeCompare(bName)
      })
      break
    default:
      // 保持默认顺序或按相关性
      break
  }

  return result
})

// 分页相关计算
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

// 辅助方法
const formatNumber = (num: number) => {
  // 添加null检查
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const performSearch = async () => {
  currentPage.value = 1
  searchString.value = searchQuery.value || ''
  try {
    let response
    if (searchType.value === 'name') {
      response = await searchResearchersByName({ name: searchString.value })
    } else if (searchType.value === 'institution') {
      response = await searchResearchersByInstitution({ institution: searchString.value })
    } else if (searchType.value === 'field') {
      response = await searchResearchersByArea({ area: searchString.value })
    } else if (searchType.value === 'title') {
      response = await searchResearchersByTitle({ title: searchString.value })
    } else {
      // 默认用 name 搜索
      response = await searchResearchersByName({ name: searchString.value })
    }
    if (response && response.data) {
      console.log(response.data)
      users.value = response.data
    } else {
      users.value = []
    }
  } catch (error) {
    console.error('搜索失败:', error)
    users.value = []
  }
}

const selectSuggestion = (suggestion: string) => {
  if (suggestion) {
    searchQuery.value = suggestion
    if (suggestion == '清华大学' || suggestion == '北京大学' || suggestion == 'MIT') {
      searchType.value = 'institution'
    } else {
      searchType.value = 'field'
    }
    // performSearch()
  }
}

const handlePageChange = () => {
  window.scrollTo({ top: 450, behavior: 'smooth' })
}

const getSearchPlaceholder = () => {
  switch (searchType.value) {
    case 'name':
      return '搜索研究者姓名...'
    case 'field':
      return '搜索研究领域...'
    case 'institution':
      return '搜索机构名称...'
    case 'title':
      return '搜索职称...'
    default:
      return '搜索研究者姓名、研究领域、机构...'
  }
}

const clearFilters = () => {
  filters.selectedFields = []
  filters.selectedInstitutions = []
  filters.followersRange = { min: null, max: null }
  filters.publicationsRange = { min: null, max: null }
  filters.sortBy = ''
  searchQuery.value = ''
  searchType.value = 'name'
  currentPage.value = 1
  searchString.value = ''
}

const goToUserDetail = (id: number) => {
  if (id && !isNaN(id)) {
    router.push(`/user/${id}`)
  }
}

// 监听路由参数，支持从首页跳转过来的筛选
onMounted(() => {
  const field = route.query.field as string
  if (field && field.trim()) {
    searchType.value = 'field'
    searchQuery.value = field.trim()
    performSearch()
  }
})

// 已应用筛选相关
const hasActiveFilters = computed(() => {
  return (
    filters.selectedFields.length > 0 ||
    filters.selectedInstitutions.length > 0 ||
    publicationsFilterText.value !== '' ||
    (followersFilterText.value !== '' && followersFilterText.value !== null)
  )
})

const publicationsFilterText = computed(() => {
  const { min, max } = filters.publicationsRange
  const minIsEmpty = min === null || (typeof min === 'string' && min === '') || isNaN(Number(min))
  const maxIsEmpty = max === null || (typeof max === 'string' && max === '') || isNaN(Number(max))

  if (minIsEmpty && maxIsEmpty) return ''
  if (!minIsEmpty && !maxIsEmpty) return `${min} - ${max}`
  if (!minIsEmpty) return `≥ ${min}`
  if (!maxIsEmpty) return `≤ ${max}`
  return ''
})

const followersFilterText = computed(() => {
  const { min, max } = filters.followersRange
  const minIsEmpty = min === null || (typeof min === 'string' && min === '') || isNaN(Number(min))
  const maxIsEmpty = max === null || (typeof max === 'string' && max === '') || isNaN(Number(max))

  if (minIsEmpty && maxIsEmpty) return ''
  if (!minIsEmpty && !maxIsEmpty) return `${min} - ${max}`
  if (!minIsEmpty) return `≥ ${min}`
  if (!maxIsEmpty) return `≤ ${max}`
  return ''
})

const removeField = (field: string) => {
  if (field) {
    filters.selectedFields = filters.selectedFields.filter(f => f !== field)
  }
}

const removeInstitution = (inst: string) => {
  if (inst) {
    filters.selectedInstitutions = filters.selectedInstitutions.filter(i => i !== inst)
  }
}

const removePublicationsRange = () => {
  filters.publicationsRange.min = null
  filters.publicationsRange.max = null
}

const removeFollowersRange = () => {
  filters.followersRange.min = null
  filters.followersRange.max = null
}

// 动态生成研究领域筛选选项
const sidebarResearchFields = computed(() => {
  const fieldCounts = new Map<string, number>()
  users.value.forEach(user => {
    // 添加null检查
    if (!user.researchArea) return

    user.researchArea.split(',').forEach((field: string) => {
      const trimmedField = field.trim()
      if (trimmedField) {
        fieldCounts.set(trimmedField, (fieldCounts.get(trimmedField) || 0) + 1)
      }
    })
  })

  return Array.from(fieldCounts.entries())
    .map(([field, count]) => ({
      value: field,
      label: field,
      count: count,
    }))
    .sort((a, b) => b.count - a.count)
})

// 动态生成所属机构筛选选项
const sidebarInstitutions = computed(() => {
  const instCounts = new Map<string, number>()
  users.value.forEach(user => {
    // 添加null检查
    if (!user.institution) return

    instCounts.set(user.institution, (instCounts.get(user.institution) || 0) + 1)
  })

  return Array.from(instCounts.entries())
    .map(([inst, count]) => ({
      value: inst,
      label: inst,
      count: count,
    }))
    .sort((a, b) => b.count - a.count)
})

const validateFollowersRange = () => {
  const { min, max } = filters.followersRange

  // 如果两个输入框都为空，清除粉丝数筛选条件
  if (min === null && max === null) {
    return
  }

  // 如果只有一个输入框有值，保留该值
  if (min !== null && max === null) {
    return
  }
  if (min === null && max !== null) {
    return
  }

  // 如果两个输入框都有值，检查范围有效性
  if (min !== null && max !== null) {
    // 确保输入的是有效数字
    if (isNaN(min) || isNaN(max)) {
      filters.followersRange.min = null
      filters.followersRange.max = null
      return
    }

    if (min > max) {
      // 如果下限大于上限，将上限调整为下限值
      filters.followersRange.max = min
    }
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target && !target.src.endsWith('/default-avatar.png')) {
    target.src = '/default-avatar.png'
  }
}

const performAdvancedSearch = async () => {
  currentPage.value = 1
  // 组装参数，字段名需与searchCasually接口一致
  const data = {
    queries: {
      name: advancedSearch.name.trim() || '',
      area: advancedSearch.field.trim() || '',
      institution: advancedSearch.institution.trim() || '',
      title: advancedSearch.title.trim() || '',
    },
    filters: {},
    page: 0,
    size: 10000,
  }
  searchString.value = Object.values(data.queries).filter(Boolean).join(' / ')
  try {
    const response = await searchCasually(data)
    if (response && response.data) {
      users.value = response.data
    } else {
      users.value = []
    }
  } catch (error) {
    console.error('高级搜索失败:', error)
    users.value = []
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 卡片动画效果 */
@keyframes cardHover {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-4px) scale(1.02);
  }
}

.group:hover {
  animation: cardHover 0.3s ease-out forwards;
}

.filter-collapse {
  border: none;
  background-color: transparent;
}

.filter-collapse :deep(.el-collapse-item__header) {
  background-color: white;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease-in-out;
}
.filter-collapse :deep(.el-collapse-item__header:hover) {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-color: #e5e7eb;
}
.filter-collapse :deep(.el-collapse-item__header.is-active) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom-color: transparent;
}
.filter-collapse :deep(.el-collapse-item__wrap) {
  background-color: white;
  border: 1px solid #f3f4f6;
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-bottom: 1rem;
}
.filter-collapse :deep(.el-collapse-item__content) {
  padding: 1.5rem;
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.4s ease-out forwards;
}

.custom-filter-tag.el-tag {
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
  transform: scale(1);
}
.custom-filter-tag.el-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
.custom-filter-tag .el-tag__close {
  color: inherit;
  font-size: 14px;
  background-color: transparent;
  transition: all 0.2s ease;
}
.custom-filter-tag .el-tag__close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

/* Pagination Customization */
:deep(.el-pagination.is-background .el-pager li) {
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}
:deep(.el-pagination.is-background .el-pager li:hover) {
  color: #4f46e5;
}
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  color: white;
}
:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next) {
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}
:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover) {
  color: #4f46e5;
}
:deep(.el-pagination__total) {
  font-weight: 600;
  color: #4b5563;
}
:deep(.el-pagination__jump) {
  font-weight: 600;
  color: #4b5563;
}
:deep(.el-pagination__jump .el-input__inner) {
  border-radius: 8px;
  font-weight: 600;
}

/* Custom Select */
.custom-select .el-input__wrapper {
  background: linear-gradient(to right, white, #f9fafb);
  border-radius: 8px !important;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: all 0.2s ease-in-out;
  padding: 0.25rem 0.5rem;
}
.custom-select .el-input__wrapper:hover {
  border-color: #a5b4fc;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.custom-select .el-input__inner {
  font-weight: 500;
  color: #374151;
}
.custom-select .el-select__prefix {
  color: #9ca3af;
}

.divider-vertical {
  width: 1px;
  height: 32px;
  background: #e5e7eb;
  margin: 0 4px;
}
.metric-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 0 12px;
}
@media (max-width: 768px) {
  .divider-vertical {
    display: none;
  }
}

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
  animation:
    spinGentle 40s linear infinite,
    fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-spin-clockwise.animate-fade-pulse-medium {
  animation:
    spinClockwise 35s linear infinite,
    fadePulseMedium 9s ease-in-out infinite 3s;
}
</style>

<style>
.el-select-dropdown__item.selected {
  color: #4f46e5;
  font-weight: 600;
}
.el-select-dropdown__item:hover {
  background-color: #f3f4f6;
}
</style>
