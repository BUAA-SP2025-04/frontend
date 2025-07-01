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
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          个人资料
        </h1>
        <p class="text-gray-600 mt-2">管理您的个人信息和账户设置</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧头像和基本信息 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="userInfo.imgUrl || `/default-avatar.png`"
                  alt="头像"
                  class="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                />
                <label
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition duration-150 shadow-lg cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    ref="avatarInput"
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    @change="handleAvatarChange"
                  />
                </label>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mt-4">{{ userInfo.name }}</h2>
              <p class="text-gray-600">{{ userInfo.title }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ userInfo.institution }}</p>

              <!-- 认证状态 -->
              <div
                class="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                已认证
              </div>
              <!-- 只在一侧显示文字的关注信息按钮，不控制统计数据显示 -->
              <div class="mt-4 flex items-center justify-center gap-2">
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:bg-green-200"
                  v-if="showFollowInfo"
                  @click="handleFollowInfoClick"
                >
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  展示关注信息
                </div>
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:bg-red-200"
                  v-else
                  @click="handleFollowInfoClick"
                >
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.53-10.47a.75.75 0 00-1.06-1.06L10 8.94 7.53 6.47a.75.75 0 10-1.06 1.06L8.94 10l-2.47 2.47a.75.75 0 101.06 1.06L10 11.06l2.47 2.47a.75.75 0 101.06-1.06L11.06 10l2.47-2.47z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  隐藏关注信息
                </div>
              </div>
              <!-- 统计信息卡片 -->
              <div class="grid grid-cols-3 gap-4 mt-6 max-w-xs mx-auto">
                <div
                  class="text-center cursor-pointer transition-all duration-200 hover:scale-105"
                  @click="handleShowFollowList"
                >
                  <div
                    class="text-2xl font-bold text-indigo-600 transition-colors duration-200 hover:text-indigo-700"
                  >
                    {{ userInfo.followerNum }}
                  </div>
                  <div
                    class="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-600"
                  >
                    关注数
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ userInfo.publishNum }}</div>
                  <div class="text-xs text-gray-500">论文数</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ userInfo.subjectNum }}</div>
                  <div class="text-xs text-gray-500">项目数</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧表单区域 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md">
            <!-- 标签页导航 -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  :class="[
                    'py-4 px-1 border-b-2 font-medium text-sm transition duration-150 flex items-center',
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                  @click="activeTab = tab.id"
                >
                  <component :is="tab.icon" class="w-4 h-4 mr-2" />
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <!-- 基本信息表单 -->
            <div v-if="activeTab === 'basic'" class="p-6">
              <el-form :model="userInfo" label-width="100px" class="space-y-6">
                <el-form-item label="姓名">
                  <el-input v-model="userInfo.name" placeholder="请输入姓名" disabled />
                </el-form-item>

                <el-form-item label="邮箱">
                  <el-input
                    v-model="userInfo.email"
                    type="email"
                    placeholder="请输入邮箱"
                    disabled
                  />
                </el-form-item>

                <el-form-item label="性别">
                  <el-input v-model="userInfo.gender" placeholder="请输入性别" disabled />
                </el-form-item>

                <el-form-item label="职位">
                  <el-select v-model="userInfo.title" placeholder="请选择职位" class="w-full">
                    <el-option
                      v-for="item in titleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="机构">
                  <el-input v-model="userInfo.institution" placeholder="请输入所属机构" disabled />
                </el-form-item>

                <el-form-item label="个人简介">
                  <el-input
                    v-model="userInfo.bio"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入个人简介"
                  />
                </el-form-item>

                <el-form-item label="研究领域">
                  <el-select
                    v-model="researchAreaArray"
                    placeholder="请选择研究领域"
                    class="w-full"
                    multiple
                  >
                    <el-option label="计算机科学" value="计算机科学" />
                    <el-option label="人工智能" value="人工智能" />
                    <el-option label="机器学习" value="机器学习" />
                    <el-option label="数据科学" value="数据科学" />
                    <el-option label="生物信息学" value="生物信息学" />
                    <el-option label="物理学" value="物理学" />
                    <el-option label="化学" value="化学" />
                    <el-option label="数学" value="数学" />
                    <el-option label="材料科学" value="材料科学" />
                    <el-option label="环境科学" value="环境科学" />
                    <el-option label="地球科学" value="地球科学" />
                    <el-option label="天文学" value="天文学" />
                    <el-option label="医学" value="医学" />
                    <el-option label="药学" value="药学" />
                    <el-option label="心理学" value="心理学" />
                    <el-option label="社会学" value="社会学" />
                    <el-option label="经济学" value="经济学" />
                    <el-option label="管理学" value="管理学" />
                    <el-option label="法学" value="法学" />
                    <el-option label="教育学" value="教育学" />
                    <el-option label="历史学" value="历史学" />
                    <el-option label="哲学" value="哲学" />
                    <el-option label="语言学" value="语言学" />
                    <el-option label="政治学" value="政治学" />
                    <el-option label="艺术学" value="艺术学" />
                    <el-option label="农学" value="农学" />
                    <el-option label="工程学" value="工程学" />
                    <el-option label="电子科学" value="电子科学" />
                    <el-option label="自动化" value="自动化" />
                    <el-option label="交通运输" value="交通运输" />
                    <el-option label="能源科学" value="能源科学" />
                    <el-option label="海洋科学" value="海洋科学" />
                    <el-option label="统计学" value="统计学" />
                    <el-option label="信息科学" value="信息科学" />
                    <el-option label="新闻传播学" value="新闻传播学" />
                    <el-option label="体育学" value="体育学" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>

                <div class="flex justify-end space-x-4">
                  <el-button @click="resetForm">重置</el-button>
                  <el-button type="primary" :loading="saving" @click="saveProfile">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    保存更改
                  </el-button>
                </div>
              </el-form>
            </div>

            <!-- 密码修改 -->
            <div v-if="activeTab === 'security'" class="p-6">
              <el-form :model="passwordForm" label-width="100px" class="space-y-6">
                <el-form-item label="当前密码">
                  <el-input v-model="passwordForm.currentPassword" type="password" show-password />
                </el-form-item>

                <el-form-item label="新密码">
                  <el-input v-model="passwordForm.newPassword" type="password" show-password />
                </el-form-item>

                <el-form-item label="确认密码">
                  <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
                </el-form-item>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div class="flex">
                    <svg
                      class="w-5 h-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="text-sm text-yellow-800">
                      <p>密码安全提示：</p>
                      <ul class="list-disc list-inside mt-1">
                        <li>密码长度至少8位</li>
                        <li>包含字母、数字</li>
                        <li>定期更换密码</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <el-button type="primary" @click="changePassword">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    修改密码
                  </el-button>
                </div>
              </el-form>
            </div>

            <!-- 隐私设置 -->
            <!-- <div v-if="activeTab === 'privacy'" class="p-6">
              <div class="space-y-6">
                <h3 class="text-lg font-medium text-gray-900">隐私设置</h3>

                <div class="space-y-4">
                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">公开个人资料</h4>
                      <p class="text-sm text-gray-500">允许其他用户查看您的完整个人资料</p>
                    </div>
                    <el-switch v-model="privacySettings.publicProfile" />
                  </div>

                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">显示研究成果</h4>
                      <p class="text-sm text-gray-500">在个人资料中展示您的研究成果和发表论文</p>
                    </div>
                    <el-switch v-model="privacySettings.showAchievements" />
                  </div>

                  <div class="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">接收站内消息</h4>
                      <p class="text-sm text-gray-500">允许其他用户向您发送私信</p>
                    </div>
                    <el-switch v-model="privacySettings.allowMessages" />
                  </div>

                  <div class="flex items-center justify-between py-4">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                      <p class="text-sm text-gray-500">接收重要活动和消息的邮件通知</p>
                    </div>
                    <el-switch v-model="privacySettings.emailNotifications" />
                  </div>
                </div>

                <div class="flex justify-end">
                  <el-button type="primary" @click="savePrivacySettings"> 保存设置 </el-button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <FollowersDialog v-model:visible="ifShowFollowList" :id="userStore.user?.id || 0" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  updateUserProfile,
  uploadUserImg,
  changeUserPassword,
  getUserInfo,
  getShowFollow,
  setShowFollow,
} from '@/api/modules/user'
import { useUserStore } from '@/stores/user'
import FollowersDialog from '@/components/user/FollowersDialog.vue'

// 图标组件
const UserIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      }),
    ]
  )

const SecurityIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      }),
    ]
  )

const PrivacyIcon = () =>
  h(
    'svg',
    {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      }),
    ]
  )

const activeTab = ref('basic')
const saving = ref(false)

const userStore = useUserStore()
const ifShowFollowList = ref(false)

const tabs = [
  { id: 'basic', name: '基本信息', icon: UserIcon },
  { id: 'security', name: '账户安全', icon: SecurityIcon },
  // { id: 'privacy', name: '隐私设置', icon: PrivacyIcon },
]

const genderMap = {
  male: '男',
  female: '女',
}

const userInfo = reactive({
  id: '',
  name: '',
  email: '',
  gender: '',
  title: '',
  institution: '',
  bio: '',
  researchArea: '',
  imgUrl: '',
  followerNum: 0,
  publishNum: 0,
  subjectNum: 0,
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const privacySettings = reactive({
  publicProfile: true,
  showAchievements: true,
  allowMessages: true,
  emailNotifications: false,
})

const avatarInput = ref<HTMLInputElement | null>(null)
const researchAreaArray = computed({
  get: () => (userInfo.researchArea ? userInfo.researchArea.split(',') : []),
  set: (val: string[]) => {
    userInfo.researchArea = val.join(',')
  },
})

const titleOptions = [
  { label: '教授', value: '教授' },
  { label: '副教授', value: '副教授' },
  { label: '讲师', value: '讲师' },
  { label: '博士后', value: '博士后' },
  { label: '博士生', value: '博士生' },
  { label: '硕士生', value: '硕士生' },
  { label: '本科生', value: '本科生' },
  { label: '其他', value: '其他' },
]

const showFollowInfo = ref(true)

// 初始化用户信息
const initUserInfo = async () => {
  const res = await getUserInfo()
  console.log(res)
  if (res.data) {
    userInfo.id = String(res.data.id)
    userInfo.name = res.data.name || ''
    userInfo.email = res.data.email || ''
    userInfo.gender = genderMap[res.data.gender as keyof typeof genderMap] || res.data.gender || ''
    userInfo.title = res.data.title || ''
    userInfo.institution = res.data.institution || ''
    userInfo.imgUrl = res.data.imgUrl ? '/api' + res.data.imgUrl : '/default-avatar.png'
    userInfo.bio = res.data.bio || ''
    userInfo.researchArea = res.data.researchArea || ''
    userInfo.followerNum = res.data.followerNum || 0
    userInfo.publishNum = res.data.publishNum || 0
    userInfo.subjectNum = res.data.subjectNum || 0
  }
  getShowFollow(res.data.id).then(res => {
    showFollowInfo.value = res.data
  })
}

onMounted(() => {
  initUserInfo() // 先初始化显示当前用户信息
})

const saveProfile = async () => {
  // 1. 必填项校验
  if (
    !userInfo.name ||
    !userInfo.email ||
    !userInfo.gender ||
    !userInfo.institution ||
    !userInfo.title ||
    !userInfo.researchArea
  ) {
    ElMessage.error('必要信息缺失，个人资料保存失败')
    return
  }

  saving.value = true
  try {
    await updateUserProfile({
      bio: userInfo.bio,
      researchArea: userInfo.researchArea,
      title: userInfo.title,
    })

    userStore.setUser({
      bio: userInfo.bio,
      researchArea: userInfo.researchArea,
      title: userInfo.title,
    })

    initUserInfo()
    ElMessage.success('个人资料保存成功')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

const resetForm = () => {
  // 重置表单逻辑
  ElMessage.info('表单已重置')
}

const changePassword = async () => {
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    ElMessage.error('请填写所有密码字段')
    return
  }
  if (passwordForm.newPassword.length < 8) {
    ElMessage.error('新密码长度至少8位')
    return
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(passwordForm.newPassword)) {
    ElMessage.error('新密码必须包含字母和数字')
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }

  try {
    await changeUserPassword({
      originPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })
    ElMessage.success('密码修改成功')
    Object.assign(passwordForm, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  } catch (error) {
    ElMessage.error('密码修改失败')
  }
}

const savePrivacySettings = async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    ElMessage.success('隐私设置保存成功')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  }
}

const handleAvatarChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const file = files[0]
  const formData = new FormData()
  formData.append('img', file)
  try {
    const res = await uploadUserImg(formData)
    const imgUrl = res.imgUrl
    userInfo.imgUrl = imgUrl
    userStore.setUser({ imgUrl })
    ElMessage.success('头像上传成功')
    console.log(userStore.user)
    initUserInfo()
  } catch (error) {
    ElMessage.error('头像上传失败')
  }
}

// 点击关注信息按钮的处理函数
const handleFollowInfoClick = () => {
  if (showFollowInfo.value) {
    setShowFollow(false)
    showFollowInfo.value = false
  } else {
    setShowFollow(true)
    showFollowInfo.value = true
  }
}

const handleShowFollowList = () => {
  ifShowFollowList.value = true
}
</script>

<style scoped>
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