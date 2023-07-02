<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { computed } from 'vue'
import mittBus from '@/utils/mitt'
import { t } from '@/i18n'

function reload() {
  mittBus.emit('onReloadPage')
}
const title = computed(() => t('tools.refresh'))
</script>

<template>
  <div class="tools-item" :title="title" @click="reload">
    <el-icon size="18">
      <Refresh />
    </el-icon>
  </div>
</template>
