import Header from '../components/Header';
import KakaoMap from'../components/maps/KakaoMap'
import FilterNav from '../components/maps/FilterNav';
import styles from './MapPage.module.css'
import RoomList from '../components/maps/RoomList';

const MapPage = () => {


  return (
    <div>
      <Header/>
      <div className={styles.body}>
        <div className={styles.background}><KakaoMap/></div>
        <div className={styles.nav}><FilterNav/></div>
        <div className={styles.rlist}><RoomList/></div>
      </div>
    </div>
  );
};

export default MapPage;
