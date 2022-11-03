import React, { Component } from 'react';
import PropTypes from 'prop-types'
import screenWidth from '../../../decorators/screenWidth'
import cl from "../../../../Exchange.module.css";
import SimpleBar from "simplebar-react";

class MarketsTable extends Component {

  static propTypes = {
    handleClick: PropTypes.func,
    getClassName: PropTypes.func,
    markets: PropTypes.array
  };

  render() {
    const { handleClick, getClassName, markets, pair, isMobile  } = this.props

    if(pair || isMobile) return (
      <>
        <div className="result">
          <table className="marketes" width="100%">
            <thead>
            <tr id="mktspot" onClick={handleClick}>
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
                  {markets}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SimpleBar>
      </>
    )
    return (
      <>
        <div className="result">
          <table className="marketes" width="100%">
            <thead>
            <tr id="mktspot" onClick={handleClick}>
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
        <SimpleBar style={{ height: 250, width: '100%' }}>
          <div className="viewport">
            <div className="overview" id="market_base_list">
              <div id="trade_market_wrapper" className="dataTables_wrapper no-footer">
                <table id="trade_market" className={cl.dataTable}>
                  <tbody>
                  {markets}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SimpleBar>
      </>
    );
  }

}

export default screenWidth(MarketsTable)
