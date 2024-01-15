import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { REQUESTS_QUERY } from '@/gql/query';
import client from '@/gql/client';

interface Props {
    page: number
    pageSize: number
    filter?: string
}

export function LazyQueryRequests({ page, pageSize, filter }: Props) {
    const [getRequests, { loading, error, data }] = useLazyQuery(REQUESTS_QUERY, { client });

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    return (
        <div>
            {/* <button onClick={() => getRequests({
                variables: { page, pageSize }
            })}>
                Click me!
            </button> */}
        </div>
    );
}

export function QueryRequests({ page, pageSize, filter }: Props) {
    const { loading, error, data } = useQuery(REQUESTS_QUERY, {
        client,
        variables: { page, pageSize },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <div>
            <p className='text-xs'>{JSON.stringify(data)}</p>
        </div>
    );
}