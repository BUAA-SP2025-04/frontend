# 智能摘要生成器使用说明

## 功能概述

智能摘要生成器是一个基于 Dify 工作流的文档摘要生成工具，支持上传 PDF、Word、TXT 等格式的文档，并生成结构化的 Markdown 格式摘要。

## 主要特性

- 📄 **多格式支持**: 支持 PDF、Word、TXT 等常见文档格式
- 🎯 **流式响应**: 实时显示生成过程，提供打字机效果
- 📝 **Markdown 渲染**: 自动将生成的摘要渲染为美观的格式
- 🔄 **错误处理**: 完善的错误处理和重试机制
- 📱 **响应式设计**: 支持桌面和移动设备

## 组件结构

### 1. TypewriterDisplay.vue
核心显示组件，负责：
- 流式响应的接收和处理
- 打字机效果的实现
- Markdown 内容的渲染
- 加载状态和错误状态的管理

### 2. AbstractGenerator.vue
主页面组件，负责：
- 文件上传和拖拽
- 工作流调用
- 状态管理
- 用户交互

## 使用方法

### 1. 基本使用

```vue
<template>
  <TypewriterDisplay
    :workflow-id="workflowId"
    :upload-file-id="uploadFileId"
    :user="userId"
    :auto-start="false"
    :typing-speed="30"
    @complete="handleComplete"
    @error="handleError"
  />
</template>

<script setup>
import TypewriterDisplay from '@/components/TypewriterDisplay.vue'

const workflowId = 'your-workflow-id'
const uploadFileId = 'file-id-from-upload'
const userId = 'user-id'

const handleComplete = (content) => {
  console.log('摘要生成完成:', content)
}

const handleError = (error) => {
  console.error('生成失败:', error)
}
</script>
```

### 2. 文件上传

```typescript
import { uploadFile } from '@/api/modules/abstract'

// 上传文件
const uploadAndGenerate = async (file: File) => {
  try {
    // 创建文件的临时URL
    const fileUrl = URL.createObjectURL(file)
    
    // 上传文件到 Dify
    const uploadResult = await uploadFile(fileUrl)
    
    // 使用返回的文件ID开始生成摘要
    await typewriterRef.value?.startWorkflow()
    
  } catch (error) {
    console.error('处理失败:', error)
  }
}
```

### 3. 工作流配置

在 `AbstractGenerator.vue` 中配置您的工作流ID：

```typescript
// 配置
const workflowId = 'your-workflow-id' // 请替换为实际的工作流ID
```

## API 接口

### uploadFile
上传文件到 Dify 平台

```typescript
uploadFile(url: string, options?: UploadFileOptions): Promise<string>
```

**参数:**
- `url`: 文件URL
- `options`: 可选配置项

**返回:** 文件ID字符串

### runWorkflow
运行 Dify 工作流（流式）

```typescript
runWorkflow(
  workflowId: string,
  uploadFileId: string,
  user: string,
  options?: WorkflowRunOptions
): Promise<void>
```

**参数:**
- `workflowId`: 工作流ID
- `uploadFileId`: 上传的文件ID
- `user`: 用户ID
- `options`: 配置选项，包含回调函数

## 配置说明

### 工作流输入格式

```json
{
  "inputs": {
    "article": {
      "type": "document",
      "transfer_method": "local_file",
      "upload_file_id": "file-id"
    }
  },
  "response_mode": "streaming",
  "user": "user-id"
}
```

### 响应格式

```typescript
interface ChunkCompletionResponse {
  event: string
  task_id: string
  id: string
  answer: string
  metadata: {
    usage: {
      prompt_tokens: number
      completion_tokens: number
      total_tokens: number
    }
  }
  created_at: number
}
```

## 样式定制

组件使用 CSS 变量，可以通过以下方式定制样式：

```css
.typewriter-container {
  --primary-color: #007bff;
  --background-color: #f8f9fa;
  --border-color: #e9ecef;
  --text-color: #333;
}
```

## 注意事项

1. **工作流ID**: 请确保配置正确的工作流ID
2. **文件大小**: 建议文件大小不超过 10MB
3. **网络连接**: 需要稳定的网络连接以支持流式响应
4. **浏览器兼容性**: 需要支持 Fetch API 和 ReadableStream

## 故障排除

### 常见问题

1. **文件上传失败**
   - 检查网络连接
   - 确认文件格式支持
   - 检查文件大小限制

2. **工作流运行失败**
   - 确认工作流ID正确
   - 检查 Dify 服务状态
   - 查看控制台错误信息

3. **打字机效果不工作**
   - 检查 typingSpeed 参数
   - 确认浏览器支持 setTimeout

### 调试技巧

1. 开启浏览器开发者工具查看网络请求
2. 检查控制台错误信息
3. 使用 Vue DevTools 查看组件状态

## 更新日志

- v1.0.0: 初始版本，支持基本的文件上传和摘要生成
- 支持流式响应和打字机效果
- 添加 Markdown 渲染功能
- 完善错误处理机制 