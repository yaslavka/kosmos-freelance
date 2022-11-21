import React, {Component} from "react";
import PropTypes from "prop-types";
import Oderbuyprice from "./oderbuyprice";
import {connect} from "react-redux";
import {chartDataSelector} from "../../../../../selectors";
import {loadOrders} from "../../../../../../../../actions/exchenge.action";

class Orderbuyprice extends Component{
  static propTypes = {
    pair: PropTypes.string.isRequired,
    chartData: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    const { loadOrders, pair } = this.props
    if(pair !== nextProps.pair) {loadOrders(nextProps.pair)}

  }

  componentDidMount() {
    const { pair, loadOrders } = this.props
    loadOrders(pair)
  }
  render() {
    const { pair, chartData, t } = this.props
    if (chartData && chartData.orders){
      const asks = chartData.orders.asks
      return (
        <div className="meta">
          <div className="all_title title">{t('private.exchange.trade.pair.buy.title')}</div>
          <Oderbuyprice data={asks} pair={pair} t={t}/>
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
  { loadOrders })(Orderbuyprice);
