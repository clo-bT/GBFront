import React, { useState, useEffect } from 'react';
import styles from './RoomList.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import RoomListItem from './RoomListItem';
import axios from 'axios';



const RoomList = (props) => {
    const [items, setItems] = useState(Array.from({length:20}))
    const [hasMore, sethasMore] = useState(true);
    const [roomids, setRoomids] = useState([]);
    // const { word, type, lat, lon } = useParams();
    useEffect(() => {
        const SearchByAddressRequestDto = {
            "address": props.word,
            "content": '',
        };
        const SearchByStationUnivRequestDto = {
            "lat": props.lat,
            "lon": props.lon,
            "content": '',
        };
        if (props.lat === 'lat') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/roomdeal/search-address`, SearchByAddressRequestDto
            ).then((response) => {
                console.log("주소주소", response.data)
                setRoomids(response.data.data)
            }).catch((error) => {
                console.error('API 호출 에러:', error);
            })
        }
        else {
            axios.post(`${process.env.REACT_APP_API_ROOT}/roomdeal/search-station-univ`, SearchByStationUnivRequestDto
            ).then((response) => {
                console.log("역역", response.data)
            }).catch((error) => {
                console.error('API 호출 에러:', error);
            })
        }
    }, [props.lat,props.lon,props.word]);
    const fetchMoreData = () =>{
        if (items.length >= 80) {
            sethasMore(false)
            return
        } 

        setTimeout(()=>{
            setItems(prevItems => prevItems.concat(Array.from({ length: 20 })))
        },1500)
    }

    return (
        <div className={styles.Frame}>
            <div className={styles.btnparent}>
                {/* <button className={styles.mybtn}>입주순</button>  
                <button className={styles.mybtn}>가격순</button>  
                <button className={styles.mybtn}>등록순</button> */}
            </div>
            <div id="scrollableDiv" className={styles.scrollableDiv}>
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>불러오는 중이곰...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                {items.map((i, index) => (
                    <RoomListItem key={index} roomid={index}/>
                    // <div className={styles.ListItems} key={index}>
                    //     room - #{index}
                    // </div>
                ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default RoomList;