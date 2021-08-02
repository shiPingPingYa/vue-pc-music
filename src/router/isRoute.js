export function isRoute (item, routes) {
  return (item.meta.title || routes.indexOf(item.path))
}

export function filterPath (routes) {
  const routerPath = []
  routes.forEach((item) => {
    if (item.children) {
      routerPath.push(...filterPath(item.children))
    } else {
      routerPath.push(item.path)
    }
  })
  return routerPath
}
