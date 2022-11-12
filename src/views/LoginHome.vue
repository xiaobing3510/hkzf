<template>
  <div>
    <van-nav-bar class="head" title="登录" left-arrow @click-left="$router.back()" />
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
      try {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        })
        const { data } = await login(value)
        console.log(data)
        // 状态码为400直接返回错误提示
        if (data.status === 400) return this.$toast.fail(data.description)
        this.$toast.success(data.description)
        if (data.body) {
          setToken(data.body.token)
          this.$router.push('/my')
        }
      } catch (error) {
        this.$toast.fail('请求超时,请稍后重试')
      }
    }
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
