import styles from "./FilterAdjust.module.css";
import { useState } from "react";
const FilterAdjust = () => {
  const roominfooptionlist = ['원룸','빌라','오피스텔','아파트']
  const [info, setInfo] = useState([]);

  const handleClickInfoButton = (e) => {
    console.log(e.target)
    if(info.includes(e.target.id)){setInfo(info.filter((element)=>element!==e.target.id))}
    else{setInfo([...info,e.target.id])}
    console.log(info)
  };


  return (
    <div className={styles.filterAdjust}>
      <div className={styles.Frame}>  

        <div className={styles.roomtype}>
          <div className={styles.container}>
            <div className={styles.headline}>유형</div>
            <div className={styles.subheadline}>중복선택이 가능합니다.</div>
            <div className={styles.optionbody}>
              {roominfooptionlist.map((value,index) => {
                return  <div key={index}>
                <input 
                  type="checkbox" 
                  key={info.includes(value)}
                  id={value}
                  onChange={handleClickInfoButton}
                  checked={info.includes(value)} 
                  />
                <label  className={styles.roomoption} htmlFor={value}  >
                    {value}
                </label>
                </div>
                })}

              {/* <label className={styles.oneroom} htmlFor="oneroom">
                  <input type="radio" id="oneroom" checked={info === "oneroom"} onChange={handleClickInfoButton}  key={info.includes("oneroom")}/>
                  원룸
              </label>
              <label className={styles.officetell} htmlFor="officetell">
                  <input type="radio" id="officetell" checked={info === "officetell"} onChange={handleClickInfoButton} />
                  오피스텔
              </label>
              <label className={styles.villa} htmlFor="villa">
                  <input type="radio" id="villa" checked={info === "villa"} onChange={handleClickInfoButton} />
                  빌라
              </label>
              <label className={styles.apartment} htmlFor="apartment">
                  <input type="radio" id="apartment" checked={info === "apartment"} onChange={handleClickInfoButton} />
                  아파트
              </label> */}
            </div>
          </div>
        </div>
      
      
      
      </div>
      

          
            {/* <div>
                <div className={styles.option1Container}>
                  <div className={styles.option23}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare.svg"
                      />
                      <div className={styles.div}>원룸</div>
                    </div>
                  </div>
                  <div className={styles.option24}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare.svg"
                      />
                      <div className={styles.div}>오피스텔</div>
                    </div>
                  </div>
                </div>
                <div className={styles.option1Container}>
                  <div className={styles.option23}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare2.svg"
                      />
                      <div className={styles.div}>빌라</div>
                    </div>
                  </div>
                  <div className={styles.option43}>
                    <div className={styles.iconsaxlinearticksquareGroup}>
                      <img
                        className={styles.iconsaxlinearticksquare8}
                        alt=""
                        src="/iconsaxlinearticksquare2.svg"
                      />
                      <div className={styles.div}>아파트</div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>

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

      </div> */}
    </div>
  );
};

export default FilterAdjust;
