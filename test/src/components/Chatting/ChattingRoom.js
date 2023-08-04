import Header from "../Header";
import React, { useState } from "react";
import stompClient from "../../socketConfig";

export default function ChattingRoom() {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSendMessage = () => {
      if (message.trim() !== "") {
        const newMessage = {
          username: "사용자 이름", // 사용자 이름 또는 식별자
          content: message.trim(),
        };
        // STOMP 프로토콜을 사용하여 채팅 메시지를 서버로 보냅니다.
        stompClient.publish({ destination: "/app/sendMessage", body: JSON.stringify(newMessage) });
        setMessage("");
      }
    };
    return (
        <div>
        <Header />
        <div>
        {chatMessages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}</strong>: {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>

            
        </div>
        )
};