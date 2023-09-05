import React from 'react';
import Image from '../../../node_modules/next/image';
import Link from '../../../node_modules/next/link';
import styles from './Hero.module.css'

const HeroSection = () => {
  const {heroSection, heroContent, textSection,signupButton, subTitle} = styles;

  return (
    <section className={heroSection}>
      <div className={heroContent}>

      <div className={textSection}>
        <h1>Nutrition, Sleep, Activities, Symptoms. Your input, our ouput.</h1>
        <div className={subTitle}>Your all-in-one health tracker app designed to empower you to</div>
        <div className={subTitle}>live a healthier, happier life.</div>
        <div className={signupButton}>
          <Link href={'/signup'}>Get Sofit free →</Link>
        </div>
      </div>
        <Image src={"/health-tracker-image.jpg"} alt={'health-tracker-image'} width={852} height={260}/>
      </div>
    </section>
  );
};

export default HeroSection;
