<script setup>
import { Refresh } from '@element-plus/icons-vue'
import mittBus from '@/utils/mitt'

function reload() {
  mittBus.emit('onReloadPage')
}
</script>

<template>
  <div class="tools-item" @click="reload">
    <el-icon size="18">
      <Refresh />
    </el-icon>
  </div>
</template>
