// 收藏论文类型
export interface FavoritePaper {
  id: number
  title: string
  authors: string[]
  journal: string
  citations: number
  readCount: number
  tags: string[]
  folderId: number
  publishDate: string
  url: string
}

// 收藏夹类型
export interface Folder {
  id: number
  name: string
  count?: number
}

// 历史记录类型
export interface Record {
  userId: string
  paperId: string
}

export interface CreatePaperRequest {
    "type": string,
    "title": string,
    "authors"?: string[],
    "venue"?: string,
    "year"?: string,
    "abstract"?: string,
    "keywords"?: string[],
    "doi"?: string,
    "pdfUrl"?: string,
    "status": string,
    "isPublic": string
}

// 响应类型
export type GetListResponse = FavoritePaper[];
export type GetCategoryListResponse = Folder[];
export type CreateCategoryResponse = number;
export type CreatePaperResponse = number;
export type GetRecordListResponse = Record[];