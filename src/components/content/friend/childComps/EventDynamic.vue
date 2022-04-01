<template>
  <div style="width:100%" v-if="dynamicList.length !== 0 ">
    <div class="condition-dynamic" v-for="(item,index) in dynamicList" :key="index">
      <!-- 用户头像 -->
      <div class="user">
        <!-- 小log -->
        <div class="icon" v-show="item.smallImg !== ''">
          <img :src="item.smallImg + '?param=18y18'" alt="">
        </div>
        <img src="" :data-src="item.userimg + '?param=50y50'" alt="" v-imgLazy>
      </div>
      <!-- 用户分享内容 -->
      <div class="transmit-content">
        <!-- 名字 -->
        <div class="name">{{item.name}} <span>分享{{isShareType(item.ids)}}</span> </div>
        <!-- 时间 -->
        <div class="transmit-time">
          {{handleTime(item.eventTime)}}
        </div>
        <!-- 标题 -->
        <div class="title">
          <span>{{handleTitle1(item.title)}}</span>
          {{handleTitle(item.title)}}
        </div>
      </div>
      <!-- 歌曲或mv或歌单区域 -->
      <div class="songContent" v-if="(item.ids !== false && item.ids.type !== 'mv') " @click="shareContentClick(0,item.ids.type,item.ids.id)">
        <div class="content_img" @click.stop="shareContentClick(1,item.ids.type,item.ids.id)">
          <img src="" :data-src="item.contentImg + '?param=50y50'" alt="" v-imgLazy>
          <div class="stop_music">
            <img src="../../../../assets/img/stopMusic.svg" alt="">
          </div>
        </div>
        <div class="content_container">
          {{item.contentTitle}} <br>
          <span>{{item.name}} </span>
        </div>
      </div>
      <!-- 分享图片 -->
      <div class="share_img" v-if="item.pics.length !== 0">
        <ul v-if="item.pics.length > 1">
          <li v-for="(items, index) in item.pics" :key="index">
            <img src="" :data-src="items.pcSquareUrl  + '?param=302y302'" alt="" @click.stop="showPicsList(index,item.pics)" v-imgLazy>
          </li>
        </ul>
        <img v-else src="" :data-src="item.pics[0].pcSquareUrl + '?param=566y566'" @click.stop="showPicsList(0,item.pics)" alt="" v-imgLazy>
      </div>
    </div>
  </div>
</template>
<script>
// 歌曲
import { _getSongsDetail, SongDetail, _getMusicListDetail, AllSongDetail } from '../../../../network/detail'
import { formDate } from '../../../../assets/common/tool'
// 歌曲
import { indexMixin } from '../../../../views/musicListDetail/indexMixin'
import { mapMutations } from 'vuex'
export default {
  name: 'EventDynamic',
  props: {
    dynamicList: {
      type: Array,
      defautl () {
        return []
      }
    }
  },
  data () {
    return {
      musicList: [],
      shareContentImg: [],
      shareContentImgIndex: 0,
      issue: [],
      RegExp: /#[^#]+#/
    }
  },
  mixins: [indexMixin],
  methods: {
    ...mapMutations(['setAsyncShareImag']),
    // 处理发布时间
    handleTime (time) {
      return formDate(new Date(time), 'mm:dd-hh:mm')
    },
    // 处理发布消息
    handleTitle (str) {
      if (str.trim().length >= 1 && str !== '') {
        if (!this.RegExp.test(str)) return str
        else {
          if (str.split('#')[2]) return str.split('#')[2]
          else return str.split('#')[0]
        }
      }
    },
    // 处理发布 # 中间内容
    handleTitle1 (str) {
      if (str.trim().length >= 1 && str !== '') {
        if (this.RegExp.test(str)) {
          return '#' + str.split('#')[1] + '#'
        }
      }
    },
    // 分享内容点击事件
    async shareContentClick (flag, type, id) {
      // 分享内容两种内容会触发，歌曲直接播放，歌单跳转歌单详情页面,0是分享内容条目点击，1是播放logo点击
      if (type === '歌单') {
        if (flag === 0) {
          this.$router.push('/musiclistdetail/' + id)
        } else {
          const {
            data: {
              playlist: { trackIds }
            }
          } = await _getMusicListDetail(id)
          const ids = trackIds.map(item => item.id).join(',')
          const {
            data: { songs }
          } = await _getSongsDetail(ids)
          songs.forEach(item => this.musicList.push(new AllSongDetail(item)))
          // 歌曲数据处理完毕
          if (songs.length === this.musicList.length) {
            this.playMusic()
          }
        }
      } else if (type === '歌曲') {
        const {
          data: { songs }
        } = await _getSongsDetail(id)
        this.musicList.push(new SongDetail(songs))
        this.playMusic()
      }
    },
    // 展示分享图片
    showPicsList (index, pics) {
      // index当前显示图片，pics是当前展示图片数组
      this.shareContentImg = []
      this.shareContentImgIndex = index
      if (pics.length === 1) {
        this.shareContentImg.push(pics[0].pcSquareUrl)
      } else {
        pics.forEach(item => this.shareContentImg.push(item.pcSquareUrl))
      }
      this.$emit('shaerContentImageChange', this.shareContentImgIndex, this.shareContentImg)
      this.setAsyncShareImag(true)
    },
    // 判断动态的发布类型
    isShareType (item) {
      return item === false ? '动态' : item.type
    }
  }
}
</script>
<style lang="less" scoped>
  .condition-dynamic {
    display: flex;
    width: 100%;
    padding: 30px 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-top: 1px solid #949493;
    > .user {
      position: relative;
      width: 8%;
      height: 50px;
      margin-right: 8px;
      cursor: pointer;
      > .icon {
        position: absolute;
        width: 18px;
        height: 18px;
        left: 50%;
        bottom: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      img {
        width: 50px;
        height: 100%;
        border-radius: 50%;
      }
    }
    > .transmit-content {
      font-size: 14px;
      color: #949395;
      flex: 1;
      > .name {
        color: rgb(25, 137, 241);
        cursor: pointer;
        span {
          display: inline-block;
          margin-left: 2px;
        }
      }
      > .transmit-time {
        color: #949395;
      }
      > .title {
        color: #01060a;
        span {
          color: rgb(25, 137, 241);
          cursor: pointer;
        }
      }
    }
  }

  .share_img {
    width: 100%;
    margin: 10px 0 0 8%;

    > ul {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 32%;
        margin-left: 1%;
        > img {
          width: 100%;
          min-height: 80px;
        }
      }
    }
    > img {
      width: 60%;
      min-height: 80px;
    }
  }

  .songContent {
    display: flex;
    justify-content: flex-start;
    width: calc(100% - 8%);
    height: 70px;
    margin: 10px 0 6px 8%;
    background: rgba(228, 224, 224, 0.877);
    opacity: 0.8;
    .content_img {
      position: relative;
      height: 100%;
      padding: 10px;
      line-height: 100%;
      img {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
      .stop_music {
        position: absolute;
        top: 30%;
        right: 30%;
        margin: auto;
        img {
          width: 30px;
          height: 30px;
          color: black;
        }
      }
    }
    .content_container {
      flex: 1;
      padding: 15px 0;
      span {
        color: rgb(46, 141, 170);
        font-size: 14px;
      }
    }
  }

  .songContent:hover {
    opacity: 1;
    cursor: pointer;
  }
</style>
