<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'
import { getCssVal, setCssVal } from '@/utils/domUtils'
import { setPrimaryColor } from '@/utils/theme'

const appStore = useAppStore()

// 页面切换动画效果
const transitionNames = [
  { label: '渐变', value: 'fade' },
  { label: '缩放', value: 'scale' },
  { label: '滑动', value: 'slide' },
]
// tabs 风格
const tabsTypes = [
  { label: '风格一', value: 'card' },
  { label: '风格二', value: 'border-card' },
  { label: '风格三', value: '' },
]
// 布局
const layoutTypes = [
  { label: '默认', value: 'default' },
  { label: '单侧栏(经典)', value: 'singleAside' },
  { label: '双侧栏', value: 'doubleAside' },
  { label: '横向上下布局', value: 'crosswise' },
  { label: '混合导航布局', value: 'mixture' },
]

// 提示
const alert = '以上配置只支持预览，不具备持久化，刷新浏览器后恢复默认状态。配置可以在源码的 src/config/app.js 文件中做永久修改。样式配置在 src/assets/styles/common/theme.scss 文件中修改'

// 响应式数据定义
const state = reactive({
  showSettingDrawer: false, // 控制显示抽屉
  size: 'default', // 当前组件的子组件尺寸
  menuWidth: 0, // 侧栏菜单宽度
  menuItemHeight: 0, // 侧栏菜单项高度
  mainMenuWidth: 0, // 侧栏主菜单宽度

  footerHeight: 0, // 页脚高度
  footerBgColor: '', // 页脚背景颜色
  footerTextColor: '', // 页脚文本颜色

  headerHeight: 0, // 顶栏高度
  headerBgColor: '', // 顶栏背景颜色
  headerTextColor: '', // 顶栏文本颜色

  sideBgColor: '', // 侧栏背景颜色

  menuTextColor: '', // 菜单内容颜色
  menuHoverBgColor: '', // 菜单鼠标移入背景颜色
  menuActiveColor: '', // 菜单选中文本颜色
  menuInlineColor: '', // 子菜单展开背景颜色

  logoBgColor: '', // LOGO背景
  logoTitleColor: '', // LOGO标题颜色

  tabsHeight: 0, // tabs高度

  primaryColor: '', // primary颜色
})

// 方法定义
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
    // 获取侧栏菜单项高度
    const menuItemHeight = getCssVal('--fv-menu-item-height')
    state.menuItemHeight = Number.parseInt(menuItemHeight.substring(0, menuItemHeight.lastIndexOf('px')))
    // 获取侧栏主菜单宽度
    const mainMenuWidth = getCssVal('--fv-main-menu-width')
    state.mainMenuWidth = Number.parseInt(mainMenuWidth.substring(0, mainMenuWidth.lastIndexOf('px')))

    // 获取页脚背景颜色
    state.footerBgColor = getCssVal('--fv-footer-bg-color')
    // 获取页脚文本颜色
    state.footerTextColor = getCssVal('--fv-footer-text-color')
    // 获取页脚高度
    const footerHeight = getCssVal('--fv-footer-heigth')
    state.footerHeight = Number.parseInt(footerHeight.substring(0, footerHeight.lastIndexOf('px')))

    // 获取顶栏背景颜色
    state.headerBgColor = getCssVal('--fv-header-bg-color')
    // 获取顶栏文本颜色
    state.headerTextColor = getCssVal('--fv-header-text-color')
    // 获取顶栏高度
    const headerHeight = getCssVal('--fv-header-height')
    state.headerHeight = Number.parseInt(headerHeight.substring(0, headerHeight.lastIndexOf('px')))

    // 获取侧栏背景颜色
    state.sideBgColor = getCssVal('--fv-side-bg-color')

    // 获取菜单内容颜色
    state.menuTextColor = getCssVal('--fv-menu-text-color')
    // 获取菜单鼠标移入背景颜色
    state.menuHoverBgColor = getCssVal('--fv-menu-hover-bg-color')
    // 获取菜单选中文本颜色
    state.menuActiveColor = getCssVal('--fv-menu-active-color')
    // 获取菜单选中文本颜色
    state.menuInlineColor = getCssVal('--fv-menu-inline-bg-color')

    // 获取logo背景颜色
    state.logoBgColor = getCssVal('--fv-logo-bg-color')
    // 获取logo标题颜色
    state.logoTitleColor = getCssVal('--fv-logo-title-color')

    // 获取tabs高度
    const tabsHeight = getCssVal('--fv-tabs-height')
    state.tabsHeight = Number.parseInt(tabsHeight.substring(0, tabsHeight.lastIndexOf('px')))

    // 获取菜单选中文本颜色
    state.primaryColor = getCssVal('--el-color-primary')
  },

  // 修改尺寸
  updateSizeCssValue(v, cssKey) {
    cssKey && setCssVal(cssKey, `${v}px`)
  },
  // 修改颜色
  updateColorCssValue(v, cssKey) {
    cssKey && setCssVal(cssKey, v)
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
          布局配置
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            布局
          </el-text>
          <el-select v-model="appStore.appConfig.layoutType" :size="state.size" class="select">
            <el-option
              v-for="item in layoutTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <el-divider :size="state.size">
          主题
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            primary
          </el-text>
          <el-color-picker
            v-model="state.primaryColor"
            :size="state.size"
            @change="setPrimaryColor($event)"
          />
        </div>
        <el-divider :size="state.size">
          LOGO
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            显示logo
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showLogo"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            logo背景
          </el-text>
          <el-color-picker
            v-model="state.logoBgColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showLogo"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-logo-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            标题颜色
          </el-text>
          <el-color-picker
            v-model="state.logoTitleColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showLogo"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-logo-title-color')"
          />
        </div>
        <el-divider :size="state.size">
          顶栏配置
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            顶栏背景
          </el-text>
          <el-color-picker
            v-model="state.headerBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-header-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            顶栏文本
          </el-text>
          <el-color-picker
            v-model="state.headerTextColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-header-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            顶栏高度
          </el-text>
          <el-input-number
            :model-value="state.headerHeight"
            :size="state.size"
            controls-position="right"
            @change="methods.updateSizeCssValue($event, '--fv-header-height')"
          />
        </div>

        <el-divider :size="state.size">
          侧栏配置
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            是否折叠
          </el-text>
          <el-switch
            v-model="appStore.appConfig.menuIsCollapse"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            折叠动画
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableCollapseTransition"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            主栏标题
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isMainMenuShowTitle"
            :disabled="appStore.appConfig.layoutType !== 'doubleAside'"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            侧栏背景
          </el-text>
          <el-color-picker
            v-model="state.sideBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-side-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            侧栏宽度
          </el-text>
          <el-input-number
            :model-value="state.menuWidth"
            :size="state.size"
            controls-position="right"
            :disabled="appStore.appConfig.menuIsCollapse || appStore.appConfig.layoutType === 'crosswise'"
            @change="methods.updateSizeCssValue($event, '--fv-menu-width')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            主栏宽度
          </el-text>
          <el-input-number
            :model-value="state.mainMenuWidth"
            :size="state.size"
            controls-position="right"
            :disabled="appStore.appConfig.layoutType !== 'doubleAside'"
            @change="methods.updateSizeCssValue($event, '--fv-main-menu-width')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            内容高度
          </el-text>
          <el-input-number
            :model-value="state.menuItemHeight"
            :size="state.size"
            controls-position="right"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
            @change="methods.updateSizeCssValue($event, '--fv-menu-item-height')"
          />
        </div>
        <el-divider :size="state.size">
          菜单
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            仅开一个
          </el-text>
          <el-switch
            v-model="appStore.appConfig.subMenuUniqueOpened"
            :disabled="appStore.appConfig.menuIsCollapse || appStore.appConfig.layoutType === 'crosswise'"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            菜单内容
          </el-text>
          <el-color-picker
            v-model="state.menuTextColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            移入背景
          </el-text>
          <el-color-picker
            v-model="state.menuHoverBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-hover-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            激活内容
          </el-text>
          <el-color-picker
            v-model="state.menuActiveColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-active-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            展开背景
          </el-text>
          <el-color-picker
            v-model="state.menuInlineColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-inline-bg-color')"
          />
        </div>
        <el-divider :size="state.size">
          tabs 标签页
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            开启
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            显示图标
          </el-text>
          <el-switch
            v-model="appStore.appConfig.tabsIcon"
            :disabled="!appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            <el-tooltip
              content="当所有路由的 meta.fixedTab 不为 true 时，始终保持有一个 tab 不可关闭"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            固定唯一
          </el-text>

          <el-switch
            v-model="appStore.appConfig.tabsOneFiexd"
            :disabled="!appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            tabs风格
          </el-text>
          <el-select v-model="appStore.appConfig.tabsType" :size="state.size" class="select" :disabled="!appStore.appConfig.isTabs">
            <el-option
              v-for="item in tabsTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            高度
          </el-text>
          <el-input-number
            :model-value="state.tabsHeight"
            :size="state.size"
            controls-position="right"
            :disabled="!appStore.appConfig.isTabs"
            @change="methods.updateSizeCssValue($event, '--fv-tabs-height')"
          />
        </div>
        <el-divider :size="state.size">
          过渡动画
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            开启动画
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
          页脚设置
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            显示页脚
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showFooter"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            页脚背景
          </el-text>
          <el-color-picker
            v-model="state.footerBgColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter" show-alpha @change="methods.updateColorCssValue($event, '--fv-footer-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            页脚文本
          </el-text>
          <el-color-picker
            v-model="state.footerTextColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter" show-alpha @change="methods.updateColorCssValue($event, '--fv-footer-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            页脚高度
          </el-text>
          <el-input-number
            :model-value="state.footerHeight"
            :size="state.size"
            controls-position="right"
            :disabled="!appStore.appConfig.showFooter"
            @change="methods.updateSizeCssValue($event, '--fv-footer-heigth')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            <el-tooltip
              content="可以使用多语言翻译模板"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            页脚内容
          </el-text>

          <el-input
            v-model="appStore.appConfig.footerText"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter"
          />
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
        <div class="setting-item">
          <el-text :size="state.size">
            灰色模式
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableGray"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            色弱模式
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableColorWeakness"
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
        margin: 2px 0;
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
    .el-input{
      width: 85px;
    }
}
</style>
