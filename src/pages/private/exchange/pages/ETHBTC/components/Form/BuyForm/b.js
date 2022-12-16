import React, { Component } from 'react'
import Button from '../../../../../../../../components/OldButton'
import { Input } from 'reactstrap'
import { connect } from 'react-redux'
import { updateTradeForm } from '../../../../../../../../actions/exchenge.action'
import { chartDataSelector, currentPairSelector } from '../../../../../selectors'
import OrderBook from '../../orderBook/OrderBook'
import { api } from 'src/api'
import Orderbuyprice from '../../orderBook/Order/orderbuyprice'

class Form1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: (0).toFixed(8),
      price: (0).toFixed(8),
      total: (0).toFixed(8),
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.trade !== this.props.trade) {
      this.setState({
        count: this.props.trade.amount.toFixed(8),
        price: this.props.trade.price.toFixed(8),
        total: this.props.trade.amount * this.props.trade.price,
      })
    }
  }

  balanceHandler = () => {
    const { market, userInfo } = this.props
    const bal_total = Number((userInfo?.balanceCrypto[`${market.market}`]) ? userInfo?.balanceCrypto[`${market.market}`] : 0.00000000).toFixed(8)

    const bal_count = bal_total === 0 ? 0 : bal_total / this.state.price
    this.setState({
      ...this.state,
      count: bal_count,
      total: bal_total,
    })
  }

  render() {

    const { orderType, market, pair, userInfo, t } = this.props
    const pairFormatted = (pair ?? '-').replace('-', '_')
    const addOrder = () => {
      const formData = new FormData()

      formData.append('amount', this.state.count)
      formData.append('price', this.state.price)
      formData.append('orderType', 'buy')
      formData.append('all', this.state.total)
      formData.append('allCom', Number(Number(this.state.total) + Number(this.state.total * 0.002)).toFixed(8))
      formData.append('pair', market.pair)
      api.addOrderApi(formData)
    }
    // console.log(market)
    // console.log('connect ishlemeli', this.props.trade)
    return (
      <>
        <div className="buy_box fild_box">
          <div className="inset clBuyForm">
            <input type="hidden" name="order_type" value="1" />
            <input type="hidden" name="fee_type" value="1" />
            <Orderbuyprice pair={pairFormatted} t={t} />
            <>
              <div className="line_first">
                <span className="c1">{t('private.exchange.trade.pair.buy.balance')}</span>
                <div role={"button"}
                  className="c2 clBuyBalance"
                  onClick={this.balanceHandler}
                >
                  <span id="label_buy_balance">
                    {(userInfo?.balanceCrypto[`${market.market}`]) ? userInfo?.balanceCrypto[`${market.market}`] : 0.00000000} {market.market}
                  </span>
                </div>
              </div>
            </>
            <form onChange={this.handleChange}>
              <div className="line">
                <label className="span">{t('private.exchange.trade.pair.buy.Input.amount')}</label>
                <div className="poles">
                  <Input
                    name="amount"
                    min={0.0}
                    data-type="amount"
                    type="text"
                    id={'amount-' + orderType}
                    onBlur={() => {
                      const ccount = Number(this.state.count).toFixed(8)
                      const pprice = Number(this.state.price).toFixed(8)
                      const ttotal = Number(this.state.total).toFixed(8)
                      this.setState({ count: ccount, price: pprice, total:ttotal })
                    }}
                    onChange={(e) => {
                      const ttotal = this.state.price * e.target.value
                      this.setState({ ...this.state, count: e.target.value, total: ttotal })
                    }}
                    value={this.state.count}
                  />
                  <label className="currency">{market.coin}</label>
                </div>
              </div>
              <div className="line">
                <label className="span">{t('private.exchange.trade.pair.buy.Input.price')}</label>
                <div className="poles">
                  <Input
                    name="price"
                    maxLength="25"
                    type="text"
                    data-type='price' id={'price-'+orderType}
                    onBlur={() => {
                      const ccount = Number(this.state.count).toFixed(8)
                      const pprice = Number(this.state.price).toFixed(8)
                      const ttotal = Number(this.state.total).toFixed(8)
                      this.setState({ count: ccount, price: pprice, total:ttotal })
                    }}
                    onChange={(e) => {
                      const totall = this.state.count * e.target.value
                      this.setState({ ...this.state, price: e.target.value, total: totall })
                    }}
                    value={this.state.price}
                  />
                  <label className="currency">{market.market}</label>
                </div>
              </div>
              <div className="line">
                <label className="span">{t('private.exchange.trade.pair.buy.Input.total')}</label>
                <div className="poles">
                  <Input
                    name="total"
                    maxLength="25"
                    type="text"
                    data-type='total'
                    id={'total-' +orderType}
                    onBlur={() => {
                      const ccount = Number(this.state.count).toFixed(8)
                      const pprice = Number(this.state.price).toFixed(8)
                      const ttotal = Number(this.state.total).toFixed(8)
                      this.setState({ count: ccount, price: pprice, total:ttotal })
                    }}
                    onChange={(e) => {
                      const tt = e.target.value === 0 ? 0 : e.target.value / this.state.price
                      this.setState({ ...this.state, count: tt, total: e.target.value })
                    }}
                    value={this.state.total}
                  />
                  <label className="currency">{market.market}</label>
                </div>
              </div>
              <div className="line">
                <label className="span">
                  {t('private.exchange.trade.pair.buy.Input.fee')} (0.2%):
                </label>
                <div className="poles">
                  <Input
                    name="fee"
                    maxLength="25"
                    type="text"
                    min={0.0}
                    value={Number(this.state.total * 0.002).toFixed(8)}
                    readOnly
                  />
                  <label className="currency">{market.market}</label>
                </div>
              </div>
              <div className="line">
                <label className="span">{t('private.exchange.trade.pair.buy.Input.totalfee')}</label>
                <div className="poles">
                  <Input
                    name="totalfee"
                    maxLength="25"
                    type="text"
                    readOnly
                    value={Number(
                      Number(this.state.total) + Number(this.state.total * 0.002),
                    ).toFixed(8)}
                  />
                  <label className="currency">{market.market}</label>
                </div>
              </div>
              <div className="line" flow="horizontal">
                <div float="left">
                  <Button
                    type="button"
                    onClick={addOrder}
                    className="clCreateOrder"
                    origin="Купить"
                  >
                    {t('private.exchange.trade.pair.buy.Input.button')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <OrderBook pair={pairFormatted} t={t} />
        </div>
      </>
    )
  }
  handleChange = (ev) => {
    const { orderType, pair, updateTradeForm } = this.props
    const { value } = ev.target
    const inputType = ev.target.getAttribute('data-type')
    if (((!isNaN(parseFloat(value)) && isFinite(value)) || !value) && inputType) {
      updateTradeForm({ currentPair: pair, orderType, inputType, value })
    }
  }
  handleTotal = () => {
    const { chartData, orderType, trade } = this.props
    if (trade.price && trade.amount) {
      return (+chartData[orderType].price * +chartData[orderType].amount).toFixed(10)
    }
    return ''
  }
}

export default connect(
  (state) => ({
    trade: state.trade,
    currentPair: currentPairSelector(state),
    chartData: chartDataSelector(state),
  }),
  { updateTradeForm },
)(Form1)
