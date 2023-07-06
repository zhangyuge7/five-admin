<script setup name="Tools">
import Dark from './Dark.vue'
import Locale from './Locale.vue'
import Settings from './Settings.vue'
import ElSize from './ElSize.vue'
import FullScreen from './FullScreen.vue'
import Refresh from './Refresh.vue'
</script>

<template>
  <div class=" h-full flex">
    <Refresh />
    <Dark />
    <FullScreen />
    <ElSize />
    <Locale />
    <Settings />
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
    hover:bg-[var(--el-color-primary-light-9)]
}
</style>
