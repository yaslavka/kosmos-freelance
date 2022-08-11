


const initialState = [
    {currency: 'usd',value: '2.00', ruble: '120.48'},
    {currency: 'rub', value: '134.00', ruble: '134'},
    {currency:'eur', value: '0.00', ruble: 0},
    {currency:'btc', value: '0.00100000', ruble: '1381.85'},
    {currency:'usdt', value: '0.00', ruble: 0},
    {currency:'eth', value: '0.00000000', ruble: 0},
    {currency:'bch', value: '0.00000000', ruble: 0},
    {currency:'ltc', value: '0.00000000', ruble: 0},
    {currency:'dash', value: '0.00000000', ruble: 0},
    {currency:'xrp', value: '0.000000', ruble: 0},
    {currency:'doge', value: '0.00000000', ruble: 0},
    {currency:'trx', value: '0.000000', ruble: 0},
]


export function financeMoneyReducer (state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

