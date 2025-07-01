import type {
  addResponse,
  DiscoverLiteratureResponse,
  DiscoverTermGroupResponse,
  UpdateTermRequest,
} from '@/api/types/discoverLiterature'
import request from '@/utils/request'
import type { EmptyResponse } from '@/api/types/utils'

export function getDiscoverTerm(): Promise<DiscoverTermGroupResponse> {
  return request.get('/favorites/getDiscoverTerm')
}

export function updateDiscoverTerm(data: UpdateTermRequest): Promise<DiscoverTermGroupResponse> {
  return request.post('/favorites/updateDiscoverTerm', data)
}

export function getDiscoverLiterature(): Promise<DiscoverLiteratureResponse> {
  return request.get('/favorites/getDiscoverLiterature')
}

export function addToLibrary(id: string): Promise<addResponse> {
  return request.get('/favorites/addToLibrary', { params: { id } })
}

export function deleteOldPaper(id: string): Promise<EmptyResponse> {
  return request.get('/favorites/deleteOldPaper', { params: { id } })
}
