import { R, baseApi } from '..'

export default [
  // 登录
  {
    url: `${baseApi}/login`,
    method: 'post',
    response: ({ body }) => {
      const { data } = body
      if (data.username !== 'admin')
        return R.fail('用户名不存在')

      else if (data.password !== '123456')
        return R.fail('密码错误')

      return R.ok({ token: 'token12321' })
    },
  },
  // 登出
  {
    url: `${baseApi}/logout`,
    method: 'post',
    response: () => {
      return R.ok()
    },
  },
]
