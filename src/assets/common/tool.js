/**
 * @description 将时间字符串转化为日期
 * @param dateStr 需要转化的时间字符串
 * @param str 需要转换的日期格式
 * @param  all 日期转换为年月日
 * @returns
 */
export const formDate = (dateStr, str, all) => {
  // 获取时间
  const fullyear = dateStr.getFullYear();
  const newFullyear = new Date().getFullYear();
  const month = dateStr.getMonth() + 1 > 9 ? dateStr.getMonth() + 1 : `0${dateStr.getMonth() + 1}`;
  const date = dateStr.getDate();
  const hours = dateStr.getHours() > 9 ? dateStr.getHours() : `0${dateStr.getHours()}`;
  const minutes = dateStr.getMinutes() > 9 ? dateStr.getMinutes() : `0${dateStr.getMinutes() || 0}`;
  const seconds = dateStr.getSeconds() > 9 ? dateStr.getSeconds() : `0${dateStr.getSeconds() || 0}`;

  if (str === 'mm:ss') return `${minutes}:${seconds}`;
  else if (str === 'mm:dd') return `${month}月${date}日`;
  else if (str === 'mm:dd-hh:mm') return `${month}月${date}日 ${hours}:${minutes}`;
  else if (str === 'ff:mm:dd') return fullyear === newFullyear && all !== 2 ? `${month}月${date}日` : `${fullyear}年${month}月${date}日`;
  else if (str === 'f:mm:dd-hh:mm') {
    const fullyearTwo = fullyear.toString().slice(2, 4);
    return `${fullyearTwo}年${month}月${date}日 ${hours}:${minutes}`;
  } else return `${fullyear}年${month}月${date}日 ${hours}:${minutes}`;
};

/**
 * @description 防抖
 * @param fn 调用方法
 * @param delay 延迟
 */
export const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(this, args);
    }, delay);
  };
};

/**
 * @description 节流
 * @param fn 调用方法
 * @param delay 延迟
 */
export const throttled = (fn, delay) => {
  let startTime = Date.now();
  return function(...args) {
    let endTime = Date.now();
    if (endTime - startTime > delay) {
      fn && fn.apply(this, args);
      startTime = Date.now();
    }
  };
};
