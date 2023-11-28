import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import { getMenuList } from '@/api/menu'
const viewsModules = import.meta.glob( '/src/views/*/*.vue' )
const layoutModules = import.meta.glob( '/src/layout/*.vue' )

/**
 * 使用meta.role来确定当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission( roles, route ) {
  if ( route.meta && route.meta.roles ) {
    return roles.some( role => route.meta.roles.includes( role ) )
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes( routes, roles ) {
  const res = []

  routes.forEach( route => {
    const tmp = { ...route }
    if ( hasPermission( roles, tmp ) ) {
      if ( tmp.children ) {
        tmp.children = filterAsyncRoutes( tmp.children, roles )
      }
      res.push( tmp )
    }
  } )

  return res
}

// 将路由组件转换为函数
export function convertComponentToFunction( route ) {
  // route.component = () => import( /* @vite-ignore */ `./views/map/${route.component_path}.vue` )
  if ( route.component_path.includes( 'views' ) ) {
    route.component = viewsModules[`/src${route.component_path}`]
  } else if ( route.component_path === 'Layout' ) {
    // 这个地方写死了，如果后台返回的字符串是 Layout，那么就是使用 src/layout/index.vue
    // 将来可能还会有其他的布局，比如 src/layout2/index.vue，到时就得改动这个地方
    route.component = layoutModules[`/src/layout/index.vue`]
  }
  // 递归处理子路由
  if ( route.children && route.children.length > 0 ) {
    route.children.forEach( convertComponentToFunction )
  }
}

const usePermissionStore = defineStore( {
  id : 'permission',
  state : () => {
    return {
      routes : [],
      addRoutes : [],
      directivePermission : []
    }
  },
  actions : {
    async SET_ROUTES( roles ) {
      try {
        const response = await getMenuList()
        const asyncRoutesFromBackend = response.data.results // 假设从后台获取的路由数据在 response.data 中
        // 追加从后台获取到的路由到本地路由
        asyncRoutesFromBackend.forEach( route => {
          convertComponentToFunction( route )
        } )
        asyncRoutes.splice( asyncRoutes.length - 1, 0, ...asyncRoutesFromBackend )
        let accessedRoutes = asyncRoutes
        console.log( 'accessedRoutes', accessedRoutes )
        if ( !roles.includes( 'admin' ) ) {
          // 如果用户角色不是 admin，则需要根据角色做筛选处理
          accessedRoutes = filterAsyncRoutes( asyncRoutesFromBackend, roles )
        }

        // 将404页面放在路由最后，不然动态路由刷新会报404
        accessedRoutes = accessedRoutes.concat( [
          {
            path : '/:pathMatch(.*)',
            redirect : '/404',
            name : 'Redirect404',
            meta : {
              title : '404',
              hidden : true
            }
          }
        ] )
        // console.log( 'this.addRoutes', this.addRoutes )
        this.routes = constantRoutes.concat( accessedRoutes ).concat()
        console.log( 'this.routes', this.routes )

        return accessedRoutes
      } catch ( error ) {
        // 处理获取路由失败的情况
        console.error( 'Failed to fetch routes from the backend:', error )
        throw error
      }
    },
    SET_DIRECTIVE_ROLE( roles ) {
      this.directivePermission = roles
    }
  }
} )

export default usePermissionStore
