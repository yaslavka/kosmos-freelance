import { LOAD_MARKETS, SELECT_MARKET, SORT_MARKETS, SUCCESS } from '../constants/exchange.constants'

const defaultState = {
  marketsList:[],
  marketSelected:'BTC',
  sortBy:'baseVolume',
  sortOrder: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (marketsState = defaultState, action) => {
  const {type, response, payload} = action
  // eslint-disable-next-line default-case
  switch(type) {
    case LOAD_MARKETS+SUCCESS:
      return {...marketsState, marketsList: response }
    case SELECT_MARKET:
        return {...marketsState, marketSelected: payload}
    case SORT_MARKETS:
        return {...marketsState, sortBy: payload.column, sortOrder: payload.sortOrder }
  }
  return marketsState
}
