// src/socketConfig.js
import { Client } from "@stomp/stompjs";

const socketUrl = "";
const stompClient = new Client({
  brokerURL: socketUrl,
  connectHeaders: {
    // 웹 소켓 연결에 필요한 헤더나 토큰 등을 설정할 수 있습니다.
  },
  debug: function (str) {
    console.log(str);
  },
});

export default stompClient;
