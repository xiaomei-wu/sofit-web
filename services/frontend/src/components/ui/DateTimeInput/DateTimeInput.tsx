'use cleint';

import React from 'react';

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
    <form className="date-form">
      <div className="row-container">
        {/* Icon */}
        <input
          className="f6 pa1 mr2 ml1 w4 mv1"
          id="date"
          name="date"
          onChange={handleChange}
          type="date"
          value={date}
        />
      </div>
      <div className="row-container">
        {/* Icon */}
        <input
          className="f6 pa1 mr2 ml1 w4 mv1"
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
