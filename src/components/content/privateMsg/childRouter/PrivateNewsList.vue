<template>
  <!-- 私信 -->
  <div class="private_content">
    <div class="content-list" v-if="list.length">
      <div class="content_item" v-for="item in list" :key="item.userId" @click="privateNewsChange(item.userId)">
        <div class="is_new_private" v-if="item.newMsgCount !== 0"></div>
        <div class="private_img">
          <img src="" :data-src="item.avatarurl + '?param=40y40'" alt="" v-imgLazy />
        </div>
        <div class="private_header">
          <div class="private_name">{{ item.userName }}</div>
          <div class="private_time">
            {{ handlePrivateTime(item.lasttime) }}
          </div>
          <div class="private_ablum">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="foward_prompt" v-else>
      暂无数据
    </div>
  </div>
</template>
<script>
import { privateDetailMixin } from '../indexmixin'
export default {
  name: 'PrivateNewsList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mixins: [privateDetailMixin],
  methods: {
    privateNewsChange(userId) {
      this.$parent.$parent.$emit('privateNewChange', userId) // 获取私信组件，触发方法去往私信详情页面
    }
  }
}
</script>
<style lang="less" scoped>
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
        width: 44px;
        height: 60px;
        padding-left: 4px;
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
        width: calc(100% - 54px);
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
  .foward_prompt {
    width: 100%;
    height: 30px;
    margin-top: 20%;
    line-height: 30px;
    text-align: center;
  }

  .is_new_private {
    width: 10px;
    height: 10px;
    margin-top: 30px;
    background: red;
    border-radius: 100%;
  }
</style>
