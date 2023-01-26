import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
import useMatchMedia from "use-match-media-hook";

function Savethehamster() {
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src={"https://demo.evoplay.games/demo/socketgames/evoplay/savethehamster"} width="100%" height={500}/>
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spin />
          {
            desktop
              ?<iframe
                id="game-frame"
                allowFullScreen={"allowfullscreen"}
                src="https://demo.evoplay.games/demo/socketgames/evoplay/savethehamster"
                width="100%"
                height={500}
              />
              :<iframe id="game-frame" allowFullScreen src="https://demo.evoplay.games/demo/socketgames/evoplay/savethehamster"  width="100%" height={600} autofocus/>
          }
        </Col>
      </Row>
    </Container>
  )
}
export default Savethehamster
