'use client'

import { faPhone, faEnvelope, faGlobe, faLocationDot, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ToolTipButton, { ToolTipLabeledButton } from "../common/tooltipButton";
import { useEffect, useState } from "react";

interface StoreItemCardProps {
    size?: 'long' | 'mid' | 'short'
    data?: any
    onViewData?: (data: any) => void
}

export default function StoreItemCard({ size, data, onViewData }: StoreItemCardProps) {

    const [storeItemData, setStoreItemData] = useState<any>(data);
    const router = useRouter();

    const handleViewStoreItem = () => {
        onViewData && onViewData(storeItemData);
    }

    useEffect(() => {
        setStoreItemData(data);
    }, [data]);

    return (
        <Card
            isHoverable
            isPressable
            classNames={{
                base: 'rounded-md border-1 border-slate-300 shadow-none',
            }}
            onPress={() => handleViewStoreItem()}
        >
            <CardBody className="p-0">
                <div className="flex flex-col justify-between">
                    <div className="flex">
                        <Image
                            alt="nextui logo"
                            classNames={{
                                wrapper: 'w-full object-cover rounded-md',
                            }}
                            radius="none"
                            src="store-item-img-holder.jpg"
                        />
                    </div>
                    <div className="flex flex-col p-3">
                        <p className="text-md md:text-sm">{data?.name}</p>
                        <p className="text-xs text-default-500">{data?.type}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}