'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { deleteDrink, DRINKS } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import styles from './DrinkList.module.css';

export default function DrinkList({
  drinks,
  setSelectedRecord,
  setIsModalOpen,
}) {
  const queryClient = useQueryClient();

  const onDelete = async uuid => {
    try {
      await deleteDrink(uuid);
      message.success('Success');
      queryClient.invalidateQueries([DRINKS]);
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
