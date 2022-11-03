import React, {Component} from 'react'
import screenWidth from '../../../decorators/screenWidth'
import SimpleBar from "simplebar-react";
import cl from "../../../../Exchange.module.css";
import {Link} from "react-router-dom";
import routes from "../../../../../../../constants/routes.constants";
import PropTypes from 'prop-types'
class Result extends Component{
  static propTypes = {
    handleClick: PropTypes.func,
    getClassName: PropTypes.func,
    markets: PropTypes.array
  };
  render() {
    const { handleClick, getClassName, markets, pair, isMobile  } = this.props
    return (
      <>
        <div className="result">
          <table className="marketes" width="100%">
            <thead>
            <tr id="mktspot">
              <th data-column='pair' width="25%" className={"first" + getClassName('pair')}>
                Валюта
              </th>
              <th data-column='last' className={getClassName('last')} width="33%">Цена</th>
              <th data-column='percentChange' width="26%" className={getClassName('percentChange')}>Изм.</th>
              <th data-column='last' className={getClassName('last')} width="16%">Об.</th>
            </tr>
            </thead>
          </table>
        </div>
        <SimpleBar style={{ height: 150, width: '100%' }}>
          <div className="viewport">
            <div className="overview" id="market_base_list">
              <div id="trade_market_wrapper" className="dataTables_wrapper no-footer">
                <table id="trade_market" className={cl.dataTable}>
                  <tbody>
                  <Link to={routes.exchang}>
                    <tr className="even">
                      <td className="first"> </td>
                      <td> </td>
                      <td className="red"> </td>
                      <td >  </td>
                    </tr>
                  </Link>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SimpleBar>
      </>
    )
  }
}
export default screenWidth(Result)
