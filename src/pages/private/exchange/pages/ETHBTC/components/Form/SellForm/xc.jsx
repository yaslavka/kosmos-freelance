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
    amount: 0.00000000,
    price: 0.00000000,
  };
}
  render() {
    const { orderType, market, chartData,pair, userInfo, t } = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')

    const addOrder = ()=>{
      const formData = new FormData()
      formData.append('amount', this.state.amount)
      formData.append('price', this.state.price)
      formData.append('orderType', 'sell')
      formData.append('all', this.handleTotal())
      formData.append('allCom', this.handleTotalCom())
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
                      onClick={()=>this.setState({
                        amount:(userInfo?.balanceCrypto[`${market.coin}`]) ? userInfo?.balanceCrypto[`${market.coin}`] : 0.00000000
                      })}
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
                  type="number"
                  id={'amount-'+orderType}
                  onChange={(e)=>this.setState({amount:e.target.value})}
                  value={this.props.trade.sale_count.toFixed(8)}
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
                  type="number"
                  data-type='price' id={'price-'+orderType}
                  onChange={(e)=>this.setState({price:e.target.value})}
                  value={(this.props.trade.sale_price).toFixed(8)}
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
                  value={(this.props.trade.sale_price * this.props.trade.sale_count).toFixed(8)}
                />
                <span className="currency">{market.market}</span>
              </div>
            </div>
            <div className="line">
              <span>{t('private.exchange.trade.pair.sell.Input.fee')} (0.2%):</span>
              <div className="poles">
                <Input name="fee" maxLength="25" type="text" min={0.00000000}value={(this.props.trade.sale_price * this.props.trade.sale_count * 0.002).toFixed(8)} readOnly/>
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
                  value={(
                    this.props.trade.sale_price * this.props.trade.sale_count -
                    this.props.trade.sale_price * this.props.trade.sale_count * 0.002
                  ).toFixed(8)}
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
  handleTotalCom = () => {
    const { chartData, orderType } = this.props
    if(chartData[orderType].price && chartData[orderType].amount) {
      return (+chartData[orderType].price * +chartData[orderType].amount - this.handleTotal() * 0.002).toFixed(8)
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
