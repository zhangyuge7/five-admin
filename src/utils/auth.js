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
// 当前用户角色与 val 值必须全匹配才为 true
export function hasRoleAll(val) {
  if (!Array.isArray(val)) {
    console.error('参数类型错误，需要Array类型参数')
    return false
  }
  const userStore = useUserStore()
  const { roles } = userStore.userInfo
  if (roles.length !== val.length)
    return false

  let isRoleAll = true
  for (let i = 0; i < roles.length; i++) {
    let flag = false
    for (let j = 0; j < val.length; j++) {
      if (roles[i] === val[j])
        flag = true
    }
    if (!flag) {
      isRoleAll = false
      break
    }
  }
  return isRoleAll
}

// 检验是否存在 token
export function hasToken() {
  const userStore = useUserStore()
  return !!userStore.token
}
