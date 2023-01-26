import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spin from '../Header'

function Costs() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spin />
          <iframe src={"https://aplaydemo.slotwalker.com/game/fullstate/html5/igrosoft/gnomev2/?project=294&user_id=ffd6dbf0-50e9-482c-b98f-1204ee804871&demo=1&wid=1&s=a477af9db50e1efa2b68c0f733e66d9f"} width="100%"
                  allowFullScreen
                  height={500}/>
  {/*        <iframe src={"/gnom"} width="100%"*/}
  {/*                allowFullScreen*/}
  {/*height={500}/>*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Costs
