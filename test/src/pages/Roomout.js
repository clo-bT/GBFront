import Gbaddress from "../components/Gbaddress";
import Header from "../components/Header";
import React, { useState } from "react";


export default function Roomout() {
    const [info, setInfo] = useState([]);
    const [struc, setStruc] = useState([]);
    const handleClickInfoButton = (e) => {
        setInfo(e.target.value)
    };
    const handleClickStrucButton = (e) => {
        setStruc(e.target.value)
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
                        <input type="text"/>
                    </div>
                    <h3>근처 역/학교</h3>
                    <div></div>
                </div>
            </div>
        </div>
    )
}