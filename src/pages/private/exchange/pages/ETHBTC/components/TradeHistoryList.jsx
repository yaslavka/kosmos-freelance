import React, {Component} from "react";
import PropTypes from 'prop-types'
import TradeHistoryEl from "./TradeHistoryEl";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

class TradeHistoryList extends Component{
  static propTypes = {
    pair: PropTypes.string,
    data: PropTypes.array
  };
  render() {
    const { pair, data, t  } = this.props
    const market = pair.split('_')[0];
    const coin = pair.split('_')[1];
    const trades = data ?
      data.map( (trade, index) => <TradeHistoryEl key ={index} trade={trade}/> ) : null
    return(
      <>
        <div className="all_title title">{t('private.exchange.trade.History.title')}</div>
        <div className="result">
          <table width="100%" className="trade_history_table">
            <thead>
            <tr>
              <th width="27%" className="first">{t('private.exchange.trade.History.first')}</th>
              <th width="14%">{t('private.exchange.trade.History.result')}</th>
              <th width="30%">{market}</th>
              <th width="29%">{coin}</th>
            </tr>
            </thead>
          </table>
        </div>
        <div className="scrolling" id="scrollbar6">
          <SimpleBar style={{ height: 200, width: '100%' }}>
            <div className="viewport">
              <div className="overview">
                <table width="100%" className="trade_history_table">
                  <tbody id="microhistory_table">
                  {trades}
                  </tbody>
                </table>
              </div>
            </div>
          </SimpleBar>
        </div>
      </>
    )
  }
}
export default TradeHistoryList
