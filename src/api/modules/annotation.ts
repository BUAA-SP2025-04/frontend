import request from '@/utils/request'
import type {
  AnnotationUpload,
  GetAnnotationListResponse,
  UploadAnnotationResponse
} from '@/api/types/annotation'

export const annotationAPI = {
  // 获取当前文献所有批注
  getAnnotationList: (userId: string, paperId: string): Promise<GetAnnotationListResponse> =>
    request.get('/annotation/list', {
      params: { userId, paperId },
    }),

  // 上传新高亮批注
  uploadAnnotation: (userId: string, paperId: string, newAnnotation: AnnotationUpload): Promise<UploadAnnotationResponse> =>
    request.post('/annotation/list', newAnnotation, {
      params: { userId, paperId },
    }),
  
}