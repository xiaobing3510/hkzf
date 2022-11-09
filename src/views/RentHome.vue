<template>
  <div>
    <van-nav-bar
      class="head"
      title="房屋管理"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div class="body" v-if="!list.length">
      <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
      <p>
        您还没有房源, <span @click="$router.push('/add')">去发布房源</span>吧~
      </p>
    </div>
    <van-list :finished="finished" finished-text="没有更多了" v-else>
      <HouseItem v-for="(item, index) in list" :key="index" :item="item" />
    </van-list>
  </div>
</template>

<script>
import { getHouses } from '@/api/user'
import HouseItem from '@/components/HouseItem.vue'
export default {
  components: {
    HouseItem
  },
  data () {
    return {
      finished: false,
      list: []
    }
  },
  async created () {
    try {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      const { data } = await getHouses()
      this.$toast.success({
        message: '加载完成'
      })
      this.list.push(...data.body)
      this.finished = true
    } catch (error) {
      this.$toast.fail('请求超时,请稍后重试')
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  text-align: center;

  img {
    width: 150px;
    height: 100px;
    margin: 80px 0 30px;
  }
  p {
    font-size: 14px;
    color: #333;
    span {
      color: #1cb676;
    }
  }
}
.van-list{
  margin-top: 45px;
}
</style>
