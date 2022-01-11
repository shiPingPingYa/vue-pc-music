<template>
  <div class="private_container">
    <div class="private_tabar">
      <div v-for="(item, index) in tabbarList" :key="index" :class="{ tabbar_back: index === isTabber }" @click="isTabber = index">
        {{ item }}
        <p v-if="isTabber === index && isTabber === 0">{{ newMsgCount }}</p>
      </div>
    </div>
    <scroll class="private_content_scroll" ref="private_content_scroll" :pull-up-load="true" @pullingUp="pullingUp">
      <component :is="currentPage" :list="currentList"></component>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll.vue'
import { _getPrivateMsg, _getPrivateComments, _getPrivateMe, _getPrivateNotices, HandlePrivateMsg, HandlePrivateNotices, HandlePrivateComments } from '../../../network/privateNews'
import PrivateNewsList from './childRouter/PrivateNewsList.vue' // 私信
import PrivateCommentList from './childRouter/PrivateCommentList.vue' // 评论
import PrivateForwardList from './childRouter/PrivateForwardList.vue' // @我
import PrivateNoticesList from './childRouter/PrivateNoticesList.vue' // 通知
export default {
  name: 'privateDetail',
  components: { Scroll, PrivateNewsList, PrivateCommentList, PrivateForwardList, PrivateNoticesList },
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
  computed: {
    currentPage () {
      const pageObj = { 0: 'PrivateNewsList', 1: 'PrivateCommentList', 2: 'PrivateForwardList', 3: 'PrivateNoticesList' }
      return pageObj[this.isTabber]
    },
    currentList () {
      const pageList = { 0: 'privateNewsList', 1: 'privateCommentsList', 2: 'forwardsList', 3: 'privateNoticesList' }
      return this[pageList[this.isTabber]]
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
            const { data: { msgs, newMsgCount, more } } = await _getPrivateMsg()
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
            const { data: { msgs, newMsgCount, more } } = await _getPrivateMsg(params)
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
            const { data: { comments, more } } = await _getPrivateComments(params)
            this.commentsMore = more
            comments.forEach((item) =>
              this.privateCommentsList.push(new HandlePrivateComments(item))
            )
          } else {
            if (this.commentsMore === false) {
              return this.$message.info('没有更多评论了')
            }
            params.before = this.privateCommentsList[this.privateCommentsList.length - 1].lasttime
            const { data: { comments, more } } = await _getPrivateComments(params)
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
            const { data: { forwards, lasttime, more } } = await _getPrivateMe()
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
            const { data: { forwards, lasttime, more } } = await _getPrivateMe(params)
            this.forWradMore = more
            this.forwardLastTime = lasttime
            forwards.forEach((item) => this.forwardsList.push(item))
          }
          break
        case 3:
          // 获取通知数据
          if (flag === 0) {
            this.privateNoticesList = []
            const { data: { more, notices } } = await _getPrivateNotices()
            this.noticesMore = more
            notices.forEach((item) =>
              this.privateNoticesList.push(new HandlePrivateNotices(item))
            )
            break
          } else {
            if (this.noticesMore === false) {
              return this.$message.info('没有更多通知了')
            }
            const params = { lasttime: this.privateNoticesList[this.privateNoticesList.length - 1].lasttime }
            const { data: { notices, more } } = await _getPrivateNotices(params)
            this.noticesMore = more
            notices.forEach((item) =>
              this.privateNoticesList.push(new HandlePrivateNotices(item))
            )
          }
      }
      this.$refs.private_content_scroll.finishPullUp()
    },
    pullingUp () {
      this.initPrivateDetail(1)
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

  .tabbar_back {
    color: #fff;
    background: rgb(138, 139, 137);
  }
</style>
