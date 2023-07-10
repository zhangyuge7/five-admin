/**
 * 工具箱
 */

import mittBus from '@/utils/mitt'
import { addClass, hasClass, removeClass } from '@/utils/domUtils'

// 复制文本
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch (e) {
    return false
  }
}

// 刷新页面
export function refreshPage() {
  mittBus.emit('onReloadPage')
}

// 设置全局灰色风格
export function setGray() {
  const el = document.documentElement
  const val = 'gray'
  !hasClass(el, val) && addClass(el, val)
}
// 取消全局灰色风格
export function cancelGray() {
  const el = document.documentElement
  const val = 'gray'
  hasClass(el, val) && removeClass(el, val)
}
// 判断是否为全局灰色风格
export function isGray() {
  const el = document.documentElement
  const val = 'gray'
  return hasClass(el, val)
}
