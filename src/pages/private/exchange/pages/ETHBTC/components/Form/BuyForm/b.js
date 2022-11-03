import React, {Component} from "react";
import Button from "../../../../../../../../components/OldButton";
import {Input} from "reactstrap";
import { connect } from 'react-redux'
import {updateTradeForm} from "../../../../../../../../actions/exchenge.action";
import {chartDataSelector, currentPairSelector} from "../../../../../selectors";
import OrderBook from "../../orderBook/OrderBook";

class Form1 extends Component{
  render() {
    const { orderType, market, chartData, pair, userInfo } = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')
    return(
      <div className="buy_box fild_box">
        <div className="inset clBuyForm">
          <input type="hidden" name="order_type" value="1" />
          <input type="hidden" name="fee_type" value="1" />
          <div className="meta">
            <div className="all_title title">ПОКУПКА</div>
            <div className="sm" id="label_bestbuy">
              {market.price}
            </div>
          </div>
          <>
            <div className="line_first">
              <span className="c1">Баланс: </span>
                <Button className="c2 clBuyBalance">
                  <span id="label_buy_balance">
                    {userInfo.balance} {market.coin}
                  </span>
                </Button>
            </div>
          </>
          <form onChange={this.handleChange}>
            <div className="line">
              <span className="span">Количество:</span>
              <div className="poles">
                <Input
                  name="amount"
                  min={0.00000000}
                  data-type='amount'
                  id={'amount-'+orderType}
                  value={chartData[orderType].amount}
                />
                <span className="currency">{market.coin}</span>
              </div>
            </div>
            <div className="line">
              <span className="span">Цена:</span>
              <div className="poles">
                <Input
                  name="price"
                  maxLength="25"
                  data-type='price' type='text' id={'price-'+orderType}
                  value={chartData[orderType].price}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span className="span">Всего:</span>
              <div className="poles">
                <Input
                  name="total"
                  maxLength="25"
                  type="text"
                  id='total'
                  value={this.handleTotal()}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span className="span">Ком (0.2%):</span>
              <div className="poles">
                <Input name="fee" maxLength="25" type="text" min={0.00000000} value={"fee"} disabled=""/>
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span className="span">Всего+Ком:</span>
              <div className="poles">
                <Input
                  name="totalfee"
                  maxLength="25"
                  type="text"
                  disabled=""
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line" flow="horizontal">
              <div float="left">
                <Button type="button" className="clCreateOrder" origin="Купить">
                  Купить
                </Button>
              </div>
            </div>
          </form>
        </div>
        <OrderBook pair = { pairFormatted }/>
      </div>
    )
  }
  handleChange = (ev) => {
    const { orderType, pair, updateTradeForm} = this.props
    const { value } = ev.target
    const inputType = ev.target.getAttribute('data-type')
    if( ( (!isNaN( parseFloat(value)) && isFinite(value)) || !value ) && inputType ) {
      updateTradeForm({currentPair: pair, orderType, inputType, value})
    }
  }

  handleTotal = () => {
    const { chartData, orderType } = this.props
    if(chartData[orderType].price && chartData[orderType].amount) {
      return +chartData[orderType].price * +chartData[orderType].amount
    }
    return ''
  }
}

export default connect(
  (state) => ({
    currentPair: currentPairSelector(state),
    chartData: chartDataSelector(state)
  }),
  { updateTradeForm })(Form1);
