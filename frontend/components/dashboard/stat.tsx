import styles from '@/styles/stats.module.css'
import { ThumbsUp } from 'akar-icons';

export interface StatProps {
  props: {
    title?: string,
    icon?: string,
    value?: number,
  }
}

export default function Stat({ props }: StatProps) {

  return (
    <div className={styles['stat-container']}>
      <div className={styles['stat-card']}>
        <div className={styles['stat']}>
          <h5>{props.title}</h5>
          <div className={styles['icon-circle']}>
            <ThumbsUp size={36} />
          </div>
        </div>
        <span className={styles['stat-value']}>{props.value}</span>
      </div>

      {/* mobile only */}
      <div className={styles['stat-card-mobile']}>
        <div className={styles['stat-mobile']}>
          <h5>{props.title}</h5>
          <div className={styles['icon-circle']}>
            <ThumbsUp size={20} />
          </div>
        </div>
        <span className={styles['stat-value']}>{props.value}</span>
      </div>
    </div>
  )
}