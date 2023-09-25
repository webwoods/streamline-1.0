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
    <div className={styles['stat-card']}>
      <div className={styles['stat']}>
        <h5>{props.title}</h5>
        <div className={styles['icon-circle']}>
        <ThumbsUp size={36} />
        </div>
      </div>
      <span className={styles['stat-value']}>{props.value}</span>
    </div>
  )
}