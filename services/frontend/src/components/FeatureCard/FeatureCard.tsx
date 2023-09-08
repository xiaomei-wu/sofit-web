import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './FeatureCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle: string | ReactNode;
};

const FeatureCard = ({ icon, title, subtitle }: Card) => {
  return (
    <div className={styles.card}>
      <Image alt="card-icon" height={50} src={icon} width={50} />
      <div>
        <h3>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
