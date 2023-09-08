import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/HeroSection/HeroSection';
import Header from '@/components/ui/Header/Header';
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
