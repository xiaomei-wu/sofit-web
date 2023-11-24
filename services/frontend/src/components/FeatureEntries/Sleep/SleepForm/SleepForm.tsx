'use client';

import PrimaryButton from '@/components/ui/PrimaryButton/PrimaryButton';
import { useCreateSleepData, useUpdateSleepData } from '@/hooks';
import { Sleep } from '@/types/sleep';
import {
  calculateTotalMinutes,
  convertMinutesToHoursAndMinutes,
  dateFormat,
  timeFormat
} from '@/utils';
import { DatePicker, Form, Input, InputNumber, TimePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './SleepForm.module.css';

const { TextArea } = Input;

type SleepFormType = {
  isEditMode: boolean;
  selectedRecord: Sleep | null;
  closeModal: () => void;
};

export default function SleepForm({
  isEditMode,
  selectedRecord,
  closeModal
}: SleepFormType) {
  const { mutateAsync: updateSleepData } = useUpdateSleepData();
  const { mutateAsync: createSleepData } = useCreateSleepData();
  const { hours, minutes } = convertMinutesToHoursAndMinutes(
    selectedRecord?.durationMinutes || 0
  );
  const initialValues = {
    date: dayjs(selectedRecord?.date) || dayjs(),
    startTime: dayjs(selectedRecord?.startTime) || dayjs(),
    notes: selectedRecord?.notes || '',
    hours,
    minutes
  };

  const onFinish = async ({
    date,
    startTime,
    notes,
    hours,
    minutes
  }: {
    date: Date;
    startTime: Date;
    notes: string;
    hours: number;
    minutes: number;
  }) => {
    const durationMinutes = calculateTotalMinutes(hours, minutes);

    const payload = {
      date,
      startTime,
      notes,
      durationMinutes
    };

    try {
      if (isEditMode && selectedRecord) {
        await updateSleepData({
          uuid: selectedRecord.uuid,
          updateSleepDto: payload
        });
        const { message } = await import('antd');
        message.success('Success');
      } else {
        await createSleepData({ createSleepDto: payload });
        const { message } = await import('antd');
        message.success('Success');
      }

      closeModal();
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

      <PrimaryButton htmlType="submit">Save</PrimaryButton>
    </Form>
  );
}
