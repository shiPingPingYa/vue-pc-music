<template>
    <div class="header">
    <div class="logo">
      <img src="../../../assets/img/webSiteIcon.svg"  title="小拳拳锤你">
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
        <img :src="userImage()">
      </div>
      <div class="user-id">{{userName}}</div>
        <!-- 退出登录 -->
      <div class="enterLogin">
        <div class="enter-name">退出登录</div>
        <i class="el-icon-s-unfold" @click="enterLogin()"></i>
      </div>
    </div>

  </div>
</template>
<script>
import MusicSearch from '../search/MusicSearch'
import { mapState } from 'vuex'
import { mixins } from '../user/mixins'
export default {
  name: 'TabBar',
  components: {
    MusicSearch
  },
  computed: {
    ...mapState(['userName'])
  },
  mixins: [mixins],
  methods: {
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
      if (window.localStorage.getItem('obj')) {
        this.$confirm('此操作会退出登录,是否继续?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除本地缓存
          window.localStorage.clear('obj')
          // 跳转到首页，并重新刷新文档
          this.$router.push('/')
          window.location.reload()
          this.$message({ type: 'success', message: '已经退出' })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消' })
        })
      } else {
        this.$message.warning('还未登录')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  width: 100%;
  height: 54px;
  background-color: #f5f5f7;
  color: #0a0a0a;
  user-select: none;
}
.logo{
  position: relative;
  display: flex;
  float: left;
  width: 25%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  z-index: .8;
  > img{
    width: 36px ;
    height: 36px;
    margin-left: 10px;
    z-index: 10000;
  }
  > img:hover{
    transform:translateY(60px) scale(4) rotate(360deg);
    transition: 3s all;
  }
  > .title{
    display: inline-block;
    padding-left: 8px;
    width: 120px;
    height: 20px;
    font-size: 16px;
    color: #0a0a0a;
  }
}

.buttons{
  position: relative;
  float: left;
  width: 10%;
  height: 100%;
  line-height: 54px;
  z-index: 1;
  > button{
  display: inline-block;
  width: 30%;
  height: 26px;
  border: 0.2px solid #f5f5f7;
  color: #0a0a0a;
  outline:none;
  cursor: pointer;
  }
}

.el-icon-arrow-left ,.el-icon-arrow-right{
  font-weight: 200;
}

.userlogin{
  display: flex;
  position: relative;
  float: left;
  width: 37%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  > .user-img{
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-radius: 50%;
    line-height: 54px;
    cursor: pointer;
    > img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-size: 100%,100%;
      background-color: #fff;
    }
  }
  > .user-id{
      margin-left: 6px;
      width: calc(100% - 56% - 102px);
      font-size: 14px;
  }
  > .enterLogin{
    width: 20%;
    font-size: 14px;
    > div{
      display: inline-block;
      margin-right: 2px;
    }
    > i{
      font-size: 18px  !important;
      vertical-align: -2px;
      cursor: pointer;
    }
  }
}

</style>
