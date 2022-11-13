import React, {Component} from "react";
import cl from "../../../../Exchange.module.css";
import {connect} from "react-redux";
import {tradeMarketsSelector} from "../../../../selectors";
import {selectMarket} from "../../../../../../../actions/exchenge.action";
import { Button } from 'reactstrap'

class MarketsToggle extends Component{
  render() {
    const { tradeMarkets, t } = this.props
    if(tradeMarkets.length) {
      const buttons = tradeMarkets.map((market, index) => <Button key = {index} type='button' value= {market}  className={this.getClassName(market)}>{market}</Button>)
    return(
      <div className="market_box">
        <div className="all_title title">{t('private.exchange.trade.title')}</div>
        <div>
          <div >
            <div className={cl.marketBtns} onClick = {this.handleChange}>
              {buttons}
            </div>
            <div className="clear"/>
          </div>
        </div>
      </div>
    )
  }
    return null
  }

  handleChange = (ev) => {
    const { selectMarket } = this.props
    selectMarket(ev.target.value)
  }
  getClassName = (value) => {
    const { market } = this.props
    return market === value ? 'markets-list__button markets-list__button--active' : 'btn btn-secondary'
  }
}

export default connect(
  (state) => ({
    tradeMarkets: tradeMarketsSelector(state)
  }), { selectMarket })(MarketsToggle);
