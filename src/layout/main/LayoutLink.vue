<script setup>
import { watch } from 'vue'
import router from '@/router'

// 打开外链地址
function openLink(route) {
  if (route.meta?.link && !route.meta.isIframe)
    window.open(router.currentRoute.value.meta.link)
}
// 侦听路由
watch(router.currentRoute, (val) => {
  openLink(val)
}, { immediate: true })
</script>

<template>
  <div>外链已打开</div>
</template>
