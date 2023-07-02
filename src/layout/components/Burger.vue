<script setup>
import { computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)
function setCollapse() {
  appStore.appConfig.menuIsCollapse = !appStore.appConfig.menuIsCollapse
}
</script>

<template>
  <div class="fv-burger" @click="setCollapse">
    <el-icon size="20">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
  </div>
</template>

<style scoped>
.fv-burger{
  width:30px;
  @apply
  cursor-pointer
  h-full
  flex
  justify-center
  items-center
  hover:bg-[var(--el-color-primary-light-9)]
}
</style>
