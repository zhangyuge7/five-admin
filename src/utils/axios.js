import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { localCache } from './cache'
import i18n from '@/i18n'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
})

/** 数据定义 */
export const resultProp = {
  data: 'data',
  code: 'code',
  message: 'msg',
  ok: 'ok',
}
const msgTypes = ['none', 'msg', 'box']

function getToken() {
  if (localCache.get('USER'))
    return localCache.get('USER').token || ''

  else
    return ''
}

/**
 * 添加请求拦截器
 *
 */
axiosInstance.interceptors.request.use((config) => {
  // 请求头携带token
  config.headers.Authorization = getToken()
  // 为所有请求添加时间戳参数
  config.url = `${config.url}?_t=${new Date().getTime()}`

  return config
}, (error) => {
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 *
 */
axiosInstance.interceptors.response.use((res) => {
  const { data, config } = res
  const { errorMsgType, successMsgType } = config
  if (data[resultProp.code] !== 0) {
    if (!msgTypes.includes(errorMsgType) || errorMsgType === msgTypes[1]) {
      ElMessage.error(data[resultProp.message] || i18n.global.t('http.errorMsg'))
    }
    else if (errorMsgType === msgTypes[2]) {
      ElMessageBox.confirm(
        data[resultProp.message] || i18n.global.t('http.errorMsg'),
        i18n.global.t('common.hint'),
        {
          showCancelButton: false,
          confirmButtonText: i18n.global.t('common.iKnow'),
          type: 'error',
          showClose: false,

        },
      )
    }
  }
  else {
    if (successMsgType && successMsgType === msgTypes[1]) {
      ElMessage.success(data[resultProp.message] || i18n.global.t('http.successMsg'))
    }
    else if (successMsgType && successMsgType === msgTypes[2]) {
      ElMessageBox.confirm(
        data[resultProp.message] || i18n.global.t('http.successMsg'),
        i18n.global.t('common.hint'),
        {
          showCancelButton: false,
          confirmButtonText: i18n.global.t('common.close'),
          type: 'success',
          showClose: false,

        },
      )
    }
  }
  return data
}, (err) => {
  const { response } = err
  if (response.status === 500)
    ElMessage.error(`${i18n.global.t('http.status')}: 500, ${i18n.global.t('http.error500')}`)

  else if (response.status === 404)
    ElMessage.error(`${i18n.global.t('http.status')}: 500, ${i18n.global.t('http.error404')}`)

  else ElMessage.error(`${i18n.global.t('http.status')}: ${response.status}, ${response.statusText}`)
  return Promise.reject(err)
})

export default axiosInstance
