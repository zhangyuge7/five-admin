import vue from '@vitejs/plugin-vue'
import setupSvgIcon from './svg-icon'

import useVueSetupExtend from './vue-setup-extend'

export default function setupVitePlugins(env, isBuild) {
  const plugins = [vue()]
  plugins.push(setupSvgIcon(isBuild))
  plugins.push(useVueSetupExtend())
  return plugins
}
