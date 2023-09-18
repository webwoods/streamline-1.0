'use client'

import styles from '@/app/page.module.css'
import Companies from '@/components/companies/companies'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Header from '@/components/header/header'
import Stalls from '@/components/stalls/stalls'
import Students from '@/components/students/students'
import Users from '@/components/users/users'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>This is the hero section</h1>
          </div>
          {/* <FloorPlan /> */}
          {/* <Stalls /> */}
          {/* <Users /> */}
          <Companies />
          <Students />
          {/* <StatsSegments/> */}
        </div>
      </main>
    </>
  )
}
