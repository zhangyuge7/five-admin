<script setup>
import { RouterView } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const routeStore = useRouteStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta?.transition || appStore.appConfig.transitionNames" mode="out-in">
      <KeepAlive :include="routeStore.keepAliveViews">
        <Component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
