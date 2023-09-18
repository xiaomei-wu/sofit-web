import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './InfoCard.module.css';

type Card = {
  icon: string | StaticImport;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  path?: string;
  editIcon?: string | StaticImport;
  deleteIcon?: string | StaticImport;
  actionIcon: string | StaticImport;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const InfoCard = ({
  icon,
  title,
  subtitle,
  addIcon,
  deleteIcon,
  onAdd,
  onDelete,
  editIcon,
  onEdit,
}: Card) => {
  return (
    <div className={styles.card}>
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
        {/* <Image
          alt="add-icon"
          height={30}
          src={addIcon}
          width={30}
          onClick={onAdd}
        /> */}
      </div>
    </div>
  );
};

export default InfoCard;
