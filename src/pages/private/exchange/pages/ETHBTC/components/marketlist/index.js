import React, {useEffect} from 'react'
import routes from '../../../../../../../constants/routes.constants'
import { Link } from 'react-router-dom'
import cl from "../../../../Exchange.module.css";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../../../../../../api";
import isEmpty from "lodash/isEmpty";
import {matrixActions} from "../../../../../../../store/matrix/actions";

const Viewport = ({children}) => {
  const {buyExchange} = useSelector(state=>state)
  const dispatch = useDispatch()
  useEffect(() => {
    api.createClient().catch(() => {})
  }, [dispatch])
  return (
    <div className="viewport">
      {buyExchange &&(
        <div className="overview" id="market_base_list">
          <div id="trade_market_wrapper" className="dataTables_wrapper no-footer">
            <table id="trade_market" className={cl.dataTable}>
              <tbody>
              <Link to={routes.exchang}>
                <tr className="even">
                  <td className="first"> {buyExchange.symbol}</td>
                  <td>{buyExchange.price}</td>
                  <td className="red">{buyExchange.precision}</td>
                  <td >{buyExchange.obem}</td>
                </tr>
              </Link>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default Viewport
