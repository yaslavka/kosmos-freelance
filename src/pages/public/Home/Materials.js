import React from 'react'
import AOS from 'aos'
import {Col, Row} from "reactstrap";
import YouTube from "react-youtube";

AOS.init()
AOS.refresh()
function Materials() {
  const opts={
    padding: -2,
    width: '100%',
  }
  return (
    <div id="materials"  data-aos="flip-left" className="materials">
      <Row>
      <Col sm="2" md={{ size: 4, offset: 1 }}>
        <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
      </Col>
      <Col sm="2" md={{ size: 4, offset: 1 }}>
        <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
      </Col>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
      </Row>
      <Row>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
        <Col sm="2" md={{ size: 4, offset: 1 }}>
          <YouTube videoId="_nBlN9yp9R8" opts={opts}/>
        </Col>
      </Row>
    </div>
  )
}

export default Materials
