<script setup>
import { RouterView } from 'vue-router'
import { onMounted, reactive } from 'vue'
import useElementI18n from './hooks/useElementI18n'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'

const appStore = useAppStore()

const routeStore = useRouteStore()
const useApp = useAppStore()
const { locale } = useElementI18n()
const state = reactive({
  key: 0,
})
onMounted(() => {
  // 监听开发期间的热更新，保证key唯一，解决 Transition 组件与 Component 组件在热更新时的 bug
  if (import.meta.env.MODE === 'development' && appStore.appConfig.isTransition) {
    import.meta.hot.on('vite:beforeUpdate', ({ type }) => {
      if (type === 'update')
        state.key++
    })
  }
})
</script>

<template>
  <el-configProvider :locale="locale" :size="useApp.appConfig.elementSize">
    <RouterView v-slot="{ Component, route }">
      <Transition v-if="appStore.appConfig.isTransition" :name="route.meta?.transition || appStore.appConfig.transitionName" mode="out-in">
        <KeepAlive :include="routeStore.keepAliveViews">
          <Component :is="Component" :key="state.key" />
        </KeepAlive>
      </Transition>
      <KeepAlive v-else :include="routeStore.keepAliveViews">
        <Component :is="Component" />
      </KeepAlive>
    </RouterView>
  </el-configProvider>
</template>
