import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { STUDENTS_QUERY } from '@/gql/query';

export default function Students() {
  const { loading, error, data } = useQuery(STUDENTS_QUERY, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.queryContainer}>
      {data.students?.map((student: any) => (
        <div key={student.id}>
          <h2>{student.studentName}</h2>
          <p>{student.studentId}</p>
        </div>
      ))}
    </div>
  );
}
