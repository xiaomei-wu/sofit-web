import HeroSection from '@/components/HeroSection/HeroSection';
import Footer from '@/components/ui/Footer/Footer';
import Header from '@/components/ui/Header/Header';
import { ConfigProvider } from 'antd';
import styles from './page.module.css';
import theme from './themeConfig';

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <Header />
      <div className={styles.main}>
        <HeroSection />
      </div>
      <Footer />
    </ConfigProvider>
  );
}
