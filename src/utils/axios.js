import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { done, start } from '@/utils/nprogress'
import i18n from '@/i18n'

import { useUserStore } from '@/stores/modules/user'
import router from '@/router'

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
export const msgTypes = {
  none: 'node',
  msg: 'msg',
  box: 'box',
}

/**
 * 添加请求拦截器
 *
 */
axiosInstance.interceptors.request.use((config) => {
  start()

  const useUser = useUserStore()
  // 请求头携带token
  config.headers.Authorization = useUser.token
  // 为所有请求添加时间戳参数
  config.url = `${config.url}?_t=${new Date().getTime()}`

  return config
}, (error) => {
  done()
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 *
 */
axiosInstance.interceptors.response.use((res) => {
  const useUser = useUserStore()
  const { data, config } = res
  const { errorMsgType, successMsgType } = config
  if (data[resultProp.code] !== 0) {
    if (!errorMsgType || !Object.keys(msgTypes).includes(errorMsgType) || errorMsgType === msgTypes.msg) {
      ElMessage.error(data[resultProp.message] || i18n.global.t('http.errorMsg'))
    }
    else if (errorMsgType === msgTypes.box) {
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
    switch (data[resultProp.code]) {
      case 401:
        useUser.token = ''
        router.push('/login')
        break
    }
  }
  else {
    if (successMsgType && successMsgType === msgTypes.msg) {
      ElMessage.success(data[resultProp.message] || i18n.global.t('http.successMsg'))
    }
    else if (successMsgType && successMsgType === msgTypes.box) {
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
  done()
  return data
}, (err) => {
  const { status, statusText } = err.response
  let i18nMsg = ''
  switch (status) {
    case 401:
      i18nMsg = i18n.global.t('http.error401')
      break
    case 403:
      i18nMsg = i18n.global.t('http.error403')
      break
    case 500:
      i18nMsg = i18n.global.t('http.error500')
      break
    case 404:
      i18nMsg = i18n.global.t('http.error404')
      break
    default:
      i18nMsg = statusText
  }
  ElMessage.error(i18nMsg)
  done()
  return Promise.reject(err)
})
export default axiosInstance
