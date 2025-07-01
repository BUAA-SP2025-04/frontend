export interface DiscoverTerm {
  id: string
  value: string
}

export interface DiscoverTermGroup {
  title: DiscoverTerm[]
  author: DiscoverTerm[]
  field: DiscoverTerm[]
}

export interface DiscoverLiterature {
  id: string
  sid: string
  arxivId: string
  title: string
  summary: string
  authors: string
  link: string
  categories: string
  published: string
  publicationId: string
}

export interface DiscoverLiteratureGroup {
  title: DiscoverLiterature[]
  author: DiscoverLiterature[]
  field: DiscoverLiterature[]
}

export interface UpdateTermRequest {
  addedTerm: DiscoverTermGroup
  deletedTerm: DiscoverTermGroup
}

export interface DiscoverTermGroupResponse {
  code: string
  message: string
  data: DiscoverTermGroup
}

export interface DiscoverLiteratureResponse {
  code: string
  message: string
  data: DiscoverLiteratureGroup
}
