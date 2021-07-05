<template>
  <div class="attention-dynamic">
    <scroll ref="scroll" class="scroll" :pull-up-load='true' @pullingUp="pullingUp()">
      <div class="content">
      <div class="dynamic-box">
      <div class="dynamic">
        动态
      </div>
      <div class="write-dynamic">
       <i class="el-icon-plus"></i>
       写动态
      </div>
    </div>
    <!-- 每个分享盒子 -->
  <div class="condition-dynamic" v-for="(item,index) in dynamicList" :key="index">
    <!-- 用户头像 -->
        <div class="user">
          <!-- 小log -->
          <div class="icon" v-show="item.smallImg !== ''">
            <img :src="item.smallImg + '?param=50y50'" alt="">
          </div>
          <img :src="item.userimg + '?param=18y18'" alt="">
        </div>
        <!-- 用户分享内容 -->
        <div class="transmit-content">
          <!-- 名字 -->
          <div class="name">{{item.name}}
          </div>
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
            <img :src="item.contentImg" alt="">
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
            <li v-for="(items, index) in item.pics" :key="index"><img :src="items.pcSquareUrl  + '?param=302y302'" alt=""> </li>
          </ul>
          <img v-else :src="item.pics[0].pcSquareUrl + '?param=566y566'" alt="">
        </div>
    </div>
      </div>
    </scroll>

  </div>
</template>
<script>
// 导入数据请求
import { _getEvent } from '../../../../network/friend'
// 歌曲
import { _getSongsDetail, SongDetail, _getMusicListDetail, AllSongDetail } from '../../../../network/detail'
import { indexMixin } from '../../../../views/musicListDetail/indexMixin'
// 导入方法，获取需要的请求数据
import { AttentionDynamic } from './handleUserInfo'
// 导入处理时间的函数
import { formDate, throttled } from '../../../../assets/common/tool'
import Scroll from '../../../common/scroll/Scroll'
// 节流
export default {
  name: 'AttentionDynamic',
  components: { Scroll },
  data () {
    return {
      notDynamic: [],
      dynamicList: [],
      pagesize: 20,
      page: 1,
      musicIdList: [],
      issue: [],
      RegExp: /#[^#]+#/,
      // 最后一项评论的时间
      lastTime: -1,
      musicList: []
    }
  },
  mixins: [indexMixin],
  created () {
    this.loadDynamic()
  },
  methods: {
    // 处理发布时间
    handleTime (time) {
      return formDate(new Date(time), 'mm:dd-hh:mm')
    },
    // 下拉获取动态
    pullingUp: throttled(function () {
      this.loadDynamic()
    }, 800),
    // 加载数据
    async loadDynamic () {
      this.page++
      // 请求用户关注动态
      const { data: { event, lasttime } } = await _getEvent(this.pagesize, this.$store.state.cookie, this.lastTime)
      this.lastTime = lasttime
      event.forEach(item => this.dynamicList.push(new AttentionDynamic(item)))
      this.$refs.scroll.finishPullUp()
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
      if (type === 'playlist') {
        if (flag === 0) {
          this.$router.push('/musiclistdetail/' + id)
        } else {
          console.log('歌单亲求数据')
          const { data: { playlist: { trackIds } } } = await _getMusicListDetail(id)
          const ids = trackIds.map(item => item.id).join(',')
          const { data: { songs } } = await _getSongsDetail(ids)
          songs.forEach(item => this.musicList.push(new AllSongDetail(item)))
          // 歌曲数据处理完毕
          if (songs.length === this.musicList.length) {
            this.playMusic()
          }
        }
      } else if (type === 'song') {
        const { data: { songs } } = await _getSongsDetail(id)
        this.musicList.push(new SongDetail(songs))
        this.playMusic()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.attention-dynamic{
  width: 80%;
  height: 100%;
  padding-right: 20px;
  border-right: 1px solid #949493;
  > .scroll{
  height: 100%;
  overflow: hidden;
  }
  > .content{
    width: 100%;
    height: 100%;
  }
}

.dynamic-box{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 30px;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    color: #01060a;
    > .write-dynamic{
      width: 12%;
      height: 30px;
      text-align: center;
      background-color: #ffff;
      font-size: 14px  !important;
      border-radius: 20px;
      cursor: pointer;
      i{
        color: red;
      }
    }
}

.condition-dynamic{
    display: flex;
    width: 100%;
    padding: 30px 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-top: 1px solid #949493;
     > .user{
    position: relative;
    width: 8%;
    height: 50px;
    margin-right: 8px;
    cursor: pointer;
    > .icon{
      position: absolute;
      width: 18px;
      height: 18px;
      left: 50%;
      bottom: 0;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

    }
    img{
      width: 50px;
      height: 100%;
      border-radius: 50%;
    }
   }
     > .transmit-content{
       font-size: 14px;
       color: #949395;
       flex: 1;
       > .name{
        color: rgb(25, 137, 241);
        cursor: pointer;
         span{
        display: inline-block;
        margin-left: 2px;
         }
       }
       > .transmit-time{
        color: #949395;
       }
       > .title{
         color: #01060a;
         span{
           color: rgb(25, 137, 241);
           cursor: pointer;
         }
       }
     }
}

.share_img{
  width: 100%;
  margin:10px 0 0 8%;

 > ul{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
    li{
    width: 32%;
    margin-left: 1%;
    >img{
      width: 100%;
    }
  }
 }
 > img{
   width: 60%;
 }
}

.songContent  {
  display: flex;
  justify-content: flex-start;
  width: calc( 100% - 8%);
  height: 70px;
  margin:10px 0 6px  8%;
  background: rgba(228, 224, 224, 0.877);
  opacity: 0.8;
  .content_img{
    position: relative;
    height: 100%;
    padding: 10px;
    line-height: 100%;
    img{
    display: inline-block;
    width: 50px;
    height: 50px;
    }
    .stop_music{
      position: absolute;
      top: 30%;
      right: 30%;
      margin: auto;
      img{
        width: 30px;
        height: 30px;
        color: black;
      }
    }
  }
  .content_container{
    flex: 1;
    padding: 15px 0;
    span{
      color: rgb(46, 141, 170);
      font-size: 14px;
    }
  }
}

.songContent:hover{
  opacity: 1;
  cursor: pointer;
}
</style>
