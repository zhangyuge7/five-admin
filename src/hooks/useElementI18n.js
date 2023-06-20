import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export default function useElementI18n() {
  const useApp = useAppStore()
  const locale = computed(() => {
    return useApp.appConfig.defaultLanguage === 'zh-cn' ? zhCn : useApp.appConfig.defaultLanguage === 'zh-tw' ? zhTw : en
  })
  return { locale }
}
