import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { FOOD, useCreateFoodRecord, useUpdateFoodRecord } from '@/hooks';
import { FoodCategory, MealCategory } from '@/networks';
import { dateFormat, timeFormat } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  TimePicker
} from 'antd';
import dayjs from 'dayjs';
import styles from './FoodForm.module.css';

export default function FoodForm({
  closeModal,
  selectedFood,
  selectedRecord,
  isEditMode,
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateFoodRecord } = useUpdateFoodRecord();
  const { mutateAsync: createFoodRecord } = useCreateFoodRecord();

  const initialValues = {
    date: dayjs(selectedRecord?.date) || dayjs(),
    startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    name: selectedFood?.name || '',
    brand: selectedFood?.brand || '',
    servingAmount: selectedRecord?.servingAmount || '',
    servingSize: selectedRecord?.servingSize || '',
    category: selectedFood?.category || FoodCategory.GENERIC_FOODS,
    mealCategory: selectedRecord?.mealCategory || MealCategory.BREAKFAST,
  };

  const onFinish = async (values: CreateFoodDto) => {
    const payload = {
      food: {
        name: values.name,
        brand: values.brand,
        category: values.category,
        imgUrl: selectedFood?.imgUrl || '',
        nutrients: selectedFood?.nutrients || undefined,
      },
      date: values.date,
      startTime: values.startTime,
      servingAmount: values.servingAmount,
      servingSize: values.servingSize,
      mealCategory: values.mealCategory,
    };

    const foodPayload = isEditMode
      ? {
          ...selectedRecord,
          ...payload,
        }
      : payload;

    try {
      isEditMode
        ? await updateFoodRecord({
            foodRecordId: selectedRecord.uuid,
            data: foodPayload,
          })
        : await createFoodRecord(payload);
      await queryClient.invalidateQueries([FOOD]);
      message.success('Success');
      closeModal();
    } catch (error) {
      message.error(error);
    }
  };

  type FieldType = {
    name: string;
    brand?: string;
    servingAmount: number;
    servingSize: string;
    mealCategory: string;
  };

  return (
    <Form
      name="food"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className={styles.form}
    >
      <div className={styles.headRow}>
        <Form.Item<FieldType>
          name="date"
          rules={[{ required: true, message: 'Please input your date!' }]}
          className={styles.formItem}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item<FieldType>
          className={styles.formItem}
          name="startTime"
          rules={[{ required: true, message: 'Please input your time!' }]}
        >
          <TimePicker format={timeFormat} />
        </Form.Item>

        <Form.Item<FieldType> className={styles.formItem} name="mealCategory">
          <Select
            options={[
              { value: 'BREAKFAST', label: 'Breakfast' },
              { value: 'LUNCH', label: 'Lunch' },
              { value: 'DINNER', label: 'Dinner' },
              { value: 'SNACK', label: 'Snack' },
            ]}
          />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item<FieldType>
          className={styles.formItem}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input a name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Brand"
          name="brand"
          className={styles.formItem}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item<FieldType>
          className={styles.formItem}
          label="Serving amount"
          name="servingAmount"
          rules={[
            { required: true, message: 'Please input your serving amount!' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<FieldType>
          className={styles.formItem}
          label="Serving size"
          name="servingSize"
          rules={[
            { required: true, message: 'Please input your serving size!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Food Type"
          name="category"
          className={styles.formItem}
        >
          <Select
            options={[
              { value: 'GENERIC_FOODS', label: 'Generic food' },
              { value: 'PACKAGED_FOODS', label: 'Package food' },
            ]}
          />
        </Form.Item>
      </div>

      <Form.Item className={styles.formItem}>
        <PrimaryButton htmlType="submit">Save</PrimaryButton>
      </Form.Item>
    </Form>
  );
}
