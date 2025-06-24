import request from '@/utils/request'
import type { SaveAchievementRequest } from '@/api/types/achievement'
import type { EmptyResponse } from '@/api/types/utils'

export function saveAchievement(url: string, data: SaveAchievementRequest): Promise<EmptyResponse> {
  return request.post(url, data)
}

export function deleteAchievement(id: number): Promise<EmptyResponse> {
  return request.delete(`/achievement/delete/${id}`)
}
