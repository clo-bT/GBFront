import React, { useEffect } from 'react';
import axios from 'axios';

const MapPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios를 사용하여 데이터 가져오기
        // const response = await axios.get('https://apis.map.kakao.com/download/web/data/chicken.json');
        const response = await axios.get('/chicken.json');
        const data = response.data;

        const container = document.getElementById('map');
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(36.2683, 127.6358),
          level: 13,
        });
        map.setMinLevel(6);
        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 6,
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
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default MapPage;
