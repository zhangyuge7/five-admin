<script setup>
import screenfull from 'screenfull'
import { computed, ref } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { t } from '@/i18n'

const isFullscreen = ref(screenfull.isFullscreen)
const title = computed(() => isFullscreen.value ? t('tools.exitFullScreen') : t('tools.fullScreen'))
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
  <el-tooltip
    :content="title"
    placement="bottom"
  >
    <div class="tools-item" @click="clickSetting">
      <el-icon size="18">
        <SvgIcon :name="isFullscreen ? 'AntDesignFullscreenExitOutlined' : 'AntDesignFullscreenOutlined'" />
      </el-icon>
    </div>
  </el-tooltip>
</template>
