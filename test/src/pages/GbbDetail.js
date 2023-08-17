import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


const GbbDetail = () => {
    const [userid, setUserid] = useState("");
    const { articleId } = useParams();
    // showroom/{articleId}
    useEffect(() => {
        const member = JSON.parse(sessionStorage.getItem("member"));
        const useruuid = member.id;
        setUserid(useruuid);
      }, [setUserid]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/showroom/${articleId}`
        ).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    })
    return (
        <div>여긴 방꾸 디테일</div>
    )
}
export default GbbDetail;