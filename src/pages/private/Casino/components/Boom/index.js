import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'

function Booom() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spin />
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/garagev2/?project=294&user_id=6edfb55b-7ed8-4c57-b44d-b62ddf4e5310&demo=1&wid=1&s=9a2378fe5cd3d413dc98532f74eddef8"} width="100%"
                  allowFullScreen
                  height={500} />
          {/*<iframe src={"/garage"} width="100%"*/}
          {/*        allowFullScreen*/}
          {/*        height={500} />*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Booom
