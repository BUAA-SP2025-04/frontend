import { ElMessage } from 'element-plus'

/**
 * 下载PDF文件
 * @param pdfData PDF数据（支持ArrayBuffer、Blob、Base64字符串等格式）
 * @param filename 文件名
 * @returns Promise<boolean> 下载是否成功
 */
export const downloadPdfFile = async (pdfData: any, filename: string = 'document.pdf'): Promise<boolean> => {
  try {
    let processedData: ArrayBuffer | Blob

    // 处理不同格式的PDF数据
    if (pdfData instanceof ArrayBuffer) {
      processedData = pdfData
    } else if (pdfData instanceof Blob) {
      processedData = pdfData
    } else if (typeof pdfData === 'string') {
      // 处理字符串格式（可能是base64编码）
      if (pdfData.startsWith('data:application/pdf;base64,')) {
        // 移除data URL前缀
        const base64Data = pdfData.split(',')[1]
        const binaryString = atob(base64Data)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        processedData = bytes.buffer
      } else {
        // 尝试直接解码base64
        try {
          const binaryString = atob(pdfData)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          processedData = bytes.buffer
        } catch (e) {
          throw new Error('Base64解码失败')
        }
      }
    } else if (typeof pdfData === 'object' && pdfData.data) {
      // 处理对象格式，尝试获取data字段
      const data = pdfData.data
      if (data instanceof ArrayBuffer) {
        processedData = data
      } else if (typeof data === 'string') {
        // 处理base64字符串
        const binaryString = atob(data)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        processedData = bytes.buffer
      } else {
        throw new Error(`对象中的data字段格式不支持: ${typeof data}`)
      }
    } else {
      throw new Error(`不支持的PDF数据格式: ${typeof pdfData}`)
    }

    // 创建Blob对象
    const blob = new Blob([processedData], { type: 'application/pdf' })

    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename

    // 设置文件名（兼容中文）
    link.setAttribute('download', filename)

    // 触发下载
    document.body.appendChild(link)
    link.click()

    // 清理
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    console.log('PDF下载成功:', filename)
    ElMessage.success('PDF下载成功')
    return true

  } catch (error) {
    console.error('PDF下载失败:', error)
    ElMessage.error('PDF下载失败，请重试')
    return false
  }
}

/**
 * 验证PDF数据是否有效
 * @param data PDF数据
 * @returns boolean
 */
export const isValidPdfData = (data: any): boolean => {
  if (!data) return false

  // 检查ArrayBuffer
  if (data instanceof ArrayBuffer) {
    return data.byteLength > 0
  }

  // 检查Blob
  if (data instanceof Blob) {
    return data.size > 0 && data.type === 'application/pdf'
  }

  // 检查字符串（base64）
  if (typeof data === 'string') {
    return data.length > 0
  }

  // 检查对象格式
  if (typeof data === 'object' && data.data) {
    return isValidPdfData(data.data)
  }

  return false
} 