import { createI18n } from 'vue-i18n'
import sysGlobalConfig from '@/appConfig'
import { localCache } from '@/utils/cache'

// 定义多语言文本
const messages = {
  'en': {},
  'zh-cn': {},
  'zh-tw': {},
}
// 导入框架自带语言文本
const langs = import.meta.glob('./lang/*.js', {
  import: 'default',
  eager: true,
})
// 导入页面语言文本
const pages = import.meta.glob('./pages/**/*.js', {
  import: 'default',
  eager: true,
})
// 全部加载
const modules = { ...langs, ...pages }
Object.keys(modules).forEach((key) => {
  const obj = modules[key]
  const locale = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.js'))
  messages[locale] = { ...messages[locale], ...obj }
})
// 获取默认语言
function getLocale() {
  if (localCache.get('APPCONFIG'))
    return localCache.get('APPCONFIG').appConfig.defaultLanguage || sysGlobalConfig.defaultLanguage
  return sysGlobalConfig.defaultLanguage
}
// 翻译文件中不存在该键时的警告处理
function warnHandler(missingKey, vm, locale, missing) {
  // console.warn(`${vm}`)
}
// 创建 i18n
const i18n = createI18n({
  missing: warnHandler,
  silentFallbackWarn: true,
  locale: getLocale(),
  messages,
})
// 挂载到应用
export function setupI18n(app) {
  app.use(i18n)
}
// 方便在代码中使用翻译函数
export function t(key) {
  return i18n.global.t(key)
}
export default i18n
