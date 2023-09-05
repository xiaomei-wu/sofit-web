import { useState } from "react";

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
    <div>
      <div className="flex flex-column items-center">
        <label className="mv1" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          id="email"
          className="mt1 mb3 w5"
        />
      </div>

      <div className="flex flex-column items-center">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          id="password"
          className="mt1 mb3 w5"
          minLength="8"
          maxLength="20"
        />
      </div>

      {props.message && <span style={{ color: "red" }}>{props.message}</span>}
    </div>
  );
}
