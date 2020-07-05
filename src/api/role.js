import request from '@/utils/request'

export function findDes(mid) {
  return request({
    url: '/role/' + mid
  })
}


export function addDes(data) {
  return request({
    url: '/role/des' ,
    method: 'post',
    data
  })
}
