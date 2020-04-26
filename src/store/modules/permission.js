import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import Layout from '@/layout'
import {routerMap} from '@/utils/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {

  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role.roleName))
  } else {
    return true
  }
}

//请求的数组转路由
function dataArrayToRoutes(data) {
  const res = []
  data.forEach(item => {
    const tmp = {
      ...item
    }  
    if (tmp.component === 'Layout') {
      tmp.component = Layout
      //最前面的组件必须加/ 这里数据库没有存储
      tmp.path="/"+tmp.path
    } else {
      let sub_view = tmp.component
      sub_view = sub_view.replace(/^\/*/g, '')
      // "babel-eslint": "8.2.6" 这个版本才行
      tmp.component = routerMap[sub_view];
    }
    if (tmp.children) {
      tmp.children = dataArrayToRoutes(tmp.children)
    }
    res.push(tmp)
  })
  //最后放入404界面 这个404必须是最后！！！
  res.push({ path: '*', redirect: '/404', hidden: true })
  return res

}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, {
    roles,
    menus
  }) {
    return new Promise(resolve => {
      let accessedRoutes
 
      accessedRoutes = dataArrayToRoutes(menus)

      accessedRoutes = filterAsyncRoutes(accessedRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
