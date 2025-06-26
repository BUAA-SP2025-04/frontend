import type { InputNumberEmits } from "element-plus"

// 收藏论文类型
export interface FavoritePaper {
  id: number
  title: string
  citations?: number
  readCount?: number
  folderId: number
  // publishDate?: string
  type: string,
  authors?: string,
  venue?: string,
  year?: string,
  abstract?: string,
  keywords?: string,
  doi?: string,
  pdfUrl?: string,
  status: string,
  isPublic: string
}

// 收藏夹类型
export interface Folder {
  id: number
  name: string
  count?: number
}

// 历史记录类型
export interface Record {
  id: string
  userId: string
  paperId: string
}

export interface Paper {
  type: string,
  title: string,
  authors?: string,
  venue?: string,
  year?: string,
  abstract?: string,
  keywords?: string,
  doi?: string,
  pdfUrl?: string,
  status: string,
  isPublic: string
}

export interface ResponsePapers{
  userId: number
  paperId: number
  categoryId: number
  id: number
}

export interface RPaper{
  id: number,
  type: string,
  title: string,
  authors: string | null,
  conference: string | null,
  year: number | null,
  venue: string,
  keywords: string | null,
  status: string,
  doi?: string | null,
  pdfUrl: string,
  abstracts?: string | null,
  uploaderId: number,
  institution?: string | null,
  institutionId?: number | null,
  createdAt?: string,
  readerNum?: number,
  likeNum?: number,
  isPublic: string
}

// 响应类型
export type GetListResponse = {
  data: {data: ResponsePapers[]}
};
export type GetCategoryListResponse = {
  data: Folder[]
};
export type CreateCategoryResponse = {data: number};
export type CreatePaperResponse = {data: number};
export type GetRecordListResponse = {
  data: Record[]
};
export type CreateRecordResponse = {data: Record};
export type GetByIDResponse = {data: RPaper};
export type GetFileUrlResponse = {data: string}