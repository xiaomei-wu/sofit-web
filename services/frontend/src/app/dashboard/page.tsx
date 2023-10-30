'use client';

import AnalysisCard from '@/components/AnalysisCard/AnalysisCard';
import DoctorsBanner from '@/components/DoctorsBanner/DoctorsBanner';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import RecomendationCard from '@/components/RecomendationCard/RecomendationCard';
import SmallFeatureCard from '@/components/shared/SmallFeatureCard/SmallFeatureCard';
import IconBar from '@/components/ui/IconBar/IconBar';
import NavBar from '@/components/ui/NavBar/NavBar';
import { useGetHistories } from '@/hooks/useHistories';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const NoSSRCalendar = dynamic(
  () => import('@/components/ui/CalendarComp/CalendarComp'),
  {
    ssr: false,
  },
);

export default function Dashboard() {
  const { data: histories } = useGetHistories();

  return (
    <div className={styles.dashboard}>
      <IconBar />
      <main className={styles.main}>
        <NavBar />
        <div className={styles.feature}>
          <div className={styles.left}>
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
              <AnalysisCard histories={histories} />
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

          <div className={styles.right}>
            <div className={styles.rightCard}>
              <section className={styles.calendar}>
                <NoSSRCalendar />
              </section>
              <section className={styles.doctors}>
                <h4>Doctors</h4>
                <DoctorsBanner />
              </section>
              <section className={styles.details}>
                <h4>Details</h4>
                <SmallFeatureCard
                  icon={'/fire.png'}
                  path="excercise"
                  subtitle={'BFP: 25'}
                  title={'Excercise'}
                />
                <SmallFeatureCard
                  icon={'/nutrition.png'}
                  path="energy"
                  subtitle={'Tired'}
                  title={'Energy'}
                />
                <SmallFeatureCard
                  icon={'/drink.png'}
                  subtitle={'09:00 am - 10:00 am'}
                  title={'Alcohol'}
                />
                <SmallFeatureCard
                  icon={'/tongue.png'}
                  subtitle={'Blood Pressure'}
                  title={'Symptome'}
                />
                <SmallFeatureCard
                  icon={'/diet.png'}
                  subtitle={'BFP: 25'}
                  title={'Body Measurements'}
                />
                <SmallFeatureCard
                  icon={'/menstrual-cycle.png'}
                  subtitle={'24 Days ago'}
                  title={'Menstrual Flow'}
                />
                <SmallFeatureCard
                  icon={'/drugs.png'}
                  subtitle={'09:00 am - 10:00 am'}
                  title={'Medications'}
                />
                <SmallFeatureCard
                  icon={'/blood-pressure.png'}
                  subtitle={'Blood Pressure'}
                  title={'Heart'}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
