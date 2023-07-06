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
  <el-tooltip
    :content="title"
    placement="bottom"
  >
    <div class="tools-item" @click="clickSetting">
      <el-icon size="18">
        <Setting />
      </el-icon>
    </div>
  </el-tooltip>
</template>
