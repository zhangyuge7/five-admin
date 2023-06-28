<script  setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from '@/router'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const routeStore = useRouteStore()

const editableTabsValue = ref('')
const editableTabs = ref([])

const showIcon = computed(() => appStore.appConfig.tabsIcon)

// 新增 tab
function addTab(currentRoute) {
  // 判断当前路由是否已经在标签页列表
  const exist = editableTabs.value.filter(item => item.path === currentRoute.path)
  // 判断404
  const not = currentRoute.name === 'NotFound'
  // 如果标签页列表中不存在当前路由信息，并且不是404页面，将当前路由信息添加到列表
  if ((!exist || !exist.length) && !not)
    editableTabs.value.push(currentRoute)

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
// tab 改变时
function tabChange(targetName) {
  if (router.currentRoute.value.path !== targetName)
    router.push(targetName)
}

// 如果所有标签页的配置都是可关闭的，只有一个时不可以被关闭
let path = ''
function fixedLastTab() {
  // 判断配置信息是否开启 始终保持一个 tab 固定不可关闭
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
watch(() => router.currentRoute, (val) => {
  addTab(val.value)
}, { immediate: false, deep: true })

// 组件加载前
onBeforeMount(() => {
  // 从 pinia 仓库中获取需要固定在标签页的路由
  editableTabs.value = routeStore.fiexTabsRoutes
  // 当前路由添加到标签
  addTab(router.currentRoute.value)
})
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
          <el-icon v-if="showIcon && item.meta?.icon">
            <SvgIcon :name="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
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
</style>
