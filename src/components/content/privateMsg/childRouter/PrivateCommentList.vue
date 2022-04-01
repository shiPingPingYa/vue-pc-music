<template>
  <div class="private_content">
    <div class="content-list" v-if="list.length">
      <div class="content_item" v-for="item in list" :key="item.id">
        <div class="private_img">
          <img src="" :data-src="item.avatarUrl + '?param=40y40'" alt="" v-imgLazy />
        </div>
        <div class="private_header">
          <div class="private_comments_name">{{ item.nickname }}</div>
          <div class="private_comments_time">
            <span>{{ handlePrivateTime(item.lasttime) }}</span>
          </div>
          <div class="private_title">回复我:{{ item.title }}</div>
          <div class="private_comments_ablum">{{ item.content }}</div>
          <div class="private_comments_replay">
            <img src="../../../../assets/img/replay.svg" alt="" />回复
          </div>
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
  name: 'PrivateCommentList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mixins: [privateDetailMixin]
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
