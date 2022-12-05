import React, {Component} from 'react'
import {chartDataSelector} from "../../../../selectors";
import {loadTradeHistory} from "../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TradeHistoryList from "../TradeHistoryList";

class HistoriBuySel extends  Component{
  static propTypes = {
    pair: PropTypes.string.isRequired,
    ordersData: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    const { loadTradeHistory, pair } = this.props
    if(pair !== nextProps.pair) {loadTradeHistory(nextProps.pair)}

  }

  componentDidMount() {
    const { pair, loadTradeHistory } = this.props
    loadTradeHistory(pair)
  }

  render() {
    const { pair, chartData, t } = this.props
    // console.log('Historyn nirden gelyani: ', chartData);
    if(chartData && chartData.tradeHistory){
      return(
        <div className="col_3">
          <TradeHistoryList  data={chartData.tradeHistory} pair={pair} t={t}/>
        </div>
      )
    }else {
      return null
    }
  }
}
export default connect(
  (state) => ({
    chartData: chartDataSelector(state)
  }),
  { loadTradeHistory })(HistoriBuySel);
