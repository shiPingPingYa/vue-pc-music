<template>
  <div class="user-dynamic">
    <h1>{{userName}}的动态</h1>
    <scroll class="user_dynamic" :pull-up-load='true' @pullingUp="pullingUp()">
      <!-- <div class="condition-dynamic" v-for="(item,index) in dynamicList" :key="index"> -->
      <!-- 用户头像 -->
      <!-- <div class="user"> -->
      <!-- 小log -->
      <!-- <div class="icon" v-show="item.smallImg !== ''"> -->
      <!-- <img :src="item.smallImg + '?param=18y18'" alt=""> -->
      <!-- </div>
        </div> -->
      <!-- 用户分享内容 -->
      <!-- <div class="transmit-content"> -->
      <!-- 名字 -->
      <!-- <div class="name">{{item.name}} <span>分享{{isShareType(item.ids)}}</span> </div> -->
      <!-- 时间 -->
      <!-- <div class="transmit-time">
            {{handleTime(item.eventTime)}}
          </div> -->
      <!-- 标题 -->
      <!-- <div class="title">
            <span>{{handleTitle1(item.title)}}</span>
            {{handleTitle(item.title)}}
          </div>
        </div> -->
      <!-- 歌曲或mv或歌单区域 -->
      <!-- <div class="songContent" v-if="(item.ids !== false && item.ids.type !== 'mv') " @click="shareContentClick(0,item.ids.type,item.ids.id)">
          <div class="content_img" @click.stop="shareContentClick(1,item.ids.type,item.ids.id)">
            <img :src="item.contentImg + '?param=50y50'" alt="">
            <div class="stop_music">
              <img src="../../../../assets/img/stopMusic.svg" alt="">
            </div>
           </div>
          <div class="content_container">
           {{item.contentTitle}} <br>
           <span>{{item.name}} </span>
          </div>
        </div> -->
      <!-- 分享图片 -->
      <!-- <div class="share_img" v-if="item.pics.length !== 0">
          <ul v-if="item.pics.length > 1">
            <li v-for="(items, index) in item.pics" :key="index"><img :src="items.pcSquareUrl  + '?param=302y302'" alt="" @click.stop="showPicsList(index,item.pics)"> </li>
          </ul>
          <img v-else :src="item.pics[0].pcSquareUrl + '?param=566y566'"  @click.stop="showPicsList(0,item.pics)" alt="">
        </div>
    </div> -->
    </scroll>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { _getUserSendEvent } from '../../../../network/event'
export default {
  name: 'UserDynamic',
  computed: {
    ...mapState(['userName', 'uid'])
  },
  data() {
    return {
      lasttime: -1,
      userSendEventList: []
    }
  },
  async created() {
    // const params = {
    //   uid: this.uid,
    //   lasttime: this.lasttime
    // }
    // await _getUserSendEvent(params).then(res => {
    //   res.data.events.forEach(item => console.log(item))
    //   console.log(JSON.parse(res.data.events[2].json))
    //   console.log(JSON.parse(JSON.parse(res.data.events[2].json).event.json))
    // })
    // 用户发送动态不同类型的参数弄不明白，暂时放弃该组件
  },
  methods: {
    pullingUp() {
      console.log('aa')
    }
  }
}
</script>
<style lang="less" scoped>
  .user-dynamic {
    width: 100%;
    height: 100%;
    h1 {
      padding-bottom: 6px;
      font-size: 16px;
      font-weight: normal;
      border-bottom: 1px solid #949395;
    }
    .user_dynamic {
      width: 100%;
      height: calc(100% - 29px);
      overflow: hidden;
    }
  }

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
        }
      }
    }
    > img {
      width: 60%;
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
