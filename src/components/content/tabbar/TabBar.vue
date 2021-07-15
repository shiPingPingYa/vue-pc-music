<template>
  <div class="header" ref="tabBar">
    <div class="logo">
      <img src="../../../assets/img/webSiteIcon.svg" title="小拳拳锤你" />
      <div class="title">覃覃音乐</div>
    </div>
    <div class="buttons">
      <button class="el-icon-arrow-left" @click="preRouter()"></button>
      <button class="el-icon-arrow-right" @click="nextRouter()"></button>
    </div>
    <!-- 音乐搜索 -->
    <music-search></music-search>
    <!-- 用户登录 -->
    <div class="userlogin">
      <div class="user-img" @click="showLogin()">
        <img :src="getUserImage" />
      </div>
      <div class="user-id">{{ userName }}</div>
      <div
        class="news"
        v-show="isLogin"
        @click="(isPrivate = !isPrivate), (isHistoryNews = false)"
      >
        <img src="../../../assets/img/news.svg" alt="" />
      </div>
      <!-- 退出登录 -->
      <div class="enterLogin" v-show="isLogin">
        <el-upload
          action="/avatar/upload"
          :headers="header"
          :show-file-list="false"
          :http-request="httpRequest"
        >
          <i class="el-icon-picture-outline-round"></i>
        </el-upload>
        <i class="el-icon-s-unfold" @click="enterLogin()"></i>
      </div>
    </div>
    <private-detail
      class="private_detail"
      v-show="isPrivate"
      @privateNewChange="privateNewChange"
    ></private-detail>
    <history-news
      class="private_detail"
      v-if="isHistoryNews"
      :historyList="historyList"
      :more="historyMore"
      @prePrivateDetail="prePrivateDetail"
      @cancelHistory="cancelHistory"
      @hideStatus="(isPrivate = false), (isHistoryNews = false)"
    ></history-news>
  </div>
</template>
<script>
import MusicSearch from '../search/MusicSearch'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mixins } from '../user/mixins'
import { _setUserImage } from '../../../network/user'
import {
  _getPrivateHistoryNews,
  HandlePrivateHistory
} from '../../../network/privateNews'
import privateDetail from '../privateMsg/privateDetail.vue'
import HistoryNews from '../../../views/newsDetail/HistoryNews.vue'
export default {
  name: 'TabBar',
  components: { MusicSearch, privateDetail, HistoryNews },
  mixins: [mixins],
  computed: {
    ...mapState(['userName']),
    ...mapGetters(['getUserImage', 'isLogin'])
  },
  data () {
    return {
      header: {
        'Content-Type': 'multipart/form-data'
      },
      isPrivate: false,
      isHistoryNews: false,
      historyList: [],
      privageUserId: '',
      historyMore: false
    }
  },
  watch: {
    // 隐藏消息和私信内容
    $route: {
      handler () {
        this.isPrivate = false
        this.isHistoryNews = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['_GETUSERINFO']),
    preRouter () {
      this.$router.go(-1)
    },
    nextRouter () {
      this.$router.go(+1)
    },
    // 隐藏登录页面
    showLogin () {
      this.$store.commit('showLogin', !this.$store.state.isShowLogin)
      // 隐藏注册页面
      this.$store.commit('hiddenRegister')
    },
    // 退出登录
    enterLogin () {
      // 判断是否登录
      if (window.localStorage.getItem('userId')) {
        this.$confirm('此操作会退出登录,是否继续?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store.commit('setIslogin', false)
            window.localStorage.clear('userId')
            window.location.reload()
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消' })
          })
      } else {
        this.$message.warning('还未登录')
      }
    },
    async httpRequest (item) {
      const isType =
        item.file.type === 'image/jpeg' || item.file.type === 'image/png'
      if (!isType) return this.$message.error('请选择正确的文件')
      var uploadImage = new FormData()
      uploadImage.append('imgFile', item.file)
      const {
        data: {
          data: { code }
        }
      } = await _setUserImage(uploadImage)
      if (code === 200) {
        this.$message.success('头像修改成功')
        await this._GETUSERINFO(localStorage.getItem('userId'))
      }
    },
    privateNewChange (userId) {
      this.historyList = []
      this.privageUserId = userId
      _getPrivateHistoryNews({ uid: this.privageUserId })
        .then((res) => {
          res.data.msgs.forEach((item) =>
            this.historyList.push(new HandlePrivateHistory(item))
          )
          this.historyList = this.historyList.reverse()
          this.historyMore = res.data.more
        })
        .then(() => {
          this.isHistoryNews = true
        })
    },
    prePrivateDetail () {
      this.isPrivate = true
      this.isHistoryNews = false
    },
    cancelHistory () {
      this.isPrivate = true
      this.isHistoryNews = false
    }
  }
}
</script>
<style lang="less" scoped>
  .header {
    width: 100%;
    height: 54px;
    background-color: #f5f5f7;
    color: #0a0a0a;
    user-select: none;
  }
  .logo {
    position: relative;
    display: flex;
    float: left;
    width: 25%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    z-index: 0.8;
    > img {
      width: 36px;
      height: 36px;
      margin-left: 10px;
      z-index: 10000;
    }
    > img:hover {
      transform: translateY(60px) scale(4) rotate(360deg);
      transition: 3s all;
    }
    > .title {
      display: inline-block;
      padding-left: 8px;
      width: 120px;
      height: 20px;
      font-size: 16px;
      color: #0a0a0a;
    }
  }

  .buttons {
    position: relative;
    float: left;
    width: 10%;
    height: 100%;
    line-height: 54px;
    z-index: 1;
    > button {
      display: inline-block;
      width: 30%;
      height: 26px;
      border: 0.2px solid #f5f5f7;
      color: #0a0a0a;
      outline: none;
      cursor: pointer;
    }
  }

  .el-icon-arrow-left,
  .el-icon-arrow-right {
    font-weight: 200;
  }

  .userlogin {
    display: flex;
    position: relative;
    float: left;
    width: 37%;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    > .user-img {
      width: 32px;
      height: 32px;
      background-color: #fff;
      border-radius: 50%;
      line-height: 54px;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: 100%, 100%;
        background-color: #fff;
      }
    }
    > .user-id {
      margin-left: 6px;
      width: calc(100% - 56% - 102px);
      font-size: 14px;
    }
    > .enterLogin {
      width: 20%;
      font-size: 14px;
      > div {
        display: inline-block;
        margin-right: 2px;
      }
      > i {
        display: inline-block;
        padding: 0 0 0 20px;
        font-size: 30px !important;
        vertical-align: -2px;
        cursor: pointer;
      }
    }
    .news {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .el-icon-picture-outline-round {
    display: inline-block;
    font-size: 30px !important;
    vertical-align: -2px;
  }

  .private_detail {
    position: absolute;
    top: 54px;
    right: 0;
    z-index: 10000;
  }
</style>
