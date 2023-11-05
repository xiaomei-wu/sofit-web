import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './DetailsCard.module.css';

type DetailsCardType = {
  title: string | ReactNode;
  icon: string;
  children: ReactNode;
};

export default function DetailsCard({
  title,
  icon,
  children
}: DetailsCardType) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Image alt="card-icon" height={50} src={icon} width={50} />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}
