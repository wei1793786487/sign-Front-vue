import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken ,setToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8080/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer'+getToken()
      config.headers['Content-Type']="application/x-www-form-urlencoded"
    }
    return config
  },  
  
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async response => {
  

    const res = response.data
    const config = response.config
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      if(res.code!==1000){
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 2002 账号已经过期 2010 token错误
      if (res.code === 2002 || res.code === 2010 ) {
        // to re-login
        MessageBox.confirm('你的登录状态已经失效，', {
          confirmButtonText: '重新登录',
          cancelButtonText: '留在此页',
          type: 'warning'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      if(res.code===1000){
        //如果状态是1000 那么刷新token
        let new_token=res.data;
        setToken(new_token);
        config.headers['Authorization'] = 'Bearer'+getToken();
        const data = await service(config)
        return data;
      }
      //如果删除的人员(这个方法里面因为上传人员的异常调用的Dropzone移除文件的方法，没有办法似的Dropzone不调用移除文件的回调函数)
      // if(response.config.method==="delete"&&response.config.url.indexOf("person") != -1){
      //  return res
      // }
         
      // console.log(res);
      
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
