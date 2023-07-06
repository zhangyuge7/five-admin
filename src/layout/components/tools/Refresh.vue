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
  <el-tooltip
    :content="title"
    placement="bottom"
  >
    <div class="tools-item" @click="reload">
      <el-icon size="18">
        <Refresh />
      </el-icon>
    </div>
  </el-tooltip>
</template>
