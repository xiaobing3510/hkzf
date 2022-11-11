import request from '@/utils/request'

// 房屋图像上传
export const image = file => request({
  method: 'POST',
  url: '/houses/image',
  headers: { 'Content-Type': 'multipart/form-data' },
  data: {
    file
  }
})

// 查询房屋
export const houses = params => request.get('/houses', { params })
