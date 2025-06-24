import request from '@/utils/request'
import type { EmptyResponse, UploadResponse } from '@/api/types/utils'

export function uploadFile(url: string, formData: FormData): Promise<UploadResponse> {
  return request.post(url, formData)
}

export function updateFile(url: string, formData: FormData): Promise<EmptyResponse> {
  return request.put(url, formData)
}

export function deleteFile(url: string, oldFilePath: string): Promise<EmptyResponse> {
  return request.delete(url, {
    params: { oldFilePath },
  })
}
