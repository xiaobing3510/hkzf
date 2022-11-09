import request from '@/utils/request'

// 获取城市列表
export const city = () => request.get('/area/city', {
  params: {
    level: 1
  }
})

// 获取热门城市
export const hot = () => request.get('/area/hot')
