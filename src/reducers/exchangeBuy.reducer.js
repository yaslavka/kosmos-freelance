import * as ActionTypes from '../constants/buyExchange.constans'


const initialState = [
  {
    inputCoinType:"",
    outputCoinType:""
  }
]

const buyReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ActionTypes.BUY_EXCHANGE_FORM: {
            return  {...state, inputCoinType: action.payload, outputCoinType: action.payload}
        }
        default:
            return state
    }
}

export const buyExchangeForm = (info) => ({
    type: ActionTypes.BUY_EXCHANGE_FORM, info
})

export default buyReducer
