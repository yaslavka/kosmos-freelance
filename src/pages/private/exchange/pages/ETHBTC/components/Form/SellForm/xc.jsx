import React, {Component} from "react";
import {Input} from "reactstrap";
import Button from "../../../../../../../../components/OldButton";
import OrderBooc from "../../orderBook/OrderBooc";
import {chartDataSelector, currentPairSelector} from "../../../../../selectors";
import {updateTradeForm} from "../../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'
import { api } from "src/api";

class Xc extends Component{  constructor(props) {
  super(props);
  this.state = {
    count: 0.0,
    price: 0.0,
    total: 0.0,
  }
}
  componentDidUpdate(prevProps) {
    if (prevProps.trade !== this.props.trade) {
      this.setState({
        count:this.props.trade.amount.toFixed(8),
        price: this.props.trade.price.toFixed(8),
        total:this.props.trade.amount*this.props.trade.price
      })
    }
  }

  balanceHandler = () => {
    const { market, userInfo } = this.props
    const bal_count = Number(userInfo?.balanceCrypto[`${market.coin}`] ? userInfo?.balanceCrypto[`${market.coin}`] : 0.0,).toFixed(8)
    const bal_total = Number(bal_count) * this.state.price;
    this.setState({
      ...this.state,
      count: bal_count,
      total: bal_total
    })
  }

  render() {
    const { orderType, market,pair, userInfo, t } = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')

    const addOrder = () => {
      const formData = new FormData()
      formData.append('amount', this.state.count)
      formData.append('price', this.state.price)
      formData.append('orderType', 'sell')
      formData.append('all', this.state.total)
      formData.append('allCom', this.state.total * 0.2)
      formData.append('pair', market.pair)
      api.addOrderApi(formData)
    }
    return (
      <div className="sell_box fild_box">
        <div className="inset clSellForm">
          <input type="hidden" name="order_type" value="2" />
          <input type="hidden" name="fee_type" value="2" />
          <div className="meta">
            <div className="all_title title">{t('private.exchange.trade.pair.sell.title')}</div>
            <div className="sm" id="label_bestsell">

            </div>
          </div>
          <>
            <div className="line_first">
              <span className="c1">{t('private.exchange.trade.pair.sell.balance')}</span>
              <Button className="c2 clBuyBalance"
                      onClick={this.balanceHandler}
              >
                  <span id="label_buy_balance">
                     {(userInfo?.balanceCrypto[`${market.coin}`]) ? userInfo?.balanceCrypto[`${market.coin}`] : 0.00000000} {market.coin}
                  </span>
              </Button>
            </div>
          </>
          <form onChange={this.handleChange}>
            <div className="line">
              <label htmlFor={'amount-'+orderType}>{t('private.exchange.trade.pair.sell.Input.amount')}</label>
              <div className="poles">
                <Input
                  name="amount"
                  min={0.00000000}
                  data-type='amount'
                  type="text"
                  id={'amount-'+orderType}
                  onChange={(e) => {
                    const ttotal = this.state.price * e.target.value
                    this.setState({ ...this.state, count: e.target.value, total: ttotal })
                  }}
                  value={this.state.count}
                />
                <span className="currency">{market.coin}</span>
              </div>
            </div>
            <div className="line">
              <label htmlFor={'price-'+orderType}>{t('private.exchange.trade.pair.sell.Input.price')}</label>
              <div className="poles">
                <Input
                  name="price"
                  maxLength="25"
                  type="text"
                  data-type='price' id={'price-'+orderType}
                  onChange={(e) => {
                    const totall = this.state.count * e.target.value
                    this.setState({ ...this.state, price: e.target.value, total: totall })
                  }}
                  value={this.state.price}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <label htmlFor='total'>{t('private.exchange.trade.pair.sell.Input.total')}</label>
              <div className="poles">
                <Input
                  name="total"
                  maxLength="25"
                  type="text"
                  readOnly
                  id='total'
                  onChange={(e) => {
                    const tt = e.target.value == 0 ? 0 : e.target.value / this.state.price;
                    this.setState({...this.state, count: tt, total: e.target.value })
                  }}
                  value={this.state.total}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span>{t('private.exchange.trade.pair.sell.Input.fee')} (0.2%):</span>
              <div className="poles">
                <Input
                  name="fee"
                  maxLength="25"
                  type="text"
                  min={0.00000000}
                  value={Number(this.state.total * 0.002).toFixed(8)}
                  readOnly/>
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span>{t('private.exchange.trade.pair.sell.Input.totalfee')}</span>
              <div className="poles">
                <Input
                  name="totalfee"
                  maxLength="25"
                  type="text"
                  readOnly
                  value={Number(Number(this.state.total) - Number(this.state.total * 0.002)).toFixed(8)}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line" flow="horizontal">
              <div>
                <Button type="button" onClick={addOrder} className="clCreateOrder">
                  {t('private.exchange.trade.pair.sell.Input.button')}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <OrderBooc pair = { pairFormatted } t={t}/>
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
      return (+chartData[orderType].price * +chartData[orderType].amount).toFixed(8)
    }
    return ''
  }
}

export default connect(
  (state) => ({
    trade: state.trade,
    currentPair: currentPairSelector(state),
    chartData: chartDataSelector(state)
  }),
  { updateTradeForm })(Xc);
