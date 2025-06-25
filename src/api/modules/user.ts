// src/api/modules/user.ts
import request from '@/utils/request'
import type {
  RegisterUserRequest,
  LoginUserRequest,
  UpdateUserProfileRequest,
  LoginResponse,
  UpdateUserPasswordRequest,
  UserDetail,
} from '../types/user'

// 注册
export function registerUser(data: RegisterUserRequest): Promise<LoginResponse> {
  return request.post('/user/register', data)
  // return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312041825', data)
}

// 登录
export const loginUser = (data: LoginUserRequest): Promise<LoginResponse> => {
  return request.post('/user/login', data)
  // return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312055184', data)
}

// 完善用户信息
export const updateUserProfile = (data: UpdateUserProfileRequest): Promise<unknown> => {
  return request.post('/user/profile', data)
}

// 上传头像
export const uploadUserImg = (data: FormData): Promise<{ imgUrl: string }> => {
  return request.post('/user/img', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// 修改密码
export const changeUserPassword = (data: UpdateUserPasswordRequest): Promise<unknown> => {
  return request.post('/user/password', data)
}

// 获取用户详情
export function getUserDetail(id: string | number) {
  return request.get('/researcher/searchById', {
    params: { id },
  })
}

// 获取用户论文ID列表
export function getUserPapers(id: string | number) {
  return request.get('/publication/searchByUserId', {
    params: { id },
  })
}

// 关注
export function follow(toBeFollowedId: string | number) {
  return request.post('/researcher/follow', { params: { toBeFollowedId } })
}

// 取消关注
export function unfollow(toBeCancelledId: string | number) {
  return request.post('/researcher/cancelFollow', { params: { toBeCancelledId } })
}

// 获取是否关注
export function getIfFollow(id: string | number) {
  return request.get('/researcher/ifFollow', {
    params: { id },
  })
}

// 获取当前用户信息
export function getUserInfo(): Promise<UserDetail> {
  return request.get('/user/get')
}
