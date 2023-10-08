'use client';

import EmptyView from '@/components/shared/EmptyView/EmptyView';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetSleepData } from '@/hooks';
import { Modal } from 'antd';
import { useState } from 'react';
import styles from './Sleep.module.css';
import SleepDataList from './SleepDataList/SleepDataList';
import SleepForm from './SleepForm/SleepForm';

export default function Sleep() {
  const { data: sleepData, isLoading } = useGetSleepData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAddButton = () => {
    setSelectedRecord(null);
    showModal();
  };

  if (isLoading) return null;

  return (
    <div>
      <div className={styles.buttonWrapper}>
        <PrimaryButton onClick={onClickAddButton}>Add sleep data</PrimaryButton>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <SleepForm
            closeModal={closeModal}
            selectedRecord={selectedRecord}
            isEditMode={!!selectedRecord}
          />
        </Modal>
      </div>

      {sleepData?.length > 0 ? (
        <SleepDataList
          data={sleepData}
          setSelectedRecord={setSelectedRecord}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <EmptyView image={'/sleep-analysis.svg'} />
      )}
    </div>
  );
}
