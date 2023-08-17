// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomFilterForm.module.css";
import axios from 'axios';


const RoomFilterForm = () => {
  const navigate = useNavigate();
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
    if (type === 'address') {
      navigate(`/map/${word}/${"lat"}/${"lon"}`)
    }
    else if (type === 'station' || type === 'univ') {
      navigate(`/map/${"word"}/${lat}/${lon}`)
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
          onKeyDown={handleKeyPress}
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
