// src/api/modules/user.ts
import request from '@/utils/request'
import type {
  RegisterUserRequest,
  LoginUserRequest,
  UpdateUserProfileRequest,
  LoginResponse,
  UpdateUserPasswordRequest,
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
export const updateUserProfile = (data: UpdateUserProfileRequest): Promise<unknown> => {
  //return request.post('/user/profile', data)
  return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312260332', data)
}

// 上传头像
export const uploadUserImg = (data: FormData): Promise<{ imgUrl: string }> => {
  //return request.post('/user/img', data, {
  //headers: { 'Content-Type': 'multipart/form-data' },
  //})
  return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312651823', data, {
    //headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// 修改密码
export const changeUserPassword = (data: UpdateUserPasswordRequest): Promise<unknown> => {
  //return request.post('/user/password', data)
  return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312647089', data)
}
