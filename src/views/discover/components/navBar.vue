<template>
  <div class="navbar">
    <div class="content">
      <router-link :to="item.link" v-for="(item, index) in tabList" :key="index">
        <div class="item" @click="currentIndex = index" :class="{'action':currentIndex == index}">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navBar',
  data() {
    return {
      currentIndex: 0,
      tabList: [
        { link: '/discover/individ', name: '个性推荐' },
        { link: '/discover/songList', name: '歌单' },
        { link: '/discover/ranklist', name: '排行榜' },
        { link: '/discover/artist', name: '歌手' },
        { link: '/discover/newsongs', name: '最新音乐' },
        { link: '/discover/mv', name: 'MV' },
      ],
    };
  },
  watch: {
    '$route.path': {
      handler() {
        this.initTabIndex();
      },
    },
  },
  mounted() {
    this.initTabIndex();
  },
  methods: {
    // 处理页面刷新后，路由与tab导航栏对应不上
    initTabIndex() {
      this.tabList.some((item, index) => {
        if (item.link === this.$route.path) {
          this.currentIndex = index;
          return true;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
  .navbar {
    width: 100%;
    height: 49px;
  }

  .content {
    display: flex;
    margin: 0 auto;
    width: 60%;
    height: 100%;
  }

  .content > a {
    flex: 1;
    height: 100%;
    line-height: 49px;
    text-align: center;
    color: #01060a;
    opacity: 0.6;
    text-decoration: none;
    font-size: 14px;
  }

  .action {
    opacity: 1;
    border-bottom: 2px solid #5c5e61;
  }
</style>
