import request from '@/utils/request'

// 搜索科研人员
export function searchResearchersByName(params: { name: string }) {
  return request.get('/researcher/searchByName', {
    params,
  })
} 

export function searchResearchersByInstitution(params: { institution: string }) {
  return request.get('/researcher/searchByInstitution', {
    params,
  })
} 

export function searchResearchersByArea(params: { area: string }) {
  return request.get('/researcher/searchByArea', {
    params,
  })
} 

export function searchResearchersByTitle(params: { title: string }) {
  return request.get('/researcher/searchByTitle', {
    params,
  })
} 
