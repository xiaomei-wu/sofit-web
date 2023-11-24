'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import styles from './CalendarComp.module.css';

const DynamicCalendar = dynamic(
  () => import('react-calendar').then(response => response.Calendar),
  {
    loading: () => <p>Loading...</p>,
    ssr: false
  }
);

export default function CalendarComp() {
  const [date, setDate] = useState<Value>(new Date());

  const onChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <div>
      <DynamicCalendar
        onChange={onChange}
        value={date}
        className={styles.calendar}
      />
    </div>
  );
}
