<script  setup>
import { ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from '@/router'

const editableTabsValue = ref('/home')
const editableTabs = ref([
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      isHide: false,
      icon: 'ph:house',
      fixedTab: true,
    },
  },
])

// 新增 tab
function addTab(currentRoute) {
  const exist = editableTabs.value.filter(item => item.path === currentRoute.path)
  if (!exist || !exist.length)
    editableTabs.value.push(currentRoute)

  editableTabsValue.value = currentRoute.path
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
}
// tab 改变时
function tabChange(targetName) {
  if (router.currentRoute.value.path !== targetName)
    router.push(targetName)
}

// 侦听路由变化
watch(() => router.currentRoute, (val) => {
  addTab(val.value)
}, { immediate: true, deep: true })
</script>

<template>
  <div>
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
          <el-icon v-if="item.meta?.icon">
            <SvgIcon :name="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.el-tabs--border-card > .el-tabs__header{
    border-bottom: none;
}

.el-tabs__header {
    margin: 0;
}

.el-tabs__content{
    display: none;
}
.el-tabs--border-card{
    border:none;
}
</style>
