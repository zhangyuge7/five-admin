<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'
import { getCssVal, setCssVal } from '@/utils/domUtils'
import { setPrimaryColor } from '@/utils/theme'
import { layoutTypes, tabsTypes, transitionNames } from '@/appConfig'
import { t } from '@/i18n'

const appStore = useAppStore()

// 提示
const alert = t('appConfig.hintText')

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

  onLayoutClick(item) {
    if (item.value !== appStore.appConfig.layoutType)
      appStore.appConfig.layoutType = item.value
  },
  getLayoutIconText(item) {
    const { value } = item
    switch (value) {
      case 'default':
        return '默'
      case 'singleAside':
        return t('appConfig.layout1')
      case 'doubleAside':
        return t('appConfig.layout2')
      case 'crosswise':
        return t('appConfig.layout3')
      case 'mixture':
        return t('appConfig.layout4')
    }
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
      :title="t('appConfig.applicationConfig')"
      size="350px" class="setting-drawer"
      :lock-scroll="false"

      @close="methods.drawerClose"
    >
      <el-scrollbar class=" pr-4">
        <el-divider :size="state.size">
          {{ t('appConfig.layoutConfig') }}
        </el-divider>
        <div class="setting-item">
          <!-- <el-text :size="state.size">
            布局
          </el-text> -->
          <ul class="fv-layout-mini-box">
            <li
              v-for="item in layoutTypes"
              :key="item.value"
              :class="appStore.appConfig.layoutType === item.value ? 'fv-layout-mini-box-item fv-layout-mini-box-item-selected' : 'fv-layout-mini-box-item'"
              @click="methods.onLayoutClick(item)"
            >
              <p :title="item.label" class="w-full h-full flex justify-center items-center">
                <el-icon size="24" :color="appStore.appConfig.layoutType === item.value ? 'var(--el-color-primary)' : ''">
                  {{ methods.getLayoutIconText(item) }}
                </el-icon>
              </p>
            </li>
          </ul>
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.theme') }}
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
            {{ t('appConfig.showLogo') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showLogo"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.logoBackgroundColor') }}
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
            {{ t('appConfig.titleColor') }}
          </el-text>
          <el-color-picker
            v-model="state.logoTitleColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showLogo"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-logo-title-color')"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.headerConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.headerBackgroundColor') }}
          </el-text>
          <el-color-picker
            v-model="state.headerBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-header-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.headerTextColor') }}
          </el-text>
          <el-color-picker
            v-model="state.headerTextColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-header-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.headerHeight') }}
          </el-text>
          <el-input-number
            :model-value="state.headerHeight"
            :size="state.size"
            controls-position="right"
            @change="methods.updateSizeCssValue($event, '--fv-header-height')"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.sideConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.collapse') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.menuIsCollapse"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.collapseAnimation') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableCollapseTransition"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.primaryTitle') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isMainMenuShowTitle"
            :disabled="appStore.appConfig.layoutType !== 'doubleAside'"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.sideBackgroundColor') }}
          </el-text>
          <el-color-picker
            v-model="state.sideBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-side-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.sideWidth') }}
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
            {{ t('appConfig.primaryWidth') }}
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
            {{ t('appConfig.contentHeight') }}
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
          {{ t('appConfig.menuConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.uniqueOpened') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.subMenuUniqueOpened"
            :disabled="appStore.appConfig.menuIsCollapse || appStore.appConfig.layoutType === 'crosswise'"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.menuTextColor') }}
          </el-text>
          <el-color-picker
            v-model="state.menuTextColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.hoverBackgroundColor') }}
          </el-text>
          <el-color-picker
            v-model="state.menuHoverBgColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-hover-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.activateTextColor') }}
          </el-text>
          <el-color-picker
            v-model="state.menuActiveColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-active-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.expansionBackgroundColor') }}
          </el-text>
          <el-color-picker
            v-model="state.menuInlineColor"
            :size="state.size"
            show-alpha @change="methods.updateColorCssValue($event, '--fv-menu-inline-bg-color')"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.tabsConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.openTabs') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.showIcon') }}
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
              :content="t('appConfig.uniqueFixedHint')"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            {{ t('appConfig.uniqueFixed') }}
          </el-text>

          <el-switch
            v-model="appStore.appConfig.tabsOneFiexd"
            :disabled="!appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.tabsStyle') }}
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
            {{ t('appConfig.tabsHeight') }}
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
          {{ t('appConfig.transitionAnimationConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.openAnimation') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isTransition"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.animationStyle') }}
          </el-text>
          <el-select v-model="appStore.appConfig.transitionName" :size="state.size" class="select" :disabled="!appStore.appConfig.isTransition">
            <el-option
              v-for="item in transitionNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.pageFooterConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.showFooter') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showFooter"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.footerBackgroundColor') }}
          </el-text>
          <el-color-picker
            v-model="state.footerBgColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter" show-alpha @change="methods.updateColorCssValue($event, '--fv-footer-bg-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.footerTextColor') }}
          </el-text>
          <el-color-picker
            v-model="state.footerTextColor"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter" show-alpha @change="methods.updateColorCssValue($event, '--fv-footer-text-color')"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.footerHeight') }}
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
              :content="t('appConfig.footerTextHint')"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            {{ t('appConfig.footerText') }}
          </el-text>

          <el-input
            v-model="appStore.appConfig.footerText"
            :size="state.size"
            :disabled="!appStore.appConfig.showFooter"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.otherConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.openMainPageBackToTop') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableBacktop"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.grayPattern') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableGray"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.tritanope') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableColorWeakness"
            :size="state.size"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.hint') }}
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
    .fv-layout-mini-box{
      display: flex;
      // justify-content: center;
      // align-items: center;
      flex-flow:row wrap;
    }
    .fv-layout-mini-box-item{
      width: 50px;
      height: 50px;
      margin: 5px 5px;
      cursor: pointer;
      border: 1px solid var(--el-border-color);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .fv-layout-mini-box-item-selected{
      border: 1px solid var(--el-color-primary);
    }
}
</style>
