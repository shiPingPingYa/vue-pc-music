<template>
  <div class="user-follows">
    <scroll ref="scroll" class="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
      <div class="user-name">
        {{userName}}的粉丝
      </div>
      <div class="follows-content">
        <div class="follows-user" v-for="(item,index) in followList" :key="index">
          <!-- 用户头像 -->
          <div class="user-box">
            <div class="icon"></div>
            <div class="image">
              <img src="" :data-src="item.userImg  + '?param=50y50'" alt="" v-imgLazy>
            </div>
          </div>
          <!-- 用户内容 -->
          <div class="user-content">
            <div class="user_name">{{item.name}}</div>
            <div class="user-title">{{item.title}} </div>
            <div class="user-info">
              <p>歌单:<span>{{item.songList}} </span></p>
              <p>粉丝:<span>{{item.followeds}}</span></p>
            </div>
          </div>
          <!-- 私信 -->
          <div class="private-user">
            <i class="el-icon-chat-line-square"></i>私信
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
// 导入数据接口
import { _getUserFons } from '../../../../network/friend'
// 处理请求好的数据
import { Aollows } from '../childComps/handleUserInfo'
// 节流
import { throttled } from '../../../../assets/common/tool'
import { mapState } from 'vuex'
export default {
  name: 'UserFolloweds',
  data() {
    return {
      followList: [],
      notFollowList: [],
      page: 1,
      limit: 30
    }
  },
  computed: {
    ...mapState(['userName', 'uid'])
  },
  created() {
    this.loadFollows()
  },
  methods: {
    // 下拉刷新数据
    pullingUp: throttled(function () {
      this.loadFollows()
    }, 800),
    async loadFollows() {
      const params = {
        uid: this.uid || localStorage.getItem('userId'),
        offset: this.followList.length
      }
      _getUserFons(params).then(res => {
        this.notFollowList = res.data.followeds.forEach(item => this.followList.push(new Aollows(item)))
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .user-follows {
    width: 100%;
    height: 100%;
  }

  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .user-name {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    line-height: 40px;
    border-bottom: 1px solid #949395;
    font-size: 16px;
    font-weight: 400;
    color: #01060a;
  }

  .follows-content {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    font-size: 12px;
    color: #949395;
    > .follows-user {
      position: relative;
      display: flex;
      width: 30%;
      height: 80px;
      padding: 2px;
      margin-bottom: 20px;
      margin-right: 3.3%;
      border: 1px solid rgb(212, 212, 212);
      background: rgb(247, 243, 243);
      opacity: 0.8;
      > .user-box {
        width: 54px;
        height: 100%;
        margin-right: 10px;
        border-radius: 50%;
        cursor: pointer;
      }
      > .user-content {
        width: 160px;
        height: 100%;
        > .user_name {
          font-size: 14px;
          color: #01060a;
        }
        > .user-title {
          width: 100%;
          height: 20px;
          margin-top: 4px;
          margin-bottom: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        > .user-info {
          width: 100%;
          height: 20px;
          p {
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
      > .private-user {
        position: absolute;
        width: 46px;
        height: 40%;
        margin-right: 4px;
        right: 0;
        top: 50%;
        text-align: center;
        line-height: 30px;
        transform: translateY(-50%);
        background-color: #ffff;
        color: #01060a;
      }
    }
    > div:hover {
      opacity: 1;
    }
  }

  .image {
    position: absolute;
    width: 54px;
    height: 54px;
    top: 14%;
    line-height: 76px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      min-height: 54px;
      border-radius: 50%;
    }
  }
</style>
