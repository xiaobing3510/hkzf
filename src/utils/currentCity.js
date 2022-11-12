// 定义本地存储当前城市的key
const CITY = 'my-city'

// 获取当前城市的函数
export const getCurrentCity = () => {
  return localStorage.getItem(CITY)
}

// 设置当前城市的函数
export const setCurrentCity = (city) => {
  localStorage.setItem(CITY, city)
}

// 删除当前城市的函数
export const delCurrentCity = () => {
  localStorage.removeItem(CITY)
}
