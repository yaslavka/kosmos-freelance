import { TRADE_ORDER_SELECTED, TRADE_SALE_ORDER_SELECTED } from "src/constants/trade.constants";


export const addOrderToBy = (data) => {
    return {
        type: TRADE_SALE_ORDER_SELECTED,
        payload: data,
    };
};

export const addOrderToForm = (data) => {
    return {
        type: TRADE_ORDER_SELECTED,
        payload: data
    };
};

