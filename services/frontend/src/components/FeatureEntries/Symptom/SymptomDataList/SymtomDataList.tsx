'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { useDeleteSymptomData } from '@/hooks';
import { Symptom } from '@/types/symptom';
import { message } from 'antd';
import { getIcon } from '../SymptomForm/SymptomForm.helper';
import styles from './SymptomDataList.module.css';

type SymptomDataListType = {
  data: Symptom[];
  setSelectedRecord: (data: Symptom) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export default function SymptomDataList({
  data,
  setSelectedRecord,
  setIsModalOpen
}: SymptomDataListType) {
  const { mutateAsync: deleteSymptomData } = useDeleteSymptomData();

  const onDelete = async (uuid: string) => {
    try {
      await deleteSymptomData(uuid);
      message.success('Success');
    } catch (error) {
      message.error(`${error}`);
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
