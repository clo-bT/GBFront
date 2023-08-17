import React, { useState, useEffect } from "react";
import axios from "axios";
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import Header from '../Header';
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.css";
import Header from "../Header";

const ChatListComponent = () => {
  const navigate = useNavigate();
  // const [userid, setUserid] = useState('');
  const [chatData, setChatData] = useState([]);
  const [useruuid, setUserUuid] = useState("");

  useEffect(() => {
    const member = JSON.parse(sessionStorage.getItem("member"));
    setUserUuid(member.id);
  }, []);

  useEffect(() => {
    if (useruuid === "") return;
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/chatroom/list/${useruuid}`)
      .then((response) => {
        console.log("받아온 정보:", response.data);
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
    window.location.href = `/chatroom/${isGrantor}/${chatRoom.id}/${chatRoom.roomDealId}`;
    // navigate(`/chatroom/${isGrantor}/${chatRoom.id}/${chatRoom.roomDealId}`);
  };

  return (
    <div>
      <div className={styles.chatlistpage}>
        <div className={styles.chatlist}>
          {chatData.length > 0 ? (
            chatData.map((ChatRoom) => (
              <div key={ChatRoom.id} className={styles.chatlistnickname}>
                {ChatRoom.grantorId !== useruuid ? (
                  <label onClick={() => enterChatRoom(ChatRoom)}>
                    <div>{ChatRoom.grantorId.nickname} 님과의 대화</div>
                    <div className={styles.entering}>입장하기</div>
                  </label>
                ) : (
                  <label onClick={() => enterChatRoom(ChatRoom)}>
                    <div>{ChatRoom.assignee.nickname} 님과의 대화</div>
                    <div className={styles.entering}>입장하기</div>
                  </label>
                )}
              </div>
            ))
          ) : (
            <div className={styles.nochat}>채팅 목록이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListComponent;
