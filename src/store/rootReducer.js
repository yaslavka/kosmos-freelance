import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// TODO: refactoring
import matrixReducer from '../store/matrix/reducers'

import appReducer from '../reducers/app.reducer'
import authReducer from '../reducers/auth.reducer'
import teamReducer from '../reducers/team.reducer'
import newsReducer from '../reducers/news.reducer'
import casinoReducer from '../reducers/casino.reducer'
import financeReducer from '../reducers/finance.reducer'
import startrekReducer from '../reducers/startrek.reducer'
import superstarReducer from '../reducers/superstar.reducer'
import starsupReducer from '../reducers/starsup.reducer'
import starsupTableReducer from '../reducers/starsupTable.reducer'
import starsReducer from '../reducers/stars.reducer'
import unoReducer from '../reducers/uno.reducer'
import buyReducer from 'src/reducers/exchangeBuy.reducer'
import sellReducer from 'src/reducers/exchangeSell.reducer'
import { financeMoneyReducer } from 'src/reducers/financeM.reducer'


const rootReducer = (history) =>
  combineReducers({
    matrixReducer,
    app: appReducer,
    auth: authReducer,
    team: teamReducer,
    news: newsReducer,
    casino: casinoReducer,
    finance: financeReducer,
    startrek: startrekReducer,
    superstar: superstarReducer,
    starsup: starsupReducer,
    starsupTable: starsupTableReducer,
    stars: starsReducer,
    uno: unoReducer,
    buyExchange: buyReducer,
    sellExchange: sellReducer,
    router: connectRouter(history),
    financeMoney: financeMoneyReducer
  })

export default rootReducer
