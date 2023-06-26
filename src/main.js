import './assets/styles/tailwind/index.css'
import './assets/styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupI18n } from './i18n'
import App from './App.vue'
import { setupDirectives } from '@/directives'

const app = createApp(App)
window.vm = app
app.use(ElementPlus) // element-plus 组件库
setupStore(app) // pinia 仓库
setupI18n(app) // 国际化多语言
setupRouter(app) // 路由器
setupDirectives(app) // 自定义指定
app.mount('#app')
