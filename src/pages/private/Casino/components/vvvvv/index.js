import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
import useMatchMedia from "use-match-media-hook";

function Nukeworld() {
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src={'./QuickRPG/mobile.html'}  width="100%" height={500}/>
    return(
      <Container className="root-page" title={'Nuke World'}>
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar />
          </Col>
          <Col xl={7}>
            <Spin />
            {
                desktop
                ?<iframe
                  id="game-frame"
                  allowFullScreen={"allowfullscreen"}
                  width="100%"
                  src={'./QuickRPG'}
                  height={500}
                />
                :<iframe id="game-frame" allowFullScreen src={'./QuickRPG/mobile.html'} width="100%" height={600} autofocus/>
              }
          </Col>
        </Row>
      </Container>

    )
}
export default Nukeworld
