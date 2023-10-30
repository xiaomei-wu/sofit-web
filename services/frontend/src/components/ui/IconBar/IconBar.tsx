import BarChartIcon from '@/assets/icons/bar-chart.svg';
import CalenderIcon from '@/assets/icons/calendar.svg';
import CategoryIcon from '@/assets/icons/category.svg';
import DocumentIcon from '@/assets/icons/document.svg';
import SendIcon from '@/assets/icons/send.svg';
import Image from 'next/image';
import styles from './IconBar.module.css';

const IconBar = () => {
  return (
    <div className={styles.iconbar}>
      <Image
        alt="logo"
        height={52}
        src={'/sofit-logo.png'}
        width={80}
        priority
      />

      <div className={styles.icons}>
        <a href="/dashboard">
          <CategoryIcon className={styles.icon} height={30} width={30} />
        </a>
        <a href="#calender">
          <CalenderIcon className={styles.icon} height={30} width={30} />
        </a>
        <a href="#documents">
          <DocumentIcon className={styles.icon} height={30} width={30} />
        </a>
        <a href="#chart">
          <BarChartIcon className={styles.icon} height={30} width={30} />
        </a>
        <a href="#messages">
          <SendIcon className={styles.icon} height={30} width={30} />
        </a>
      </div>
    </div>
  );
};

export default IconBar;
