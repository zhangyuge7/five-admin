/**
 * 工具箱
 */

// 复制文本
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch (e) {
    return false
  }
}
