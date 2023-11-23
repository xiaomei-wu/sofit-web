import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function HeroSection() {
  const {
    heroSection,
    heroContent,
    textSection,
    signupButton,
    subTitle,
    heroText
  } = styles;

  return (
    <section className={heroSection}>
      <div className={heroContent}>
        <div className={textSection}>
          <div className={heroText}>
            Nutrition, Sleep, Activities, Symptoms. Your input, our ouput.
          </div>
          <div className={subTitle}>
            Your all-in-one health tracker app designed to empower you to live a
            healthier, happier life.
          </div>
          {/* <div className={subTitle}>live a healthier, happier life.</div> */}
          <div className={signupButton}>
            <Link href={'/signup'}>Get Sofit free →</Link>
          </div>
        </div>
        <Image
          alt={'health-tracker-image'}
          src={'/health-tracker-image.jpg'}
          loading="eager"
          className={styles.imageWrapper}
        />
      </div>
    </section>
  );
}
