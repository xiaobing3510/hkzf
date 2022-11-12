<template>
  <div class="body">
    <van-nav-bar class="head" fixed />
    <div class="search">
      <div class="input">
        <div class="location" @click="$router.push('/city')">
          {{current.label}}<span>▼</span>
        </div>
        <van-icon name="search" /><input
          type="text"
          placeholder="请输入小区或地址"
          @keyup.enter="console.log('这里还没做')"
        />
      </div>
      <div class="icon" @click="$router.push('/city')">
        <van-icon name="location-o" />
      </div>
    </div>
    <van-dropdown-menu active-color="#1cb676">
      <van-dropdown-item :title="value1" ref="areaTitle">
        <van-picker :columns="areaList" ref="area">
          <template slot="columns-bottom">
            <div class="action">
              <van-button @click="$refs.areaTitle.toggle(false)">取消</van-button>
              <van-button @click="onConfirmArea" type="primary"
                >确认</van-button
              >
            </div>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item :title="value2" ref="modeTitle">
        <van-picker :columns="modeList" ref="mode">
          <template slot="columns-bottom">
            <div class="action">
              <van-button @click="$refs.modeTitle.toggle(false)">取消</van-button>
              <van-button @click="onConfirmMode" type="primary"
                >确认</van-button
              >
            </div>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item :title="value3" ref="hireTitle">
        <van-picker :columns="hireList" ref="hire">
          <template slot="columns-bottom">
            <div class="action">
              <van-button @click="$refs.hireTitle.toggle(false)">取消</van-button>
              <van-button @click="onConfirmHire" type="primary"
                >确认</van-button
              >
            </div>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item :title="value4"></van-dropdown-item>
    </van-dropdown-menu>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <HouseItem v-for="(item, index) in list" :key="index" :item="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getCurrentCity } from '@/utils/currentCity'
import { houses, condition } from '@/api/houses'
import HouseItem from '@/components/HouseItem.vue'
export default {
  components: {
    HouseItem
  },
  data () {
    return {

      option: {},
      list: [],
      loading: false,
      finished: false,
      count: 0,
      value1: '区域',
      value2: '方式',
      value3: '租金',
      value4: '筛选',
      areaShow: false,
      areaType: [],
      modeShow: false,
      modeType: [],
      hireShow: false,
      hireType: [],
      current: ''
    }
  },
  async created () {
    this.current = JSON.parse(getCurrentCity())
    console.log(this.current)
    const { data } = await condition(this.current.value)
    console.log(data)
    this.areaType = data.body.area.children
    this.modeType = data.body.rentType
    this.hireType = data.body.price
  },
  computed: {
    areaList () {
      let str = JSON.stringify(this.areaType).replace(/"label"/g, '"text"')
      // 租金要求数组深度一致
      str = str.replace(/"value":"null"/, '"value":"null","children":[{"text":"不限","value":"null"}]')
      // console.log(str)
      return JSON.parse(str)
    },
    modeList () {
      return this.modeType.map(i => i.label)
    },
    hireList () {
      return this.hireType.map(i => i.label)
    }

  },
  watch: {
    async option () {
      this.count = 0
      console.log((this.option))
      const { data } = await houses({
        start: 1 + 20 * this.count,
        end: 20 + 20 * this.count,
        ...this.option
      })
      console.log(data)
      this.list = data.body.list
    }
  },
  methods: {
    async onLoad () {
      const { data } = await houses({
        start: 1 + 20 * this.count,
        end: 20 + 20 * this.count,
        ...this.option
      })
      console.log(data)
      this.count++
      this.list.push(...data.body.list)
      this.loading = false
      if (!data.body.list.length) this.loading = true
    },
    onConfirmArea () {
      const indexs = this.$refs.area.getIndexes()
      console.log(indexs)
      indexs[1] === 0
        ? this.option.area = this.areaType[indexs[0]].value
        : this.option.area = this.areaType[indexs[0]].children[indexs[1]].value
      this.$refs.areaTitle.toggle(false)
      this.option = { ...this.option } // 为了触发watch
    },
    onConfirmMode () {
      const index = this.$refs.mode.getIndexes()[0]
      this.option.rentType = this.modeType[index].value
      this.$refs.modeTitle.toggle(false)
      this.option = { ...this.option } // 为了触发watch
    },
    onConfirmHire () {
      const index = this.$refs.hire.getIndexes()[0]
      this.option.price = this.hireType[index].value
      this.$refs.hireTitle.toggle(false)
      this.option = { ...this.option } // 为了触发watch
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  position: relative;
  height: 100%;
  .search {
    position: fixed;
    top: 5px;
    display: flex;
    width: 100%;
    min-height: 10px;
    padding: 0 20px;
    z-index: 2;
    .input {
      flex: 1;
      height: 34px;
      padding: 5px 0;
      background-color: #fff;
      border-radius: 3px;
      display: flex;
      .location {
        height: 16px;
        color: #888;
        font-size: 14px;
        line-height: 16px;
        margin: 4px 0;
        padding: 0 10px;
        border-right: #ccc solid 1px;
        span {
          font-size: 12px;
        }
      }
      .van-icon {
        padding: 0 5px;
        line-height: 24px;
      }
      input {
        border: 0;
        &::placeholder {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .icon {
      width: 25px;
      height: 25px;
      border: #fff solid 3px;
      margin: 5px 0 5px 10px;
      border-radius: 50%;
      text-align: center;
      .van-icon {
        line-height: 20px;
        color: #fff;
      }
    }
  }
  .van-dropdown-menu {
    position: fixed;
    top: 45px;
    width: 100%;
    height: 40px;
    z-index: 2;
  }
  .list {
    margin: 95px 0 50px;
  }
  .action {
    display: flex;
    width: 100%;
    button {
      flex: 1;
    }
  }
}
</style>
