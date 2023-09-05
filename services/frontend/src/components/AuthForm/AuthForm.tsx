import { useState } from "react";
import styles from './AuthForm.module.css'

export default function AuthForm(props) {
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.password || "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    props.handleChange(event); // Pass the event up to the parent component if needed
  };

  return (
    <form onSubmit={props.handleSubmit} className={styles.formWrapper}>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email address..."
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          id="password"
          min="8"
          max="20"
          placeholder="Enter your password..."
        />
      </div>

      {props.message && <span style={{ color: "red" }}>{props.message}</span>}

      <div>
          <button
            type="submit"
            className={styles.continueButton}
          >
            Continue with email
          </button>
        </div>
    </form>
  );
}
