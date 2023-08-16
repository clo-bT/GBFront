import axios from 'axios';
import { useEffect } from 'react';
import styles from './RoomListItem.module.css';
import { useState } from 'react';


const RoomListItem = (props) => {
    const [roominfo,setroominfo] = useState({})
    useEffect(() => {
        axios.get(`https://i9a804.p.ssafy.io/api/v1/roomdeal/${props.roomid}`)
        .then((r)=>{
            if(r.data.code===1000){
                console.log(r.data)
                setroominfo(r.data.data)
            }
        })
        .catch((e)=>{console.log(e)})
    }, []);
    function handleonclick(){
        window.location.href = `/roomdetail/${props.roomid}`
    }


    return (
        <div className={styles.Frame} onClick={handleonclick}>
        {roominfo?.roomDeal? 
            <div className={styles.ListItems} style={{backgroundImage:`url(${roominfo?.roomDeal?.thumbnail})`, backgroundRepeat : 'no-repeat', backgroundPosition : 'center' }}>
                room - #{props.roomid}
            </div>
        : 
        ''
        }                
        </div>
    )
}

export default RoomListItem;