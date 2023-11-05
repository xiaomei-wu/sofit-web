import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function HeroSection() {
  const { heroSection, heroContent, textSection, signupButton, subTitle } =
    styles;

  return (
    <section className={heroSection}>
      <div className={heroContent}>
        <div className={textSection}>
          <h1>
            Nutrition, Sleep, Activities, Symptoms. Your input, our ouput.
          </h1>
          <div className={subTitle}>
            Your all-in-one health tracker app designed to empower you to
          </div>
          <div className={subTitle}>live a healthier, happier life.</div>
          <div className={signupButton}>
            <Link href={'/signup'}>Get Sofit free →</Link>
          </div>
        </div>
        <Image
          alt={'health-tracker-image'}
          height={260}
          src={'/health-tracker-image.jpg'}
          width={852}
        />
      </div>
    </section>
  );
}
