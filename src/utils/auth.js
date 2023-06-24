import { useUserStore } from '@/stores/modules/user'

// 检验当前用户是否有指定角色。val string | array
// 当前用户角色与 val 值匹配其一即为 true
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
  else {
    console.error('参数类型错误，需要字符串或Array类型参数')
    return false
  }
}

// 检验当前用户是否有指定角色。val array
// 当前用户角色必须包含val中的所有值才为 true
export function hasRoleAll(val) {
  if (!Array.isArray(val)) {
    console.error('参数类型错误，需要Array类型参数,如果只有一个值建议使用v-hasRole:or')
    return false
  }
  if (val.length === 0)
    return true

  const userStore = useUserStore()
  const { roles } = userStore.userInfo
  const set = new Set(val) // 去重
  const containsAll = [...set].every(val => roles.includes(val))
  return containsAll
}

// 检验当前用户是否有指定权限标识码。val string | array
// 当前用户权限标识码与 val 值匹配其一即为 true
export function hasPerm(val) {
  const userStore = useUserStore()
  const { perms } = userStore.userInfo
  if (!perms || perms.length < 1)
    return false
  if (typeof (val) === 'string')
    return perms.includes(val)
  if (Array.isArray(val)) {
    const arr = perms.filter(role => val.includes(role))
    return arr && arr.length > 0
  }
  else {
    console.error('参数类型错误，需要字符串或Array类型参数')
    return false
  }
}

// 检验当前用户是否有指定权限标识码。val array
// 当前用户权限标识码必须包含val中的所有值才为 true
export function hasPermAll(val) {
  if (!Array.isArray(val)) {
    console.error('参数类型错误，需要Array类型参数,如果只有一个值建议使用v-hasPrem:or')
    return false
  }
  if (val.length === 0)
    return true

  const userStore = useUserStore()
  const { perms } = userStore.userInfo
  const set = new Set(val) // 去重
  const containsAll = [...set].every(val => perms.includes(val))
  return containsAll
}

// 检验是否存在 token
export function hasToken() {
  const userStore = useUserStore()
  return !!userStore.token
}
