import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { REQUESTS_QUERY } from '@/gql/query';
import client from '@/gql/client';
import DynamicTable from '../table/table';
import Loading from '@/app/loading';
import UpdateRequest from '../forms/requests/updateRequest';

interface Props {
    page: number
    pageSize: number
    filter?: any
    renderTable?: boolean
    getActiveRecord?: (record: any) => typeof record
}

export function QueryRequests({ page, pageSize, filter, renderTable = false, getActiveRecord }: Props) {

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // const { loading, error, data, refetch } = useQuery(REQUESTS_QUERY, {
    //     client,
    // variables: { 
    //     page, 
    //     pageSize, 
    //     requestType: filter?.requestType,
    //     status: selectedStatus,
    //     updatedAt: selectedDate,
    // },
    // });

    const [getRequests, { loading, error, data, refetch }] = useLazyQuery(REQUESTS_QUERY, { client });

    useEffect(() => {
        getRequests({
            variables: {
                page,
                pageSize,
                requestType: filter?.requestType,
                status: selectedStatus,
                updatedAt: selectedDate,
            },
        })
    }, [])

    useEffect(() => {
        setSelectedDate(filter?.updatedAt);
        setSelectedStatus(filter?.status);
    }, [filter])

    useEffect(() => {
        console.log({ selectedDate, selectedStatus });
        getRequests({
            variables: {
                page,
                pageSize,
                requestType: filter?.requestType,
                status: selectedStatus,
                updatedAt: selectedDate,
            },
        })
    }, [selectedDate, selectedStatus]);

    useEffect(() => {
        console.log(data);
    }, [data])

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

        console.log('data set', data?.data?.map((item: any) => item.id));
        console.log('row id', rowId);

        // the recieved data from the call back has the following structure
        // data = { data: any, action: any }
        const rowData = data?.data?.find((item: any) => item.id === rowId);
        getActiveRecord && getActiveRecord({ data: rowData, action: data?.action });
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
                    'requested by': item.requestedUser?.name,
                    status: item.status,
                }
            });

            return (
                <DynamicTable
                    headerColumns={headerColumns}
                    data={tableData}
                    onPaginationChange={handlePaginationChange}
                    pageNumber={page}
                    pageSize={pageSize}
                    total={total}
                    getRowData={getRowData}
                />
            )
        }
    }

    return (
        <></>
    );
}