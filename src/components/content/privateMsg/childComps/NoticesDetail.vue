<template>
  <div class="notices_detail">
    通知详情页面
    <scroll class="notices_detail">
      <notices-recommends
        ref="notices_recommends"
        :recommends="recommends"
        :hotComments="hotComments"
        @moreComments="moreComments"
        @getCommends="getCommends"
      ></notices-recommends>
    </scroll>
  </div>
</template>
<script>
import { _getCommentEvent } from '../../../../network/event.js'
import { _getRecommends } from '../../../../network/detail'
const NoticesRecommends = () =>
  import('../../../../views/musicListDetail/childComps/Recommends.vue')
const scroll = () => import('../../../common/scroll/Scroll.vue')
export default {
  name: 'NoticesDetail',
  components: { NoticesRecommends, scroll },
  data () {
    return {
      threadId: '',
      type: '',
      recommends: [],
      hotComments: [],
      limit: 30
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.params.id !== '' && val.params.id !== undefined) {
          this.threadId = val.params.id
          this.type = val.params.type
          this.initPage()
        }
      }
    }
  },
  created () {
    // 区分评论类型
    this.threadId = this.$route.params.id
    this.type = this.$route.params.type
    this.initPage()
  },
  methods: {
    initPage () {
      // params的参数是string类型(这里的参数是用于区别评论的类型)
      switch (Number(this.type)) {
        case 6:
          console.log('aaa')
          _getCommentEvent({ threadId: this.threadId }).then((res) => {
            this.recommends = res.data.comments
            this.hotComments = res.data.hotComments
          })
          break
        case 2:
          _getRecommends(this.threadId, this.limit).then((res) => {
            this.recommends = res.data.comments
            this.hotComments = res.data.hotComments
          })
      }
    },
    moreComments () {
      switch (Number(this.type)) {
        case 6:
          console.log('aaa')
          _getCommentEvent({ threadId: this.threadId, offset: this.recommends.length }).then((res) => {
            res.data.comments.forEach(item => this.recommends.push(item))
            this.hotComments = res.data.hotComments.forEach
          })
          break
        case 2:
          _getRecommends(this.id, this.limit, this.recommends.length).then(
            (res) => {
              console.log(res)
              if (res.data.comments.length === 0) {
                this.$message.info('评论已经加载完毕，暂无更多评论')
                // 修改评论组件，的评论提示消息
                this.$refs.notices_recommends.recommendTitle =
                  '评论加载完毕，暂无更多.....'
              } else {
                res.data.comments.forEach((item) => this.recommends.push(item))
              }
            }
          )
      }
    },
    getCommends () {
      // 清除评论数据
      this.recommends = []
      _getRecommends(this.id, this.limit, 0).then((res) => {
        res.data.comments.forEach((item) => this.recommends.push(item))
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .notices_detail {
    width: 100%;
    height: 100%;
    padding: 20px;
    .notices_detail {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
