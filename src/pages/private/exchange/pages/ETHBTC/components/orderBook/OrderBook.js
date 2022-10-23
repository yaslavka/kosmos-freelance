import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

const OrderBook = () => {
  return (
    <div className="sell_orders_box">
      <div className="all_title title">Ордера на продажу</div>
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
      <div className="scrolling" id="scrollbar3">
        <SimpleBar style={{ height: 100, width: '100%' }}>
          <div className="viewport">
            <div className="overview">
              <table className="sell_orders" width="100%">
                <tbody id="sellord_table">
                  <tr
                    className="clRow "
                    a="0.09762344"
                    p="0.07689110"
                    ac="0.09762344"
                    tc="0.00750637"
                    title="Total ETH: 0.09762344, Total BTC: 0.00750637"
                  >
                    <td width="35%" className="first">
                      0.07689110
                    </td>
                    <td width="38%">0.09762344</td>
                    <td width="27%">0.00750637</td>
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
export default OrderBook
