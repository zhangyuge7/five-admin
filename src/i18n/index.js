import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh_cn from './lang/zh_cn'
import zh_tw from './lang/zh_tw'
import { localCache } from '@/utils/cache'
import sysGlobalConfig from '@/config/app'

function getLocale() {
  if (localCache.get('APPCONFIG'))
    return localCache.get('APPCONFIG').appConfig.defaultLanguage || sysGlobalConfig.defaultLanguage
  return sysGlobalConfig.defaultLanguage
}
const messages = {
  'en': en,
  'zh-cn': zh_cn,
  'zh-tw': zh_tw,
}
const i18n = createI18n({
  locale: getLocale(),
  messages,
})
console.log(messages)
export function setupI18n(app) {
  app.use(i18n)
}
export default i18n
