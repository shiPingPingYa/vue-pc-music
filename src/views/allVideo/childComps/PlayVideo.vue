<template>
  <div class="play-mv" v-if="id!== null&&detail!==null">
    <scroll class="play-mv-scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
    <!-- 左边内容布局 -->
    <div class="left-layout">
      <!-- 左边头部标题-->
      <div class="title" v-if="detail !== null">
        <div class="left-mv">MV</div>
        <div class="name">{{detail.title}} </div>
       </div>
      <!-- 中间video视频播放标签 -->
      <div class="video">
        <video :src="url" class="video-play" width="100%" autoplay controls> </video>
      </div>
      <!-- 下面评论区 -->
      <div class="recommend">
        <p class="p">评论</p>
        <video-recommends  class="recds"  @moreComments="moreComments" @getCommends="getCommends" :id="String(id)" :Type="5" :recommends="recommends"></video-recommends>
      </div>
    </div>
    <!-- 右边内容布局 -->
    <div class="right">
      <!-- mv介绍 -->
      <div class="desc">
        <p class="p">视频介绍</p>
        <div class="base">
          <div class="data">发布时间:{{formating(detail.publishTime)}} </div>
          <div class="playCount">播放次数:{{detail.playTime}}次 </div>
          <div class="clear"></div>
        </div>
         <div class="mv-desc" v-if="detail.desc !== null">
           <!-- 防止鼠标下滑的时候，重新调用方法，mv会重复 -->
           <scroll class="desc-scroll" ref="descScroll"
           @mouseenter="enter()" @mouseleave="leave()">
              <span>简介:</span>
            {{isDescription(detail.description)}}
           </scroll>
          </div>
      </div>
      <!-- 相关视频推荐 -->
      <div class="alia">
        <p class="p">相关推荐</p>
        <si-mi-video-item :videoList="simiVideo" ></si-mi-video-item>
      </div>
    </div>
    </scroll>
  </div>
</template>
<script>
// 导入封装好的better-scroll
import Scroll from '../../../components/common/scroll/Scroll'
// 导入推荐video组件
import SiMiVideoItem from './SiMiVideoItem'
// 导入video的数据请求接口
import { Video, _getVideoDetail, _getVideoUrl, _getVideoComment, _getRelatedVideo } from '../../../network/video'
// 导入工具函数处理时间,导入节流函数
import { formDate } from '../../../assets/common/tool'
// 导入评论组件
const videoRecommends = () => import('../../musicListDetail/childComps/Recommends.vue')
export default {
  name: 'PlayVideo',
  components: {
    Scroll,
    SiMiVideoItem,
    videoRecommends
  },
  data () {
    return {
      id: null,
      detail: null,
      url: null,
      recommends: null,
      offset: 1,
      limit: 20,
      simiVideo: [],
      notSimiVideo: []
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.params.id !== undefined && val.params.id !== null) {
          this.id = this.$route.params.id
          this.getBaseInfo()
        }
      },
      deep: true
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.id !== null) {
      this.getBaseInfo()
    }
    // 触发停止音乐播放的方法
    this.$emit('stopMusic')
  },
  methods: {
    async getBaseInfo () {
      // 清空上一次的数据
      this.notSimiVideo = []
      this.simiVideo = []
      // 获取video的详情，播放地址，评论，推荐视频
      await Promise.all([_getVideoDetail(this.id), _getVideoUrl(this.id), _getVideoComment(this.id, this.limit), _getRelatedVideo(this.id)]).then(res => {
        this.detail = res[0].data.data
        this.url = res[1].data.urls[0].url
        this.recommends = res[2].data.comments
        this.notSimiVideo = res[3].data.data
      })
      // 处理相关视频
      for (var i in this.notSimiVideo) {
        var mv = new Video(this.notSimiVideo[i])
        this.simiVideo.push(mv)
      }
    },
    // 格式化时间
    formating (time) {
      return formDate(new Date(time), 'ff:mm:yy')
    },
    // 判断是否有简历
    isDescription (des) {
      return des || '视频暂无简介'
    },
    enter () {
      this.$refs.scroll.disable()
    },
    leave () {
      this.$refs.scroll.enable()
    },
    // 获取mv评论内容
    async  moreComments () {
      const { data: { comments } } = await _getVideoComment(this.id, this.limit, this.recommends.length)
      // 评论已经被请求完毕
      if (comments.length === 0) {
        this.$Message.info('评论已经加载完毕，暂无更多评论')
        // 修改评论组件，评论提示消息
        this.$refs.songList_recommends.recommendTitle = '评论加载完毕，暂无更多.....'
      } else {
        // 遍历添加请求成功后的歌单评论
        comments.forEach(item => this.recommends.push(item))
      }
    },
    // 发送评论后，重新获取评论
    getCommends () {
      // 清除评论数据
      this.recommends = []
      _getVideoComment(this.id, this.limit, 0).then(res => {
        res.data.comments.forEach(item => this.recommends.push(item))
      })
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
      color: #01060a;
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
  color: #01060a;
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
