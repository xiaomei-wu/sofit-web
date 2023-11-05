'use client';

import AnalysisCard from '@/components/AnalysisCard/AnalysisCard';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import RecomendationCard from '@/components/RecomendationCard/RecomendationCard';
import styles from './page.module.css';

export default function Dashboard() {
  return (
    <div>
      <section className={styles.featureCards}>
        <FeatureCard
          icon="/nutrition.png"
          path="nutrition"
          subtitle="1000g"
          title="Nutrition"
        />
        <FeatureCard
          icon="/drink.png"
          path="drink"
          subtitle="1000ml"
          title="Drink"
        />
        <FeatureCard
          icon="/sleep.png"
          path="sleep"
          subtitle="8 hours"
          title="Sleep"
        />
        <FeatureCard
          icon="/tongue.png"
          path="symptoms"
          subtitle="Fever"
          title="Symptoms"
        />
      </section>

      <section className={styles.activity}>
        <AnalysisCard />
      </section>

      <section>
        <h4>Recomendations</h4>
        <div className={styles.recomendations}>
          <RecomendationCard
            icon={'/breast.png'}
            subtitle={'www.moffitt.org'}
            path={
              'https://www.moffitt.org/cancers/breast-cancer/faqs/how-to-do-a-self-breast-exam/'
            }
            title={'How do you check yourself for breast cancer?'}
          />
          <RecomendationCard
            icon={'/headache.png'}
            subtitle={'https://medlineplus.gov'}
            path="https://medlineplus.gov/ency/patientinstructions/000421.htm"
            title={'How to stop headache?'}
          />
          <RecomendationCard
            icon={'/woman.png'}
            subtitle={'https://www.cdc.gov'}
            path="https://www.cdc.gov/healthequity/features/nwhw/index.html"
            title={'Celebrating Women’s Health Week!'}
          />
          <RecomendationCard
            icon={'/contraceptive-pills.png'}
            subtitle={'https://my.clevelandclinic.org'}
            path="https://my.clevelandclinic.org/health/treatments/3977-birth-control-the-pill"
            title={'All about contraceptive pills!'}
          />
          <RecomendationCard
            icon={'/nail.png'}
            subtitle={'https://www.ncbi.nlm.nih.gov'}
            path="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7492020/"
            title={'Are Gel Manicures Dangerous?'}
          />
          <RecomendationCard
            icon={'/protein-shake.png'}
            subtitle={'hubermanlab'}
            path="https://www.hubermanlab.com/topics/supplementation-for-health-and-performance"
            title={'Supplementation for Health and Performance'}
          />
        </div>
      </section>
    </div>
  );
}
