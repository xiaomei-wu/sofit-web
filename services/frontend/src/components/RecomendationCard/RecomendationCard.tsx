import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './RecomendationCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle: string | ReactNode;
};

const RecomendationCard = ({ icon, title, subtitle }: Card) => {
  return (
    <div className={styles.card}>
      <Image alt="card-icon" height={40} src={icon} width={40} />
      <div>
        <div className={styles.title}>{title}</div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default RecomendationCard;
