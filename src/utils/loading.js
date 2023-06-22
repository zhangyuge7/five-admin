import { nextTick } from 'vue'

import '@/assets/styles/common/loading.scss'

/**
 * 页面全局 Loading
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoading = {
  // 创建 loading
  start: () => {
    const bodys = document.body
    const div = document.createElement('div')
    div.setAttribute('class', 'loading-next')
    const htmls = `
                <div class="loading-next-box">
                  <div class="loading-next-box-warp">
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                    <div class="loading-next-box-item"></div>
                  </div>
                </div>
                  `
    div.innerHTML = htmls
    bodys.insertBefore(div, bodys.childNodes[0])
    window.nextLoading = true
  },
  // 移除 loading
  done: (time = 0) => {
    nextTick(() => {
      setTimeout(() => {
        window.nextLoading = false
        const el = document.querySelector('.loading-next')
        if (el && el.parentNode)
          el.parentNode.removeChild(el)
      }, time)
    })
  },
}
