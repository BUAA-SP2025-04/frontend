import request from '@/utils/request'
import type {
  CreateCategoryResponse,
  CreatePaperResponse,
  CreateRecordResponse,
  GetByIDResponse,
  GetCategoryListResponse,
  GetFileUrlResponse,
  GetListResponse,
  GetRecordListResponse,
  GetUpdateResponse,
  Paper,
} from '@/api/types/library'

export const libraryAPI = {
  // 获取所有文献
  getList: (userId: string): Promise<GetListResponse> =>
    request.get('/favorites/list', {
      params: { userId },
    }),

  // 获取所有收藏夹
  getCategoryList: (userId: string): Promise<GetCategoryListResponse> =>
    request.get('/favorite-categories/list', {
      params: { userId },
    }),

  // 更新文献收藏夹
  changeCategory: (userId: string, paperId: string, categoryId: string) =>
    request.post('/favorite-categories/list', null, {
      params: { userId, paperId, categoryId },
    }),

  // 删除文献
  deletePaper: (userId: string, paperId: string) =>
    request.post('/favorites/remove', null, {
      params: { userId, paperId },
    }),

  // 重命名收藏夹
  renameFolder: (categoryId: string, name: string) =>
    request.post('/favorite-categories/rename', null, {
      params: { categoryId, name },
    }),

  // 创建收藏夹
  createFolder: (userId: number, name: string): Promise<CreateCategoryResponse> =>
    request.post('/favorite-categories/create', null, {
      params: { userId, name },
    }),

  // 删除收藏夹
  deleteFolder: (categoryId: number) =>
    request.post('/favorite-categories/delete', null, {
      params: { categoryId },
    }),

  // 上传文献并收藏
  createPaper: (
    userId: string,
    categoryId: number,
    createPaperRequest: Paper
  ): Promise<CreatePaperResponse> =>
    request.post('/favorites/upload', createPaperRequest, {
      params: { userId, categoryId },
    }),

  // 创建历史记录
  createRecord: (userId: string, paperId: string): Promise<CreateRecordResponse> =>
    request.post('/readingRecord/add', { userId: userId, paperId: paperId }),

  // 获取所有历史记录
  getRecordList: (userId: string): Promise<GetRecordListResponse> =>
    request.get('/readingRecord/list', {
      params: { userId },
    }),

  // 获取所有历史记录
  deleteRecord: (id: number): Promise<GetRecordListResponse> =>
    request.post('/readingRecord/list', null, {
      params: { id },
    }),

  // 通过 ID 获取文献
  getByID: (id: number): Promise<GetByIDResponse> =>
    request.get('/publication/getById', {
      params: { id },
    }),

  // 获取文献URL
  getFileUrl: (formData: FormData): Promise<GetFileUrlResponse> =>
    request.post('/publication/uploadFile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // 删除URL对应文献
  deleteUrlFile: (oldFilePath: string) =>
    request.post('/publication/deleteFile', null, {
      params: { oldFilePath },
    }),

  // 删除成果
  deletePublication: (id: string) =>
    request.post('/publication/delete', {
      id: id,
    }),

  // 获取最新成果
  getNewPapers: (): Promise<GetUpdateResponse> => request.get('/publication/getUpdatePublication'),

  // 收藏文献
  favoritePaper: (userId: number, paperId: number, categoryId: number) =>
    request.post('/favorites/add', null, {
      params: { userId: userId, paperId: paperId, categoryId: categoryId },
    }),
}