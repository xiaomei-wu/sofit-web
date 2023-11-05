'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './InfoCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  path?: string;
  editIcon: string | StaticImport;
  deleteIcon: string | StaticImport;
  onDelete: () => void;
  onEdit: () => void;
  onClickBanner?: () => void;
  nutrientsBadge?: string | StaticImport;
};

const InfoCard = ({
  icon,
  title,
  subtitle,
  deleteIcon,
  onDelete,
  editIcon,
  onEdit,
  onClickBanner,
  nutrientsBadge
}: Card) => {
  return (
    <div className={styles.card} onClick={onClickBanner}>
      <Image
        alt="card-icon"
        height={40}
        src={icon}
        width={40}
        className={styles.image}
      />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.icons}>
        {nutrientsBadge && (
          <Image
            alt="nutrients-badge"
            height={30}
            src={nutrientsBadge}
            width={30}
            onClick={onClickBanner}
          />
        )}
        <Image
          alt="delete-icon"
          height={30}
          src={deleteIcon}
          width={30}
          onClick={onDelete}
        />
        <Image
          alt="edit-icon"
          height={30}
          src={editIcon}
          width={30}
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export default InfoCard;
