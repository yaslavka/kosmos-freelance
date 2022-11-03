import React, {Component} from 'react'
import 'simplebar/dist/simplebar.min.css'
import Orders from "./Order/Orders";
import PropTypes from "prop-types";
import {chartDataSelector} from "../../../../selectors";
import {loadOrders} from "../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'

class OrderBook extends Component{
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
    const { pair, chartData } = this.props
    if (chartData && chartData.orders){
      const asks = chartData.orders.asks
      return (
        <div className="sell_orders_box">
          <Orders type={'sell'} data={asks} pair={pair}/>
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
  { loadOrders })(OrderBook);
