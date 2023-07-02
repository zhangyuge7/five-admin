<script setup>
import screenfull from 'screenfull'
import { computed, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { t } from '@/i18n'

const isFullscreen = ref(screenfull.isFullscreen)
const title = computed(() => t('tools.fullScreen'))
function clickSetting() {
  if (screenfull.isEnabled)
    screenfull.toggle()
}
if (screenfull.isEnabled) {
  screenfull.on('change', () => {
    isFullscreen.value = screenfull.isFullscreen
  })
}
</script>

<template>
  <div class="tools-item" :title="title" @click="clickSetting">
    <el-icon size="18">
      <SvgIcon :name="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-fill'" />
    </el-icon>
  </div>
</template>
