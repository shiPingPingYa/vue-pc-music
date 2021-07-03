<template>
  <div  class="floor_comment" v-if="parentCommentId !== 0" >
  <div class="floor_comment_list" v-for="(item,index) in floorComments" :key="index">
  <span>@{{item.user.nickname}}: </span>
  <div>{{item.content}}</div>
  </div>
  <div :class="{'more_floor_comments':floorCommentsTitle === '获取更多....','no_more_floor_comments':floorCommentsTitle ==='暂无更多评论，快去评论吧....'}" @click="moreFloorComments">{{floorCommentsTitle}} </div>
  </div>
</template>
<script>
import { _getFloorComment } from '../../../network/comment'
export default {
  name: 'ParentCommentId',
  props: {
    parentCommentId: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      floorComments: [],
      floorCommentsTitle: '获取更多....',
      lastTime: ''
    }
  },
  async  created () {
    if (this.parentCommentId !== 0) {
      const params = {
        id: this.$parent.$parent.id,
        type: this.$parent.$parent.Type,
        parentCommentId: this.parentCommentId,
        timestamp: Date.now()
      }
      // 获取楼中楼评论消息
      const { data: { data: { comments } } } = await _getFloorComment(params)
      if (comments.length === 1) {
        this.floorComments = comments
        this.lastTime = comments[0].time
      } else {
        comments.forEach(item => this.floorComments.push(item))
        this.lastTime = comments[comments.length - 1].time
      }
    }
  },
  methods: {
    // 获取更多的楼层评论
    async  moreFloorComments () {
      const params = {
        id: this.$parent.$parent.id,
        type: this.$parent.$parent.Type,
        parentCommentId: this.parentCommentId,
        time: this.lastTime, // 评论楼层最后一个评论消息的时间,
        timestamp: Date.now() // 不缓存
      }
      const { data: { data: { comments } } } = await _getFloorComment(params)
      if (comments.length === 0) {
        this.$message.info('暂无更多楼层评论')
        this.floorCommentsTitle = '暂无更多评论，快去评论吧....'
      } else {
        comments.forEach(item => this.floorComments.push(item))
        this.lastTime = comments[comments.length - 1].time
      }
    },
    // 回复用户消息后，重新获取楼中楼评论
    getFloorComments () {
      const params = {
        id: this.$parent.$parent.id,
        type: this.$parent.$parent.Type,
        parentCommentId: this.parentCommentId
      }
      _getFloorComment(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.floor_comment{
  background: #e2e4eb;
  >.floor_comment_list{
  display: flex;
  padding: 4px 0;
  span{
    color: #1989f1;
    cursor: pointer;
  }
  div{
    margin-left: 10px;
  }
  }
}

.more_floor_comments{
  padding:0 20px 10px;
  float: right;
  color: #1989f1;
  &&:hover{
  cursor: pointer;
  }
}

.no_more_floor_comments{
   padding:0 20px 10px;
  float: right;
  color: red;
  &&:hover{
    cursor: pointer;
  }
}

</style>
