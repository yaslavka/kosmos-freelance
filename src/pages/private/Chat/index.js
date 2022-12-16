import React from 'react'
import io from "socket.io-client";
import { useState } from "react";
import Chatroom from "./Chatroom/room";
import {useSelector} from "react-redux";
import './App.css'
//import {api} from "../../../api";
import useMatchMedia from "use-match-media-hook";
const socket = io.connect("https://kosmoss.host");


function Chat(){
  const queries = [
    '(max-width: 400px)',
    '(min-width: 800px)',
    '(f)'
  ]
  const userInfo = useSelector((state) => state.app.user)
  const [room, setRoom] = useState("chat");
  const [mobile, desktop] = useMatchMedia(queries)
  if(desktop) return <><div className="Appcatd">
    <Chatroom socket={socket} userInfo={userInfo} room={room} />
  </div></>

  return(
    <>
      {desktop
        ?
        <div className="Appcatd">
          <Chatroom socket={socket} userInfo={userInfo} room={room} />
        </div>:<></>
      }
    </>
  )
}
export default Chat
