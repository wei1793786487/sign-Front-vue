import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import qs from 'qs'
import {getMenu} from '@/utils/menu'
import { getMenus } from '@/api/user'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    last_time:"",
    address:"",
    roles: [],
    menus: []//获取菜单信息
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, menus) => { //这里是新增的
    state.menus = menus
  },
  SET_ADDRESS: (state, address) => { //这里是新增的
    state.address = address
  },
  SET_TIME: (state, last_time) => { //这里是新增的
    state.last_time = last_time
  }
}

const actions = {
  getMenus({ commit, state }) { //这个是新增的action
    return new Promise((resolve, reject) => {
      getMenus(1).then(response => {  //这里的getMenus是调用request方法从服务端获得路由菜单数据的Promise，类似getInfo
        const { data } = response
          
        let menus=[];
        if (!data) {
          reject('校验失败，请重新登录')
        }
        
  

        data.forEach(element => {
          menus.push(getMenu(element))
        });
        
    console.log(menus);
    
        
        if (!menus || menus.length <= 0) {
          reject('getMenus:菜单不能是一个空数组')
        }
        
        commit('SET_MENUS', menus)
        resolve(menus)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    let loginInfo = qs.stringify(userInfo)
    return new Promise((resolve, reject) => {
      login(loginInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('校验失败，请重新登录')
        }
        console.log(data);
        
        const { roles, username, avatar ,lasttime,address} = data

        let role =[]        
        // 用户角色必须是arry数组类型
        // roles must be a object array! such as: ['admin'] or ,['developer','editor']
        if (!roles || roles.length <= 0) {
          reject('获取用户信息错误: 角色列表不能为空')
        }
        roles.forEach(role_item => {
          role.push(role_item.roleName)
        });
        commit('SET_ROLES', roles)
        commit('SET_ADDRESS',address)
        commit('SET_TIME',lasttime)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

