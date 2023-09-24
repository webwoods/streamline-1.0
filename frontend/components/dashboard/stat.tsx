import styles from '@/app/page.module.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
      <ThumbUpIcon />
      </div>
      <span className={styles['stat-value']}>{props.value}</span>
    </div>
  )
}