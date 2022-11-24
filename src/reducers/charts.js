import {LOAD_CHART, LOAD_TRADE_HISTORY, LOAD_ORDERS, START, SUCCESS, FAIL, UPDATE_TRADE_FORM} from '../constants/exchange.constants'
import {Record, Map} from 'immutable'


const chartRecord = Record({
  data: [],
  loading: false,
  loaded: false,
  start: '',
  period: '',
  orders: {},
  tradeHistory: [],
  buy: new Map({}),
  sell: new Map({}),
  error: false
})

const formRecord = Record({
    price: [],
    amount: []
})

const ReducerState = Record({
  chartsData: new Map({}),
  currentPair: ''
})

// eslint-disable-next-line import/no-anonymous-default-export
export default (chartsState = new ReducerState(), action) => {
  const { type, response, payload, pair, start, period } = action
  // eslint-disable-next-line default-case
  switch(type) {
    case LOAD_CHART+START:
      return chartsState
                .set('currentPair', pair)
                .setIn( ['chartsData', pair], new chartRecord( {loading: true, loaded:true, start: start, period: period, buy: new formRecord({}), sell: new formRecord({})} ) )

    case LOAD_CHART+SUCCESS:
      return chartsState
                .setIn(['chartsData', pair, 'data'], response)
                .setIn(['chartsData', pair, 'loading'], false)
                .setIn(['chartsData', pair, 'loaded'], true)

    case LOAD_CHART+FAIL:
      return chartsState.setIn(['chartsData', pair, 'error'], true)

    case LOAD_ORDERS+SUCCESS:
      return chartsState.setIn(['chartsData', pair, 'orders'], response)

    case LOAD_TRADE_HISTORY+SUCCESS:
      return chartsState.setIn(['chartsData', pair, 'tradeHistory'], response)

    case UPDATE_TRADE_FORM:
      const {currentPair, orderType, inputType, value } = payload
      return chartsState.setIn(['chartsData', currentPair, orderType, inputType], value)

  }
  return chartsState
}
