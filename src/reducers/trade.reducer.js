import { TRADE_ORDER_SELECTED, TRADE_SALE_ORDER_SELECTED } from "src/constants/trade.constants"

const initial = {
    by_price:0,
    by_count:0,
    sale_price:0,
    sale_count:0
}

export const tradeReducer = (state = initial, {type, payload}) => {
    switch(type) {
        case TRADE_ORDER_SELECTED:
            return {
                ...state,
                by_price: payload.price,
                by_count: payload.count
            };
        case TRADE_SALE_ORDER_SELECTED:
            return {
                ...state,
                sale_price: payload.price,
                sale_count: payload.count
            };
        default :
            return state;
    }
}