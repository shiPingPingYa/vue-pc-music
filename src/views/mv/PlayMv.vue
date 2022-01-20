<template>
  <div class="play-mv">
    <scroll class="play-mv-scroll" ref="scroll" :pull-up-load="true" v-if="!pageLoading">
      <!-- 左边内容布局 -->
      <div class="left-layout">
        <!-- 左边头部标题-->
        <div class="title">
          <div class="left-mv">MV</div>
          <div class="name">{{ detail.name }}</div>
          <div class="artist">{{ detail.artistName }}</div>
        </div>
        <!-- 中间video视频播放标签 -->
        <div class="video">
          <video :src="url" class="video-play" width="100%" autoplay controls @ended="handleVideoEnd"></video>
        </div>
        <!-- 下面评论区 -->
        <div class="recommend">
          <p class="p">评论</p>
          <mv-recommends class="recds" ref="songList_recommends" @moreComments="moreComments" @getCommends="getCommends" :id="String(id)" :Type="1" :recommends="recommends"></mv-recommends>
        </div>
      </div>
      <!-- 右边内容布局 -->
      <div class="right">
        <!-- mv介绍 -->
        <div class="desc">
          <p class="p">MV介绍</p>
          <div class="base">
            <div class="data">发布时间:{{ detail.publishTime }}</div>
            <div class="playCount">播放次数:{{ detail.playCount }}次</div>
            <div class="clear"></div>
          </div>
          <div class="mv-desc">
            <!-- 防止鼠标下滑的时候，重新调用方法，mv会重复 -->
            <scroll class="desc-scroll" ref="descScroll" @mouseenter="enter()" @mouseleave="leave()">
              <span>简介:</span>
              {{ isDescription(detail.desc) }}
            </scroll>
          </div>
        </div>
        <!-- 相关视频推荐 -->
        <div class="alia">
          <p class="p">相关推荐</p>
          <simi-mv-item ref="simi_mv_item" :mvList="simiMv"></simi-mv-item>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
// 导入封装好的better-scroll
import Scroll from 'common/scroll/Scroll'
// mv的相关推荐
import SimiMvItem from '../mv/childComps/SimiMvItem'
// 导入mv的数据请求接口
import { _getMvDetail, _getMvComment, _getMvUrl, _getSimiMv } from 'api/mv'
// 评论组件
const mvRecommends = () => import('../musicListDetail/childComps/Recommends')
export default {
  name: 'PlayMv',
  components: {
    Scroll,
    SimiMvItem,
    mvRecommends
  },
  data () {
    return {
      id: null,
      detail: null,
      url: null,
      recommends: null,
      limit: 30,
      simiMv: [],
      simiMvIndex: 0,
      pageLoading: false
    }
  },
  watch: {
    '$route.params.id': {
      handler (val) {
        this.id = val
        this.getBaseInfo()
      },
      deep: true
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.id && this.getBaseInfo()
    // 停止播放音乐
    this.$bus.$emit('stopMusic', false)
  },
  methods: {
    // 获取播放mv默认信息
    async getBaseInfo () {
      this.pageLoading = true
      this.simiMv = []
      // 分别是mv的详情，地址，评论，相似mv
      await Promise.all([
        _getMvDetail({ mvid: this.id }),
        _getMvUrl({ id: this.id }),
        _getMvComment({ id: this.id, limit: this.limit }),
        _getSimiMv({ mvid: this.id })
      ]).then(res => {
        this.pageLoading = false
        this.detail = res[0].data.data
        this.url = res[1].data.data.url
        this.recommends = res[2].data.comments
        this.simiMv = res[3].data.mvs.map(item => {
          return {
            id: item.id,
            cover: item.cover || item.imgurl || item.picUrl,
            name: item.name,
            artist: item.artistName,
            count: item.playCount
          }
        })
      })
    },
    // 判断是否有简介
    isDescription (desc) {
      return desc || 'MV暂无简介'
    },
    enter () {
      this.$refs.scroll.disable()
    },
    leave () {
      this.$refs.scroll.enable()
    },
    // 获取mv评论内容
    async moreComments () {
      const params = {
        id: this.id,
        limit: this.limit,
        offset: this.recommends.length
      }
      const {
        data: { comments }
      } = await _getMvComment(params)
      // 评论已经被请求完毕
      if (comments.length === 0) {
        this.$Message.info('评论已经加载完毕，暂无更多评论')
        // 修改评论组件，评论提示消息
        this.$refs.songList_recommends.recommendTitle =
          '评论加载完毕，暂无更多.....'
      } else {
        // 遍历添加请求成功后的歌单评论
        comments.forEach(item => this.recommends.push(item))
      }
    },
    // 发送评论后，重新获取评论
    getCommends () {
      // 清除评论数据
      this.recommends = []
      _getMvComment({ id: this.id, limit: this.limit }).then(res => {
        res.data.comments.forEach(item => this.recommends.push(item))
      })
    },
    // 视频播放完毕自动播放相似视频
    handleVideoEnd () {
      this.$refs.simi_mv_item.playMV(this.simiMv[this.simiMvIndex].id)
      if (this.simiMvIndex++ > 4) this.simiMvIndex = 0
    }
  }
}
</script>
<style lang="less" scoped>
  .clear {
    clear: both;
  }
  .play-mv {
    padding: 0 5%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .play-mv-scroll {
    height: 100%;
  }

  .left-layout {
    display: inline-block;
    width: 70%;
    > .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      > .left-mv {
        display: inline-block;
        padding: 5px;
        border: 1px solid red;
        color: red;
      }
      > .name {
        margin-left: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 18px;
        color: #01060a;
      }
      > .artist {
        margin-left: 5px;
        color: #828384;
        height: 24px;
        line-height: 30px;
        font-size: 14px;
        vertical-align: -4px;
      }
    }
  }

  .video-play {
    outline-style: none;
    z-index: 20;
  }

  .recommend {
    margin-top: 10px;
  }
  .recds {
    margin-top: 4px;
    padding: 5px 0 10px 0;
  }
  .right {
    padding-left: 16px;
    float: right;
    width: 30%;
    color: #828384;
  }

  .p {
    padding-bottom: 10px;
    font-size: 18px;
    color: #01060a;
  }

  .base {
    > .playCount {
      float: right;
    }
    > .data {
      margin-bottom: 6px;
    }
  }

  .mv-desc {
    margin-bottom: 15px;
    max-height: 288px;
    width: 100%;
    overflow: hidden;
    > span {
      color: #2e6bb0;
      font-size: 14px;
    }
  }
</style>
