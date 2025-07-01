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
  authors: string[]
  link: string
  fields: string[]
  published: string
  publicationId: string
  receiverId: string
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

export interface addResponse {
  data: {
    code: string
    message: string
    data: string
  }
}
