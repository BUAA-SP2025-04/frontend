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
}

export interface UpdateUserPasswordRequest {
  originPassword: string
  newPassword: string
}

// 登录/注册响应体 - 修改为返回 UserDetail 和 token
export interface LoginUserResponse {
  token: string
  id: number
  name: string
  email: string
  researchArea: string
  title: string
  followerNum: number
  publishNum: number
  subjectNum: number
  gender: string
  imgUrl: string
  institution: string
  createdAt: string
  bio: string
}

export interface LoginResponse {
  data: LoginUserResponse
}

// 用户详情类型
export interface UserDetail {
  id: string | number
  name: string
  title: string
  institution: string
  imgUrl: string
  bio: string
  researchArea: string
  publishNum: number
  subjectNum: number
  followerNum: number
  gender: string
  createdAt: string
  email: string
}

// 论文类型
export interface Paper {
  id: number
  title: string
  authors: string
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
  authors: string[]
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
