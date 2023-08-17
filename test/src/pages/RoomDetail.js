import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import styles from "./RoomDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const RoomDetail = () => {
  const { roomDealid } = useParams();
  const [roomdata, setRoomData] = useState([]);
  const [roomoption, setRoomOption] = useState([]);
  const [roomImages, setRoomImage] = useState([]);
  const expectedFee = roomdata.monthlyFee + roomdata.managementFee;
  const [userid, setUserid] = useState("");

  useEffect(() => {
    const member = JSON.parse(sessionStorage.getItem("member"));
    const useruuid = member.id;
    setUserid(useruuid);
  }, [setUserid]);

  useEffect(() => {
    console.log(roomDealid);
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/roomdeal/${roomDealid}`)
      .then((response) => {
        console.log("받아온 정보 : ", response.data);
        setRoomData(response.data.data.roomDeal);
        setRoomOption(response.data.data.roomDealOption);
        setRoomImage(response.data.data.fileUrls);
      })
      .catch((error) => {
        console.log("오류:", error);
      });
  }, [roomDealid]);

  const handleStar = () => {
    const StarRoomDealRegisterRequestDto = {
      memberId: userid,
      roomDealId: roomDealid,
    };
    axios
      .post(`${process.env.REACT_APP_API_ROOT}/star/register`, StarRoomDealRegisterRequestDto)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("API 호출 에러:", error);
      });
  };

  const handleChat = async () => {
    try {
      // 백엔드로 보낼 데이터 생성
      const requestData = {
        grantorId: roomdata.member.id,
        assigneeId: userid,
        roomDealId: roomDealid, // your room deal id here
      };

      // 백엔드 API 호출
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/chatroom/create`,
        requestData
      );

      if (response.status !== 200) {
        throw new Error("Failed to create chat room");
      }

      const responseData = response.data.data;
      const isGrantor = roomdata.member.id === userid ? true : false;
      // 생성된 채팅방으로 페이지 이동
      window.location.href = `/chatroom/${isGrantor}/${responseData.roomId}/${roomDealid}`; // Assuming you have a route for chat rooms
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  /* HTML + CSS */
  return (
    <div>
      <Header />
      <div className={styles.content}>
        {/* 매물 본문 */}
        <div className={styles.images}>
          <Swiper
            effect={"coverflow"}
            // grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            // coverflowEffect={{
            //   rotate: 50,
            //   stretch: 0,
            //   //   depth: 100,
            //   //   modifier: 1,
            // }}
            className="swiper"
          >
            {roomImages.map((image) => (
              <SwiperSlide className={styles.swiperSlide}>
                <img src={image} className={styles.swiperImg} alt="noImage" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.detail}>
          {/* 매물 상세 내용 */}
          <div className={styles.contentTab}>
            {/* 매물 상세 내용 좌측 탭 */}
            <div className={styles.contentDetail}>
              {/* 가격 정보 */}
              <h1>가격 정보</h1>
              <div className={styles.detailInfo}>
                {/* 월세 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>월세</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>
                    {roomdata.deposit} / {roomdata.monthlyFee}
                  </h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 관리비 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>관리비</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>매월 {roomdata.managementFee}만원</h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 한달 예상 주거 비용 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>
                    한달
                    <br />
                    예상 주거 비용
                  </h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>
                    <span className={styles.expectedFeeFont}>{expectedFee}만원</span>
                    <br />
                    월세 + 관리비
                  </h2>
                </div>
              </div>
            </div>
            <div className={styles.contentDetail}>
              {/* 상세 정보 */}
              <h1> 상세 정보</h1>
              <div className={styles.detailInfo}>
                {/* 방 종류 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>방종류</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>{roomdata.roomType}</h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 해당 층 / 건물 층 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>해당층 / 건물층</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>
                    {roomdata.floor}층 / {roomdata.totalFloor}층
                  </h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 방 수 / 욕실 수 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>방 수 / 욕실 수</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>
                    {roomdata.roomCount}개 / {roomdata.bathroomCount}개
                  </h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 주차 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>주차</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>{roomoption.parkingLot ? "가능" : "불가능"}</h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 사용 승인일 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>사용 승인일</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>{roomdata.usageDate}</h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 입주 가능일 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>입주 가능일</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>{roomdata.moveInDate}</h2>
                </div>
              </div>
              <hr />
              <div className={styles.detailInfo}>
                {/* 계약 만료일 flex */}
                <div className={styles.detailInfoItem}>
                  <h2>계약 만료일</h2>
                </div>
                <div className={styles.detailInfoItem}>
                  <h2>{roomdata.expirationDate}</h2>
                </div>
              </div>
            </div>
            <div className={styles.contentDetail}>
              {/* 옵션 - 이미지 10개 + 이미지 Name  => grid */}
              <h1>옵션</h1>
              <div className={styles.detailInfoGrid}>
                {roomoption.airConditioner ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/airConditioner.png`}
                        alt="noImage"
                      />
                      <h3>에어컨</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.refrigerator ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/refrigerator.png`}
                        alt="noImage"
                      />
                      <h3>냉장고</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.washer ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/washer.png`}
                        alt="noImage"
                      />
                      <h3>세탁기</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.dryer ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/dryer.png`}
                        alt="noImage"
                      />
                      <h3>건조기</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.sink ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/sink.png`}
                        alt="noImage"
                      />
                      <h3>싱크대</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.gasRange ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/gasRange.png`}
                        alt="noImage"
                      />
                      <h3>가스레인지</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.closet ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/closet.png`}
                        alt="noImage"
                      />
                      <h3>옷장</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.shoeCloset ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/shoeCloset.png`}
                        alt="noImage"
                      />
                      <h3>신발장</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.fireAlarm ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/fireAlarm.png`}
                        alt="noImage"
                      />
                      <h3>화재경보기</h3>
                    </div>
                  </>
                ) : null}
                {roomoption.elevator ? (
                  <>
                    <div className={styles.detailInfoGridItem}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/roomoption/elevator.png`}
                        alt="noImage"
                      />
                      <h3>엘레베이터</h3>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className={styles.contentDetail}>
              <h1>위치 및 주변 시설</h1> {/* 위치 및 주변 시설 */}
              <h3 className={styles.contentDetailRoadAddress}>{roomdata.roadAddress}</h3>
              {/* ----------------- 지도 + 마커 + 주변 원 ----------------- */}
            </div>
          </div>
          <div className={styles.contentTab}>
            {/* 매물 상세 우측 탭 */}
            <div className={styles.fixedTab}>
              {/* 우측 채팅 탭 -> fixed */}
              <div className={styles.fixedInfo}>
                {/* 상위 탭 */}
                <div className={`${styles.fixedTopInfoLeft} ${styles.fixedTopInfoItem}`}>
                  {/* 왼쪽 */}
                  <h3>{roomdata.jibunAddress}</h3>
                  <h2>
                    월세 {roomdata.deposit}/{roomdata.monthlyFee}
                  </h2>
                  <h4>관리비 {roomdata.managementFee}만원</h4>
                </div>
                <div className={styles.fixedTopInfoRight}>
                  {/* 오른쪽 - flex justify-content 멀리 */}
                  <h5>몇일전</h5>
                  <div className={styles.moveToShowRoom}>
                    <h3>
                      <Link to="/gbblist" className={styles.moveToShowRoomLink}>
                        곰방봐로 이동
                      </Link>
                    </h3>
                    &nbsp;
                    <div>
                      <img src={`${process.env.PUBLIC_URL}/images/home.png`} alt="noImage" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.fixedInfoNotFlex}>
                {/* 중간 탭 */}
                <div className={styles.fixedInfoGrid}>
                  {/* 면적 + 원룸 유형 - flex space-between */}
                  <div className={styles.fixedInfoGridItem}>
                    <div className={styles.fixedIntoGridImg}>
                      <img src={`${process.env.PUBLIC_URL}/images/roomSize.png`} alt="noImage" />
                    </div>
                    <h3>
                      전용 {roomdata.roomSize}m{"\xB2"}
                    </h3>
                  </div>
                  <div className={styles.fixedInfoGridItem}>
                    <div className={styles.fixedIntoGridImg}>
                      <img src={`${process.env.PUBLIC_URL}/images/roomType.png`} alt="noImage" />
                    </div>
                    <h3>{roomdata.oneroomType}</h3>
                  </div>
                  {/* 층 / 층 + 주차 여부 - flex space-between */}
                  <div className={styles.fixedInfoGridItem}>
                    <div className={styles.fixedIntoGridImg}>
                      <img src={`${process.env.PUBLIC_URL}/images/parkingLot.png`} alt="noImage" />
                    </div>
                    <h3>
                      {roomdata.floor}층 / {roomdata.totalFloor}층
                    </h3>
                  </div>
                  <div className={styles.fixedInfoGridItem}>
                    <div className={styles.fixedIntoGridImg}>
                      <img src={`${process.env.PUBLIC_URL}/images/floor.png`} alt="noImage" />
                    </div>
                    <h3>주차 {roomoption.parkingLot ? "가능" : "불가능"}</h3>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.fixedInfoBottomTab}>
                {/* 양도자와 채팅 버튼 */}
                <button onClick={handleChat} className={styles.fixedInfoBottomBtn}>
                  <h3>양도자와 채팅하기</h3>
                </button>
                <button onClick={handleStar} className={styles.fixedInfoBottomBtn}>
                  <h3>찜</h3>
                </button>
                {/* 중앙 배치 - 가로 세로 둘 다 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

/* <div>{roomdata.roomType}</div>
<div>{roomdata.roomSize}</div>
<div>{roomdata.roomCount}</div>
<div>{roomdata.oneroomType}</div>
<div>{roomdata.bathroomCount}</div>
<div>{roomdata.roadAddress}</div>
<div>{roomdata.jibunAddress}</div>
<div>{roomdata.monthlyFee}</div>
<div>{roomdata.deposit}</div>
<div>{roomdata.managementFee}</div>
<div>{roomdata.usageDate}</div>
<div>{roomdata.moveInDate}</div>
<div>{roomdata.expirationDate}</div>
<div>{roomdata.floor}</div>
<div>{roomdata.totalFloor}</div> */
