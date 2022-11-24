import React, {Component} from "react";
import {updateTradeForm} from "../../../../../../../../actions/exchenge.action";
import { connect } from 'react-redux'

class Order extends Component{

  render() {

    const { order } = this.props
    return(
      <tr className="clRow ">
        <td width="35%" className="first" onClick={this.handleClick(order[0])}>{order[0]}</td>
        <td width="38%" onClick={this.handleClicks(order[1])}>{order[1]}</td>
        <td width="27%" >{order[2]}</td>
      </tr>
    )
  }
  handleClick = value => () => {
    const { pair, type, updateTradeForm } = this.props

    updateTradeForm({currentPair: pair, inputType: 'price', orderType: type, value: value})
    console.log(updateTradeForm, 'смотреть тут')
  }
  handleClicks = value => () => {
    const { pair, type, updateTradeForm } = this.props

    updateTradeForm({currentPair: pair, inputType: 'amount', orderType: type, value: value})
    console.log(updateTradeForm, 'смотреть тут')
  }


}
export default connect((state) => {return {} }, { updateTradeForm })(Order);
