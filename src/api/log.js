import request from '@/utils/request'

export function getLogList(params) {
    return request({
      url: '/log/',
      params
    })
  }


  export function deleteLog(data) {
    return request({
      url: '/log/',
      method: 'delete',
      data
    })
  }