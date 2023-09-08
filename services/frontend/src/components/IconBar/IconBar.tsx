import React, { ReactNode } from 'react';
import styles from './IconBar.module.css'
import CalenderIcon from '../../assets/icons/calendar.svg'
import DocumentIcon from '../../assets/icons/document.svg'
import CategoryIcon from '../../assets/icons/category.svg'
import SendIcon from '../../assets/icons/send.svg'
import BarChartIcon from '../../assets/icons/bar-chart.svg'
import Image from '../../../node_modules/next/image';

const IconBar = () => {
  return (
    <div className={styles.iconbar}>
      <Image src={"/sofit-logo.png"} alt="logo" width={80} height={52} />

      <div className={styles.icons}>
  <a href="#category"><CategoryIcon  width={30} height={30} className={styles.icon}/></a>
  <a href="#calender"><CalenderIcon width={30} height={30} className={styles.icon}/></a>
  <a href="#documents"><DocumentIcon width={30} height={30} className={styles.icon}/></a>
  <a href="#chart"><BarChartIcon  width={30} height={30} className={styles.icon}/></a>
  <a href="#messages"><SendIcon width={30} height={30} className={styles.icon}/></a>
</div>
    </div>

  );
};

export default IconBar;
