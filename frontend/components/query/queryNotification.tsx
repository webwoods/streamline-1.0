'use client'
import { NOTIFICATION_QUERY, REQUESTS_QUERY } from "@/gql/query";
import { useQuery } from "@apollo/client";
import Loading from "@/app/loading";
import Recents from "../recentActivity/recent";
import client from "@/gql/client";

const QueryNotification: React.FC = () => {

  const { loading, error, data } = useQuery(NOTIFICATION_QUERY,{client});

  if (loading) return <Loading />;
  if (error) return `Error! ${error}`;

 const notificatins = data.notifications.data;

  return (
    <div className="container mx-auto max-w-screen-lg py-5">
      <p className="text-3xl font-bold text-gray-800 py-5 dark:text-white">
        Recent Activity
      </p>
      {notificatins.map((data:any) => (
        <Recents
          key={data.id}
          date={new Date(data.createdAt).toLocaleString()}
          description={data.message}
        />
      ))}
    </div>
  );
};

export default QueryNotification;
