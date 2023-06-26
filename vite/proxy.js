export function initProxy() {
  return {
    '/api': {
      target: 'http://localhost:9300',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    },
  }
}
