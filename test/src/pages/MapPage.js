import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import KakaoMap from'../components/KakaoMap'
import FilterNav from '../components/FilterNav';
import styles from './MapPage.module.css'

const MapPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios를 사용하여 데이터 가져오기
        const response = await axios.get('https://apis.map.kakao.com/download/web/data/chicken.json');
        // const response = await axios.get('/chicken.json');
        const data = response.data;

        const container = document.getElementById('map');
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(37.5019, 127.0397),
          level: 1,
        });
        map.setMinLevel(1);
        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 1,
          minClusterSize: 1,
        });

        const markers = data.positions.map((position) => {
          return new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(position.lat, position.lng),
          });
        });

        clusterer.addMarkers(markers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header/>
      <div className={styles.body}>
        <div className={styles.background}><KakaoMap/></div>
        <div className={styles.nav}><FilterNav/></div>
      </div>
    </div>
  );
};

export default MapPage;
