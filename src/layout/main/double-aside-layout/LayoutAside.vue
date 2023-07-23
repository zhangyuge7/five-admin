<script setup>
import { ref } from 'vue'
import SubMenu from './menu/SubMenu.vue'
import MainMenu from './menu/MainMenu.vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const scrollbar = ref()
// 手动更新滚动条
function subMenuChange() {
  setTimeout(() => {
    scrollbar.value.update()
  }, 300)
}
</script>

<template>
  <div class="fv-aside">
    <div v-if="appStore.appConfig.showLogo" class="flex items-center shrink-0 fv-aside-logo">
      <AsideLogo />
    </div>
    <div class="flex flex-1 shrink-0 fv-menu-double-side" style="height: calc(100% - var(--fv-header-height));">
      <el-scrollbar class="fv-main-menu">
        <MainMenu />
      </el-scrollbar>
      <el-scrollbar ref="scrollbar" class="fv-sub-menu">
        <SubMenu @sub-menu-open="subMenuChange" @sub-menu-close="subMenuChange" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.fv-aside-logo{
  height: var(--fv-header-height);
  background-color: var(--fv-logo-bg-color);
}
.fv-aside{
  background-color: var(--el-menu-bg-color);
  @apply
  flex  h-full flex-col
}
.fv-main-menu{
  border-right: 1px solid rgba(21, 20, 26,0.3);
}
.fv-sub-menu{
  /* border-right: 1px solid var(--el-border-color); */
}
.fv-menu-double-side{
  background-color: var(--fv-side-bg-color);
}
.fv-menu-double-side .el-menu{
  background-color: transparent;
}
</style>
