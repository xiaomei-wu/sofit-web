import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { FOOD } from '@/hooks';
import {
  createRecipeRecord,
  CreateRecipeRecordDto,
  MealCategory,
  updateRecipeRecord
} from '@/networks';
import { FoodRecord, Recipe } from '@/types/food';
import { dateFormat, timeFormat } from '@/utils';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useQueryClient } from '@tanstack/react-query';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import Space from 'antd/lib/space';
import TimePicker from 'antd/lib/time-picker';
import dayjs from 'dayjs';
import styles from './RecipesForm.module.css';

type RecipesFormType = {
  closeModal: () => void;
  selectedRecipe: Recipe | null | undefined;
  isEditMode: boolean;
  selectedRecord: FoodRecord | null | undefined;
};

export default function RecipesForm({
  closeModal,
  selectedRecipe,
  isEditMode,
  selectedRecord
}: RecipesFormType) {
  const queryClient = useQueryClient();

  const initialValues = {
    date: dayjs(selectedRecord?.date) || dayjs(),
    startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    name: selectedRecipe?.name || '',
    yield: selectedRecipe?.yield || '',
    ingredients:
      selectedRecipe?.ingredients.map(ingredient => ({
        food: ingredient.food,
        text: ingredient.text,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
        weight: ingredient.weight
      })) || [],
    servingAmount: selectedRecord?.servingAmount || '',
    servingSize: selectedRecord?.servingSize || '',
    mealCategory: selectedRecord?.mealCategory || MealCategory.BREAKFAST,
    calories: selectedRecipe?.calories || ''
  };

  const onFinish = async (values: any) => {
    const payload: CreateRecipeRecordDto = {
      date: values.date,
      startTime: values.startTime,
      servingAmount: values.servingAmount,
      servingSize: values.servingSize,
      mealCategory: values.mealCategory,
      recipe: {
        name: values.name,
        yield: values.yield,
        calories: values.calories,
        ingredients: values.ingredients
      }
    };

    try {
      isEditMode && selectedRecord
        ? await updateRecipeRecord(selectedRecord.uuid, {
            ...selectedRecord,
            ...payload
          })
        : await createRecipeRecord(payload);

      queryClient.invalidateQueries([FOOD]);

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
      name="recipe"
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

        <Form.Item
          label="Yield"
          name="yield"
          className={styles.formItem}
          rules={[
            { required: true, message: 'Please input your serving amount!' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
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
          label="Total calories"
          name="calories"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <h4>Ingredients</h4>
      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'food']}
                  rules={[{ required: true, message: 'Missing food' }]}
                >
                  <Input placeholder="clams" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  rules={[{ required: true, message: 'Missing text' }]}
                >
                  <Input placeholder="5-ounce can whole baby clams,drained" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Missing quantity' }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="5" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'weight']}
                  rules={[{ required: true, message: 'Missing weight' }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="200" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add ingredient
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item className={styles.formItem}>
        <PrimaryButton htmlType="submit">Save</PrimaryButton>
      </Form.Item>
    </Form>
  );
}
