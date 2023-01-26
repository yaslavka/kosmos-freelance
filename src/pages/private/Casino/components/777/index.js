import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
function Blacsd() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src={"https://demo.evoplay.games/demo/fullstate/html5/evoplay/starguardians"}
            width="100%"
            height={500}
            allowFullScreen
          />
          {/*<iframe*/}
          {/*  src={"/starguardians"}*/}
          {/*  width="100%"*/}
          {/*  height={500}*/}
          {/*  allowFullScreen*/}
          {/*/>*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Blacsd
