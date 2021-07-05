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
            <img :src="item.smallImg" alt="">
          </div>
          <img :src="item.userimg" alt="">
        </div>
        <!-- 用户分享内容 -->
        <div class="transmit-content">
          <!-- 名字 -->
          <div class="name">{{item.name}}
            <span>分享{{issue[index]}}</span>
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
        <!-- 分享图片 -->
        <div class="share_img" v-if="item.pics.length !== 0">
          <ul v-if="item.pics.length > 1">
            <li v-for="(items, index) in item.pics" :key="index"><img :src="items.pcRectangleUrl" alt=""> </li>
          </ul>
          <img v-else :src="item.pics[0].pcRectangleUrl" alt="">
        </div>
    </div>
      </div>
    </scroll>

  </div>
</template>
<script>
// 导入数据请求
import { _getEvent } from '../../../../network/friend'
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
      lasttime: -1,
      RegExp: /#[^#]+#/

    }
  },
  async created () {
    this.loadDynamic()
  },
  methods: {
    // 处理发布时间
    handleTime (time) {
      return formDate(new Date(time), 'mm:dd-hh:mm')
    },
    // 判断发布了什么,song单曲，mv视频，playlist歌单，event转发
    handleIssueDynamic (obj) {
      if (obj.song !== undefined) {
        this.issue.push('单曲')
      } else if (obj.mv !== undefined) {
        this.issue.push('mv')
      } else if (obj.playlist !== undefined) {
        this.issue.push('歌单')
      } else if (obj.event !== undefined) {
        this.issue.push('转发')
      }
    },
    // 下拉获取动态
    pullingUp: throttled(async function () {
      this.loadDynamic()
    }, 800),
    // 加载数据
    async loadDynamic () {
      var notDynamic = []
      // 请求用户关注动态
      try {
        await _getEvent(this.pagesize * this.page, this.$store.state.cookie, this.lasttime).then(res => {
          this.lasttime = res.data.lasttime
          notDynamic = res.data.event
        }).catch(e => {
          if (e.data.code === 301) {
            throw new Error(e.data.msg)
          }
        })
      } catch (e) {
        this.$message.warning(e.message)
      }
      for (var i of notDynamic) {
      // 解析发布数据
        var dynamic = new AttentionDynamic(i)
        this.dynamicList.push(dynamic)
        // 判断发布类型
        this.handleIssueDynamic(dynamic.Info)
        console.log(dynamic.pics)
      }

      this.page++
      this.$refs.scroll.finishPullUp()
    },
    // 处理发布消息
    handleTitle (str) {
      if (str.trim().length >= 1 && str !== '') {
        if (!this.RegExp.test(str)) return str
        else {
          return str.split('#')[2]
        }
      }
    },
    // 处理连接
    handleTitle1 (str) {
      if (str.trim().length >= 1 && str !== '') {
        if (this.RegExp.test(str)) {
          return '#' + str.split('#')[1] + '#'
        }
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
      right: 0;
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
  margin-left: 8%;
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
   width: 100%;
   height: 400px;
 }
}

</style>
