import styles from '@/styles/stats.module.css'
import Stat from './stat'

export default function StatCollection() {

  const mockdata = [
    { title: 'Awaiting Approval', icon: 'thumb-up', value: 3 },
    { title: 'Pending Requisitions', icon: 'clipboard-text.svg', value: 12 },
    { title: 'Purchase Orders', icon: 'thumb-up', value: 114 },
    { title: 'Vendor Responses', icon: 'thumb-up', value: 20 }
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