import React from 'react';

interface FormRowProps {
  name?: string;
  title?: string;
  type: string;
  id: string;
  placeholder: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: FormRowProps) {
  return (
    <div>
      <label className="f6 w3 dib" htmlFor={props.name || ''}>
        {props.title || ''}
      </label>
      <input
        className="f6 pa1 mr3 ml1 w4 mv1"
        id={props.id}
        name={props.name || ''}
        onChange={event => props.handleChange(event)}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value || ''}
      />
    </div>
  );
}
