import styles from '@/app/page.module.css'
import RectangularBox from './modal'

export default function Home() {

  return (
    <>
      <main className={styles.main}>
        
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>This is the hero section</h1>
          </div>
          {/* <FloorPlan /> */}
          {/* <Stalls /> */}
          {/* <Users /> */}
          <RectangularBox />
        </div>
      </main>
    </>
  )
}
