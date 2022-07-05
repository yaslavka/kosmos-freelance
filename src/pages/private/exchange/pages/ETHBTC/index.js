import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'
import '../../stoc.css'
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
          <Col xl={3} className="d-none d-xl-block col-xl-38">
            <NavBar />
          </Col>
          <Col xl={9}>
          <Chart width="100%" />
            <BuyFormComponent width="100%" />
            <SellFormComponent width="100%" />
            <Markets />
            <HistoriBuySel width="100%" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Exchange
