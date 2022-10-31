


const initialState = [
    {currency: 'usd',value: '0.00', ruble: '0'},
    {currency: 'rub', value: '0.00', ruble: '0'},
    {currency:'eur', value: '0.00', ruble: 0},
    {currency:'btc', value: '0.00000000', ruble: '0'},
    {currency:'usdt', value: '0.00', ruble: 0},
    {currency:'eth', value: '0.00000000', ruble: 0},
    {currency:'bch', value: '0.00000000', ruble: 0},
    {currency:'ltc', value: '0.00000000', ruble: 0},
    {currency:'dash', value: '0.00000000', ruble: 0},
    {currency:'xrp', value: '0.000000', ruble: 0},
    {currency:'doge', value: '0.00000000', ruble: 0},
    {currency:'trx', value: '0.000000', ruble: 0},
]


export function financeMoneyReducer (state = initialState, {type, payload}) {
    switch (type) {
        case 'CHANGE_FINANCE_BALANCE': {
            return[...state, ...payload].filter((el,i,arr)=> arr.filter((item,n)=>n< i &&el.currency===item.currency).length!==0 || arr.filter((item,n)=>el.currency===item.currency).length<=1)
        }
        default: return state
    }
}

