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

#测试CI2

## 新功能：我的工作台

### 标签页切换功能

项目新增了"我的工作台"页面，整合了项目管理功能，使用Element Plus的Tabs组件实现标签页切换：

#### 功能特点

1. **三个标签页**：
   - **我创建的**：管理用户发布的项目
   - **我申请的**：查看和管理项目申请
   - **我加入的**：管理参与的项目

2. **URL参数支持**：
   - 支持通过URL query参数直接跳转到指定标签页
   - 例如：`/research/my-workspace?tab=applied` 直接跳转到"我申请的"标签页

3. **状态管理**：
   - 每个标签页都有独立的数据加载和状态管理
   - 支持筛选和搜索功能

#### 使用方法

1. **直接访问**：
   ```javascript
   // 跳转到工作台默认标签页（我创建的）
   router.push('/research/my-workspace')
   
   // 跳转到指定标签页
   router.push({
     path: '/research/my-workspace',
     query: { tab: 'applied' }  // applied, joined, created
   })
   ```

2. **在项目列表页面**：
   - "我的工作台"按钮：跳转到工作台页面
   - "取消申请"按钮：跳转到"我申请的"标签页
   - "退出项目"按钮：跳转到"我加入的"标签页
   - "管理项目"按钮：跳转到"我创建的"标签页

#### 技术实现

1. **路由配置**：
   ```typescript
   {
     path: '/research/my-workspace',
     name: 'MyWorkspace',
     component: () => import('@/views/research/MyWorkspace.vue'),
     meta: { title: '我的工作台' },
   }
   ```

2. **标签页组件**：
   ```vue
   <el-tabs v-model="activeTab" @tab-click="handleTabClick">
     <el-tab-pane label="我创建的" name="created">
       <!-- 我创建的项目内容 -->
     </el-tab-pane>
     <el-tab-pane label="我申请的" name="applied">
       <!-- 我申请的项目内容 -->
     </el-tab-pane>
     <el-tab-pane label="我加入的" name="joined">
       <!-- 我加入的项目内容 -->
     </el-tab-pane>
   </el-tabs>
   ```

3. **URL同步**：
   ```typescript
   // 监听路由变化
   watch(() => route.query.tab, (newTab) => {
     if (newTab && ['created', 'applied', 'joined'].includes(newTab as string)) {
       activeTab.value = newTab as string
     }
   }, { immediate: true })
   
   // 标签页点击处理
   const handleTabClick = (tab: any) => {
     router.push({
       path: route.path,
       query: { tab: tab.name }
     })
   }
   ```

#### 样式定制

工作台页面使用了自定义的Element Plus标签页样式：

```css
:deep(.project-tabs .el-tabs__header) {
  margin-bottom: 0;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.project-tabs .el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  padding: 16px 24px;
}

:deep(.project-tabs .el-tabs__item.is-active) {
  color: #3b82f6;
  font-weight: 600;
}
```

## 开发环境设置

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