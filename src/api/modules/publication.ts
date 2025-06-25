import request from '@/utils/request'
import type {
  PublicationListResponse,
  PublicationStatsResponse,
  SavePublicationRequest,
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
