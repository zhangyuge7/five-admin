import { ElLoading } from 'element-plus'

let loadingInstance
let timer
function close() {
  timer && clearTimeout(timer)
  loadingInstance && loadingInstance.close()
}

export default {
  start(delay = 350) {
    close()
    const target = document.querySelector('.fv-el-main')
    if (!target)
      return
    timer = setTimeout(() => {
      loadingInstance = ElLoading.service({
        target,
        text: 'loading....',
      })
    }, delay)
  },
  done() {
    close()
  },
}
