import RandomAvatar from '@/components/RandomAvatar/RandomAvatar'
import Avatars from '@/components/RandomAvatar/RandomAvatar'
import IconBar from '@/components/IconBar/IconBar'
import NavBar from '@/components/NavBar/NavBar'
import Image from 'next/image'
import styles from './page.module.css'
import FeatureCard from '@/components/FeatureCard/FeatureCard'
import CalendarComp from '@/components/CalendarComp/CalendarComp'
import RecomendationCard from '@/components/RecomendationCard/RecomendationCard'
import ActicityCard from '@/components/ActivityCard/ActivityCard'
import dynamic from 'next/dynamic'
import DoctorsBanner from '@/components/DoctorsBanner/DoctorsBanner'
import DetailsCard from '@/components/DetailsCard/DetailsCard'
// import Calendar from 'react-calendar';
// import { useState } from 'react'
// import { Value } from '../../../node_modules/react-calendar/dist/cjs/shared/types'
const NoSSRCalendar = dynamic(() => import('@/components/CalendarComp/CalendarComp'), { ssr: false })
export default function Home() {
  // const [value, onChange] = useState<Value>(new Date());

  return (
    <div className={styles.dashboard}>
      <IconBar/>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.feature}>
          <div className={styles.left}>
            <section className={styles.featureCards}>
              <FeatureCard icon={'/nutrition.png'} title={"Nutrition"} subtitle={"1000g"} />
              <FeatureCard icon={'/drink.png'} title={"Alcohol"} subtitle={"1000ml"} />
              <FeatureCard icon={'/sleep.png'} title={"Sleep"} subtitle={"8 hours"} />
              <FeatureCard icon={'/tongue.png'} title={"Symptome"} subtitle={"Fever"} />
              {/* <FeatureCard icon={'/sleep.png'} title={"Excercise"} subtitle={"Have you worked out today?"} />
              <FeatureCard icon={'/sleep.png'} title={"Sleep"} subtitle={"Did you sleep well?"} />
              <FeatureCard icon={'/nutrition.png'} title={"Symtoms"} subtitle={"Have a headache here?"} /> */}
            </section>

            <section className={styles.activity}>
              <ActicityCard />
            </section>

            <section >
            <h4>Recomendations</h4>
            <div className={styles.recomendations}>
            <RecomendationCard icon={"/breast.png"} title={"How should you check your breast by yourself?"} subtitle={"8 July 2023"} />
            <RecomendationCard icon={"/headache.png"} title={"How to stop headache?"} subtitle={"5 July 2023"} />
            <RecomendationCard icon={"/woman.png"} title={"Celebrating Women’s Health Week!"} subtitle={"5 July 2023"} />
            <RecomendationCard icon={"/contraceptive-pills.png"} title={"All about contraceptive pills!"} subtitle={"5 July 2023"} />
            <RecomendationCard icon={"/nail.png"} title={"Are Gel Manicures Dangerous?"} subtitle={"8 July 2023"} />
            <RecomendationCard icon={"/protein-shake.png"} title={"Supplements for fitness"} subtitle={"5 July 2023"} />
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
                <DetailsCard icon={'/fire.png'} title={"Activity"} subtitle={"BFP: 25"} />
                <DetailsCard icon={'/nutrition.png'} title={"Nutrition"} subtitle={"24 Days ago"} />
                <DetailsCard icon={'/drink.png'} title={"Alcohol"} subtitle={"09:00 am - 10:00 am"} />
                <DetailsCard icon={'/tongue.png'} title={"Symptome"} subtitle={"Blood Pressure"} />
                <DetailsCard icon={'/diet.png'} title={"Body Measurements"} subtitle={"BFP: 25"} />
                <DetailsCard icon={'/menstrual-cycle.png'} title={"Menstrual Flow"} subtitle={"24 Days ago"} />
                <DetailsCard icon={'/drugs.png'} title={"Medications"} subtitle={"09:00 am - 10:00 am"} />
                <DetailsCard icon={'/blood-pressure.png'} title={"Heart"} subtitle={"Blood Pressure"} />
              </section>
            </div>
          </div>

        </div>
       
    </main>
    </div>
  )
}
