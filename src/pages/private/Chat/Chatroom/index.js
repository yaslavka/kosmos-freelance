import React, {useEffect, useState} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import avatar from "../../../../assets/images/icons/camera_200.png";
import {Input} from "reactstrap";

function Chatroom({ socket, userInfo, room }){
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userInfo.username,
        userId: userInfo.id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData,]);
      setCurrentMessage("");
    }
  };
  // /static/media/camera_200.77e62bce.png
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      // setShowChat(true);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [ ...list, data]);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("getOldMessage", (data) => {
      setMessageList(()=>data);
    });
  }, [socket]);

  useEffect(()=>{
    joinRoom()
  }, [])
  return(
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <ScrollToBottom className="message-container">
          <div className="chat-body" >
            {messageList.map((messageContent, index) => {
              return (
                <div
                  className="message"
                  id={userInfo?.username == messageContent.author ? "you" : "other"}
                  key={index}
                >
                  <div className='d-flex'>
                    <div>
                      <img
                        className='chat-avatar'
                        src={
                          userInfo?.username == messageContent.author
                            ? ((userInfo?.avatar) ? `${process.env.REACT_APP_BASE_URL}/user/${userInfo.avatar}` : avatar)
                            : ((messageContent?.user?.avatar) ? `${process.env.REACT_APP_BASE_URL}/user/${messageContent.user.avatar}` : avatar)
                        }
                        alt={userInfo?.avatar}
                      />
                    </div>
                    <div>
                      <div className="message-meta">
                        <p id="author">{messageContent.author}</p>
                        <p id="time">{messageContent.time}</p>
                      </div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollToBottom>
        <div className="chat-footer">
          <Input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  )
}
export default Chatroom
