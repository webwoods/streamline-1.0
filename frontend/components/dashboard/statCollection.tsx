import styles from '@/styles/page.module.css'
import Stat from './stat'

export default function StatCollection() {

  const mockdata = [
    { title: 'Awaiting Approval', icon: 'thumb-up', value: 3 },
    { title: 'Awaiting Approval', icon: 'thumb-up', value: 3 },
    { title: 'Awaiting Approval', icon: 'thumb-up', value: 3 },
    { title: 'Awaiting Approval', icon: 'thumb-up', value: 3 }
  ]

  return (
    <div className={styles['stat-collection']}>
      {mockdata?.map((data, index) => {
        return (
          <Stat props={{ ...data }} key={data.title} />
        )
      })}
    </div>
  )
}