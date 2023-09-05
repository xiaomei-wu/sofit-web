import Link from "next/link";
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

  <div className={styles.description}>My Health Diary</div>
      <div className={styles.grid}>
        <Link href="/signup">  
            Signup
        </Link>
      </div>
      <div className={styles.grid}>
        <Link href="/login">
            Login
        </Link>
        </div>
    </main>
  );
}
