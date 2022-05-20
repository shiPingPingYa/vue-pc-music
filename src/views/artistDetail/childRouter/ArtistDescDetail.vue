<template>
  <div class="desc-container" v-if="descDetail!= null">
    <div class="desc">
      <p>{{descDetail.briefDesc}} </p>
    </div>
    <div class="content">
      <div class="intro-item" v-for="(item,index) in descDetail.introduction" :key="index">
        <h3>{{item.ti}} </h3>
        <div>
          <p v-for="(item,index) in formatText(item.txt)" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getArtistDescDetail } from '../../../network/artist';
export default {
  name: 'AristDescDetail',
  data() {
    return {
      descDetail: null,
    };
  },
  created() {
    this.initArtistDesc();
  },
  methods: {
    async initArtistDesc() {
      const { id } = this.$route.query;
      // 根据用户id请求数据
      const { data } = await _getArtistDescDetail(id);
      this.descDetail = data;
    },
    formatText(text) {
      return text !== null && text !== undefined ? text.split('\n') : '暂无信息';
    },
  },
};
</script>
<style lang="less" scoped>
  .desc-container {
    padding-right: 20px;
    width: 100%;
    & h3 {
      padding: 10px 0px;
      color: #0a0a0a;
    }

    & p {
      margin-top: 10px;
      text-indent: 35px;
      line-height: 30px;
      font-size: 14px;
      color: #747577;
    }
  }
</style>
