// 定义本地存储token的key
const KEY = 'my-token-hkzf-mobile'

// 获取token的函数
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 设置token的函数
export const setToken = (token) => {
  localStorage.setItem(KEY, token)
}

// 删除token的函数
export const delToken = () => {
  localStorage.removeItem(KEY)
}
