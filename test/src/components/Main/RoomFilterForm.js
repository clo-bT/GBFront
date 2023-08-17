// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./RoomFilterForm.module.css";
import axios from 'axios';


const RoomFilterForm = () => {
  const [selectedOpt,setselectedOpt] = useState('전체')
  const optionList = ['전체','원룸','오피스텔','빌라','아파트']
  const handleOptionClick = (option) => {
    setselectedOpt(option)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [nearsearch, setNearsearch] = useState([]);
  const handleSearch = () => {
    const SearchRelatedListRequestDto = {
      "searchWord": searchTerm
    }
    console.log(searchTerm)
    axios.post(`${process.env.REACT_APP_API_ROOT}/roomdeal/search-related-list`, SearchRelatedListRequestDto
    ).then((response) => {
      console.log(response)
      setNearsearch(response.data.data)
    }).catch((error) => {
      console.error('API 호출 에러:', error);
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  function handleonclick(word, type, lat, lon) {
    const SearchByAddressRequestDto = {
      "address": word,
      "content": '',
    };
    const SearchByStationUnivRequestDto = {
      "lat": lat,
      "lon": lon,
      "content":'',
    };
    if (type === 'address') {
      axios.post(`${process.env.REACT_APP_API_ROOT}/roomdeal/search-address`, SearchByAddressRequestDto
      ).then((response) => {
        console.log("주소주소",response.data)
      }).catch((error) => {
        console.error('API 호출 에러:', error);
      })
    }
    else if (type === 'station' || type === 'univ') {
      axios.post(`${process.env.REACT_APP_API_ROOT}/roomdeal/search-station-univ`, SearchByStationUnivRequestDto
      ).then((response) => {
        console.log("역역",response.data)
      }).catch((error) => {
        console.error('API 호출 에러:', error);
      })
    }
  }
  

  return (
    <div className={styles.bbody}>
      <div className={styles.parent}>
        <div className={styles.head}>어떤 방을 찾으시나?</div>
        <div className={styles.group}>
          {optionList.map((value)=>(
            <div key={value} className={`${styles.option} ${selectedOpt === value ? styles.selected : ''}`} onClick={()=>handleOptionClick(value)}>
              {value}
            </div>
          ))}
        </div>
        <input
          className={styles.myinput}
          type="text"
          placeholder="지역을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div>
          {searchTerm ? (
          <div>
              {nearsearch.map((value, index) => (
                <div key={index}>
                  <div onClick={()=>handleonclick(value.searchWord,value.searchType,value.lat,value.lon)}>{value.searchWord}</div>
                </div>
              ))
              }
              </div>
          ) : (
              <div>검색어를 다시 입력하세요</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomFilterForm;
