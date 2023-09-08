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
              <FeatureCard icon={'/nutrition.png'} title={"Dinks"} subtitle={"1000ml"} />
              <FeatureCard icon={'/sleep.png'} title={"Suplements"} subtitle={"Vitamin C"} />
              <FeatureCard icon={'/sleep.png'} title={"Symtoms"} subtitle={"Headache"} />
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
            <RecomendationCard icon={"/sleep.png"} title={"How should you check your health details by yourself?"} subtitle={"8 July 2023"} />
            <RecomendationCard icon={"/sleep.png"} title={"What does a cadiologist do?"} subtitle={"5 July 2023"} />
            <RecomendationCard icon={"/sleep.png"} title={"What should you kown about women's heath?"} subtitle={"5 July 2023"} />
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
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Body Measurements"} subtitle={"BFP: 25"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Menstrual Flow"} subtitle={"24 Days ago"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Drug consultation"} subtitle={"09:00 am - 10:00 am"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Heart"} subtitle={"Blood Pressure"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Body Measurements"} subtitle={"BFP: 25"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Menstrual Flow"} subtitle={"24 Days ago"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Drug consultation"} subtitle={"09:00 am - 10:00 am"} />
                <DetailsCard icon={'/avatars/meerkat.png'} title={"Heart"} subtitle={"Blood Pressure"} />
              </section>
            </div>
          </div>

        </div>
       
    </main>
    </div>
  )
}
