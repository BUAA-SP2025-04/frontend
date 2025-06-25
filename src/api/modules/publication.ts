import request from '@/utils/request'
import type { PublicationListResponse, SavePublicationRequest } from '@/api/types/publication'
import type { EmptyResponse } from '@/api/types/utils'

export function savePublication(url: string, data: SavePublicationRequest): Promise<EmptyResponse> {
  return request.post(url, data)
}

export function deletePublication(id: number): Promise<EmptyResponse> {
  return request.delete('/publication/delete/', {
    params: { id },
  })
}

export function getPublicationsByUser(userId: number | string): Promise<PublicationListResponse> {
  return request.get('/publication/searchByUserId/', {
    params: { userId },
  })
}
