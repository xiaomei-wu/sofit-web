'use client';

import EmptyView from '@/components/shared/EmptyView/EmptyView';
import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useGetDrinks } from '@/hooks';
import { Input } from 'antd';

const { TextArea } = Input;

export default function Sleep() {
  const { data: sleepData, isLoading } = useGetDrinks();
  const initialValues = {
    // date: dayjs(selectedRecord?.date) || dayjs(),
    // startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    // name: selectedFood?.name || '',
    // brand: selectedFood?.brand || '',
    // servingAmount: selectedRecord?.servingAmount || '',
  };

  const onClickAddButton = () => {
    // setSelectedRecord(null);
    // setSelectedDrink(null);
    // showModal();
  };

  const onFinish = async values => {
    // try {
    //   if (isEditMode) {
    //     await updateDrink({
    //       drinkId: selectedRecord.uuid,
    //       updateDrinkDto: values,
    //     });
    //   } else {
    //     await createDrink({ createDrinkDto: values });
    //   }
    //   message.success('Success');
    //   return closeModal();
    // } catch (error) {
    //   message.error(error);
    // }
  };

  if (isLoading) return null;

  return (
    <div>
      <PrimaryButton onClick={onClickAddButton}>Add drink</PrimaryButton>
      {sleepData ? <>Prview</> : <EmptyView image={'/sleep-analysis.svg'} />}
    </div>
  );
}
