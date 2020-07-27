import request from '@/utils/request'

export function getVxUserList(data) {
    return request({
      url: '/vx',
      method: 'get',
      data
    })
  }


  export function unband(openid,type) {
    return request({
      url: `/vx/unband/${openid}/${type}`,
      method: 'post',
    })
  }
