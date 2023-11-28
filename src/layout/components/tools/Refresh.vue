<script setup>
import { computed } from 'vue'
import mittBus from '@/utils/mitt'
import { t } from '@/i18n'
import SvgIcon from '@/components/svg-icon/index.vue'

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
        <SvgIcon name="EpRefresh" />
      </el-icon>
    </div>
  </el-tooltip>
</template>
