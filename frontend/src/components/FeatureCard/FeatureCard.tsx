import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './FeatureCard.module.css';

type Card = {
  icon: string;
  title: string | ReactNode;
  subtitle: string | ReactNode;
  path: string;
};

export default function FeatureCard({ icon, title, subtitle, path }: Card) {
  return (
    <Link href={`/dashboard/${path}`}>
      <div className={styles.card}>
        <Image alt="card-icon" height={50} src={icon} width={50} />
        <div>
          <h3>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
