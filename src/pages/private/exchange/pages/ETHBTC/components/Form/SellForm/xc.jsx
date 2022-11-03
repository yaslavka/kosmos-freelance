import React, {Component} from "react";
import {Input} from "reactstrap";
import Button from "../../../../../../../../components/OldButton";
import OrderBooc from "../../orderBook/OrderBooc";
import {chartDataSelector, currentPairSelector} from "../../../../../selectors";
import {updateTradeForm} from "../../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'

class Xc extends Component{
  render() {
    const { orderType, market, chartData,pair, userInfo } = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')
    return (
      <div className="sell_box fild_box">
        <div className="inset clSellForm">
          <input type="hidden" name="order_type" value="2" />
          <input type="hidden" name="fee_type" value="2" />
          <div className="meta">
            <div className="all_title title">ПРОДАЖА</div>
            <div className="sm" id="label_bestsell">
              {chartData[orderType].price} {market.price}
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
            <label htmlFor={'amount-'+orderType}>Количество:</label>
            <div className="poles">
              <Input
                name="amount"
                maxLength="25"
                type="text"
                min={0}
                value={chartData[orderType].amount}
                id={'amount-'+orderType}
                data-type='amount'
              />
              <span className="currency">{market.coin}</span>
            </div>
          </div>
          <div className="line">
            <label htmlFor={'price-'+orderType}>Цена:</label>
            <div className="poles">
              <Input
                name="price"
                maxLength="25"
                type="text"
                data-type='price'
                id={'price-'+orderType}
                value={chartData[orderType].price}
              />
              <span className="currency">{market.market}</span>
            </div>
          </div>
          <div className="line">
            <label htmlFor='total'>Всего:</label>
            <div className="poles">
              <Input
                name="total"
                maxLength="25"
                type="text"
                min={0}
                id='total'
                value={this.handleTotal()}
              />
              <span className="currency">{market.market}</span>
            </div>
          </div>
          <div className="line">
            <span>Ком (0.2%):</span>
            <div className="poles">
              <Input name="fee" maxLength="25" type="text"  disabled="" value={this.handleTotal()+0.2}/>
              <span className="currency">{market.market}</span>
            </div>
          </div>
          <div className="line">
            <span>Всег-Ком:</span>
            <div className="poles">
              <Input name="totalfee" maxLength="25" type="text"  disabled=""/>
              <span className="currency">{market.market}</span>
            </div>
          </div>
          <div className="line" flow="horizontal">
            <div>
              <Button type="button" className="clCreateOrder">
                Продать
              </Button>
            </div>
          </div>
          </form>
        </div>
        <OrderBooc pair = { pairFormatted }/>
      </div>
    )
  }

  handleChange = (ev) => {
    const { orderType, pair, updateTradeForm } = this.props
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
  { updateTradeForm })(Xc);
