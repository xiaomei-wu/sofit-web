"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { signup } from "@/networks/auth";
import AuthForm from "@/components/AuthForm/AuthForm";
import styles from './page.module.css'

export default function Signup() {
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

    try {
      const response = await  signup(email, password);
      if(response?.token) {
        router.push("/dashboard");
      } 
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
            Create an account
          </button>
        </div>
      </form>
    </main>
  );
}
