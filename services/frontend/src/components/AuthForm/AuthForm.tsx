import { useState } from 'react';
import styles from './AuthForm.module.css';

type AuthFormType = {
  email: string;
  password: string;
  message: string;
  handleSubmit: (event: any) => Promise<any>;
  handleChange: (event: any) => void;
};

export default function AuthForm(props: AuthFormType) {
  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState(props.password || '');

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    props.handleChange(event);
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
