import Gbaddress from "../components/Gbaddress";
import Header from "../components/Header";
import React, { useState } from "react";


export default function Roomout() {
    const [info, setInfo] = useState([]);
    const [struc, setStruc] = useState([]);
    const [elevator, setElevator] = useState([]);
    const [parking, setParking] = useState([]);
    const handleClickInfoButton = (e) => {
        setInfo(e.target.value)
    };
    const handleClickStrucButton = (e) => {
        setStruc(e.target.value)
    };
    const handleClickElevatorButton = (e) => {
        setElevator(e.target.value)
    };
    const handleClickParkingButton = (e) => {
        setParking(e.target.value)
    };

    return (
        <div>
            <Header/>
            <div className="room-out">
                <h1>곰방 내놓기</h1>
                <div className="gb-info">
                    <h2>곰방 정보</h2>
                    <h3>곰방 유형</h3>
                    <div className="gb-type">
                        <label>
                        <input type="radio" value="oneroom" checked={info === "oneroom"} onChange={handleClickInfoButton}/>
                        원룸
                        </label>
                        <label>
                        <input type="radio" value="officetell" checked={info === "officetell"} onChange={handleClickInfoButton}/>
                        오피스텔
                        </label>
                        <label>
                            <input type="radio" value="villa" checked={info === "villa"} onChange={handleClickInfoButton} />
                        빌라
                        </label>
                        <label>
                        <input type="radio" value="apartment" checked={info === "apartment"} onChange={handleClickInfoButton}/>
                        아파트
                        </label>
                    </div>
                    <h3>곰방 구조</h3>
                    <div className="gb-structure">
                        <label>
                        <input type="radio" value="open" checked={struc === "open"} onChange={handleClickStrucButton}/>
                        오픈형
                        </label>
                        <label>
                        <input type="radio" value="seperate" checked={struc === "seperate"} onChange={handleClickStrucButton}/>
                        분리형
                        </label>
                        <label>
                        <input type="radio" value="multiple" checked={struc === "multiple"} onChange={handleClickStrucButton}/>
                        복층
                        </label>
                        <label>
                        <input type="radio" value="tworoom" checked={struc === "tworoom"} onChange={handleClickStrucButton}/>
                        투룸
                        </label>
                        <label>
                        <input type="radio" value="threenmore" checked={struc === "threenmore"} onChange={handleClickStrucButton}/>
                        쓰리룸 이상
                        </label>
                    </div>
                    <h3>주소</h3>
                    <div className="gb-address">
                    <Gbaddress/>
                    </div>
                    <h3>근처 역/학교</h3>
                    <div><input type="text"/></div>
                    <h3>보증금</h3>
                    <div><input type="text"/>원</div>
                    <h3>월세</h3>
                    <div><input type="text"/>원</div>
                    <h3>관리비</h3>
                    <div><input type="text"/>원</div>
                    <h3>입주 가능 일자</h3>
                    <div><input type="text"/>원</div>
                    <h3>계약 만료 일자</h3>
                    <div><input type="text"/>원</div>
                    <h3>사용 승인일</h3>
                    <div><input type="text"/>원</div>
                    <h3>층 수</h3>
                    <div><input type="text"/>층 / <input type="text"/>층</div>
                    <h3>엘리베이터</h3>
                    <div><label>
                            <input type="radio" value="elevatoryes" checked={elevator === "elevatoryes"} onChange={handleClickElevatorButton}/>
                            있음
                            </label>
                            <label>
                            <input type="radio" value="elevatorno" checked={elevator === "elevatorno"} onChange={handleClickElevatorButton}/>
                            없음
                            </label></div>
                    <h3>욕실 수</h3>
                    <div><input type="text"/>개</div>
                    <h3>주차 가능 여부</h3>
                    <div><label>
                            <input type="radio" value="parkingyes" checked={parking === "parkingyes"} onChange={handleClickParkingButton}/>
                            가능
                            </label>
                            <label>
                            <input type="radio" value="parkingno" checked={parking === "parkingno"} onChange={handleClickParkingButton}/>
                            불가능
                            </label></div>
                    <h3>추가 옵션</h3>
                    <div></div>
                    <h3>매물 사진</h3>
                    <div></div>
                    <h3>제목</h3>
                    <div><input type="text" /></div>
                    <h3>상세 설명</h3>
                    <div><input type="text" /></div>
                </div>
                <p>매물관리규정을 확인하였으며, 입력한 정보는 실제 매물과 다름이 없습니다.</p>
            </div>
            <button>곰방 내놓기</button>
        </div>
    )
}