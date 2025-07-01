import request from '@/utils/request'
import type {
  likeResponse,
  PublicationInformResponse,
  PublicationListResponse,
  PublicationProfile,
  PublicationStatsResponse,
  SavePublicationRequest,
} from '@/api/types/publication'
import type { EmptyResponse, UploadResponse } from '@/api/types/utils'

export function savePublication(url: string, data: SavePublicationRequest): Promise<EmptyResponse> {
  return request.post(url, data)
}

export function deletePublication(id: number): Promise<EmptyResponse> {
  return request.post('/publication/delete', { id })
}

export function getPublicationsByUser(id: number | string): Promise<PublicationListResponse> {
  return request.get('/publication/searchByUserId', {
    params: { id },
  })
}

export function getPublicationStatsByUser(id: number | string): Promise<PublicationStatsResponse> {
  return request.get('/researcher/getStatsByUserId', {
    params: { id },
  })
}

export function uploadPublicationFile(formData: FormData): Promise<UploadResponse> {
  return request.post('/publication/uploadFile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function updatePublicationFile(formData: FormData): Promise<UploadResponse> {
  return request.post('/publication/updateFile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function deletePublicationFile(oldFilePath: string): Promise<EmptyResponse> {
  return request.post('/publication/deleteFile', null, {
    params: { oldFilePath },
  })
}

export function getPublicationFile(pdfUrl: string): Promise<Blob> {
  return request.get(pdfUrl, { responseType: 'blob' })
}

export function batchAddPublications(data: PublicationProfile[]): Promise<EmptyResponse> {
  return request.post('/publication/batchAdd', { publicationsProfiles: data })
}

export function getPublicationInformById(id: number | string): Promise<PublicationInformResponse> {
  return request.get('/publication/getById', {
    params: { id },
  })
}

export function readPublication(id: number | string): Promise<EmptyResponse> {
  return request.post('/publication/read', { id })
}

export function getProbablePublicationsByName(name: string): Promise<PublicationListResponse> {
  return request.get('/publication/probableById', {
    params: { name },
  })
}

// 认领成果：id对应被认领的成果id
export function claimPublication(id: number | string): Promise<EmptyResponse> {
  return request.post('/publication/claim', { id })
}

// 点赞成果
export function likePublication(id: number | string): Promise<EmptyResponse> {
  return request.post('/publication/like', { id })
}

// 取消点赞成果
export function unlikePublication(id: number | string): Promise<EmptyResponse> {
  return request.post('/publication/unlike', { id })
}

export function isLikePublication(id: number | string): Promise<likeResponse> {
  return request.get('/publication/isLike', { params: { id: id } })
}

export function hasApplication(id: number | string): Promise<likeResponse> {
  return request.get('/has_application', { params: { publicationId: id } })
}

export function apply(publicationId: number | string, receiverId: number | string) {
  return request.post('/apply', { publicationId, receiverId })
}

