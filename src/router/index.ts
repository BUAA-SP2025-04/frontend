import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
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
    props: route => ({
      url: route.query.url,
    }),
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
    path: '/publication/:id',
    name: 'PublicationDetail',
    component: () => import('@/views/PublicationDetail.vue'),
    meta: {
      title: '成果详情',
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
    path: '/learning',
    name: 'Learning',
    component: () => import('@/views/research/Learning.vue'),
    meta: {
      title: '学习档案',
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
  {
    path: '/research',
    children: [
      {
        path: 'qa',
        component: () => import('@/views/research/QA.vue'),
        meta: { title: '科研问答' },
      },
      {
        path: 'qa/:id',
        component: () => import('@/views/research/QuestionDetail.vue'),
        meta: { title: '问题详情' },
      },
    ],
  },
  {
    path: '/research/projects',
    name: 'Projects',
    component: () => import('@/views/research/Projects.vue'),
    meta: { title: '科研项目' },
  },
  {
    path: '/research/my-projects',
    name: 'MyProjects',
    redirect: '/research/my-workspace',
  },
  {
    path: '/research/my-workspace',
    name: 'MyWorkspace',
    component: () => import('@/views/research/MyWorkspace.vue'),
    meta: { title: '项目管理' },
  },
  {
    path: '/research/my-questions',
    name: 'MyQuestions',
    component: () => import('@/views/research/MyQuestions.vue'),
    meta: { title: '我的问答' },
  },
  {
    path: '/research/knowledge-graph',
    name: 'KnowledgeGraph',
    component: () => import('@/views/research/KnowledgeGraph.vue'),
    meta: {
      title: '知识图谱',
      requiresAuth: true,
    },
  },
  {
    path: '/abstract-generator',
    name: 'AbstractGenerator',
    component: () => import('@/views/AbstractGenerator.vue'),
    meta: {
      title: '智能摘要生成器',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如用户点击了浏览器的后退按钮），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到页面顶部
    return { top: 0 }
  }
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
