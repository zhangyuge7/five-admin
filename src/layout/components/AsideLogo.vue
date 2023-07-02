<script setup>
import { shallowRef, watch } from 'vue'
import { useAppStore } from '@/stores/modules/app'

// 标题
const title = import.meta.env.VITE_APP_TITLE
const appStore = useAppStore()
// 是否显示标题
const showTitle = shallowRef(!appStore.appConfig.menuIsCollapse)
// 侦听侧栏菜单是否为折叠状态，如果折叠，标题隐藏，否则延时显示
watch(() => appStore.appConfig.menuIsCollapse, (val) => {
  if (val) {
    showTitle.value = false
  }
  else {
    setTimeout(() => {
      showTitle.value = true
    }, 300)
  }
})
</script>

<template>
  <div class="flex flex-row aside-logo">
    <img src="../../assets/images/logo.svg" class=" w-[32px]">
    <span v-if="showTitle" class="title">{{ title }}</span>
  </div>
</template>

<style scoped>
.title{
    margin-left: 10px;
    font-size: 24px;

}
.aside-logo{
  padding-left: 15px;
  max-width: var(--fv-menu-width);
  overflow-x: hidden;
}
</style>
