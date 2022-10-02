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

        </Col>
      </Row>
    </Container>
  );
};

export default Megaciti;
