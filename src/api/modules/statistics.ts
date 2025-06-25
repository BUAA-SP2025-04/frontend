import request from '@/utils/request'
import type { publication } from '@/api/types/user'

export interface CountResponse {
  code: string
  message: string
  data: object
}

// 获取注册研究者数量
export function getResearcherCount(): Promise<CountResponse> {
  return request.get('/researcher/getCount')
}

// 获取发表论文数量
export function getPaperCount(): Promise<CountResponse> {
  return request.get('/publication/getCount')
}

// 获取合作项目数量（消息数量）
export function getMessageCount(): Promise<CountResponse> {
  return request.get('/messages/getAllCount')
}

// 获取更新成果
export function getUpdatePublication(): Promise<publication> {
  return request.get('/publication/getUpdatePublication')
}

// 获取点赞成果
export function getLikePublication(): Promise<publication> {
  return request.get('/publication/getLikePublication')
}

export function getHotFields(): Promise<any> {
  return request.get('/researcher/getHotFields')
}
