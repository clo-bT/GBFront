import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Zimlist() {
    const [userid, setUserid] = useState("");
    const [starroomDeal, SetStarroomDeal] = useState([]);

    useEffect(() => {
        const member = JSON.parse(sessionStorage.getItem("member"));
        const useruuid = member.id
        setUserid(useruuid);
        axios.post(`${process.env.REACT_APP_API_ROOT}/star/my-list/${userid}`
        ).then((response) => {
            console.log(response.data.data)
            SetStarroomDeal(response.data.data.starRoomDealList.roomDeal)
        }).catch((error) => {
          console.error('API 호출 에러:', error);
        });
    },[userid])
    return (
        <div>
            <Header/>
            <div className="zzimlist">
                <div>{ starroomDeal.id }</div>
                <div>{ starroomDeal.member.name}</div>
                <div>{ starroomDeal.roadAddress}</div>
            </div>
        </div>
        
    )
}