<template>
  <div class="hot">
    <scroll class="hot-scroll">
      <div class="record">
        <h3>
          搜索历史
          <div class="icon"><i class="el-icon-delete" @click="del()"></i></div>
        </h3>
        <div class="record-content">
          <div class="search-item" v-for="(item, index) in mapMusicHistory" :key="index" @click="goSearchDetail(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot-list">
        <h3>热搜榜</h3>
        <div class="hot-table">
          <div class="hot-table-tr" v-for="(item, index) in hotList" :key="index" @click="goSearchDetail(item.searchWord)">
            <div class="hot-table-td">
              <div :class="{ 'hot-music': index <= 2 }">{{ index + 1 }}</div>
              <div class="top">
                <div class="top-name">{{ item.searchWord }}</div>
                <div class="top-score">{{ item.score }}</div>
                <div class="top-img">
                  <img :src="item.iconUrl" alt="" />
                </div>
              </div>
            </div>
            <div class="bottom">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import { _hotSearchDetail } from '@/network/search';
import { oLocalStorage } from './observeLocalStorage';
export default {
  name: 'HotSearch',
  data() {
    return {
      hotList: [],
      isImg: 2
    };
  },
  computed: {
    mapMusicHistory() {
      let musciHistory = oLocalStorage.get('searchList') && JSON.parse(oLocalStorage.get('searchList'));
      return musciHistory ? [...new Set(musciHistory)] : ['海底', '世间美好与你环环相扣', '灰狼'];
    }
  },
  created() {
    this.initHotMusicList();
  },
  methods: {
    async initHotMusicList() {
      const {
        data: { data }
      } = await _hotSearchDetail();
      this.hotList = data;
    },
    del() {
      oLocalStorage.set('searchList', '');
    },
    goSearchDetail(v) {
      let searchList = (oLocalStorage.get('searchList') && JSON.parse(oLocalStorage.get('searchList'))) || [];
      searchList.push(v);
      oLocalStorage.set('searchList', JSON.stringify(searchList));
      this.$emit('inputBlur');
      this.$router.push('/search/' + v);
    }
  }
};
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

.hot-music {
  font-size: 24px;
  color: #dd3a3a;
}

.hot-table {
  width: 100%;
  & > .hot-table-tr {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      background-color: #232426;
    }
    & > .hot-table-td {
      display: flex;
      width: 100%;
      & > div:nth-child(1) {
        width: 40px;
      }
      .top {
        flex: 1;
        display: flex;
        height: 25px;
        color: #fff;
        font-size: 13px;
        div {
          margin-right: 5px;
        }
        .top-img img {
          height: 16px;
        }
        .top-name {
          color: #dcdde4;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
