import request from '@/utils/request'

export function findDes(mid) {
  return request({
    url: '/role/menu/' + mid
  })
}


export function addDes(data) {
  return request({
    url: '/role/meta/des' ,
    method: 'post',
    data
  })
}

export function addUserDes(data) {
  return request({
    url: '/role/user/des' ,
    method: 'post',
    data
  })
}




export function getRoleList(params) {
  return request({
    url: '/role/',
    params
  })
}


export function findById(id) {
  return request({
    url: '/role/'+id,
  })
}



export function deleteRole(data) {
  return request({
    url: '/role/',
    method: 'delete',
    data
  })
}




export function chanceRole(data) {
  return request({
    url: '/role/',
    method: 'put',
    data
  })
}


export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}