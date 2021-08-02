// 把传进来的歌曲的时间进行处理(mm:ss)
export function formDate (date, str, all) {
  // 获取时间
  const fullyear = date.getFullYear()
  const newFullyear = new Date().getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const dateO = date.getDate()
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
  if (str === 'mm:ss') {
    return `${minutes}:${seconds}`
  } else if (str === 'mm月dd日') {
    return `${month}月${dateO}日`
  } else if (str === 'mm:dd-hh:mm') {
    return `${month}月${dateO}日 ${hours}:${minutes}`
  } else if (str === 'ff:mm:dd') {
    if (fullyear === newFullyear && all !== 2) {
      return `${month}月${dateO}日`
    } else {
      return `${fullyear}年${month}月${dateO}日`
    }
  } else if (str === 'f:mm:dd-hh:mm') {
    const fullyearTwo = fullyear.toString().slice(2, 4)
    return `${fullyearTwo}年${month}月${dateO}日 ${hours}:${minutes}`
  } else {
    return `${fullyear}年${month}月${dateO}日 ${hours}:${minutes}`
  }
}

// 把传递进来的歌曲标题名进行处理(前后两首歌，标题名不能一样) (暂时放弃使用)
export function distinct (arr) {
  var newArr = []
  let isExist = false
  for (let i = 0, length = arr.length; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arr[i].name === arr[j].name) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      newArr.push(arr[i])
    }
    isExist = false
  }
  return newArr
}

// 防抖
export function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn && fn.apply(this, args)
    }, delay)
  }
}

// 节流
export function throttled (fn, delay) {
  var preTime = Date.now()
  return function (...args) {
    var newTime = Date.now()
    if (newTime - preTime > delay) {
      fn && fn.apply(this, args)
      preTime = Date.now()
    }
  }
}

const title = '覃覃音乐'

export function getPageTitle (pageTile) {
  if (pageTile) {
    return pageTile
  } else return title
}
