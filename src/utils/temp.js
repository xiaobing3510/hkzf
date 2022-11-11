// 定义本地存储temp的key
const TEMP = 'temp'

// 获取temp的函数
export const getTemp = () => {
  return localStorage.getItem(TEMP)
}

// 设置temp的函数
export const setTemp = temp => {
  localStorage.setItem(TEMP, temp)
}

// 删除temp的函数
export const delTemp = () => {
  localStorage.removeItem(TEMP)
}
