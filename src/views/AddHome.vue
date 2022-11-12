<template>
  <div>
    <van-nav-bar
      class="head"
      title="发布房源"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div class="body">
      <van-form validate-first @submit="onSubmit">
        <van-cell title="房源信息" class="title"></van-cell>
        <van-field
          name="community"
          is-link
          label="小区名称"
          :value="community.communityName"
          @click="$router.push('/rent/search')"
          readonly
        ></van-field>

        <van-field
          v-model="price"
          name="price"
          type="number"
          label="租金"
          placeholder="请输入租金/月"
        >
          <span slot="label">租&emsp;&emsp;金</span>
          <template #button><span>￥/月</span></template>
        </van-field>

        <van-field
          v-model="area"
          name="size"
          type="number"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #button><span>㎡</span></template>
        </van-field>

        <van-field
          name="roomType"
          is-link
          @click="doorShow = true"
          :value="door"
          readonly
        >
          <span slot="label">户&emsp;&emsp;型</span>
        </van-field>

        <van-popup
          v-model="doorShow"
          round
          position="bottom"
          :style="{ height: '45%' }"
          ><van-picker
            show-toolbar
            :columns="doorList"
            @confirm="onConfirmDoor"
            @cancel="doorShow = false"
          />
        </van-popup>

        <van-field
          name="floor"
          is-link
          @click="floorShow = true"
          :value="floor"
          readonly
        >
          <span slot="label">所在楼层</span>
        </van-field>
        <van-popup
          v-model="floorShow"
          round
          position="bottom"
          :style="{ height: '45%' }"
          ><van-picker
            show-toolbar
            :columns="floorList"
            @confirm="onConfirmFloor"
            @cancel="floorShow = false"
          />
        </van-popup>

        <van-field
          name="oriented"
          is-link
          @click="towardShow = true"
          :value="toward"
          readonly
        >
          <span slot="label">朝&emsp;&emsp;向</span>
        </van-field>
        <van-popup
          v-model="towardShow"
          round
          position="bottom"
          :style="{ height: '45%' }"
          ><van-picker
            show-toolbar
            :columns="towardList"
            @confirm="onConfirmToward"
            @cancel="towardShow = false"
          />
        </van-popup>

        <van-cell title="房屋标题" class="title"></van-cell>
        <van-field
          name="title"
          placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
          v-model="title"
        >
        </van-field>

        <van-cell title="房屋图像" class="title"></van-cell>
        <van-field name="tempSlides">
          <template #input>
            <van-uploader v-model="tempSlides" :after-read="afterRead" />
          </template>
        </van-field>

        <van-cell title="房屋配置" class="title"></van-cell>
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            :class="{ active: allocation.indexOf('衣柜') !== -1 }"
            @click="setAllocation('衣柜')"
            icon=" iconfont icon-jiaju-yigui"
            text="衣柜"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('洗衣机') !== -1 }"
            @click="setAllocation('洗衣机')"
            icon=" iconfont icon-xiyiji"
            text="洗衣机"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('空调') !== -1 }"
            @click="setAllocation('空调')"
            icon=" iconfont icon-kongdiao"
            text="空调"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('天然气') !== -1 }"
            @click="setAllocation('天然气')"
            icon=" iconfont icon-meiqitianranqi"
            text="天然气"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('冰箱') !== -1 }"
            @click="setAllocation('冰箱')"
            icon=" iconfont icon-bingxiang"
            text="冰箱"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('暖气') !== -1 }"
            @click="setAllocation('暖气')"
            icon=" iconfont icon-nuanqi-"
            text="暖气"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('电视') !== -1 }"
            @click="setAllocation('电视')"
            icon=" iconfont icon-dianshiji"
            text="电视"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('热水器') !== -1 }"
            @click="setAllocation('热水器')"
            icon=" iconfont icon-haofangtuo400iconfont2reshuiqi"
            text="热水器"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('宽带') !== -1 }"
            @click="setAllocation('宽带')"
            icon=" iconfont icon-wifi"
            text="宽带"
          />
          <van-grid-item
            :class="{ active: allocation.indexOf('沙发') !== -1 }"
            @click="setAllocation('沙发')"
            icon=" iconfont icon-haofangtuo400iconfont2shafa"
            text="沙发"
          />
        </van-grid>

        <van-cell title="房屋描述" class="title"></van-cell>
        <van-field
          name="description"
          v-model="description"
          rows="4"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
          show-word-limit
        />

        <div class="handle">
          <van-button @click.prevent="cancelTip">取消</van-button>
          <van-button type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getTemp, delTemp } from '@/utils/temp'
import { postHouses } from '@/api/user'
import { image, condition } from '@/api/houses'
export default {
  data () {
    return {
      community: '',
      price: '',
      area: '',
      door: '请选择',
      doorType: [],
      doorShow: false,
      floor: '请选择',
      floorType: [],
      floorShow: false,
      toward: '请选择',
      towardType: [],
      towardShow: false,
      title: '',
      tempSlides: [],
      houseImg: [],
      allocation: [],
      description: ''
    }
  },
  async created () {
    if (getTemp()) {
      this.community = JSON.parse(getTemp())
      delTemp()
    }
    const { data } = await condition('AREA|dbf46d32-7e76-1196')
    console.log(data)
    this.floorType = data.body.floor
    this.doorType = data.body.roomType
    this.towardType = data.body.oriented
  },
  computed: {
    floorList () {
      return this.floorType.map(i => i.label)
    },
    doorList () {
      return this.doorType.map(i => i.label)
    },
    towardList () {
      return this.towardType.map(i => i.label)
    }
  },
  methods: {
    async onSubmit (value) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      const res = await postHouses({
        title: value.title,
        description: value.description,
        houseImg: this.houseImg.join('|'),
        origin: this.towardType[this.towardList.indexOf(value.oriented)].value,
        supporting: this.allocation.join('|'),
        price: value.price,
        roomType: this.doorType[this.doorList.indexOf(value.roomType)].value,
        size: value.size,
        floor: this.floorType[this.floorList.indexOf(value.floor)].value,
        community: this.community.community
      })
      if (res.status === 200) {
        console.log(2)
        this.$toast.loading({
          message: '加载中...',
          duration: 1
        })
        console.log(4)
        this.$dialog.confirm({
          title: '提示',
          message: '发布成功',
          confirmButtonText: '继续发布',
          cancelButtonText: '去查看'
        })
          .then(() => {
            this.$router.go(0)
          })
          .catch(() => {
            this.$router.push('/list')
          })
      }
    },
    async afterRead (file) {
      console.log(file)
      const res = await image(file.file)
      this.houseImg.push(...res.data.body)
    },
    cancelTip () {
      this.$dialog
        .confirm({
          title: '标题',
          message: '放弃发布房源',
          confirmButtonText: '继续编辑',
          confirmButtonColor: '#108ee9',
          cancelButtonText: '放弃'
        })
        .then(() => {})
        .catch(() => {
          this.$router.push('/')
        })
    },
    onConfirmDoor (value) {
      this.door = value
      this.doorShow = false
    },
    onConfirmFloor (value) {
      this.floor = value
      this.floorShow = false
    },
    onConfirmToward (value) {
      this.toward = value
      this.towardShow = false
    },
    setAllocation (value) {
      if (this.allocation.indexOf(value) === -1) this.allocation.push(value)
      else this.allocation.splice(this.allocation.indexOf(value), 1)
    }
  }
}
</script>
<style lang="less" >
.body {
  margin: 45px 0;
  .title {
    font-weight: normal;
    color: #1cb676;
  }
  .input {
    width: 100%;
    height: 100%;
    border: 0;
    &::placeholder {
      color: #bbb;
    }
  }
  .active,
  .active .van-grid-item__text {
    color: #1cb676;
  }
  textarea.text {
    height: 128px;
    color: #000;
    font-size: 17px;
    line-height: 25.5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    padding: 0;
    border: 0;
    background-color: transparent;
    overflow: visible;
    display: block;
    resize: none;
    word-break: break-word;
    word-wrap: break-word;
    &::placeholder {
      font-size: 14px;
      color: #ccc;
    }
  }
  .handle {
    display: flex;
    width: 375px;
    position: fixed;
    bottom: 0;
    .van-button {
      flex: 1;
    }
    .van-button--default {
      color: #1cb676;
    }
  }
}
</style>
