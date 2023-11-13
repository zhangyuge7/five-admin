import { ElLoading } from 'element-plus'

let loadingInstance
const timerArr = []
export default {
  start(delay = 350, target = document.querySelector('.fv-el-main')) {
    const timer = setTimeout(() => {
      loadingInstance = ElLoading.service({
        target,
        text: 'loading....',
      })
    }, delay)
    timerArr.push(timer)
  },
  done() {
    const length = timerArr.length
    for (let i = 0; i < length; i++) {
      const o = timerArr.shift()
      o && clearTimeout(o)
    }
    loadingInstance && loadingInstance.close()
  },
}
