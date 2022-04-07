<template>
  <div class="left-menu" ref="left_menu" @click.stop @mouseenter="handleMenuMouseEnter">
    <scroll class="left-menu-container">
      <el-menu :unique-opened="true" mode="vertical" :show-timeout="200" active-text-color="#409EFF" :default-active="activeIndex" :collapse="isCollapse">
        <template v-for="(item,index) in list ">
          <el-submenu v-if="item.children" :key="index" :index="index.toString()">
            <template slot="title">
              <div class="menu-title">{{item.label}}</div>
            </template>
            <template v-for="(itemChildren,indexChildren) in item.children">
              <router-link :to="itemChildren.path" :key="indexChildren">
                <el-menu-item :index="`${index.toString()}-${indexChildren.toString()}`" :key="indexChildren"
                  @click="handleMenuItemClick(`${index.toString()}-${indexChildren.toString()}`)">
                  <i :class="itemChildren.icon"></i><span>{{itemChildren.label}}</span>
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
          <template v-for="(item,index) in userSongList">
            <el-menu-item :index="index.toString()" :key="index" @click="handleSongItemClick(index)">
              <div class="music-item">
                <img :src="item.coverImgUrl + '?param=50y50'" alt="" />
                <el-tooltip :content="item.name" placement="right" effect="dark">
                  <div class="song-name">{{item.name}}</div>
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
import Scroll from 'common/scroll/Scroll.vue'
import { mapState } from 'vuex'
export default {
  name: 'LeftMenu',
  components: { Scroll },
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
              path: '/discover',
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
              path: '/video/allvideo',
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
    }
  },
  computed: {
    ...mapState(['isSongList', 'userSongList']),
    right_menu() {
      return document.getElementsByClassName('main')[0]
    },
    left_menu() {
      return document.getElementsByClassName('left-menu ')[0]
    }
  },
  watch: {
    // 网页刷新后设置左侧路由和音乐列表的选中
    $route: {
      handler(newV) {
        const pathList = newV.path.split('/')
        if (pathList.includes('musicListDetail')) {
          this.initMusicListIndex()
        } else {
          const currtPanth = pathList[1]
          this.list.some((item, index) => {
            return item.children.some((itemChildren, indexChildren) => {
              if (itemChildren.path.split('/')[1] === currtPanth) {
                return (this.activeIndex = `${index.toString()}-${indexChildren.toString()}`), (this.songListIndex = '')
              }
            })
          })
        }
      }
    }
  },
  methods: {
    checkClick(index) {
      if (this.list[index].icon) return
      this.currentIndex = index
    },
    // 显示喜欢歌单
    isMML(flag) {
      this.icon = !this.icon
      this.$store.commit('userSongList', !flag)
    },
    handleMenuItemClick(i) {
      this.activeIndex = i
      this.songListIndex = ''
    },
    handleSongItemClick(i) {
      this.songListIndex = i.toString()
      this.activeIndex = ''
      this.$router.push('/musicListDetail/' + this.userSongList[i].id) // 跳转音乐详情页面
    },
    handleMenuMouseEnter() {
      this.isCollapse = false
      this.left_menu.style.width = '18%'
      this.right_menu.style.width = '82%'
    },
    // 网页刷新后设置歌单列表的选中
    initMusicListIndex() {
      const pathList = location.href.split('#')[1].split('/')
      if (pathList.includes('musicListDetail')) {
        this.userSongList.some((item, index) => {
          if (item.id === Number(pathList[2])) {
            return (this.songListIndex = index.toString()), (this.activeIndex = '')
          }
        })
      }
    }
  },
  mounted() {
    this.$bus.$on('handleMenuMouseLeave', () => {
      this.isCollapse = true
      this.$nextTick(() => {
        this.left_menu.style.width = '68px'
        this.right_menu.style.width = 'calc(100% - 68px)'
      })
    })
    this.initMusicListIndex()
  }
}
</script>
<style lang="less" scoped>
  a {
    text-decoration: none;
  }
  .left-menu {
    width: 68px;
    height: calc(100% - 58px);
    overflow: hidden;
    color: #0a0a0a;
    background: #f5f5f7;
    user-select: none;
    opacity: 0.8;

    .left-menu-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      div {
        width: 100%;
      }
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
