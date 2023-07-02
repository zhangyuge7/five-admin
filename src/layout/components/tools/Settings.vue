<script setup>
import { Setting } from '@element-plus/icons-vue'
import { computed } from 'vue'
import mittBus from '@/utils/mitt'
import { t } from '@/i18n'

const title = computed(() => t('tools.setting'))
function clickSetting() {
  mittBus.emit('onShowSettingDrawer')
}
</script>

<template>
  <div class="tools-item" :title="title" @click="clickSetting">
    <el-icon size="18">
      <Setting />
    </el-icon>
  </div>
</template>
