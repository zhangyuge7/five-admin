<script setup>
import { RouterView, useRoute } from 'vue-router'
import { nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import useElementI18n from '@/hooks/useElementI18n'
import mittBus from '@/utils/mitt'

const appStore = useAppStore()

const routeStore = useRouteStore()
const { locale } = useElementI18n()
const uroute = useRoute()
const state = reactive({
  // 用来控制刷新页面
  show: true,
  // 用来强制刷新 keep 的页面（手动刷新时 keep 的页面应当刷新）
  exc: '',
})

// 刷新页面
function refresh() {
  const isInc = routeStore.keepAliveViews.includes(uroute.name)
  if (isInc)
    state.exc = uroute.name
  state.show = false
  nextTick(() => {
    state.show = true
    state.exc = ''
  })
}
onMounted(() => {
  // 监听页面刷新事件
  mittBus.on('onReloadPage', refresh)
  // 监听开发期间的热更新，保证key唯一，解决 Transition 组件与 Component 组件在热更新时的 bug
  // if (import.meta.env.MODE === 'development' && appStore.appConfig.isTransition) {
  //   import.meta.hot.on('vite:beforeUpdate', ({ type }) => {
  //     if (type === 'update' && uroute.meta.isOuter)
  //       refresh()
  //   })
  // }
})
onUnmounted(() => {
  // 关闭监听页面刷新事件
  mittBus.off('onReloadPage')
})
</script>

<template>
  <ElConfigProvider :locale="locale" :size="appStore.appConfig.elementSize">
    <RouterView v-slot="{ Component, route }">
      <Transition v-if="appStore.appConfig.isTransition && route.meta.isOuter" :name="route.meta?.transition || appStore.appConfig.transitionName" mode="out-in">
        <KeepAlive :include="routeStore.keepAliveViews" :exclude="state.exc">
          <Component :is="Component" v-if="state.show" :key="route.path" />
        </KeepAlive>
      </Transition>
      <KeepAlive v-else-if="route.meta.isOuter" :include="routeStore.keepAliveViews" :exclude="state.exc">
        <Component :is="Component" v-if="state.show" />
      </KeepAlive>
      <Component :is="Component" v-else />
    </RouterView>
  </ElConfigProvider>
</template>
