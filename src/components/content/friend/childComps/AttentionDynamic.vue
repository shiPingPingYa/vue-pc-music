<template>
  <div class="attention-dynamic">
    <scroll ref="scroll" class="scroll" :pull-up-load='true' @pullingUp="pullingUp()">
      <div class="content">
      <div class="dynamic-box">
      <div class="dynamic">
        动态
      </div>
      <div class="write-dynamic">
       <i class="el-icon-plus"></i>
       写动态
      </div>
    </div>
    <!-- 每个分享盒子 -->
      <event-dynamic :dynamicList="dynamicList" @shaerContentImageChange="shaerContentImageChange" ></event-dynamic>
      </div>
    </scroll>
   <!-- 展示分享图片 -->
      <alert-image v-if="asyncShareImag"  :index="shareContentImgIndex" :urlList="shareContentImg"></alert-image>
  </div>
</template>
<script>
// 导入数据请求
import { _getEvent } from '../../../../network/friend'

// 导入方法，获取需要的请求数据
import { AttentionDynamic } from './handleUserInfo'
// 导入处理时间的函数
import { throttled } from '../../../../assets/common/tool'
import Scroll from '../../../common/scroll/Scroll'
import { mapState, mapMutations } from 'vuex'
const eventDynamic = () => import('./EventDynamic.vue')
const AlertImage = () => import('../childRouter/AlertImage.vue')
export default {
  name: 'AttentionDynamic',
  components: { Scroll, AlertImage, eventDynamic },
  data () {
    return {
      dynamicList: [],
      pagesize: 20,
      page: 1,
      // 最后一项评论的时间
      lastTime: -1,
      shareContentImg: [],
      shareContentImgIndex: 0
    }
  },
  computed: {
    ...mapState(['asyncShareImag'])
  },
  created () {
    this.loadDynamic()
  },
  methods: {
    ...mapMutations(['setAsyncShareImag']),
    // 下拉获取动态
    pullingUp: throttled(function () {
      this.loadDynamic()
    }, 800),
    // 加载数据
    async loadDynamic () {
      // 用户关注动态
      const params = {
        pagesize: this.pagesize,
        lasttime: this.lastTime
      }
      const { data: { event, lasttime } } = await _getEvent(params)
      this.lastTime = lasttime
      event.forEach(item => this.dynamicList.push(new AttentionDynamic(item)))
      this.$refs.scroll.finishPullUp()
    },
    // 获取动态组件传递的图片下标和图片数组
    shaerContentImageChange (urlIndex, urlList) {
      this.shareContentImgIndex = urlIndex
      this.shareContentImg = urlList
    }

  }
}
</script>
<style lang="less" scoped>
.attention-dynamic{
  width: 70%;
  height: 100%;
  padding-right: 20px;
  border-right: 1px solid #949493;
  > .scroll{
  height: 100%;
  overflow: hidden;
  }
  > .content{
    width: 100%;
    height: 100%;
  }
}

.dynamic-box{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 30px;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    color: #01060a;
    > .write-dynamic{
      width: 12%;
      height: 30px;
      text-align: center;
      background-color: #ffff;
      font-size: 14px  !important;
      border-radius: 20px;
      cursor: pointer;
      i{
        color: red;
      }
    }
}

</style>
