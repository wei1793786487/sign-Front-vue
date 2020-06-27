import request from '@/utils/request'

export function deleteByUrl(data) {
  return request({
    url: '/person/',
    method: 'delete',
    data
  })
  }
  