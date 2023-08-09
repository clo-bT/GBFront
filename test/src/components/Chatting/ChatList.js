import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import styles from "./Chat.module.css";
import Header from '../Header';


const ChatList = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState('');
    const [userid, setUserid] = useState('');
    const [chatData, setChatData] = useState([]);
    useEffect(() => {
        setIsAuthorized(sessionStorage.getItem("isAuthorized"));
        setUserid(sessionStorage.getItem("userid"));
    }, []); 
    useEffect(() => {
        // if (isAuthorized) {
            axios.get(`/chatroom/list/${userid}`) 
                .then(response => {
                    console.log('받아온 정보:', response.data.ChatRoom);
                    // data : chat_room_id, grantor_id, assignee_id, room_deal_id
                    setChatData(response.data.ChatRoom); 
                })
                .catch(error => {
                    console.log('오류:', error);
                });
        // } else {
        //     navigate('/login');
        // }
    }, [isAuthorized, userid, navigate]);
    const enterChatRoom = (chat_room_id, room_deal_id) => {
        // Chatroom 컴포넌트로 전달할 작업 수행
        navigate(`/chatroom/${chat_room_id}/${room_deal_id}`);
    };

    return (
        <div className={styles.chatlist}>
            <Header />
            <div className={styles.h1}>Message</div>
                {chatData.map((ChatRoom, index) => (
                    <label
                        className={styles.chatlistnickname}
                        key={index}
                        onClick={() => enterChatRoom(ChatRoom.chat_room_id, ChatRoom.room_deal_id)}
                    >
                        {/* 채팅방 ID: {ChatRoom.chat_room_id}<br /> */}
                        {/* 방 매물 ID: {ChatRoom.room_deal_id} */}
                        {ChatRoom.grantor_id.nickname} 님과의 대화
                        <div>입장하기</div>
                    </label>
                ))}
        </div>
    )
}

export default ChatList;