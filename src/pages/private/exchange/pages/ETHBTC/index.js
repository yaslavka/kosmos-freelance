import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'
import '../../stoc.css'
import cl from './../../Exchange.module.css';
import NavBar from '../../../../../components/layout/Navbar'
import Chart from "./components/Chart/Chart";
import BuyFormComponent from "../DashBtc/components/Form/BuyForm";
import SellFormComponent from "../DashBtc/components/Form/SellForm";
import Markets from "../DashBtc/components/Market/Market";
import HistoriBuySel from "../DashBtc/components/Market/HistoriBuySel";
class Exchange extends Component {
  render() {
    return (
      <Container className="root-page">
        <Row>
            <div className={cl.navBlock}>
            <NavBar />
            </div>
         
            <div className={cl.contentBlock}>
          <Chart width="100%" />
          <div className={cl.buySellCard}>
            <BuyFormComponent />
            <SellFormComponent />
          </div>
            <Markets />
            <HistoriBuySel width="100%" />
         </div>
        </Row>
      </Container>
    )
  }
}

export default Exchange
