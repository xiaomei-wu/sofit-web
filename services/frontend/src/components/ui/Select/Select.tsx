interface SelectRowProps {
  id: string;
  title?: string;
  value?: string;
  name?: string;
  options: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: SelectRowProps) {
  return (
    <div>
      <label className="f6 w3 dib" htmlFor={props.id}>
        {props.title || ''}
      </label>
      <select
        className="f6 pa1 mr3 ml1 w4 mv1"
        id={props.id}
        name={props.name || ''}
        onChange={event => props.handleChange(event)}
        value={props.value || ''}
      >
        {props.options.map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
