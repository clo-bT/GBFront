import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import styles from "./Chat.module.css";



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
        if (isAuthorized) {
            axios.get(`/chat/list/user/${userid}`) 
                .then(response => {
                    console.log('받아온 정보:', response.data);
                    setChatData(response.data.chat); 
                })
                .catch(error => {
                    console.log('오류:', error);
                });
        } else {
            navigate('/login');
        }
    }, [isAuthorized, userid, navigate]);
    return (
        <div className={styles.chatlist}>
            <h1>Chat List</h1>
            <ul>
                {chatData.map((chatItem, index) => (
                    <li key={index}>
                        Chat Room ID: {chatItem.chat_room_id}<br />
                        Grantor ID: {chatItem.grantor_id}<br />
                        Assignee ID: {chatItem.assignee_id}<br />
                        Room Deal ID: {chatItem.room_deal_id}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList;