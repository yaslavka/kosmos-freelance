import * as ActionTypes from '../constants/sellExchange.constans'


const initialState = []

const sellReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ActionTypes.SELL_EXCHANGE_FORM: {
            return {...state, inputCoinType: action.payload, outputCoinType: action.payload}
        }
        default:
            return state
    }
}

export const sellExchangeForm = (info) => ({
    type: ActionTypes.SELL_EXCHANGE_FORM, info
})

export default sellReducer
