<template>
  <div class="private" v-if="privateMv">
    <p class="top">{{privateMv.name}} </p>
    <div class="content">
      <div class="private-item" v-for="(item,index) in privateMv.result" :key="index" @click="goPlayMVDetail(item.id)">
        <img src='' :data-src=" item.picUrl + '?param=300y111'" alt="" v-imgLazy>
        <div class=" icon">
          <img src="../../../assets/img/leftmenu/shiping.svg" alt="">
        </div>
        <div class="desc">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getPrivateContent } from '@/network/discover';
export default {
  name: 'PrivateContentMv',
  data() {
    return {
      privateMv: null,
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    //初始化私人推荐mv区域
    async initPage() {
      const { data } = await _getPrivateContent();
      if (data.code == 200) {
        this.privateMv = data;
      }
    },
    goPlayMVDetail(id) {
      this.$router.push({ path: '/playmv/', query: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
  .private {
    padding-top: 20px;
    width: 100%;
    height: 100%;
    > .top {
      line-height: 20px;
      color: #01060a;
      font-size: 16px;
    }
    .content {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
    }
  }

  .private-item {
    position: relative;
    width: 300px;
    overflow: hidden;
    cursor: pointer;
    > img {
      width: 100%;
    }
    > .icon {
      position: absolute;
      left: 5px;
      top: 5px;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    > .desc {
      font-size: 13px;
      color: #01060a;
    }
  }
</style>
