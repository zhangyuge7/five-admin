<script setup>
import { RouterView, useRoute } from 'vue-router'
import { onMounted, onUnmounted, reactive } from 'vue'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'

const appStore = useAppStore()

const routeStore = useRouteStore()

const uroute = useRoute()
const state = reactive({
  // 用来控制刷新页面
  show: true,
  // 用来强制刷新 keep 的页面（手动刷新时 keep 的页面应当刷新）
  exc: '',
  key: 0,
})

// 刷新页面
function refresh() {
  const inc = routeStore.keepAliveViews.includes(uroute.name)
  if (inc)
    state.exc = uroute.name
  state.show = false
  setTimeout(() => {
    state.show = true
    state.exc = ''
  }, 50)
}
onMounted(() => {
  // 监听页面刷新事件
  mittBus.on('onRefreshPage', refresh)
  // 监听开发期间的热更新，保证key唯一，解决 Transition 组件与 Component 组件在热更新时的 bug
  if (import.meta.env.MODE === 'development' && appStore.appConfig.isTransition) {
    import.meta.hot.on('vite:beforeUpdate', ({ type }) => {
      if (type === 'update')
        state.key++
    })
  }
})
onUnmounted(() => {
  // 关闭监听页面刷新事件
  mittBus.off('onRefreshPage')
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition v-if="appStore.appConfig.isTransition" :name="route.meta?.transition || appStore.appConfig.transitionNames" mode="out-in">
      <KeepAlive :include="routeStore.keepAliveViews" :exclude="state.exc">
        <Component :is="Component" v-if="state.show" :key="state.key" />
      </KeepAlive>
    </Transition>
    <KeepAlive v-else :include="routeStore.keepAliveViews" :exclude="state.exc">
      <Component :is="Component" v-if="state.show" />
    </KeepAlive>
  </RouterView>
</template>
