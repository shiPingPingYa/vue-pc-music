<template>
  <div class="left-menu" ref="left_menu" @click.stop @mouseenter="handleMenuMouseEnter">
    <scroll class="left-menu-container">
      <el-menu :unique-opened="true" mode="vertical" :show-timeout="200" active-text-color="#409EFF" :default-active="activeIndex" :collapse="isCollapse">
        <template v-for="(item, index) in list">
          <el-submenu v-if="item.children" :key="index" :index="index.toString()">
            <template slot="title">
              <div class="menu-title">{{ item.label }}</div>
            </template>
            <template v-for="(itemChildren, indexChildren) in item.children">
              <router-link :to="itemChildren.path" :key="indexChildren">
                <el-menu-item
                  :index="`${index.toString()}-${indexChildren.toString()}`"
                  :key="indexChildren"
                  @click="handleMenuItemClick(`${index.toString()}-${indexChildren.toString()}`)"
                >
                  <i :class="itemChildren.icon"></i><span>{{ itemChildren.label }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-menu>
      <el-menu class="song-menu" :unique-opened="true" mode="vertical" :show-timeout="200" active-text-color="#409EFF" :default-active="songListIndex" :collapse="isCollapse">
        <el-submenu :index="'0'">
          <template slot="title">
            <div class="menu-title">我的歌单</div>
          </template>
          <template v-for="(item, index) in userSongList">
            <el-menu-item :index="index.toString()" :key="index" @click="handleSongItemClick(index)">
              <div class="music-item">
                <img :src="item.coverImgUrl + '?param=50y50'" alt="" />
                <el-tooltip :content="item.name" placement="right" effect="dark">
                  <div class="song-name">{{ item.name }}</div>
                </el-tooltip>
              </div>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </scroll>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'LeftMenu',
  data() {
    return {
      activeIndex: '0-0',
      songListIndex: '',
      isCollapse: true,
      list: [
        {
          link: '',
          icon: '',
          label: '推荐',
          transform: false,
          children: [
            {
              path: '/discover/individ',
              icon: 'el-icon-bell',
              label: '发现音乐',
              transform: false
            },
            {
              path: '/allmv',
              icon: 'el-icon-video-camera-solid',
              label: '全部MV',
              transform: false
            },
            {
              path: '/allVideo',
              icon: 'el-icon-video-camera',
              label: '视频',
              transform: false
            },
            {
              path: '/friend/frienddetail',
              icon: 'el-icon-s-custom',
              label: '朋友',
              transform: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState(['isSongList', 'userSongList']),
    left_menu() {
      return document.getElementsByClassName('left-menu-container ')[0];
    }
  },
  mounted() {
    this.$bus.$on('handleMenuMouseLeave', () => {
      this.isCollapse = true;
      this.$nextTick(() => {
        this.left_menu.style.width = '68px';
      });
    });
    this.initMenuIndex(this.$route);
  },
  methods: {
    // 显示喜欢歌单
    isMML(flag) {
      this.icon = !this.icon;
      this.$store.commit('userSongList', !flag);
    },
    handleMenuItemClick(i) {
      this.activeIndex = i;
      this.songListIndex = '';
    },
    handleSongItemClick(i) {
      this.songListIndex = i.toString();
      this.activeIndex = '';
      this.$router.push({ path: '/musicListDetail', query: { id: this.userSongList[i].id } });
    },
    handleMenuMouseEnter() {
      this.isCollapse = false;
      this.left_menu.style.width = '188px';
    },
    initMenuIndex(route) {
      const pathList = route.path.split('/');
      if (pathList.includes('musicListDetail')) {
        this.initMusicListIndex(pathList[2]);
      } else {
        let path = pathList[1];
        this.list[0].children.some((item, index) => {
          if (item.path == path) {
            this.activeIndex = `0-${index}`;
            this.songListIndex = '';
            return;
          }
        });
      }
    },
    // 网页刷新后设置歌单列表的选中
    initMusicListIndex(id) {
      this.userSongList.some((item, index) => {
        if (item.id == id) {
          this.songListIndex = index.toString();
          this.activeIndex = '';
          return;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
}
.left-menu {
  width: 68px;
  height: calc(100% - 58px);
  overflow-x: auto;
  color: #0a0a0a;
  background: #f5f5f7;
  user-select: none;
}

.left-menu-container {
  position: fixed;
  width: 188px;
  overflow: hidden;
  z-index: 1000;
  div {
    width: 100%;
  }
}
.music-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  & img {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .song-name {
    flex: 1;
    padding: 0 6px;
    line-height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.song-menu {
  & li {
    padding: 0px 6px !important;
    line-height: 40px;
  }
}

.menu-title {
  width: 100%;
  line-height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
