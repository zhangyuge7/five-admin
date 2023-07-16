export function initProxy() {
  return {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    },
  }
}
