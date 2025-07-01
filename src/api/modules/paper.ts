import request from '@/utils/request'

// 获取论文详情
export function getPaperDetail(id: number) {
  return request.get('http://127.0.0.1:4523/m2/6625065-6332383-default/312411438', {
    params: { id },
  })
}

