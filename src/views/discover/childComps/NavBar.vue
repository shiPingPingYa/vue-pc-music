<template>
  <div class="navbar">
    <div class="content">
      <router-link :to="item.link" v-for="(item, index) in list" :key="index">
        <div class="item"
        @click="barClick(index)"
        :class="{action:currentIndex == index}">
        {{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    barClick (index) {
      this.currentIndex = index
    }
  }

}

</script>
<style lang="less" scoped>
.navbar{
  width: 100%;
  height: 49px;
}

.content{
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: 100%;
}

.content > a{
    flex: 1;
    height: 100%;
    line-height: 49px;
    text-align: center;
    color: #fff;
    opacity: 0.6;
    text-decoration: none;
    font-size: 14px;
}

.action{
    opacity: 1;
    border-bottom: 2px solid #5c5e61;
}
</style>
