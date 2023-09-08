"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { signup } from "@/networks/auth";
import AuthForm from "@/components/AuthForm/AuthForm";
import styles from './page.module.css'
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";
import Header from "@/components/Header/Header";

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
<div>
      <Header />
      <main>
        <div className={styles.loginSection}>
        <h2>Sign up</h2>
     
      
          <div>
 
      <AuthForm {...state} handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={styles.dividerDiv}>
           <div className={styles.divider}/>
            </div>

      <div className={styles.ssoSection}>
            <button className={styles.googleButton}>
           <Image src={"/google-symbol.svg"} alt="google-symbol" width={14} height={14}/>Continue with Google</button>
        <button className={styles.appleButton}>
           <Image src={"/apple-symbol.svg"} alt="google-symbol" width={14} height={14}/>Continue with Apple</button>
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
