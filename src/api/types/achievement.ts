export interface AchievementProfile {
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
  isPublic: boolean
}

export interface SaveAchievementRequest {
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
