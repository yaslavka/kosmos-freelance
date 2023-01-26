import React from 'react'
import './JuegoRuleta.css'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import Spin from './Header'

function JuegoRuleta() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src={'https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/fruitcocktailv2/?project=294&user_id=ed944d28-b5dc-41ce-87c2-6664a011659f&demo=1&wid=1&s=edd56d8dbb4a8c22e6bd7dcb5ab2344c'}
            allowFullScreen
            width="100%"
            height={500}
            title={'Fruit Cocktail'}
          />
          {/*<iframe*/}
          {/*  src={'/fruitcocktail'}*/}
          {/*  allowFullScreen*/}
          {/*  width="100%"*/}
          {/*  height={500}*/}
          {/*  title={'Fruit Cocktail'}*/}
          {/*/>*/}
        </Col>
      </Row>
    </Container>
  )
}
export default JuegoRuleta
