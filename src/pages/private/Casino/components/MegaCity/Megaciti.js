import React from 'react';
import {Col, Container, Row} from "reactstrap";
import NavBar from "../../../../../components/layout/Navbar";
import Spin from "../Header";
import "./components/index.scss"


const Megaciti = () => {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src={'https://aplaydemo.slotwalker.com/game/fullstate/html5/novomatic/bookofra/?project=294&user_id=516d4190-152a-4c85-a3c8-769efbd7dce6&demo=1&wid=1&s=94d19161ed8149cfd1f9d526212f747e'}
            allowFullScreen
            width="100%"
            height={500}
          />
          {/*<iframe*/}
          {/*  src={'/bookofra'}*/}
          {/*  allowFullScreen*/}
          {/*  width="100%"*/}
          {/*  height={500}*/}
          {/*/>*/}
        </Col>
      </Row>
    </Container>
  );
};

export default Megaciti;
