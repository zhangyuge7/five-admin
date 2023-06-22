import { useUserStore } from '@/stores/modules/user'

// 检验当前用户是否有指定角色。val string | array
export function hasRole(val) {
  const userStore = useUserStore()
  const { roles } = userStore.userInfo
  if (!roles || roles.length < 1)
    return false
  if (typeof (val) === 'string')
    return roles.includes(val)
  if (Array.isArray(val)) {
    const arr = roles.filter(role => val.includes(role))
    return arr && arr.length > 0
  }
}
