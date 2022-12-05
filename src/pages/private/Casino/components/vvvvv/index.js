import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'
import useMatchMedia from "use-match-media-hook";

function Nukeworld() {
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)',
    '(f)'
  ]
  const [mobile, desktop] = useMatchMedia(queries)
  if(mobile) return <iframe id="game-frame"  title={'Nuke World'} allowFullScreen={true} autofocus={true} src={'/nukeworld/mobile.html'} height={500}/>
    return(
     <>
       {
         desktop
           ?
           <Container className="root-page" title={'Nuke World'}>
             <Row>
               <Col xl={3} className="d-none d-xl-block">
                 <NavBar />
               </Col>
               <Col xl={7}>
                 <Spin />
                 <iframe
                   id="game-frame"
                   allowFullScreen={true}
                   width="100%"
                   title={'Nuke World'}
                   src={'/nukeworld/index.html'}
                   height={400}
                 />
               </Col>
             </Row>
           </Container>:<iframe id="game-frame"  title={'Nuke World'} allowFullScreen={true} src={'/nukeworld/mobile.html'}  autofocus={true}  height={500}/>}
     </>

    )
}
export default Nukeworld
