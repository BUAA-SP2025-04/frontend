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
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 
                00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            文献库
          </h1>
          <p class="text-gray-600 mt-2">管理和组织您的研究文献资料</p>
        </div>
        <div class="flex space-x-3">
          <button
            class="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors flex items-center"
            @click="showUploadDialog = true"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            上传文献
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors flex items-center"
            @click="showNewFolderDialog"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            新建分类
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类树 -->
        <div class="lg:w-1/4 sticky top-8 space-y-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div
              :class="[
                'text-lg font-medium mb-4 flex items-center justify-between pt-3 pl-0 pr-3 pb-3 left-0 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                selectedFolder === 0 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900',
              ]"
              @click="selectFolder(0)"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 
                    1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 
                    1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 
                    9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 
                    12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 
                    1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 
                    20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 
                    0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                全部文献
              </div>
              <div class="flex items-center space-x-1 end">
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 mr-8 rounded-full">
                  {{ papers.length }}
                </span>
              </div>
            </div>

            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg
                class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 
                  1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 
                  2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 
                  18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 
                  2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                />
              </svg>
              文献分类
            </h3>

            <div class="space-y-2">
              <div
                v-for="folder in folders"
                :key="folder.id"
                :class="[
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                  selectedFolder === folder.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700',
                ]"
                @click="selectFolder(folder.id)"
                @drop="handleDrop($event, folder.id)"
                @dragover.prevent
                @dragenter.prevent
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{
                    folder.name.length < 11 ? folder.name : folder.name.slice(0, 10) + '...'
                  }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {{ folder.count }}
                  </span>
                  <el-dropdown trigger="click" @command="handleFolderAction">
                    <button
                      class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 
                          1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`edit-${folder.id}`">重命名</el-dropdown-item>
                        <el-dropdown-item :command="`delete-${folder.id}`" divided
                          >删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>

            <div
              :class="[
                'text-lg font-medium mb-4 mt-4 flex items-center justify-between pt-3 pl-0 pr-3 pb-3 left-0 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                selectedFolder === -5 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900',
              ]"
              @click="selectFolder(-5)"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                阅读历史
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow px-6 py-4">
            <div
              :class="[
                'text-lg font-medium mb-4 flex items-center justify-between pt-3 pl-0 pr-3 pb-3 left-0 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                selectedFolder === -10 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900',
              ]"
              @click="selectFolder(-10)"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 ml-1 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75
                    7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823
                    1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                发现文献
              </div>
            </div>

            <!-- 标签云 -->
            <!-- <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">热门标签</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in popularTags"
                  :key="tag.name"
                  :class="[
                    'px-2 py-1 text-xs rounded-full cursor-pointer transition-colors',
                    selectedTags.includes(tag.name)
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                  @click="toggleTag(tag.name)"
                >
                  {{ tag.name }} ({{ tag.count }})
                </span>
              </div>
            </div> -->
          </div>
        </div>

        <!-- 右侧文献列表 -->
        <div class="lg:w-3/4">
          <!-- 搜索和筛选 -->
          <div v-if="selectedFolder !== -10" class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索文献标题、作者或关键词..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <el-select v-model="sortBy" placeholder="排序方式" size="large" style="width: 150px">
                <el-option label="时间" value="id" />
                <el-option label="标题" value="title" />
                <el-option label="作者" value="author" />
                <el-option label="阅读数" value="readcount" />
              </el-select>
              <!-- <el-select v-model="viewMode" size="large" style="width: 120px">
                <el-option label="列表视图" value="list" />
                <el-option label="卡片视图" value="card" />
              </el-select> -->
            </div>
          </div>

          <!-- 文献列表 -->
          <div
            v-if="viewMode === 'list' && filteredPapers.length > 0"
            class="bg-white rounded-lg shadow"
          >
            <div
              v-for="paper in filteredPapers"
              :key="paper.id"
              :class="[
                'p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer',
                selectedPapers.includes(paper.id) ? 'bg-blue-50' : '',
              ]"
              :draggable="true"
              @dragstart="handleDragStart($event, paper)"
              @click="togglePaperSelection(paper.id)"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-16 bg-red-100 rounded flex items-center justify-center">
                    <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 
                        0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3
                    class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    @click="handlePaperAction(`read-${paper.id}`)"
                  >
                    {{ paper.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ paper.authors }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ paper.venue ? paper.venue : '未知' }} •
                    {{ paper.year ? paper.year : '未知' }}
                  </p>

                  <div v-if="paper.keywords" class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="tag in paper.keywords.split(',').filter(Boolean)"
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="mt-3 flex items-center text-sm text-gray-500 space-x-4">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                          7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      阅读: {{ paper.readCount }}
                    </span>
                  </div>
                </div>

                <div class="flex-shrink-0">
                  <el-dropdown trigger="click" @command="handlePaperAction">
                    <button class="p-2 hover:bg-gray-200 rounded-full transition-colors">
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
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 
                          1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`read-${paper.id}`">
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
                              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 
                              0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 
                              2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                          </svg>
                          阅读
                        </el-dropdown-item>
                        <el-dropdown-item :command="`learn-${paper.id}`">
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 
                              1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                          学习
                        </el-dropdown-item>
                        <el-dropdown-item :command="`download-${paper.id}`">
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
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 
                              12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          下载
                        </el-dropdown-item>
                        <!-- <el-dropdown-item :command="`edit-${paper.id}`">
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                            />
                          </svg>
                          编辑
                        </el-dropdown-item> -->
                        <el-dropdown-item
                          v-if="selectedFolder !== -10"
                          :command="`delete-${paper.id}`"
                          divided
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                              4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          删除
                        </el-dropdown-item>
                        <el-dropdown-item
                          v-if="selectedFolder === -10"
                          :command="`favorite-${paper.id}`"
                          divided
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 
                              00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          收藏
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div
            v-else-if="filteredPapers.length === 0 && selectedFolder !== -10"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
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
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0
                1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504
                3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无文献</h3>
            <p v-if="papers.length === 0" class="text-gray-500 mb-4">你还没有上传任何文献</p>
            <p v-else-if="selectedFolder != -5" class="text-gray-500 mb-4">
              这个收藏夹里没有任何文献
            </p>
            <p v-else class="text-gray-500 mb-4">你还没有阅读任何文献</p>
            <button
              v-if="selectedFolder != -5 || papers.length === 0"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              @click="handleFirstPaper"
            >
              上传第一篇文献
            </button>
          </div>

          <!-- 卡片视图 -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="paper in filteredPapers"
              :key="paper.id"
              class="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
              :draggable="true"
              @dragstart="handleDragStart($event, paper)"
              @click="togglePaperSelection(paper.id)"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div
                    class="w-10 h-12 bg-red-100 rounded flex items-center justify-center flex-shrink-0"
                  >
                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 
                        2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <el-checkbox
                    :model-value="selectedPapers.includes(paper.id)"
                    @change="togglePaperSelection(paper.id)"
                  />
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ paper.title }}
                </h3>

                <p v-if="paper.authors" class="text-sm text-gray-600 mb-2">
                  {{ paper.authors.split(',').filter(Boolean).slice(0, 2).join(', ') }}
                  <span v-if="paper.authors.split(',').filter(Boolean).length > 2">等</span>
                </p>

                <p class="text-sm text-gray-500 mb-3">
                  {{ paper.venue ? paper.venue : '未知' }} • {{ paper.year }}
                </p>

                <div v-if="paper.keywords" class="flex flex-wrap gap-1 mb-4">
                  <span
                    v-for="tag in paper.keywords.split(',').filter(Boolean)"
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-between text-xs text-gray-500">
                  <!-- <span>引用 {{ paper.citations }}</span> -->
                  <span>{{ paper.year }}</span>
                </div>
              </div>
            </div>
          </div>
          <discover-literature v-if="selectedFolder === -10" :folders="folders" />

          <!-- 分页 -->
          <div v-if="selectedFolder !== -10" class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredPapers.length"
              layout="prev, pager, next"
              background
            />
          </div>
        </div>
      </div>

      <!-- 上传文献对话框 -->
      <el-dialog v-model="showUploadDialog" width="50%" class="custom-dialog">
        <template #header>
          <div class="dialog-header">
            <h2 class="text-2xl font-bold text-gray-900">上传文献</h2>
            <p class="text-gray-500 mt-1">完善文献信息，便于管理和检索</p>
          </div>
        </template>
        <div class="upload-section bg-gray-50 rounded-xl p-6 mb-4">
          <el-upload
            v-show="!currentFile"
            ref="uploadRef"
            class="upload-demo"
            drag
            :auto-upload="false"
            :on-change="handleFileChange"
            :show-file-list="false"
            accept=".pdf,.doc,.docx"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <div class="upload-area">
              <div class="upload-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#4299e1">
                  <path
                    d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0
                  3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                  />
                </svg>
              </div>
              <div class="upload-text">将文件拖到此处，或<span>点击上传</span></div>
              <div class="upload-tip">支持 PDF 格式，单文件大小不超过50MB</div>
            </div>
          </el-upload>

          <div v-if="currentFile" class="file-info">
            <i class="el-icon-document"></i>
            <div class="file-info-content">
              <div><strong>文件名：</strong> {{ currentFile.name }}</div>
            </div>
            <span class="file-delete-btn" @click="removeFile">
              <i class="el-icon-delete"></i>
            </span>

            <div v-if="currentFile" class="file-actions">
              <button class="action-btn delete" @click="removeFile">
                <i class="el-icon-delete"></i> 删除文件
              </button>
            </div>
          </div>
        </div>

        <div class="form-section">
          <el-form ref="paperForm" :model="newPaper" label-width="120px">
            <el-form-item label="类型" required>
              <el-select v-model="newPaper.type" placeholder="请选择类型" style="width: 100%">
                <el-option label="期刊论文" value="journal" />
                <el-option label="会议论文" value="conference" />
                <el-option label="专利" value="patent" />
                <el-option label="其他" value="other" />
              </el-select>
            </el-form-item>
            <el-form-item label="标题" required>
              <el-input v-model="newPaper.title" placeholder="请输入文献标题" />
            </el-form-item>

            <el-form-item label="作者" required>
              <el-input
                v-model="authorInput"
                placeholder="输入作者姓名后按回车添加"
                clearable
                @keyup.enter="addAuthorTag()"
              ></el-input>
              <div class="tag-container">
                <div v-for="(author, index) in newPaper.authors" :key="index" class="tag">
                  {{ author }}
                  <span class="tag-remove" @click="removeAuthor(index)">×</span>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="期刊/会议">
              <el-input v-model="newPaper.venue" placeholder="请输入期刊/会议名称" />
            </el-form-item>

            <el-form-item label="年份">
              <el-input
                v-model="newPaper.year"
                placeholder="请输入年份"
                maxlength="4"
                type="number"
                class="w-full"
              />
            </el-form-item>

            <el-form-item label="摘要">
              <el-input
                v-model="newPaper.abstract"
                type="textarea"
                :rows="4"
                placeholder="请输入摘要"
              />
            </el-form-item>

            <el-form-item label="关键词">
              <el-input
                v-model="tagInput"
                placeholder="输入关键词后按回车添加"
                clearable
                @keyup.enter="addKeywordTag()"
              ></el-input>
              <div class="tag-container">
                <div v-for="(tag, index) in newPaper.tags" :key="index" class="tag">
                  {{ tag }}
                  <span class="tag-remove" @click="removeTag(index)">×</span>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="doi">
              <el-input v-model="newPaper.doi" placeholder="数字对象标识符" />
            </el-form-item>

            <el-form-item label="所属分类" required>
              <el-select v-model="newPaper.folderName" placeholder="请选择分类" style="width: 100%">
                <el-option
                  v-for="folder in folders"
                  :key="folder.id"
                  :label="folder.name"
                  :value="folder.name"
                >
                  <div style="display: flex; justify-content: space-between">
                    <span>{{ folder.name }}</span>
                    <span style="color: #718096; font-size: 13px">{{ folder.count }} 篇</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="newPaper.type != 'other'" label="是否发表" required>
              <el-checkbox-button v-model="newPaper.isPublic" style="width: 100%">
                {{ newPaper.isPublic ? '已发表' : '未发表' }}
              </el-checkbox-button>
            </el-form-item>

            <label class="required">文献链接</label>
            <div class="url-container">
              <div class="url-display">{{ newPaper.pdfUrl || '文件上传后自动生成URL' }}</div>
            </div>
          </el-form>
        </div>

        <template #footer>
          <span class="dialog-footer flex justify-end gap-4">
            <el-button class="my-modal-cancel" @click="handleCancelUpload">取消</el-button>
            <el-button type="primary" class="my-modal-confirm" @click="handleUpload"
              >上传</el-button
            >
          </span>
        </template>
      </el-dialog>

      <!-- 新建分类对话框 -->
      <el-dialog v-model="showFolderDialog" title="新建分类" width="30%">
        <el-form :model="newFolder" label-width="80px">
          <el-form-item label="分类名称" required>
            <el-input v-model="newFolder.name" placeholder="请输入分类名称" />
          </el-form-item>
          <!-- <el-form-item label="描述">
            <el-input
              v-model="newFolder.description"
              type="textarea"
              placeholder="请输入分类描述"
            />
          </el-form-item> -->
        </el-form>

        <template #footer>
          <span class="dialog-footer flex justify-end gap-4">
            <el-button class="my-modal-cancel" @click="cancelCreateFolder()">取消</el-button>
            <el-button type="primary" class="my-modal-confirm" @click="createFolder"
              >创建</el-button
            >
          </span>
        </template>
      </el-dialog>

      <!-- 重命名分类对话框 -->
      <el-dialog v-model="showFolderRenameDialog" title="重命名分类" width="30%">
        <el-form :model="newFolder" label-width="80px">
          <el-form-item label="分类名称" required>
            <el-input v-model="newFolder.name" placeholder="请输入分类名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelRenameFolder()">取消</el-button>
            <el-button type="primary" @click="renameFolder">重命名</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 收藏文献对话框 -->
      <el-dialog v-model="showFavoriteDialog" title="收藏文献" width="50%">
        <el-form ref="paperForm" :model="newPaper" label-width="120px">
          <el-form-item label="分类" required>
            <el-select v-model="newFolder.id" placeholder="请选择分类" style="width: 100%">
              <el-option
                v-for="folder in folders"
                :key="folder.id"
                :label="folder.name"
                :value="folder.name"
              >
                <div style="display: flex; justify-content: space-between">
                  <span>{{ folder.name }}</span>
                  <span style="color: #718096; font-size: 13px">{{ folder.count }} 篇</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="clearFavoritePaper()">取消</el-button>
            <el-button type="primary" @click="favoritePaper()">收藏</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  ElMessage,
  ElMessageBox,
  type UploadFile,
  type UploadInstance,
  type UploadRawFile,
} from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { libraryAPI } from '@/api/modules/library'
import type { FavoritePaper, Folder, Record } from '@/api/types/library'
import DiscoverLiterature from '@/components/DiscoverLiterature.vue'

const searchQuery = ref('')
const selectedFolder = ref(0)
const selectedTags = ref<string[]>([])
const selectedPapers = ref<number[]>([])
const sortBy = ref('id')
const viewMode = ref('list')
const currentPage = ref(1)
const pageSize = 20
const showUploadDialog = ref(false)
const showFolderDialog = ref(false)
const showFolderRenameDialog = ref(false)
const showFavoriteDialog = ref(false)

const userStore = useUserStore()
let userId = ''
const initUserInfo = () => {
  if (userStore.user) {
    userId = String(userStore.user.id)
  }
}

const folders = ref<Folder[]>([])
const exampleFolders = ref([
  { id: 1, name: '默认分类', count: 156 },
  { id: 2, name: '人工智能', count: 45 },
  { id: 3, name: '机器学习', count: 32 },
  { id: 4, name: '计算机视觉', count: 28 },
  { id: 5, name: '自然语言处理', count: 21 },
  { id: 6, name: '待阅读', count: 18 },
  { id: 7, name: '收藏夹', count: 12 },
])

const popularTags = ref([
  { name: '深度学习', count: 68 },
  { name: '神经网络', count: 45 },
  { name: '卷积神经网络', count: 32 },
  { name: 'Transformer', count: 28 },
  { name: '注意力机制', count: 24 },
  { name: '图神经网络', count: 19 },
  { name: '强化学习', count: 16 },
])

const papers = ref<FavoritePaper[]>([])
const updatePapers = ref<FavoritePaper[]>([])
const examplPapers = ref<FavoritePaper[]>([
  {
    type: '',
    id: 1,
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'].join(', '),
    venue: 'NIPS',
    // citations: 50000,
    readCount: 1250,
    keywords: ['Transformer', '注意力机制', '自然语言处理'].join(', '),
    folderId: 1,
    year: '2024',
    pdfUrl: 'https://example.com/paper1.pdf',
    status: '1',
    isPublic: '1',
  },
  {
    type: '',
    id: 2,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee'].join(', '),
    venue: 'NAACL',
    // citations: 35000,
    readCount: 980,
    keywords: ['BERT', 'Transformer', '预训练'].join(', '),
    folderId: 4,
    year: '2024',
    pdfUrl: 'https://example.com/paper2.pdf',
    status: '1',
    isPublic: '1',
  },
  // 更多模拟数据...
])

const records = ref<Record[]>([])

const newFolder = reactive({
  id: 0,
  name: '',
  // description: '',
})

let renameFolderId = -1
let favoritePaperId = -1

const currentFile = ref<UploadRawFile>()
const uploadRef = ref<UploadInstance | null>(null)
const pdfFile = ref<File | null>(null)
const router = useRouter()

const newPaper = reactive({
  type: '',
  title: '',
  authors: [] as string[],
  venue: '',
  // citations: 0,
  tags: [] as string[],
  folderName: '',
  // publishDate: new Date(),
  pdfUrl: '',
  isPublic: false,
  doi: '',
  abstract: '',
  year: 1700,
})
const authorInput = ref('')
const tagInput = ref('')

onMounted(async () => {
  initUserInfo()
  // console.log(userId)
  try {
    const res = await libraryAPI.getList(userId)
    // console.log(res.data.data)
    let responsePapers = res.data.data
    responsePapers.forEach(async resp => {
      try {
        const respaper = await libraryAPI.getByID(resp.paperId)
        const re = respaper.data.publication
        let paper = {
          type: re.type,
          id: resp.paperId,
          title: re.title,
          authors: '',
          venue: '',
          readCount: 0,
          keywords: '',
          folderId: resp.categoryId,
          pdfUrl: re.pdfUrl,
          status: '',
          isPublic: re.isPublic,
          year: '',
        }
        if (re.authors) {
          paper.authors = re.authors
        }
        if (re.year) {
          paper.year = re.year.toString()
        }
        if (re.keywords) {
          paper.keywords = re.keywords
        }
        if (re.venue) {
          paper.venue = re.venue
        }
        if (re.status) {
          paper.status = re.status
        }
        papers.value.push(paper)
      } catch (error) {
        ElMessage.error('有一篇文献出现了读取问题')
      }
    })
  } catch (error) {
    papers.value = examplPapers.value
    ElMessage.error('读取文献列表失败，即将呈现默认页面')
  }
  try {
    const res = await libraryAPI.getCategoryList(userId)
    // console.log(res.data)
    folders.value = res.data
  } catch (error) {
    folders.value = exampleFolders.value
    ElMessage.error('读取收藏夹失败，即将呈现默认页面')
  }
  if (folders.value.length <= 0) {
    try {
      const res = await libraryAPI.createFolder(parseInt(userId), '默认收藏夹')
      folders.value.push({
        id: res.data,
        name: '默认收藏夹',
        count: 0,
      })
      showFolderDialog.value = false
    } catch (error) {
      ElMessage.error('创建默认收藏夹失败，请手动创建')
    }
  }
  try {
    const res = await libraryAPI.getRecordList(userId)
    // console.log(res.data)
    records.value = res.data
  } catch (error) {
    ElMessage.error('读取历史记录失败')
  }
  try {
    const res = await libraryAPI.getNewPapers()
    // console.log(res.data)
    res.data.forEach(p => {
      let paper = {
        type: p.type,
        id: p.id,
        title: p.title,
        authors: '',
        venue: '',
        readCount: 0,
        keywords: '',
        folderId: 0,
        pdfUrl: p.pdfUrl,
        status: '',
        isPublic: p.isPublic,
        year: '',
      }
      if (p.authors) {
        paper.authors = p.authors
      }
      if (p.year) {
        paper.year = p.year.toString()
      }
      if (p.keywords) {
        paper.keywords = p.keywords
      }
      if (p.venue) {
        paper.venue = p.venue
      }
      if (p.status) {
        paper.status = p.status
      }
      updatePapers.value.push(paper)
    })
  } catch (error) {
    ElMessage.error('读取发现文献列表失败')
  }
  folders.value.forEach(folder => {
    folder.count = papers.value.reduce(
      (count, p) => (p.folderId === folder.id ? count + 1 : count),
      0
    )
  })
  papers.value.forEach(paper => {
    paper.readCount = records.value.reduce(
      (count, r) => (parseInt(r.paperId) === paper.id ? count + 1 : count),
      0
    )
  })
  updatePapers.value.forEach(paper => {
    paper.readCount = records.value.reduce(
      (count, r) => (parseInt(r.paperId) === paper.id ? count + 1 : count),
      0
    )
  })
})

const filteredPapers = computed(() => {
  let fPapers = papers.value
  // console.log(fPapers)
  if (selectedFolder.value !== 0 && selectedFolder.value !== -5 && selectedFolder.value !== -10) {
    fPapers = fPapers.filter(paper => paper.folderId === selectedFolder.value)
    let folder = folders.value.find(f => f.id === selectedFolder.value)
    if (folder?.count) {
      folder.count = fPapers.length
    }
  } else if (selectedFolder.value == -5) {
    fPapers = []
    records.value
      .slice()
      .reverse()
      .forEach(record => {
        if (!fPapers.some(p => p.id === parseInt(record.paperId))) {
          let paper = papers.value.find(p => p.id === parseInt(record.paperId))
          if (paper) fPapers.push(paper)
        }
      })
  } else if (selectedFolder.value == -10) {
    fPapers = []
    updatePapers.value.forEach(p => {
      if (p.isPublic == '1') {
        fPapers.push(p)
      }
    })
  }

  if (searchQuery.value) {
    fPapers = fPapers.filter(
      paper =>
        paper.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        paper.authors?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        paper.keywords?.includes(searchQuery.value)
    )
  }

  if (selectedTags.value.length > 0) {
    fPapers = fPapers.filter(paper => selectedTags.value.some(tag => paper.keywords?.includes(tag)))
  }

  // 排序
  if (selectedFolder.value != -5 && selectedFolder.value != -10) {
    fPapers.sort((a, b) => {
      switch (sortBy.value) {
        case 'id':
          return a.id - b.id
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          if (a.authors && b.authors) {
            return a.authors[0].localeCompare(b.authors[0])
          } else {
            return 1
          }
        case 'readcount':
          if (a.readCount && b.readCount) {
            return b.readCount - a.readCount
          } else {
            return 1
          }
        default:
          if (a.year && b.year) {
            return parseInt(b.year) - parseInt(a.year)
          } else {
            return 1
          }
      }
    })
  }

  return fPapers
})

const selectFolder = (folderId: number) => {
  selectedFolder.value = folderId
  currentPage.value = 1
}

const togglePaperSelection = (paperId: number) => {
  const index = selectedPapers.value.indexOf(paperId)
  if (index > -1) {
    selectedPapers.value.splice(index, 1)
  } else {
    selectedPapers.value.push(paperId)
  }
}

const handleDragStart = (event: DragEvent, paper: any) => {
  event.dataTransfer?.setData('application/json', JSON.stringify(paper))
}

const clearFavoritePaper = () => {
  showFavoriteDialog.value = false
  favoritePaperId = -1
}

const handleDrop = (event: DragEvent, folderId: number) => {
  event.preventDefault()
  const paperData = event.dataTransfer?.getData('application/json')
  if (paperData) {
    const paper = JSON.parse(paperData)
    movePaperToFolder(paper.id, folderId)
  }
}

const movePaperToFolder = async (paperId: number, folderId: number) => {
  const paper = papers.value.find(p => p.id === paperId)
  if (paper) {
    try {
      const folder1 = folders.value.find(f => f.id === paper.folderId)
      if (folder1?.count != undefined) folder1.count -= 1
      // console.log(userId, paper.id.toString(), folderId.toString())
      await libraryAPI.changeCategory(userId, paper.id.toString(), folderId.toString())
      paper.folderId = folderId
      const folder2 = folders.value.find(f => f.id === folderId)
      if (folder2?.count != undefined) folder2.count += 1
      ElMessage.success('文献已移动到新分类')
    } catch (error) {
      const folder1 = folders.value.find(f => f.id === paper.folderId)
      if (folder1?.count != undefined) folder1.count += 1
      ElMessage.error('文献移动失败')
    }
  }
}

const handlePaperAction = async (command: string) => {
  const [action, id] = command.split('-')
  const paperId = parseInt(id)

  switch (action) {
    case 'read':
      try {
        let paper = papers.value.find(p => p.id === paperId)
        if (paper) {
          if (paper.readCount != undefined) paper.readCount = paper.readCount + 1
          console.log('开始记录' + paperId + '的阅读记录')
          let res = await libraryAPI.createRecord(userId, paperId.toString()) // 暂时去除全局文献阅读记录的功能
          records.value
            .reverse()
            .push({ userId: userId, paperId: paperId.toString(), id: res.data.id })
          records.value.reverse()
        } else {
          paper = updatePapers.value.find(p => p.id === paperId)
          if (paper && paper.readCount != undefined) paper.readCount = paper.readCount + 1
        }
      } catch (error) {
        ElMessage.error('创建历史记录失败')
      }
      let paper = papers.value.find(p => p.id === paperId)
      if (paper) {
        router.push({
          path: '/pdf-reader',
          query: {
            url: paper.pdfUrl,
            paperId: paperId,
            allowEdit: 1,
            title: paper.title,
          },
        })
        // window.open(`/pdf-readerpdfUrl=${paper.pdfUrl}`, '_blank')
      } else {
        paper = updatePapers.value.find(p => p.id === paperId)
        if (paper && paper.pdfUrl)
          router.push({
            path: '/pdf-reader',
            query: {
              url: paper.pdfUrl,
              paperId: paperId,
              allowEdit: 1,
            },
          })
        // window.open(`/pdf-readerpdfUrl=${paper.pdfUrl}`, '_blank')
      }
      break
    case 'download':
      downloadPaper(paperId)
      break
    case 'edit':
      editPaper(paperId)
      break
    case 'delete':
      deletePaper(paperId)
      break
    case 'favorite':
      favoritePaperShow(paperId)
      break
    case 'learn':
      router.push({
        path: '/learning',
        query: {
          paperId: paperId,
        },
      })
      break
  }
}

const handleFolderAction = (command: string) => {
  const [action, id] = command.split('-')
  let fid = parseInt(id)
  switch (action) {
    case 'edit':
      editFolder(fid)
      break
    case 'delete':
      deleteFolder(fid)
      break
  }
}

const downloadPaper = (paperId: number) => {
  const paper = papers.value.find(p => p.id === paperId)
  if (paper?.pdfUrl) {
    window.open(paper.pdfUrl, '_blank')
    ElMessage.success('开始下载文献')
  }
}

const editPaper = (paperId: number) => {
  ElMessage.info('编辑功能开发中...')
}

const deletePaper = async (paperId: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文献吗？', '确认删除', {
      type: 'warning',
    })
    try {
      const folder = folders.value.find(
        f => f.id === papers.value.find(p => p.id === paperId)?.folderId
      )
      if (folder?.count != undefined) folder.count -= 1
      let paper = papers.value.find(p => p.id === paperId)
      if (paper && paper.pdfUrl) await libraryAPI.deleteUrlFile(paper.pdfUrl)
      await libraryAPI.deletePaper(userId, paperId.toString())
      if (paper && paper.isPublic === '0') await libraryAPI.deletePublication(paperId.toString())
      records.value.forEach(async r => {
        if (r.paperId === paperId.toString()) {
          await libraryAPI.deleteRecord(parseInt(r.id))
        }
      })
      papers.value = papers.value.filter(p => p.id !== paperId)
      ElMessage.success('删除成功')
    } catch (error) {
      const folder = folders.value.find(
        f => f.id === papers.value.find(p => p.id === paperId)?.folderId
      )
      if (folder?.count != undefined) folder.count += 1
      ElMessage.error('删除失败，请稍后重试')
    }
  } catch {
    // 用户取消
  }
}

const favoritePaperShow = async (paperId: number) => {
  favoritePaperId = paperId
  showFavoriteDialog.value = true
}

const favoritePaper = async () => {
  try {
    await libraryAPI.favoritePaper(parseInt(userId), favoritePaperId, newFolder.id)
  } catch (error) {
    ElMessage.error('收藏失败，请稍后重试')
  }
}

const editFolder = async (folderId: number) => {
  renameFolderId = folderId
  showFolderRenameDialog.value = true
  newFolder.name = ''
}

const renameFolder = async () => {
  if (!newFolder.name.trim()) {
    ElMessage.error('请输入分类名称')
    return
  } else {
    if (
      folders.value.some(folder => folder.name === newFolder.name && folder.id !== renameFolderId)
    ) {
      ElMessage.error('分类名称重复')
      return
    }
  }
  try {
    await libraryAPI.renameFolder(renameFolderId.toString(), newFolder.name)
    folders.value.forEach(folder => {
      if (folder.id == renameFolderId) {
        folder.name = newFolder.name
      }
    })
    showFolderRenameDialog.value = false
    ElMessage.success('分类重命名成功')
  } catch (error) {
    ElMessage.error('重命名失败')
  }
  newFolder.name = ''
}

const deleteFolder = async (folderId: number) => {
  if (folders.value.length <= 1) {
    ElMessage.error('删除后将没有收藏夹！')
  } else
    try {
      await ElMessageBox.confirm('确定要删除这个分类吗？收藏夹下所有文献也将被删除。', '确认删除', {
        type: 'warning',
      })
      try {
        console.log(folderId)
        await libraryAPI.deleteFolder(folderId)
        folders.value = folders.value.filter(f => f.id !== folderId)
        papers.value.forEach(async p => {
          if (p.folderId === folderId) {
            await libraryAPI.deletePaper(userId, p.id.toString())
            if (p.isPublic === '0') {
              if (p.pdfUrl) {
                await libraryAPI.deleteUrlFile(p.pdfUrl)
              }
              await libraryAPI.deletePublication(p.id.toString())
            }
            records.value.forEach(async r => {
              if (r.paperId === p.id.toString()) {
                await libraryAPI.deleteRecord(parseInt(r.id))
              }
            })
          }
        })
        papers.value = papers.value.filter(p => p.folderId !== folderId)
        ElMessage.success('删除成功')
      } catch {
        ElMessage.error('删除失败')
      }
    } catch {
      // 用户取消
    }
}

const createFolder = async () => {
  if (!newFolder.name.trim()) {
    ElMessage.error('请输入分类名称')
    return
  }
  try {
    const res = await libraryAPI.createFolder(parseInt(userId), newFolder.name)
    folders.value.push({
      id: res.data,
      name: newFolder.name,
      count: 0,
    })
    showFolderDialog.value = false
    newFolder.name = ''
    ElMessage.success('收藏夹创建成功')
  } catch (error) {
    ElMessage.error('创建收藏夹失败')
  }
}

const handleFileChange = async (file: UploadFile) => {
  try {
    if (file && file.raw) {
      const formData = new FormData()
      pdfFile.value = file.raw ?? null
      formData.append('file', pdfFile.value)
      currentFile.value = file.raw
      // 自动填充标题（去除扩展名）
      const fileName = file.name
      const dotIndex = fileName.lastIndexOf('.')
      newPaper.title = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName
      // 生成文件URL并填充
      const res = await libraryAPI.getFileUrl(formData)
      // const fileUrl = URL.createObjectURL(file.raw);
      newPaper.pdfUrl = res.data
    }
  } catch (error) {
    if (uploadRef.value) {
      uploadRef.value.clearFiles()
    }
    currentFile.value = undefined
    pdfFile.value = null
    newPaper.pdfUrl = ''
    newPaper.title = ''
    ElMessage.error('创建URL失败')
  }
}

const handleUpload = async () => {
  if (
    newPaper.title.trim() &&
    newPaper.authors.length > 0 &&
    newPaper.pdfUrl.trim() &&
    newPaper.folderName.trim() &&
    newPaper.year
  ) {
    try {
      await ElMessageBox.confirm('确定要上传这些信息？', '确认上传', {
        type: 'warning',
      })
      let folderId = -1
      let folder0 = folders.value.find(folder => folder.name === newPaper.folderName)
      let isPublic = newPaper.isPublic && newPaper.type !== 'other' ? '1' : '0'
      if (folder0) {
        folderId = folder0.id
        let paper = {
          type: newPaper.type,
          title: newPaper.title,
          authors: [...newPaper.authors].join(', '),
          venue: newPaper.venue,
          year: newPaper.year.toString(),
          keywords: [...newPaper.tags].join(', '),
          pdfUrl: newPaper.pdfUrl,
          status: '',
          isPublic: isPublic,
          doi: newPaper.doi,
          abstract: newPaper.abstract,
        }
        // console.log('即将上传')
        const res = await libraryAPI.createPaper(userId, folderId, paper)
        papers.value.push({
          type: newPaper.type,
          id: res.data,
          title: newPaper.title,
          authors: [...newPaper.authors].join(', '),
          venue: newPaper.venue,
          // citations: newPaper.citations,
          readCount: 0,
          keywords: [...newPaper.tags].join(', '),
          folderId: folderId,
          // publishDate: newPaper.publishDate.toString().slice(0,10),
          year: newPaper.year.toString(),
          pdfUrl: newPaper.pdfUrl,
          status: '',
          isPublic: isPublic,
          doi: newPaper.doi,
          abstract: newPaper.abstract,
        })
        const folder = folders.value.find(f => f.id === folderId)
        if (folder?.count != undefined) folder.count += 1
        ElMessage.success('文献上传成功')
        showUploadDialog.value = false
        resetNewPaper()
        if (uploadRef.value) {
          uploadRef.value.clearFiles()
        }
        currentFile.value = undefined
        pdfFile.value = null
        location.reload()
      } else {
        ElMessage.error('文件夹关系出错，请刷新后重试')
      }
    } catch {
      console.log('用户取消')
      // 用户取消
    }
  } else {
    ElMessage.error('请填写所有必填信息')
  }
}

const handleExceed = () => {
  ElMessage.warning('一次只能上传一个文件')
}
const removeFile = async () => {
  try {
    await libraryAPI.deleteUrlFile(newPaper.pdfUrl)
    if (uploadRef.value) {
      uploadRef.value.clearFiles()
    }
    pdfFile.value = null
    currentFile.value = undefined
    newPaper.pdfUrl = ''
    newPaper.title = ''
    ElMessage.info('已移除上传的文件')
  } catch (error) {
    ElMessage.error('移除失败，可能是数据库连接出现了问题')
  }
}

const removeAuthor = (index: number) => {
  newPaper.authors.splice(index, 1)
}
const removeTag = (index: number) => {
  newPaper.tags.splice(index, 1)
}

const resetNewPaper = async () => {
  try {
    // await libraryAPI.deleteUrlFile(newPaper.pdfUrl)
    if (uploadRef.value) {
      uploadRef.value.clearFiles()
    }
    // ElMessage.info('已移除上传的文件');
  } catch (error) {
    // ElMessage.error('移除失败，可能是数据库连接出现了问题')
  }
  newPaper.title = ''
  newPaper.authors = []
  newPaper.venue = ''
  // newPaper.citations = 0
  newPaper.tags = []
  newPaper.folderName = ''
  newPaper.year = 1700
  currentFile.value = undefined
  newPaper.pdfUrl = ''
  newPaper.title = ''
  authorInput.value = ''
  tagInput.value = ''
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const handleCancelUpload = () => {
  showUploadDialog.value = false
  cancelUpload()
}

const cancelUpload = async () => {
  try {
    if (newPaper.pdfUrl.trim()) await libraryAPI.deleteUrlFile(newPaper.pdfUrl)
    currentFile.value = undefined
  } catch (error) {
    console.log('云端删除失败')
  }
  showUploadDialog.value = false
  resetNewPaper()
}

const handleFirstPaper = () => {
  if (selectedFolder.value > 0) {
    const folder = folders.value.find(f => f.id === selectedFolder.value)
    if (folder) {
      newPaper.folderName = folder.name
    }
  }
  showUploadDialog.value = true
}

const cancelCreateFolder = () => {
  showFolderDialog.value = false
  newFolder.name = ''
}

const cancelRenameFolder = () => {
  showFolderRenameDialog.value = false
  newFolder.name = ''
}

const showNewFolderDialog = () => {
  showFolderDialog.value = true
  newFolder.name = ''
}

// 添加作者 tag
function addAuthorTag() {
  const val = authorInput.value.trim()
  if (val && !newPaper.authors.includes(val)) {
    newPaper.authors.push(val)
  }
  authorInput.value = ''
}

// 添加关键词 tag
function addKeywordTag() {
  const val = tagInput.value.trim()
  if (val && !newPaper.tags.includes(val)) {
    newPaper.tags.push(val)
  }
  tagInput.value = ''
}

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background: #4299e1;
  color: white;
  padding: 2px 8px;
  border-radius: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.tag:hover {
  background: #3182ce;
  transform: translateY(-1px);
}

.tag-remove {
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.file-info {
  margin-bottom: 15px;
  padding: 15px;
  background: #ebf8ff;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.file-info-content {
  flex-grow: 1;
}

.action-btn.delete {
  position: central;
  top: 8px;
  right: 8px;
  cursor: pointer;
  color: #e53e3e;
  font-size: 18px;
  transition: transform 0.2s;
}

.file-delete-btn:hover {
  transform: scale(1.2);
}

.upload-demo {
  padding: 0;
  margin: 20px 0;
}

.upload-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ebf8ff;
  border-radius: 50%;
  color: #4299e1;
}

.upload-area {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  background: #f7fafc;
}

.upload-text {
  margin: 15px 0;
  color: #4a5568;
  font-size: 16px;
}

.upload-text em {
  color: #4299e1;
  font-style: normal;
  font-weight: 600;
}

.upload-tip {
  color: #718096;
  font-size: 14px;
  margin-top: 8px;
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

.my-modal-confirm {
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%) !important;
  color: #fff !important;
  border-radius: 8px !important;
  font-weight: 600;
  border: none;
  min-width: 90px;
}
.my-modal-cancel {
  background: #f1f5f9 !important;
  color: #64748b !important;
  border-radius: 8px !important;
  font-weight: 600;
  border: none;
  min-width: 90px;
}
</style>
