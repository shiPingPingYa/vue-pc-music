<template>
  <div class="private_container">
    <div class="private_tabar">
      <div
        v-for="(item, index) in tabbarList"
        :key="index"
        :class="{ tabbar_back: index === isTabber }"
        @click="isTabber = index"
      >
        {{ item }}
        <p v-if="isTabber === index && isTabber === 0">{{ newMsgCount }}</p>
      </div>
    </div>
    <scroll
      class="private_content_scroll"
      ref="private_content_scroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <!-- 私信 -->
      <div class="private_content" v-show="isTabber === 0">
        <div
          class="content_item"
          v-for="item in privateNewsList"
          :key="item.userId"
          v-show="privateNewsList.length !== 0"
          @click="privateNewsChange(item.userId)"
        >
          <div class="private_img">
            <img :src="item.avatarurl + '?param=40y40'" alt="" />
          </div>
          <div class="private_header">
            <div class="private_name">{{ item.userName }}</div>
            <div class="private_time">
              {{ handlePrivateTime(item.lasttime) }}
            </div>
            <div class="private_ablum">{{ item.title }}</div>
          </div>
        </div>
        <div class="foward_prompt" v-show="privateNewsList.length === 0">
          暂无数据
        </div>
      </div>
      <!-- 评论 -->
      <div class="private_content" v-show="isTabber === 1">
        <div
          class="content_item"
          v-for="item in privateCommentsList"
          :key="item.id"
          v-show="privateCommentsList.length !== 0"
        >
          <div class="private_img">
            <img :src="item.avatarUrl + '?param=40y40'" alt="" />
          </div>
          <div class="private_header">
            <div class="private_comments_name">{{ item.nickname }}</div>
            <div class="private_comments_time">
              <span>{{ handlePrivateTime(item.lasttime) }}</span>
            </div>
            <div class="private_title">回复我:{{ item.title }}</div>
            <div class="private_comments_ablum">{{ item.content }}</div>
            <div class="private_comments_replay">
              <img src="../../../assets/img/replay.svg" alt="" />回复
            </div>
          </div>
        </div>
        <div class="foward_prompt" v-show="privateCommentsList.length === 0">
          暂无数据
        </div>
      </div>
      <!-- @我 -->
      <div class="forward_content" v-show="isTabber === 2">
        <div class="foward_prompt" v-show="forwardsList.length === 0">
          暂无数据
        </div>
      </div>
      <!-- 通知 -->
      <div class="private_content" v-show="isTabber === 3">
        <div
          class="content_item"
          v-for="item in privateNoticesList"
          :key="item.id"
          v-show="privateNoticesList.length !== 0"
          @click="goNoticesDetail(item.threadId,item.type)"
        >
          <div class="private_img">
            <img :src="item.avatarUrl + '?param=40y40'" alt="" />
          </div>
          <div class="private_header">
            <div class="private_name">
              {{ item.nickname }}<span>{{ item.title }}</span>
            </div>
            <div class="private_time">
              {{ handlePrivateTime(item.lasttime) }}
            </div>
            <div class="private_ablum">{{ item.content }}</div>
          </div>
        </div>
        <div class="foward_prompt" v-show="privateNoticesList.length === 0">
          暂无数据
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll.vue'
import { formDate } from '../../../assets/common/tool'
import {
  _getPrivateMsg,
  _getPrivateComments,
  _getPrivateMe,
  _getPrivateNotices,
  HandlePrivateMsg,
  HandlePrivateNotices,
  HandlePrivateComments
} from '../../../network/privateNews'
export default {
  name: 'privateDetail',
  components: { Scroll },
  data () {
    return {
      tabbarList: ['私信', '评论', '@我', '通知'],
      isTabber: 0,
      // 私信数量
      newMsgCount: 0,
      privateNewsList: [],
      NewsMore: '',
      // 通知及
      privateNoticesList: [],
      noticesLastTime: '',
      noticesMore: '',
      // @我以及返回数据的时间
      forwardsList: [],
      forwardLastTime: '',
      forWradMore: '',
      // 评论消息
      privateCommentsList: [],
      commentsUpdateTime: '',
      // 是否还有评论数据
      commentsMore: '',
      userId: ''
    }
  },
  watch: {
    isTabber () {
      this.initPrivateDetail(0)
    }
  },
  created () {
    this.initPrivateDetail(0)
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    async initPrivateDetail (flag) {
      switch (this.isTabber) {
        case 0:
          // 获取私信数据
          if (flag === 0) {
            this.privateNewsList = []
            const {
              data: { msgs, newMsgCount, more }
            } = await _getPrivateMsg()
            this.NewsMore = more
            this.newMsgCount = newMsgCount
            msgs.forEach((item) =>
              this.privateNewsList.push(new HandlePrivateMsg(item))
            )
          } else {
            if (this.NewsMore === false) {
              return this.$message.info('没有更多私信了')
            }
            const params = {
              offset: this.privateNewsList.length
            }
            const {
              data: { msgs, newMsgCount, more }
            } = await _getPrivateMsg(params)
            this.NewsMore = more
            this.newMsgCount = newMsgCount
            msgs.forEach((item) =>
              this.privateNewsList.push(new HandlePrivateMsg(item))
            )
          }
          break
        case 1:
          // 获取评论数据
          var params = {
            uid: this.userId
          }
          if (flag === 0) {
            this.privateCommentsList = []
            const {
              data: { comments, more }
            } = await _getPrivateComments(params)
            this.commentsMore = more
            comments.forEach((item) =>
              this.privateCommentsList.push(new HandlePrivateComments(item))
            )
          } else {
            if (this.commentsMore === false) {
              return this.$message.info('没有更多评论了')
            }
            params.before =
              this.privateCommentsList[
                this.privateCommentsList.length - 1
              ].lasttime
            const {
              data: { comments, more }
            } = await _getPrivateComments(params)
            this.commentsMore = more
            comments.forEach((item) =>
              this.privateCommentsList.push(new HandlePrivateComments(item))
            )
          }
          break
        case 2:
          // 获取@我数据
          if (flag === 0) {
            this.forwardsList = []
            const {
              data: { forwards, lasttime, more }
            } = await _getPrivateMe()
            this.forWradMore = more
            if (forwards.length === 0) {
              return this.$message.info('暂无@我的消息')
            } else {
              this.forwardLastTime = lasttime
              forwards.forEach((item) => this.forwardsList.push(item))
            }
          } else {
            if (this.forWradMore === false) {
              return this.$message.info('没有更多@我的消息了')
            }
            const params = {
              offset: this.forwardsList.length
            }
            const {
              data: { forwards, lasttime, more }
            } = await _getPrivateMe(params)
            this.forWradMore = more
            this.forwardLastTime = lasttime
            forwards.forEach((item) => this.forwardsList.push(item))
          }
          break
        case 3:
          // 获取通知数据
          if (flag === 0) {
            this.privateNoticesList = []
            const {
              data: { notices, more }
            } = await _getPrivateNotices()
            this.noticesMore = more
            notices.forEach((item) =>
              this.privateNoticesList.push(new HandlePrivateNotices(item))
            )
            break
          } else {
            if (this.noticesMore === false) {
              return this.$message.info('没有更多通知了')
            }
            const params = {
              lasttime:
                this.privateNoticesList[this.privateNoticesList.length - 1]
                  .lasttime
            }
            const {
              data: { notices, more }
            } = await _getPrivateNotices(params)
            this.noticesMore = more
            notices.forEach((item) =>
              this.privateNoticesList.push(new HandlePrivateNotices(item))
            )
          }
      }
      this.$refs.private_content_scroll.finishPullUp()
    },
    handlePrivateTime (time) {
      return formDate(new Date(time), 'ff:mm:dd')
    },
    pullingUp () {
      this.initPrivateDetail(1)
    },
    goNoticesDetail (id, type) {
      if (id === '' || id === undefined) return true
      else {
        this.$router.push('/noticesDetail/' + id + '/' + type)
      }
      this.$parent.isPrivate = false
    },
    privateNewsChange (userId) {
      this.$emit('privateNewChange', userId)
    }
  }
}
</script>
<style lang="less" scoped>
  .private_container {
    width: 40%;
    height: 88%;
    padding-top: 20px;
    box-shadow: 0 1px 8px #fff;
    background: #fff;
    .private_tabar {
      display: flex;
      width: 80%;
      margin: 0 10%;
      justify-content: flex-start;
      border: 1px solid #828385;
      border-radius: 10px;
      div {
        position: relative;
        width: 25%;
        height: 40px;
        border-right: 1px solid #828385;
        text-align: center;
        line-height: 40px;
        z-index: 100;
        &:hover {
          cursor: pointer;
          background: rgb(194, 194, 193);
          z-index: 10;
        }
        p {
          position: absolute;
          width: 40%;
          height: 70%;
          right: -10%;
          top: -30%;
          border: 4px solid #fff;
          line-height: 130%;
          font-size: 14px !important;
          border-radius: 10px;
          background: red;
        }
      }
      div:nth-child(4) {
        border-right: 0;
      }
    }
    .private_content_scroll {
      height: calc(100% - 40px);
      overflow: hidden;
    }
  }

  .private_content {
    width: 98%;
    height: 100%;
    padding: 4px 0 0 2px;
    .content_item {
      display: flex;
      padding: 4px 0 0 10px;
      margin-bottom: 10px;
      justify-content: flex-start;
      &:hover {
        cursor: pointer;
        background: rgb(240, 238, 238);
      }
      .private_img {
        width: 40px;
        height: 60px;
        border-radius: 100%;
        img {
          display: inline-block;
          width: 100%;
          height: 40px;
          margin-top: 10px;
          border-radius: 100%;
        }
      }
      .private_header {
        flex: 1;
        width: calc(100% - 40px);
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .private_name {
          color: rgb(22, 140, 236);
          span {
            color: #828385;
          }
        }
        .private_time {
          padding-right: 20px;
          color: rgb(160, 154, 154);
        }
      }
    }
  }

  .private_ablum {
    width: 100%;
    height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tabbar_back {
    color: #fff;
    background: rgb(138, 139, 137);
  }

  .foward_prompt {
    width: 100%;
    height: 30px;
    margin-top: 20%;
    line-height: 30px;
    text-align: center;
  }

  .private_comments_name {
    width: 50%;
    color: rgb(22, 140, 236);
  }

  .private_comments_time {
    width: 50%;
    text-align: right;
  }

  .private_comments_ablum {
    width: 100%;
    padding: 6px 0;
    background: rgb(246, 239, 239);
  }

  .private_comments_replay {
    width: 100%;
    text-align: right;
    color: rgb(160, 154, 154);
    img {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: -8px;
      color: rgb(160, 154, 154);
    }
  }
</style>
