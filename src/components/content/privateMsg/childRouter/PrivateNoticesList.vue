<template>
  <div class="private_content">
    <div
      class="content_item"
      v-for="item in privateNoticesList"
      :key="item.id"
      v-show="privateNoticesList.length !== 0"
      @click="goNoticesDetail(item.threadId, item.type)"
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
</template>
<script>
import { privateDetailMixin } from '../indexmixin'
export default {
  name: 'PrivateNoticesList',
  props: {
    privateNoticesList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mixins: [privateDetailMixin],
  methods: {
    goNoticesDetail (id, type) {
      if (id === '' || id === undefined) return true
      else {
        this.$router.push('/noticesDetail/' + id + '/' + type)
      }
      this.$parent.isPrivate = false
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
</style>
