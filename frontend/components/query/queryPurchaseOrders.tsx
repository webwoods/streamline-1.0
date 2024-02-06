import { REQUESTS_QUERY } from "@/gql/query";
import { useQuery } from "@apollo/client";
import client from '@/gql/client';
import { useCallback } from "react";
import Loading from "@/app/loading";
import DynamicTable from "../table/table";

interface Props {
    page: number
    pageSize: number
    renderTable?: boolean
    getActiveRecord?: (record: any) => typeof record
}

export function QueryPurchaseOrders({ page, pageSize, renderTable = false, getActiveRecord }: Props){
    const { loading, error, data, refetch } = useQuery(REQUESTS_QUERY, {
        client,
        variables: { page, pageSize },
    });

    const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
        refetch({ page: newPage, pageSize: newPageSize });
    }, []);

    const getRowData = useCallback((data: any, rowId: string) => {

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
                    'requested by': item.requestedUser.name,
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