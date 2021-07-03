<template>
  <div class="recommond">
    <div class="desc">
      <div class="language">
        <textarea ref="textarea_comments" @keypress.enter="submitCommends" name id cols="30" rows="10"  v-model.trim="params.content">   </textarea>
      </div>
      <div class="sub" @click="submitCommends">评论</div>
    </div>

    <!-- 评论区域 -->
    <div class="content"  v-if="recommends.length !== 0">
      <p>精彩评论</p>
    <comments-content >
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
          <div  v-if="item.parentCommentId !== 0"  :class="{'noneComments':noneRecoments !== index,'noneComments_noHeight':item.parentCommentId === 0}">
         <song-list-comment :ref="`parentCommentId${item.commentId}`"  class="parentCommend" :id="id" :Type="Type" :parentCommentId="item.parentCommentId " ></song-list-comment>
          <div class="shaer_start" @click="setNoneComments(index)">{{getCommentTitle(index)}}</div>
          </div>
          <div class="bottom">
           <div class="item_time"> {{_formatDate(item.time)}}</div>
           <div class="item_right" @mouseenter="showReport = index" @mouseleave="showReport = -1">
                <div :class="{'comments_report':(showReport === index)}">举报</div>
                <div class="like_count" @click="setCommentsLikedCount(item.commentId)">
                  <span v-if="likeCount !== item.commentId"><img  src="../../../assets/img/clickLike.svg" alt="">{{item.likedCount}} </span>
                  <span v-else style="color:red"><img  src="../../../assets/img/is_clickLike.svg" alt="">{{item.likedCount}}  </span>
                </div>
                <div class="comments_share">分享</div>
                <div class="reply" @click="replyComments(item.commentId,item.user.nickname)">回复</div>
          </div>
          </div>
        </div>

      </div>
    </comments-content>
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
import { sendAndRemoveComment, _setCommentsLikedCount } from '../../../network/comment'
const commentsContent = () => import('../../../components/common/scroll/Scroll.vue')
// 楼中楼评论组件，用异步调用声明一个新的组件实例
const songListComment = () => import('./ParentCommentId.vue')
export default {
  name: 'Recommends',
  components: { songListComment, commentsContent },
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
      noneRecoments: -1,
      // 区别其他回复和消息回复,
      reply: 0,
      likeCount: ''
    }
  },
  watch: {
    params: {
      // 评论内容为空时，重新将其定义为一般回复
      handler (val) {
        if (val.content === '') {
          this.reply = 0
        }
      },
      deep: true
    }
  },
  created () {
    this.params.id = this.id
    this.params.type = this.Type
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
      if (this.reply === 0) {
        if (this.params.content.length === 0) return this.$message.error('评论内容不能为空')
        this._sendAndRemoveComment()
      } else {
        // 评论内容不能为空和没有@+name值
        if (this.params.content.length !== 0 && this.params.content.includes('@') && this.params.content.includes(':')) {
          this._sendAndRemoveComment()
        } else {
          this.$message.info('内容不能为空，且必须按照@：name名，形式来评论,请重新点击回复')
          this.params.content = ''
          this.reply = 0
        }
        // 重置消息回复判断值
        this.reply = 0
      }
    },
    // 回复评论
    replyComments (commentId, userName) {
      this.params.content = `@${userName}:`
      this.params.commentId = commentId
      this.reply = 1
      this.$nextTick(function () {
        // DOM 更新了
        this.$refs.textarea_comments.focus()
      })
      this.$parent.scrollTo(0, 0, 200)
    },
    // 评论方法封装
    async _sendAndRemoveComment () {
      this.params.t = 1
      try {
        const { data: { code } } = await sendAndRemoveComment(this.params)
        if (code === 200) {
          this.$message.success('评论发表成功')
          this.params.content = ''
          this.params.commentId = ''
          this.$emit('getCommends')
        }
      } catch (e) {
        this.$message.error(e.response.data.message)
      }
    },
    // 评论点赞
    async setCommentsLikedCount (commentId) {
      this.likeCount = commentId
      const params = {
        id: this.id,
        cid: commentId,
        t: 1,
        type: this.Type
      }
      const { data: { code } } = await _setCommentsLikedCount(params)
      if (code === 200) this.$emit('getCommends')
      else {
        this.$message.error('点赞失败')
      }
    },
    setNoneComments (index) {
      if (this.noneRecoments === index) this.noneRecoments = -1
      else {
        this.noneRecoments = index
      }
    },
    getCommentTitle (index) {
      return this.noneRecoments === index ? '收起' : '展开'
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
  height: 54px;
  margin-bottom: 30px;
}

.noneComments_noHeight{
  height: 0 !important;
}

.shaer_start{
  height: 20px;
  color: rgb(128, 122, 122);
  cursor: pointer;
}

.like_count{
  img{
    width: 20px;
    height: 15px;
    vertical-align: -2px;
  }
}
</style>
