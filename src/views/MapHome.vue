<template>
  <div>
    <van-nav-bar
      class="head"
      title="地图找房"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div class="bdmap">
      <baidu-map :center="center" :zoom="zoom" @ready="handler">
        <bm-scale anchor="BMAP_ANCHOR_CENTER_RIGHT"></bm-scale>
        <bm-navigation type='NavigationControlType' anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
        <template v-if="flag">
          <template v-if="zoom < 15">
            <bm-label
              v-for="(item, index) in areaList"
              :key="index"
              :content="`<div>${item.label}</div><div>${item.count}套</div>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude,
              }"
              @click="onClick(item)"
              :labelStyle="{
                border: '1px #fff solid',
                color: '#fff',
                fontSize: '14px',
                textAlign: 'center',
                background: '#fff',
                width: '66.9px',
                height: '51.9px',
                borderRadius: '50%',
                background: '#1cb676',
                lineHeight: '20px',
                padding: '15px 0 0 0',
              }"
            />
          </template>
          <template v-else>
            <bm-label
              v-for="(item, index) in areaList"
              :key="index"
              :content="`<span>${item.label}</span> <span>${item.count}套</span>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude,
              }"
              @click="onClick(item)"
              :labelStyle="{
                border: '1px #fff solid',
                color: '#fff',
                fontSize: '14px',
                textAlign: 'center',
                background: '#fff',
                background: '#1cb676',
                padding: '0 5px ',
              }"
            /> </template
        ></template>
      </baidu-map>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" >
      <div class="title">
        <h3>房源详情</h3>
        <p @click="$router.push('/search')">查看更多</p>
      </div>
      <div class="body">
        <HouseItem v-for="(item, index) in houses" :key="index" :item="item" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import HouseItem from '@/components/HouseItem.vue'
import { map } from '@/api/area'
import { houses } from '@/api/houses'
import { getCurrentCity } from '@/utils/currentCity'
export default {
  components: { HouseItem },
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      areaList: [],
      houses: [],
      flag: false,
      show: false
    }
  },
  async created () {
    this.$toast.loading({
      message: '加载中',
      forbidClick: true,
      duration: 0
    })
    const { data } = await map(JSON.parse(getCurrentCity()).value)
    this.areaList = data.body
    console.log(this.areaList)
    this.center.lng = data.body[0].coord.longitude
    this.center.lat = data.body[0].coord.latitude
    this.$toast.success({
      message: '加载完成',
      duration: 1
    })
    this.flag = true
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 11
    },
    async onClick (item) {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      this.center.lng = item.coord.longitude
      this.center.lat = item.coord.latitude
      this.flag = false
      if (this.zoom < 14) {
        this.zoom += 2
        const { data } = await map(item.value)
        this.areaList = data.body
      } else {
        const { data } = await houses({ cityId: item.value })
        console.log(data)
        this.houses = data.body.list
        this.show = true
      }
      this.$toast.success({
        message: '加载完成',
        duration: 1
      })
      this.flag = true
    }
  }
}
</script>

<style lang="less" scoped>
.bdmap > div {
  height: 667px;
}
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background-color: #1cb676;
  color: #fff
}
</style>
