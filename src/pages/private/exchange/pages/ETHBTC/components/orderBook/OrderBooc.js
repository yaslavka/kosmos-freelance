import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

const OrderBooc = () => {
  return (
    <div className="buy_orders_box">
      <div className="all_title title">Ордера на покупку</div>
      <div className="result">
        <table className="sell_orders" width="100%">
          <thead>
            <tr>
              <th width="35%" className="first">
                Цена
              </th>
              <th width="38%">ETH</th>
              <th width="27%">BTC</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="scrolling" id="scrollbar4">
        <SimpleBar style={{ height: 100, width: '100%' }}>
          <div className="viewport">
            <div className="overview">
              <table className="sell_orders" width="100%">
                <tbody id="buyord_table">
                  <tr
                    className="clRow "
                    a="0.23504477"
                    p="0.07663675"
                    ac="0.23504477"
                    tc="0.01801306"
                    title="Total ETH: 0.23504477, Total BTC: 0.01801306"
                  >
                    <td width="35%" className="first">
                      0.07663675
                    </td>
                    <td width="38%">0.23504477</td>
                    <td width="27%">0.01801306</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
export default OrderBooc
