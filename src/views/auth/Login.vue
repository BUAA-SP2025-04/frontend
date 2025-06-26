<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-5 relative overflow-hidden"
  >
    <!-- 粒子背景 -->
    <div ref="particlesContainer" class="particles absolute inset-0 pointer-events-none"></div>
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="floating-shape absolute w-32 h-32 bg-blue-100/30 rounded-full top-[10%] left-[10%] animate-float-1"
      ></div>
      <div
        class="floating-shape absolute w-40 h-40 bg-indigo-100/30 rounded-full top-[70%] right-[10%] animate-float-2"
      ></div>
      <div
        class="floating-shape absolute w-24 h-24 bg-sky-100/30 rounded-full top-[20%] right-[20%] animate-float-3"
      ></div>
      <div
        class="floating-shape absolute w-36 h-36 bg-blue-200/30 rounded-full bottom-[20%] left-[20%] animate-float-4"
      ></div>
    </div>
    <!-- 主容器 -->
    <div class="relative z-10">
      <div
        class="auth-card flex w-[900px] h-[600px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <!-- 登录表单 -->
        <div
          class="w-1/2 flex flex-col items-center justify-center px-10 z-10 transition-all duration-700 ease-in-out"
          :class="
            isRegisterMode
              ? 'translate-x-4 opacity-100 scale-100'
              : 'translate-x-0 opacity-60 scale-95'
          "
        >
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-3">
              <span
                class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                >KnoWeb</span
              >
            </h1>
            <p class="text-slate-600 text-sm">科研社交平台，连接学者世界</p>
          </div>
          <form class="space-y-5 w-full max-w-sm" @submit.prevent="handleLogin">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-semibold text-slate-800 mb-2">欢迎回来</h2>
              <p class="text-slate-500 text-sm">登录您的账户继续使用</p>
            </div>
            <div class="space-y-4">
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="邮箱地址"
                  class="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的邮箱svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <rect
                      width="20"
                      height="14"
                      x="2"
                      y="5"
                      rx="3"
                      stroke="#3b82f6"
                      stroke-width="2"
                    />
                    <polyline
                      points="3,7 12,13 21,7"
                      fill="none"
                      stroke="#6366f1"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="密码"
                  class="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的密码svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="8"
                      rx="3"
                      stroke="#6366f1"
                      stroke-width="2"
                    />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#3b82f6" stroke-width="2" />
                  </svg>
                </span>
              </div>
            </div>
            <div class="flex items-center">
              <label class="flex items-center cursor-pointer text-slate-600 text-sm">
                <input v-model="form.remember" type="checkbox" class="sr-only" />
                <div
                  class="w-4 h-4 mr-2 border-2 border-slate-300 rounded flex items-center justify-center transition-all duration-200"
                  :class="{ 'bg-blue-500 border-blue-500': form.remember }"
                >
                  <svg
                    v-if="form.remember"
                    class="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <polyline
                      points="5,10 9,14 16,7"
                      fill="none"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                记住我
              </label>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span class="relative z-10">登录</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              ></div>
            </button>
          </form>
        </div>
        <!-- 注册表单 -->
        <div
          class="w-1/2 flex flex-col items-center justify-center px-10 z-10 transition-all duration-700 ease-in-out"
          :class="
            isRegisterMode
              ? 'translate-x-0 opacity-60 scale-95'
              : '-translate-x-4 opacity-100 scale-100'
          "
        >
          <form class="space-y-4 w-full max-w-sm" @submit.prevent="handleRegister">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-semibold text-slate-800 mb-2">创建账户</h2>
              <p class="text-slate-500 text-sm">加入学术社区，开启研究之旅</p>
            </div>
            <div class="space-y-3">
              <div class="relative">
                <input
                  v-model="registerForm.name"
                  type="text"
                  required
                  placeholder="姓名"
                  class="w-full px-4 py-2.5 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的用户svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <circle cx="12" cy="8" r="4" stroke="#6366f1" stroke-width="2" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#3b82f6" stroke-width="2" />
                  </svg>
                </span>
              </div>
              <div class="flex gap-6 justify-center py-2">
                <label class="flex items-center cursor-pointer text-slate-600">
                  <input
                    v-model="registerForm.gender"
                    type="radio"
                    value="male"
                    name="gender"
                    required
                    class="sr-only"
                  />
                  <div
                    class="w-5 h-5 mr-2 border-2 border-slate-300 rounded-full flex items-center justify-center transition-all duration-200"
                    :class="{ 'border-blue-500': registerForm.gender === 'male' }"
                  >
                    <div
                      v-if="registerForm.gender === 'male'"
                      class="w-2.5 h-2.5 bg-blue-500 rounded-full"
                    ></div>
                  </div>
                  男
                </label>
                <label class="flex items-center cursor-pointer text-slate-600">
                  <input
                    v-model="registerForm.gender"
                    type="radio"
                    value="female"
                    name="gender"
                    required
                    class="sr-only"
                  />
                  <div
                    class="w-5 h-5 mr-2 border-2 border-slate-300 rounded-full flex items-center justify-center transition-all duration-200"
                    :class="{ 'border-blue-500': registerForm.gender === 'female' }"
                  >
                    <div
                      v-if="registerForm.gender === 'female'"
                      class="w-2.5 h-2.5 bg-blue-500 rounded-full"
                    ></div>
                  </div>
                  女
                </label>
              </div>
              <div class="relative">
                <input
                  v-model="registerForm.email"
                  type="email"
                  required
                  placeholder="学术邮箱"
                  class="w-full px-4 py-2.5 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的邮箱svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <rect
                      width="20"
                      height="14"
                      x="2"
                      y="5"
                      rx="3"
                      stroke="#3b82f6"
                      stroke-width="2"
                    />
                    <polyline
                      points="3,7 12,13 21,7"
                      fill="none"
                      stroke="#6366f1"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div class="flex items-center text-xs text-slate-500 mt-1">
                <span class="mr-1">
                  <!-- 优化后的灯泡svg -->
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 20 20"
                    class="inline align-middle"
                  >
                    <ellipse cx="10" cy="8" rx="6" ry="6" stroke="#6366f1" stroke-width="1.5" />
                    <path
                      d="M8 17h4m-2 1v-1"
                      stroke="#3b82f6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                仅支持
                <button
                  type="button"
                  class="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                  @click="showEmailHelp = true"
                >
                  学术邮箱
                </button>
              </div>
              <p v-if="emailError" class="text-red-400 text-xs mt-1">{{ emailError }}</p>
              <div class="relative">
                <input
                  v-model="registerForm.institution"
                  type="text"
                  required
                  readonly
                  placeholder="所属机构"
                  class="w-full px-4 py-2.5 pr-12 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-slate-600 placeholder-slate-400 cursor-not-allowed"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的学校svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <polygon
                      points="12,4 21,10 12,16 3,10"
                      fill="none"
                      stroke="#6366f1"
                      stroke-width="2"
                    />
                    <rect
                      x="5"
                      y="14"
                      width="14"
                      height="4"
                      rx="2"
                      stroke="#3b82f6"
                      stroke-width="2"
                    />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input
                  v-model="registerForm.password"
                  type="password"
                  required
                  placeholder="密码"
                  class="w-full px-4 py-2.5 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的密码svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="8"
                      rx="3"
                      stroke="#6366f1"
                      stroke-width="2"
                    />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#3b82f6" stroke-width="2" />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  required
                  placeholder="确认密码"
                  class="w-full px-4 py-2.5 pr-12 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <!-- 优化后的密码确认svg -->
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="opacity-70">
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="8"
                      rx="3"
                      stroke="#6366f1"
                      stroke-width="2"
                    />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#3b82f6" stroke-width="2" />
                    <path d="M12 15v-2" stroke="#6366f1" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <label class="flex items-center cursor-pointer text-slate-600 text-sm">
                <input v-model="registerForm.agreeTerms" type="checkbox" required class="sr-only" />
                <div
                  class="w-4 h-4 mr-2 border-2 border-slate-300 rounded flex items-center justify-center transition-all duration-200"
                  :class="{ 'bg-blue-500 border-blue-500': registerForm.agreeTerms }"
                >
                  <svg
                    v-if="registerForm.agreeTerms"
                    class="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <polyline
                      points="5,10 9,14 16,7"
                      fill="none"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                我同意
                <button
                  type="button"
                  class="text-blue-500 hover:text-blue-600 underline mx-1"
                  @click="showServiceTerms = true"
                >
                  服务条款
                </button>
                和
                <button
                  type="button"
                  class="text-blue-500 hover:text-blue-600 underline mx-1"
                  @click="showPrivacyPolicy = true"
                >
                  隐私政策
                </button>
              </label>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span class="relative z-10">注册</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              ></div>
            </button>
          </form>
        </div>
        <!-- 遮罩层 -->
        <div
          class="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-500 to-indigo-600 bg-opacity-90 flex flex-col items-center justify-center text-white transition-transform duration-700 ease-in-out z-20 shadow-2xl"
          :class="isRegisterMode ? 'translate-x-full' : 'translate-x-0'"
        >
          <div class="text-center px-8">
            <template v-if="!isRegisterMode">
              <h3 class="text-2xl font-semibold mb-4">已有账户？</h3>
              <p class="text-blue-100 leading-relaxed mb-8">
                使用您的账户登录，继续您的学术探索之旅
              </p>
              <button
                class="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/30 hover:border-white/50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
                @click="switchMode"
              >
                <span class="relative z-10">立即登录</span>
                <div
                  class="absolute inset-0 bg-white/10 rounded-full scale-0 group-active:scale-100 transition-transform duration-200"
                ></div>
              </button>
            </template>
            <template v-else>
              <h3 class="text-2xl font-semibold mb-4">新用户？</h3>
              <p class="text-blue-100 leading-relaxed mb-8">
                注册账户加入我们的学术社区，与全球研究者建立联系
              </p>
              <button
                class="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/30 hover:border-white/50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
                @click="switchMode"
              >
                <span class="relative z-10">立即注册</span>
                <div
                  class="absolute inset-0 bg-white/10 rounded-full scale-0 group-active:scale-100 transition-transform duration-200"
                ></div>
              </button>
            </template>
          </div>
          <!-- 遮罩装饰 -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              class="absolute w-48 h-48 border-2 border-white/10 rounded-full -top-12 -left-12 animate-spin-slow"
            ></div>
            <div
              class="absolute w-32 h-32 border-2 border-white/10 rounded-full -bottom-8 -right-8 animate-spin-reverse"
            ></div>
            <div
              class="absolute w-24 h-24 border-2 border-white/10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务条款模态框 -->
    <div
      v-if="showServiceTerms"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click="showServiceTerms = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto m-4" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-slate-800">KnoWeb 服务条款</h3>
          <button class="text-slate-400 hover:text-slate-600" @click="showServiceTerms = false">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="space-y-4 text-slate-600 leading-relaxed">
          <h4 class="text-lg font-semibold text-slate-800">📋 第一条：关于我们</h4>
          <p>
            欢迎来到
            KnoWeb！我们是一群热爱学术的"码农"，立志打造一个让全世界学者都能愉快交流的平台。如果你发现Bug，请温柔一点告诉我们，我们的程序员心理很脆弱的。😅
          </p>

          <h4 class="text-lg font-semibold text-slate-800">🎯 第二条：用户行为准则</h4>
          <p>1. 请文明交流，不要在学术讨论中使用"这也叫论文？"之类的话语</p>
          <p>2. 禁止发布非学术内容，比如"今天食堂的菜怎么样"（除非你研究的是营养学）</p>
          <p>3. 不要故意抬杠，除非你是研究辩论学的</p>
          <p>4. 引用他人观点请标注出处，学术诚信从我做起！</p>

          <h4 class="text-lg font-semibold text-slate-800">🔒 第三条：账号安全</h4>
          <p>
            请妥善保管你的账号密码，不要设置成"123456"或者"password"。如果你的密码被破解了，我们会很无奈地摇头叹息的。
          </p>

          <h4 class="text-lg font-semibold text-slate-800">📊 第四条：数据使用</h4>
          <p>
            我们承诺不会把你的学术成果拿去申请专利，也不会偷偷看你的研究笔记。你的数据安全对我们来说比程序员的头发还重要！
          </p>

          <h4 class="text-lg font-semibold text-slate-800">⚠️ 第五条：免责声明</h4>
          <p>
            如果因为使用本平台导致你熬夜写论文、沉迷学术无法自拔、或者突然对研究产生了过度热情，我们概不负责。学术有风险，研究需谨慎！
          </p>

          <h4 class="text-lg font-semibold text-slate-800">🔄 第六条：条款更新</h4>
          <p>
            我们保留随时修改这些条款的权利，但承诺不会改得太离谱。如有更新，我们会通过站内消息、邮件或者托梦的方式通知你。
          </p>

          <p class="text-sm text-slate-500 mt-6">最后更新：2025年6月25日（程序员加班的第3天）</p>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            @click="showServiceTerms = false"
          >
            我已阅读并理解（虽然有点搞笑）
          </button>
        </div>
      </div>
    </div>

    <!-- 隐私政策模态框 -->
    <div
      v-if="showPrivacyPolicy"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click="showPrivacyPolicy = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto m-4" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-slate-800">KnoWeb 隐私政策</h3>
          <button class="text-slate-400 hover:text-slate-600" @click="showPrivacyPolicy = false">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="space-y-4 text-slate-600 leading-relaxed">
          <h4 class="text-lg font-semibold text-slate-800">🕵️ 第一条：我们收集什么</h4>
          <p>
            我们会收集你的基本信息（姓名、邮箱、所属机构），就像图书馆办借书证一样正常。我们不会偷看你的浏览历史，也不会关心你是否在凌晨3点还在刷论文。
          </p>

          <h4 class="text-lg font-semibold text-slate-800">🎯 第二条：我们如何使用数据</h4>
          <p>1. 为你提供个性化的学术推荐（不是推荐你买什么商品）</p>
          <p>2. 改进平台功能，让你的学术体验更smooth</p>
          <p>3. 发送重要通知，比如"你关注的大佬发新论文了！"</p>
          <p>4. 绝对不会用来训练AI写你的毕业论文（虽然我们也很想帮你）</p>

          <h4 class="text-lg font-semibold text-slate-800">🤐 第三条：数据保密</h4>
          <p>
            你的数据就像我们程序员的私藏代码一样珍贵，我们会用最高级别的加密技术保护它们。连我们的CEO都看不到你的聊天记录（除非你们聊的是如何优化我们的平台）。
          </p>

          <h4 class="text-lg font-semibold text-slate-800">🍪 第四条：Cookie政策</h4>
          <p>
            我们使用Cookies来记住你的偏好，就像你最喜欢的咖啡店记住你的常规订单一样。这些Cookies不含卡路里，请放心食用。
          </p>

          <h4 class="text-lg font-semibold text-slate-800">🗑️ 第五条：数据删除</h4>
          <p>
            如果你要删除账号，我们会按照你的要求删除相关数据。但请三思，毕竟重新建立学术网络比重新安装微信还麻烦。
          </p>

          <h4 class="text-lg font-semibold text-slate-800">👮 第六条：数据共享</h4>
          <p>
            我们不会将你的数据卖给广告商、不会泄露给你的导师、更不会告诉你妈妈你几点睡觉。你的学术隐私，我们守护！
          </p>

          <h4 class="text-lg font-semibold text-slate-800">📞 第七条：联系我们</h4>
          <p>如果你对隐私政策有任何疑问，可以随时联系我们。我们的客服比论文审稿人回复还要快！</p>

          <p class="text-sm text-slate-500 mt-6">
            最后更新：2025年6月25日（隐私保护比WiFi密码还严密）
          </p>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            @click="showPrivacyPolicy = false"
          >
            明白了，你们还挺有趣的
          </button>
        </div>
      </div>
    </div>

    <!-- 学术邮箱帮助弹窗 -->
    <div
      v-if="showEmailHelp"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click="showEmailHelp = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-lg m-4" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-slate-800">支持的学术邮箱</h3>
          <button class="text-slate-400 hover:text-slate-600" @click="showEmailHelp = false">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="space-y-4 text-slate-600">
          <p class="text-sm">为了确保平台的学术性质，我们目前仅支持以下学术机构的邮箱：</p>
          <div class="space-y-2">
            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
              <span class="text-blue-600 font-medium">北京大学</span>
              <span class="ml-auto text-slate-500">@pku.edu.cn</span>
            </div>
            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
              <span class="text-blue-600 font-medium">清华大学</span>
              <span class="ml-auto text-slate-500">@tsinghua.edu.cn</span>
            </div>
            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
              <span class="text-blue-600 font-medium">北京航空航天大学</span>
              <span class="ml-auto text-slate-500">@buaa.edu.cn</span>
            </div>
            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
              <span class="text-blue-600 font-medium">中国科学技术大学</span>
              <span class="ml-auto text-slate-500">@ustc.edu.cn</span>
            </div>
            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
              <span class="text-blue-600 font-medium">麻省理工学院</span>
              <span class="ml-auto text-slate-500">@mit.edu</span>
            </div>
          </div>
          <p class="text-xs text-slate-500 mt-4">
            我们正在逐步扩展支持的学术机构，如有建议请通过客服联系我们。
          </p>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            @click="showEmailHelp = false"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginUser, registerUser } from '@/api/modules/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const particlesContainer = ref<HTMLElement>()
const isRegisterMode = ref(false)
const showServiceTerms = ref(false)
const showPrivacyPolicy = ref(false)
const showEmailHelp = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const registerForm = reactive({
  name: '',
  gender: '',
  email: '',
  institution: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const emailError = ref('')
const emailDomains = [
  { domain: /@pku\.edu\.cn$/, institution: '北京大学' },
  { domain: /@tsinghua\.edu\.cn$/, institution: '清华大学' },
  { domain: /@mit\.edu$/, institution: '麻省理工学院' },
  { domain: /@buaa\.edu\.cn$/, institution: '北京航空航天大学' },
  { domain: /@ustc\.edu\.cn$/, institution: '中国科学技术大学' },
]

// 粒子系统
const initParticles = () => {
  if (!particlesContainer.value) return

  const container = particlesContainer.value
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'

    const size = Math.random() * 3 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 15
    const duration = Math.random() * 15 + 8

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 100%);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
    `

    container.appendChild(particle)
  }
}

// 切换模式
const switchMode = () => {
  isRegisterMode.value = !isRegisterMode.value
}

// 监听注册邮箱变化
watch(
  () => registerForm.email,
  newEmail => {
    const match = emailDomains.find(item => item.domain.test(newEmail))
    if (match) {
      registerForm.institution = match.institution
      emailError.value = ''
    } else {
      registerForm.institution = ''
      if (newEmail) {
        emailError.value = '请输入正确的学术邮箱'
      } else {
        emailError.value = ''
      }
    }
  }
)

const handleLogin = async () => {
  try {
    const res = await loginUser({
      email: form.email,
      password: form.password,
    })

    const { token, ...userInfo } = res.data
    userStore.setUser(userInfo)
    localStorage.setItem('token', token)
    console.log(userInfo)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    // console.log(error)
    // ElMessage.error('登录失败，请检查用户名和密码')
  }
}

const handleRegister = async () => {
  if (
    !registerForm.name ||
    !registerForm.gender ||
    !registerForm.email ||
    !registerForm.institution ||
    !registerForm.password ||
    !registerForm.confirmPassword
  ) {
    ElMessage.error('请填写所有必填项')
    return
  }
  if (!registerForm.institution) {
    ElMessage.error('请输入有效的学术邮箱')
    return
  }
  if (registerForm.password.length < 8) {
    ElMessage.error('密码长度至少8位')
    return
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(registerForm.password)) {
    ElMessage.error('密码必须包含字母和数字')
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  try {
    const res = await registerUser({
      email: registerForm.email,
      name: registerForm.name,
      password: registerForm.password,
      gender: registerForm.gender,
      institution: registerForm.institution,
    })
    const { token, ...userInfo } = res.data
    userStore.setUser(userInfo)
    localStorage.setItem('token', token)
    userStore.setToken(token)

    ElMessage.success('注册成功，即将自动登录')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    // const errMsg =
    //   (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
    //   '注册失败，请重试'
    // ElMessage.error(errMsg)
  }
}

onMounted(() => {
  initParticles()
})
</script>

<style scoped>
@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
    opacity: 0.8;
  }
}

@keyframes float-1 {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(20px) rotate(240deg);
  }
}

@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-25px) rotate(-120deg);
  }
  66% {
    transform: translateY(25px) rotate(-240deg);
  }
}

@keyframes float-3 {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(90deg);
  }
  66% {
    transform: translateY(15px) rotate(180deg);
  }
}

@keyframes float-4 {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(-90deg);
  }
  66% {
    transform: translateY(30px) rotate(-180deg);
  }
}

.animate-float-1 {
  animation: float-1 12s infinite ease-in-out;
}
.animate-float-2 {
  animation: float-2 14s infinite ease-in-out 2s;
}
.animate-float-3 {
  animation: float-3 10s infinite ease-in-out 4s;
}
.animate-float-4 {
  animation: float-4 16s infinite ease-in-out 1s;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}
.animate-spin-reverse {
  animation: spin 15s linear infinite reverse;
}
.bg-white.rounded-2xl.p-8.max-w-2xl.max-h-\[80vh\].overflow-y-auto.m-4 {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.bg-white.rounded-2xl.p-8.max-w-2xl.max-h-\[80vh\].overflow-y-auto.m-4::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}
</style>
