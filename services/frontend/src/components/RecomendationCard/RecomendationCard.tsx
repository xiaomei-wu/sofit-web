import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './RecomendationCard.module.css'
import Image from '../../../node_modules/next/image';
import { StaticImport } from '../../../node_modules/next/dist/shared/lib/get-img-props';

type Card = {
  icon: string | StaticImport;
  title:string | ReactNode;
  subtitle:string | ReactNode;
}

const RecomendationCard = ({icon, title, subtitle}: Card ) => {
  return (
   <div className={styles.card}>
    <Image src={icon} alt="card-icon" width={40} height={40}/>
    <div>
    <div className={styles.title}>{title}</div>
    <p className={styles.subtitle}>{subtitle}</p>
    </div>

   </div>
  );
};

export default RecomendationCard;
