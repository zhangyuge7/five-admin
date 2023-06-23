<script setup>
import { RouterView } from 'vue-router'
import useElementI18n from './hooks/useElementI18n'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'

const appStore = useAppStore()

const routeStore = useRouteStore()
const useApp = useAppStore()
const { locale } = useElementI18n()
</script>

<template>
  <el-configProvider :locale="locale" :size="useApp.appConfig.elementSize">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta?.transition || appStore.appConfig.transitionNames" mode="out-in">
        <KeepAlive :include="routeStore.keepAliveViews">
          <Component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </el-configProvider>
</template>
