<template>
  <div class="recommond" >
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10" v-model.trim="content"></textarea>
      </div>
      <div class="sub" @click="submitCommends">评论</div>
    </div>

    <!-- 评论区域 -->
    <div class="content"  v-if="recommends.length !== 0">
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
    <div class="content"  v-else-if="recommends.length == 0">
      <p>精彩评论</p>
      <div class="item">暂无评论，快去评论吧。。。</div>
    </div>
    <div class="more-comments" @click="moreComments">{{recommendTitle}}</div>
  </div>
</template>
<script>
// 导入工具函数,处理日期
import { formDate } from '../../../assets/common/tool'
import { sendAndRemoveComment } from '../../../network/comment'
export default {
  name: 'Recommends',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    },
    id: {
      type: String,
      default () {
        return ''
      }
    },
    Type: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      // 评论提示内容
      recommendTitle: '更多评论....',
      content: ''
    }
  },
  methods: {
    // 格式化时间
    _formatDate (data) {
      return formDate(new Date(data), 'mmmm--yy-dd')
    },
    // 获取更多评论消息
    moreComments () {
      this.$emit('moreComments')
    },
    // 发表在歌单下面的评论
    async submitCommends () {
      if (this.content.length === 0) return this.$message.error('评论内容不能为空')
      const params = {
        t: 1,
        id: this.id,
        type: this.Type,
        content: this.content
      }
      try {
        const { data: { code } } = await sendAndRemoveComment(params)
        if (code === 200) {
          this.$message.success('评论发表成功')
          this.content = ''
          this.$emit('getCommends')
        }
      } catch (e) {
        console.log(e)
        this.$message.error(e.response.data.message)
      }
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
    background-color: #e2e4eb;
    >.language{
      height: 60px;
      > textarea{
        padding-left: 10px;
        width: 100%;
        height: 100%;
        border: none;
        outline-style: none;
        color: #2e6bb0;
        font-weight: bold;
        background-color: #fff;
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
      color: #2b2c31;
      background-color: #fff;
    }
  }
  > .more-comments{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #2e6bb0;
    cursor: pointer;
  }
}

.content{
  width: 100%;
  font-size: 13px;
  color: #000a0d;
  > p{
    padding-bottom: 6px;
    padding-top: 20px;
    border-bottom: 1px solid #e3e4e6;
  }
}

.item{
  display: flex;
  position: relative;
  padding: 10px 0px 10px 30px;
  border-bottom: 1px solid #e3e4e6;
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
      > span:hover{
        cursor: pointer;
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
