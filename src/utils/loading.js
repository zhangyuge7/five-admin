/**
 * 全屏 loading
 */
import { nextTick } from 'vue'

import '@/assets/styles/common/loading.scss'

const FullLoading = {
  // 创建 loading
  start: () => {
    const bodys = document.body
    const div = document.createElement('div')
    div.setAttribute('class', 'five-loader')
    const htmls = `
                <div>
                <p class="text">
                <span class="letter letter1">L</span>
                <span class="letter letter2">o</span>
                <span class="letter letter3">a</span>
                <span class="letter letter4">d</span>
                <span class="letter letter5">i</span>
                <span class="letter letter6">n</span>
                <span class="letter letter7">g</span>
                <span class="letter letter8">.</span>
                <span class="letter letter9">.</span>
                <span class="letter letter10">.</span>
                </p>
                </div>
                  `
    div.innerHTML = htmls
    bodys.insertBefore(div, bodys.childNodes[0])
    window.fullLoading = true
  },
  // 移除 loading
  done: (time = 0) => {
    nextTick(() => {
      setTimeout(() => {
        window.fullLoading = false
        const el = document.querySelector('.five-loader')
        if (el && el.parentNode)
          el.parentNode.removeChild(el)
      }, time)
    })
  },
}
export default FullLoading
