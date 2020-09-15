import request from '@/utils/request'

export function deletePerson(data) {
  return request({
    url: '/person/',
    method: 'delete',
    data
  })
}

export function getPerSionList(params) {
  return request({
    url: '/person/',
    params
  })
}

export function getBelongList(params) {
  return request({
    url: 'person/'+params.type+"/"+params.mid,
  })
}


export function chancePerson(params) {
  return request({
    url: '/person/',
    method: 'put',
    params
  })
}
