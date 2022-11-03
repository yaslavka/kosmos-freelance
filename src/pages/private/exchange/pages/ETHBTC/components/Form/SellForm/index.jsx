import React, {Component} from 'react'
import Xc from "./xc";
import {marketDataSelector} from "../../../../../selectors";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {loadOrders} from "../../../../../../../../actions/exchenge.action";

class SellFormComponent extends Component{
  static propTypes = {
    marketData: PropTypes.object
  };
  render() {
    const { marketData, pair, userInfo } = this.props
    if (marketData){
      return (
        <div className="col_2">
          <Xc orderType={'sell'} market = {marketData} pair={pair} userInfo={userInfo}/>
        </div>
      )
    }else {return null}
  }
}

export default connect(
  (state) => ({
    marketData: marketDataSelector(state)
  }),
  {loadOrders})(SellFormComponent);
