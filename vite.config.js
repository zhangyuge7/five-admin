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
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "src/assets/styles/var.scss";',
    //     },
    //   },
    // },
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
