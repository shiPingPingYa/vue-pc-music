<template>
  <div  class="floor_comment" >
  <div class="floor_comment_list" v-for="item in floorComments" :key="item.commentId">
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
      floorComments: '',
      floorCommentsTitle: '获取更多....',
      lastTime: ''
    }
  },
  created () {
    const params = {
      id: this.$parent.id,
      type: this.$parent.Type,
      parentCommentId: this.parentCommentId
    }
    _getFloorComment(params).then(res => {
      this.floorComments = res.data.data.comments
      // 获取最后一个楼层评论的时间
      this.lastTime = res.data.data.comments[res.data.data.comments.length - 1].time
    })
  },
  methods: {
    // 获取更多的楼层评论
    async  moreFloorComments () {
      const params = {
        id: this.$parent.id,
        type: this.$parent.Type,
        parentCommentId: this.parentCommentId,
        time: this.lastTime
      }
      const { data: { data: { comments } } } = await _getFloorComment(params)
      if (comments.length === 0) {
        this.$message.info('暂无更多楼层评论')
        this.floorCommentsTitle = '暂无更多评论，快去评论吧....'
      } else {
        comments.forEach(item => this.floorComments.push(item))
        this.lastTime = comments[comments.length - 1].time
      }
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
