<script setup>
import { computed, onMounted, ref, shallowReactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import SvgIcon from '@/components/svg-icon/index.vue'
import mittBus from '@/utils/mitt'

const appStore = useAppStore()
const routeStore = useRouteStore()
const routes = shallowReactive([])
const route = useRoute()
const active = ref('') // 当前激活的
// 定义方法
const methods = {
// 初始化主菜单
  initMainMenus(menus) {
    menus.forEach((item) => {
      if (methods.showMenuItem(item))
        routes.push(item)

      else if (methods.showChildren(item))
        methods.initMainMenus(item.children)
    })
  },
  // 是否显示为菜单项
  showMenuItem({ meta }) {
    if (meta?.isHide)
      return false
    if (meta?.roles && !hasRole(meta?.roles))
      return false

    return !!meta
  },
  // 当父级菜单隐藏时，是否继续显示子级菜单
  showChildren({ children, meta }) {
    if (!children)
      return false
    else if (meta && meta.hideChildren)
      return false
    return true
  },
  // 菜单项被点击，如果有 children，将 children 传到子菜单，否则传 [] 到子菜单
  menuItemClick(item) {
    if (item.children && item.children.length) {
      mittBus.emit('onAMainMenuChange', item.children)
    }
    else {
      router.push(item.path)
      mittBus.emit('onAMainMenuChange', [])
    }
  },
  // 查找当前激活的 root path
  findRootPath(mainMenus, path) {
    for (const item of mainMenus) {
      if (item.path === path) {
        active.value = path
        this.menuItemClick(item)
        break
      }
      else if (item.children && item.children.length) {
        if (this.dfs(item.children, path)) {
          active.value = item.path
          this.menuItemClick(item)
          break
        }
      }
    }
  },
  // 深度递归搜索
  dfs(menus, path) {
    for (const item of menus) {
      if (item.path === path) {
        return item
      }
      else if (item.children && item.children.length) {
        const v = this.dfs(item.children, path)
        if (v)
          return v
      }
    }
  },
}
const isShowTitle = computed(() => appStore.appConfig.isMainMenuShowTitle)
onMounted(() => {
  methods.initMainMenus(routeStore.menus || [])
  watch(() => route.path, (val) => {
    methods.findRootPath(routes, val)
  }, { immediate: true })
})
</script>

<template>
  <el-menu
    :default-active="active"
    collapse
  >
    <template v-for="item in routes" :key="item.path">
      <el-menu-item :index="item.path" @click="methods.menuItemClick(item)">
        <div v-if="isShowTitle" class="flex flex-col items-center gap-y-1">
          <el-icon v-if="item.meta?.icon">
            <SvgIcon :name="item.meta.icon" />
          </el-icon>
          <span>{{ $t(item.meta?.title) }}</span>
        </div>
        <el-icon v-if="item.meta?.icon && !isShowTitle">
          <SvgIcon :name="item.meta.icon" />
        </el-icon>
        <template v-if="!isShowTitle" #title>
          {{ $t(item.meta?.title) }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu{
  border-right: 0;
  width: var(--fv-main-menu-width);
}
.el-menu-item{
  line-height: normal;
  padding: 0;
  justify-content: center;

}
:deep().el-menu-item.is-active{
  background-color: var(--fv-menu-active-bg-color);
}
</style>

<style>
.fv-main-menu .el-menu-item .el-menu-tooltip__trigger{
  padding: 0;
  position: relative;
  width: auto;
}
</style>
