import request from '@/utils/request'
import type { saveAchievementRequest, emptyResponse } from '@/api/types/achievement'

export function saveAchievement(url: string, data: saveAchievementRequest): Promise<emptyResponse> {
  return request.post(url, data)
}

export function deleteAchievement(id: number): Promise<emptyResponse> {
  return request.delete(`/achievement/delete/${id}`)
}
