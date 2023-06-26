import { defineConfig, loadEnv } from 'vite'
import alias from './vite/alias'
import setupVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: setupVitePlugins(env, command === 'build'),
    resolve: {
      alias,
    },
    server: {
      open: false,
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:9300',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
