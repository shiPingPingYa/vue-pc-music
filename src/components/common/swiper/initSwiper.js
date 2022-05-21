export function _Swiper (oSwiper) {
  // 接收传递过来的swiperdom对象
  var swiper = oSwiper
  // 右按钮
  var pre = swiper.getElementsByClassName('pre')[0]
  // 左按钮
  var next = swiper.getElementsByClassName('next')[0]
  // 右边背景
  var left = swiper.getElementsByClassName('left')[0]
  // 左边背景
  var right = swiper.getElementsByClassName('right')[0]
  // li标签
  var li = swiper.querySelectorAll('li')
  // span小线条
  var span = swiper.querySelectorAll('span')

  // li标签的类名
  var name = []
  var currentIndex = 0
  // 为类名数组添加类名
  for (var i = 0, length = li.length; i < length; i++) {
    name.push(li[i].classList[0])
  }

  // 控制span的样式
  setCurrentSpan()
  // span的点击事件
  swicthSpanClick()
  // 定时调用nextPic
  var timer = setInterval(() => {
    nextPic()
  }, 3000)

  // 鼠标进入轮播图和移出轮播图
  swiper.onmouseover = function () {
    // 清除定时器
    clearInterval(timer)
    pre.style.display = 'block'
    next.style.display = 'block'
    left.onclick = function () {
      prePic()
    }
    right.onclick = function () {
      nextPic()
    }
  }
  swiper.onmouseout = function () {
    // 清除定时器
    clearInterval(timer)
    timer = setInterval(() => {
      nextPic()
    }, 6000)
    pre.style.display = 'none'
    next.style.display = 'none'
  }

  function swicthSpanClick () {
    for (let i = 0, length = span.length; i < length; i++) {
      span[i].index = i
      span[i].onclick = function () {
        for (let j = 0, length = span.length; j < length; j++) {
          span[j].className = ''
        }
        this.className = 'action'
        // 判断点击位置是否超出当前正在循环的currentIndex
        if (this.index > currentIndex) {
          for (let i = currentIndex, length = this.index; i < length; i++) {
            // 调整li的类名
            swicthNext()
          }
          // 添加类名
          addClass()
        } else {
          for (let i = this.index, length = currentIndex; i < length; i++) {
            // 调整li的类名
            switchPre()
          }
          // 添加类名
          addClass()
        }
        currentIndex = this.index
      }
    }
  }
  // 下一张图片
  function nextPic () {
    // 控制类名数组
    swicthNext()
    // 为li添加类名
    addClass()
    currentIndex++
    // 判断currentIndex是否溢出
    if (currentIndex > 5) currentIndex = 0
    // 设置span样式
    setCurrentSpan()
  }

  function prePic () {
    // 控制类名数组
    switchPre()
    // 为li添加类名
    addClass()
    currentIndex--
    // 判断currentIndex是否溢出
    if (currentIndex < 0) currentIndex = 5
    // 设置span样式
    setCurrentSpan()
  }

  // 为li添加类名
  function addClass () {
    for (let i = 0, length = li.length; i < length; i++) {
      li[i].setAttribute('class', name[i])
    }
  }

  function setCurrentSpan () {
    for (let i = 0, length = span.length; i < length; i++) {
      // 排它
      span[i].className = ''
    }
    span[currentIndex].className = 'action'
  }

  function swicthNext () {
    name.unshift(name[name.length - 1])
    name.pop()
  }

  function switchPre () {
    name.push(name[0])
    name.shift()
  }
}
