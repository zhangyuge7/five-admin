<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import SvgIcon from '@/components/SvgIcon/index.vue'

const appStore = useAppStore()
const collapseIcon = computed(() => appStore.appConfig.menuIsCollapse ? 'ep:expand' : 'ep:fold')
function setCollapse() {
  appStore.appConfig.menuIsCollapse = !appStore.appConfig.menuIsCollapse
}
</script>

<template>
  <el-icon size="24" class="cursor-pointer" @click="setCollapse">
    <SvgIcon :name="collapseIcon" />
  </el-icon>
</template>
