<template>
  <div class="house" @click="$router.push(`/detail/${item.houseCode}`)">
    <div class="pic">
      <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
    </div>
    <div class="txt">
      <h3>{{ item.title }}</h3>
      <p>{{ item.desc }}</p>
      <div class="label">
        <span v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span>
      </div>
      <div class="price">
        <span>{{ item.price }}</span> 元/月
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.house {
  display: flex;
  width: 375px;
  height: 120px;
  padding-top: 14px;
  border-bottom: 1px solid #ccc;
  .pic {
    width: 106px;
    height: 80px;
    margin-right: 10px;
    margin-top: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .txt {
    flex: 1;
    color: #394043;
    font-size: 15px;
    line-height: 22px;
    h3{
      height: 22px;
    }
    p {
      font-size: 12px;
      color: #afb2b3;
    }
    .label {
      display: flex;
      span {
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
    .price {
      font-size: 12px;
      color: #fa5741;
      span {
        font-weight: 700;
        font-size: 16px;
      }
    }
  }
}
</style>
