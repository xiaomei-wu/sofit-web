import Image from 'next/image';
import styles from './DetailsCard.module.css';

const DetailsCard = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Image alt="card-icon" height={50} src={icon} width={50} />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default DetailsCard;
