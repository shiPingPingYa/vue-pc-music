<template>
  <div ref="tabBar" class="header">
    <div class="logo">
      <img src="../../../assets/img/webSiteIcon.svg" title="小拳拳锤你">
      <div class="title">
        覃覃音乐
      </div>
    </div>
    <div class="buttons">
      <button class="el-icon-arrow-left" @click="preRouter()" />
      <button class="el-icon-arrow-right" @click="nextRouter()" />
    </div>

    <!-- 音乐搜索 -->
    <music-search />

    <!-- 用户登录 -->
    <div class="user-group">
      <div class="img-container">
        <img :src="getUserImage" @click="showLogin()">
      </div>
      <div>{{ userName }}</div>
      <div v-if="isLogin">
        <el-dropdown @command="handleDropClick">
          <span class="el-dropdown-link">
            <div class="droupdown-container">
              设置<i class="el-icon-arrow-down el-icon--right" />
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index ) in droupMenuList " :key="index" :command="item.value">
              <label v-if="index === 0" class="droup-label" @click.stop>
                <el-upload action="/avatar/upload" :headers="header" :show-file-list="false" :http-request="httpRequest">
                  <i class="el-icon-picture-outline-round" />{{ item.label }}
                </el-upload>
              </label>
              <label v-else class="droup-label"> <i :class="item.icon" /> {{ item.label }}</label>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 用户的其他信息，比如粉丝，动态，关注等等-->
      <div class="info-container">
        <div class="user-info">
          <img :src="getUserImage" alt="登录头像">
          <div class="user-name">
            {{ userName }}
          </div>
        </div>
      </div>
    </div>

    <!-- 消息通知(私信，评论，@我，通知) -->
    <private-detail v-show="isPrivate" class="private_detail" @privateNewChange="privateNewChange" />
    <!-- 消息通知的详情页面 -->
    <history-news v-if="isHistoryNews" class="private_detail" :history-list="historyList" :more="historyMore" @prePrivateDetail="prePrivateDetail" @visiableMessage="(isPrivate = false), (isHistoryNews = false)" />
  </div>
</template>
<script>
import MusicSearch from '../search/MusicSearch'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mixins } from '../user/mixins'
import { _setUserImage } from '../../../network/user'
import { _getPrivateHistoryNews, HandlePrivateHistory } from '../../../network/privateNews'
import privateDetail from '../privateMsg/privateDetail.vue'
import HistoryNews from '../privateMsg/childComps/HistoryNews.vue'
export default {
  name: 'TabBar',
  components: { MusicSearch, privateDetail, HistoryNews },
  mixins: [mixins],
  data() {
    return {
      header: {
        'Content-Type': 'multipart/form-data'
      },
      droupMenuList: [{ icon: 'el-icon-picture-outline-round', value: 'editImg', label: '修改头像' }, { icon: 'el-icon-message', value: 'messageNotify', label: '消息通知' }, { icon: 'el-icon-s-home', value: 'layout', label: '退出登录' }],
      isPrivate: false,
      isHistoryNews: false,
      historyList: [],
      privageUserId: '',
      historyMore: false
    }
  },
  computed: {
    ...mapState(['userName']),
    ...mapGetters(['getUserImage', 'isLogin'])
  },
  watch: {
    // 隐藏消息和私信内容
    $route: {
      handler() {
        this.isPrivate = false
        this.isHistoryNews = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['_GETUSERINFO']),
    preRouter() {
      this.$router.go(-1)
    },
    nextRouter() {
      this.$router.go(+1)
    },
    handleDropClick(v) {
      switch (v) {
        case 'messageNotify':
          this.isPrivate = !this.isPrivate
          this.isHistoryNews = false
          break
        case 'layout':
          this.enterLogin()
          break
      }
    },
    // 隐藏登录页面
    showLogin() {
      this.$store.commit('showLogin', !this.$store.state.isShowLogin)
      // 隐藏注册页面
      this.$store.commit('hiddenRegister')
    },
    // 退出登录
    enterLogin() {
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
    async httpRequest(item) {
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
    privateNewChange(userId) {
      this.historyList = []
      this.privageUserId = userId
      _getPrivateHistoryNews({ uid: this.privageUserId })
        .then(res => {
          res.data.msgs.forEach(item =>
            this.historyList.push(new HandlePrivateHistory(item))
          )
          this.historyList = this.historyList.reverse()
          this.historyMore = res.data.more
        })
        .then(() => {
          this.isHistoryNews = true
        })
    },
    prePrivateDetail() {
      this.isPrivate = true
      this.isHistoryNews = false
    },
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

  .user-group {
    display: flex;
    width: 37%;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    .img-container {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: pointer;
      }
      &:hover {
        .info-container {
          display: block;
        }
      }
    }

    & .droupdown-container {
      font-size: 16px;
      color: #0a0a0a;
      cursor: pointer;
    }

    & > div {
      margin-left: 10px;
    }
  }

  .droup-label {
    & i {
      font-size: 18px !important;
    }
  }

  .info-container {
    display: none;
    position: absolute;
    width: 300px;
    height: auto;
    padding: 10px;
    top: 54px;
    right: 0px;
    border: 1px solid black;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgb(241, 236, 236);
    z-index: 10000;

    .user-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & img {
        display: inline-block;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50%;
      }

      .user-name {
        margin-left: 8px;
        font-size: 20px;
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
