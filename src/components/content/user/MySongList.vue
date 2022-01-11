<template>
  <div class="user-song-lsit">
    <scroll class="mymusic-scroll">
      <ul>
        <li v-for="(item, index) in getUserList" :key="index" @click.stop="enterMusicListDetail(index)" @click="setItemCur(index)" :class="{ 'cur-song-list': currentIndex == index }">
          <div class="name">
            <img :src="item.coverImgUrl + '?param=50y50'" alt="" />
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll'
import { mapState } from 'vuex'
export default {
  name: 'MySongList',
  components: { Scroll },
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    ...mapState(['userName']),
    getUserList () {
      return this.$store.state.userSongList
    }
  },
  methods: {
    // 跳转到音乐详情页面
    enterMusicListDetail (i) {
      // 阻止冒泡
      this.$router.push('/musiclistdetail/' + this.getUserList[i].id)
    },
    // 显示点击后的歌单
    setItemCur (i) {
      this.currentIndex = i
    }
  }
}
</script>

<style lang="less" scoped>
  .user-song-lsit {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }

  .mymusic-scroll {
    height: 100%;
    overflow: hidden;
  }

  .user-song-lsit ul {
    height: 100%;
  }

  .user-song-lsit ul li {
    display: flex;
    height: 30px;
    padding: 2px 15px;
    align-items: center;
    font-size: 14px;
    line-height: 30px;
    list-style-type: none;
    opacity: 0.8;
    > .name {
      margin: 10px 10px 0 0;
      img {
        width: 20px;
        height: 20px;
        background-size: 100%, 100%;
      }
    }
    span {
      display: inline-block;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .cur-song-list {
    opacity: 1;
    background: #e6e7eb;
  }

  ul li:hover {
    opacity: 1;
    cursor: pointer;
    background-color: #e6e7eb;
  }
</style>
