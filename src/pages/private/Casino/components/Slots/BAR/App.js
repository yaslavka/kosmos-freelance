import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../../components/layout/Navbar'
import Spin from '../../Header'

const Bar = () => {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/crazymonkeyv2/?project=294&user_id=4b03d919-cc52-42cd-8bde-abae023d7a02&demo=1&wid=1&s=a380a2e902fd8f067e7ed94f86aaf4b7"} width="100%" allowFullScreen height={500} />
          {/*<iframe src={"/crmonkey"} width="100%" allowFullScreen height={500} />*/}
        </Col>
      </Row>
    </Container>
  )
}

export default Bar
