'use client'

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Divider, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import ToolTipButton from "../common/tooltipButton";
import { formButtonStyles } from "../forms/styles";
import RequestStoreItem from "./requestStoreItem";
import { request } from "http";

interface StoreItemProps {
    data?: any
    onClear?: () => void
}

export function StoreItemDetails({ data, onClear }: StoreItemProps) {
    const [activeStoreItem, setActiveStoreItem] = useState<any>(data);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleClearSelection = useCallback(() => {
        setActiveStoreItem(null);
        onClear && onClear();
    }, [])

    const handleRequestStoreItem = useCallback(() => {
        onOpen();
    }, [activeStoreItem])

    useEffect(() => {
        setActiveStoreItem(data);
    }, [data]);

    return (
        <div className="flex flex-col items-center px-5">
            <div className="w-full flex justify-between items-center">
                <span className="text-md font-semibold">Product details</span>
                <ToolTipButton
                    content={"deselect product"}
                    icon={faCircleXmark}
                    onClick={handleClearSelection}
                    isDisabled={!activeStoreItem ? true : false}
                />
            </div>
            <div className="flex flex-col items-center w-full">
                {activeStoreItem === null ? (
                    <div className="w-full flex start text-xs">
                        <p>Click on a product to view details.</p>
                    </div>
                ) : (
                    <>
                        <div className="py-5 flex flex-col gap-1 w-full">
                            <span>{activeStoreItem.name}</span>
                            <span className="text-xs text-slate-400">SKU: {activeStoreItem.sku}</span>
                            <span className="text-sm">Type: {activeStoreItem.type}</span>
                            <span className="text-lg font-bold">LKR {activeStoreItem.price} per {activeStoreItem.unit}</span>
                            <span className={`${activeStoreItem.stock > 0 ? 'text-green-500' : 'text-red-400'}`}>{activeStoreItem.stock > 0 ? 'In stock' : 'Out of stock'}</span>
                        </div>
                        <Button
                            radius="none"
                            className={formButtonStyles.primary}
                            isDisabled={activeStoreItem === null ? true : false}
                            onClick={handleRequestStoreItem}
                        >
                            Request
                        </Button>

                        <Divider className="my-5" />

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

                        <Modal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalBody>
                                            <RequestStoreItem
                                                data={data}
                                                onClose={onClose}
                                            />
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
}