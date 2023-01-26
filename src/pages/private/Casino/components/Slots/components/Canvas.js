import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../../components/layout/Navbar'
import Spin from '../../Header'

function Canvas() {
  return (
      <Container className="root-page">
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar />
          </Col>
          <Col xl={7}>
            <Spin />
            <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/keksv2/?project=294&user_id=a19260f1-70ec-420e-92e6-9cf23fba5cd9&demo=1&wid=1&s=dc926aa250988aa2cea7a9ab90a5f1e3"} width="100%" allowFullScreen height={500}/>
            {/*<iframe src={"/keks"} width="100%" allowFullScreen height={500}/>*/}
          </Col>
        </Row>
      </Container>
  )

}

export default Canvas
