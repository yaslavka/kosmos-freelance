import React, {Component} from "react";
import cl from "../../Exchange.module.css";
import BuyFormComponent from "./components/Form/BuyForm";
import HistoriBuySel from "./components/Market/HistoriBuySel";
import {Col} from "reactstrap";
import Market from "./components/Market/Market";
import SellFormComponent from "./components/Form/SellForm";
import Chart from "./components/Chart/index";


class Fmat extends Component{
  render() {
    const { pair, isMobile, userInfo} = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')
    const marketsTab = isMobile ? null : (<Market pair = {pair} />)
    return(
      <>
        <Col xl={9} style={{marginLeft:'15%'}}>
          <div className={cl.contentBlock}>
            <Chart pair = { pairFormatted }/>
            <div className={cl.buySellCard}>
              <BuyFormComponent pair = { pairFormatted } userInfo={userInfo}/>
              <SellFormComponent pair = { pairFormatted } userInfo={userInfo}/>
            </div>
            {marketsTab}
            <HistoriBuySel pair = { pairFormatted } />
          </div>
        </Col>
      </>
    )
  }
}
export default Fmat
