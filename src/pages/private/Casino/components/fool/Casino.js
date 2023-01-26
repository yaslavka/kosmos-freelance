import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spin from '../Header'

function Fool() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/residentv2/?project=294&user_id=00019f60-fac5-4af3-8603-153d9ea51805&demo=1&wid=1&s=0d07f2fab89215833e8c623b5fe03a14"} width="100%"
                  allowFullScreen
                  height={500}/>
          {/*<iframe src={"/resident"} width="100%"*/}
          {/*        allowFullScreen*/}
          {/*        height={500}/>*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Fool
