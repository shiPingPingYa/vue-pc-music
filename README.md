# vue-pc-music

## Project setup

```
npm install
拉取分支后通过，npm install 下载开发依赖

API来源于:https://gitee.com/its_mediocre/NeteaseCloudMusicApi
拉取依赖后，通过npm install 下载开发依赖，并运行。
```

### Compiles and hot-reloads for development

```
npm run start
运行项目
```

### Compiles and minifies for production

```
npm run build
打包项目
```

### Lints and fixes files

```
npm run lint
格式化项目配置
```

### 项目配置

```
newwork 文件夹放置的是网络请求
assets/common文件夹下面放置的是js工具函数
```

### 更新版本描述

```
feature/v1.0.1 将登录文件从user文件夹抽离，单独设置一个登录文件夹。登录，注册逻辑优化，页面优化。(验证码和获取昵称页面暂未优化。)
feature/v1.0.3 优化首页的头部，将上传文件，查看消息，退出登录统一放在设置(select下面),优化左侧路由(改为用elementui的路由组件)。优化头部input搜索逻辑(将不同的跳转搜索页面的方法改为一个，搜索内容判断优化。)。优化左侧路由选中问题。搜索歌手页面(修改歌手导航栏页面刷新后选中错误问题，优化导航栏选中)。音乐搜索完成页面加过渡动画。歌手详情页面优化(父组件只有baseinfo，tabbar组件，其余通过router-view注入，修改刷新页面后路由与tabbar对应补上的问题。获取歌手信息的方式改为从音乐搜索时，存储对象到localstorage，再通过localstorage里面的歌手id调用接口，改为通过路由参数获取。）。音乐详情页面页面优化(原先进入详情页面就会获取歌曲列表，歌曲评论，歌曲收藏者，改为进入获取歌曲列表，用户选择性的点击评论和收藏者的时候，才获取对应评论或收藏者数据。）。发现音乐整体优化(路由导入改为vue.cogfig下面配置好的绝对路径，实例化class获取对象改为数组循环创建对象获取)。视频播放和mv播放优化(代码逻辑优化，通过实例化构造class类获取对象，改为数组循环获取)。视频和全部mv代码逻辑优化(视频页面获取视频列表数据逻辑优化。)。
feature/v1.0.4 将vue，vue-router,element，通过cdn方式引入
```

### 项目地址

```
http://81.69.232.192/
已经部署的远程项目地址(服务器已经过期，网址不能再访问)
```
