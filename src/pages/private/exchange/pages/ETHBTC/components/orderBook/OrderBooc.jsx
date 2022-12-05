import React, {Component} from 'react'
import 'simplebar/dist/simplebar.min.css'
import Swll from "./swll";
import {chartDataSelector} from "../../../../selectors";
import {loadOrders} from "../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class OrderBooc extends Component{
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
      const bids = chartData.orders.bids
      console.log("tapylmayan zat", bids)
      return (
        <div className="buy_orders_box">
          <Swll type={'buy'} data={bids} pair={pair} t={t}/>
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
  { loadOrders })(OrderBooc);
