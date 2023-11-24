import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { FOOD, useCreateFoodRecord, useUpdateFoodRecord } from '@/hooks';
import { CreateFoodRecordDto, FoodCategory, MealCategory } from '@/networks';
import { Food, FoodRecord } from '@/types/food';
import { dateFormat, timeFormat } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import Input from 'antd/es/input';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import TimePicker from 'antd/lib/time-picker';
import dayjs from 'dayjs';
import styles from './FoodForm.module.css';

type FoodFormType = {
  closeModal: () => void;
  selectedFood: Food | null | undefined;
  selectedRecord: FoodRecord | null | undefined;
  isEditMode: boolean;
};

export default function FoodForm({
  closeModal,
  selectedFood,
  selectedRecord,
  isEditMode
}: FoodFormType) {
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
    mealCategory: selectedRecord?.mealCategory || MealCategory.BREAKFAST
  };

  const onFinish = async (values: any) => {
    const payload: CreateFoodRecordDto = {
      food: {
        name: values.name,
        brand: values.brand,
        category: values.category,
        imgUrl: selectedFood?.imgUrl || '',
        nutrients: selectedFood?.nutrients?.[0] || undefined
      },
      date: values.date,
      startTime: values.startTime,
      servingAmount: values.servingAmount,
      servingSize: values.servingSize,
      mealCategory: values.mealCategory
    };

    const foodPayload = isEditMode
      ? {
          ...selectedRecord,
          ...payload
        }
      : payload;

    try {
      isEditMode && selectedRecord
        ? await updateFoodRecord({
            foodRecordId: selectedRecord.uuid,
            data: foodPayload
          })
        : await createFoodRecord(payload);
      await queryClient.invalidateQueries([FOOD]);
      const { message } = await import('antd');
      message.success('Success');
      closeModal();
    } catch (error) {
      const { message } = await import('antd');
      message.error(`${error}`);
    }
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

        <Form.Item className={styles.formItem} name="mealCategory">
          <Select
            options={[
              { value: 'BREAKFAST', label: 'Breakfast' },
              { value: 'LUNCH', label: 'Lunch' },
              { value: 'DINNER', label: 'Dinner' },
              { value: 'SNACK', label: 'Snack' }
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

        <Form.Item label="Brand" name="brand" className={styles.formItem}>
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

        <Form.Item
          label="Food Type"
          name="category"
          className={styles.formItem}
        >
          <Select
            options={[
              { value: 'GENERIC_FOODS', label: 'Generic food' },
              { value: 'PACKAGED_FOODS', label: 'Package food' }
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
