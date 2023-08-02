import React from 'react';
import styles from './FilterNav.module.css';

const FilterNav = () => {
  return (
    <div className={styles.Frame}>
      <input className={styles.LocSearch} type="text" placeholder='지역, 학교, 역으로 검색'/>
      <hr className={styles.verticalLine} />
      <input className={styles.ContSearch} type="text" placeholder='역세권, 숲세권, 아늑한, 깨끗한, 조용한, 은행이 가까운...   본문으로 검색'/>
      <div className={styles.icon_parents}>
        <img className={styles.icon_detail}  src="/assets/detail.svg" alt="" />
        <img className={styles.icon_detail}  src="/assets/refresh.svg" alt="" />
      </div>
    </div>
  )
}

export default FilterNav;