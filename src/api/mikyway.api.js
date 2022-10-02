import { baseInstance } from './index'

export const milkywayStatistics = () => baseInstance({ url: 'milky-way/statistic', method: 'get' })

export const milkywayStatistic = () => baseInstance({ url: 'milky-way/table', method: 'get' })

export const milkywayBuy = () => baseInstance({ url: 'milky-way/buy', method: 'post' })

export const milkywayPlanets = (params) =>
  baseInstance({ url: 'milky-way/list', method: 'get', params })


export const milkywayPlanetsUpdate = (planets) =>
  baseInstance({
    url: 'milky-way/update',
    method: 'post',
    data: { planets },
  })


