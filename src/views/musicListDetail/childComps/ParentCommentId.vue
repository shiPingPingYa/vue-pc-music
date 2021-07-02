<template>
  <div  class="floor_comment" >
  <div class="floor_comment_list" v-for="item in floorComments" :key="item.commentId">
  <span>@{{item.user.nickname}}: </span>
  <div>{{item.content}}</div>
  </div>
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
      floorComments: ''
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
    })
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
</style>
