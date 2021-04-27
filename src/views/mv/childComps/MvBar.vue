<template>
  <div class="mv-bar">
    <div class="type">地区:
      <div class="item" v-for="(areaItem,index) in area " :key="index"
      :class="{action:areaIndex == index}"
      @click="areaClick(index)">{{areaItem}} </div>
    </div>
    <div class="type">类型
      <div class="item" v-for="(typeItem,index) in type" :key="index"
      :class="{action:typeIndex == index}"
      @click="typeClick(index)">{{typeItem}} </div>
    </div>
    <div class="type">排序
      <div class="item"
       v-for="(orderItem ,index) in order " :key=" index"
       :class="{action:orderIndex == index}"
        @click="orderClick(index)">{{orderItem}} </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MvBar',
  data () {
    return {
      area: ['全部', '内地', '港台', '欧美', '韩国', '日本'],
      type: ['全部', '官方版', '原声', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新'],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0
    }
  },
  methods: {
    areaClick (index) {
      this.areaIndex = index
      this.$parent.$parent.allMv(this.area[this.areaIndex], this.type[this.typeIndex], this.order[this.orderIndex])
    },
    typeClick (index) {
      this.typeIndex = index
      this.$parent.$parent.allMv(this.area[this.areaIndex], this.type[this.typeIndex], this.order[this.orderIndex])
    },
    orderClick (index) {
      this.orderIndex = index
      this.$parent.$parent.allMv(this.area[this.areaIndex], this.type[this.typeIndex], this.order[this.orderIndex])
    }
  }
}
</script>
<style lang="less" scoped>
.mv-bar{
  margin: 0 20px;
  font-size: 14px;
  color: #828385;
  padding-bottom: 8px;
  border-bottom: 1px solid #23262c;
  > .type{
    margin-top: 10px;
    display: flex;
    > .item{
      margin-left: 10px;
      padding: 0 10px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.action{
  color: #fff;
  background-color: #54575f;
}
</style>
