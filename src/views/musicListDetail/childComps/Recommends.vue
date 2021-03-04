<template>
  <div class="recommond">
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10"></textarea>
      </div>
      <div class="sub">评论</div>
    </div>

    <!-- 评论区域 -->
    <div class="content">
      <p>精彩评论</p>
      <div class="item" v-for="(item,index) in recommends" :key="index">
        <div class="icon">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="mess">
          <div class="top">
            <span>
              {{item.user.nickname}}:
            </span>
            {{item.content}}
          </div>
          <div class="bottom">
            {{_formatDate(item.time)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入工具函数,处理日期
import { formDate } from '../../../assets/common/tool'
export default {
  name: 'Recommends',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      },
      id: {
        type: String,
        default () {
          return ''
        }
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
.recommond{
  width: 100%;
  > .desc{
    padding: 10px;
    height: 105px;
    background-color: #1c1e23;
    >.language{
      height: 60px;
      > textarea{
        padding-left: 10px;
        width: 100%;
        height: 100%;
        border: none;
        outline-style: none;
        color: #fff;
        background-color: #2b2c31;
      }
    }
    > .sub{
      float: right;
      margin-top: 4px;
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 6px;
      cursor: pointer;
      color: #fff;
      background-color: #2b2c31;
    }
  }
}

.content{
  width: 100%;
  font-size: 13px;
  color: #7b7d81;
  > p{
    padding-bottom: 6px;
    padding-top: 20px;
    border-bottom: 1px solid #23262c;
  }
}

.item{
  display: flex;
  position: relative;
  padding: 10px 0px 10px 30px;
  border-bottom: 1px solid #23262c;
  > .icon{
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
    > .top{
      margin-bottom: 14px;
      > span{
        color: #2e6bb0;
      }
    }
    > .bottom{
      position: absolute;
      bottom: 6px;
      font-size: 12px;
      color:#7b7d81;
    }
  }
}
</style>
