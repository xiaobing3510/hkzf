<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" >
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="search" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="comsult" icon="newspaper-o">咨询</van-tabbar-item>
      <van-tabbar-item to="my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped>
</style>
