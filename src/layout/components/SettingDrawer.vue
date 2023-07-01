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
// 页面切换动画效果
const transitionNames = [
  { label: '渐变', value: 'fade' },
  { label: '缩放', value: 'scale' },
  { label: '滑动', value: 'slide' },
]
</script>

<template>
  <div>
    <el-drawer
      :model-value="showSettingDrawer"
      title="应用配置"
      size="300px" class="setting-drawer"
      @close="drawerClose"
    >
      <el-divider>过渡动画</el-divider>
      <div class="setting-item">
        <span>页面切换动画</span>
        <el-switch
          v-model="appStore.appConfig.isTransition"
        />
      </div>
      <div class="setting-item">
        <span>动画效果</span>
        <el-select v-model="appStore.appConfig.transitionNames" class="select" :disabled="!appStore.appConfig.isTransition">
          <el-option
            v-for="item in transitionNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
    .select{
        width: 100px;
    }
}
</style>
