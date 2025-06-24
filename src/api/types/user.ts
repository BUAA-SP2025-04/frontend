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
  followerNum: string
  publishNum: string
  subjectNum: string
  gender: string
  imgUrl: string
  institution: string
  createdAt: string
  bio: string
}

export interface LoginResponse {
  data: LoginUserResponse[]
}
