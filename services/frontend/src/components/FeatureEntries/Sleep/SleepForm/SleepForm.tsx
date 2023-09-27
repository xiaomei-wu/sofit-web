'use client';

import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { dateFormat, timeFormat } from '@/utils';
import { DatePicker, Form, Input, InputNumber, TimePicker } from 'antd';
import styles from './SleepForm.module.css';

const { TextArea } = Input;

export default function SleepForm() {
  const initialValues = {
    // date: dayjs(selectedRecord?.date) || dayjs(),
    // startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    // name: selectedFood?.name || '',
    // brand: selectedFood?.brand || '',
    // servingAmount: selectedRecord?.servingAmount || '',
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
          <DatePicker format={dateFormat} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="startTime"
          rules={[{ required: true, message: 'Please input your time!' }]}
        >
          <TimePicker format={timeFormat} style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <Form.Item className={styles.formItem} label="Notes" name="notes">
        <TextArea placeholder="I had a dream..." allowClear />
      </Form.Item>

      <div className={styles.row}>
        <Form.Item
          className={styles.formItem}
          label="Hours"
          name="hours"
          rules={[{ required: true, message: 'Please input your hours!' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} max={24} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Minutes"
          name="minutes"
          rules={[{ required: true, message: 'Please input your minutes!' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} max={59} />
        </Form.Item>
      </div>

      <Form.Item className={styles.formItem}>
        <PrimaryButton htmlType="submit">Submit</PrimaryButton>
      </Form.Item>
    </Form>
  );
}
