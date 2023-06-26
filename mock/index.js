export const baseApi = '/api'

export class R {
  code
  msg
  data
  ok

  constructor(code, msg, data, ok) {
    this.code = code
    this.msg = msg
    this.data = data
    this.ok = ok
  }

  static ok(data) {
    return new R(0, '成功', data || null, true)
  }

  static fail(msg, code = -1) {
    return new R(code, msg, null, false)
  }
}
