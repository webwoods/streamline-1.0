'use client'

import EmptyPage from "@/app/(public)/empty";
import client from "@/gql/client";
import { VENDORS_QUERY } from "@/gql/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import VendorCard from "../vendors/vendors";
import { Pagination } from "@nextui-org/react";

interface Props {
    page: number
    pageSize: number
    filter?: string
    renderTable?: boolean
    getActiveRecord?: (record: any) => typeof record
}

export default function QueryVendors({
    page,
    pageSize,
    filter,
    renderTable,
}: Props) {
    const [isEmptyPage, setIsEmptyPage] = useState<boolean>(true); // Fix: Set initial state to true
    const [visiblePageSize, setVisiblePageSize] = useState<number>(10);
    const [visiblePage, setVisiblePage] = useState<number>(1);

    const [getVendors, { loading, error, data }] = useLazyQuery(VENDORS_QUERY, { client });

    const handlePaginationChange = (page: number) => {
        console.log(page);
        setVisiblePage(page);
    }

    // Initial render
    useEffect(() => {
        setVisiblePage(page);
        setVisiblePageSize(pageSize);
        getVendors({ variables: { page, pageSize } });
    }, []);

    useEffect(() => {
        console.log('visible page size changed');
        getVendors({ variables: { page: visiblePage, pageSize: visiblePageSize } });
    }, [visiblePage, visiblePageSize]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
        else if (data?.vendors?.totalItems === 0) {
            setIsEmptyPage(true);
        }
        else {
            setIsEmptyPage(false);
        }
    }, [error, data]);

    return (
        <div className="grid grid-cols-4 w-full">
            <div className="col-span-3 flex flex-col gap-5 bg-white p-5 rounded-lg">
                {isEmptyPage ? (
                    <EmptyPage />
                ) : (
                    <div className="flex flex-col gap-2">
                        {
                            data?.vendors?.data?.map((vendor: any, index: number) => {
                                return (
                                    <VendorCard
                                        key={vendor.id}
                                        size='long'
                                        data={vendor}
                                    />
                                )
                            })
                        }
                    </div>
                )}
                <div className="flex w-full justify-center my-3">
                    <Pagination
                        classNames={{
                            item: 'rounded-sm',
                            cursor: 'rounded-sm',
                            next: 'rounded-sm',
                            prev: 'rounded-sm'
                        }}
                        showControls
                        total={10}
                        initialPage={1}
                        loop
                        onChange={handlePaginationChange}
                    />
                </div>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}