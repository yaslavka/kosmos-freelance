import React from 'react'
import NavBar from '../../../../../components/layout/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Spin from '../Header'
function DICE() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src={"/fairyland2"}
            width="100%"
            allowFullScreen
            height={500} />
        </Col>
      </Row>
    </Container>
  )
}

export default DICE
