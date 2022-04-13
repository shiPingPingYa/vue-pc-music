function hanldeImgLoad(entries) {
  entries.forEach(v => v.isIntersecting && v.target.setAttribute('src', v.target.getAttribute('data-src')))
}
const observe = new IntersectionObserver(hanldeImgLoad, { threshold: 1 })
export default {
  bind(el) {
    observe.observe(el)
  },
  unbind(el) {
    observe.unobserve(el)
  }
}
