<template>
  <div>
    <van-nav-bar
      class="head"
      title="收藏列表"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-list
      :finished="finished"
      finished-text="没有更多了"
    >
      <HouseItem v-for="(item,index) in list" :key="index" :item='item'/>
    </van-list>

  </div>
</template>

<script>
import { favorites } from '@/api/user'
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
        duration: 0,
        forbidClick: true
      })
      const { data } = await favorites()
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
<style scoped>
.van-list{
  padding-top: 46px;
}
</style>
