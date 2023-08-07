import React, { useEffect, useState } from 'react';
import Header from '../Header';

const ChattingRoom = () => {
  const [participants, setParticipants] = useState({});
  const [currentUserId, setCurrentUserId] = useState(''); // 현재 사용자 아이디
  const [currentConferenceId, setCurrentConferenceId] = useState(''); // 현재 채팅방 아이디

  useEffect(() => {
    // WebSocket 연결 및 메시지 수신 이벤트 핸들러
    const ws = new WebSocket('YOUR_WEBSOCKET_URL');

    ws.onmessage = function (message) {
      var parsedMessage = JSON.parse(message.data);
      console.info("Received message:" + message.data);
      switch (parsedMessage.id) {
        case 'existingParticipants':
          onExistingParticipants(parsedMessage);
          break;
        case 'newParticipantArrived':
          onNewParticipant(parsedMessage);
          break;
        case 'participantLeft':
          onParticipantLeft(parsedMessage);
          break;
        case 'receiveVideoAnswer':
          receiveVideoResponse(parsedMessage);
          break;
        case 'iceCandidate':
          participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
            if (error) {
              console.error("Error adding candidate:" + error);
              return;
            }
          });
          break;
        default:
          console.error('Unrecognized message', parsedMessage);
      }
    };

    // Cleanup 함수: 컴포넌트가 언마운트될 때 WebSocket 연결을 닫음
    return () => {
      ws.close();
    };
  }, []); // 빈 배열은 이펙트가 마운트 또는 언마운트될 때만 실행되도록 설정

  // 자신의 영상을 미디어서버에 전달할 송신용 WebRtcPeer를 생성.
  function onExistingParticipants(msg) {
    var constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 15,
          minFrameRate: 15
        }
      }
    };
    console.log(currentUserId + " registered in room " + currentConferenceId);
    var participant = new Participant(currentUserId);
    setParticipants({ ...participants, [currentUserId]: participant });

    var video = participant.getVideoElement();
    var options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [{
          "urls": 'turn: 54.180.26.236:3478?transport=udp',
          "username": 'myuser',
          "credential": 'mypassword'
        }]
      }
    };
    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      });

    // 기존 참가자 영상을 전달 받을 수신용 WebRtcPeer를 생성.
    msg.data.forEach(receiveVideo);
  }

  // 새로운 참가자에 영상을 전달 받을 수신용 WebRtcPeer를 생성.
  function onNewParticipant(request) {
    receiveVideo(request.name);
  }

  // 영상을 전달 받을 수신용 WebRtcPeer 생성 함수.
  function receiveVideo(sender) {
    var participant = new Participant(sender);
    setParticipants({ ...participants, [sender]: participant });

    var video = participant.getVideoElement();
    var options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [{
          "urls": 'turn:54.180.26.236:3478?transport=udp',
          "username": 'myuser',
          "credential": 'mypassword'
        }]
      }
    };
    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      });
  }

  return (
    <div>
      <Header />
      {/* 채팅방 UI 내용을 구성하시면 됩니다. */}
    </div>
  );
};

export default ChattingRoom;

// 참가자 객체를 나타내는 Participant 클래스를 만드시면 됩니다.
class Participant {
  constructor(name) {
    this.name = name;
    this.rtcPeer = null;
  }

  getVideoElement() {
    // 채팅방 UI에서 표시할 비디오 엘리먼트를 생성하거나 가져와서 반환합니다.
    // 예시: return document.createElement('video');
  }

  onIceCandidate(candidate) {
    // ICE candidate 이벤트 처리
  }

  offerToReceiveVideo(error, offerSdp, wp) {
    // offer를 받아온 후 처리
  }
}
