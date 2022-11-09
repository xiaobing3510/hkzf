<template>
  <div>
    <van-nav-bar
      class="head"
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div class="body">
      <van-index-bar
        :index-list="indexList"
        :highlight-color="'#1cb676'"
        :z-index="0"
      >
        <div v-for="item in indexList" :key="item">
          <van-index-anchor :index="item">{{
            item == "#" ? "当前城市" : item == "热" ? "热门城市" : item
          }}</van-index-anchor>

          <template v-if="item == '#'">
            <van-cell title="上海" />
          </template>
          <template v-else-if="item == '热'">
            <van-cell
              v-for="(item1, index) in hotList"
              :title="item1.label"
              :key="index"
            />
          </template>
          <template v-else>
            <template v-for="(item1, index) in cityList">
              <van-cell
                :key="index"
                v-if="item1.short[0].toUpperCase() === item"
                :title="item1.label"
              /> </template
          ></template>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { city, hot } from '@/api/area'
export default {
  data () {
    return {
      indexList: [
        '#',
        '热',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      cityList: [],
      hotList: []
    }
  },
  async created () {
    const res = await city()
    this.cityList = res.data.body
    const res1 = await hot()
    this.hotList = res1.data.body
  }
}
</script>

<style lang="less" scoped>
.body {
  margin-top: 45px;
}
</style>
