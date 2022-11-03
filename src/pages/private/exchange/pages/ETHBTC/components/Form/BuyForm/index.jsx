import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { marketDataSelector } from '../../../../../selectors'
import Form1 from "./b";


class BuyFormComponent extends Component{
  static propTypes = {
    marketData: PropTypes.object
  };
  render() {
    const { marketData, pair, userInfo } = this.props
    if (marketData){
      return (
        <div className="col_1">
          <Form1 orderType={'buy'} market = {marketData} pair={pair} userInfo={userInfo}/>
        </div>

      )
    }else{return null}

  }
}
export default connect(
  (state) => ({
    marketData: marketDataSelector(state)
  }),
  {  })(BuyFormComponent);
