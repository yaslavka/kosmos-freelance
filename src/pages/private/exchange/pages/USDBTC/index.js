import React from 'react'
import { Row, Col, Container } from 'reactstrap'

import Chart from './components/Chart/Chart'
import '../../stoc.css'
import cl from './../../Exchange.module.css';
import BuyFormComponent from './components/Form/BuyForm'
import SellFormComponent from './components/Form/SellForm'
import Market from './components/Market/Market'
import HistoriBuySel from './components/Market/HistoriBuySel'
import NavBar from '../../../../../components/layout/Navbar'

const Usd = () => {
  return (
    <Container className="root-page">
      <Row>
        
      <div className={cl.navBlock}>
            <NavBar />
            </div>
          <div className={cl.contentBlock}>
          <Chart />
          <div className={cl.buySellCard}>
            <BuyFormComponent />
            <SellFormComponent />
          </div>
          <Market />
          <HistoriBuySel />
        </div>
      </Row>
    </Container>
  )
}

export default Usd
