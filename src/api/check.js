import request from '@/utils/request'

export function getCheckNumber(params) {
    return request({
      url: '/check/',
      params
    })
  }

  export function getCheckPersons(mid,params) {
    return request({
      url: '/check/'+mid,
      params
    })
  }
