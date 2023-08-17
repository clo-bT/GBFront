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
    },[])
    useEffect(() => {
        if (userid) {
            axios.get(`${process.env.REACT_APP_API_ROOT}/star/my-list/${userid}`
            ).then((response) => {
                console.log(response.data)
                SetStarroomDeal(response.data.data.starRoomDealList)
            }).catch((error) => {
                console.error('API 호출 에러:', error);
            });
        }
    },[userid])
    return (
        <div>
            <Header/>
            <div className="zzimlist">
                <div>{starroomDeal.length > 0 ? (
                    starroomDeal.map((data, index) => (
                        <div key={index}>
                            <div>{data.roomDeal.id}</div>
                            <div>{data.roomDeal.station}</div>
                            <div>{data.roomDeal.monthlyFee}</div>
                            <div>{data.roomDeal.moveInDate}</div>
                            <div>{data.roomDeal.roadAddress}</div>
                            <div>{data.roomDeal.registerTime}</div>
                        </div>
                    ))
                ) : (
                        <div>찜 목록이 없습니다. </div>
                )}</div>
            </div>
        </div>
        
    )
}