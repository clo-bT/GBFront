import React from 'react';
import styles from './RoomList.module.css';

const RoomList = () => {
  return (
    <div className={styles.Frame}>
        <div className={styles.btnparent}>
            <button className={styles.mybtn}>입주순</button>  
            <button className={styles.mybtn}>가격순</button>  
            <button className={styles.mybtn}>등록순</button>
        </div>
    </div>
  )
}

export default RoomList;