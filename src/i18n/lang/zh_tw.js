const modules = import.meta.globEager('./zh-tw/**/*.js')
let msgObj = {}
Object.keys(modules).forEach((key) => {
  msgObj = { ...msgObj, ...modules[key].default }
})
export default {
  ...msgObj,
}
