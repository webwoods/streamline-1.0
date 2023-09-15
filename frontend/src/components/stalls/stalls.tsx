import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '@/gql/query';

export default function Stalls() {

  return (
    <div className={styles.stallsContainer}>
    </div>
  );
}
