<template>
  <div class="home-page-recommends"   v-if="this.recommends.length !== 0">
    <scroll  ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()" class="hp-recommends">
    <div class="content" :style="{top:-scroolTop + 'px'}"  ref="scrollContent">
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
// 处理日期
import { formDate } from '../assets/common/tool'
export default {
  components: { Scroll },
  name: 'HomePageRecommends',
  data () {
    return {
      recommends: [],
      id: null,
      limit: 14,
      page: 1,
      notRecommends: [],
      index: 0,
      scroolTop: 0
    }
  },
  methods: {
    // 一下拉就请求数据
    async pullingUp () {
      this.notRecommends = []
      await _musicRecommend(this.id, this.limit * this.page).then(res => {
        this.notRecommends = res.data.comments
        this.page++
      })
      for (var i in this.notRecommends) {
        this.recommends.push(this.notRecommends[i])
      }
    },
    // 处理日期
    formatDate (data) {
      return formDate(new Date(data), 'mmmm--yy-dd')
    }
  },
  updated () {
    if (this.$refs.scroll !== undefined) {
      // 判断是否无了
      this.index += 88
      if (this.index > this.recommends.length - 13) this.pullingUp()
      this.$refs.scroll.scrollTo(0, -80 * 88, 800000)
    }
  },
  mounted () {
    this.$bus.$on('changeRecommends', id => {
      this.notRecommends = []
      this.recommends = []
      this.index = 0
      this.id = id
      this.page = 1
      this.pullingUp()
    })
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
  background:#dddddd;
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
