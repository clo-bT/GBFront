import styles from "./FilterAdjust.module.css";
import 'rc-slider/assets/index.css';
import Slider from "rc-slider";
import { useState } from "react";
const FilterAdjust = () => {
  const roomTypelist = ['원룸','빌라','오피스텔','아파트']
  const roomstructurelist = ['오픈형','분리형','복층','투룸','쓰리룸 이상']
  const floorlist = ['1-3층','4-6층','7-9층','10층 이상','반지층','옥탑방']
  const [type, setType] = useState([]);
  const [structure, setStructure] = useState([])
  const [floor, setFloor] = useState([])

  const handleClickTypeButton = (e) => {
    if(type.includes(e.target.id)){setType(type.filter((element)=>element!==e.target.id))}
    else{setType([...type,e.target.id])}
  };
  const handleClickStructureButton = (e) => {
    if(structure.includes(e.target.id)){setStructure(structure.filter((element)=>element!==e.target.id))}
    else{setStructure([...structure,e.target.id])}
  };
  const handleClickFloorButton = (e) => {
    if(floor.includes(e.target.id)){setFloor(floor.filter((element)=>element!==e.target.id))}
    else{setFloor([...floor,e.target.id])}
  };



  return (
      <div className={styles.Frame}>  
        
        {/* 방 유형 */}    
        <div className={styles.container} style={{ borderRight: '1px solid black' }} id="roomtype">
          <div className={styles.headline}>유형</div>
          <div className={styles.subheadline}>중복선택이 가능합니다.</div>
          <div className={styles.optionbody}>
            <label className={styles.roomoption} htmlFor='roomType_total' onClick={()=>{if(type.length!==roomTypelist.length){setType([...roomTypelist])}else{setType([])}}} id='roomType_total'>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={type.length===roomTypelist.length}
                id='roomType_total'
                onChange={()=>{if(type.length!==roomTypelist.length){setType([...roomTypelist])}else{setType([])}}}
                checked={type.length===roomTypelist.length} 
              />
              전체
            </label>
            {roomTypelist.map((value,index) => (
            <label key={index} className={styles.roomoption} htmlFor={value} onClick={handleClickTypeButton} id={value}>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={type.includes(value)}
                id={value}
                onChange={handleClickTypeButton}
                checked={type.includes(value)} 
                />
                {value}
              </label>
              ))}
          </div>
        </div>
        
        {/* 방 구조 */}    
        <div className={styles.container} style={{ borderRight: '1px solid black' }} id="roomstructure">
          <div className={styles.headline}>방 구조</div>
          <div className={styles.subheadline}>중복선택이 가능합니다.</div>
          <div className={styles.optionbody}>
            <label className={styles.roomoption} htmlFor='roomstructure_total' onClick={()=>{if(structure.length!==roomstructurelist.length){setStructure([...roomstructurelist])}else{setStructure([])}}} id='roomstructure_total'>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={structure.length===roomstructurelist.length}
                id='roomstructure_total'
                onChange={()=>{if(structure.length!==roomstructurelist.length){setStructure([...roomstructurelist])}else{setStructure([])}}}
                checked={structure.length===roomstructurelist.length} 
              />
              전체
            </label>
            {roomstructurelist.map((value,index) => (
            <label key={index} className={styles.roomoption} htmlFor={value} onClick={handleClickStructureButton} id={value}>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={structure.includes(value)}
                id={value}
                onChange={handleClickStructureButton}
                checked={structure.includes(value)} 
                />
                {value}
              </label>
              ))}
          </div>
        </div>

        {/* 방 층수 */}    
        <div className={styles.container} id="roomfloor">
          <div className={styles.headline}>층 수</div>
          <div className={styles.subheadline}>중복선택이 가능합니다.</div>
          <div className={styles.optionbody}>
            <label className={styles.roomoption} htmlFor='roomfloor_total' onClick={()=>{if(floor.length!==floorlist.length){setFloor([...floorlist])}else{setFloor([])}}} id='roomstructure_total'>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={floor.length===floorlist.length}
                id='roomfloor_total'
                onChange={()=>{if(floor.length!==floorlist.length){setFloor([...floorlist])}else{setFloor([])}}}
                checked={floor.length===floorlist.length} 
              />
              전체
            </label>
            {floorlist.map((value,index) => (
            <label key={index} className={styles.roomoption} htmlFor={value} onClick={handleClickFloorButton} id={value}>
              <input 
                type="checkbox"
                className={styles.mycheckbox}
                key={floor.includes(value)}
                id={value}
                onChange={handleClickStructureButton}
                checked={floor.includes(value)} 
                />
                {value}
              </label>
              ))}
          </div>
        </div>
      
        {/* 가격 */}    
        <div className={styles.container} id="roomfloor">
          <div className={styles.headline}>가격</div>
          <div className={styles.optionbody}>
            <Slider
              range 
            />
          </div>
      
        </div>   
          
        <div className={styles.container} style={{ borderRight: '1px solid black' }}></div>  
            
      </div>
      

          
        /*       

        <div className={styles.roomstructure}>
          <div className={styles.container}>
            <div className={styles.div42}>방 구조</div>
            <div className={styles.parent2}>
              <div className={styles.div}>중복선택이 가능합니다.</div>
              <div className={styles.frameParent}>
                <div className={styles.option1Container}>
                  <div className={styles.option15}>
                    <div className={styles.iconsaxlinearticksquareParent}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare.svg"
                      />
                      <div className={styles.div}>분리형</div>
                    </div>
                  </div>
                  <div className={styles.option23}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare2.svg"
                      />
                      <div className={styles.div}>복층</div>
                    </div>
                  </div>
                </div>
                <div className={styles.option3Parent}>
                  <div className={styles.option23}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare.svg"
                      />
                      <div className={styles.div}>투룸</div>
                    </div>
                  </div>
                  <div className={styles.option42}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare2.svg"
                      />
                      <div className={styles.div}>쓰리룸 이상</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.floor}>
          <div className={styles.container}>
            <div className={styles.div}>층 수</div>
            <div className={styles.frameDiv}>
              <div className={styles.div}>중복선택이 가능합니다.</div>
              <div className={styles.options}>
                <div className={styles.option14}>
                  <div className={styles.div34}>전체</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>1층</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare1.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>2층</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare2.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>3층</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare1.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>4층</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare2.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>5층 이상</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare1.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>반지층</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare2.svg"
                  />
                </div>
                <div className={styles.option14}>
                  <div className={styles.div34}>옥탑방</div>
                  <img
                    className={styles.iconsaxlinearticksquare}
                    alt=""
                    src="/iconsaxlinearticksquare1.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.price}>
          <div className={styles.option1Group}>
            <div className={styles.option13}>
              <div className={styles.div16}>0</div>
              <div className={styles.div17}>보증금</div>
              <div className={styles.div18}>무제한</div>
              <div className={styles.div19}>2,500만원</div>
              <div className={styles.div20}>0 ~1,000만 원</div>
              <img
                className={styles.rangeSliderIcon1}
                alt=""
                src="/range-slider1.svg"
              />
            </div>
            <div className={styles.option21}>
              <div className={styles.div17}>월세</div>
              <img
                className={styles.rangeSliderIcon2}
                alt=""
                src="/range-slider2.svg"
              />
              <div className={styles.div22}>무제한</div>
              <div className={styles.div23}>60만원</div>
              <div className={styles.div24}>0</div>
              <div className={styles.div25}>0 ~55만 원</div>
            </div>
            <div className={styles.option31}>
              <div className={styles.div17}>관리비</div>
              <img
                className={styles.rangeSliderIcon3}
                alt=""
                src="/range-slider3.svg"
              />
              <div className={styles.div27}>무제한</div>
              <div className={styles.div28}>20만원</div>
              <div className={styles.div29}>0</div>
              <div className={styles.div30}>0 ~30만 원</div>
            </div>
          </div>
          <div className={styles.div31}>가격</div>
        </div>

        <div className={styles.size}>
          <div className={styles.option1Wrapper}>
            <div className={styles.option12}>
              <div className={styles.div13}>0</div>
              <div className={styles.div14}>무제한</div>
              <div className={styles.m210}>33m2 = 10평</div>
              <img
                className={styles.rangeSliderIcon}
                alt=""
                src="/range-slider.svg"
              />
            </div>
          </div>
          <div className={styles.div15}>방 크기</div>
        </div>

        <div className={styles.approvaldate}>
          <div className={styles.parent5}>
            <div className={styles.div}>{`성별 `}</div>
            <div className={styles.options1}>
              <div className={styles.option14}>
                <div className={styles.div34}>전체</div>
                <img
                  className={styles.iconsaxlinearticksquare}
                  alt=""
                  src="/iconsaxlinearticksquare.svg"
                />
              </div>
              <div className={styles.option25}>
                <div className={styles.div56}>동성 매물만</div>
                <img
                  className={styles.iconsaxlinearticksquare}
                  alt=""
                  src="/iconsaxlinearticksquare1.svg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.additionaloption}>
          <div className={styles.parent}>
            <div className={styles.div}>추가 옵션</div>
            <div className={styles.group}>
              <div className={styles.div}>중복선택이 가능합니다.</div>
              <div className={styles.option1Parent}>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>에어컨</div>
                </div>
                <div className={styles.option2}>
                  <div className={styles.option2Child} />
                  <div className={styles.div2}>냉장고</div>
                </div>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>세탁기</div>
                </div>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>싱크대</div>
                </div>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>에어컨</div>
                </div>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>가스레인지</div>
                </div>
                <div className={styles.option2}>
                  <div className={styles.option2Child} />
                  <div className={styles.div2}>신발장</div>
                </div>
                <div className={styles.option1}>
                  <div className={styles.option1Child} />
                  <div className={styles.div2}>화재경보기</div>
                </div>
                <div className={styles.option2}>
                  <div className={styles.option2Child} />
                  <div className={styles.div2}>엘리베이터</div>
                </div>
                <div className={styles.option2}>
                  <div className={styles.option2Child} />
                  <div className={styles.div2}>주차가능</div>
                </div>
                <div className={styles.option2}>
                  <div className={styles.option2Child} />
                  <div className={styles.div2}>건조기</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div> */
  );
};

export default FilterAdjust;
