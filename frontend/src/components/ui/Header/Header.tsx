'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.flex}>
        <div className={styles.innerFlex}>
          <Link href="/">
            <Image
              className={styles['aspect-ratio-image']}
              src={'/sofit-logo.png'}
              alt="logo"
              loading="eager"
              width={100}
              height={75}
            />
          </Link>
        </div>
        <div className={styles.innerFlex}>
          <Link href="/login">Login</Link>
          <div className={styles.signupButton}>
            <Link href={'/signup'}>Get Sofit free</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
