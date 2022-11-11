import request from '@/utils/request'

// 获取城市列表
export const city = (level) => request.get('/area/city', {
  params: {
    level
  }
})

// 获取热门城市
export const hot = () => request.get('/area/hot')

// 小区关键词查询
export const getcommunity = data => request.get('./area/community', data)

// 获取子级城市列表
export const area = id => request.get('./area', { params: { id } })
