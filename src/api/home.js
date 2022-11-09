import request from '@/utils/request'

// 轮播图
export const swipe = () => request.get('/home/swiper')

// 租房小组
export const groups = () => request.get('/home/groups')
