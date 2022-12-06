import { TRADE_ORDER_SELECTED, TRADE_SALE_ORDER_SELECTED } from "src/constants/trade.constants"

const initial = {
    price:0,
    amount:0,
}

export const tradeReducer = (state = initial, {type, payload}) => {
    switch(type) {
        case TRADE_ORDER_SELECTED:
            return {
                ...state,
                price: payload.price,
                amount: payload.count
            };
        case TRADE_SALE_ORDER_SELECTED:
            return {
                ...state,
                price: payload.price,
                amount: payload.count
            };
        default :
            return state;
    }
}
