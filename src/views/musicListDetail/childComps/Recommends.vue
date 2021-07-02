<template>
  <div class="recommond">
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10" v-model.trim="params.content"></textarea>
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
          <!-- 楼层评论 -->
          <div v-if="item.parentCommentId !== 0" :class="{'noneComments':noneRecoments}">
         <song-list-comment  class="parentCommend" :id="id" :Type="Type" :parentCommentId="item.parentCommentId "></song-list-comment>
          <div class="shaer_start" @click="noneRecoments = !noneRecoments">{{getCommentTitle}}</div>
          </div>
          <div class="bottom">
           <div class="item_time"> {{_formatDate(item.time)}}</div>
           <div class="item_right" @mouseenter="showReport = index" @mouseleave="showReport = -1">
                <div :class="{'comments_report':(showReport === index)}">举报</div>
                <div class="like_count">👍</div>
                <div class="comments_share">分享</div>
                <div class="reply">回复</div>
          </div>
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
const songListComment = () => import('./ParentCommentId.vue')
export default {
  name: 'Recommends',
  components: { songListComment },
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
      params: {
        t: '',
        id: '',
        type: '',
        content: ''
      },
      showReport: -1,
      noneRecoments: true
    }
  },
  created () {
    this.params.id = this.id
    this.params.type = this.Type
  },
  computed: {
    getCommentTitle () {
      return this.noneRecoments === false ? '收起' : '展开'
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
      if (this.params.content.length === 0) return this.$message.error('评论内容不能为空')
      this.params.t = 1
      try {
        const { data: { code } } = await sendAndRemoveComment(this.params)
        if (code === 200) {
          this.$message.success('评论发表成功')
          this.params.content = ''
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
  flex-wrap: wrap;
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
      margin-bottom: 8px;
      > span{
        color: #2e6bb0;

      }
      > span:hover{
        cursor: pointer;
      }
    }
    > .bottom{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color:#7b7d81;
    }
  }
}

.comments_report{
  display: block !important;
}

.item_right{
    display: flex;
    justify-content: flex-start;
    height: 30px;
    text-align: center;
    div{
      position: relative;
      padding: 0 10px;
    }
    div::after{
      content: "";
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 50%;
      margin-left: 10px;
      background: rgb(82, 80, 80);
    }
    div:hover{
      cursor: pointer;
    }
    div:nth-child(1){
      display: none;
    }
  }

.parentCommend{
  width: 100%;
  height: 100%;
  margin-bottom: 8px;
  overflow: hidden;
}

.noneComments{
  height: 58px;
  margin-bottom: 30px;
}

.shaer_start{
  height: 20px;
  color: rgb(128, 122, 122);
  cursor: pointer;
}
</style>
