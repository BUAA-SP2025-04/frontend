// 注册请求体
export interface RegisterUserRequest {
  email: string
  name: string
  password: string
  gender: string
  institution: string
}

// 登录请求体
export interface LoginUserRequest {
  email: string
  password: string
}

// 完善信息请求体
export interface UpdateUserProfileRequest {
  bio: string
  researchArea: string
  title: string
  imgUrl: string
}

// 注册响应体
export interface RegisterResponse {
  status: string
  data: UserResponse[]
}

// 用户信息响应体
export interface UserResponse {
  token: string
  id: string
  email: string
  gender: string
  name: string
  institution: string
  imageUrl: string
}

// 用户详情类型
export interface UserDetail {
  id: string | string[]
  name: string
  title: string
  institution: string
  imgUrl: string
  description: string
  researchArea: string
  publishNum: number
  subjectNum: number
  followerNum: number
  gender: string
  createdAt: string
  email?: string
}

// 论文类型
export interface Paper {
  id: number
  title: string
  authors: { id: number; name: string }[]
  conference: string
  venue: string
  year: number
  status: string
  keywords: string
  doi: string
  pdfUrl: string
  abstract: string
  readerNum: number
  likeNum: number
  _showFullAbstract?: boolean
}

export interface publication {
  abstract: string
  authors: { id: number; name: string }[]
  conference: string
  createdAt: string
  doi: string
  id: number
  institutionId: number
  keywords: string
  likeNum: number
  pdfUrl: string
  readerNum: number
  status: string
  title: string
  type: string
  uploaderId: number
  venue: string
  year: number
  [property: string]: any
}
