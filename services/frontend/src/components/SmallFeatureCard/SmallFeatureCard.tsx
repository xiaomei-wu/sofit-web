import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './SmallFeatureCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
};

const SmallFeatureCard = ({ icon, title, subtitle, path }: Card) => {
  return (
    <Link className={styles.card} href={`/dashboard/${path}`}>
      <Image alt="card-icon" height={30} src={icon} width={30} />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div>
        <Image
          alt="arrow-icon"
          height={30}
          src={'/right-chevron.png'}
          width={30}
        />
      </div>
    </Link>
  );
};

export default SmallFeatureCard;
