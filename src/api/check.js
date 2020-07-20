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

  export function chanceCheckStatue(mid,isCheck,params) {
    console.log(params);
    
    return request({
      url: `/check/${isCheck}/${mid}`,
      method: 'put',
      params
    })
  }


  