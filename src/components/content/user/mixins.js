export const mixins = {
  methods: {
    // 显示登录背景图
    userImage () {
      return this.$store.state.uid ? this.$store.state.image : 'img/login.128c56ca.jpg'
    }
  }
}
