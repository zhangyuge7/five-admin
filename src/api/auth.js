import axios from '@/utils/axios'

// 登录
export function loginApi(data) {
  return axios.post('/login', { data }, { errorMsgType: 'box' })
}
// 用户信息
export function userInfoApi() {
  return axios.get('/getUserInfo')
}
// 用户信息
export function menuListApi() {
  return axios.get('/getMenuList')
}
// 登出
export function logoutApi() {
  return axios.post('/logout', {})
}
