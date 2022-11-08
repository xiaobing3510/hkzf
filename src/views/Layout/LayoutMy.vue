<template>
  <div>
    <div class="my-title">
      <div class="my-bgi">
        <img :src="bgi" alt="" />
      </div>
      <div class="my-info">
        <div class="my-avatar">
          <img :src="avatar" alt="" />
        </div>
        <div class="my-name">{{ name }}</div>
        <!-- 未登录 -->
        <router-link to="/login" class="login" v-if="!flag" @click="login">去登录</router-link>
        <!-- 已登录 -->
        <div class="logged" v-else>
          <button class="exit" @click="exit">退出</button>
          <div class="edit">编辑个人资料►</div>
        </div>
      </div>
    </div>
    <div class="my-body">
      <!-- 跳转还没做 -->
      <van-grid :column-num="3" :border="false" :clickable='true'>
        <van-grid-item to='/favorate' icon="star-o" text="我的收藏"></van-grid-item>
        <van-grid-item to='/rent' icon="wap-home-o" text="我的出租"></van-grid-item>
        <van-grid-item icon="clock-o" text="看房记录"></van-grid-item>
        <van-grid-item icon="credit-pay" text="成为房主"></van-grid-item>
        <van-grid-item icon="contact" text="个人资料"></van-grid-item>
        <van-grid-item icon="service-o" text="联系我们"></van-grid-item>
      </van-grid>
    </div>
    <div class="my-foot">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { info, logout } from '@/api/user'
import { getToken, delToken } from '@/utils/storage'
export default {
  async created () {
    // 判断是否有token
    if (getToken()) {
      try {
        const { data } = await info()

        // 判断token是否有效
        if (data.status === 200) {
          this.flag = true
          this.avatar = 'http://liufusong.top:8080' + data.body.avatar
          this.name = data.body.nickname
        } else {
          this.$toast.fail('登录信息异常或过期,请重新登录')
          delToken()
        }
      } catch (error) {
        this.$toast.fail('请求超时')
      }
    }
  },
  data () {
    return {
      bgi: 'http://liufusong.top:8080/img/profile/bg.png',
      avatar: 'http://liufusong.top:8080/img/profile/avatar.png',
      name: '游客',
      flag: false // 判断用户是否登录
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    exit () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      })
        .then(() => {
          logout()
          this.avatar = 'http://liufusong.top:8080/img/profile/avatar.png'
          this.name = '游客'
          delToken()
          this.flag = false
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 他妈的css给老子搓傻了
* {
  box-sizing: border-box;
}
.my-title {
  position: relative;
  width: 375px;
  min-height: 300px;
  margin-bottom: 12px;

  .my-bgi {
    width: 100%;
    height: 191px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .my-info {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 319px;
    height: 165px;
    margin-top: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px 3px #ddd;
    .my-avatar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
      background-color: #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-name {
      width: 100%;
      margin-top: 55px;
      font-size: 13px;
      color: #333;
      text-align: center;
    }
    .login {
      display: block;
      width: 69px;
      height: 30px;
      margin: 20px auto;
      border-radius: 5px;
      text-align: center;
      color: #fff;
      line-height: 30px;
      font-size: 13px;
      background-color: #21b97a;
    }
    .logged{
      width: 100%;
      text-align: center;
      .exit{
        background-color: #21b97a;
        border: 0;
        width: 54px;
        height: 20px;
        margin-top: 5px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        border-radius: 10px;
      }
      .edit{
        font-size: 12px;
        margin-top: 20px;
        color: #888;
      }
    }
  }
}
.my-foot {
  margin: 10px auto;
  width: 345px;
  img {
    width: 100%;
  }
}
</style>
