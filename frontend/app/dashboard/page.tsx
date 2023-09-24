import styles from '@/app/page.module.css'
import StatCollection from '@/components/dashboard/statCollection'
import { StatsSegments } from '@/components/dashboard/statsSegments'

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
        <StatCollection />
      </main>
    </>
  )
}
