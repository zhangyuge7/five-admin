import './assets/styles/tailwind/index.css'
import './assets/styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupI18n } from './i18n'
import App from './App.vue'
import { useNprogress } from '@/utils/nprogress'
import { useDirectives } from '@/directives'

const app = createApp(App)
window.vm = app
app.use(ElementPlus)
setupStore(app)
setupI18n(app)
setupRouter(app)
useDirectives(app)
app.mount('#app')
useNprogress()
