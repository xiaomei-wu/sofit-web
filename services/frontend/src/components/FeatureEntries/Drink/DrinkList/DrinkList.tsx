'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { useDeleteDrink } from '@/hooks';
import { Drink } from '@/types/drink';
import { message } from 'antd';
import styles from './DrinkList.module.css';

type DrinkListType = {
  drinks: Drink[];
  setSelectedRecord: (selectRecord: Drink) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export default function DrinkList({
  drinks,
  setSelectedRecord,
  setIsModalOpen
}: DrinkListType) {
  const { mutateAsync: deleteDrink } = useDeleteDrink();

  const onDelete = async (uuid: string) => {
    try {
      await deleteDrink(uuid);
      message.success('Success');
    } catch (error) {
      message.error(`${error}`);
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
