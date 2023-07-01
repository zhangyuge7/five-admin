<script setup name="Tools">
import Dark from './Dark.vue'
import Locale from './Locale.vue'
</script>

<template>
  <div class=" h-full flex">
    <Dark />
    <Locale />
  </div>
</template>

<style scoped>
.tools-item{
    @apply
    w-6
    h-full
    flex
    items-center
    justify-center
    cursor-pointer
    hover:bg-[var(--el-color-primary-light-9)]
}
</style>
