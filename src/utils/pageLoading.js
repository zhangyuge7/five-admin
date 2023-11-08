import { ElLoading } from 'element-plus'

let loadingInstance
export default {
  start(el) {
    loadingInstance = ElLoading.service({
      target: el || document.querySelector('.fv-el-main'),
      text: 'loading....',
    })
  },
  done() {
    loadingInstance && loadingInstance.close()
  },
}
