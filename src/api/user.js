import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getMenus(type){
  return request({
    url: '/menu/'+type,
    method: 'get'
  })

}
export function getMeta(){
  return request({
    url: '/meta',
    method: 'get'
  })

}

export function getRoles(){
  return request({
    url: '/role',
    async:false,
    method: 'get'
  })

}



export function addMeta(data){
  return request({
    url: '/meta',
    method: 'post',
    data
  })

}

export function addMenus(data){
  return request({
    url: '/menu',
    method: 'post',
    data
  })

}


export function getUserList(params){
  return request({
    url: '/user',
    params
  })

}


export function updatedState(userId,state){
  return request({
    url: `/user/${userId}/${state}`,
    method: 'put',
  })

}

export function addUser(data){
  return request({
    url: '/user',
    method: 'post',
    data
  })
}


export function chanceUser(data){
  return request({
    url: '/user',
    method: 'put',
    data
  })
}



export function getUserById(id) {
  return request({
    url: '/user/find/'+id,
    method: 'get',
  })
}