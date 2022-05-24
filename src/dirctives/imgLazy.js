/**
 * @description 图片懒加载指令
 */
function handleImgLoad(entries) {
  entries.forEach(v => v.isIntersecting && v.target.setAttribute('src', v.target.getAttribute('data-src')));
}

//判断元素是否在可视区域
function isViewport(el) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  return top >= 0 && left >= 0 && right + width <= viewWidth && bottom + height <= viewHeight;
}

//threshold设置元素位于界面可视化区域的比例，0~1,1(完全位于可视化区域)
const observe = new IntersectionObserver(handleImgLoad, { threshold: 0.6 });
export default {
  bind(el) {
    observe.observe(el);
  },
  componentUpdated(el) {
    isViewport(el) && (el.src = el.getAttribute('data-src'));
  },
  unbind(el) {
    observe.unobserve(el);
  }
};
