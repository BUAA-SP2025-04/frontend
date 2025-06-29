export type PublicationType = 'journal' | 'conference' | 'patent'
export type PublicationStatus = 'published' | 'accepted' | 'under-review' | 'draft'

export interface Author {
  authorId: number
  authorName: string
  publicationId: number
}

export interface likeResponse {
  message: string
  data: boolean | undefined
  code: string
}

export interface publicationInfo {
  abstracts: string | null
  conference: null
  createdAt: string
  doi: string | null
  id: number
  institutionId: number
  isPublic: number
  keywords: string | null
  likeNum: number
  pdfUrl: string | null
  readerNum: number
  status: PublicationStatus
  title: string
  type: PublicationType
  uploaderId: number
  venue: string | null
  year: number | null
}

export interface Publication {
  authors: Author[]
  publication: publicationInfo
}

// 用于详情页面的合并后的Publication类型
export interface PublicationDetail {
  id: number
  title: string
  authors: Author[]
  conference: string | null
  venue: string | null
  year: number | null
  status: PublicationStatus
  keywords: string | null
  doi: string | null
  pdfUrl: string | null
  abstracts: string | null
  readerNum: number
  likeNum: number
  isLiked?: boolean
  institutionId: number
  isPublic: number
  type: PublicationType
  uploaderId: number
  createdAt: string
}

export interface PublicationProfile {
  id?: number
  type: PublicationType
  title: string
  authors: string | null
  venue: string | null
  year: string | null
  status: PublicationStatus
  abstracts: string | null
  keywords: string | null
  doi: string | null
  pdfUrl: string | null
  isPublic: number
}

export interface PublicationStats {
  totalPublicationNum: number
  totalReaderNum: number
  totalLikeNum: number
  totalProjectNum: number
}

export interface SavePublicationRequest {
  type: PublicationType
  title: string
  authors: string | null
  venue: string | null
  year: string | null
  status: PublicationStatus
  abstracts: string | null
  keywords: string | null
  doi: string | null
  pdfUrl: string | null
  isPublic: string
}

export interface PublicationStatsResponse {
  message: string
  data: PublicationStats
}

export interface PublicationListResponse {
  message: string
  data: {
    authors: Author[]
    publication: publicationInfo
  }[]
}

export interface PublicationInformResponse {
  message: string
  data: Publication
  code: string
}
