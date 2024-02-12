'use client'

import { NOTIFICATION_QUERY } from "@/gql/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import Loading from "@/app/loading";
import Recents from "../recentActivity/recent";
import client from "@/gql/client";
import { useEffect } from "react";

const QueryNotification: React.FC = () => {

  const [getNotifications, { loading, error, data }] = useLazyQuery(NOTIFICATION_QUERY, { client });

  useEffect(() => {
    getNotifications({
      variables: {
        page: 1,
        pageSize: 5,
      },
      pollInterval: 30000,
    })
  }, [])

  if (loading) return <Loading />;
  if (error) return `Error! ${error}`;

  const notifications = data?.notifications?.data;

  return (
    <div className="w-full max-w-screen-2xl px-10">
      <p className="text-3xl font-bold text-gray-800 pb-5 dark:text-white">
        Recent Activity
      </p>
        <Recents
          data={notifications}
        />
    </div>
  );
};

export default QueryNotification;
