import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import Link from "next/link";
import styles from './page.module.css'
import Image from "../../node_modules/next/image";

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
