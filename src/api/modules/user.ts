// src/api/modules/user.ts
import request from '@/utils/request'
import type {
  RegisterUserRequest,
  LoginUserRequest,
  UpdateUserProfileRequest,
  LoginResponse,
} from '../types/user'

// 注册
export function registerUser(data: RegisterUserRequest): Promise<LoginResponse> {
  //return request.post('/user/register', data)
  return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312041825', data)
}

// 登录
export const loginUser = (data: LoginUserRequest): Promise<LoginResponse> => {
  //return request.post('/user/login', data)
  return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312055184', data)
}

// 完善用户信息
export function updateUserProfile(data: UpdateUserProfileRequest): Promise<void> {
  return request.post('/user/profile', data)
}
