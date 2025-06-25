export interface Publication {
  abstract: string
  authors: string
  conference: string
  createdAt: string
  doi: string
  id: number
  institutionId: number
  isPublic: number
  keywords: string
  likeNum: number
  pdfUrl: string
  readerNum: number
  status: string
  title: string
  type: string
  uploaderId: number
  venue: string
  year: number | null
}

export interface PublicationProfile {
  id?: number
  type: string
  title: string
  authors: string | null
  venue: string | null
  year: number | null
  status: string | null
  abstract: string | null
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
  type: string
  title: string
  authors: string | null
  venue: string | null
  year: string | null
  status: string | null
  abstract: string | null
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
    publications: Publication[]
  }
}
