'use client';

import { useState } from 'react';
// import Calendar from 'react-calendar';
import dynamic from 'next/dynamic';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const DynamicCalendar = dynamic(() => import('react-calendar'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function CalendarComp() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DynamicCalendar onChange={onChange} value={value} />
    </div>
  );
}
