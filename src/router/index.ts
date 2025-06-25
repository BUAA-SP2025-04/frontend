import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useGlobalStore } from '@/stores/global'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/pdf-reader',
    name: 'PdfReader',
    component: () => import('@/views/PdfReader.vue'),
    meta: {
      title: 'PDF阅读器',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      title: '登录',
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      title: '注册',
      requiresGuest: true,
    },
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@/views/Discover.vue'),
    meta: {
      title: '科研发现',
      requiresAuth: true,
    },
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: () => import('@/views/user/UserDetail.vue'),
    meta: {
      title: '用户详情',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/auth/Profile.vue'),
    meta: {
      title: '个人资料',
      requiresAuth: true,
    },
  },
  {
    path: '/follow',
    name: 'Follow',
    component: () => import('@/views/auth/Follow.vue'),
    meta: {
      title: '我的关注',
      requiresAuth: true,
    },
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('@/views/research/Publications.vue'),
    meta: {
      title: '科研成果',
      requiresAuth: true,
    },
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/research/Library.vue'),
    meta: {
      title: '文献库',
      requiresAuth: true,
    },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/social/Messages.vue'),
    meta: {
      title: '消息中心',
      requiresAuth: true,
    },
  },
  {
    path: '/chat/:userId',
    name: 'Chat',
    component: () => import('@/views/social/Chat.vue'),
    meta: {
      title: '私信聊天',
      requiresAuth: true,
    },
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('@/views/social/Timeline.vue'),
    meta: {
      title: '动态时间线',
      requiresAuth: true,
    },
  },
  {
    path: '/visualization',
    name: 'Visualization',
    component: () => import('@/views/Visualization.vue'),
    meta: {
      title: '数据可视化',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const globalStore = useGlobalStore()
  const token = localStorage.getItem('token')
  const whiteList = ['/', '/discover', '/login', '/register']

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    // 弹窗提示
    globalStore.showAuthDialog = true
    next(false) // 阻止导航
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - KnoWeb`
  }
  next()
})

export default router
