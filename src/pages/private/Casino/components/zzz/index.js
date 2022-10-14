import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spin from '../Header'
import useMatchMedia from 'use-match-media-hook'
function Sasn() {
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src="http://forestdreams/mobile.html" width="100%" height={500}/>
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin/>
          {
            desktop
            ?<iframe
                id="game-frame"
                allowFullScreen={"allowfullscreen"}
                src="http://forestdreams/"
                width="100%"
                height={500}
              />
              :<iframe id="game-frame" allowFullScreen src="http://forestdreams/mobile.html"  width="100%" height={600} autofocus/>
          }
        </Col>
      </Row>
    </Container>
  )
}
export default Sasn
