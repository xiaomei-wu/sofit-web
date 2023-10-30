'use client';

import AuthForm from '@/components/AuthForm/AuthForm';
import Header from '@/components/ui/Header/Header';
import { signup } from '@/networks/auth';
import { setAccessTokenCookie } from '@/utils/cookies';
import { message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Signup() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
  });

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
    const response = await signup(email, password);

    if (!response?.token) {
      return message.error('Something went wrong while creating the account');
    }
    setAccessTokenCookie(response.token);
    setRedirecting(true); // Start redirection
  };

  // Redirect to the login page after 5 seconds
  useEffect(() => {
    if (redirecting) {
      if (countdown === 0) {
        router.push('/login'); // Replace '/login' with the actual login page route
      } else {
        const countdownInterval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
          clearInterval(countdownInterval);
        };
      }
    }
  }, [router, countdown, redirecting]);

  if (redirecting) {
    return <p>Redirecting to the login page in {countdown} seconds...</p>;
  }

  return (
    <div>
      <Header />
      <main>
        <div className={styles.loginSection}>
          <h2>Sign up</h2>
          <div>
            <AuthForm
              {...state}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />

            <div className={styles.dividerDiv}>
              <div className={styles.divider} />
            </div>

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
          </div>

          <p className={styles.privacyText}>
            By clicking “Continue with Apple/Google/Email/SAML” above, you
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
