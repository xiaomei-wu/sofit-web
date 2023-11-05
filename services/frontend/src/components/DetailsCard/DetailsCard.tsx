import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './DetailsCard.module.css';

type DetailsCardType = {
  title: string | ReactNode;
  icon: string | StaticImport;
  children: ReactNode;
};

const DetailsCard = ({ title, icon, children }: DetailsCardType) => {
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
