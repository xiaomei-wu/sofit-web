'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { deleteDrink } from '@/hooks';
import { message } from 'antd';
import styles from './DrinkList.module.css';

export default function DrinkList({
  drinks,
  setSelectedRecord,
  setIsModalOpen,
}) {
  const onDelete = async uuid => {
    try {
      await deleteDrink(uuid);
      message.success('Success');
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className={styles.datalist}>
      {drinks.map(item => (
        <div key={item.uuid}>
          <InfoCard
            icon={'/drink.png'}
            title={item.name}
            subtitle={`${item.servingAmount} ${item.servingSize}`}
            addIcon={'/plus.png'}
            editIcon={'/pen.png'}
            deleteIcon={'/delete.png'}
            onDelete={() => onDelete(item.uuid)}
            onEdit={() => {
              setSelectedRecord(item);
              setIsModalOpen(true);
            }}
          />
        </div>
      ))}
    </div>
  );
}
