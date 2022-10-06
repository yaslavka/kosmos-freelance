import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
function Blaccd() {
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
            src="https://demo.evoplay.games/demo/table/html5/evoplay/europeanroulette"
            width="100%"
            height={500}
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Blaccd
