
import React, { useEffect } from 'react';
import { KakaoMap, Marker } from 'react-kakao-maps';

const MapPage = () => {
  useEffect(() => {
    // 데이터를 가져와서 마커를 생성하고 클러스터러 객체에 넘겨줍니다.
    // 해당 기능은 useEffect 내에서 수행하도록 합니다.
    fetch('/download/web/data/chicken.json')
      .then((response) => response.json())
      .then((data) => {
        const markers = data.positions.map((position) => ({
          lat: position.lat,
          lng: position.lng,
        }));
        // markers를 상태로 관리하고, MapPage 컴포넌트를 렌더링할 때 사용할 수 있도록 합니다.
        // 이후에 clusterer에 markers 배열을 전달하여 클러스터러에 마커들을 추가합니다.
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <KakaoMap
        center={{ lat: 36.2683, lng: 127.6358 }}
        level={14}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 마커들을 이곳에 표시해주세요 */}
        {/* <Marker ... /> */}
      </KakaoMap>
    </div>
  );
};

export default MapPage;
