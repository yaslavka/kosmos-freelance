import React, {Component} from "react";
import Button from "../../../../../../../../components/OldButton";
import {Input} from "reactstrap";
import { connect } from 'react-redux'
import {updateTradeForm} from "../../../../../../../../actions/exchenge.action";
import {chartDataSelector, currentPairSelector} from "../../../../../selectors";
import OrderBook from "../../orderBook/OrderBook";
import { api } from "src/api";

class Form1 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      price: 0,
    };
  }
  render() {
    const { orderType, market, chartData, pair, userInfo, t } = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')
    const addOrder = ()=>{
      const formData = new FormData()

      formData.append('amount', this.state.amount)
      formData.append('price', this.state.price)
      formData.append('orderType', 'buy')
      formData.append('all', this.handleTotal())
      formData.append('allCom', this.handleTotalCom())
      formData.append('pair', market.pair)
      api.addOrderApi(formData)
    }
    console.log(market);
    return(
      <>
        <div className="buy_box fild_box">
          <div className="inset clBuyForm">
            <input type="hidden" name="order_type" value="1" />
            <input type="hidden" name="fee_type" value="1" />
            <div className="meta">
              <div className="all_title title">{t('private.exchange.trade.pair.buy.title')}</div>
              <div className="sm" id="label_bestbuy">
                {chartData[orderType].price} {market.price}
              </div>
            </div>
            <>
              <div className="line_first">
                <span className="c1">{t('private.exchange.trade.pair.buy.balance')}</span>
                <Button onClick={()=>this.setState({
                  amount:userInfo.balance
                })} className="c2 clBuyBalance">
                  <span id="label_buy_balance">
                    {userInfo.balance} {market.coin}
                  </span>
                </Button>
              </div>
            </>
            <form onChange={this.handleChange}>
              <div className="line">
                <span className="span">{t('private.exchange.trade.pair.buy.Input.amount')}</span>
                <div className="poles">
                  <Input
                    name="amount"
                    min={0.00000000}
                    data-type='amount'
                    type="number"
                    id={'amount-'+orderType}
                    onChange={(e)=>this.setState({amount:e.target.value})}
                    value={this.state.amount}
                  />
                  <span className="currency">{market.coin}</span>
                </div>
              </div>
              <div className="line">
                <span className="span">{t('private.exchange.trade.pair.buy.Input.price')}</span>
                <div className="poles">
                  <Input
                    name="price"
                    maxLength="25"
                    type="number"
                    data-type='price' id={'price-'+orderType}
                    onChange={(e)=>this.setState({price:e.target.value})}
                    value={this.state.price}
                  />
                  <span className="currency">{market.market}</span>
                </div>
              </div>
              <div className="line">
                <span className="span">{t('private.exchange.trade.pair.buy.Input.total')}</span>
                <div className="poles">
                  <Input
                    name="total"
                    maxLength="25"
                    type="text"
                    readOnly
                    id='total'
                    value={this.handleTotal()}
                  />
                  <span className="currency">{market.market}</span>
                </div>
              </div>
              <div className="line">
                <span className="span">{t('private.exchange.trade.pair.buy.Input.fee')} (0.2%):</span>
                <div className="poles">
                  <Input name="fee" maxLength="25" type="text" min={0.00000000} value={this.handleTotal() * 0.002} readOnly/>
                  <span className="currency">{market.market}</span>
                </div>
              </div>
              <div className="line">
                <span className="span">{t('private.exchange.trade.pair.buy.Input.totalfee')}</span>
                <div className="poles">
                  <Input
                    name="totalfee"
                    maxLength="25"
                    type="text"
                    readOnly
                    value={this.handleTotalCom()}
                  />
                  <span className="currency">{market.market}</span>
                </div>
              </div>
              <div className="line" flow="horizontal">
                <div float="left">
                  <Button type="button" onClick={addOrder} className="clCreateOrder" origin="Купить">
                    {t('private.exchange.trade.pair.buy.Input.button')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <OrderBook pair = { pairFormatted } t={t}/>
        </div>
      </>
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
  handleTotalCom = () => {
    const { chartData, orderType } = this.props
    if(chartData[orderType].price && chartData[orderType].amount) {
      return +chartData[orderType].price * +chartData[orderType].amount + this.handleTotal() * 0.002
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
