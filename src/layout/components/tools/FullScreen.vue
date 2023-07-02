<script setup>
import screenfull from 'screenfull'
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const isFullscreen = ref(screenfull.isFullscreen)
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
  <div class="tools-item" @click="clickSetting">
    <el-icon size="18">
      <SvgIcon :name="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-fill'" />
    </el-icon>
  </div>
</template>
