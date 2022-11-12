<template>
  <div class="body">
    <van-nav-bar
      class="head"
      :title="info.community"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#00ae66">
      <van-swipe-item v-for="(itemImg, index) in info.houseImg" :key="index">
        <img :src="'http://liufusong.top:8080' + itemImg" />
      </van-swipe-item>
    </van-swipe>
    <div class="info">
      <div class="top">
        <h3>{{ info.title }}</h3>
        <span v-for="(item, index) in info.tags" :key="index">{{ item }}</span>
      </div>
      <div class="in">
        <div>
          <h4>{{ info.price }}/月</h4>
          <p>租金</p>
        </div>
        <div>
          <h4>{{ info.roomType }}</h4>
          <p>房型</p>
        </div>
        <div>
          <h4>{{ info.size }}平米</h4>
          <p>面积</p>
        </div>
      </div>
      <div class="bottom">
        <div>装修: <span>精装</span></div>
        <div>
          朝向: <span>{{ oriented }}</span>
        </div>
        <div>
          楼层: <span>{{ info.floor }}</span>
        </div>
        <div>类型: <span>普通住宅</span></div>
      </div>
    </div>
    <div class="oriented">
      <h4>小区:{{ info.community }}</h4>
      <div class="bdmap">
        <baidu-map :center="center" :zoom="zoom" @ready="handler">
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
          <bm-label
            v-if="bmLabel.flag"
            :content="bmLabel.content"
            :position="bmLabel.position"
            :labelStyle="{ color: 'red', fontSize: '16px' }"
            :offset="{width: -35, height: 30}"
          />
        </baidu-map>
      </div>
    </div>
    <div class="collocate">
      <van-cell title="房屋配置" class="title"></van-cell>
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-if="this.collocate.indexOf('衣柜') !== -1"
          @click="setAllocation('衣柜')"
          icon=" iconfont icon-jiaju-yigui"
          text="衣柜"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('洗衣机') !== -1"
          @click="setAllocation('洗衣机')"
          icon=" iconfont icon-xiyiji"
          text="洗衣机"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('空调') !== -1"
          @click="setAllocation('空调')"
          icon=" iconfont icon-kongdiao"
          text="空调"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('天然气') !== -1"
          @click="setAllocation('天然气')"
          icon=" iconfont icon-meiqitianranqi"
          text="天然气"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('冰箱') !== -1"
          @click="setAllocation('冰箱')"
          icon=" iconfont icon-bingxiang"
          text="冰箱"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('暖气') !== -1"
          @click="setAllocation('暖气')"
          icon=" iconfont icon-nuanqi-"
          text="暖气"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('电视') !== -1"
          @click="setAllocation('电视')"
          icon=" iconfont icon-dianshiji"
          text="电视"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('热水器') !== -1"
          @click="setAllocation('热水器')"
          icon=" iconfont icon-haofangtuo400iconfont2reshuiqi"
          text="热水器"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('宽带') !== -1"
          @click="setAllocation('宽带')"
          icon=" iconfont icon-wifi"
          text="宽带"
        />
        <van-grid-item
          v-if="this.collocate.indexOf('沙发') !== -1"
          @click="setAllocation('沙发')"
          icon=" iconfont icon-haofangtuo400iconfont2shafa"
          text="沙发"
        />
      </van-grid>
    </div>
    <div class="survey">
      <h4>房源概况</h4>
      <div class="user">
        <div class="left">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="txt">
            <p class="name">王女士</p>
            <p>已认证房主</p>
          </div>
        </div>
        <div class="right">发消息</div>
      </div>
      <p>
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>
    <div class="guess">
      <h4>猜你喜欢</h4>
      <HousesItem
        v-for="(item, index) in guessList"
        :key="index"
        :item="item"
      />
    </div>
    <div class="bottom">
      <button @click="collect">
        <van-icon name="star-o" v-if="!favorites" />
        <van-icon name="star" v-else color="#fc5430" />收藏
      </button>

      <button>在线咨询</button>
      <button class="green">电话预约</button>
    </div>
  </div>
</template>

<script>
import { getFavorites, delFavorites, postFavorites } from '@/api/user'
import { housesId, houses } from '@/api/houses'
import HousesItem from '@/components/HouseItem.vue'
export default {
  components: { HousesItem },
  data () {
    return {
      info: {},
      oriented: '',
      collocate: [],
      guessList: [],
      center: { lng: 116.466562, lat: 39.921656 },
      zoom: 3,
      bmLabel: {
        content: '我爱北京天安门',
        position: {
          lng: 116.404,
          lat: 39.915
        },
        flag: false
      },
      favorites: false
    }
  },
  async created () {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    const { data } = await housesId(this.$route.params.id)
    this.info = data.body
    this.oriented = this.info.oriented[0]
    this.collocate = this.info.supporting

    const favorites = await getFavorites(this.$route.params.id)
    console.log(favorites)
    this.favorites = favorites
    const res = await houses({
      start: 1,
      end: 200
    })

    this.guessList = res.data.body.list.splice(
      Math.floor(Math.random() * 198),
      3
    )
    this.$toast.success({
      message: '加载完成',
      duration: 1
    })
  },
  methods: {
    async handler () {
      const { data } = await housesId(this.$route.params.id)
      this.bmLabel = {
        content: data.body.community,
        position: {
          lng: this.info.coord.longitude,
          lat: this.info.coord.latitude
        },
        flag: true
      }

      if (JSON.stringify(data.body.coord) !== '"{}"') {
        this.center.lng = this.info.coord.longitude
        this.center.lat = this.info.coord.latitude
      } else {
        this.lng = 116.404
        this.lat = 39.915
        this.bmLabel.flag = false
      }
      this.zoom = 15
    },
    async collect () {
      if (this.favorites) {
        await delFavorites(this.$route.params.id)
        this.favorites = false
        this.$toast.success({
          message: '取消收藏'
        })
      } else {
        await postFavorites(this.$route.params.id)
        this.favorites = true
        this.$toast.success({
          message: '收藏成功'
        })
      }
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
  overflow: hidden;
  margin: 45px 0 100px;
  .my-swipe .van-swipe-item {
    color: #fff;
    height: 252px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 267px;
    padding: 15px;
    .top {
      flex: 1;
      h3 {
        margin: 8px 0 10px;
        font-weight: normal;
      }
      span {
        display: inline-block;
        min-width: 46px;
        height: 20px;
        background-color: #e1f5f8;
        margin-right: 5px;
        padding: 0 2px;
        font-size: 12px;
        color: #39becd;
        text-align: center;
      }
    }
    .in {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;
      div {
        flex: 1;
        h4 {
          color: #fa5741;
          font-size: 18px;
          font-weight: bolder;
        }
        p {
          height: 26px;
          font-size: 14px;
          color: #999;
          line-height: 26px;
        }
      }
    }
    .bottom {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      div {
        width: 50%;
        font-size: 13px;
        color: #999;
        span {
          color: #333;
        }
      }
    }
  }
  .oriented {
    padding: 0 15px;
    h4 {
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
      color: #646566;
    }
    .bdmap > div {
      height: 200px;
    }
  }
  .collocate {
    margin-top: 40px;
    padding: 0 15px;
  }
  .guess,
  .survey {
    margin-top: 40px;
    padding: 0 15px;
    h4 {
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
      color: #646566;
    }
    .user {
      display: flex;
      justify-content: space-between;
      height: 62px;
      .left {
        display: flex;
        img {
          width: 52px;
          height: 52px;
          margin-right: 10px;
        }
        .txt {
          p {
            font-size: 12px;
            color: #fa5741;
          }
          .name {
            margin: 5px 0;
            font-size: 14px;
            color: #333;
          }
        }
      }
      .right {
        width: 74px;
        height: 29px;
        margin-top: 10px;
        border: #21b97a 1px solid;
        text-align: center;
        color: #21b97a;
        line-height: 29px;
      }
    }
    p {
      font-size: 14px;
      color: #333;
    }
  }
  .bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 50px;
    background-color: #fff;
    button {
      flex: 1;
      background-color: #fff;
      border: #ccc 1px solid;
      &.green {
        background-color: #21b97a;
        color: #fff;
      }
    }
  }
}
</style>
