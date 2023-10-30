import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './RecomendationCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle: string | ReactNode;
  path: string;
};

const RecomendationCard = ({ icon, title, subtitle, path }: Card) => {
  return (
    <Link href={path}>
      <div className={styles.card}>
        <Image alt="card-icon" height={40} src={icon} width={40} />
        <div>
          <div className={styles.title}>{title}</div>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecomendationCard;
