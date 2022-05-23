<template>
  <div class="attention-dynamic">
    <scroll ref="scroll" class="scroll" :pull-up-load='true' @pullingUp="pullingUp()">
      <div class="content">
        <div class="dynamic-box">
          <div class="dynamic">动态</div>
          <div class="write-dynamic">
            <i class="el-icon-plus"></i>
            写动态
          </div>
        </div>
        <eventDynamic :dynamicList="dynamicList" @shaerContentImageChange="shaerContentImageChange" />
      </div>
    </scroll>
    <alertImage v-if="asyncShareImag" :imgIndex="imgIndex" :imgList="imgList" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { _getEvent } from '@/network/friend';
import { throttled } from '@/assets/common/tool';
import { AttentionDynamic } from '@/assets/common/handleUserInfo';
import alertImage from '@/components/alertImage';
import eventDynamic from '@/components/eventDynamic';
export default {
  name: 'attentionDynamic',
  components: { alertImage, eventDynamic },
  data() {
    return {
      dynamicList: [],
      pagesize: 20,
      page: 1,
      // 最后一项评论的时间
      lastTime: -1,
      imgList: [],
      imgIndex: 0,
    };
  },
  computed: {
    ...mapState(['asyncShareImag']),
  },
  created() {
    this.initUserDynamic();
  },
  methods: {
    ...mapMutations(['setAsyncShareImag']),
    // 下拉获取动态
    pullingUp: throttled(function () {
      this.initUserDynamic();
    }, 800),
    // 加载数据
    async initUserDynamic() {
      // 用户关注动态
      const params = {
        pagesize: this.pagesize,
        lasttime: this.lastTime,
      };
      const {
        data: { event, lasttime },
      } = await _getEvent(params);
      this.lastTime = lasttime;
      event.forEach(item => this.dynamicList.push(new AttentionDynamic(item)));
      this.$refs.scroll.refresh();
    },
    // 获取动态组件传递的图片下标和图片数组
    shaerContentImageChange(urlIndex, urlList) {
      this.imgIndex = urlIndex;
      this.imgList = urlList;
    },
  },
};
</script>
<style lang="less" scoped>
  .attention-dynamic {
    width: 70%;
    height: 100%;
    padding-right: 20px;
    border-right: 1px solid #949493;
    > .scroll {
      height: 100%;
      overflow: hidden;
    }
    > .content {
      width: 100%;
      height: 100%;
    }
  }

  .dynamic-box {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 30px;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    color: #01060a;
    > .write-dynamic {
      width: 12%;
      height: 30px;
      text-align: center;
      background-color: #ffff;
      font-size: 14px !important;
      border-radius: 20px;
      cursor: pointer;
      i {
        color: red;
      }
    }
  }
</style>
