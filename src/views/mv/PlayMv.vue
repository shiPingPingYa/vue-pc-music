<template>
  <div class="play-mv" v-if="id!== null&&detail!==null">
    <scroll class="play-mv-scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
    <!-- 左边内容布局 -->
    <div class="left-layout">
      <!-- 左边头部标题-->
      <div class="title" v-if="detail !== null">
        <div class="left-mv">MV</div>
        <div class="name">{{detail.name}} </div>
        <div class="artist">{{detail.artistName}} </div>
       </div>
      <!-- 中间video视频播放标签 -->
      <div class="video">
        <video :src="url" class="video-play" width="100%" autoplay controls> </video>
      </div>
      <!-- 下面评论区 -->
      <div class="recommend">
        <p class="p">评论</p>
        <recommonds class="recds" :recommends="recommends"></recommonds>
      </div>
    </div>
    <!-- 右边内容布局 -->
    <div class="right">
      <!-- mv介绍 -->
      <div class="desc">
        <p class="p">MV介绍</p>
        <div class="base">
          <div class="data">发布时间:{{detail.publishTime}} </div>
          <div class="playCount">播放次数:{{detail.playCount}}次 </div>
          <div class="clear"></div>
        </div>
         <div class="mv-desc" v-if="detail.desc !== null">
           <!-- 防止鼠标下滑的时候，重新调用方法，mv会重复 -->
           <scroll class="desc-scroll" ref="descScroll"
           @mouseenter="enter()" @mouseleave="leave()">
              <span>简介:</span>
            {{detail.desc}}
           </scroll>
          </div>
      </div>
      <!-- 相关视频推荐 -->
      <div class="alia">
        <p class="p">相关推荐</p>
        <simi-mv-item :mvList='simiMv'></simi-mv-item>
      </div>
    </div>
    </scroll>
  </div>
</template>
<script>
// 导入封装好的better-scroll
import Scroll from '../../components/common/scroll/Scroll'
// mv的相关推荐
import SimiMvItem from '../mv/childComps/SimiMvItem'
// 评论组件
import Recommonds from '../musicListDetail/childComps/Recommends'
// 导入mv的数据请求接口
import { _getMvDetail, _getMvComment, _getMvUrl, _getSimiMv, MV } from '../../network/mv'
export default {
  name: 'PlayMv',
  components: {
    Scroll,
    SimiMvItem,
    Recommonds
  },
  data () {
    return {
      id: null,
      detail: null,
      url: null,
      recommends: null,
      offset: 1,
      limit: 20,
      simiMv: [],
      notSimiMv: []
    }
  },
  watch: {
    $route () {
      this.id = this.$route.params.id
      if (this.id !== null) {
        this.getBaseInfo()
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.id !== null) {
      this.getBaseInfo()
    }
  },
  methods: {
    // scroll一下拉就调用pullingUp方法,重新获取评论区的值
    pullingUp () {
      this.getComment()
    },
    getComment () {
      // 获取歌曲评论,offset是偏移位,limit默认20,通过$refs拿到了上面绑定的scroll,
      // :pull-up-load='true'(下拉)是否刷新,@pullingUp是下拉调用方法,

      // finishPullUp: 这个类似控制一个开关，比如在触发pullingUp事件的时候，插件肯定会把一
      // 个开关给关掉，防止用户重复上拉 在数据加载完成以后,需要执行finishPullUp()
      // 把开关打开，以便下次可以继续执行上拉刷新
      _getMvComment(this.id, this.offset * this.limit).then(res => {
        this.recommends = res.data.comments
        this.offset++
        this.$refs.scroll.finishPullUp()
      })
    },
    async getBaseInfo () {
      // 分别是mv的详情，地址，评论，相似mv
      console.log(this.id)
      await Promise.all([_getMvDetail(this.id), _getMvUrl(this.id), _getMvComment(this.id, this.limit), _getSimiMv(this.id)]).then(res => {
        this.detail = res[0].data.data
        this.url = res[1].data.data.url
        this.recommends = res[2].data.comments
        this.notSimiMv = res[3].data.mvs
        return res[2].data.comments
      })
      // 处理相似mv，获取新的mv对象(id，名字，标题,url,播放数量)
      for (var i of this.notSimiMv) {
        var mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount)
        this.simiMv.push(mv)
      }
    },
    enter () {
      this.$refs.scroll.disable()
    },
    leave () {
      this.$refs.scroll.enable()
    }
  }
}
</script>
<style lang="less" scoped>
.clear{
  clear: both;
}
.play-mv{
  padding: 0 5%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.play-mv-scroll{
  height: 100%;
}

.left-layout{
  display: inline-block;
  width: 70%;
  > .title{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > .left-mv{
      display: inline-block;
      padding: 5px;
      border: 1px solid red;
      color: red;
    }
    > .name{
      margin-left: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      color: #fff;
    }
    > .artist{
      margin-left: 5px;
      color: #828384;
      height: 24px;
      line-height: 30px;
      font-size: 14px;
      vertical-align: -4px;
    }
  }
}

.video-play{
  outline-style: none;
  z-index: 20;
}

.recommend{
  margin-top: 10px;
}
.recds{
  margin-top: 4px;
  padding: 5px 0 10px 0;
}
.right{
  padding-left: 16px;
  float: right;
  width: 30%;
  color: #828384;
}

.p{
  padding-bottom: 10px;
  font-size: 18px;
  color: #dcdde4;
}

.base{
  > .playCount{
  float: right;
  }
  > .data{
    margin-bottom: 6px;
  }
}

.mv-desc{
  margin-bottom: 15px;
  max-height: 288px;
  width: 100%;
  overflow: hidden;
    > span{
      color: #2e6bb0;
      font-size: 14px;
    }
  }
</style>
