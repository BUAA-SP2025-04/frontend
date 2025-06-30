const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8080/chat/upload'

export interface UploadResponse {
  fileId: string
  fileName: string
  fileSize: number
  fileUrl: string
  mimeType: string
}

export async function uploadFile(file: File, conversationId?: string): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)
  
  // 添加 conversationId 参数
  if (conversationId) {
    formData.append('conversationId', conversationId)
  }

  try {
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`上传失败: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('文件上传成功:', result)
    // 只返回 data 字段
    return result.data
  } catch (error) {
    console.error('文件上传失败:', error)
    throw new Error(`文件上传失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}