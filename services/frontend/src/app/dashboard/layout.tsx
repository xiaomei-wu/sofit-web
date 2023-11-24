import DoctorsBanner from '@/components/DoctorsBanner/DoctorsBanner';
import NonSSRWrapper from '@/components/NonSSRWrapper/NonSSRWrapper';
import SmallFeatureCard from '@/components/shared/SmallFeatureCard/SmallFeatureCard';
import CalendarComp from '@/components/ui/CalendarComp/CalendarComp';
import IconBar from '@/components/ui/IconBar/IconBar';
import NavBar from '@/components/ui/NavBar/NavBar';
import { ReactNode } from 'react';
import styles from './page.module.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.dashboard}>
      <IconBar />
      <main className={styles.main}>
        <NonSSRWrapper>
          <NavBar />
        </NonSSRWrapper>

        <div className={styles.feature}>
          <div className={styles.left}>
            <NonSSRWrapper>{children}</NonSSRWrapper>
          </div>

          <div className={styles.right}>
            <div className={styles.rightCard}>
              <section className={styles.calendar}>
                <CalendarComp />
              </section>
              <section className={styles.doctors}>
                <h4>Doctors</h4>
                <DoctorsBanner />
              </section>
              <section className={styles.details}>
                <h4>Details</h4>
                <SmallFeatureCard
                  icon={'/fire.png'}
                  subtitle={'BFP: 25'}
                  title={'Activity'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/nutrition.png'}
                  subtitle={'24 Days ago'}
                  title={'Nutrition'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/drink.png'}
                  subtitle={'09:00 am - 10:00 am'}
                  title={'Alcohol'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/tongue.png'}
                  subtitle={'Blood Pressure'}
                  title={'Symptome'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/diet.png'}
                  subtitle={'BFP: 25'}
                  title={'Body Measurements'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/menstrual-cycle.png'}
                  subtitle={'24 Days ago'}
                  title={'Menstrual Flow'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/drugs.png'}
                  subtitle={'09:00 am - 10:00 am'}
                  title={'Medications'}
                  actionIcon="/right-chevron.png"
                />
                <SmallFeatureCard
                  icon={'/blood-pressure.png'}
                  subtitle={'Blood Pressure'}
                  title={'Heart'}
                  actionIcon="/right-chevron.png"
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
