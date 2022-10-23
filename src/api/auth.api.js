import { createFormDataObj } from '../utils'
import { baseInstance } from './index'

export const signUp = (userInfo) =>
  baseInstance({
    url: '/user/registration',
    method: 'post',
    data: userInfo,
  })

export const signIn = (credentials) =>
  baseInstance({
    url: '/user/login',
    method: 'post',
    data: createFormDataObj({ ...credentials, grant_type: 'password' }),
  })

export const inviter = (params) => baseInstance({ url: '/user/inviter', method: 'get', params })
