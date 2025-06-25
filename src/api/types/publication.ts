export interface Publication {
  abstracts: string | null
  authors: string | null
  conference: string
  createdAt: string
  doi: string | null
  id: number
  institutionId: number
  isPublic: number
  keywords: string | null
  likeNum: number
  pdfUrl: string | null
  readerNum: number
  status: string
  title: string
  type: string
  uploaderId: number
  venue: string | null
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
