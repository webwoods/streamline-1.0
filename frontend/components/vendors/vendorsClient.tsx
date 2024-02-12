'use client'

import { useCallback, useEffect, useState } from "react";
import DatePicker from "../common/datePicker";
import SVGImage from "../common/image";
import QueryVendors from "../query/queryVendors";
import Title from "../title/title";
import VendorsTabs from "./vendorsTabs";

interface Props {

}

export default function VendorsClient({ }: Props) {
    const [selected, setSelected] = useState('all');

    const handleSelection = useCallback((value: string) => {
        setSelected(value);
    }, [])

    useEffect(() => {
        setSelected('all');
    }, [])

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
            <div className="col-span-1 flex flex-col gap-3">
                <div className="pb-5">
                    <SVGImage
                        src="undraw_delivery_truck_vt6p.svg"
                        width={200}
                        height={100}
                    />
                </div>
                <Title title="Vendors" />
                <VendorsTabs onSelection={handleSelection} />
            </div>
            <div className="col-span-4">
                <QueryVendors page={1} pageSize={10} region={selected} />
            </div>
        </div>
    );
}