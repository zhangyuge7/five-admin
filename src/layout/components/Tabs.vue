<script  setup>
import { computed, onBeforeMount, ref } from 'vue'
import _ from 'lodash'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from '@/router'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import { refreshPage } from '@/utils/tools'

const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()

// 当前激活的标签 path
const editableTabsValue = ref('')
// 标签列表
const editableTabs = ref([])

// 是否在 tab 上显示图标
const showIcon = computed(() => appStore.appConfig.tabsIcon)

// 新增 tab
function addTab(currentRoute) {
  // 判断当前路由是否已经在标签页列表
  const exist = editableTabs.value.filter(item => item.path === currentRoute.path)
  // 判断404
  const not = currentRoute.name === 'NotFound'
  // 如果标签页列表中不存在当前路由信息，并且不是404页面，将当前路由信息添加到列表
  if ((!exist || !exist.length) && !not && currentRoute.path !== '/')
    editableTabs.value.push(currentRoute)
    // setTimeout(bindingContextmenu, 300)

  editableTabsValue.value = currentRoute.path
  fixedLastTab()
}
// 关闭 tab
function removeTab(targetName) {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab)
          activeName = nextTab.path
      }
    })
  }
  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter(tab => tab.path !== targetName)
  if (!editableTabs.value.length)
    router.push('/')

  fixedLastTab()
}

// 关闭其它 tabs
function removeOtherTabs(targetPath) {
  const tabs = editableTabs.value
  if (editableTabsValue.value !== targetPath)
    editableTabsValue.value = targetPath
  editableTabs.value = tabs.filter(tab => tab.path === targetPath || tab.meta?.fixedTab)
  fixedLastTab()
}
// 关闭全部 tabs
function removeAllTabs() {
  const tabs = editableTabs.value
  // 获取所有固定的 tab
  const fixedTabs = tabs.filter(tab => tab.meta?.fixedTab)
  // 如果有固定的 tab ，只保留固定的，其它的全部关闭
  if (fixedTabs.length) {
    // 从所有固定的 tabs 中找出当前激活的 tab
    const currTab = fixedTabs.filter(tab => tab.path === editableTabsValue.value)
    // 如果当前激活的 tab 不在固定 tabs 中，将固定的 tabs 的最后一项作为当前激活
    if (!currTab.length)
      editableTabsValue.value = fixedTabs[fixedTabs.length - 1].path
    // 只保留固定的 tabs
    editableTabs.value = fixedTabs
  }
  // 如果没有固定的 tabs,保留第一个 tab ，将其它tab全部删除
  else {
    editableTabs.value = [editableTabs.value[0]]
    if (editableTabsValue.value !== editableTabs.value[0].path)
      editableTabsValue.value = editableTabs.value[0].path
    fixedLastTab()
  }
}

// tab 改变时
function tabChange(targetName) {
  if (router.currentRoute.value.path !== targetName)
    router.push(targetName)
}

// 如果所有标签页的配置都是可关闭的，只有一个时不可以被关闭
let path = ''
function fixedLastTab() {
  // 判断配置项是否开启 始终保持一个 tab 固定不可关闭
  if (appStore.appConfig.tabsOneFiexd) {
  // 判断标签页列表是否只有一个
    if (editableTabs.value.length === 1) {
    // 判断这一个标签是否为固定配置
      if (!editableTabs.value[0].meta.fixedTab) {
      // 固定这个标签不可被关闭
        editableTabs.value[0].meta.fixedTab = true
        // 保存这个被设置为固定状态的 path
        path = editableTabs.value[0].path
      }
    }
    // 判断是否有被设置为固定状态的 path 并且标签页列表不止有一个
    else if (path && editableTabs.value.length > 1) {
      // 根据 path 过滤出被设置为固定状态的标签信息
      const routes = editableTabs.value.filter(item => item.path === path)
      // 取消固定状态
      routes[0].meta.fixedTab = false
      path = ''
    }
  }
}

// 侦听路由变化
onBeforeRouteUpdate((to) => {
  addTab(to)
})
// watch(() => route.path, () => {
//   addTab(router.currentRoute.value)
// })

// 组件加载前
onBeforeMount(() => {
  // 从 pinia 仓库中获取需要固定在标签页的路由
  editableTabs.value = _.cloneDeep(routeStore.fiexTabsRoutes)
  // 当前路由添加到标签
  addTab(router.currentRoute.value)
})

// 右键点击菜单项
function command(v) {
  const { flag, tab } = v
  // 刷新
  if (flag === 'refresh')
    refreshPage()
  // 关闭当前
  else if (flag === 'close')
    removeTab(tab.path)
  // 关闭其它
  else if (flag === 'close-other')
    removeOtherTabs(tab.path)
  // 关闭所有
  else if (flag === 'close-all')
    removeAllTabs()
}
</script>

<template>
  <div class="fv-tabs">
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      @tab-remove="removeTab"
      @tab-change="tabChange"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.path"
        :name="item.path"
        :closable="!item.meta?.fixedTab"
      >
        <template #label>
          <el-dropdown trigger="contextmenu" @command="command">
            <div class="tabs-dropdown">
              <el-icon v-if="showIcon && item.meta?.icon">
                <SvgIcon :name="item.meta.icon" />
              </el-icon>
              <span class="tabs-item-title">{{ item.meta.title }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="editableTabsValue !== item.path" :command="{ flag: 'refresh', tab: item }">
                  <el-icon>
                    <SvgIcon name="ep:refresh" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.refresh') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :disabled="item.meta.fixedTab" :command="{ flag: 'close', tab: item }">
                  <el-icon>
                    <SvgIcon name="mdi:close-box-outline" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.close') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-other', tab: item }">
                  <el-icon>
                    <SvgIcon name="mdi:close-box-multiple-outline" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeOther') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-all', tab: item }">
                  <el-icon>
                    <SvgIcon name="codicon:close-all" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeAll') }}
                  </span>
                </el-dropdown-item>
                <!-- <el-dropdown-item divided disabled>
                  待增
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.fv-tabs .el-tabs--border-card > .el-tabs__header{
    border-bottom: none;
}

.fv-tabs  .el-tabs__header {
    margin: 0;
}

.fv-tabs .el-tabs__content{
    display: none;
}
.fv-tabs .el-tabs--border-card{
    border:none;
}

.fv-tabs .el-tabs__item{
  padding: 0;
  height: auto;
}
.fv-tabs .el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:last-child{
  padding: 0;
}
.fv-tabs .el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:nth-child(2){
  padding: 0;
}

.fv-tabs .is-closable .tabs-dropdown{
  padding: 8px 25px 8px 15px;
}
.fv-tabs  .tabs-dropdown{
  padding: 8px 15px 8px 15px;
  display: flex;
}
.fv-tabs .el-tabs__item .is-icon-close{
  margin-left: 0;
  position: absolute;
  right: 8px;
}
.fv-tabs .tabs-item-title{
  margin-left: 4px;
}
.fv-tabs .el-tabs__nav-wrap.is-scrollable{
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.fv-tabs .el-tabs__nav-next, .fv-tabs .el-tabs__nav-prev{
  line-height: none;
  width: 30px;
}
.fv-tabs .el-tabs__nav{
  height: var(--fv-tabs-height);
}
</style>
