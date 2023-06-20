import vue from '@vitejs/plugin-vue'
import setupSvgIcon from './svg-icon'
import setupViteMockServe from './vite-plugin-mock'
import useVueSetupExtend from './vue-setup-extend'

export default function setupVitePlugins(env, isBuild) {
  const plugins = [vue()]
  plugins.push(setupSvgIcon(isBuild))
  plugins.push(setupViteMockServe(env.VITE_USE_MOCK === 'true'))
  plugins.push(useVueSetupExtend())
  return plugins
}
