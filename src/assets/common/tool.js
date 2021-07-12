
// 把传进来的歌曲的时间进行处理(mm:ss)
export function formDate (date, str) {
  if (str === 'mm:ss') {
    let m = date.getMinutes()
    let s = date.getSeconds()
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return `${m}:${s}`
  } else if (str === 'mm月dd日') {
    const Mm = date.getMonth() + 1
    const Dd = date.getDate()
    return `${Mm}月${Dd}日`
  } else if (str === 'mm:dd-hh:mm') {
    const Mon = date.getMonth() + 1
    const Dat = date.getDate()
    const Hh = date.getHours()
    const Minu = date.getMinutes()
    return `${Mon}月${Dat}日 ${Hh}:${Minu}`
  } else if (str === 'ff:mm:dd') {
    const Ff = date.getFullYear()
    const startF = new Date().getFullYear()
    const Mm = date.getMonth() + 1 > 10 ? date.getMonth() : `0${date.getMonth() + 1}`
    const D = date.getDate()
    if (Ff === startF) {
      return `${Mm}月${D}日`
    } else {
      return `${Ff}年${Mm}月${D}日`
    }
  } else {
    const F = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = date.getHours()
    let mm = date.getMinutes()
    if (mm < 10) {
      mm = `0${mm}`
    }
    return `${F}年${M}月${D}日 ${H}:${mm}`
  }
}

// 把传递进来的歌曲标题名进行处理(前后两首歌，标题名不能一样)
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
    if (timer)clearTimeout(timer)
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
