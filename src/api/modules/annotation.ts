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
    request.post('/annotation/upload', newAnnotation, {
      params: { userId, paperId },
    }),

  // 删除高亮批注
  deleteAnnotation: (annotationId: string)=>
    request.post('/annotation/delete', null, {
      params: { annotationId },
    }),

  // 编辑批注内容
  editAnnotation: (annotationId: string, comment: string) =>
    request.post('/annotation/edit', null, {
      params: { annotationId, comment },
    }),
  
}