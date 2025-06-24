import request from '@/utils/request'
import type { UploadResponse } from '@/api/types/utils'

export function upload(url: string, formData: FormData): Promise<UploadResponse> {
  return request.post(url, formData)
}
