import * as ActionTypes from '../constants/sellExchange.constans'


const initialState = {
    count: 0,
    dash: 0,
    btc: 0
}

const sellReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ActionTypes.SELL_EXCHANGE_FORM: {
            return {...state, count: action.info.count, dash: action.info.dash, btc: action.info.btc}
        }
        default: 
            return state
    }
}

export const sellExchangeForm = (info) => ({
    type: ActionTypes.SELL_EXCHANGE_FORM, info
})

export default sellReducer