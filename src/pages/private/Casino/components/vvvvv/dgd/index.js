import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
import useMatchMedia from "use-match-media-hook";
import {useSelector} from "react-redux";

function Blacc() {
  const userInfo = useSelector((state) => state.app.user)
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src="http://xlife.host:81/mobile.html" width="100%" height={500}/>
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        {userInfo && (
        <Col xl={7}>
          <Spin />
          {
            desktop
            ?<iframe
                id="game-frame"
                allowFullScreen={"allowfullscreen"}
                src={`https://pervyimillion.host/`}
                width="100%"
                height={500}
                autofocus
              />
              :<iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src="https://pervyimillion.host/mobile.html" width="100%" height={500}/>
          }
        </Col>
        )}
      </Row>
    </Container>
  )
}
export default Blacc
