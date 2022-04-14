<template>
  <div class="hot">
    <scroll class="hot-scroll">
      <div class="record">
        <h3>
          搜索历史<div class="icon"><i class="el-icon-delete" @click="del()"></i></div>
        </h3>
        <!-- 搜索历史内容 -->
        <div class="record-content">
          <div class="search-item" v-for="(item, index) in searchList" :key="index" @click="goSearchDetail(index)">
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 搜索热点 -->
      <div class="hot-list">
        <!-- 标题 -->
        <h3>热搜榜</h3>
        <!-- 热搜列表 -->
        <table>
          <tr v-for="(item, index) in hotList" :key="index" @click="handleHotSearchClick(index)">
            <!-- 热搜列表排名 -->
            <td :class="{ red: index <= 2 }">{{ index + 1 }}</td>
            <!-- 热搜列表上面的名字，次数，以及下面的内容 -->
            <td>
              <div class="top">
                <div class="top-name">{{ item.searchWord }}</div>
                <div class="top-score">{{ item.score }}</div>
                <div class="top-img">
                  <img :src="item.iconUrl" alt="" />
                </div>
              </div>
              <div class="bottom">{{ item.content }}</div>
            </td>
          </tr>
        </table>
      </div>
    </scroll>
  </div>
</template>
<script>
// 请求数据
import { _hotSearchDetail } from 'api/search'
export default {
  name: 'HotSearch',
  props: {
    searchList: {
      type: Array,
      dufault: () => []
    }
  },
  data() {
    return {
      hotList: [],
      isImg: 2
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    async initPage() {
      const {
        data: { data }
      } = await _hotSearchDetail()
      this.hotList = data
    },
    // 点击热搜小图标，删除数据
    del() {
      this.$emit('del')
    },
    // 点击热搜记录，触发父组件recordClick方法
    goSearchDetail(i) {
      this.$emit('goSearchDetail', this.searchList[i])
    },
    // 热搜榜的跳转
    handleHotSearchClick(i) {
      this.$emit('goSearchDetail', this.hotList[i].searchWord)
    }
  }
}
</script>
<style lang="less" scoped>
  .hot {
    position: absolute;
    top: 54px;
    padding: 5px 20px 0px 20px;
    width: 400px;
    height: 530px;
    background-color: #2d2f33;
    color: #828385;
    z-index: 10;
  }

  .hot-scroll {
    height: 100%;
    overflow: hidden;
  }
  .record > h3 {
    line-height: 40px;
    line-height: 40px;
    > .icon {
      margin-left: 10px;
      display: inline-block;
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  }

  .record-content {
    display: flex;
    flex-wrap: wrap;
    line-height: 32px;
    cursor: pointer;
  }

  .search-item {
    margin: 5px 10px 0px 0px;
    padding: 2px 12px;
    border: 1px solid #828385;
    border-radius: 10px;
  }

  .red {
    color: #dd3a3a;
  }

  table {
    width: 100%;
  }

  table tr {
    line-height: 30px;
    cursor: pointer;
  }
  tr td:nth-child(1) {
    width: 40px;
    font-size: 1.3em;
  }

  tr:hover {
    background-color: #2a2c30;
  }

  .top {
    display: flex;
    height: 25px;
    color: #fff;
    font-size: 13px;
  }
  .top div {
    margin-right: 5px;
  }

  .top-img img {
    height: 16px;
  }

  .top-name {
    color: #dcdde4;
    font-weight: 500;
  }
</style>
