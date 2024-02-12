'use client'

import client from '@/gql/client';
import { NOTIFICATIONS_WITH_USERS_QUERY } from '@/gql/query';
import { useLazyQuery } from '@apollo/client';
import { Button } from '@nextui-org/react';
import { Timeline, TimelineTitle } from 'flowbite-react';
import { useEffect } from 'react';

interface Props {

}

export default function ActivityTimeLine({ }: Props) {
    const [getActivities, { loading, error, data }] = useLazyQuery(NOTIFICATIONS_WITH_USERS_QUERY, { client });

    useEffect(() => {
        getActivities({ variables: { page: 1, pageSize: 10 } })
    }, [])

    return (
        <Timeline
        >
            {
                data ? (
                    data?.getNotificationsWithUser.data.map((notification: any, index: number) => (
                        <Timeline.Item>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Time>{new Date(notification?.createdAt).toLocaleString()}</Timeline.Time>
                                <Timeline.Title>{notification?.message.slice(0, -1)}</Timeline.Title>
                                <TimelineTitle className='text-xs'>by {notification?.sender?.name}</TimelineTitle>
                                {/* <Timeline.Body>
                                    Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                                    E-commerce & Marketing pages.
                                </Timeline.Body> */}
                            </Timeline.Content>
                        </Timeline.Item>
                    ))
                ) : (<></>)
            }
        </Timeline>
    );
}