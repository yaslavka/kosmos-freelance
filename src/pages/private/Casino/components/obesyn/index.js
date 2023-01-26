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
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/rockclimberv2/?project=294&user_id=38da9520-000e-4c49-9e74-a5152263f6a2&demo=1&wid=1&s=b86c460bd13a683adb8d86df0ded420b"} width="100%"
                  allowFullScreen
                  height={500} />
          {/*<iframe src={"/rockclimber"} width="100%"*/}
          {/*        allowFullScreen*/}
          {/*        height={500} />*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Monk
