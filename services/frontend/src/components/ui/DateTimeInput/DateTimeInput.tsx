'use cleint';

import React from 'react';
import styles from './DateTimeInput.module.css';

interface DateTimeInputProps {
  date: string;
  startTime: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  date,
  startTime,
  handleChange,
}) => (
  <div>
    <form className={styles.dateTimeWrapper}>
      <div>
        <input
          id="date"
          name="date"
          onChange={handleChange}
          type="date"
          value={date}
        />
      </div>
      <div>
        <input
          id="startTime"
          name="startTime"
          onChange={handleChange}
          type="time"
          value={startTime}
        />
      </div>
    </form>
  </div>
);

export default DateTimeInput;
