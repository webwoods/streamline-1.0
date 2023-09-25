import styles from '@/styles/page.module.css'
import StatCollection from '@/components/dashboard/statCollection'
import { StatsSegments } from '@/components/dashboard/statsSegments'
import TwoComponentRow from '@/components/donutchart/TwoComponentRow'

export default function Dashboard() {

  return (
    <>
      <main className={styles.main}>
        
        {/* <StatsSegments total={'total'} diff={0} data={[{
          label: 'string',
          count: 'string',
          part: 2,
          color: 'string',
        }]} /> */}

        {/* TwoComponentRow */}
        <TwoComponentRow />
      </main>
    </>
  )
}
