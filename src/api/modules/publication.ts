import request from '@/utils/request'
import type {
  PublicationListResponse,
  PublicationStatsResponse,
  SavePublicationRequest,
  PublicationInformResponse,
  PublicationCommentResponse,
  CreatePublicationCommentRequest,
  CreatePublicationCommentResponse
} from '@/api/types/publication'
import type { EmptyResponse } from '@/api/types/utils'

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
  return request.get('/publication/getStatsByUserId', {
    params: { id },
  })
}

export function getPublicationInformById(id: number | string): Promise<PublicationInformResponse> {
  return request.get('/publication/getById', {
    params: { id },
  })
}

// 成果评论相关API
export function getPublicationComments(
  publicationId: number | string,
  params: { page: number; size: number }
): Promise<PublicationCommentResponse> {
  return request.get(`/publication/${publicationId}/comments`, { params })
}

export function createPublicationComment(
  publicationId: number | string,
  data: CreatePublicationCommentRequest
): Promise<CreatePublicationCommentResponse> {
  return request.post(`/publication/${publicationId}/comments`, data)
}

export function togglePublicationCommentLike(commentId: number): Promise<{ isLiked: boolean; likesCount: number }> {
  return request.post(`/publication/comments/${commentId}/like`)
}
