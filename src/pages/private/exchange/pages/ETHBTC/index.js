import React, { useState} from 'react'
import {Row, Container, Col} from 'reactstrap'
import '../../stoc.css'
import cl from './../../Exchange.module.css';
import NavBar from '../../../../../components/layout/Navbar'
import Chart from "./components/Chart/Chart";
import BuyFormComponent from "./components/Form/BuyForm";
import SellFormComponent from "./components/Form/SellForm";
import HistoriBuySel from "./components/Market/HistoriBuySel";
import Market from "./components/Market/Market";

function Exchange() {
  const [priceBuy, setPriceBuy] = useState(10000.00000000)
  const [priceSell, setPriceSell] = useState(10000.00000000)

    return (
      <Container className="root-page">
        <Row>
          <Col xl={3} className={cl.navBlock}>
            <NavBar />
          </Col>
          <div className={cl.contentBlock}>
            <Chart width="100%" />
            <div className={cl.buySellCard}>
              <BuyFormComponent priceBuy={priceBuy}/>
              <SellFormComponent priceSell={priceSell}/>
            </div>
            <Market />
            <HistoriBuySel width="100%" />
          </div>
        </Row>
      </Container>
    )
}

export default Exchange
