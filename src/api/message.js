import request from '@/utils/request'

export function sendMassage(params) {
  return request({
    url: '/sendMassage',
    params
  })
}

export function sendOneMassage(params) {
    return request({
      url: '/sendOneMassage',
      params
    })
  }
