import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { REQUESTS_QUERY } from '@/gql/query';
import client from '@/gql/client';
import DynamicTable from '../table/table';
import Loading from '@/app/loading';

interface Props {
    page: number
    pageSize: number
    filter?: string
    renderTable?: boolean
}

export function LazyQueryRequests({ page, pageSize, filter, renderTable }: Props) {
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

export function QueryRequests({ page, pageSize, filter, renderTable = false }: Props) {
    const { loading, error, data } = useQuery(REQUESTS_QUERY, {
        client,
        variables: { page, pageSize },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error}`;

    if (data) {
        const extracted = data.getRequestsWithUser.data;
        console.log(extracted);

        if (renderTable) {
            const headerColumns = ["date", "subject", "requested by", "status"];
            const tableData = extracted.map((item: any, index: number) => {
                return {
                    ...item,
                    id: item.id,
                    date: new Date(item.updatedAt).toLocaleDateString('en-US'),
                    subject: item.subject,
                    'requested by': item.requestedUser.name,
                    status: item.status,
                }
            });

            return <DynamicTable
                headerColumns={headerColumns}
                data={tableData}
            />;
        }
    }

    return (
        <></>
    );
}