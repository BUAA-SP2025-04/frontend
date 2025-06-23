export interface Achievement {
  id?: number
  type: string
  title: string
  authors: string[]
  venue: string
  year?: number
  status: string
  abstract: string
  keywords: string[]
  doi: string
  pdfUrl: string
}

export interface emptyResponse {
  message: string
  data: null
}

export interface saveAchievementRequest {
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
