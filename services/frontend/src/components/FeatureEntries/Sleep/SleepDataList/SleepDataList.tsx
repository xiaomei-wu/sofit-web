'use client';

import InfoCard from '@/components/shared/InfoCard/InfoCard';
import { useDeleteSleepData } from '@/hooks';
import { Sleep } from '@/types/sleep';
import { calculateMinutesToHours } from '@/utils';
import { message } from 'antd';
import styles from './SleepDataList.module.css';

type SleepDataListType = {
  data: Sleep[];
  setSelectedRecord: (selectedRecord: Sleep | null) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export default function SleepDataList({
  data,
  setSelectedRecord,
  setIsModalOpen
}: SleepDataListType) {
  const { mutateAsync: deleteSleepData } = useDeleteSleepData();

  const onDelete = async (uuid: string) => {
    try {
      await deleteSleepData(uuid);
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
            icon={
              item.durationMinutes >= 360 ? '/happy-face.png' : '/sad-face.png'
            }
            title={calculateMinutesToHours(item.durationMinutes)}
            subtitle={item.notes || ''}
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
