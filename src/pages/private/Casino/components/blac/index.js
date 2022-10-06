import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spio from '../../../../../components/Header'

function Blac() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spio />
          <iframe
            id="game-frame"
            allowFullScreen={"allowfullscreen"}
            src="http://raccoontales/"
            width="100%"
            height={500}
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Blac
