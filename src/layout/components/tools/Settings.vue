<script setup>
import { computed } from 'vue'
import mittBus from '@/utils/mitt'
import { t } from '@/i18n'
import SvgIcon from '@/components/SvgIcon/index.vue'

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
        <SvgIcon name="ant-design:setting-outlined" />
      </el-icon>
    </div>
  </el-tooltip>
</template>
