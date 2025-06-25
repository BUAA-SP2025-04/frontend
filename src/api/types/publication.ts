export interface Publication {
  abstract: string
  authors: string[]
  conference: string
  createdAt: string
  doi: string
  id: number
  institutionId: number
  keywords: string
  likeNum: number
  pdfUrl: string
  readerNum: number
  status: string
  title: string
  type: string
  uploaderId: number
  venue: string
  year: number
}

export interface PublicationProfile {
  id?: number
  type: string
  title: string
  authors: string[]
  venue: string
  year?: number
  status: string
  abstract: string
  keywords: string
  doi: string
  pdfUrl: string
  isPublic: boolean
}

export interface SavePublicationRequest {
  type: string
  title: string
  authors: string
  venue: string
  year?: number
  status: string
  abstract: string
  keywords: string
  doi: string
  pdfUrl: string
}

export interface PublicationListResponse {
  message: string
  data: {
    publications: Publication[]
  }
}
