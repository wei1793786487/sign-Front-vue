import request from '@/utils/request'

export function addMeeting(data) {
  return request({
    url: '/meeting',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/meeting/information/' + id,
  })
}


export function chanceMeeting(data) {
  return request({
    url: '/meeting',
    method: 'put',
    data
  })
}

export function getMeetingList(params) {
  return request({
    url: '/meeting/',
    params
  })
}

export function deleteMeeting(data) {
  return request({
    url: '/meeting/',
    method: 'delete',
    data
  })
}
