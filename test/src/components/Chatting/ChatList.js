import React, { useState, useEffect } from "react";
import axios from "axios";
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import Header from '../Header';
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.css";
import Header from "../Header";

const ChatList = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState("");
  // const [userid, setUserid] = useState('');
  const [chatData, setChatData] = useState([]);
  const [useruuid, setUserUuid] = useState("");

  useEffect(() => {
    setIsAuthorized(sessionStorage.getItem("isAuthorized"));
    // setUserid(JSON.parse(sessionStorage.getItem("member")).id);
    const member = JSON.parse(sessionStorage.getItem("member"));
    setUserUuid(member.id);

    // if (isAuthorized) {

    // axios
    //   .get(`http://localhost:8080/chatroom/list/${useruuid}`)
    //   .then((response) => {
    //     console.log("받아온 정보:", response.data);
    //     // data : chat_room_id, grantor_id, assignee_id, room_deal_id
    //     setChatData(response.data.data.list);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("오류:", error);
    //   });
    // } else {
    //     navigate('/login');
    // }
  }, []);

  useEffect(() => {
    if (useruuid === "") return;
    axios
      .get(`http://localhost:8080/chatroom/list/${useruuid}`)
      .then((response) => {
        console.log("받아온 정보:", response.data);
        // data : chat_room_id, grantor_id, assignee_id, room_deal_id
        setChatData(response.data.data.list);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("오류:", error);
      });
  }, [useruuid]);

  const enterChatRoom = (chatRoom) => {
    // Chatroom 컴포넌트로 전달할 작업 수행
    const isGrantor = chatRoom.grantorId.id === useruuid ? true : false;
    console.log(chatRoom);
    console.log(chatRoom.grantorId.id);
    console.log(useruuid);
    console.log(isGrantor);
    navigate(`/chatroom/${isGrantor}/${chatRoom.id}/${chatRoom.roomDealId}`);
  };

  return (
    <div className={styles.chatlist}>
      <Header />
      <div className={styles.h1}>Message</div>
      {chatData &&
        chatData.map((ChatRoom, index) => (
          <label
            className={styles.chatlistnickname}
            key={index}
            onClick={() => enterChatRoom(ChatRoom)}
          >
            {/* 채팅방 ID: {ChatRoom.id}<br /> */}
            {/* 방 매물 ID: {ChatRoom.roomDealId} */}
            {ChatRoom.grantorId.nickname} 님과의 대화
            <div>입장하기</div>
          </label>
        ))}
    </div>
  );
};

export default ChatList;
