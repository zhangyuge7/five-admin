<script setup name="Tools">
import { defineAsyncComponent } from 'vue'

const isDev = import.meta.env.MODE === 'development'

const Dark = defineAsyncComponent(() => import('./Dark.vue'))
const Locale = defineAsyncComponent(() => import('./Locale.vue'))
const Settings = isDev && defineAsyncComponent(() => import('./Settings.vue'))
const ElSize = defineAsyncComponent(() => import('./ElSize.vue'))
const FullScreen = defineAsyncComponent(() => import('./FullScreen.vue'))
const Refresh = defineAsyncComponent(() => import('./Refresh.vue'))
</script>

<template>
  <div class=" h-full flex">
    <Refresh />
    <Dark />
    <FullScreen />
    <ElSize />
    <Locale />
    <Settings v-if="isDev" />
  </div>
</template>

<style scoped>
:deep(.tools-item){
    @apply
    w-7
    h-full
    flex
    items-center
    justify-center
    cursor-pointer
    hover:bg-[var(--fv-tools-hover-bg-color)]
}
</style>
