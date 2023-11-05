'use client';

import animationData from '@/assets/animations/checkmark.json';
import { ReactNode } from 'react';
import Lottie from 'react-lottie';
import styles from './SuccessPage.module.css';

const SuccessPage = ({ children }: { children: ReactNode }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={styles.wrapper}>
      <Lottie options={defaultOptions} height={200} width={200}></Lottie>
      {children}
    </div>
  );
};

export default SuccessPage;
