import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { dateFormat, timeFormat } from '@/utils';

import { useCreateDrink, useUpdateDrink } from '@/hooks';
import { CreateDrinkDto } from '@/networks/drink/drink.dto';
import { Drink } from '@/types/drink';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import TimePicker from 'antd/lib/time-picker';
import dayjs from 'dayjs';
import { DrinkCategory } from '../Drink.helper';
import styles from './DrinkForm.module.css';

type DrinkFormType = {
  closeModal: () => void;
  selectedRecord: Drink | null;
  isEditMode: boolean;
  selectedDrink: Partial<CreateDrinkDto | Drink> | null;
};

export default function DrinkForm({
  closeModal,
  selectedRecord,
  isEditMode,
  selectedDrink
}: DrinkFormType) {
  const { mutateAsync: createDrink } = useCreateDrink();
  const { mutateAsync: updateDrink } = useUpdateDrink();

  const initialValues = {
    date: dayjs(selectedRecord?.date) || dayjs(),
    startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    name: selectedDrink?.name || '',
    imgUrl: selectedDrink?.imgUrl || '',
    servingAmount: selectedRecord?.servingAmount || '',
    servingSize: selectedRecord?.servingSize || '',
    category: selectedDrink?.category || DrinkCategory.ALCOHOLIC
  };

  const onFinish = async (values: CreateDrinkDto) => {
    try {
      if (isEditMode && selectedRecord?.uuid) {
        await updateDrink({
          drinkId: selectedRecord?.uuid,
          updateDrinkDto: values
        });
      } else {
        await createDrink({ createDrinkDto: values });
      }
      const { message } = await import('antd');
      message.success('Success');
      return closeModal();
    } catch (error) {
      const { message } = await import('antd');
      message.error(`${error}`);
    }
  };

  return (
    <Form
      name="drink"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className={styles.form}
    >
      <div className={styles.headRow}>
        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please input your date!' }]}
          className={styles.formItem}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="startTime"
          rules={[{ required: true, message: 'Please input your time!' }]}
        >
          <TimePicker format={timeFormat} />
        </Form.Item>

        <Form.Item className={styles.formItem} name="category">
          <Select
            options={[
              { value: DrinkCategory.ALCOHOLIC, label: 'Alcoholic' },
              { value: DrinkCategory.NON_ALCOHOLIC, label: 'Non-alcoholic' },
              { value: DrinkCategory.COCKTAIL, label: 'Cocktail' },
              { value: DrinkCategory.ORDINARY_DRINK, label: 'Ordinary drink' }
            ]}
          />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item
          className={styles.formItem}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input a name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Image url" name="imgUrl" className={styles.formItem}>
          <Input />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item
          className={styles.formItem}
          label="Serving amount"
          name="servingAmount"
          rules={[
            { required: true, message: 'Please input your serving amount!' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Serving size"
          name="servingSize"
          rules={[
            { required: true, message: 'Please input your serving size!' }
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item className={styles.formItem}>
        <div className={styles.buttonWrapper}>
          <PrimaryButton htmlType="submit">Save</PrimaryButton>
        </div>
      </Form.Item>
    </Form>
  );
}
