export function initProxy(env, isDev) {
  if (!isDev)
    return {}
  const proxy = {}
  const rawProxy = JSON.parse(env.VITE_DEV_PROXY)
  Object.keys(rawProxy).forEach((key) => {
    proxy[key] = {
      target: rawProxy[key],
      changeOrigin: true,
      rewrite: path => path.substring(key.length),
    }
  })
  return proxy
}
