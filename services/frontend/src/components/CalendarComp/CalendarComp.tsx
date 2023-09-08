"use client"
import Calendar from 'react-calendar';
import { useState } from 'react'
import { Value } from '../../../node_modules/react-calendar/dist/cjs/shared/types'

const CalendarComp = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default CalendarComp