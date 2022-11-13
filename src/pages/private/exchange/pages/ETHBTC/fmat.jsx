import React, {Component} from "react";
import cl from "../../Exchange.module.css";
import BuyFormComponent from "./components/Form/BuyForm";
import HistoriBuySel from "./components/Market/HistoriBuySel";
import {Col} from "reactstrap";
import Market from "./components/Market/Market";
import SellFormComponent from "./components/Form/SellForm";
import Chart from "./components/Chart";



class Fmat extends Component{
  render() {
    const { pair, isMobile, userInfo, t} = this.props
    const pairFormatted = (pair?? '-').replace('-', '_')
    const marketsTab = isMobile ? null : (<Market pair = {pair} t={t}/>)
    return(
      <>
        <Col xl={9}>
          <div className={cl.contentBlock}>
            <Chart pair = { pairFormatted } t={t} />
            <div className={cl.buySellCard}>
              <BuyFormComponent pair = { pairFormatted } userInfo={userInfo} t={t}/>
              <SellFormComponent pair = { pairFormatted } userInfo={userInfo} t={t}/>
            </div>
            {marketsTab}
            <HistoriBuySel pair = { pairFormatted } t={t}/>
          </div>
        </Col>
      </>
    )
  }
}
export default Fmat
