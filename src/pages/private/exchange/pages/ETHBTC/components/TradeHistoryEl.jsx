import React, {Component} from "react";

class TradeHistoryEl extends Component{
  render() {
    const {trade} = this.props
    // console.log(trade);
    return(
      <>
        <tr className="green animg">
          <td width="27%" className="first">{trade.date}</td>
          <td width="14%">{trade.type}</td>
          <td width="30%">{trade.rate}</td>
          <td width="29%">{trade.amount}</td>
        </tr>
      </>
    )
  }
}
export default TradeHistoryEl
