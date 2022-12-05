import React, {Component} from "react";
import SimpleBar from "simplebar-react";
import PropTypes from 'prop-types'
import Order from "./Order/Order";

class Swll extends Component{
  static propTypes = {
    data: PropTypes.array,
    pair: PropTypes.string,
    type: PropTypes.string
  };
  render() {
    const { pair, type, data, t  } = this.props
    const market = pair.split('_')[0];
    const coin = pair.split('_')[1];
    const orders = data ?
      data.map( (order, index) => <Order key ={index} indx={index} orders={data}  order={order} pair={pair} type={type} t={t}/> ) : null
    return(
      <>
        <div className="all_title title">{t('private.exchange.trade.Swll.title')}</div>
        <div className="result">
          <table className="sell_orders" width="100%">
            <thead>
            <tr>
              <th width="35%" className="first">
                {t('private.exchange.trade.Swll.first')}
              </th>
              <th width="38%">{coin}</th>
              <th width="27%">{market}</th>
            </tr>
            </thead>
          </table>
        </div>
        <div className="scrolling" id="scrollbar4">
          <SimpleBar style={{ height: 100, width: '100%' }}>
            <div className="viewport">
              <div className="overview">
                <table className="sell_orders" width="100%">
                  <tbody id="buyord_table" role={"button"}>
                  {orders}
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
export default Swll
