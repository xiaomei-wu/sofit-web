"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import AuthForm from "@/components/AuthForm/AuthForm";
import { login } from "@/networks/auth";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Link from "../../../node_modules/next/link";
import Image from "../../../node_modules/next/image";

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

    try {
      const response =  await login(email, password);

      console.log(response);
      if(response.access_token) {
        router.push('/dashboard')
      }
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className={styles.loginSection}>
        <h2>Log in</h2>
          <div className={styles.ssoSection}>
            <button className={styles.googleButton}>
           <Image src={"/google-symbol.svg"} alt="google-symbol" width={14} height={14}/>Continue with Google</button>
        <button className={styles.appleButton}>
           <Image src={"/apple-symbol.svg"} alt="google-symbol" width={14} height={14}/>Continue with Apple</button>
          </div>
          <div className={styles.dividerDiv}>
           <div className={styles.divider}/>
            </div>
          <div>

      <AuthForm {...state} handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={styles.forgotPasswordWrapper}>
      <Link href={"/forgotpassword"} className={styles.forgotPassword}>Forgot password?</Link>
      </div>

        </div>
        <p className={styles.privacyText}>By clicking “Continue with Apple/Google/Email/SAML” above, you acknowledge that you
     have read and understood, and agree to Sofit's <Link href={'/terms'} className={styles.links}>Terms & Conditions</Link> and <Link href={'/policy'} className={styles.links}>Policy</Link>
        </p>
        </div>
      
    </main>
    </div>
  );
}
