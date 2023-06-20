import vue from '@vitejs/plugin-vue'
import setupSvgIcon from './svg-icon'
import setupViteMockServe from './vite-plugin-mock'

export default function setupVitePlugins(env, isBuild) {
  const plugins = [vue()]
  plugins.push(setupSvgIcon(isBuild))
  plugins.push(setupViteMockServe(env.VITE_USE_MOCK === 'true'))
  return plugins
}
