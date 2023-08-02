// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "react-bootstrap";
import styles from "./RoomFilterForm.module.css";
const RoomFilterForm = () => {
  return (
    <div className={styles.bbody}>
      <div className={styles.parent}>
        <div className={styles.head}>어떤 방을 찾으시나?</div>
        <div className={styles.group}>
          <div className={styles.b}>전체</div>
          <div className={styles.b1}>원룸</div>
          <div className={styles.b1}>오피스텔</div>
          <div className={styles.b1}>빌라</div>
          <div className={styles.b1}>아파트</div>
        </div>
        <input className={styles.myinput} type="text" placeholder="지역을 입력하세요"/>
      </div>
    </div>
  );
};

export default RoomFilterForm;
