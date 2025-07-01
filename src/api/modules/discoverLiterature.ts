import type {
  DiscoverLiteratureResponse,
  DiscoverTermGroupResponse,
  UpdateTermRequest,
} from '@/api/types/discoverLiterature'
import request from '@/utils/request'

export function getDiscoverTerm(): Promise<DiscoverTermGroupResponse> {
  return request.get('/favorites/getDiscoverTerm')
}

export function updateDiscoverTerm(data: UpdateTermRequest): Promise<DiscoverTermGroupResponse> {
  return request.post('/favorites/updateDiscoverTerm', data)
}

export function getDiscoverLiterature(): Promise<DiscoverLiteratureResponse> {
  return request.get('/favorites/getDiscoverLiterature')
}
