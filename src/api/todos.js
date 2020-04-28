import request from '@/utils/request'

export function addTodo(data) {
  return request({
    url: '/todos',
    method: 'post',
    data
  })
}

export function deleteTodo(data) {
  return request({
    url: '/todos',
    method: 'delete',
    data
  })
}

export function putTodo(id,data) {
  return request({
    url: '/todos/'+id,
    method: 'put',
    data
  })
}



export function getTodo(data) {
    return request({
      url: '/todos',
      method: 'get',
      data
    })
  }
  