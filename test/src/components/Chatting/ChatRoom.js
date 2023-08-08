// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const stompClient = null;
const Chat = () => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userList, setUserList] = useState([]);

    const colors = [
        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];

    useEffect(() => {
        // roomId 파라미터 가져오기
        const url = new URL(window.location.href);
        const roomId = url.searchParams.get('roomId');
        setRoomId(roomId);
    }, []);

    const connect = (event) => {
        event.preventDefault();

        setUsername(event.target.name.value.trim());

        // username 중복 확인
        isDuplicateName();

        setIsConnected(true);

        // 연결하고자 하는 Socket의 endPoint
        const socket = new SockJS('/ws-stomp');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
        // sub할 url => /sub/chat/room/roomId로 구독한다.
        stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);

        // 서버에 username을 가진 유저가 들어왔다는 것을 알림
        // /pub/chat/enterUser로 메시지를 보냄
        stompClient.send("/pub/chat/enterUser",
            {},
            JSON.stringify({
            "roomId": roomId,
            sender: username,
            type: 'ENTER'
            })
        );

        setUserList([]);
        }, onError);
    };

    const isDuplicateName = () => {
        axios.get("/chat/duplicateName", {
        params: {
            "username": username,
            "roomId": roomId
        }
        })
        .then(response => {
            setUsername(response.data);
        })
        .catch(error => {
            console.log("Error checking duplicate name:", error);
        });
    };

    const getUserList = () => {
        axios.get("/chat/userlist", {
        params: {
            "roomId": roomId
        }
        })
        .then(response => {
            setUserList(response.data);
        })
        .catch(error => {
            console.log("Error getting user list:", error);
        });
    };

    const onError = () => {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
        // handle error state in your component as needed
    };

    const sendMessage = (event) => {
        event.preventDefault();

        const messageContent = message.trim();

        if (messageContent && isConnected) {
        const chatMessage = {
            "roomId": roomId,
            sender: username,
            message: message,
            type: 'TALK'
        };

        stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        setMessage('');
        }
    };

    const onMessageReceived = (payload) => {
        const chat = JSON.parse(payload.body);

        if (chat.type === 'ENTER' || chat.type === 'LEAVE') {
        getUserList();
        }

        setMessages(prevMessages => [...prevMessages, chat]);
    };

    const getAvatarColor = (messageSender) => {
        let hash = 0;
        for (let i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
        }

        const index = Math.abs(hash % colors.length);
        return colors[index];
    };

    return (
        <div>
        {!isConnected && (
            <form onSubmit={connect}>
            <input type="text" name="name" id="name" required />
            <button type="submit">Connect</button>
            </form>
        )}
        {isConnected && (
            <div>
            <ul id="messageArea">
                {messages.map((message, index) => {
                return (
                    <li key={index}>
                    {message.type === 'ENTER' || message.type === 'LEAVE' ? (
                        <span className="event-message">{message.sender} {message.message}</span>
                    ) : (
                        <span className="chat-message">
                        <i style={{ backgroundColor: getAvatarColor(message.sender) }}>{message.sender[0]}</i>
                        <span>{message.sender}</span>
                        <p>{message.message}</p>
                        </span>
                    )}
                    </li>
                );
                })}
            </ul>
            <form onSubmit={sendMessage}>
                <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul id="list">
                {userList.map((user, index) => (
                <li key={index} className="dropdown-item">{user}</li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};

export default Chat;
