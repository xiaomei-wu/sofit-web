"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import AuthForm from "@/components/AuthForm/AuthForm";
import { login } from "@/networks/auth";
import styles from './page.module.css'

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;
console.log(    {email, password})

    try {
      const response =  await login(email, password);

      console.log(response);
      
      // if(response) {
      //   setState({
      //     ...state,
      //     message: data.message,
      //     email: "",
      //     password: "",
      //   });
      // }
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className="pt5 flex flex-column">
        <AuthForm {...state} handleChange={handleChange} handleSubmit={handleSubmit} />
        <div className="w-100 pa3 mr2">
          <button
            className="f6 link dim br-pill ph5 pv2 mb2 dib white bg-dark-blue"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
