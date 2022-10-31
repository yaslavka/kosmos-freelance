import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'

function Monk() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spin />
          <iframe src={"/rockclimber"} width="100%"
                  allowFullScreen
                  height={500} />
        </Col>
      </Row>
    </Container>
  )
}
export default Monk
