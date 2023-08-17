import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "../components/Header";


const GbbDetail = () => {
  const navigate = useNavigate();

    const [userid, setUserid] = useState("");
    const [roomDealId, setRoomDealId] = useState("");
    const [gbbdata, setGbbdata] = useState([]);
    const { articleId } = useParams();
    // showroom/{articleId}
    useEffect(() => {
        const member = JSON.parse(sessionStorage.getItem("member"));
        const useruuid = member.id;
        setUserid(useruuid);
      }, [setUserid]);

    useEffect(() => {
        const showRoomDetailRequestDto = {
            memberId: userid,
            showRoomId:articleId
        }
        axios.post(`${process.env.REACT_APP_API_ROOT}/showroom/detail`,showRoomDetailRequestDto
        ).then((response) => {
            console.log(response.data.data)
            setGbbdata(response.data.data)
            const data = response.data.data.showRoom
            setRoomDealId(data.roomDeal.id)
        }).catch((error) => {
            console.log(error)
        })
    }, [userid, articleId])

    function handleOnClick(id) {
        navigate(`/roomdetail/${id}`)
    }
    return (
        <div>
            <Header />
            {gbbdata ? (
                <div>
                    <div>{ gbbdata.CheckLike }</div>
                    <div>{ gbbdata.fileUrls }</div>
                    <div>{ gbbdata.hashTag }</div>
                    <button onClick={()=>handleOnClick(roomDealId)}>매물로 이동하기</button>
                </div>
            ):<div>로딩중</div>}
            
        </div>
    )
}
export default GbbDetail;