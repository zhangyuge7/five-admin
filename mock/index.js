export const baseApi = '/api'

export class R {
  code
  message
  data
  ok

  constructor(code, message, data, ok) {
    this.code = code
    this.message = message
    this.data = data
    this.ok = ok
  }

  static ok(data) {
    return new R(0, '成功', data || null, true)
  }

  static fail(message, code = -1) {
    return new R(code, message, null, false)
  }
}
