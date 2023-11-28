import http from '@/utils/request'

export function getMenuList( data ) {
  return http.request( {
    method : 'get',
    url : '/v1/system/menu/',
    data
  } )
}
