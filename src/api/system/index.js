import axios from '@/utils/axios'

/** 登录 */
export function login(data) {
  return axios.post('/login', { data }, { errorMsgType: 'box' })
}
/** 登出 */
export function logout() {
  return axios.post('/logout', {})
}
