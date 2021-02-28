<template>
  <div class="hot">
 <!-- 搜索历史 -->
    <div class="record">
      <!-- 搜索历史头 -->
      <h3>搜索历史
        <div class="icon">
        <i class="el-icon-delete" @click="del()"></i>
      </div>
      </h3>
    <!-- 搜索历史内容 -->
    <div class="record-content">
      <div class="search-item" v-for="(item, index) in searchList" :key="index">
        {{item}}
      </div>
    </div>
    </div>

  <!-- 搜索热点 -->
    <div class="hot-list">
      <!-- 标题 -->
      <h3>热搜榜</h3>
      <!-- 热搜列表 -->
      <table>
        <tr>
          <!-- 热搜列表排名 -->
          <td class="red">01</td>
          <!-- 热搜列表上面的名字，次数，以及下面的内容 -->
          <td>
            <div class="top">
              <div class="top-name">永不失联的爱</div>
              <div class="top-score">234243234</div>
            </div>
              <div class="bottom">你是我这一辈子都不想逝去的爱</div>
          </td>
        </tr>

      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HotSearch',
  props: {
    searchList: {
      type: Array,
      dufault () {
        return []
      }
    }
  },
  methods: {
    del () {
      this.$emit('del')
    }
  }
}
</script>
<style lang="less" scoped>
.hot{
  position: absolute;
  top: 54px;
  padding: 5px 20px 0px 20px;
  width: 400px;
  height: 530px;
  background-color: #2d2f33;
  color: #828385;
  z-index: 10;
}

.record > h3{
  line-height: 40px;
  line-height: 40px;
  >  .icon{
  margin-left: 10px;
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  }
}

.record-content{
  display: flex;
  flex-wrap: wrap;
  line-height: 32px;
}

.search-item{
  margin: 5px 10px 0px 0px;
  padding: 2px 12px;
  border: 1px solid #828385;
  border-radius: 10px;
}

.red{
  color: #dd3a3a;
}

table{
  width: 100%;
}

table tr{
  line-height: 30px;
}
tr td:nth-child(1){
  width: 40px;
  font-size: 1.3em;
}

tr:hover{
  background-color: #2a2c30;
}

.top{
  display: flex;
  height: 25px;
  color: #fff;
  font-size: 13px;
}
.top div{
  margin-right: 5px;
}
.top-name{
  color: #dcdde4;
  font-weight: 500;
}
</style>
