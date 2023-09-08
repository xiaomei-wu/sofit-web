import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.flex}>
        <div className={styles.innerFlex}>
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About Us</Link>
        </div>
        <div className={styles.innerFlex}>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <div className={styles.signupButton}>
            <Link href={'/signup'}>Get Sofit free</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
