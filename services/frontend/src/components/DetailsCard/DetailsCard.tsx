import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './DetailsCard.module.css'
import Image from '../../../node_modules/next/image';
import { StaticImport } from '../../../node_modules/next/dist/shared/lib/get-img-props';
import ArrowRight from '../../assets/icons/arrow-right.svg'

type Card = {
  icon: string | StaticImport;
  title:string | ReactNode;
  subtitle?:string | ReactNode;
}

const DetailsCard = ({icon, title, subtitle}: Card ) => {
  return (
   <div className={styles.card}>
    <Image src={icon} alt="card-icon" width={30} height={30}/>
    <div className={styles.text}>
      <div className={styles.title}>{title}</div>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
    <div>
    <Image src={'/right-chevron.png'} alt="arrow-icon" width={30} height={30}/>
    </div>
   </div>
  );
};

export default DetailsCard;
