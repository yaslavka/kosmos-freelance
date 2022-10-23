import { baseInstance } from './index'

export const transferMoneyToUser = (data) =>
  baseInstance({ url: '/user/wallet/transfer', method: 'post', data })
