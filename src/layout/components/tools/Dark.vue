<script setup>
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="tools-item" @click="toggleDark()">
    <el-icon size="18">
      <SvgIcon :name="isDark ? 'ep:sunny' : 'ep:moon'" />
    </el-icon>
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
