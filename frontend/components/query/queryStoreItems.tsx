'use client'

import EmptyPage from "@/app/(public)/empty";
import client from "@/gql/client";
import { STORE_ITEMS_QUERY } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import StoreItemCard from "../vendors/storeItems";
import { StoreItemDetails } from "../vendors/storeItemDetails";

interface Props {
    page: number
    pageSize: number
    filter?: string
    renderTable?: boolean
    getActiveRecord?: (record: any) => typeof record
}

export default function QueryStoreItems({
    page,
    pageSize,
    filter,
    renderTable,
}: Props) {
    const [isEmptyPage, setIsEmptyPage] = useState<boolean>(true); // Fix: Set initial state to true
    const [visiblePageSize, setVisiblePageSize] = useState<number>(10);
    const [visiblePage, setVisiblePage] = useState<number>(1);
    const [activeStoreItem, setActiveStoreItem] = useState<any>(null);

    const [getStoreItems, { loading, error, data }] = useLazyQuery(STORE_ITEMS_QUERY, { client });

    const handlePaginationChange = (page: number) => {
        // console.log(page);
        setVisiblePage(page);
    }

    const viewStoreItemData = useCallback((data: any) => {
        // console.log(data);
        setActiveStoreItem(data);
    }, [])

    const clearActiveItemSelection = () => {
        setActiveStoreItem(null);
    }

    // Initial render
    useEffect(() => {
        setVisiblePage(page);
        setVisiblePageSize(pageSize);
        getStoreItems({ variables: { page, pageSize } });
    }, []);

    useEffect(() => {
        getStoreItems({ variables: { page: visiblePage, pageSize: visiblePageSize } });
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {
                            data?.storeItems?.data?.map((storeItem: any, index: number) => {
                                return (
                                    <StoreItemCard
                                        key={storeItem.id}
                                        data={storeItem}
                                        onViewData={viewStoreItemData}
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
            <div className="col-span-1">
                <StoreItemDetails data={activeStoreItem} onClear={clearActiveItemSelection} />
            </div>
        </div>
    );
}