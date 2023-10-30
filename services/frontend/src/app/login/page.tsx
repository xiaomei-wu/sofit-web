'use client';

import AuthForm from '@/components/AuthForm/AuthForm';
import Header from '@/components/ui/Header/Header';
import { useGetMe } from '@/hooks';
import { login } from '@/networks/auth';
import {
  getAccessTokenFromCookie,
  setAccessTokenCookie
} from '@/utils/cookies';
import { message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Login() {
  const router = useRouter();
  const { data: me } = useGetMe();

  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
  });

  useEffect(() => {
    const cookie = getAccessTokenFromCookie();
    if (me && cookie) {
      router.push('/dashboard');
    }
  }, []);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { email, password } = state;

    try {
      const response = await login(email, password);

      if (response.access_token) {
        setAccessTokenCookie(response.access_token);
        router.push('/dashboard');
      } else {
        message.error('Wrong email or password');
      }
    } catch (error) {
      message.error('Something went wrong');
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
              <Image
                alt="google-symbol"
                height={14}
                src={'/google-symbol.svg'}
                width={14}
              />
              Continue with Google
            </button>
            <button className={styles.appleButton}>
              <Image
                alt="google-symbol"
                height={14}
                src={'/apple-symbol.svg'}
                width={14}
              />
              Continue with Apple
            </button>
          </div>
          <div className={styles.dividerDiv}>
            <div className={styles.divider} />
          </div>
          <div>
            <AuthForm
              {...state}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />

            {/* <div className={styles.forgotPasswordWrapper}>
              <Link className={styles.forgotPassword} href={'/forgotpassword'}>
                Forgot password?
              </Link>
            </div> */}
          </div>
          <p className={styles.privacyText}>
            By clicking Continue with Apple/Google/Email/SAML above, you
            acknowledge that you have read and understood, and agree to Sofits{' '}
            <Link className={styles.links} href={'/terms'}>
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link className={styles.links} href={'/policy'}>
              Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
