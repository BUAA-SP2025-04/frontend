// src/api/modules/user.ts
import request from '@/utils/request'
import type {
  RegisterUserRequest,
  LoginUserRequest,
  UpdateUserProfileRequest,
  RegisterResponse,
  UserResponse,
} from '../types/user'

// 注册
export function registerUser(data: RegisterUserRequest): Promise<RegisterResponse> {
  return request.post('/user/register', data)
  // return request.post('http://127.0.0.1:4523/m2/6625065-6332383-default/312041825', data)
}

// 登录
export function loginUser(data: LoginUserRequest): Promise<UserResponse> {
  return request.post('/user/login', data)
}

// 完善用户信息
export function updateUserProfile(data: UpdateUserProfileRequest): Promise<void> {
  return request.post('/user/profile', data)
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
