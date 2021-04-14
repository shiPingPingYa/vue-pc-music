
// 把传进来的歌曲的时间进行处理(mm:ss)
export function formDate (date, str) {
  if (str === 'mm:ss') {
    var m = date.getMinutes()
    var s = date.getSeconds()
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return `${m}:${s}`
  } else if (str === 'mm月dd日') {
    var Mm = date.getMonth() + 1
    var Dd = date.getDate()
    return `${Mm}月${Dd}日`
  } else if (str === 'mm:dd-hh:mm') {
    var Mon = date.getMonth() + 1
    var Dat = date.getDate()
    var Hh = date.getHours()
    var Minu = date.getMinutes()
    return `${Mon}月${Dat}日 ${Hh}:${Minu}`
  } else {
    var F = date.getFullYear()
    var M = date.getMonth() + 1
    var D = date.getDate()
    var H = date.getHours()
    var mm = date.getMinutes()
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
  return (...args) => {
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
