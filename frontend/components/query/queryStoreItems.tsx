'use client'

import EmptyPage from "@/app/(public)/empty";
import client from "@/gql/client";
import { STORE_ITEMS_QUERY, VENDORS_QUERY } from "@/gql/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import VendorCard from "../vendors/vendors";
import { Button, Divider, Pagination } from "@nextui-org/react";
import StoreItemCard from "../vendors/storeItems";
import { formButtonStyles } from "../forms/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ToolTipButton from "../common/tooltipButton";

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
        console.log(page);
        setVisiblePage(page);
    }

    const viewStoreItemData = useCallback((data: any) => {
        console.log(data);
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
                <div className="flex flex-col items-center px-5">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-md font-semibold">Product details</span>
                        <ToolTipButton
                            content={"deselect product"}
                            icon={faCircleXmark}
                            onClick={clearActiveItemSelection}
                            isDisabled={!activeStoreItem ? true : false}
                        />
                    </div>
                    <div className="flex flex-col items-center w-full">
                        {activeStoreItem === null ? (
                            <div className="w-full flex start">
                                <p>Click on a product to view details.</p>
                            </div>
                        ) : (
                            <>
                                <div className="py-5 flex flex-col gap-1 w-full">
                                    <span>Name: {activeStoreItem.name}</span>
                                    <span>SKU: {activeStoreItem.sku}</span>
                                    <span>Type: {activeStoreItem.type}</span>
                                    <span>Price: {activeStoreItem.price} per {activeStoreItem.unit}</span>
                                    <span>{activeStoreItem.stock > 0 ? 'In stock' : 'Out of stock'}</span>
                                </div>
                                <Button
                                    radius="none"
                                    className={formButtonStyles.primary}
                                    isDisabled={activeStoreItem === null ? true : false}
                                >
                                    Request
                                </Button>
                                <Divider className="mb-5" />

                                <span className="w-full font-semibold text-slate-500">Additional info</span>
                                <div className="w-full py-5 flex flex-col gap-1">
                                    {
                                        activeStoreItem.properties ? (activeStoreItem.properties.map((property: any, index: number) => {
                                            return (
                                                <p key={property.id}>{JSON.stringify(property)}</p>
                                            )
                                        })) : ''
                                    }
                                </div>

                                <Divider className="mb-5" />

                                <span className="w-full font-semibold text-slate-500">Vendors who sell this product</span>
                                <div className="w-full py-5 flex flex-col gap-1">
                                    {
                                        activeStoreItem.vendors ? (activeStoreItem.vendors.map((vendor: any, index: number) => {
                                            return (
                                                <p key={vendor.id}>{JSON.stringify(vendor)}</p>
                                            )
                                        })) : 'There are no known vendors who sell this product.'
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}