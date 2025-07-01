<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden">
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
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <!-- <svg
              class="w-8 h-8 mr-3 text-indigo-600"
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
            </svg> -->
            学习档案
          </h1>
          <p class="text-gray-600 mt-2">云端存储，管理您的学习笔记</p>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类树 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow p-6">
            <div
              :class="[
                'text-lg font-medium mb-4 flex items-center justify-between pt-3 pl-0 pr-3 pb-3 left-0 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                selectedPaper === 0 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900',
              ]"
              @click="selectPaper(0)"
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
                全部笔记
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
              文献笔记
            </h3>

            <div class="space-y-2">
              <div
                v-for="paper in papers"
                :key="paper.id"
                :class="[
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                  selectedPaper === paper.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700',
                ]"
                @click="selectPaper(paper.id)"
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ paper.title.length<15 ? paper.title : paper.title.slice(0,14)+'...' }}</span>
                </div>
                <div class="flex items-center space-x-1" v-if="selectedPaper === paper.id">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="-5 0 20 20" stroke="currentColor" stroke-width="1"
                    @click="toPdfReader(paper.id)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 15l5-5-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧笔记列表 -->
        <div class="lg:w-3/4">
          <!-- 搜索和筛选 -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索笔记内容..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <div class="flex-shrink-0 flex items-center">
                <el-checkbox 
                v-model="noAnnoWithoutComment" 
                size="large"
                label="隐藏无批注笔记"
                />
              </div>
              <el-select v-model="sortBy" placeholder="排序方式" size="large" style="width: 150px">
                <el-option label="时间" value="id" />
                <el-option label="页码" value="page"/>
              </el-select>
            </div>
          </div>

          <!-- 笔记列表 -->
          <div v-if="viewMode === 'list' && filteredAnnos.length>0" class="bg-white rounded-lg shadow">
            <div
              v-for="anno in filteredAnnos"
              :key="anno.id"
              :class="[
                'p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer',
                selectedAnnos.includes(anno.id) ? 'bg-blue-50' : '',
              ]"
              @click="toggleAnnoSelection(anno.id)"
              v-show="anno.comment !== '' || (!noAnnoWithoutComment)"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-16 bg-yellow-100 rounded flex items-center justify-center">
                    <svg 
                      class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="1 1 20 20"
                      style="overflow: visible" >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 
                        1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3
                    @click="handleAnnoAction(`read-${anno.id}`)"
                    class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {{ anno.comment.length>0 ? anno.comment : "（无内容笔记）"}}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ paperId2Title(anno.paperId) }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    PAGE {{ anno.page }}
                  </p>
                </div>

                <div class="flex-shrink-0">
                  <el-dropdown trigger="click" @command="handleAnnoAction">
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
                        <el-dropdown-item :command="`edit-${anno.id}`">
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 
                              1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 
                              0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                          编辑
                        </el-dropdown-item>
                        <el-dropdown-item
                          :command="`delete-${anno.id}`"
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
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"> 
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
            <h3 class="text-lg font-medium text-gray-900 mb-2">暂无笔记</h3>
            <p v-if="annotations.length===0" class="text-gray-500 mb-4">你还没有上传任何笔记</p>
            <p v-else class="text-gray-500 mb-4">这篇文献没有任何笔记</p>
            <button
              @click="toPdfReader(selectedPaper)"
              v-if="selectedPaper>0"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              去阅读这篇文献
            </button>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredAnnos.length"
              layout="prev, pager, next"
              background
            />
          </div>
        </div>
      </div>

      <!-- 编辑批注对话框 -->
      <el-dialog v-model="showCommentEditDialog" title="编辑批注" width="30%">
        <el-form :model="newAnno" label-width="80px">
          <el-form-item label="批注内容">
            <el-input v-model="newAnno.comment" placeholder="请输入批注内容（选填）" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showCommentEditDialog = false, newAnno.comment = ''">取消</el-button>
            <el-button type="primary" @click="editAnnotationComment()">确定</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { libraryAPI } from '@/api/modules/library'
import { annotationAPI } from '@/api/modules/annotation'
import type { FavoritePaper } from '@/api/types/library'
import type { Annotation } from '@/api/types/annotation'

const searchQuery = ref('')
const selectedPaper = ref(0)
const selectedAnnos = ref<string[]>([])
const viewMode = ref('list')
const currentPage = ref(1)
const pageSize = 20
const sortBy = ref('id')

const papers = ref<FavoritePaper[]>([])
const annotations = ref<Annotation[]>([])

const showCommentEditDialog = ref(false)
const newAnno = reactive({
  comment: ''
})
const editingAnnoId = ref('')

const noAnnoWithoutComment = ref(false)

const userStore = useUserStore()
let userId = ''
const initUserInfo = () => {
  if (userStore.user) {
    userId = String(userStore.user.id)
  }
}

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  initUserInfo()
  // console.log(userId)
  if(route.query.paperId) selectedPaper.value = parseInt(route.query.paperId as string)
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
        try {
          console.log("开始读取云端批注了")
          const resanno = await annotationAPI.getAnnotationList(userId, resp.paperId.toString())
          // console.log(resanno)
          resanno.data.forEach(a => annotations.value.push(a))
        } catch (error) {
          ElMessage.error("有一篇文献读取云端笔记失败")
        }
      } catch (error) {
        ElMessage.error('有一篇文献出现了读取问题')
      }
      // console.log(annotations.value)
    })
  } catch (error) {
    ElMessage.error('读取文献列表失败')
  }
})

const filteredAnnos = computed(() => {
  let fAnnos = annotations.value
  if (selectedPaper.value !== 0) {
    fAnnos = fAnnos.filter(anno => anno.paperId === selectedPaper.value)
  }
  if (searchQuery.value) {
    fAnnos = fAnnos.filter(
      anno =>
        anno.comment.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  fAnnos.sort((a, b) => {
    switch (sortBy.value) {
      case 'id':
        return parseInt(b.id) - parseInt(a.id)
      case 'page':
        if (a.paperId != b.paperId) return a.paperId - b.paperId
        return a.page - b.page
      default:
        return parseInt(b.id) - parseInt(a.id)
    }
  })
  return fAnnos
})

const selectPaper = (paperId: number) => {
  selectedPaper.value = paperId
  currentPage.value = 1
}

const toggleAnnoSelection = (annoId: string) => {
  const index = selectedAnnos.value.indexOf(annoId)
  if (index > -1) {
    selectedAnnos.value.splice(index, 1)
  } else {
    selectedAnnos.value.push(annoId)
  }
}

const handleAnnoAction = async (command: string) => {
  // console.log(command)
  const [action, annoId] = command.split('-')

  switch (action) {
    case 'read':
      const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
      if (anno) {
        const paper = papers.value.find(p => p.id === anno.paperId)
        if (paper) {
          router.push({
            path: '/pdf-reader',
            query: {
              url: paper.pdfUrl,
              paperId: paper.id,
              allowEdit: 1,
              page: anno.page,
            },
          })
        } else {
          ElMessage.error("阅读出错了！所属文献不存在")
        }
      } else {
        ElMessage.error("阅读出错了！笔记不存在")
      }
      break
    case 'edit':
      editAnno(annoId)
      break
    case 'delete':
      deleteAnno(annoId)
      break
  }
}

const editAnno = (annoId: string) => {
  editingAnnoId.value = annoId
  newAnno.comment = ''
  const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
  if(anno){
    newAnno.comment = anno.comment
    console.log(anno.comment)
  } 
  showCommentEditDialog.value = true
}

const deleteAnno = async (annoId: string) => {
  try {
    await ElMessageBox.confirm('确定要删除这个笔记吗？', '确认删除', {
      type: 'warning',
    })
    try {
      const anno = annotations.value.find(a => parseInt(a.id) === parseInt(annoId))
      if (anno) await annotationAPI.deleteAnnotation(anno.id)
      annotations.value = annotations.value.filter(a => parseInt(a.id) !== parseInt(annoId))
      ElMessage.success('删除成功')
    } catch (error) {
      ElMessage.error('删除失败，请稍后重试')
    }
  } catch {
    // 用户取消
  }
}

// 编辑批注内容
const editAnnotationComment = async () => {
  try {
    await annotationAPI.editAnnotation(editingAnnoId.value, newAnno.comment)
    let anno = annotations.value.find(a => parseInt(a.id) === parseInt(editingAnnoId.value))
    if (anno) anno.comment = newAnno.comment
    showCommentEditDialog.value = false
    newAnno.comment = ''
    editingAnnoId.value = ''
  } catch (error) {
    ElMessage.error("编辑失败")
  }
};

const toPdfReader = (paperId: number) => {
  let paper = papers.value.find(p => p.id === paperId)
  if (paper) {
    router.push({
      path: '/pdf-reader',
      query: {
        url: paper.pdfUrl,
        paperId: paperId,
        allowEdit: 1,
      },
    })
  }
}

const paperId2Title = (paperId: number) => {
  const paper = papers.value.find(p => p.id === paperId)
  if(paper) return paper.title
  else return "[提取文献标题失败]"
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
