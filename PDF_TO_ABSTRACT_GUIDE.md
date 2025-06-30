# PDF阅读器到摘要生成器使用指南

## 功能概述

本功能实现了从PDF阅读器直接跳转到智能摘要生成器，专门用于处理从PDF阅读器传递过来的文档URL，实现文档摘要生成的一站式服务。

## 使用流程

### 1. 在PDF阅读器中

1. **打开PDF文件**
   - 通过URL参数加载PDF文件
   - 或直接上传本地PDF文件

2. **点击"生成摘要"按钮**
   - 按钮位于PDF阅读器顶部
   - 系统会自动获取当前PDF文件的URL

3. **自动跳转**
   - 系统会自动跳转到摘要生成页面
   - 并传递文件URL参数

### 2. 在摘要生成器中

1. **自动处理**
   - 页面会自动接收文件URL参数
   - 自动开始上传和摘要生成流程

2. **查看结果**
   - 实时显示上传进度
   - 观看打字机效果的摘要生成
   - 支持切换显示模式

3. **返回操作**
   - 可以随时返回PDF阅读器
   - 支持重新生成摘要

## 技术实现

### 路由跳转

```typescript
// 在PDF阅读器中
const uploadToDify = async () => {
  const fileUrl = "http://10.251.254.129:8081" + pdfUrl.value
  
  router.push({
    name: 'AbstractGenerator',
    query: { url: fileUrl }
  })
}
```

### 参数接收

```typescript
// 在摘要生成器中
onMounted(() => {
  const urlParam = route.query.url as string
  if (urlParam) {
    fileUrl.value = urlParam
    startGeneration() // 自动开始处理
  }
})
```

## 配置说明

### 工作流ID配置

在 `AbstractGenerator.vue` 中配置您的工作流ID：

```typescript
const workflowId = 'your-workflow-id' // 请替换为实际的工作流ID
```

### 支持的文件格式

- PDF文件（通过URL传递）

## 页面路由

- **PDF阅读器**: `/pdf-reader?url=文件URL`
- **摘要生成器**: `/abstract-generator?url=文件URL`

## 功能特性

### 1. 专门化设计
- 专门为PDF阅读器跳转设计
- 移除了本地上传功能
- 简化了用户界面

### 2. 自动处理
- 接收URL参数后自动开始处理
- 实时显示处理进度
- 智能错误处理

### 3. 多种显示模式
- 打字机效果显示
- 完整Markdown渲染
- 支持模式切换

### 4. 便捷导航
- 一键返回PDF阅读器
- 支持重新生成摘要
- 清晰的状态指示

### 5. 响应式设计
- 支持桌面和移动设备
- 自适应布局
- 良好的用户体验

## 界面说明

### 文件信息区域
- 显示当前处理的文件URL
- 实时状态指示器
- 操作按钮（开始生成、返回）

### 结果显示区域
- 摘要生成进度
- 打字机效果显示
- 显示模式切换

## 错误处理

### 常见问题

1. **文件URL无效**
   - 检查文件URL是否正确
   - 确认文件可以正常访问

2. **跳转失败**
   - 检查路由配置
   - 确认页面组件存在

3. **上传失败**
   - 检查网络连接
   - 确认文件格式支持
   - 查看控制台错误信息

### 调试技巧

1. 在浏览器开发者工具中查看网络请求
2. 检查路由参数是否正确传递
3. 查看控制台错误信息

## 扩展功能

### 1. 历史记录
可以添加处理历史记录功能：

```typescript
// 保存处理记录
const saveHistory = (fileUrl: string, summary: string) => {
  // 保存到本地存储或数据库
}
```

### 2. 导出功能
可以添加摘要导出功能：

```typescript
// 导出摘要
const exportSummary = (content: string, format: 'pdf' | 'docx' | 'txt') => {
  // 实现导出逻辑
}
```

### 3. 批量处理
可以扩展支持批量文件处理：

```typescript
// 支持多个文件URL
const fileUrls = route.query.urls as string[]
```

## 注意事项

1. **文件大小限制**: 建议文件大小不超过10MB
2. **网络要求**: 需要稳定的网络连接
3. **浏览器兼容性**: 需要支持现代浏览器特性
4. **工作流配置**: 确保Dify工作流正确配置
5. **URL格式**: 确保传递的文件URL格式正确

## 更新日志

- v1.0.0: 实现基本的PDF到摘要生成功能
- v1.1.0: 简化界面，移除本地上传功能
- 支持URL参数传递
- 自动处理流程
- 打字机效果显示
- 便捷的返回功能 