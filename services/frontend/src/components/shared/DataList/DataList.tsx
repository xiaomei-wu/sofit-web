'use client';

import { useDeleteFoodRecord } from '@/hooks';
import { createFoodRecord, createRecipeRecord } from '@/networks';
import { message } from 'antd';
import React from 'react';
import InfoCard from '../InfoCard/InfoCard';
import styles from './DataList.module.css';

interface DataListProps {
  data: any[];
  selectedRecord: any;
  setSelectedRecord: () => void;
  setIsModalOpen: () => void;
}

const DataList: React.FC<DataListProps> = ({
  data,
  setSelectedRecord,
  setIsModalOpen,
}) => {
  const { mutateAsync: deleteFoodRecord } = useDeleteFoodRecord();

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
      {data?.map((item, index) => (
        <div key={index}>
          <InfoCard
            icon={item.food ? '/carrot.png' : '/bibimbap.png'}
            title={item.name || item.food?.name || item.recipe?.name}
            subtitle={item.date.split('T')[0]}
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
};

export default DataList;
