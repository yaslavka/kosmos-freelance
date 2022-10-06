import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'

function Blacc() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            id="game-frame"
            allowFullScreen={"allowfullscreen"}
            src="http://quickrpg/"
            width="100%"
            height={500}
            autofocus
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Blacc
