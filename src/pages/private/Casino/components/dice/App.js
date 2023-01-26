import React from 'react'
import NavBar from '../../../../../components/layout/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Spin from '../Header'
function DICE() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/belatra/fairyland2/?project=294&user_id=c5be57a4-ffc8-4542-8ada-a466e1df32b7&demo=1&wid=1&s=9cfee95755a85ed32ed686dd8571ace5"}
            width="100%"
            allowFullScreen
            height={500} />
          {/*<iframe*/}
          {/*  src={"/fairyland2"}*/}
          {/*  width="100%"*/}
          {/*  allowFullScreen*/}
          {/*  height={500} />*/}
        </Col>
      </Row>
    </Container>
  )
}

export default DICE
