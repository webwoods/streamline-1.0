import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    getActiveRecord?: (record: any) => typeof record
}

export function QueryRequests({ page, pageSize, filter, renderTable = false, getActiveRecord }: Props) {

    const { loading, error, data, refetch } = useQuery(REQUESTS_QUERY, {
        client,
        variables: { page, pageSize },
    });

    // const [getRequests, { loading, error, data }] = useLazyQuery(REQUESTS_QUERY, { client });

    const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
        // Fetch data with the new page and pageSize
        // This function is used as callback from the DynamicTable component
        // to get the new page size and the new current page.
        // THe useQuery will be refetched using the updated page and pageSize variables.
        refetch({ page: newPage, pageSize: newPageSize });
    }, []);

    const getRowData = useCallback((data: any, rowId: string) => {
        // this function will get the data relevent to the record that
        // matches the id of the row within the dynamic table
        const rowData = data.find((item: any) => item.id === rowId);
        getActiveRecord && getActiveRecord(rowData);
    }, []);

    if (loading) return <Loading />;
    if (error) return `Error! ${error}`;

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
                getRowData={getRowData}
            />;
        }
    }

    return (
        <></>
    );
}