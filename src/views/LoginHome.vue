<template>
  <div>
    <van-nav-bar class="head" title="登录" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link class="tip" to="/register">还没有账号, 去注册~</router-link>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/storage'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (value) {
      const { data } = await login(value)
      console.log(data)
      this.$toast(data.description)
      if (data.body) {
        setToken(data.body.token)
        this.$router.push('/')
      }
    },
    onClickLeft () {}
  }
}
</script>

<style lang='less'>
.tip{
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color:#666;
}
</style>
