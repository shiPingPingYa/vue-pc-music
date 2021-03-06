<template>
  <div class="header">
    <div class="logo">
      <i class="el-icon-platform-eleme" style="color:red"></i>
     <div class="title">慧慧音乐</div>
    </div>
    <div class="buttons">
      <button class="el-icon-arrow-left" @click="preRouter()"></button>
      <button class="el-icon-arrow-right" @click="nextRouter()"></button>

    </div>
    <!-- 音乐搜索 -->
    <music-search></music-search>
    <!-- 用户登录 -->
    <div class="userlogin">
      <div class="user-img">
        <img src="../../../assets/img/userimg.png">
      </div>
      <div class="user-id">乱了浮华了</div>
    </div>
  </div>
</template>
<script>
import MusicSearch from '../search/MusicSearch'
export default {
  name: 'TabBar',
  components: {
    MusicSearch
  },
  methods: {
    preRouter () {
      this.$router.go(-1)
    },
    nextRouter () {
      this.$router.go(+1)
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  width: 100%;
  height: 54px;
  background-color: #212025;
}
.logo{
  display: flex;
  float: left;
  width: 25%;
  height: 100%;
  align-items: center;
  cursor: pointer;
  position: relative;
  > i{
    display: inline-block;
    margin-left: 22px;
    padding: 6px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 16px;
    color: #1d1c21;
    background-color: #fff;
  }
  > .title{
    display: inline-block;
    padding-left: 8px;
    width: 120px;
    height: 20px;
    font-size: 16px;
    color: #fff;
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
  width: 50%;
  height: 26px;
  border: 1px solid #18171c;
  color: #fff;
  background-color: #212025;
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
    padding: 1px;
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-radius: 50%;
    line-height: 54px;
    > img{
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-size: 100%,100%;
      background-color: #fff;
    }
  }
  > .user-id{
      margin-left: 6px;
      width: calc(100% - 56% - 32px);
      color: #96959a;
      font-size: 14px;
  }
}

.el-icon-platform-eleme{
    color: red;
}
</style>
