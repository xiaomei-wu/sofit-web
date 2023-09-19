'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import styles from './DrinkList.module.css';

export default function DrinkList({
  drinks,
  setSelectedRecord,
  setIsModalOpen,
}) {
  const onDelete = async uuid => {
    try {
      const response = await deleteFoodRecord(uuid);
      message.success(response.message);
    } catch (error) {
      message.error(error);
    }
  };

  const onAdd = async item => {
    if (item.food) {
      await createFoodRecord({ ...item, date: dayjs(), startTime: dayjs() });
    } else {
      await createRecipeRecord({ ...item, date: dayjs(), startTime: dayjs() });
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
            onAdd={() => onAdd(item)}
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
