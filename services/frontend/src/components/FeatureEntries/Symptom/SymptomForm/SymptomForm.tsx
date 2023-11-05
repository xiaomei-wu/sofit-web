'use client';

import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useCreateSymptomData, useUpdateSymptomData } from '@/hooks';
import {
  calculateTotalMinutes,
  convertMinutesToHoursAndMinutes,
  dateFormat,
  timeFormat
} from '@/utils';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Slider,
  TimePicker
} from 'antd';
import dayjs from 'dayjs';
import { nameOptions } from './SymptomForm.helper';
import styles from './SymptomForm.module.css';

const { TextArea } = Input;

export default function SymptomForm({
  isEditMode,
  selectedRecord,
  closeModal
}) {
  const { mutateAsync: updateSymptomData } = useUpdateSymptomData();
  const { mutateAsync: createSymptomData } = useCreateSymptomData();
  const { hours, minutes } = convertMinutesToHoursAndMinutes(
    selectedRecord?.durationMinutes
  );

  const initialValues = {
    date: dayjs(selectedRecord?.date) || dayjs(),
    startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    name: selectedRecord?.name || '',
    notes: selectedRecord?.notes || '',
    hours,
    minutes,
    intensityLevel: selectedRecord?.intensityLevel || 5
  };

  const onFinish = async ({
    date,
    startTime,
    name,
    notes,
    hours,
    minutes,
    intensityLevel
  }) => {
    const durationMinutes = calculateTotalMinutes(hours, minutes);

    const payload = {
      date,
      startTime,
      notes,
      name,
      intensityLevel,
      durationMinutes
    };

    try {
      if (isEditMode) {
        await updateSymptomData({
          uuid: selectedRecord.uuid,
          updateSymptomDto: payload
        });
        message.success('Success');
      } else {
        await createSymptomData({ createSymptomDto: payload });
        message.success('Success');
      }

      closeModal();
    } catch (error) {
      message.error(error);
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

      <Form.Item className={styles.formItem} label="Name" name="name">
        <Select
          options={nameOptions.map(option => ({
            value: option,
            label: option
          }))}
        />
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

      <Form.Item
        className={styles.formItem}
        label="Intensity"
        name="intensityLevel"
      >
        <Slider defaultValue={5} min={0} max={10} />
      </Form.Item>

      <Form.Item className={styles.formItem} label="Notes" name="notes">
        <TextArea placeholder="How did you feel..." allowClear />
      </Form.Item>

      <PrimaryButton htmlType="submit">Save</PrimaryButton>
    </Form>
  );
}
