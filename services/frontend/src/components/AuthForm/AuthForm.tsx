import { useState } from 'react';
import styles from './AuthForm.module.css';

export default function AuthForm(props) {
  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState(props.password || '');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    props.handleChange(event); // Pass the event up to the parent component if needed
  };

  return (
    <form className={styles.formWrapper} onSubmit={props.handleSubmit}>
      <div>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email address..."
          type="email"
          value={email}
        />
      </div>

      <div>
        <input
          id="password"
          max="20"
          min="8"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password..."
          type="password"
          value={password}
        />
      </div>

      {props.message && <span style={{ color: 'red' }}>{props.message}</span>}

      <div>
        <button className={styles.continueButton} type="submit">
          Continue with email
        </button>
      </div>
    </form>
  );
}
