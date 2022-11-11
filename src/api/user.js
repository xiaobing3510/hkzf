import request from '@/utils/request'

// 登录
export const login = data => request.post('/user/login', data)

// 注册
export const register = data => request.post('user/registered', data)

// 获取用户信息
export const info = () => request.get('/user', {
  // 延长获取用户信息的超时时间
  timeout: 60000
})

// 登出
export const logout = () => request.get('/user/logout')

// 查看收藏列表
export const favorites = () => request.get('/user/favorites')

// 发布房源
export const postHouses = data => request({
  method: 'POST',
  url: '/user/houses',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  data
})

// 查看已发布房源
export const getHouses = () => request.get('/user/houses')
