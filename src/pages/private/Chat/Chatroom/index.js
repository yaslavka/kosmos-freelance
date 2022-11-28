import React, {useEffect, useState} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import avatar from "../../../../scss/media/camera_200.png";

function Chatroom({ socket, userInfo, room }){
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userInfo.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  console.log(socket)

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("getOldMessage", (data) => {
      console.log(data);
      setMessageList(()=>data);
    });
  }, [socket]);

  return(
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body" style={{overflowY: 'scroll'}}>
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  className="message"
                  id={userInfo?.username == messageContent.author ? "you" : "other"}
                  key={index}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                      {/*<img*/}
                      {/*  src={*/}
                      {/*    userInfo.avatar*/}
                      {/*      ? `${process.env.REACT_APP_BASE_URL}/user/${userInfo.avatar}`*/}
                      {/*      : avatar*/}
                      {/*  }*/}
                      {/*  alt={userInfo.avatar}*/}
                      {/*/>*/}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
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
