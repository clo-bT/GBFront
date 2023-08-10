import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Header from '../Header';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from "./Chat.module.css";
import axios from 'axios';


var stompClient=null;
const ChatRoom = () => {
    // const navigate = useNavigate();
    // const [userid, setUserid] = useState('');
    const { id, roomDealId, grantorId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const [previousmessage, setPreviousmessage] = useState([]);
    const [connecting, setConnecting] = useState(true);
    useEffect(() => {
        // const userid = JSON.parse(sessionStorage.getItem("member")).id;
        connect();
        previousMessage();
    }, []); 

    function connect() {
        // 연결하고자하는 Socket 의 endPoint
    const socket = new SockJS('http://localhost:8080/ws-stomp');
    stompClient = Stomp.over(socket);
    // {}는 header에 담길 내용, 뒤의 함수들은 콜백 함수
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",stompClient)
    stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
        // sub 할 url => /sub/chat/room/roomId 로 구독한다
        stompClient.subscribe('/sub/chat/room/' + id, onMessageReceived);
        // 서버에 유저가 들어왔다는 것을 알림
        // /pub/chat/enterUser 로 메시지를 보냄
        stompClient.send("/pub/chat/enteruser",
            {},
            JSON.stringify({
                "roomId": id,
                "userId": grantorId,
            })
        );

        // axios.get(`http://localhost:8080/chat/history/${id}`)
        //     .then(response => {
        //         console.log('받아온 정보 : ', response.data);
        //     }).catch(error => {
        //         console.log('오류:', error);
        //     });
    }
    function onError(error) {
        // 오류 처리
    }
    function previousMessage() {
        
    axios.get(`http://localhost:8080/chat/history/${id}`)
        .then(response => {
            console.log('받아온 정보 : ', response.data);
        }).catch(error => {
            console.log('오류:', error);
        });
    }
    function sendMessage(event) {
        event.preventDefault();
        console.log(message);
        const messageContent = message.trim();
        console.log(messageContent);
        console.log("++++++++++++++++++++++++++++++++++++++++",stompClient);

        if (messageContent && stompClient) {
            const chatMessage = {
                chat : {
                    'messageId' : '',
                    'roomId': id,
                    'sender': grantorId,
                    'message': messageContent,
                    'time': ''
                }
            };
            console.log(chatMessage)
            stompClient.send("/pub/chat/sendmessage", {}, JSON.stringify(chatMessage));
            setMessage('');
            }
        }
        function onMessageReceived(payload) {
            const chat = JSON.parse(payload.body);
            console.log('payload!!!!!!!!!!!',payload)
            setMessages(prevMessages => [...prevMessages, chat]);
        }

    return (
        <div className={styles.ChatRoom}>
            <Header />
        <ul id="messageArea">
            {messages.map((chat, index) => (
            <li key={index} className="chat-message">
                {/* <i>{chat.sender[0]}</i> */}
                <span>{chat.sender}</span>
                <p>{chat.message}</p>
            </li>
            ))}
            </ul>
            <form id="messageForm">
                <input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
            <div>채팅방 id : { id }</div>
            <div>방 매물 id : { roomDealId }</div>
            <div className={`connecting ${connecting ? 'show' : ''}`}>
                Connecting...
            </div>
        </div>
    )
}

export default ChatRoom;