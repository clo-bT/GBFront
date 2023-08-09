import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Header from '../Header';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from "./Chat.module.css";


const ChatRoom = () => {
    // const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);
    const [userid, setUserid] = useState('');
    const { chat_room_id, room_deal_id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connecting, setConnecting] = useState(true);
    useEffect(() => {
        setUserid(sessionStorage.getItem("userid"));
        // connect();
    }, []); 

    function connect(event) {
        // 연결하고자하는 Socket 의 endPoint
        const socket = new SockJS('/ws-stomp');
        const client = Stomp.over(socket);
        
        // {}는 header에 담길 내용, 뒤의 함수들은 콜백 함수
        stompClient.connect({}, onConnected, onError);
        setStompClient(client);
        event.preventDefault();
    }
    function onConnected() {
        // sub 할 url => /sub/chat/room/roomId 로 구독한다
        stompClient.subscribe('/sub/chat/room/' + chat_room_id, onMessageReceived);
    
        // 서버에 유저가 들어왔다는 것을 알림
        // /pub/chat/enterUser 로 메시지를 보냄
        stompClient.send("/pub/chat/enterUser",
            {},
            JSON.stringify({
                "roomId": chat_room_id,
                "userId": userid,
                "message": `${userid} 님 입장`,
                type: 'ENTER'
            })
        )
    }
    function onError(error) {
        // 오류 처리
    }
    
    function sendMessage(event) {
        event.preventDefault();
        const messageContent = message.trim();
        if (messageContent && stompClient) {
            const chatMessage = {
                "roomId": chat_room_id,
                sender: userid,
                message: messageContent,
                type: 'TALK'
            };
        
            stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
            setMessage('');
            }
        }
        function onMessageReceived(payload) {
            const chat = JSON.parse(payload.body);
        
            setMessages(prevMessages => [...prevMessages, chat]);
        }

    return (
        <div className={styles.ChatRoom}>
        <Header />
        <ul id="messageArea">
            {messages.map((chat, index) => (
            <li key={index} className="chat-message">
                <i>{chat.sender[0]}</i>
                <span>{chat.sender}</span>
                <p>{chat.message}</p>
            </li>
            ))}
            </ul>
            <form id="messageForm" onSubmit={sendMessage}>
                <input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <div>{ room_deal_id }</div>
            <div className={`connecting ${connecting ? 'show' : ''}`}>
                Connecting...
            </div>
        </div>
    )
}

export default ChatRoom;