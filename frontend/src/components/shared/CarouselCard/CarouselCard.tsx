'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './CarouselCard.module.css';

type Card = {
  imgUrl: string;
  title: string;
  onClick: () => void;
  children: ReactNode;
  subtitle?: string;
  emphasis?: string;
};

const CarouselCard = ({
  imgUrl,
  title,
  subtitle,
  children,
  emphasis,
  onClick
}: Card) => {
  return (
    <div className={styles.card}>
      {imgUrl && (
        <Image
          alt="carousel-img"
          height={70}
          src={imgUrl}
          width={70}
          onClick={onClick}
        />
      )}

      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <p className={styles.subtitle}>{subtitle}</p>
        {emphasis && <p className={styles.emphasis}>{emphasis}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CarouselCard;
