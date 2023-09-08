import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
}
