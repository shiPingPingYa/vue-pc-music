<template>
  <div class="floor_comment" v-if="parentCommentId !== 0">
    <div class="floor_comment_list" v-for="(item, index) in floorComments" :key="index">
      <span>{{ item.user.nickname }}: </span>
      <div>{{ item.content }}</div>
    </div>
    <div
      :class="{ more_floor_comments: floorCommentsTitle === '获取更多....', no_more_floor_comments: floorCommentsTitle === '暂无更多评论，快去评论吧....' }"
      @click="getMoreFloorComments"
    >
      {{ floorCommentsTitle }}
    </div>
  </div>
</template>
<script>
import { _getFloorComment } from '@/network/comment';
export default {
  name: 'floorRecommend',
  props: {
    Type: {
      type: [Number, String],
      default: () => 0 || '0'
    },
    id: {
      type: [Number, String],
      default: () => 0 || '0'
    },
    parentCommentId: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      floorComments: [],
      floorCommentsTitle: '获取更多....',
      lastTime: ''
    };
  },
  created() {
    this.parentCommentId && this.initFloorRecommend();
  },
  methods: {
    // 获取楼中楼评论消息
    async initFloorRecommend() {
      const params = {
        id: this.id,
        type: this.Type,
        parentCommentId: this.parentCommentId,
        timestamp: Date.now()
      };
      const {
        data: {
          code,
          data: { comments }
        }
      } = await _getFloorComment(params);
      if (code == 200) {
        if (comments.length === 1) {
          this.floorComments = comments;
          this.lastTime = comments[0].time;
        } else {
          comments.forEach(item => this.floorComments.push(item));
          this.lastTime = comments[comments.length - 1].time;
        }
      }
    },
    // 获取更多的楼层评论
    async getMoreFloorComments() {
      const params = {
        id: this.id,
        type: this.Type,
        parentCommentId: this.parentCommentId,
        time: this.lastTime, // 评论楼层最后一个评论消息的时间,
        timestamp: Date.now() // 不缓存楼层消息
      };
      const { data } = await _getFloorComment(params);
      if (data.code == 200) {
        let { comments } = data.data;
        if (comments.length === 0) {
          this.$message.info('暂无更多楼层评论');
          this.floorCommentsTitle = '暂无更多评论，快去评论吧....';
        } else {
          comments.forEach(item => this.floorComments.push(item));
          this.lastTime = comments[comments.length - 1].time;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.floor_comment {
  background: #e2e4eb;
  > .floor_comment_list {
    display: flex;
    padding: 4px 0;
    span {
      color: #1989f1;
      cursor: pointer;
    }
    div {
      margin-left: 10px;
    }
  }
}

.more_floor_comments {
  float: right;
  padding: 0 20px 10px;
  color: #1989f1;
  &:hover {
    cursor: pointer;
  }
}

.no_more_floor_comments {
  float: right;
  padding: 0 20px 10px;
  color: red;
  pointer-events: none;
}
</style>
