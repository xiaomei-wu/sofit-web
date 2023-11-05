'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { useDeleteSymptomData } from '@/hooks';
import { message } from 'antd';
import { getIcon } from '../SymptomForm/SymptomForm.helper';
import styles from './SymptomDataList.module.css';

export default function SymptomDataList({
  data,
  setSelectedRecord,
  setIsModalOpen
}) {
  const { mutateAsync: deleteSymptomData } = useDeleteSymptomData();

  const onDelete = async uuid => {
    try {
      await deleteSymptomData(uuid);
      message.success('Success');
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className={styles.datalist}>
      {data.map(item => (
        <div key={item.uuid}>
          <InfoCard
            icon={getIcon(item.name)}
            title={item.name}
            subtitle={`Intensity ${item.intensityLevel}`}
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
