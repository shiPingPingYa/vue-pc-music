<template>
  <div class="user-attention-info">
    <!-- 用户朋友信息区域 -->
    <div class="user-box">
      <!-- 用户默认信息 -->
      <div class="user-info">
        <div class="user-image">
          <img :src="getUserImage" alt="" @click="goUserDetail">
        </div>
        <div class="user-id">{{userName}}</div>
        <div class="user-gender">
          <i :class="{'el-icon-male':userGender == 1}"></i>
          <i :class="{'el-icon-female':userGender == 0}" style="color:#f50707"></i>
        </div>
      </div>
      <!-- 用户关注列表 -->
      <div class="user-atttion-list">
        <!-- 用户动态 -->
        <div class="dynamic" @click="goRoute('userdynamic')">
          <p>{{userEventCount}} </p>
          <span>动态</span>
        </div>
        <!-- 用户关注列表 -->
        <div class="attention-list" @click="goRoute('userAttention')">
          <p>{{userFollows}}</p>
          <span>关注</span>
        </div>
        <!-- 用户粉丝 -->
        <div class="user-fons" @click="goRoute('userfolloweds')">
          <p>{{userFolloweds}}</p>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <topTopic :limit="limit" :isTitle="true" />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { mixins } from '@/mixins/mixinsVerify';
import topTopic from './topTopic';
export default {
  name: 'userAttentionInfo',
  data() {
    return {
      limit: 6, // 话题榜个数
    };
  },
  components: { topTopic },
  mixins: [mixins],
  computed: {
    ...mapState(['userName', 'userGender', 'userFollows', 'userFolloweds', 'userEventCount']),
    ...mapGetters(['getUserImage']),
  },
  methods: {
    goRoute(path) {
      this.$router.push(path);
    },
    goUserDetail() {
      this.$router.push('/userDetail');
    },
  },
};
</script>
<style lang="less" scoped>
  .user-attention-info {
    position: absolute;
    width: 30%;
    right: 6px;
    margin-top: -10px;
    > .user-box {
      width: 100%;
      height: 140px;
      padding: 0 20px 10px;
      font-size: 14px;
      color: #01060a;
      background: #eaebec;
      overflow: hidden;
      > .user-info {
        display: flex;
        width: 100%;
        height: 50%;
        line-height: 100%;
        justify-content: flex-start;
        align-items: center;
        > .user-image {
          width: 48px;
          height: 48px;
          margin-right: 4px;
          background-color: #fff;
          border-radius: 50%;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        > .user-id {
          margin-right: 6px;
        }
        > .user-gender {
          font-size: 16px;
          color: #0aa9e7;
        }
      }
      > .user-atttion-list {
        display: flex;
        width: 100%;
        height: 50%;
        justify-content: flex-start;
        align-items: center;
        div {
          position: relative;
          flex: 1;
          border-right: 1px solid #95979a;
          text-align: center;
          line-height: 100%;
          cursor: pointer;
          > p {
            margin-bottom: 4px;
          }
        }
        > div:nth-child(3) {
          border: 0;
        }
      }
    }
  }
</style>
