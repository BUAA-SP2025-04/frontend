import request from '@/utils/request'

export const getFollow = (id: number | string) => {
  return request.post('/neo/getFollow', {
    id: id,
  })
}

export const getInstitution = (id: number | string) => {
  return request.post('/neo/getInstitution', {
    id: id,
  })
}

export const getArea = (id: number | string) => {
  return request.post('/neo/getArea', {
    id: id
  })
}

export const getResearcherByInstitution = (name: string) => {
  return request.post('/neo/getResearcherByInst', {
    name: name
  })
}

export const getResearcherByArea = (name: string) => {
  return request.post('/neo/getResearcherByArea', {
    name: name
  })
}
