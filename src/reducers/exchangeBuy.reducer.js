import * as ActionTypes from '../constants/buyExchange.constans'


const initialState = {
    count: 0,
    dash: 0,
    btc: 0
}

const buyReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ActionTypes.BUY_EXCHANGE_FORM: {
            return {...state, count: action.info.count, dash: action.info.dash, btc: action.info.btc}
        }
        default: 
            return state
    }
}

export const buyExchangeForm = (info) => ({
    type: ActionTypes.BUY_EXCHANGE_FORM, info
})

export default buyReducer