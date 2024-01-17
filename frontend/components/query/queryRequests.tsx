import React, { useCallback } from 'react';
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

    const { loading, error, data, refetch } = useQuery(REQUESTS_QUERY, {
        client,
        variables: { page, pageSize },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error}`;

    const handlePaginationChange = (newPage: number, newPageSize: number) => {
        // Fetch data with the new page and pageSize
        // This function is used as callback from the DynamicTable component
        // to get the new page size and the new current page.
        // THe useQuery will be refetched using the updated page and pageSize variables.
        if (page !== newPage) {
            // the page === newPage condition refetches the data even after the 
            // initial data fetching so this has to be removed.
            refetch({ page: newPage, pageSize: newPageSize });
        }
    };

    if (data) {
        const extracted = data.getRequestsWithUser.data;
        const total = data.getRequestsWithUser.totalItems;

        if (renderTable) {
            const headerColumns = ["date", "subject", "requested by", "status", "actions"];
            const tableData = extracted.map((item: any, index: number) => {
                // table data needs to be mapped to the column header 
                // accordingly in order to properly render as cells inside the table.
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
                onPaginationChange={handlePaginationChange}
                pageNumber={page}
                pageSize={pageSize}
                total={total}
            />;
        }
    }

    return (
        <></>
    );
}