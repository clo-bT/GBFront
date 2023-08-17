import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import styles from "../components/Gbb.module.css";
import axios from "axios";

const List = ({ imageList }) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const [responseArticleId, setResponseArticleId] = useState(null); // 응답으로 받은 article_id
    const [responseRoomId, setResponseRoomId] = useState(null); // 응답으로 받은 room_id
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/showroom`
        ).then((response) => {
            console.log(response.data)
            setResponseArticleId(response.data);
            setResponseRoomId(response.data);
        }).catch((error) => {
            console.log(error)
        })
    },[])
    const handleSearch = async () => {
        axios.post(`${process.env.REACT_APP_API_ROOT}`)
    }



    return (
        <div>
            <Header />
            <div className={styles.gbblist}>
                <div className={styles.header}>
                    <div className={styles.h1}>
                        당신의 <span className={styles.h2}>곰방</span>을
                        보여주세요.
                    </div>
                    <div>
                        <button
                            onClick={() => navigate("/gbbcreate")}
                            className={styles.plusbutton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.search}>
                    <div className={styles.inputbox}>
                        <div>
                            <input
                                className={styles.searchbox}
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(event.target.value)
                                }
                                placeholder="보고싶은 지역을 입력하세요."
                            />
                        </div>
                        <div>
                            {selectedTags.map((tag, index) => (
                                <span className={styles.tag} key={index}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div>
                            <input
                                className={styles.searchbox}
                                value={selectedTags}
                                onChange={(event) =>
                                    setSelectedTags(
                                        event.target.value.split(",")
                                    )
                                }
                                placeholder="해시태그를 입력하세요."
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSearch}>검색</button>
                    </div>
                </div>
                {/* 응답으로 받은 데이터 표시 */}
                {responseArticleId !== null && (
                    <p>응답으로 받은 article_id: {responseArticleId}</p>
                )}
                {responseRoomId !== null && (
                    <p>응답으로 받은 room_id: {responseRoomId}</p>
                )}
                {/* 이미지 리스트 출력 부분 */}
            </div>
        </div>
    );
};

export default List;
