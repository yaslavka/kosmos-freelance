import React, {Component} from "react";
import {Link} from "react-router-dom";
import screenWidth from '../../../decorators/screenWidth'

class Markets extends Component{
  render() {
    const { market, pair,  isMobile } = this.props;
    const currentPair = market.pair.replace('_', '-')
    if(pair || isMobile) return (
      <>
        <Link to={/trade/+market.market+'-'+market.coin}>
          <tr className={pair===currentPair ? 'even' : 'markets-list__table-row'}>
            <td className="first"> {market.market}-{market.coin}</td>
            <td >{market.high24hr}</td>
            <td className={market.percentChange>0 ? 'markets-list__percent--plus': 'markets-list__percent--minus' }>{market.percentChange} </td>
            <td className="red">{market.baseVolume}</td>
          </tr>
        </Link>
      </>
    )
    return (
      <>
        <Link to={/trade/+market.market+'-'+market.coin}>
          <tr className={pair===currentPair ? 'even' : 'markets-list__table-row'}>
            <td className="first"> {market.market}-{market.coin}</td>
            <td className={market.percentChange>0 ? 'markets-list__percent--plus': 'markets-list__percent--minus' }>{market.percentChange} </td>
            <td className="red">{market.baseVolume}</td>
            <td >{market.high24hr}</td>
          </tr>
        </Link>
      </>
    )
  }
}
export default screenWidth(Markets);
