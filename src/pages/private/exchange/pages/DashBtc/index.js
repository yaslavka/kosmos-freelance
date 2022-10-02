import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import cl from './../../Exchange.module.css';
import NavBar from '../../../../../components/layout/Navbar'
import BuyFormComponent from './components/Form/BuyForm'
import SellFormComponent from './components/Form/SellForm'
import HistoriBuySel from './components/Market/HistoriBuySel'
import Chart from './components/Chart/Chart'
import Markets from './components/Market/Market'

const Dashbtc = () => {
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

export default Dashbtc
