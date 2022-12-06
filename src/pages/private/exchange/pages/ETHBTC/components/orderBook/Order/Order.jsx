import React, { Component } from 'react'
import { updateTradeForm } from '../../../../../../../../actions/exchenge.action'
import { connect } from 'react-redux'
import {  addOrderToForm, addOrderToBy } from 'src/actions/trade.action'


class Order extends Component {

  render() {
    const { order, type, orders} = this.props
    return (
      <tr className="clRow" onClick={this.handleClickk(orders, type)}>
        <td width="35%" className="first" onClick={this.handleClick(order[0])}>
          {order[0]}
        </td>
        <td width="38%" onClick={this.handleClicks(order[1])}>
          {order[1]}
        </td>
        <td width="27%">{order[2]}</td>
      </tr>
    )
  }

  //  addOrderToByFrom = (data) => {
  //     return {
  //       type: TRADE_SALE_ORDER_SELECTED,
  //       payload: data,
  //   };

  // }

  handleClickk = () => () => {
    const { type, orders, indx, addOrderToForm, addOrderToBy } = this.props;
    let price = Number(orders[indx][0])
    let count = 0
    for (let i = 0; i < indx + 1; i++) {
      count = count + Number(orders[i][1])
    }
    if (type === 'sell') {
      addOrderToForm({ price, count })
    } else {
      addOrderToBy({ price, count })
    }
  }

  handleClick = (value) => () => {
    const { pair, type, updateTradeForm } = this.props

    updateTradeForm({ currentPair: pair, inputType: 'price', orderType: type, value: value })
    console.log(updateTradeForm, 'смотреть тут')
  }
  handleClicks = (value) => () => {
    const { pair, type, updateTradeForm } = this.props

    updateTradeForm({ currentPair: pair, inputType: 'amount', orderType: type, value: value })
    console.log(updateTradeForm, 'смотреть тут')
  }
}
export default connect(
  (state) => {
    return {}
  },
  { updateTradeForm, addOrderToForm, addOrderToBy },
)(Order)
