import axios from '@/utils/axios'

// 获取菜单树
export function menuTreeApi() {
  return axios.get('/system/menu')
}
