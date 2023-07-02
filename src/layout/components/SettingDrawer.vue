<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'
import { getCssVal, setCssVal } from '@/utils/domUtils'

const appStore = useAppStore()
// 响应式数据定义
const state = reactive({
  showSettingDrawer: false, // 控制显示抽屉
  size: 'default', // 组件尺寸
  menuWidth: 0, // 侧栏菜单宽度

})
// 页面切换动画效果
const transitionNames = [
  { label: '渐变', value: 'fade' },
  { label: '缩放', value: 'scale' },
  { label: '滑动', value: 'slide' },
]

// 提示
const alert = '以上配置只支持预览，不具备持久化，刷新浏览器后恢复默认状态。不是实现不了，就是懒得做。配置可以在源码的 src/config/app.js 文件中做永久修改。样式配置在 src/assets/styles/common/theme.scss 文件中修改'

const methods = {
  // 抽屉关闭时
  drawerClose() {
    state.showSettingDrawer = false
  },
  // 初始化数据
  initState() {
  // 获取侧栏菜单宽度
    const menuWidth = getCssVal('--fv-menu-width')
    state.menuWidth = Number.parseInt(menuWidth.substring(0, menuWidth.lastIndexOf('px')))
  },
  // 设置侧栏菜单宽度
  setMenuWidth(v) {
    setCssVal('--fv-menu-width', `${v}px`)
  },

}

onMounted(() => {
  // 初始化数据
  methods.initState()
  // 监听事件打开抽屉
  mittBus.on('onShowSettingDrawer', () => {
    state.showSettingDrawer = true
  })
})
onUnmounted(() => {
  mittBus.off('onShowSettingDrawer')
})
</script>

<template>
  <div>
    <el-drawer
      :model-value="state.showSettingDrawer"
      title="应用配置"
      size="300px" class="setting-drawer"

      @close="methods.drawerClose"
    >
      <el-scrollbar class=" pr-4">
        <el-divider :size="state.size">
          侧栏菜单
        </el-divider>
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
            只保持一个子菜单展开
          </el-text>
          <el-switch
            v-model="appStore.appConfig.subMenuUniqueOpened"
            :disabled="appStore.appConfig.menuIsCollapse"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            侧栏菜单宽度
          </el-text>
          <el-input-number :model-value="state.menuWidth" controls-position="right" @change="methods.setMenuWidth" />
        </div>

        <el-divider :size="state.size">
          tabs 标签页
        </el-divider>
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
            始终固定一个 tab
          </el-text>
          <el-switch
            v-model="appStore.appConfig.tabsOneFiexd"
            :disabled="!appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>

        <el-divider :size="state.size">
          过渡动画
        </el-divider>
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

        <el-divider :size="state.size">
          其它设置
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            开启主界面回到顶部
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableBacktop"
            :size="state.size"
          />
        </div>

        <el-divider :size="state.size">
          提示
        </el-divider>
        <el-alert :title="alert" type="warning" :closable="false" />
      </el-scrollbar>
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
        width: 85px;
    }
    .el-drawer__body{
      padding-right: 0;
    }
    .el-input-number{
      width: 85px;
    }
}
</style>
