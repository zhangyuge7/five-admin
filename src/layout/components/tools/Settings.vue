<script setup>
import { Setting } from '@element-plus/icons-vue'
import mittBus from '@/utils/mitt'

function clickSetting() {
  mittBus.emit('onShowSettingDrawer')
}
</script>

<template>
  <div class="tools-item" @click="clickSetting">
    <el-icon size="18">
      <Setting />
    </el-icon>
  </div>
</template>
