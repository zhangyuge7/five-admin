<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import router from '@/router'
import mittBus from '@/utils/mitt'

const appStore = useAppStore()

const routeStore = useRouteStore()

// 用来控制刷新页面
const show = ref(true)
// 用来强制刷新 keep 的页面（手动刷新时 keep 的页面应当刷新）
const exc = ref('')

// 刷新页面
function refresh() {
  const inc = routeStore.keepAliveViews.includes(router.currentRoute.value.name)
  if (inc)
    exc.value = router.currentRoute.value.name
  show.value = false
  setTimeout(() => {
    show.value = true
    exc.value = ''
  }, 50)
}
onMounted(() => {
  mittBus.on('onRefreshPage', refresh)
})
onUnmounted(() => {
  mittBus.off('onRefreshPage')
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta?.transition || appStore.appConfig.transitionNames" mode="out-in">
      <KeepAlive :include="routeStore.keepAliveViews" :exclude="exc">
        <Component :is="Component" v-if="show" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
