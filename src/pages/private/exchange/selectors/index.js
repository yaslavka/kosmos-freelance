import {createSelector} from 'reselect'

export const marketsSelector = (state) => state.markets.marketsList
export const marketSelector = (state) => state.markets.marketSelected
export const sortBySelector = (state) => state.markets.sortBy
export const sortOrderSelector = (state) => state.markets.sortOrder
export const currentPairSelector = (state) => state.charts.currentPair
export const chartsSelector = (state) => state.charts.chartsData

export const chartsByMarketSelector = createSelector(marketsSelector, marketSelector, sortBySelector, sortOrderSelector, (marketsList, market, sortBy, sortOrder) => {
  return marketsList.filter(item => item.market === market)
        .sort((a,b) => {
          if(!sortOrder) {
            return +a[sortBy] ? (+a[sortBy] > +b[sortBy] ? -1 : 1) : (a[sortBy] > b[sortBy] ? 1 : -1)
          } else {
            return +a[sortBy] ? (+a[sortBy] > +b[sortBy] ? 1 : -1) : (a[sortBy] > b[sortBy] ? -1 : 1)
          }
        })
})

export const marketDataSelector = createSelector(marketsSelector, currentPairSelector, (marketsList, currentPair) => {
  return marketsList.filter(item => item.pair === currentPair)[0]
})

export const chartDataSelector = createSelector (chartsSelector, currentPairSelector, (charts, currentPair ) => {
  if(currentPair && charts.get(currentPair)) {
      return charts.get(currentPair)
  }
})
export const toplineDataSelector = createSelector(marketsSelector, (marketsList) => {
  return marketsList.filter(item => item.market === 'USDT')
        .sort((a,b) => { return +a['baseVolume'] > +b['baseVolume'] ? -1 : 1 })
})

export const tradeMarketsSelector = createSelector(marketsSelector, (marketsList) => {
  const markets = [];
  marketsList.map(item => {
    if(markets.indexOf(item.market) === -1) { markets.push(item.market) }
  })
  return markets
})

export const allMarketsSortedSelector = createSelector(tradeMarketsSelector, marketsSelector, (markets, marketsList) => {
  const marketsSortedByMarket = {}
  markets.map(market => {
    marketsSortedByMarket[market] = []
    marketsList.map(item => {
      if(item.market === market) { marketsSortedByMarket[market].push(item) }
    })
  })
  return marketsSortedByMarket
})
