import DoctorsBanner from '@/components/DoctorsBanner/DoctorsBanner';
import SmallFeatureCard from '@/components/SmallFeatureCard/SmallFeatureCard';
import IconBar from '@/components/ui/IconBar/IconBar';
import NavBar from '@/components/ui/NavBar/NavBar';
import dynamic from 'next/dynamic';
import styles from './DashboardLayout.module.css';

const NoSSRCalendar = dynamic(
  () => import('@/components/ui/CalendarComp/CalendarComp'),
  { ssr: false },
);

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboard}>
      <IconBar />
      <main className={styles.main}>
        <NavBar />
        <div className={styles.feature}>
          <div className={styles.left}>{children}</div>

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
                  subtitle={'BFP: 25'}
                  title={'Activity'}
                />
                <SmallFeatureCard
                  icon={'/nutrition.png'}
                  subtitle={'24 Days ago'}
                  title={'Nutrition'}
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
