'use client';

import EmptyView from '@/components/shared/EmptyView/EmptyView';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetSymptomData } from '@/hooks';
import { Symptom } from '@/types/symptom';
import { useState } from 'react';
import styles from './Symptom.module.css';

const { Modal } = dynamic(() => import('antd'), {
  loading: <p>Loading...</p>,
  ssr: false
});
const SymptomDataList = dynamic(
  () => import('./SymptomDataList/SymtomDataList'),
  {
    loading: <p>Loading...</p>,
    ssr: false
  }
);
const SymptomForm = dynamic(() => import('./SymptomForm/SymptomForm'), {
  loading: <p>Loading...</p>,
  ssr: false
});

export default function Symptom() {
  const { data: symptomData, isLoading } = useGetSymptomData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Symptom | null>(null);

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
        <PrimaryButton onClick={onClickAddButton}>
          Add symptom data
        </PrimaryButton>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <SymptomForm
            closeModal={closeModal}
            selectedRecord={selectedRecord}
            isEditMode={!!selectedRecord}
          />
        </Modal>
      </div>

      {symptomData && symptomData?.length > 0 ? (
        <SymptomDataList
          data={symptomData}
          setSelectedRecord={setSelectedRecord}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <EmptyView image={'/empty-view.svg'} />
      )}
    </div>
  );
}
