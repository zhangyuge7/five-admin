import { useUserStore } from '@/stores/modules/user'
import { match } from '@/utils/strUtils'

export default function useAuth() {
  const userStore = useUserStore()
  // 用户信息
  const userInfo = userStore.userInfo
  // 是否存在 token
  const hasToken = !!userStore.token
  // token
  const token = userStore.token

  // 设置 token
  function setToken(token = '') {
    userStore.token = token
  }

  // 检验当前用户是否有指定角色。val string | array
  // 当前用户角色与 val 值匹配其一即为 true
  function hasRole(val) {
    if (!userStore.userInfo)
      return false
    const { roles } = userStore.userInfo
    if (!roles?.length)
      return false
    if (typeof (val) === 'string') {
      const arr = roles.filter(role => match(val, role))
      return !!arr?.length
    }
    if (Array.isArray(val)) {
      const arr = roles.filter(role => !!val.filter(v1 => match(v1, role)).length)
      return !!arr?.length
    }
    else {
      console.error('参数类型错误，需要字符串或Array类型参数')
      return false
    }
  }

  // 检验当前用户是否有指定角色。val array
  // 当前用户角色必须包含val中的所有值才为 true
  function hasRoleAll(val) {
    if (!Array.isArray(val)) {
      console.error('参数类型错误，需要Array类型参数')
      return false
    }
    if (!val.length)
      return true
    if (!userStore.userInfo)
      return false

    const { roles } = userStore.userInfo
    const set = new Set(val) // 去重
    const containsAll = [...set].every(v1 => !!roles.filter(role => match(v1, role)).length)
    return containsAll
  }

  // 检验当前用户是否有指定权限标识码。val string | array
  // 当前用户权限标识码与 val 值匹配其一即为 true
  function hasPerm(val) {
    if (!userStore.userInfo)
      return false

    const { perms } = userStore.userInfo
    if (!perms?.length)
      return false
    if (typeof (val) === 'string')
      return !!perms.filter(pre => match(val, pre)).length
    if (Array.isArray(val)) {
      const arr = perms.filter(per => !!val.filter(v1 => match(v1, per)).length)
      return !!arr?.length
    }
    else {
      console.error('参数类型错误，需要字符串或Array类型参数')
      return false
    }
  }

  // 检验当前用户是否有指定权限标识码。val array
  // 当前用户权限标识码必须包含val中的所有值才为 true
  function hasPermAll(val) {
    if (!Array.isArray(val)) {
      console.error('参数类型错误，需要Array类型参数')
      return false
    }
    if (!val.length)
      return true
    if (!userStore.userInfo)
      return false

    const { perms } = userStore.userInfo
    const set = new Set(val) // 去重
    const containsAll = [...set].every(v1 => !!perms.filter(pre => match(v1, pre)).length)
    return containsAll
  }
  return {
    userInfo,
    hasToken,
    token,
    setToken,
    hasRole,
    hasRoleAll,
    hasPerm,
    hasPermAll,
  }
}
