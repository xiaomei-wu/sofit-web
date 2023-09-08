import Image from 'next/image';
import styles from './DetailsCard.module.css';

const DetailsCard = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <Image alt="card-icon" height={50} src={icon} width={50} />
      <div>
        <h3>{title}</h3>
        {children}
        {/* <p className={styles.subtitle}>{subtitle}</p> */}
      </div>
    </div>
  );
};

export default DetailsCard;
