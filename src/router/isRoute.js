export function isRoute (item, routes) {
  // 因为有动态路由，所以判断是否存在路由的时候，动态路由是不能查找到的，再加一个title判断条件
  return item.meta.title || routes.indexOf(item.path)
}

export function filterPath (routes) {
  const routerPath = []
  routes.forEach(item => {
    if (item.children) {
      routerPath.push(...filterPath(item.children))
    } else {
      routerPath.push(item.path)
    }
  })
  return routerPath
}
