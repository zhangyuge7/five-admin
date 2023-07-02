<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'

const state = reactive({
  showSettingDrawer: false,
  size: 'default',
})
onMounted(() => {
  // 监听事件打开抽屉
  mittBus.on('onShowSettingDrawer', () => {
    state.showSettingDrawer = true
  })
})
onUnmounted(() => {
  mittBus.off('onShowSettingDrawer')
})

const appStore = useAppStore()

// 抽屉关闭时
function drawerClose() {
  state.showSettingDrawer = false
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
      :model-value="state.showSettingDrawer"
      title="应用配置"
      size="300px" class="setting-drawer"
      @close="drawerClose"
    >
      <el-divider>侧栏菜单</el-divider>
      <div class="setting-item">
        <el-text :size="state.size">
          侧栏菜单是否折叠
        </el-text>
        <el-switch
          v-model="appStore.appConfig.menuIsCollapse"
          :size="state.size"
        />
      </div>
      <div class="setting-item">
        <el-text :size="state.size">
          是否只保持一个子菜单的展开
        </el-text>
        <el-switch
          v-model="appStore.appConfig.subMenuUniqueOpened"
          :disabled="appStore.appConfig.menuIsCollapse"
          :size="state.size"
        />
      </div>

      <el-divider>tabs 标签页</el-divider>
      <div class="setting-item">
        <el-text :size="state.size">
          开启多标签页
        </el-text>
        <el-switch
          v-model="appStore.appConfig.isTabs"
          :size="state.size"
        />
      </div>
      <div class="setting-item">
        <el-text :size="state.size">
          多标签页图标
        </el-text>
        <el-switch
          v-model="appStore.appConfig.tabsIcon"
          :disabled="!appStore.appConfig.isTabs"
          :size="state.size"
        />
      </div>
      <div class="setting-item">
        <el-text :size="state.size">
          始终保持一个 tab 固定不可关闭
        </el-text>
        <el-switch
          v-model="appStore.appConfig.tabsOneFiexd"
          :disabled="!appStore.appConfig.isTabs"
          :size="state.size"
        />
      </div>

      <el-divider>过渡动画</el-divider>
      <div class="setting-item">
        <el-text :size="state.size">
          页面切换动画
        </el-text>
        <el-switch
          v-model="appStore.appConfig.isTransition"
          :size="state.size"
        />
      </div>
      <div class="setting-item">
        <el-text :size="state.size">
          动画效果
        </el-text>
        <el-select v-model="appStore.appConfig.transitionNames" :size="state.size" class="select" :disabled="!appStore.appConfig.isTransition">
          <el-option
            v-for="item in transitionNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-divider>其它设置</el-divider>
      <div class="setting-item">
        <el-text :size="state.size">
          开启主界面回到顶部
        </el-text>
        <el-switch
          v-model="appStore.appConfig.enableBacktop"
          :size="state.size"
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
    .select{
        width: 80px;
    }
}
</style>
