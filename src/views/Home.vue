<template>
  <div class="min-h-screen bg-gray-50 overflow-hidden">
    <!-- 英雄区域 - 增强版 -->
    <section class="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 text-white overflow-hidden">
      <!-- 动态背景 -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <!-- 动态粒子背景 -->
        <div class="absolute inset-0">
          <div 
            v-for="i in 50" 
            :key="i"
            class="absolute w-1 h-1 bg-white rounded-full animate-float"
            :style="{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay:  30 + 's',
              animationDuration: 90 + 's'
            }"
          ></div>
        </div>
        <!-- 几何图形 -->
        <div class="absolute top-10 left-10 w-32 h-32 border-2 border-white border-opacity-10 rounded-full animate-spin-slow"></div>
        <div class="absolute bottom-10 right-10 w-20 h-20 border-2 border-white border-opacity-10 transform rotate-45 animate-pulse"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg transform rotate-12 animate-bounce-slow opacity-20"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <!-- 打字机效果标题 -->
          <h1 class="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span class="block animate-slide-up">连接全球</span>
            <span 
              class="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-slide-up"
              style="animation-delay: 0.3s"
            >
              科研智慧
            </span>
          </h1>
          
          <!-- 副标题 -->
          <p class="text-xl md:text-2xl text-indigo-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style="animation-delay: 0.6s">
            KnoWeb 是专为科研人员打造的<span class="text-yellow-300 font-semibold">下一代学术社交平台</span>，
            汇聚全球研究者，分享前沿成果，促进学术合作
          </p>

          <!-- 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style="animation-delay: 0.9s">
            <router-link
              to="/discover"
              class="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-purple-500/25"
            >
              <span class="relative z-10">开始探索</span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg class="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </router-link>
            
            <router-link
              v-if="!isLoggedIn"
              to="/login"
              class="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-indigo-900 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-xl"
            >
              加入我们
              <svg class="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
            </router-link>
          </div>


        </div>
      </div>
    </section>

    <!-- 平台统计 - 增强版 -->
    <section class="py-20 bg-white relative">
      <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-8">
          <!-- 注册研究者 -->
          <div class="text-center group">
            <div class="relative">
              <div class="text-5xl md:text-6xl font-black text-indigo-600 mb-3 transition-all duration-300 group-hover:scale-110">
                {{ formatNumber(animatedResearcherCount) }}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div class="text-lg font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">注册研究者</div>
              <div class="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
          <!-- 发表论文 -->
          <div class="text-center group">
            <div class="relative">
              <div class="text-5xl md:text-6xl font-black text-green-600 mb-3 transition-all duration-300 group-hover:scale-110">
                {{ formatNumber(animatedPaperCount) }}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div class="text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors">发表论文</div>
              <div class="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
          <!-- 学术动态 -->
          <div class="text-center group">
            <div class="relative">
              <div class="text-5xl md:text-6xl font-black text-purple-600 mb-3 transition-all duration-300 group-hover:scale-110">
                {{ formatNumber(animatedMessageCount) }}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
              <div class="text-lg font-bold text-gray-700 group-hover:text-purple-600 transition-colors">学术动态</div>
              <div class="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
          <!-- 合作项目 -->
          <div class="text-center group">
            <div class="relative">
              <div class="text-5xl md:text-6xl font-black text-orange-600 mb-3 transition-all duration-300 group-hover:scale-110">
                {{ formatNumber(animatedProjectCount) }}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div class="text-lg font-bold text-gray-700 group-hover:text-orange-600 transition-colors">合作项目</div>
              <div class="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
          <!-- 科研问答（移动到统计区） -->
          <div class="text-center group">
            <div class="relative">
              <div class="text-5xl md:text-6xl font-black text-red-600 mb-3 transition-all duration-300 group-hover:scale-110">
                {{ formatNumber(animatedQaCount) }}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div class="text-lg font-bold text-gray-700 group-hover:text-red-600 transition-colors">科研问答</div>
              <div class="w-16 h-1 bg-gradient-to-r from-red-400 to-yellow-400 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 - 卡片悬浮效果 -->
    <section class="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-5xl font-black text-gray-900 mb-6 leading-tight">
            强大的
            <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              科研工具集
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从文献管理到学术发现，从成果展示到知识分享，全方位支持您的科研之路
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- 科研发现 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <!-- 卡片背景渐变 -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">科研发现</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">智能推荐相关论文，发现最新研究趋势，跟踪前沿科技动态</p>
              <router-link to="/discover" class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                立即探索
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 文献管理 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">文献库</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">专业的文献管理工具，支持PDF阅读、标注和知识提取</p>
              <router-link to="/library" class="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                管理文献
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 成果展示 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">科研成果</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">展示和管理您的研究成果，提升学术影响力</p>
              <router-link to="/achievements" class="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                查看成果
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 学术交流 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">学术交流</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">与同行学者交流讨论，分享研究心得，促进学术合作</p>
              <router-link to="/messages" class="inline-flex items-center text-green-600 hover:text-green-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                开始交流
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 学术社交 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">学术社交</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">连接志同道合的研究者，分享学术动态，建立合作关系</p>
              <router-link to="/research/knowledge-graph" class="inline-flex items-center text-teal-600 hover:text-teal-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                查看动态
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- PDF阅读器 -->
          <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20">
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative p-8">
              <div class="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">PDF阅读器</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">智能PDF阅读工具，支持文本提取、标注和坐标定位</p>
              <router-link to="/pdf-reader" class="inline-flex items-center text-rose-600 hover:text-rose-700 font-bold group-hover:translate-x-2 transition-all duration-300">
                开始阅读
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- 研究领域 - 标签云效果 -->
    <section class="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-black text-gray-900 mb-6">
            热门
            <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">研究领域</span>
          </h2>
          <p class="text-xl text-gray-600">发现和探索最活跃的科研方向</p>
          <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div
            v-for="(field, index) in researchFields"
            :key="field.name"
            class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
            @click="searchField(field.name)"
            :style="{ animationDelay: (index * 0.1) + 's' }"

          >
            <div
              :class="field.color"
              class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{{ field.name }}</h3>
            <p class="text-sm text-gray-600">{{ field.count }} 相关用户</p>
            <div class="h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 "></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 - 增强版 -->
    <section class="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <!-- 动态背景 -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black opacity-30"></div>
        <div 
          v-for="i in 30" 
          :key="i"
          class="absolute w-2 h-2 bg-white rounded-full animate-pulse"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
            opacity: Math.random() * 0.3 + 0.1
          }"
        ></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-5xl md:text-6xl font-black mb-8 leading-tight animate-slide-up">
          欢迎加入
          <span class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">我们</span>
        </h2>
        <p class="text-xl md:text-2xl mb-12 text-indigo-100 leading-relaxed animate-fade-in" style="animation-delay: 0.3s">
          与全球数十万研究者建立联系，分享您的研究成果，推动科学进步
        </p>
        
        <div v-if="!isLoggedIn" class="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style="animation-delay: 0.6s">
          <router-link
            to="/login"
            class="group bg-white text-indigo-900 hover:bg-gray-100 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl"
          >
            免费注册
            <svg class="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </router-link>
          <router-link
            to="/discover"
            class="group border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            先看看
            <svg class="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  getHotFields,
  getMessageCount,
  getPaperCount,
  getResearcherCount,
  getProjectCount,
  getQaCount,
} from '@/api/modules/statistics'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const hotPapers = ref([
  {
    id: 1,
    title: 'Attention Is All You Need: Transformer在自然语言处理中的突破性应用',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar',
    journal: 'Nature Machine Intelligence',
    citations: 45678,
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    title: '量子计算在药物发现中的应用前景与挑战',
    authors: '李明, 王芳, 张伟',
    journal: 'Science',
    citations: 23456,
    publishedAt: '2024-02-20',
  },
  {
    id: 3,
    title: 'CRISPR-Cas9基因编辑技术的最新进展',
    authors: 'Jennifer Doudna, Emmanuelle Charpentier',
    journal: 'Cell',
    citations: 67890,
    publishedAt: '2024-03-10',
  },
])

const recentActivities = ref([])

// 颜色列表，前六个依次使用
const top6Colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-pink-500',
]

const researchFields = ref<any[]>([])

// 方法
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

const searchField = (fieldName: string) => {
  router.push(`/discover?field=${encodeURIComponent(fieldName)}`)
}

// 统计数据
const researcherCount = ref(0)
const paperCount = ref(0)
const messageCount = ref(0)
const qaCount = ref(0)

// 动画显示用的数字
const animatedResearcherCount = ref(0)
const animatedPaperCount = ref(0)
const animatedMessageCount = ref(0)
const animatedProjectCount = ref(0)
const animatedQaCount = ref(0)

function animateNumber(target: number, animatedRef: any) {
  const duration = 800 // ms
  const frameRate = 30 // fps
  const totalFrames = Math.round(duration / (1000 / frameRate))
  const start = animatedRef.value
  const increment = (target - start) / totalFrames
  let frame = 0
  function update() {
    frame++
    animatedRef.value = Math.round(start + increment * frame)
    if (frame < totalFrames) {
      requestAnimationFrame(update)
    } else {
      animatedRef.value = target
    }
  }
  update()
}

watch(researcherCount, val => animateNumber(val, animatedResearcherCount))
watch(paperCount, val => animateNumber(val, animatedPaperCount))
watch(messageCount, val => animateNumber(val, animatedMessageCount))
watch(qaCount, val => animateNumber(val, animatedQaCount))

// 合作项目静态数值
const projectCount = ref(12834)
watch(projectCount, val => animateNumber(val, animatedProjectCount))

// 判断是否已登录
const isLoggedIn = computed(() => userStore.isAuthenticated)

onMounted(async () => {
  try {
    const [res1, res2, res3, res4, res5, res6] = await Promise.all([
      getResearcherCount(),
      getPaperCount(),
      getMessageCount(),
      getHotFields(),
      getProjectCount(),
      getQaCount(),
    ])
    if (res1 && typeof res1.data === 'number') {
      researcherCount.value = (res1.data as any) || 0
    }
    if (res2 && typeof res2.data === 'number') {
      paperCount.value = (res2.data as any) || 0
    }
    if (res3 && typeof res3.data === 'number') {
      messageCount.value = (res3.data as any) || 0
    }
    if (res4 && typeof res4.data === 'object') {
      // 转为数组，按count降序取前六，手动分配颜色
      researchFields.value = Object.entries(res4.data)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => Number(b.count) - Number(a.count))
        .slice(0, 6)
        .map((item, idx) => ({ ...item, color: top6Colors[idx] || 'bg-gray-400' }))
    }
    // 启动合作项目动画
    if (res5 && typeof res5.data === 'number') {
      projectCount.value = (res5.data as any) || 0
    }
    if (res6 && typeof res6.data === 'number') {
      qaCount.value = (res6.data as any) || 0
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(-5px) rotate(-1deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0px); 
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0px); 
  }
}

.animate-float {
  animation: float 30s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* 玻璃态效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* 渐变文字效果 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 悬停效果 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:translate-x-2 {
  transform: translateX(0.5rem);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}
</style>
