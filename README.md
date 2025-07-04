# KnoWeb Frontend

KnoWeb 是一个面向学术与知识管理场景的现代化前端项目，致力于为用户提供高效、智能的知识管理与协作体验。

## 项目简介

KnoWeb 前端基于 Vue 3、TypeScript、Element Plus、Tailwind CSS 等现代技术栈开发，支持文献管理、知识图谱、PDF 阅读、学术社交等多种功能，适用于学术团队、知识型组织及个人用户。

## 技术栈

| 模块           | 技术选型                | 说明                                    |
| :------------- | :---------------------- | :-------------------------------------- |
| **核心框架**   | Vue 3 + Composition API | 响应式开发，更好的 TypeScript 支持      |
| **语言**       | TypeScript              | 强类型支持                              |
| **样式引擎**   | Tailwind CSS            | JIT 模式 + 学术主题扩展                 |
| **状态管理**   | Pinia                   | 轻量级状态管理，替代 Vuex               |
| **UI 组件库**  | Element Plus            | 丰富组件库，学术风格适配                |
| **PDF 阅读器** | PDF.js + Vue-PDF-embed  | 开源 PDF 渲染，支持文本层坐标提取        |
| **数据可视化** | ECharts + Vue-ECharts   | 知识图谱/词云/趋势图等可视化            |
| **路由**       | Vue Router 4            | 路由管理                                |
| **HTTP 客户端**| Axios                   | RESTful 请求                            |
| **代码规范**   | ESLint + Prettier       | 代码质量和格式化                        |

## 功能特性

- 🎨 **现代化 UI 设计** - 基于 Element Plus 和 Tailwind CSS 的响应式界面
- 📖 **PDF 阅读器** - 支持 PDF 文档阅读和文本层坐标提取
- 📊 **数据可视化** - 知识图谱、词云、趋势图等多种图表
- 🔍 **知识管理** - 智能知识库管理和检索系统
- 📱 **响应式设计** - 适配各种设备屏幕
- 🚀 **高性能** - 基于 Vite 的快速构建和热重载
- 🔧 **开发体验** - TypeScript + ESLint + Prettier 的完整开发工具链

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/your-org/KnoWeb-frontend.git
cd KnoWeb-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
KnoWeb-frontend/
├── public/ # 公共资源（如图片、favicon 等）
├── src/
│ ├── api/ # 前端 API 封装与类型定义
│ │ ├── modules/ # 各功能模块 API
│ │ └── types/ # API 类型声明
│ ├── components/ # 通用组件（如导航栏、弹窗、表单等）
│ ├── composables/ # 组合式函数（如自定义 hooks）
│ ├── router/ # 路由配置
│ ├── stores/ # Pinia 状态管理
│ ├── utils/ # 工具函数与通用方法
│ ├── views/ # 页面级组件（按业务模块分子目录）
│ │ ├── auth/ # 认证相关页面
│ │ ├── publication/ # 文献相关页面
│ │ ├── research/ # 科研/知识管理相关页面
│ │ ├── social/ # 社交相关页面
│ │ └── user/ # 用户相关页面
│ ├── App.vue # 根组件
│ ├── main.ts # 应用入口
│ ├── style.css # 全局样式
│ └── env.d.ts # 环境类型声明
├── index.html # HTML 模板
├── package.json # 项目配置
├── tsconfig.json # TypeScript 配置
├── tailwind.config.js # Tailwind CSS 配置
├── vite.config.js # Vite 配置
├── .eslintrc.cjs # ESLint 配置
├── .prettierrc # Prettier 配置
└── README.md # 项目说明
```

## 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/App.vue` 的导航菜单中添加链接

### 状态管理

使用 Pinia 进行状态管理，在 `src/stores/` 目录下创建新的 store：

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

### API 请求

使用 `src/utils/request.ts` 中的 axios 实例进行 HTTP 请求：

```typescript
import request from '@/utils/request'

// GET 请求
const getData = () => request.get('/api/data')

// POST 请求
const createData = (data) => request.post('/api/data', data)
```

## 贡献指南

欢迎社区开发者参与贡献！请遵循以下流程：

1. Fork 本仓库并新建分支
2. 提交代码前请运行 `npm run lint` 和 `npm run format` 保持代码风格统一
3. 提交 PR 前请确保所有功能正常、无明显 bug
4. PR 标题请遵循 [git commit 规范](#git-commit-规范)
5. 如有问题或建议，欢迎提交 Issue

### git commit 规范

- feat(module): 增加 xx 功能，例如 `feat(user): 增加用户登录功能`
- fix(module): 修复 xx BUG
- docs(module): 修改文档
- style(module): 修改代码风格，不影响代码逻辑
- refactor(module): 重构代码，不影响代码逻辑
- perf(module): 优化代码，提升性能
- test(module): 增加测试用例

注意：commit message 使用小写冒号

## 许可证

本项目采用 [MIT License](./LICENSE) 开源，欢迎自由使用和二次开发。

## 社区与联系方式

- 问题反馈：请通过 Issue 提交

## 致谢

- 感谢所有开源社区的贡献者
- 参考和借鉴了 Vue、Element Plus、Tailwind CSS 等优秀项目