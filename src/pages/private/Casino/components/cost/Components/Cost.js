import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../../components/layout/Navbar'
import Spin from '../../Header'

function Cost() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/luckyhaunterv2/?project=294&user_id=a9a38c73-f9c6-4a0a-9c80-5e7817cdbdb7&demo=1&wid=1&s=64907cc30d9ff490cf909c63908ff16b"} width="100%"
                  allowFullScreen
                  height={500} />
          {/*<iframe src={"/lucky_haunter"} width="100%"*/}
          {/*        allowFullScreen*/}
          {/*        height={500} />*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Cost
