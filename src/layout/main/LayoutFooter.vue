<script setup>
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
</script>

<template>
  <div class="fv-footer">
    <span style="font-size: 12px;">
      {{ $t(appStore.appConfig.footerText) }}
    </span>
  </div>
</template>

<style scoped>
.fv-footer{
    width: 100%;
    height: var(--fv-footer-heigth);
    background-color: var(--fv-footer-bg-color);
    color:var(--fv-footer-text-color);
    @apply
    absolute
    bottom-0
    flex
    justify-center
    items-center
}
</style>
