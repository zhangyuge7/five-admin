<script setup>
import { ref, watch } from 'vue'
import router from '@/router'

const linkSrc = ref('')

// 侦听路由
watch(router.currentRoute, (val) => {
  linkSrc.value = val.meta?.link
}, { immediate: true })
</script>

<template>
  <div class="w-full h-full">
    <iframe :src="linkSrc" class="w-full h-full" />
  </div>
</template>
