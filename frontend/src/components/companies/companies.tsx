import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { COMPANIES_QUERY } from '@/gql/query';

export default function Companies() {
  const { loading, error, data } = useQuery(COMPANIES_QUERY, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.queryContainer}>
      {data.companies?.map((company: any) => (
        <div key={company.id}>
          <h2>{company.companyName}</h2>
        </div>
      ))}
    </div>
  );
}
