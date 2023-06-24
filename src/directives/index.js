import { hasRole, hasRoleAll } from '@/utils/auth'

/**
 * 权限指令
 * 使用手册：
 * v-hasRole:or     值可以为字符串和数组，角色值匹配其一就显示组件
 * v-hasRole:all    值只可以是数组，角色值全部匹配才显示组件
 * v-hasRole        v-hasRole:or 的简写
 */
const hasRoleDirective = {
  mounted(el, binding) {
    const { value, arg } = binding
    let isShow = false
    if (!arg || arg === 'or')
      isShow = hasRole(value)

    else if (arg === 'all')
      isShow = hasRoleAll(value)

    else
      console.error(`v-hasRole指令参数'${arg}'错误，v-hasRole 或 v-hasRole:or 或 v-hasRole:all`)

    if (!isShow)
      el.parentNode && el.parentNode.removeChild(el) // 无权限时，从父节点中移除该节点
  },
}

export function useDirectives(app) {
  app.directive('hasRole', hasRoleDirective)
}
