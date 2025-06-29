const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8080/chat/upload'

export interface UploadResponse {
  fileId: string
  fileName: string
  fileSize: number
  fileUrl: string
  mimeType: string
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
      // 添加错误处理和超时设置
    })

    if (!response.ok) {
      throw new Error(`上传失败: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('文件上传成功:', result)
    return result
  } catch (error) {
    console.error('文件上传失败:', error)
    throw new Error(`文件上传失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}