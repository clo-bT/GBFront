import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import styles from "../components/Gbb.module.css";
import axios from "axios";

const List = ({ imageList }) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [responseArticleId, setResponseArticleId] = useState([]); // 응답으로 받은 article_id
    const [userid, setUserid] = useState("");
    useEffect(() => {
      const member = JSON.parse(sessionStorage.getItem("member"));
      const useruuid = member.id;
      setUserid(useruuid);
    }, [setUserid]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/showroom`
        ).then((response) => {
            console.log(response.data.data)
            setResponseArticleId(response.data.data);
        }).catch((error) => {
            console.log(error)
        })
    },[])
    const handleSearch = async () => {
        const ShowRoomSearchRequestDto = {
            "memberId": userid,
            "searchWord": searchText,
            "searchType": 'station',
            "hashTag": selectedTags,
            "sortType": 'desc',
            "pageOffset": 0
        }
        axios.post(`${process.env.REACT_APP_API_ROOT}/showroom/search-result`,ShowRoomSearchRequestDto
        ).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
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
                {responseArticleId.map((value, index) => (
                    <div key={index}>
                        <div>구분용 인덱스 : {index}</div>
                    <div>곰방봐 id : {value.id}</div>
                    <div>매물번호 : {value.roomDeal.id}</div>
                    <div>곰방봐 썸네일 : {value.thumbnail}</div>
                    <div>곰방봐 썸네일 : {value.thumbnail}</div>
                  </div>
                ))
                }
            </div>
        </div>
    );
};

export default List;
