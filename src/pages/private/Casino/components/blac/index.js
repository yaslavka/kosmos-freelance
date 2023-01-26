import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spio from '../../../../../components/Header'
import useMatchMedia from "use-match-media-hook";

function Raccoontales() {
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame" allowFullScreen={"allowfullscreen"} autofocus src={"/raccoontales/mobile.html"} width="100%" height={500}/>
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spio />
          <iframe
            id="game-frame"
            allowFullScreen={"allowfullscreen"}
            src={"https://demo.evoplay.games/demo/fullstate/html5/evoplay/raccoontales"}
            width="100%"
            height={500}
          />
          {/*{*/}
          {/*  desktop*/}
          {/*    ?<iframe*/}
          {/*      id="game-frame"*/}
          {/*      allowFullScreen={"allowfullscreen"}*/}
          {/*      src={"/raccoontales"}*/}
          {/*      width="100%"*/}
          {/*      height={500}*/}
          {/*    />*/}
          {/*    :<iframe id="game-frame" allowFullScreen src={"/raccoontales/mobile.html"} width="100%" height={600} autofocus/>*/}
          {/*}*/}
        </Col>
      </Row>
    </Container>
  )
}
export default Raccoontales
