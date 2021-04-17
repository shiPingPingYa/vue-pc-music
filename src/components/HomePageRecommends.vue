<template>
  <div class="home-page-recommends" @mouseover="stopComments()" @mouseout.stop="startComments()"   v-if="this.recommends.length !== 0">
    <scroll  ref="scroll"  class="hp-recommends">
    <div class="content"  >
        <!-- 图片区域 -->
      <div class="item" v-for="(item,index) in this.recommends" :key="index">
        <!-- 评论人 -->
           <div class="top">
             <div class="icon">
               <img :src="item.user.avatarUrl" alt="">
             </div>
             <div class="title">
               <div class="name">{{item.user.nickname}} </div>
               <div class="time">{{formatDate(item.time)}} </div>
             </div>
           </div>
           <!-- 评论内容 -->
           <div class="bottom">
             {{item.content}}
           </div>
        </div>
      </div>
    </scroll>
  </div>

</template>
<script>
import Scroll from './common/scroll/Scroll.vue'
// 获取评论请求
import { _musicRecommend } from '../network/detail'
// 处理日期,防抖
import { formDate, debounce } from '../assets/common/tool'
export default {
  components: { Scroll },
  name: 'HomePageRecommends',
  data () {
    return {
      recommends: [],
      id: null,
      limit: 100,
      index: 0,
      scrollY: '',
      // 滚动的判断条件
      scrollFlag: false
    }
  },
  created () {
    this.$bus.$on('changeRecommends', id => {
      this.recommends = []
      this.getRecommends(id)
    })
  },
  methods: {
    // 处理日期
    formatDate (data) {
      return formDate(new Date(data), 'mmmm--yy-dd')
    },
    async getRecommends (id) {
      await _musicRecommend(id, this.limit).then(res => {
        this.recommends = res.data.comments
      }).then(() => {
        // 评论滚动
        if (!this.scrollFlag) {
          this.scrollFlag = true
          if (this.$refs.scroll !== undefined) {
          // 判断是否无了
            this.index++
            if (this.index !== this.recommends.length - 13) {
              this.$refs.scroll.scrollBy(0, -30 * (this.limit - 13), 240000)
            }
          }
        }
      })
    },
    // 停止滚动
    stopComments () {
      this.scrollFlag = true
      // 停止滚动
      this.$refs.scroll.stop()
      // 获取当前滚动到的y坐标
      this.scrollY = this.$refs.scroll.getScrollY()
      this.$refs.scroll.finishPullUp()
    },
    // 继续滚动
    startComments: debounce(function () {
      this.scrollFlag = false
      if (!this.scrollFlag) {
        // 判断是否就剩一页了
        if (this.$refs.scroll.getScrollY() < ((this.limit.length - 11) * -70)) return
        this.$refs.scroll.scrollBy(0, -30 * (this.limit - 11), 240000 + this.scrollY)
      }
    }, 2000)
  }
}
</script>
<style lang="less" scoped>
.home-page-recommends{
  position: absolute;
  width: 19.8%;
  height: 100%;
  left: 0;
  top: 0;
  background:#f5f5f7;
  opacity: 0.8;
  > .content{
    position: absolute;
    width: 80%;
    height: 100%;
    margin-top: 20%;
    color: #0a0a0a;

  }
}

.hp-recommends{
  height: 100%;
  overflow: hidden;
}

.item{
  position: relative;
  padding: 10px 0px 10px 30px;
  border-bottom: 1px solid #c7cccc;
  overflow: hidden;
  > .top{
    display: flex;
    width: 100%;
    align-items: center;
    > .icon{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      > img{
        width: 100%;
        height: 100%;
        background-size: 100%,100%;
        border-radius: 50%;
      }
    }
    > .title{
          .name{
            font-size: 14px;
            color: red;
          }

          .time{
            font-size: 12px;
          }
    }
}
 > .bottom{
          display: -webkit-box;
          max-height: 60px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
  }
}

</style>
