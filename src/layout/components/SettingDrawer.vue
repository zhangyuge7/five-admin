<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'

const showSettingDrawer = ref(false)
onMounted(() => {
  // 监听事件打开抽屉
  mittBus.on('onShowSettingDrawer', () => {
    showSettingDrawer.value = true
  })
})
onUnmounted(() => {
  mittBus.off('onShowSettingDrawer')
})

const appStore = useAppStore()

// 抽屉关闭时
function drawerClose() {
  showSettingDrawer.value = false
}
</script>

<template>
  <div>
    <el-drawer
      :model-value="showSettingDrawer"
      title="应用配置"
      size="300px" class="setting-drawer"
      @close="drawerClose"
    >
      <el-divider>侧栏菜单</el-divider>
      <div class="setting-item">
        <span>启用页面切换动画</span>
        <el-switch
          v-model="appStore.appConfig.isTransition"
        />
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss">
.setting-drawer {
    .el-drawer__header {
        margin-bottom: 0;
    }
    .setting-item{
        display: flex;
        justify-content: space-between;
    }
}
</style>
