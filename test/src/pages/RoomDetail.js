import React, { useState } from "react";
import axios from 'axios';
import Header from "../components/Header";
import styles from "./RoomDetail.module.css";

const RoomDetail = () => {
    const [roomdata, setRoomData] = useState([]);
    const [roomoption, setRoomOption] = useState([]);
    const roomid = 3
    const expectedFee = roomdata.monthlyFee + roomdata.managementFee;

    axios.get(`${process.env.REACT_APP_API_ROOT}/roomdeal/${roomid}`)
        .then(response => {
            console.log('받아온 정보 : ', response.data);
            setRoomData(response.data.data.roomDeal);
            setRoomOption(response.data.data.roomDealOption);
        }).catch(error => {
            console.log('오류:', error);
        });

    /* HTML + CSS */
    return (
        <div>
            <Header />
            <div className={styles.content}> {/* 매물 본문 */}
                <div className={styles.images}> {/* 이미지 - 나중에 (슬라이딩 구현 어케함) */}
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                    <p>이미지 넣을 거임</p>
                </div>
                <div className={styles.detail}> {/* 매물 상세 내용 */}
                    <div className={styles.contentTab}> {/* 매물 상세 내용 좌측 탭 */}
                        <div className={styles.contentDetail}> {/* 가격 정보 */}
                            <h1>가격 정보</h1>
                            <div className={styles.detailInfo}> {/* 월세 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>월세</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.deposit} / {roomdata.monthlyFee}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 관리비 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>관리비</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>매월 {roomdata.managementFee}만원</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 한달 예상 주거 비용 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>한달<br />예상 주거 비용</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2><span className={styles.expectedFeeFont}>{expectedFee}만원</span><br />월세 + 관리비</h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentDetail} > {/* 상세 정보 */}
                            <h1> 상세 정보</h1>
                            <div className={styles.detailInfo}> {/* 방 종류 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>방종류</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.roomType}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 해당 층 / 건물 층 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>해당층 / 건물층</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.floor}층 / {roomdata.totalFloor}층</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 방 수 / 욕실 수 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>방 수 / 욕실 수</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.roomCount}개 / {roomdata.bathroomCount}개</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 주차 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>주차</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomoption.parkingLot ? "가능" : "불가능"}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 사용 승인일 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>사용 승인일</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.usageDate}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 입주 가능일 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>입주 가능일</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.moveInDate}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.detailInfo}> {/* 계약 만료일 flex */}
                                <div className={styles.detailInfoItem}>
                                    <h2>계약 만료일</h2>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <h2>{roomdata.expirationDate}</h2>
                                </div>
                            </div>
                        </div>
                        <div> {/* 옵션 - 이미지 10개 + 이미지 Name  => flex & wrap*/}

                        </div>
                        <div> {/* 위치 및 주변 시설 */}
                            <h3> 주소 </h3>
                            <h4>인근 역부터 25m 부근</h4> {/* 버릴듯 */}
                            {/* 지도 + 마커 + 주변 원 (25m ??) */}
                        </div>
                    </div>
                    <div className={styles.contentTab}> {/* 매물 상세 우측 탭 */}
                        <div> {/* 우측 채팅 탭 -> fixed */}
                            <div> {/* 상위 탭 */}
                                <div> {/* 왼쪽 */}
                                    <h3>주소</h3>
                                    <h2>월세</h2>
                                    <h4>관리비</h4>
                                </div>
                                <div> {/* 오른쪽 - flex justify-content 멀리 */}
                                    <h5>몇일전</h5>
                                    <h4>
                                        <a onClick="??">곰방봐</a>로 이동</h4>
                                </div>
                            </div>
                            <div> {/* 중간 탭 */}
                                <div> {/* 인근 역 ??m - ??m 없는데;; */}

                                </div>
                                <div> {/* 면적 + 원룸 유형 - flex space-between */}

                                </div>
                                <div> {/* 층 / 층 + 주차 여부 - flex space-between */}

                                </div>
                            </div>
                            <div> {/* 양도자와 채팅 버튼 */}
                                <button onClick={""}>양도자와 채팅하기</button> {/* 중앙 배치 - 가로 세로 둘 다 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <div>{ roomdata.id }</div> */}
            {/* <button>양도자와 채팅하기</button> */}
            {/* <div>{ roomdata.member.id }</div> */}
            <div>{roomdata.roomType}</div>
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
            <div>{roomdata.totalFloor}</div>
            {/* <div>{roomoption}</div> */}

        </div >
    );
};

export default RoomDetail;