<template>
 <div class="hotComments">
    <div class="item" v-for="(item,index) in hotComments" :key="index">
    <div class="icon">
      <img :src="item.user.avatarUrl" alt="">
    </div>
    <div class="mess">
      <div class="top">
        <span>{{item.user.nickname}}:</span>
        {{item.content}}
      </div>
    <div class="bottom">
      <div class="item_time">{{_formatDate(item.time)}}</div>
    </div>
    </div>
  </div>
 </div>
</template>
<script>
import { formDate } from '../../../assets/common/tool'
export default {
  name: 'HotComments',
  props: {
    hotComments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 格式化时间
    _formatDate (data) {
      return formDate(new Date(data), 'mmmm--yy-dd')
    }
  }
}
</script>
<style lang="less" scoped>
.item{
  display: flex;
  position: relative;
  padding: 10px 0 10px 30px;
  flex-wrap: wrap;
  border-bottom: 1px solid #e3e4e6;
  .icon{
    margin-right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    > img{
      width: 100%;
      border-radius: 50%;
      background-size: 100%,100%;
    }
  }
   > .mess{
    flex: 1;
    .top{
      margin-bottom: 8px;
    span{
        color: #2e6bb0 !important;
      }
      > span:hover{
        cursor: pointer;
      }
    }
}
      .bottom{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color:#7b7d81;
    }
}

</style>
