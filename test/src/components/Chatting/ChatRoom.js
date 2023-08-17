// import axios from 'axios';
import Header from "../Header";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatList from "./ChatList";
import axios from "axios";
import styles from "./ChatRoom.module.css";
import ChatRoomComponent from "./ChatRoomComponent";
import ChatListComponent from "./ChatListComponent";

const ChatRoom = () => {
  const { isGrantor, id, roomDealId } = useParams();
  const navigate = useNavigate();

  function enterLive() {
    if (isGrantor === "true") navigate(`/rtcroom/grantor/${id}/${roomDealId}`);
    // if (isGrantor === "true") navigate(`/rtcroom/qr/${id}/${roomDealId}`);
    else navigate(`/rtcroom/assignee/${id}/${roomDealId}`);
    // navigate(`/rtcroom/${room_id}/${roomDealId}`);
  }

  return (
    <div>
      <Header />
      <div className={`${styles.ChatRoom} ${styles.flexContainer}`}>
        <div className={styles.ChatList}>
          <ChatListComponent />
        </div>
        <div className={styles.ChatContent}>
          <button className={styles.EnterLiveBtn} onClick={() => enterLive()}>
            화상채팅하기
          </button>
          <ChatRoomComponent isGrantor={isGrantor} id={id} roomDealId={roomDealId} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
