<template>
  <div class="lyric" v-if="lyric !== ''">
    <scroll ref="scroll" class="lyric-scroll">
      <ul>
        <li v-for="(item,index) in lyricArray" :key="index" :class="{action:lyricIndex == index}">
          {{item.lyric}}
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll'
// 导入封装好的处理歌词方法
import { LyricItem } from './playList'
export default {
  name: 'Lyric',
  components: { Scroll },
  props: {
    lyric: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      lyricArray: [],
      lyricIndex: -1,
      maxIndex: 0,
      length: 0
    }
  },
  watch: {
    // 监听歌词，歌词一发生变化重新格式化歌词
    lyric () {
      this.lyricIndex = -1
      this.maxIndex = 0
      this.parseLyric(this.lyric)
    }
  },
  methods: {
    // 格式化歌词
    parseLyric (lyric) {
      var RegExp = /\[(\d*:\d*\.\d*)\]/
      // 歌词数组，时间数组，歌词，处理后的歌词和时间数组
      var arr = []; var timeArr = []; var lyricArr = []; var mergeArr = []

      // 切割数组
      arr = lyric.split('\n')
      for (var i of arr) {
        // 切割歌词
        var lrc = i.split(']')[1]
        // 判断歌词是否为空
        if (lrc === '' || lrc === undefined) continue
        lyricArr.push(lrc)

        // 获取时间字符串
        var resTime = RegExp.exec(i)[1]
        // 切割时间字符串
        var resTime2 = resTime.split(':')
        var min = parseInt(resTime2[0]) * 60
        var sec = parseFloat(resTime2[1])
        var time = parseFloat(Number(min + sec).toFixed(2))// toFixed返回值是String
        timeArr.push(time)
      }
      // 合并数组
      for (let i = 0, length = timeArr.length; i < length; i++) {
        var obj = new LyricItem(timeArr[i], lyricArr[i])
        mergeArr.push(obj)
      }
      // 将数组按照从小到大排序
      this.lyricArray = mergeArr.sort((a, b) => {
        return a.time - b.time
      })
      this.length = this.lyricArray.length
    }
  }
}
</script>
<style lang="less" scoped>
.lyric{
  height: 100%;
}

.lyric-scroll{
  height: 100%;
  overflow: hidden;
}

.lyric{
  > ul{
    text-align: center;
    list-style-type: none;
  }
}
ul li{
      padding: 8px 0;
      height: 30px;
      color: #fff;
      font-size: 14px ;
}

.action{
  font-size: 18px;
  color: #b82525;
}
</style>
