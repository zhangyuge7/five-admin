<script setup>
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
// 打开外链地址
function openLink(route) {
  if (route.meta?.link && !route.meta.isIframe)
    window.open(router.currentRoute.value.meta.link)
}
// 侦听路由
watchEffect(() => {
  openLink(route)
}, { immediate: true })
</script>

<template>
  <div>连接已打开</div>
</template>
