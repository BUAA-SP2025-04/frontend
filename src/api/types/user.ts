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

// 登录/注册响应体
export interface LoginResponse {
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
  imgUrl: string
}
