export interface EmptyResponse {
  message: string
  data: null
}

export interface UploadResponse {
  message: string
  data: {
    url: string
  }
}
