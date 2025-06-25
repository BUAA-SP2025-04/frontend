import request from '@/utils/request'
import type {
  GetListResponse,
  GetCategoryListResponse,
  CreateCategoryResponse,
  CreatePaperResponse,
  CreatePaperRequest,
} from '@/api/types/library'

export const libraryAPI = {
  // 获取所有文献
  getList: (userId: string): Promise<GetListResponse> =>
    request.get('/favorites/list', {
      params: { userId },
    }),

  // 获取所有文献
  getCategoryList: (userId: string): Promise<GetCategoryListResponse> =>
    request.get('/favorite-categories/list', {
      params: { userId },
    }),

  // 更新文献收藏夹
  changeCategory: (userId: string, paperId: string, categoryId: string) =>
    request.post('/favorite-categories/list', {
      params: { userId, paperId, categoryId },
    }),

  // 删除文献
  deletePaper: (userId: string, paperId: string) =>
    request.delete('/favorites/delete', {
      params: { userId, paperId },
    }),

  // 重命名收藏夹
  renameFolder: (categoryId: string, name: string) =>
    request.post('/favorite-categories/rename', {
      params: { categoryId, name },
    }),

  // 创建收藏夹
  createFolder: (userId: string, name: string): Promise<CreateCategoryResponse> =>
    request.post('/favorite-categories/create', {
      params: { userId, name },
    }),

  // 删除收藏夹
  deleteFolder: (categoryId: number) =>
    request.delete('/favorite-categories/delete', {
      params: { categoryId },
    }),

  // 上传文献
  createPaper: (
    userId: string,
    categoryId: number,
    createPaperRequest: CreatePaperRequest
  ): Promise<CreatePaperResponse> =>
    request.post('/favorites/upload', createPaperRequest, {
      params: { userId, categoryId },
    }),
}
