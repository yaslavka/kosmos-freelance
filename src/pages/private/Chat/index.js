import React from 'react'
import io from "socket.io-client";
import { useState } from "react";
import Chatroom from "./Chatroom";
import {useSelector} from "react-redux";
import './App.css'
import NavBar from "../../../components/layout/Navbar";
import {Col, Row} from "reactstrap";
const socket = io.connect("http://localhost:3001");

function Chat(){
  const userInfo = useSelector((state) => state.app.user)
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  return(
    <>
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <div className="App">
            <Chatroom socket={socket} username={userInfo} room={room} />
          </div>
        </Col>
      </Row>
    </>
  )
}
export default Chat
