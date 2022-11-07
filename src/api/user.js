import request from '@/utils/request'

export const login = data => request.post('/user/login', data)

export const register = data => request.post('user/registered', data)

export const info = () => request.get('/user')
