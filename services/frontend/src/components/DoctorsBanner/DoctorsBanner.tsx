import React, { ReactNode } from 'react';
import styles from './DoctorsBanner.module.css'
import Image from '../../../node_modules/next/image';
import { StaticImport } from '../../../node_modules/next/dist/shared/lib/get-img-props';

type Card = {
  icon: string | StaticImport;
  title:string | ReactNode;
  subtitle:string | ReactNode;
}

const DoctorsBanner = () => {
  return (
   <div className={styles.card}>
    <Image src={'/avatars/bear.png'} alt="card-icon" width={35} height={35}/>
    <Image src={'/avatars/cat.png'} alt="card-icon" width={35} height={35}/>
    <Image src={'/avatars/fox.png'} alt="card-icon" width={35} height={35}/>
    <Image src={'/avatars/lion.png'} alt="card-icon" width={35} height={35}/>
    
   </div>
  );
};

export default DoctorsBanner;
