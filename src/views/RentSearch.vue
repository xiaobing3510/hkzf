<template>
  <div>
    <van-search
      v-model.trim="value"
      @input="onSearch"
      shape="round"
      placeholder="请输入搜索关键词"
    />
    <van-list>
      <van-cell v-for="(item,index) in list" :key="index" :title="item.communityName" @click="onClick(item)"/>
    </van-list>
  </div>
</template>

<script>
import { getcommunity } from '@/api/area'
import { setTemp } from '@/utils/temp'
export default {
  data () {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    async onSearch (name) {
      const { data } = await getcommunity({
        params: {
          id: 'AREA|a6649a11-be98-b150', // 这里不能写死, 后期得改
          name
        }
      })
      this.list = data.body
    },
    onClick (item) {
      setTemp(item.community)
      this.$router.push('/add')
    }
  }

}
</script>

<style>
</style>
