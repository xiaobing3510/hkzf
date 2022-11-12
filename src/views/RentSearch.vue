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
import { getCurrentCity } from '@/utils/currentCity'
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
          id: JSON.parse(getCurrentCity()).value,
          name
        }
      })
      this.list = data.body
    },
    onClick (item) {
      setTemp(JSON.stringify(item))
      this.$router.push('/add')
    }
  }

}
</script>

<style>
</style>
