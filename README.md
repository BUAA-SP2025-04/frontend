# KnoWeb Frontend

这是一个使用现代化技术栈构建的知识管理平台前端项目。

## 技术栈

| 模块           | 技术选型                | 说明                                    |
| :------------- | :---------------------- | :-------------------------------------- |
| **核心框架**   | Vue 3 + Composition API | 响应式开发，更好的TypeScript支持        |
| **语言**       | TypeScript              | 强类型支持                              |
| **样式引擎**   | Tailwind CSS            | JIT模式 + 学术主题扩展                  |
| **状态管理**   | Pinia                   | 轻量级状态管理，替代Vuex                |
| **UI组件库**   | Element Plus            | 丰富组件库，学术风格适配                |
| **PDF阅读器**  | PDF.js + Vue-PDF-embed  | 开源PDF渲染，支持文本层坐标提取         |
| **数据可视化** | ECharts + Vue-ECharts   | 知识图谱/词云/趋势图等可视化            |
| **路由**       | Vue Router 4            | 路由管理                                |
| **HTTP客户端** | Axios                   | RESTful请求                             |
| **代码规范**   | ESLint + Prettier       | 代码质量和格式化                        |

## 项目设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 项目结构

```
KnoWeb-frontend/
├── src/
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   ├── PdfReader.vue   # PDF阅读器
│   │   └── Visualization.vue # 数据可视化
│   ├── stores/             # Pinia状态管理
│   │   ├── index.ts        # 状态管理入口
│   │   └── user.ts         # 用户状态
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由定义
│   ├── utils/              # 工具函数
│   │   └── request.ts      # HTTP客户端
│   ├── App.vue             # 主组件
│   ├── main.ts             # 应用入口
│   └── style.css           # 全局样式
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind配置
├── .eslintrc.cjs           # ESLint配置
├── .prettierrc             # Prettier配置
├── package.json            # 项目配置
└── README.md              # 项目说明
```

## 功能特性

- 🎨 **现代化UI设计** - 基于Element Plus和Tailwind CSS的响应式界面
- 📖 **PDF阅读器** - 支持PDF文档阅读和文本层坐标提取
- 📊 **数据可视化** - 知识图谱、词云、趋势图等多种图表
- 🔍 **知识管理** - 智能知识库管理和检索系统
- 📱 **响应式设计** - 适配各种设备屏幕
- 🚀 **高性能** - 基于Vite的快速构建和热重载
- 🔧 **开发体验** - TypeScript + ESLint + Prettier的完整开发工具链

## 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的Vue组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/App.vue` 的导航菜单中添加链接

### 状态管理

使用Pinia进行状态管理，在 `src/stores/` 目录下创建新的store：

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExampleStore = defineStore('example', () => {
  const data = ref([])
  
  const fetchData = async () => {
    // 获取数据逻辑
  }
  
  return { data, fetchData }
})
```

### API请求

使用 `src/utils/request.ts` 中的axios实例进行HTTP请求：

```typescript
import request from '@/utils/request'

// GET请求
const getData = () => request.get('/api/data')

// POST请求
const createData = (data) => request.post('/api/data', data)
```

###  git commit 规范

- feat(module): 增加 xx 功能，例如 `feat(user): 增加用户登录功能`
- fix(module): 修复 xx BUG
- docs(module): 修改文档
- style(module): 修改代码风格，不影响代码逻辑
- refactor(module): 重构代码，不影响代码逻辑
- perf(module): 优化代码，提升性能
- test(module): 增加测试用例

注意：commit message 使用小写冒号