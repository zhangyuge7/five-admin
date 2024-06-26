import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FiveNProgress } from '@/utils/nprogress'
import { useRouteStore } from '@/stores/modules/route'
import { t } from '@/i18n'

import router from '@/router'
import useAuth from '@/hooks/useAuth'

const timeout = import.meta.env.VITE_API_TIMEOUT
// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: timeout ? Number.parseInt(timeout) : 0,
})

// 定义成功响应码
export const successCode = 0
// 响应结果数据定义
export const resultProp = {
  data: 'data',
  code: 'code',
  message: 'message',
  ok: 'ok',
}
// 响应后消息提示类型
export const msgType = {
  none: 'none',
  msg: 'msg',
  box: 'box',
}

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuth()
  FiveNProgress.start() // 请求进度条开始
  // 请求头携带token
  config.headers.Authorization = token
  // 为所有请求添加时间戳参数
  config.url = `${config.url}?_t=${new Date().getTime()}`

  return config
}, (error) => {
  FiveNProgress.done() // 请求进度条结束
  return Promise.reject(error)
})

// 响应拦截器
axiosInstance.interceptors.response.use((res) => {
  const routeStore = useRouteStore()
  const { setToken } = useAuth()
  const { data, config } = res
  // 获取请求时配置的成功消息提示类型与错误消息提示类型
  const { errorMsgType, successMsgType } = config
  const code = data[resultProp.code]
  // 业务异常响应时
  if (code !== successCode) {
    errorMessageAlert(data[resultProp.message] || t('http.error'), errorMsgType)
    switch (code) {
      case 401:
        setToken()
        routeStore.$reset()
        router.push('/login')
        break
    }
  }
  // 正常响应时
  else {
    successMessageAlert(data[resultProp.message] || t('http.success'), successMsgType)
  }
  FiveNProgress.done() // 请求进度条结束
  return data
}, (err) => {
  if (!err.response)
    return Promise.reject(err)

  const routeStore = useRouteStore()
  const { setToken } = useAuth()
  const { status, statusText, data } = err.response
  let i18nMsg = data[resultProp.message]
  switch (status) {
    case 401:
      i18nMsg = i18nMsg || t('http.error401')
      setToken()
      routeStore.$reset()
      router.push('/login')
      break
    case 403:
      i18nMsg = i18nMsg || t('http.error403')
      break
    case 500:
      i18nMsg = i18nMsg || t('http.error500')
      break
    case 404:
      i18nMsg = i18nMsg || t('http.error404')
      break
    default:
      i18nMsg = i18nMsg || statusText
  }
  ElMessage.error(i18nMsg)
  FiveNProgress.done()
  return Promise.reject(err)
})

// 错误消息提示
function errorMessageAlert(message, messageType) {
  if (!messageType || !Object.keys(msgType).includes(messageType) || messageType === msgType.msg) {
    ElMessage.error(message)
  }
  else if (messageType === msgType.box) {
    ElMessageBox.confirm(
      message,
      t('messageBox.hint'),
      {
        showCancelButton: false,
        confirmButtonText: t('messageBox.iKnow'),
        type: 'error',
        showClose: false,
        lockScroll: false,
      },
    )
  }
}

// 成功消息提示
function successMessageAlert(message, messageType) {
  if (messageType && messageType === msgType.msg) {
    ElMessage.success(message)
  }
  else if (messageType && messageType === msgType.box) {
    ElMessageBox.confirm(
      message,
      t('messageBox.hint'),
      {
        showCancelButton: false,
        confirmButtonText: t('messageBox.close'),
        type: 'success',
        showClose: false,
        lockScroll: false,
      },
    )
  }
}

export default axiosInstance
