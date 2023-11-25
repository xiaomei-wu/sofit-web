import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './SmallFeatureCard.module.css';

type Card = {
  icon: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  path?: string;
  actionIcon?: string;
};

export default function SmallFeatureCard({
  icon,
  title,
  subtitle,
  path,
  actionIcon
}: Card) {
  return (
    <Link className={styles.card} href={`/dashboard/${path}`}>
      <Image alt="card-icon" height={30} src={icon} width={30} />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div>
        {actionIcon && (
          <Image alt="action-icon" height={30} src={actionIcon} width={30} />
        )}
      </div>
    </Link>
  );
}
