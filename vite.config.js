import { defineConfig, loadEnv } from 'vite'
import alias from './vite/alias'
import setupVitePlugins from './vite/plugins'
import { initProxy } from './vite/proxy'

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_BASE_PATH,
    plugins: setupVitePlugins(env, command === 'build'),
    resolve: {
      alias,
    },
    build: {
      rollupOptions: {
        output: {
          // 处理GitHub Pages 部署 _plugin-vue_export-helper.js 404
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name)
            const driveLetter = match ? match[0] : ''
            // substr 是被淘汰語法，因此要改 slice
            return (
              driveLetter
              + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
            )
          },
        },
      },
    },
    server: {
      open: true,
      host: true,
      port: env.VITE_APP_PORT,
      proxy: initProxy(env, mode === 'development'),
    },
  }
})
