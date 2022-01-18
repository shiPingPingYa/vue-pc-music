# vue-pc-music

## Project setup

```
npm install
拉取分支后通过，npm install 下载开发依赖
```

### Compiles and hot-reloads for development

```
npm run serve
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
feature/v1.0.2 优化首页的头部，将上传文件，查看消息，退出登录统一放在设置(select下面),优化左侧路由(改为用elementui的路由组件)。优化头部input搜索逻辑(将不同的跳转搜索页面的方法改为一个，搜索内容判断优化。)。优化左侧路由选中问题。搜索歌手页面(修改歌手导航栏页面刷新后选中错误问题，优化导航栏选中)。音乐搜索完成页面加过渡动画。歌手详情页面优化(父组件只有baseinfo，tabbar组件，其余通过router-view注入，修改刷新页面后路由与tabbar对应补上的问题。获取歌手信息的方式改为从音乐搜索时，存储对象到localstorage，再通过localstorage里面的歌手id调用接口，改为通过路由参数获取。）
```

### 项目地址

```
http://81.69.232.192/
已经部署的远程项目地址
```
