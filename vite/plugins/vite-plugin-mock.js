import { viteMockServe } from 'vite-plugin-mock'

export default function setupViteMockServe(enable) {
  return viteMockServe({
    mockPath: 'mock',
    enable,
    watchFiles: false,
    logger: false,
  })
}
