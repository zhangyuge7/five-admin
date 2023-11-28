<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import SvgIcon from '@/components/svg-icon/index.vue'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)
function setCollapse() {
  appStore.appConfig.menuIsCollapse = !appStore.appConfig.menuIsCollapse
}
</script>

<template>
  <div class="fv-burger" @click="setCollapse">
    <el-icon size="20">
      <SvgIcon :name="isCollapse ? 'LineMdMenuUnfoldRight' : 'LineMdMenuUnfoldLeft'" />
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
  hover:bg-[var(--fv-tools-hover-bg-color)]
}
</style>
