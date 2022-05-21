// 把传进来的歌曲的时间进行处理(date:日期，str获取的时间字符串形式，all：区别获取年月日)
export const formDate = (date, str, all) => {
  // 获取时间
  const fullyear = date.getFullYear();
  const newFullyear = new Date().getFullYear();
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const dateO = date.getDate();
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes() || 0}`;
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds() || 0}`;

  if (str === 'mm:ss') {
    return `${minutes}:${seconds}`;
  } else if (str === 'mm月dd日') {
    return `${month}月${dateO}日`;
  } else if (str === 'mm:dd-hh:mm') {
    return `${month}月${dateO}日 ${hours}:${minutes}`;
  } else if (str === 'ff:mm:dd') {
    if (fullyear === newFullyear && all !== 2) {
      return `${month}月${dateO}日`;
    } else {
      return `${fullyear}年${month}月${dateO}日`;
    }
  } else if (str === 'f:mm:dd-hh:mm') {
    const fullyearTwo = fullyear.toString().slice(2, 4);
    return `${fullyearTwo}年${month}月${dateO}日 ${hours}:${minutes}`;
  } else {
    return `${fullyear}年${month}月${dateO}日 ${hours}:${minutes}`;
  }
};

// 防抖
export const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(this, args);
    }, delay);
  };
};

// 节流
export const throttled = (fn, delay) => {
  var preTime = Date.now();
  return function(...args) {
    var newTime = Date.now();
    if (newTime - preTime > delay) {
      fn && fn.apply(this, args);
      preTime = Date.now();
    }
  };
};
